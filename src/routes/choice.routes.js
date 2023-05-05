import { Router } from "express";
import {postChoice, getPollOptions, voteId} from "../controllers/choice.controllers.js"
import {choiceSchemaValidate} from "../middlewares/choiceValidate.middleware.js"
const choiceRouter = Router()

choiceRouter.post("/choice", choiceSchemaValidate, postChoice)
choiceRouter.get("/poll/:id/choice", getPollOptions)
choiceRouter.post("/choice/:id/vote", voteId)



export default choiceRouter