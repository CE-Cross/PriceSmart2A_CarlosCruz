import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import employees from "../models/employees.js";

import {config} from "../config.js";


//Crear un array o arreglo de funciones
const registerEmployeesController = {};

//Crear cada método necesario para registerEmployeesController

//Metodo de registro del empleado
registerEmployeesController.register = async (req, res) => {
    try {
        //#1 - Solicitar todos los pasos a guardar (datos)
        const {
            name,
            lastName,
            salary,
            DUI,
            phone,
            email,
            password,
            idBranches,
            isVerified
        } = req.body;

        //#2 - Validaciones o verificaciones

        const existEmployee = await employees.findOne({email});
        if(existEmployee){
            return res.status(400).json({message: "email already in use"});
        }

        //#3 - Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        //#4 - Guardar todos los valores en la base de datos
        
    } catch (error) {
        
    }
}