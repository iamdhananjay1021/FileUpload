const express = require("express");
const { localFileUpload, imageUpload ,videoUpload, imageReducerUpload} = require("../controller/fileUpload");

const router = express.Router();

// Define routes
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducerUpload", imageReducerUpload);



module.exports = router;
