import { Router } from "express";
import { postPoll } from "../controllers/pool.controllers.js";
import { pollValidateSchema } from "../middlewares/pollValidate.middleware.js";

const router = Router()

router.post("/poll", pollValidateSchema, postPoll)
router.get("/poll")

export default router