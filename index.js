import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import produitRouter from './routers/produitRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(produitRouter)

app.get("/", (req, res) => {
  res.json({
    msg: "Eshop backend",
  })
})

const PORT = process.env.APP_PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
