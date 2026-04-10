import express from "express";
import productRoutes from "./src/routes/products.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import brandsRoutes from "./src/routes/brand.js";
import adminsRoutes from "./src/routes/admins.js";
import customersRoutes from "./src/routes/customers.js";
import registerCustomersRoutes from "./src/routes/registerCustomers.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser())

//Que acepte JSON desde postman
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/registerCustomers", registerCustomersRoutes);

export default app;
