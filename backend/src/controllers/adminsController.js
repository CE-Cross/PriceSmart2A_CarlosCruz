//array de funciones
const adminController = {};

//importo la colección que voy a ocupar
import adminsModel from "../models/admins.js";

//SELECT
adminController.getAdmin = async (req, res) => {
  try {
    const admins = await adminsModel.find();
    return res.status(200).json(admins);
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//INSERTAR
adminController.insertAdmins = async (req, res) => {
  try {
    //#1 - solicito los datos a guardar
    let { name, email, password, isVerified } = req.body;

    //#2 - Validaciones
    //Sanitizar
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();

    //validaciones de datos null o require
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are requred" });
    }

    if (name.length < 3){
      return res.status(400).json({ message: "name too short" });
    }

    if (email.length > 100) {
      return (res.status(400), json({ message: "address too long" }));
    }

    const newBrand = new brandsModel({ name, slogan, address, isActive });
    await newBrand.save();

    return res.status(201).json({ message: "Brand saved" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//ELIMINAR
adminController.deleteBrand = async (req, res) => {
  try {
    const deleteBrand = await brandsModel.findByIdAndDelete(req.params.id);

    //Validación por si no fue borrada la marca
    if (!deleteBrand) {
      return res.status(404).json({ message: "brand not found" });
    }

    return res.status(200).json({ message: "brand deleted" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//ACTUALIZAR
adminController.updateBrand = async (req, res) => {
  try {
    //Pedimos los nuevos datos
    let { name, slogan, address, isActive } = req.body;

    //#2 - Validaciones
    //Sanitizar
    name = name?.trim();
    slogan = slogan?.trim();
    address = address?.trim();

    //validaciones de datos null o require
    if (!name || !slogan || !address) {
      return res.status(400).json({ message: "All fields are requred" });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: "name too short" });
    }

    if (address.length > 100) {
      return (res.status(400), json({ message: "address too long" }));
    }

    //actualizamos
    const updateBrands = await brandsModel.findByIdAndUpdate(req.params.id,
        {
            name,
            slogan,
            address,
            isActive
        },
        { new: true},
    );

    //Si no se actualiza
    if (!updateBrands){
        return res.status(404).json({message: "brand not found"});
    }

    return res.status(200).json({message: "brand updated"});
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({message: "Internal server error"})
  }
};

export default adminController;