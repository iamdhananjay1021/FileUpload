// app create
const express = require("express")
const app = express();

// Find the port
require("dotenv").config();
const PORT = process.env.PORT || 3000

// middleware add karna hai
app.use(express.json());
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// db se connect karna hau
const dbConnect = require("./config/database")
dbConnect();

// cloud se connect karna hai 
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();

// api route mount karna hai

const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload",Upload);

// Activate the server
app.listen(PORT,()=>{
    console.log(`App Run in Port Number ${PORT}`)
})

