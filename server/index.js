import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});
app.use(express.json({ limit: "10mb" }));
app.use("/user", userRouter);
app.get("/", (req, res) => res.json({ message: "Bienvenido al API" }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: "No encontrado" })
);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    // console.log(process.env.MONGO_CONNECTION);
    app
      .listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`))
      .on("error", (e) => {
        console.log("Ocurrio un Error", e.message);
      });
  } catch (error) {
    console.log(error);
  }
};

startServer();
