import {Router} from "express";
// import {UsersDB} from "./db/db.js";
import bcrypt from "bcrypt";
const salt = "qweqwfhkehgfjhegwfj"
export const router = new Router()

const correctAnswers = {
    task1: "123",
    task2: "231"
};
//он хэширует ответ с такой же солью ,что и предыдущий. норм . ехало
router.post("/answer", async (req, res) => {
    const { task, answer } = req.body

    if (!task || !answer) {
        return res.status(400).json({ message: "нужно передать два параметра" })
    }

    const userAnswer = answer.toLowerCase()
    const correct = correctAnswers[task]
    let isCorrect = userAnswer === correct;


    const saltRounds = "123"
    let answerHash = await bcrypt.hash(userAnswer, saltRounds);

    const salt = bcrypt.genSaltSync(10); // генерация "правильной" соли

    res.json({
        correct: isCorrect,
        message: "ответ сохранён",
        task,
        hash: answerHash,
        salt
    });

});
//надо , короче , сделать хэщирование через соль одиннаковую, чтобы потом проверять пароль из бд ,
// который зашифрован и ответ , который приелетел и надо его потом зашировать той же солью

//позже надо сделать недо бд. Вопрос - ответ зашифрованный

//task1 - hfjlgehgkjerh
//task2 - wkfkebrhbbher
//вот по такому же принципу



