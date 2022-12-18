const express = require('express');
const {createServer} = require('http');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressWinston = require('express-winston');
const connectToDB = require('../bin/database/dbConn.js');
const path = require('path');
const socket = require("socket.io")
const corsWhiteList = require('../config/corsWhiteList.js');
const credentials = require('./middleware/credentials.js');
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const User = require('./models/Users');
const Order = require('./models/Order');


class Server {
   constructor(){
      if(Server.instance == null){
         this.app = express();
         this.httpServer = createServer(this.app);
         this.io = new socket.Server(this.httpServer, {
            cors: {
               origin: "http://localhost:3000",
               credentials: true
            },
            
         })
         this.port = process.env.PORT || 5500;
         this.logger = require(path.join(__dirname, "..", "bin", "logger", "logger.js"))();
         this.errorHandler = require(path.join(__dirname, 'middleware', 'errorHandler.js'));
         this.paths = {
            auth: '/api/v1/login',
            register: '/api/v1/register',
            refresh: '/api/v1/refresh',
            logout: '/api/v1/logout',
            customer: '/api/v1/customers',
            category: '/api/v1/category',
            inventory: '/api/v1/inventory',
            orders: '/api/v1/orders',
            employees: '/api/v1/employees',
            schedule: '/api/v1/schedule',
            dashboard: '/api/v1/dashboard'
         }
         this.verifyJWT = require('./middleware/verifyJWT.js')
         Server.instance = this;

         this.middlewares();
         this.routes();
         this.winston_error();

      }
      return Server.instance;
   }

   middlewares(){
      // Logger
      this.app.use(expressWinston.logger({
         winstonInstance: this.logger,
         statusLevels: true
      }))

      // Allow Cookies Credentials
      this.app.use(require('./middleware/credentials.js'));

      // Cors Policy Allow-Cross-Site
      this.app.use(cors(require('../config/corsOptions.js')));
      // this.app.use(cors());

      // Parse Forms Data
      this.app.use(express.urlencoded({extended: false}));

      // Parse JSON Data
      this.app.use(express.json());

      // Parse Cookies
      this.app.use(cookieParser());

      // this.app.use(express.static(path.join(__dirname, "..", "build")));
      // this.app.use(express.static("public"));
   }

   routes(){
      // authentication route
      this.app.use(this.paths.auth, require('./routes/v1/auth.js'));

      // register route
      this.app.use(this.paths.register, require('./routes/v1/register.js'));

      // Refresh access token
      this.app.use(this.paths.refresh, require('./routes/v1/refresh.js'));

      // Logout User Route
      this.app.use(this.paths.logout, require('./routes/v1/logout.js'));

      this.app.use('/images', express.static(path.join(__dirname, "..", "test", "images")));

      // All routes below VerifyJWT middleware will implement authentication of Access Token
      this.app.use(this.verifyJWT);

      // customers API route
      this.app.use(this.paths.customer, require('./routes/v1/api/customers.js'));

      this.app.use(this.paths.category, require('./routes/v1/api/categories'));

      this.app.use(this.paths.inventory, require('./routes/v1/api/inventory'));

      this.app.use(this.paths.customer, require('./routes/v1/api/customers'));

      this.app.use(this.paths.orders, require('./routes/v1/api/orders'));

      this.app.use(this.paths.employees, require('./routes/v1/api/employees'));

      this.app.use(this.paths.schedule, require('./routes/v1/api/schedule'));

      this.app.use(this.paths.dashboard, require('./routes/v1/api/dashboard'));

   }

   winston_error(){
      this.app.use((err, req, res, next) => {
        this.errorHandler.error(`${err.message} \n ${err.stack}`);
         res.status(500).json({message: err.message});
      })
   }
   

   listen(){
      connectToDB((err) => {
         if(!err){
            this.io.on("connect", (socket) => {
               console.log(`SOCKET ID: ${socket.id}`)
               

               socket.on("update", async() => {
                  let productNo = await Product.countDocuments();
                  let customerNo = await Customer.countDocuments();
                  let employeesNo = await User.countDocuments();
                  let ordersNo = await Order.countDocuments();

                  console.log("Product: ", {
                     productNo,customerNo,employeesNo,ordersNo
                  });
                  this.io.sockets.emit("updateReply", {
                     productNo,
                     customerNo,
                     employeesNo,
                     ordersNo
                  });
               })


               socket.on("getDashboard", () => {
                  socket.emit("dashboard", "Hello");
               })

            })

            this.httpServer.listen(this.port, () => {console.log(`Listening on PORT \x1b[33m${this.port}\x1b[0m...\n`)});
         } else {
            this.errorHandler.error(`${err.message} \n ${err.stack}`);
         }
      })
   }
}

const server = new Server();

Object.freeze(server);

module.exports = server;