const router = require('express').Router();
const {
   addNewSchedule,
   deleteSchedule,
   getAllSchedule,
   getSchedule,
   updateSchedule
} = require('../../../controller/schedule/scheduleController');

router.route('/')
   .get(getAllSchedule)
   .post(addNewSchedule)

router.route('/:id')
   .get(getSchedule)
   .put(updateSchedule)
   .delete(deleteSchedule)

module.exports = router;
