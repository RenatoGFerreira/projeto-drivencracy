import { db } from "../database/database.js";
import { ObjectId } from "mongodb";

export async function postChoice(req, res){
    const {title, pollId} = res.locals.choice
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
        const existPull = await db.collection("polls").findOne({_id: new ObjectId(id)})
        if(!existPull) return res.status(404).send("Enquete inexistente.")
        
        const existChoices = await db.collection("choices").find({pollId:id}).toArray()
        if (existChoices.length === 0 ) return res.status(200).send("Nenhuma opção de voto encontrado para esta enquete!")
    
        res.status(200).send(existChoices)
    }catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function voteId(req, res){
    const vote = res.locals.vote

    try{
        await db.collection("votes").insertOne(vote)
        res.status(201).send("Voto criado com sucesso.")

    }catch(err){
        return res.status(500).send(err.message)
    }
}