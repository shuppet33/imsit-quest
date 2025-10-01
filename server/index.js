import express, {Router} from 'express'

const app = express()

app.use(express.json())

app.get('/api', (req, res) => {
    res.json({a: 5})
})


app.listen(5000, () => {
    console.log('сервер запущен')
})

