import express from "express";
import providersController from "../controllers/providersController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/")
.get(providersController.getAllProviders)
.post(upload.single("file"), providersController.insertProvider);

router.route("/:id")
.put(upload.single("file"), providersController.updateProvider)
.delete(providersController.deleteProvider);

export default router;