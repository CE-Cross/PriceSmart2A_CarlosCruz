import express from "express";
import brandsController from "../controllers/brandsController.js";

//Ocupo Router() para asignar los métodos
const router = express.Router();


router.route("/")
.get(brandsController.getBrand)
.post(brandsController.insertBrands)

router.route("/:id")
.put(brandsController.updateBrand)
.delete(brandsController.deleteBrand)

export default router;