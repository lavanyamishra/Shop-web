// const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const colors = require("colors");
dotenv.config();
// mongoose.set("strictQuery", true);
// const mongoDBUrl = "mongodb://localhost:27017/shopfusion";

// const connectDB = () => {
//   // mongoose
//   //   .connect(process.env.MONGO_URI, {
//   //     user: process.env.MONGO_USER,
//   //     pass: process.env.MONGO_PWD,
//   //     dbName: process.env.MONGO_DB,
//   //     useNewUrlParser: true,
//   //   })
//   //   .then((res) => console.log("Connected to MongoDB".bgBlue));

//   mongoose
//     .connect(mongoDBUrl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     })
//     .then((res) => console.log("Connected to MongoDB".bgBlue));
// };

// module.exports = { connectDB };
const clusterUrl = process.env.clusterUrl

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(clusterUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});
