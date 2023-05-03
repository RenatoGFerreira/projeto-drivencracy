import { Router } from "express";
import { postPoll, getPolls } from "../controllers/pool.controllers.js";
import { pollValidateSchema } from "../middlewares/pollValidate.middleware.js";

const router = Router()

router.post("/poll", pollValidateSchema, postPoll)
router.get("/poll", getPolls)

export default router