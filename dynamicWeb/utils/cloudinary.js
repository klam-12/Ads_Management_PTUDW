import express from 'express';
import { v2 as cloudinaryModule } from 'cloudinary';
import multer from 'multer';
const app = express();
const cloudinary = cloudinaryModule;
// import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.fieldname + '-' + uniqueSuffix + file.originalname;
        cb(null, filename);
    },
});

const uploads = multer({ storage });

export { cloudinary, uploads };
