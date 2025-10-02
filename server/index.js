import dotenv from 'dotenv';
import express from 'express'
import {router} from "./routes.js";
dotenv.config()

const app = express()

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use('/api', router)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
