const { v4: uuidv4 } = require("uuid");
const { DatabaseError } = require("../errors/error");

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: false,
    },
    receiver: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const File = mongoose.model("file", fileSchema);

const createFile = async ({ file_name, file_path, file_size }) => {
  try {
    const fileData = new File({
      fileName: file_name,
      uuid: uuidv4(),
      path: file_path,
      size: file_size,
    });

    const fileInfo = await fileData.save();
    return fileInfo;
  } catch (err) {
    throw new DatabaseError("Unable to save file-data to the database");
  }
};

module.exports = {
  File,
  createFile,
};
