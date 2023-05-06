import { db } from "../database/database.js"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

export async function postPoll(req, res){
    const poll = res.locals.poll

    try{
        await db.collection("polls").insertOne(poll);
        return res.status(201).send("created");

    }catch (err) {
        return res.status(500).send(err.message);
      }
}

export async function getPoll(req, res){
    try{
        const polls = await db.collection("polls").find().toArray()
        return res.status(201).send(polls)
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function showPollResult(req, res){
    const pollId = req.params.id

    const poll = await pollCollection.findOne({ _id: new ObjectId(pollId) })
    if(!poll) return res.status(404).send("Enquete inexistente!")

    
    try{

    }catch(err){
        return res.status(500).send(err.message)
    }
}