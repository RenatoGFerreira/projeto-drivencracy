import { pollSchema } from "../schemas/poll.schema.js";
import dayjs from "dayjs";

export async function pollValidateSchema(req, res, next){
    const poll = req.body
    
    const {error} = pollSchema.validate(poll, {abortEarly: false})

    if(error){
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    if(!poll.expireAt){
        res.locals.user = {
            "title": poll.title,
            "expireAt": dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
        }
    }else{
        res.locals.user ={
            "title": poll.title,
            "expireAt": poll.expireAt
        }
    }

    next()
}