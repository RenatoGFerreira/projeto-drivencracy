

export async function choiceValidateSchema(req, res, next) {
  const { title, pollId } = req.body;


            // Uma opção de voto não pode ser inserida sem uma enquete existente, retornar status 404.
            // **Title** não pode ser uma string vazia, retornar status 422.
            // **Title** não pode ser repetido, retornar status 409.
            // Se a enquete já estiver expirado deve retornar erro com status 403.
            // Deve retornar a opção de voto criada em caso de sucesso com status 201.


  next()
}
