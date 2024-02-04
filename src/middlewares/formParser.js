const Busboy = require("busboy");

const formParser = (req, res, next) => {
  const parser = Busboy({ headers: req.headers });

  req.formFields = {};

  parser.on("field", (fieldName, fieldVal, info) => {
    const fieldObject = {};
    fieldObject[fieldName] = fieldVal;
    // req.formFields.push(fieldObject);
    Object.assign(req.formFields, fieldObject);
    // console.log(fieldName);
    // console.log(fieldVal);
    // console.log(info);
  });

  // Listening for the finish event to ensure all fields are processed before calling next()
  parser.on("finish", () => {
    next();
  });

  // Listen for errors during parsing
  parser.on("error", (error) => {
    parser.destroy();
    console.log("parser stream error: " + error);
    res.status(500).send("Error parsing the request: " + error.message);
  });

  req.on("error", (error) => {
    parser.destroy();
    console.log("req stream error: " + error);
    res.status(500).send("Error parsing the request: " + error.message);
  });

  req.pipe(parser);
};

module.exports = { formParser };
