import {Router} from "express";
import {UsersDB} from "./db/db.js";
import { v7 as uuidv7 } from 'uuid';

export const router = new Router()

const correctAnswers = {
    task1: "бибаибоба",
    task2: "qwerty"
};

router.post("/answer", (req, res) => {
    const { task, answer } = req.body


    if (task || answer) {
        return res.status(400).json({ message: "нужно передать два параметра" })
    }

    const userAnswer = answer.toLowerCase()
    const correct = correctAnswers[task]

    res.json({ correct: userAnswer === correct })



});