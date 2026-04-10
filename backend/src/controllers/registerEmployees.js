import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import employees from "../models/employees.js";

import {config} from "../config.js";


//Crear un array o arreglo de funciones
const registerEmployeesController = {};

//Crear cada método necesario para registerEmployeesController

//Metodo de registro
registerEmployeesController.register = async (req, res)