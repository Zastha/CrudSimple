import express from "express";
import cors from "cors";
import registerRoutes from "./routes/registerUser.js";
import readLogin from "./routes/readLogin.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",registerRoutes);
app.use("/api", readLogin)


app.listen(3000, () => console.log("Servidor backend en puerto 3000"));