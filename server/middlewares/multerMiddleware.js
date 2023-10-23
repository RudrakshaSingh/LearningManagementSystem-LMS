import path from "path";

import multer from "multer";

const upload = multer({
    dest: "uploads/", //destination path
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
    storage: multer.diskStorage({
        //Configures where and how the uploaded files will be stored on the disk.
        destination: "uploads/",
        filename: (_req, file, cb) => {
            cb(null, file.originalname); //store with original name
        },
    }),
    //_req: Represents the incoming request object (not used in this callback).
    //file: Represents information about the uploaded file (name, size, etc.).
    //cb: The callback function that you call when you're done processing.
    fileFilter: (_req, file, cb) => {
        //cb callback in file filter
        let ext = path.extname(file.originalname); //Extracts the file extension from the original name.
        if (
            //valid extensions
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".webp" &&
            ext !== ".png" &&
            ext !== ".mp4"
        ) {
            cb(new Error(`Unsupported file type! ${ext}`), false);
            return;
        }

        cb(null, true);
    },
});

export default upload;
