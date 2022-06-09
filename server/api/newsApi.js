import express from "express";
import { addNewArticle, getNews } from "../controllers/newsController.js";

export const NewsApi = express.Router();

NewsApi.get("/", getNews);
NewsApi.post("/new", addNewArticle);
