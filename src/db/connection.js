require('dotenv').config()
const mongoose = require('mongoose');

const connect_to_db = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('🔗 connected to mongodb database');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect_to_db;