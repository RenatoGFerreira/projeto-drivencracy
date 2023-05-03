import { MongoClient, ObjectId } from "mongodb";
import { db } from "../database/database.js";
import { choiceSchema } from "../schemas/choice.schema.js";

export async function choiceValidateSchema(req, res, next) {
  const choice = req.body;
  console.log(choice);

  const validation = choiceSchema.validate(choice);
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const checkPoll = await db.collection("polls").findOne({ _id: new ObjectId(choice.pollId) });
  if (!checkPoll) {
    return res.status(404).send("Não existe essa opção de enquete");
  }
  const checkTitle = await db.collection("choices").findOne({ title: choice.title})
  if(checkTitle){
    return res.status(409).send("Title não pode ser repetido")
  }

  // Se a enquete já estiver expirado deve retornar erro com status 403.
  // Deve retornar a opção de voto criada em caso de sucesso com status 201.

  res.locals.choice = choice;
  next();
}
