require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const connectDB = require("./connection");
const app = express();
app.use(cors());
app.use(express.json());
// mongoose
//   .connect("mongodb://localhost:27017/netflix", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connected");
//   });
app.use("/api/user", userRoutes);

const server = app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`server started at port${process.env.PORT}`);
});
//process closed due to the uncaught exception and exit with code of 1 (indicating an error)
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception - ", err);
  console.log("closing node process");
  process.exit(1);
});
//This event is triggered when a Promise is rejected, but there is no .catch() or .then(null, ...) handler to handle the rejection.
process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection - ", err);
  console.log("closing node process");
  process.exit(1);
});
//The server is closed by invoking its close method, which stops it from accepting new connections. The server will continue processing existing connections until they are completed or closed by the clients.
process.on("SIGTERM", () => {
  server.close((err) => {
    console.log("Http server closed");
    process.exit(err ? 1 : 0);
  });
});
