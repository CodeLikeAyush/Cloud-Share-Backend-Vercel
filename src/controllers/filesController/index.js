const upload = require('./controller.upload.js');
const download = require('./controller.download.js');
const share = require('./controller.share.js');

module.exports = {
    uploadController: upload,
    downloadController: download,
    shareController: share
}