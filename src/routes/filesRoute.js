// define routes here:

const express = require("express");
const {
  downloadController,
  uploadController,
  shareController,
} = require("../controllers/filesController/index");

// file-parser-middleware:
const { fileParser } = require("../middlewares/fileParser.js");
// form-parser-middleware:
const { formParser } = require("../middlewares/formParser.js");

// const { handleValidationError } = require('../middlewares/errorHandler.js')

const router = express.Router();

// router.get('/', filesController.ping);
router.post("/upload", fileParser, uploadController);
// router.use('/upload', handleValidationError); // fileParser will raise Exception which we are catching here using middleware
router.get("/download/:file_uuid", downloadController);
router.post("/share/email", formParser, shareController);

module.exports = router;
