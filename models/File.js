const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String
    }
});

fileSchema.post("save", async function (doc) {
    try {
        console.log("Document saved: ", doc);

        // Ensure environment variables are being loaded
        if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
            throw new Error("Mail configuration is missing.");
        }

        // Transporter setup
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // Send email
        let info = await transporter.sendMail({
            from: "Codehelp by Babbar", // Sender address
            to: doc.email,              // Recipient address (from the saved document)
            subject: "New file uploaded on cloudinary",
            html: `
                <h2>Hello ji,</h2>
                <p>We wanted to let you know that your file <strong>${doc.name}</strong> has been uploaded successfully.</p>
                <p>File Tags: ${doc.tags}</p>
                <p>Image URL: <a href="${doc.imageUrl}">Click here to view your image</a></p>
            ` // Dynamic content using the document's data
        });

        console.log("Email sent successfully: ", info);

    } catch (error) {
        console.error("Error sending email: ", error); // Log the error
    }
});
const File = mongoose.model("File", fileSchema);
module.exports = File;
