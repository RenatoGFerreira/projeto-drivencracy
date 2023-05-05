import { db } from "../database/database.js";

export async function postChoice(req, res){
    const choice = res.locals.choice
    console.log(choice)

    try{
        await db.collection("choices").insertOne({ choice });
        res.status(201).send("Resposta criada com sucesso")


    }catch (err) {
        return res.status(500).send(err.message);
      }
}

export async function getPollOptions(req, res){
    const id = req.params.id

    try{
        const existChoices = await db.collection("choices").find({}).toArray()
        const pollChoices = existChoices.filter((item) => item.pollId === id)
        if (pollChoices.length === 0 ) return res.status(404).send("Enquete não encontrada!")
        res.status(200).send(pollChoices)
      
    }catch (err) {
        return res.status(500).send(err.message);
      }
}


