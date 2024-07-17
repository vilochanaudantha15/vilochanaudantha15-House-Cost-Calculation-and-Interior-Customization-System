import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbCon from "./utlis/db.js";
import productRoutes from "./routes/routesp.js";
import userRoutes from "./routes/routes.js"; // Import user routes


dotenv.config();
const app = express();
dbCon();

app.use(cors());
app.use(express.json());

// Use the user routes for user-related paths
app.use("/api", userRoutes);

// Use the product routes for product-related paths
app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
