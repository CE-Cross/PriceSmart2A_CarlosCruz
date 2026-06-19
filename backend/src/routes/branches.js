import express from "express"
import branchesController from "../controllers/branchesController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

//Router() nos ayuda a colocar los métodos
//que tendrá mi endpoint

const router = express.Router();

router.route("/")
.get(validateAuthCookie(["customer", "admin"]), branchesController.getBranches)
.post(validateAuthCookie(["admin"]), branchesController.insertBranches)

router.route("/:id")
.put(validateAuthCookie(["admin"]), branchesController.updateBranches)
.delete(validateAuthCookie(["admin"]), branchesController.deleteBranches)

export default router;