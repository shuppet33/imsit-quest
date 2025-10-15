import dotenv from 'dotenv';
import express from 'express';
import {router as adminRouter} from "./routers/admin.js";
import {router as gameRouter} from "./routers/game.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use('/admin', adminRouter);
app.use('/game', gameRouter);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
