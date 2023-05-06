import { ObjectId } from "mongodb"
import { db } from "../database/database.js"
import { choiceSchema } from "../schemas/choice.schema.js"
import dayjs from "dayjs"
import moment from "moment/moment.js"


export async function choiceSchemaValidate(req, res, next){
    const {title, pollId} = req.body

    const validation = choiceSchema.validate({title, pollId}, { abortEarly: false})
    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
        
    const isPollExist = await db.collection("polls").findOne({_id: new ObjectId(pollId)})
    if(!isPollExist) return res.status(404).send("Enquete não existe!")

    const isChoiceRepeated = await db.collection("choices").findOne({pollId: pollId, title: title} )
    if(isChoiceRepeated) return res.status(409).send("Resposta já existente")
    

    const today = dayjs(new Date()).format("YYYY-MM-DD HH:mm")
    const poll = await db.collection("polls").findOne({_id: new ObjectId(pollId)})
    let result = moment(today).isSameOrBefore(poll.expireAt)
    if(!result) return res.status(403).send("Enquete expirada.")



    res.locals.choice = {title, pollId}

    next()
}


export async function voteSchemaValidate(req, res, next){
    const choicebyId = req.params.id
    console.log(`choicebyId ${choicebyId}`)

    const today = dayjs(new Date()).format("YYYY-MM-DD HH:mm")
    console.log(`today ${today}`)

    const isChoiceExist = await db.collection("choices").findOne({_id: new ObjectId(choicebyId)})
    console.log(isChoiceExist)
    if(!isChoiceExist) return res.status(404).send("Id inválido")


    let validatePoll = moment(today).isSameOrBefore(isChoiceExist.expireAt)
    if(!validatePoll) return res.status(403).send("Enquete expirada")


    const vote = {
        createdAt: today,
        choiceId: choicebyId,
    }

    res.locals.vote = vote

    next()
}