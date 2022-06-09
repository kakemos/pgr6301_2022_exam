import express from "express";
import {
  getUser,
  logOutUser,
  setLoginCookie,
} from "../controllers/loginController.js";

export const LoginApi = express.Router();

LoginApi.get("/", getUser);
LoginApi.delete("/", logOutUser);
LoginApi.post("/:provider", setLoginCookie);
