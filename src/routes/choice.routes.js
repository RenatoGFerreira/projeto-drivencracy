import { Router } from "express";
import { postChoice } from "../controllers/choice.controllers.js";
import { choiceValidateSchema } from "../middlewares/choiceValidate.middleware.js";

const router = Router()

router.post("/choice", choiceValidateSchema, postChoice)


export default router