import providerModel from "../models/providers.js";

import { v2 as cloudinary } from "cloudinary";

//Array de funciones
providersController = {};

//SELECT
providersController.getAllProviders = async (req, res) => {
    try {
        const providers = await providerModel.find();
        return res.status(200).json(providers);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//INSERTAR
providersController.insertProvider = async (req, res) => {
    try {
        //#1 - Solicitar los datos
        const { name, phone } = req.body;

        //#2 - Lleno el modelo con los datos
        const newProvider = new providerModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename
        });

        //#3 - Guardo en la base de datos.
        await newProvider.save();

        return res.status(201).json({ message: "Provider saved" });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//ElIMINAR
providersController.deleteProvider = async (req, res) =>{
    try {
        //Buscamos cual es el registro a eliminar
        const providerFound = await providerModel.findById(req.params.id);

        //Eliminar la imagen de Cloudinary.
        await cloudinary.uploader.destroy(providerFound.public_id);

        //Eliminar el registro de la base de datos.
        await providerModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({message: "Provider deleted"});
    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

//ACTUALIZAR
providersController.updateProvider = async (req, res) => {
    try {
        //#1 - Solicito los nuevos datos.
        const {name, phone} = req.body;

        //Identifico a que usuario estoy actualizando.
        const providerFound = await providerModel.findById(req.params.id);

        const updatedData = {
            name,
            phone
        }

        //Si viene una imagen
        if(req.file){
            //Eliminar la imagen anterior.
            await cloudinary.uploader.destroy(providerFound.public_id);

            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //Guardo todo en la base de datos
        await providerModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true}
        );

        return res.status(200).json({message: "Provider updated"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});        
    }
}

export default providersController;
