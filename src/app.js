import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import pollRoutes from "./routes/poll.routes.js"
import choiceRoutes from "./routes/choice.routes.js"

const port = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(pollRoutes)
app.use(choiceRoutes)




app.listen(port, () => {
    console.log(`Server running in port ${port}.`);
  });
  