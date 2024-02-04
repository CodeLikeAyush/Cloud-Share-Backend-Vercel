const path = require('path');
const connect_db = require('./db/connection.js');
const app = require('./app.js');

const port = process.env.PORT || 8000;



const start_server = async () => {
    try {
        connect_db();
        app.listen(port, () => console.log(`🌐 server is running on port: ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start_server();