import { ObjectId } from "mongodb"
import { db } from "../database/database.js"
import { choiceSchema } from "../schemas/choice.schema.js"
import dayjs from "dayjs"
import moment from "moment/moment.js"


export async function choiceSchemaValidate(req, res, next){
    const {title, pollId} = req.body

    const validation = choiceSchema.validate({title, pollId}, { abortEarly: false})
    if(validation.error){
        console.log(validation.error)
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
        
    const isPollExist = await db.collection("polls").findOne({_id: new ObjectId(pollId)})
    if(!isPollExist) return res.status(404).send("Enquete não existe!")

    const isChoiceRepeated = await db.collection("choices").findOne({title})
    if(isChoiceRepeated) return res.status(409).send("Resposta já existente")
    //OLHAR ISSO 

    const today = dayjs(new Date()).format("YYYY-MM-DD HH:mm")
    const poll = await db.collection("polls").findOne({_id: new ObjectId(pollId)})
    let result = moment(today).isSameOrBefore(poll.expireAt)
    console.log(result)
    if(!result) return res.status(403).send("Enquete expirada.")



    res.locals.choice = {title, pollId}

    next()
}


export async function voteSchemaValidate(req, res, next){
    
}