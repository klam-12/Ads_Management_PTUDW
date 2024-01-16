import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ErrorResponse } from '../common/error.response.js';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadFile = async (
    filePath,
    allowedExtensions = ['png', 'jpg', 'gif', 'jpeg', 'webp'],
    maxSizeInBytes = 10 * 1024 * 1024,
) => {
    try {
        const fileExtension = filePath.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            return new ErrorResponse('File is not an image');
        }

        // Get file stats to check its size
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;

        // Check if the file size exceeds the limit
        if (fileSizeInBytes > maxSizeInBytes) {
            return new ErrorResponse('File size exceeds the limit');
        }

        // Proceed with uploading the file to Cloudinary
        const result = await cloudinary.uploader.upload(filePath);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export default { uploadFile };
