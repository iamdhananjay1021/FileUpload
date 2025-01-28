const File = require("../models/File");
// const { options } = require("../routes/FileUpload");
const cloudinary = require("cloudinary").v2

exports.localFileUpload = async (req, res) => {
    try {
        //   fetch file from request
        const file = req.files.file;
        console.log("file", file)

        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("PATH ", path)

        // add path to the move function
        file.mv(path, (err) => {
            console.log(err)
        })

        // create a successful response
        res.json({
            success: true,
            messgage: "File upload success"
        })

    } catch (error) {
        console.log("Not able to upload the file on server")
        console.log(error)

    }

}




// image upload handler 

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type)
}

async function uploadFiletoCloudinary(file, folder, quality) {
    const options = { folder }
    options.resource_type = "auto";
    console.log("temp file path", file.tempFilePath);
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}


// function isFileTypeSupported(type, supportedTypes) {
//     return supportedTypes.includes(type);
// }

// async function uploadFiletoCloudinary(file, folder) {
//     const options = { folder, resource_type: "auto" };
//     console.log("Temporary file path:", file.tempFilePath);
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }


exports.imageUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file)




        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("file type", fileType);


        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "file format not supported",
            })
        }
        //file format supported hai
        const response = await uploadFiletoCloudinary(file, "Codenikhil")
        console.log("response", response);



        // db me entry save karni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}



// video upload


exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log("Request body:", name, tags, email);

        const file = req.files.videoFile;
        console.log("File received:", file);

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split(".").pop().toLowerCase();

        console.log("File Type:", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // Upload to Cloudinary
        const response = await uploadFiletoCloudinary(file, "Codenikhil");
        console.log("Cloudinary response:", response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });
        console.log("File data saved to DB:", fileData);

        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video successfully uploaded",
        });
    } catch (error) {
        console.error("Error during upload:", error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};



// imageReducesfile


exports.imageReducerUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file)




        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("file type", fileType);


        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "file format not supported",
            })
        }
        //file format supported hai
        const response = await uploadFiletoCloudinary(file, "Codenikhil", 10)
        console.log("response", response);



        // db me entry save karni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });
        console.log(fileData);

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}
