import { db } from "../database/database.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function postChoice(req, res){
    const {title, pollId} = res.locals.choice
    console.log(title, pollId)

    try{
        await db.collection("choices").insertOne({ title, pollId });
        res.status(201).send("Resposta criada com sucesso")


    }catch (err) {
        return res.status(500).send(err.message);
      }
}

export async function getPollOptions(req, res){
    const id = req.params.id


    try{
        const existChoices = await db.collection("choices").find({}).toArray()
        const pollChoices = existChoices.filter((poll) => poll.pollId === id)
        if (pollChoices.length === 0 ) return res.status(404).send("Enquete não encontrada!")
        res.status(200).send(pollChoices)
    }catch (err) {
        return res.status(500).send(err.message);
      }
}


export async function voteId(req, res){
    const choicebyId = req.params
    const currentDate = dayjs(new Date()).format("YYYY-MM-DD HH:mm")

    const vote = {
        createdAt: currentDate,
        choiceId: choicebyId,
    }

    try{
        await db.collection("votes").insertOne(vote)
        res.status(201).send("Voto criado com sucesso.")

    }catch(err){
        return res.status(500).send(err.message)
    }
}