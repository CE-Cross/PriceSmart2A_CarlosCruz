import nodemailer from "nodemailer"; //enviar correos SMTP
import crypto from "crypto"; //Generar códigos aleatorios
import jsonwebtoken from "jsonwebtoken"; //Generar token
import bcryptjs from "bcryptjs"; //Encriptar contraseña

import customerModel from "../models/customers.js";

import {config} from "../config.js";

//Creo un array de funciones
const registerCustomersController = {};

registerCustomersController.register = async (req, res) => {
    try{
        //#1 solicitar todos los pasos a guardar 
        const {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut,
        } = req.body;

        //verificar si el correo ya existe
        const existCustomer = await customerModel.findOne({email});
        if(existCustomer){
            return res.status(400).json({message: "email already in use"})
        }

        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //Guardamos todos en la base de datos
        const newCustomer = new customerModel({
            name,
            lastName,
            birthdate,
            email,
            password: passwordHash,
            isVerified,
            loginAttempts,
            timeOut,
        });

        await newCustomer.save();
        
        //Generar código aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //Guardar estye código en un token


    }catch(error){
        const tokenCode = jsonwebtoken.sign(
            //#1 - ¿Qué vamos a guardar?
            {email, verificationCode},
            //#2 - secret key
            config.JWT.secret,
            //#3 - ¿Cuándo expira?
            {expiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})
    }
}