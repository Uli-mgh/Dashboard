import tryCatch from "./utils/tryCatch.js";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

export const register = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Contraseña demasiado corta",
    });
  }

  const emailLowerCase = email.toLowerCase();

  const existedUser = await Usuario.findOne({ email: emailLowerCase });

  if (existedUser) {
    return res
      .status(400)
      .json({ success: false, message: "El usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await Usuario.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });

  const { _id: id, role, active } = user;

  const token = jwt.sign({ id, name, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({
    success: true,
    result: { id, name, email: user.email, token, role, active },
  });
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await Usuario.findOne({ email: emailLowerCase });
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: "Usuario no encontrado" });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });

  const { _id: id, name, role, active } = existedUser;
  if (!active)
    return res.status(400).json({
      success: false,
      message: "Esta cuenta ha sido suspendida, contacta con administracion",
    });
  const token = jwt.sign({ id, name, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, token, role, active },
  });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await Usuario.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const updateStatus = tryCatch(async (req, res) => {
  const { role, active } = req.body;
  await Usuario.findByIdAndUpdate(req.params.userId, { role, active });
  res.status(200).json({ success: true, result: { _id: req.params.userId } });
});
