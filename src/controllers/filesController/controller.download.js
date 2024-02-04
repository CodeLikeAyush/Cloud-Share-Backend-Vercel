const filesServices = require('../../services/filesServices.js');
const path = require('path');


const download = async (req, res) => {
    try {
        const file_info = await filesServices.download_file(req.params.file_uuid);
        console.log(file_info)
        file_info ? res.download(path.join(__dirname, '..', '..', 'uploads', file_info.fileName)) : res.status(404).json({ 'download_url': null });


    } catch (error) {
        console.log(error);
        res.status(500).json({ 'message': 'internal server error' });
    }
}

module.exports = download;