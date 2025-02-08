import express from "express";
import "express-async-errors";
import cors from "cors";
import userRoutes from "../routes/userRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => console.log("Server running on port 3001"));
