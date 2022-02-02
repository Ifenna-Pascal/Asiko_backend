require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const connectToDB = require('./db/setup');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(helmet());
app.use(xss());


// cloudinary config
cloudinary.config({ 
    cloud_name: 'jim-marketplace', 
    api_key: '276669241878884', 
    api_secret: 'CeiR-Bmx9mYxAIfxuy67mM2wtBg' 
});


// listen for live routes
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome To Instagram Clone!' });
});
app.use(userRoutes);
app.use(postRoutes);


// handle invalid or dead links
app.use('**', (req, res) => {
    return res.status(404).json({ message: 'Page Not Found!'});
});


// handle terminal errors
app.use((error, req, res, next)=> {
    console.log(error);
    return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later!' });
});


app.listen( port, async () => {
    await connectToDB();
    console.log(`Server is live at port ${port}`);
});