import express from "express";
import { news } from "../data.js";

const router = express.Router();

router.get("/", (req, res) => res.json(news.sort((a, b) => b.ts - a.ts)));

export default router;
