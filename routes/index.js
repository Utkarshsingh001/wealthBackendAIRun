import express from "express";
import { healthCheckRouter } from "./health.route.js";


const router = express.Router();
console.log('abc');
router.use("/health-check", healthCheckRouter);

export {router};
