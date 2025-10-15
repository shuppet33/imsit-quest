import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { gameState, teams, tasks } from "../db/db.js";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET

export const router = new Router();

async function generateToken(team) {
    return jwt.sign({ name: team.name }, SECRET_KEY, { expiresIn: "2h" }
    )
}



router.post('/code', async (req, res) => {
    const { name, code } = req.body;

    if (!gameState.started) {
        return res.json({ error: 'Игра не началась' });
    }

    const team = teams.find(t => t.name === name);
    if (!team) {
        return res.json({ error: 'Команда не найдена' });
    }

    const token = generateToken(team);
    console.log(token);

    const currentTaskId = team.order[team.currentTaskIndex];
    const currentTask = tasks.find(t => t.id === currentTaskId);

    if (!currentTask) {
        return res.json({ error: 'Задание не найдено' });
    }

    if (currentTask.code === code) {
        team.currentTaskIndex++;

        if (team.currentTaskIndex >= team.order.length) {
            return res.json({ message: 'Поздравляем! Вы прошли все задания!' });
        }

        const nextTaskId = team.order[team.currentTaskIndex];
        const nextTask = tasks.find(t => t.id === nextTaskId);

        return res.json({
            message: 'Правильный код! Перейдите к следующей локации.',
            nextTask: {
                title: nextTask.title,
                hint: nextTask.hint
            }
        });
    } else {
        return res.json({ error: 'Неверный код. Попробуйте снова.' });
    }
});


//вход команд
router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    const team = teams.find(t => t.name === name);
    if (!team) {
        return res.status(404).json({ error: "Команда не найдена" });
    }

    const isMatch = await bcrypt.compare(password, team.hashedPassword);
    if (!isMatch) {
        return res.status(401).json({ error: "Неверный пароль" });
    }

    return res.json({
        message: `Команда ${team.name} вошла в систему`,
        team: {
            name: team.name,
            currentTaskIndex: team.currentTaskIndex,
            finished: team.finished
        }
    });
});
