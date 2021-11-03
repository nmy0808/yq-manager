const mongoose = require("mongoose");

const schema = mongoose.Schema({
  "key": String,
  "sequence_value": Number,
});

module.exports = mongoose.model("counters", schema);