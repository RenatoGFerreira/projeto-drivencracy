import { Router } from "express";
import {postChoice, getPollOptions} from "../controllers/choice.controllers.js"
import {choiceSchemaValidate} from "../middlewares/choiceValidate.middleware.js"
const choiceRouter = Router()

choiceRouter.post("/choice", choiceSchemaValidate, postChoice)
choiceRouter.get("/poll/:id/choice", getPollOptions)




export default choiceRouter