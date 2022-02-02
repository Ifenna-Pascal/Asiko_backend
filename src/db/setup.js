require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

async function connectToDB() {
    try {
        await mongoose.connect("mongodb+srv://pascal:pascal@cluster0.oecbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        console.log("Database Connection Successful!");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToDB;