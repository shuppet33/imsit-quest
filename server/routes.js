import {Router} from "express";

export const router = new Router()

router.get('/test', (req, res) => {
    res.json({a: 6})
} )