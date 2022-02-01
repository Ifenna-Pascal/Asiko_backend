require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const connectToDB = require('./db/setup');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// listen for live routes
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome To Instagram Clone!' });
});
app.use(userRoutes);
app.use(adminRoutes);


// handle invalid or dead links
app.use('**', (req, res) => {
    return res.status(404).json({ message: 'Page Not Found!'});
});


// handle terminal errors
app.use((error, req, res, next)=> {
    console.log(error);
    return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later!' });
});


app.listen(port, async () => {
    await connectToDB();
    console.log(`Server is live at port ${port}`);
});