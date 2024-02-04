const busboy = require("busboy");
const { File } = require("../models/model.file.js");

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const send_mail = require("../utilities/mail.js");

const filesServices = {
  write_file_to_disk: (file) => {
    return new Promise((resolve, reject) => {
      const { filename, encoding, mimeType } = file.fileInfo;
      const file_name = `file-share-${filename.slice(
        0,
        5
      )}-${uuidv4()}.${filename.split(".").pop()}`;
      const file_path = path.join(__dirname, "..", "uploads", file_name);

      const writeStream = fs.createWriteStream(file_path);
      const fileStream = file.fileStream;
      fileStream.pipe(writeStream);

      let file_size = 0;
      fileStream.on("data", (chunk) => {
        // calculate size of file
        file_size += chunk.length;
      });
      fileStream.on("error", (err) => {
        console.log("Error in pipe(fileStream):", err);
        fileStream.destroy();
        writeStream.destroy();
        reject(new Error("Error in fileStream"));
      });
      writeStream.on("error", (err) => {
        console.log("Error in pipe(writeStream):", err);
        fileStream.destroy();
        writeStream.destroy();
        reject(new Error("Error in writeStream"));
      });

      writeStream.on("finish", () => {
        resolve({
          file_name: file_name,
          file_path: file_path,
          file_size: file_size,
        });
      });
    });
  },

  download_file: async (file_uuid) => {
    try {
      console.log(typeof file_uuid);
      const file = await File.findOne({
        uuid: file_uuid,
      });
      console.log("::::::::::::" + file);

      return file || null;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  share_file: async (formFields) => {
    try {
      const html = `<!DOCTYPE html>
                <html>
                <head>
                    <style>
                        html{
                        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        }
                        .download-button {
                            background-color: dodgerblue;
                            border: 2px solid dodgerblue;
                            color: white;
                            padding: 15px 32px;
                            text-align: center;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 16px;
                            margin: 10px;
                            cursor: pointer;
                            border-radius:30px;
                            font-weight:bold;
                            transition:all;
                            transition-duration:1s;
                        }
                        .download-button:hover{
                        background-color:transparent;
                        color:dodgerblue;

                        }
                    </style>
                </head>
                <body>
                    <h1>Your Download Link</h1>
                    <p>Click the button below to download your file:</p>
                    <a href=http://localhost:8000/api/files/download/${formFields.file_uuid} class="download-button">Download Now</a>
                </body>
                </html>
                `;
      const mail_result = await send_mail({
        ...formFields,
        html: html,
        subject: `${formFields.receiver_email.split(
          "@",
          1
        )} shared to you a file via:CLOUD-SHARE`,
      });
      console.log("mail-service-res:" + mail_result);

      return mail_result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },
};

module.exports = filesServices;
