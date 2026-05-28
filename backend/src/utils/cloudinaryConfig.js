import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import multerStorageCloudinary from "multer-storage-cloudinary";
import { config } from "../config.js";

const {CloudinaryStorage} = multerStorageCloudinary

//#1 - Configuramos cloudinary con nuestras credenciales.
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

//#2 - Como guardamos las imágenes u otros archivos
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "PriceSmart2A",
        allowed_formats: ["jpg", "png", "jpeg", "webp", "svg", "xlsx", "docx", "pdf", "mp4"]
    }
});

//#3 - Configurar multer
const upload = multer({ storage });
console.log(multerStorageCloudinary);

export default upload;