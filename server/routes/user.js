import { Router } from "express";

import checkAccess from "../middlewares/checkAccess.js";
import userPermissions from "../middlewares/permissions/user/userPermissions.js";

import {
  getUsers,
  login,
  register,
  updateStatus,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";
// import Usuario from "../models/Usuario.js";
// const user = Usuario.find();

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", auth, checkAccess(userPermissions.listUsers), getUsers);
userRouter.patch(
  "/updatestatus/:userId",
  auth,
  checkAccess(userPermissions.updateStatus),
  updateStatus
);

export default userRouter;
