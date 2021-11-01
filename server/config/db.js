const log4j = require("../utils/log4j");
const config = require("../config/index");
const mongoose = require("mongoose");
mongoose.connect(config.mongoDbUrl);

const db = mongoose.connection;

db.on("connected", () => {
  log4j.info(`mongoose链接成功`);
});
db.on("error", (err) => {
  log4j.info(err.toString());
});
