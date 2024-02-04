const filesServices = require('../../services/filesServices.js');
const { createFile } = require('../../models/model.file.js');

const upload = async (req, res, next) => {
    try {

        const file = req.files[0];
        const { file_name, file_path, file_size } = await filesServices.write_file_to_disk(file);


        const fileInfo = await createFile({ file_name, file_path, file_size });
        console.log(fileInfo)
        res.json({
            'download_url': `http://localhost:8000/api/files/download/${fileInfo.uuid}`, 'file_name': fileInfo.fileName, 'file_size': `${(fileInfo.size) / 1000}Kb`, 'file_uuid': fileInfo.uuid
        })

    } catch (err) {
        console.error(err);
        next(err)
    }
}

module.exports = upload;