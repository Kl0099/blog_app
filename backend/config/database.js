const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

exports.connectdatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URl)
    .then(() => {
      console.log(`database connected at ${process.env.MONGODB_URL}`);
    })
    .catch((err) => {
      console.log(err);

      process.exit(1);
    });
};
