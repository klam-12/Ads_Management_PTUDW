const mongoose = require('mongoose');

const URL =
    'mongodb+srv://ads_management:ads_management@adsmanagement.as0mvty.mongodb.net/AdsManagement?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
