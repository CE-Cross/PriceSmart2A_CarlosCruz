import express from "express";
import productRoutes from "./src/routes/products.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import brandsRoutes from "./src/routes/brand.js";
// import adminsRoutes from "./src/routes/admins.js";
import customersRoutes from "./src/routes/customers.js";
import registerCustomersRoutes from "./src/routes/registerCustomers.js";
import registerAdminsRoutes from "./src/routes/registerAdmins.js";
import loginCustomerRoutes from "./src/routes/loginCustomers.js";
import loginAdminRoutes from "./src/routes/loginAdmins.js";
import logoutRoutes from "./src/routes/logout.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import providersRoutes from "./src/routes/providers.js";
import cartRoutes from "./src/routes/cart.js";
import wompiRoutes from "./src/routes/wompi.js";
import deliveryDriversRoutes from "./src/routes/deliveryDrivers.js"
import limiter from "./src/middlewares/ratelimiter.js";
import { validateAuthCookie } from "./src/middlewares/authMiddleware.js";
import evenRoutes from "./src/routes/event.js";

const app = express();

app.use(limiter);

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //Permitir el envio de cookies y credenciales
    credentials: true
}));

app.use(cookieParser())

//Que acepte JSON desde postman
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", validateAuthCookie(["admin"]), employeesRoutes);
app.use("/api/brands", brandsRoutes);
// app.use("/api/admins", adminsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/registerCustomers", registerCustomersRoutes);
app.use("/api/registerAdmins", registerAdminsRoutes);
app.use("/api/loginCustomers", loginCustomerRoutes);
app.use("/api/loginAdmins", loginAdminRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);
app.use("/api/providers", providersRoutes);
app.use("/api/carts", validateAuthCookie(["admin", "customer"]), cartRoutes);
app.use("/api/wompi", wompiRoutes);
app.use("/api/deliveryDrivers", deliveryDriversRoutes);
app.use("/api/events", evenRoutes);

export default app;