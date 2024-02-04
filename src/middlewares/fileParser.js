const Busboy = require("busboy");

const { ValidationError } = require("../errors/error.js");
const fileParser = (req, res, next) => {
  const parser = Busboy({ headers: req.headers });
  req.files = [];

  parser.on("file", (fieldName, fileStream, fileInfo) => {
    // const { filename, encoding, mimeType } = fileInfo;
    req.files.push({
      fieldName: fieldName,
      fileStream: fileStream,
      fileInfo: fileInfo,
    });
    next();
  });

  // Listening for the finish event to ensure all fields are processed before calling next()
  parser.on("finish", () => {
    console.log("finished");
    // next();
  });

  // Listening for errors during parsing
  // We need to listen for the error event only while using the pipe method. Other methods are handled internally by the pipe method.
  parser.on("error", (error) => {
    parser.destroy();
    console.log("parser stream error: " + error);
    next(new ValidationError("invalid input or no file input provided", 400));
  });

  req.on("error", (error) => {
    parser.destroy();
    console.log("req stream error: " + error);
    res.status(500).send("Error parsing the request: " + error.message);
  });

  req.pipe(parser);
};

module.exports = { fileParser };
