import { db } from "../database/database.js";

export async function postChoice(req, res) {
    const choice = res.locals.choice

    try{
        await db.collection("choices").insertOne(choice);
        return res.status(201).send("created");
        
    }catch(err){
        return res.status(500).send(err.message)
    }
}
