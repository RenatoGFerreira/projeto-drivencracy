import {Router} from "express"
import { postPoll, getPoll, showPollResult } from "../controllers/poll.controllers.js"
import validateSchema from "../middlewares/pollValidate.middleware.js"
import { pollSchema } from "../schemas/poll.schema.js"
const pollRouter = Router()

pollRouter.post("/poll", validateSchema(pollSchema), postPoll)
pollRouter.get("/poll", getPoll)
pollRouter.get("/poll/:id/result", showPollResult)


export default pollRouter

//db.choices.aggregate([{$sortByCount: "$pollId"}]).toArray()