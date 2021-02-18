import express from "express"
import cors from "cors"
import connectDB from "./config/db"
import morgan from "morgan"
import dotenv from "dotenv"

import userRoutes from "./routes/userRoutes"
import questionRoutes from "./routes/questionRoutes"

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 6960

app.use(express.json())
app.use(cors())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use("/api/users", userRoutes)
app.use("/api/questions", questionRoutes)

app.listen(PORT, () =>
  console.log(`Experience the magic at http://localhost:${PORT}`)
)
