const cors = require("cors");
const express = require("express");

const app = express();

// const { handleValidationError } = require('./middlewares/errorHandler.js')

const {
  handleValidationError,
  handleAppError,
} = require("./middlewares/errorHandler.js");
const { DatabaseError } = require("./errors/error.js");

// app.use(handleAppError)
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Jai Shree Ram");
});
app.use("/api/files", require("./routes/filesRoute.js"));

// middleware for any Unhandled Error:
app.use((err, req, res, next) => {
  console.error("Central Error Handler:", err);
  if (err instanceof DatabaseError) {
    err.message = "Internal Server Error";
    console.log("Database error: " + err.message);
  }

  err.httpStatusCode = err.httpStatusCode || 500;
  res.status(err.httpStatusCode).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
