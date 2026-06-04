import deliveryDriversModel from "../models/deliveryDrivers.js";

import {v2 as cloudinary} from "cloudinary";

//Array de funciones
const deliveryDriverController = {};

//SELECT
deliveryDriverController.getAllDrivers = async (req, res) => {
    try {
        const drivers = await deliveryDriversModel.find();
        return res.status(200).json(drivers);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

//INSERTAR
deliveryDriverController.insertDriver = async (req, res) => {
    try {
        //#1 - Solicito los datos a guardar
        const {name, phone, cars, isActive} = req.body;

        //Llenar el model de datos.
        const newDriver = new deliveryDriversModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive
        });

        //Guardamos todo en la base de datos.
        await newDriver.save();

        return res.status(201).json({message: "Delivery driver saved"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

//ELIMINAR
deliveryDriverController.deleteDriver = async (req, res) => {
    try {
        //Buscamos cual es el Repartidor o eliminar
        const driverFound = await deliveryDriversModel.findById(req.params.id);

        //Eliminamos la imagen de Cloudinary
        await cloudinary.uploader.destroy(driverFound.public_id);

        //Eliminamos el repartidor de la base de datos.
        await deliveryDriversModel.findByIdAndDelete(req.params.id);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

//ACTUALIZAR
deliveryDriverController.updateDriver = async (req, res) => {
    try {
        //#1 - Solicito los nuevos datos
        const {name, phone, cars, isActive} = req.body;
        
        //Identificar que Repartidor voy a actualizar
        const driverFound = await deliveryDriversModel.findById(req.params.id);

        const updatedData = {
            name,
            phone,
            cars,
            isActive
        }

        //Si viene una imagen
        if(req.file){
            //Eliminamos la imagen anterior
            await cloudinary.uploader.destroy(driverFound.public_id);

            updatedData.image = req.file.path;
            updatedData.public_id = req.file.body.filename
       }

       //Guardamos todo lo actualizado en la base de datos
       await deliveryDriversModel.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {new: true}
       );

       return res.status(200).json({message: "Internal server error"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default deliveryDriverController;