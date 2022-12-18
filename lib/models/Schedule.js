const mongoose = require('mongoose');

const scheduleScheme = new mongoose.Schema({
    Id: {
      type: Number,
      required: true
    },
    Subject: {
      type: String,
      required: true
    },
    Location: {
      type: String,
    },
    StartTime: {
      type: Date,
      required: true
    },
    EndTime: {
      type: Date,
      required: true
    },
    CategoryColor: {
      type: String,
      default: "#8F00FF",
    },
});

module.exports = mongoose.model('schedule', scheduleScheme);