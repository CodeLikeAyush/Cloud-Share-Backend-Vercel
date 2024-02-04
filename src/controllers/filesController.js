// // try to keep controller minimal to req-res only:
// const { v4: uuidv4 } = require('uuid');
// const File = require('../models/file');


// const path = require('path');

// const filesServices = require('../services/filesServices');

// const filesController = {
//     ping: async (req, res) => {
//         res.json({ message: 'pong' });
//     },
//     upload: async (req, res) => {
//         try {

//             if (!req.files) {
//                 console.log("Response: File not found");
//                 return res.status(400).json({ 'message': 'File not found' });
//             } else {
//                 const file = req.files[0];
//                 const { file_name, file_path, file_size } = await filesServices.write_file_to_disk(file);

//                 // save file-data to the database:
//                 const fileData = new File({
//                     fileName: file_name,
//                     uuid: uuidv4(),
//                     path: file_path,
//                     size: file_size,
//                 });
//                 const file_info = await fileData.save();
//                 if (file_info) {
//                     res.json({
//                         'download_url': `http://localhost:8000/api/files/download/${file_info.uuid}`, 'file_name': file_info.fileName, 'file_size': `${(file_info.size) / 1000}Kb`, 'file_uuid': file_info.uuid
//                     })
//                 }
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ 'error': 'File upload failed' });
//         }
//     },


//     download: async (req, res) => {
//         try {
//             const file_info = await filesServices.download_file(req.params.file_uuid);
//             file_info ? res.download(path.join(__dirname, '..', 'uploads', file_info.fileName)) : res.status(404).json({ 'download_url': null });


//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ 'message': 'internal server error' });
//         }
//     },
//     share: async (req, res) => {
//         try {
//             // console.log(req.formFields);
//             const result = await filesServices.share_file(req);
//             console.log("result++:" + result)
//             !(result.Error) ? res.status(200).json({ 'message': 'email send' }) : res.status(500).json({ 'message': 'unable to send mail' });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ 'message': 'something went wrong while sending email' });
//         }

//     }

// };

// module.exports = filesController;
