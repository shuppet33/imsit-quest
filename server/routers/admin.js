import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import generatePassword from 'generate-password';
import { Router } from "express"
import {gameState, teams} from "../db/db.js"

dotenv.config();

export const router = new Router()

//get для получения списка команд
router.get("/teams", (req, res) => {
    const data = teams.map(t => ({
        name: t.name,
        password: t.password,
        currentTaskIndex: t.currentTaskIndex,
        finished: t.finished
    }));
    res.json(data);
})

//так , теперь пост запрос с созданием команды и генерации кода
router.post("/createTeams", async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ error: "Имя команды обязательно" });
    }
    const createdTeams = []

    const simplePassword = generatePassword.generate({
        length: 6,
        numbers: true,
        lowercase: true,

    });
    const hashedPassword = await bcrypt.hash(simplePassword, 10);
    console.log(hashedPassword);

    const newTeam = {
        name,
        hashedPassword,
        currentTaskIndex: 0,
        finished: false
    }
    teams.push(newTeam)

    createdTeams.push({
        name,
        password: simplePassword
    })

    res.status(201).json({
        message: "Команда создана йоу",
        teams: createdTeams
    });

});
//состояние игр. НАчало/стоп/состояние

router.post("/game/stop", async (req, res) => {
    gameState.started = true;
    res.status(200).json({ message: "Игра началась" });
});

router.post("/game/stop", async (req, res) => {
    gameState.stopped = false;
    res.status(200).json({message: "Стоп игра"})
})

router.get("/game/state", (req, res) => {
    if (gameState === true){
        res.status(200).json({message:"Игра работает"})
    }else{
        res.status(200).json({message:"Игра выключена"})
    }
});

//теперь старт игры , но это уже вебсокеты нужны , чтобы там открывался канал. Для самого-самого начала нужно логику прохождение ебануть
