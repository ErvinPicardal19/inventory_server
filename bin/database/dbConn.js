const mongoose = require('mongoose');

const connectToDB = async(callback) => {
   try{
      console.log("Connecting to DB...");
      await mongoose.connect(process.env.DATABASE_URI);
      console.log(`Connected to ${mongoose.connection.name} database`);
      return callback()
   } catch(err) {
      return callback(err);
   }
}

module.exports = connectToDB;