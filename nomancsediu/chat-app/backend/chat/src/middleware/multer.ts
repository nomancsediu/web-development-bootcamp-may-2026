import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "chat-images",
        allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
        transformation: [
            { width: 800, height: 600, crop: "limit" },
            { quality: "auto" }
        ],
    } as any,
});

export const upload = multer({ 
    storage,
    limits: {
        fileSize: 5*1024*1024,
    },
    fileFilter: (req,file,cb) => {
        if(file.mimetype.startsWith("image/"))
        {
            cb(null,true);
        }
        else{
            cb(new Error("Only image files are allowed"));
        }
        }
});