import dayjs from "dayjs"

export default function validateSchema(schema){

    return(req, res, next) =>{
    const poll = req.body
    const validation = schema.validate(poll, { abortEarly: false})

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    if(!poll.expireAt){
        const date = dayjs().add(30, 'day').format("YYYY-MM-DD HH:mm")
        poll.expireAt = date
    }

    res.locals.poll = poll

        next()
    }
}