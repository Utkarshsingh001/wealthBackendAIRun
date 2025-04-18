import express from "express";
import { statusCode } from "../constants/status.js";
import { responseHandlers } from "../middlewares/responseHandlers.js";
import { healthCheck } from "../controllers/health.controller.js";

const router = express.Router();

router.use(responseHandlers);

router.get("/", (req, res) => {
    res.success("Health check", healthCheck(), statusCode.STATUS_OK);
});
export { router as healthCheckRouter };