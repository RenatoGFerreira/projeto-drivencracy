import { db } from "../database/database.js";

export async function postPoll(req, res) {
  const pollObject = res.locals.user;

  try {
    await db.collection("polls").insertOne(pollObject);
    return res.status(201).send("created");
  } catch (err) {
    return res.status(500).send(err.message);
  }
}


export async function getPolls(req, res){
    try{
        const polls = await db.collection("polls").find().toArray()
        return res.status(201).send(polls)
    }catch(err){
        return res.status(500).send(err.message)
    }
}