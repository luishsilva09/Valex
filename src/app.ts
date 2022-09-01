import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import router from "./routes/index";
import  getError  from './middlewares/getError';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(getError);

const PORT:number = Number(process.env.PORT) || 5000

app.listen(PORT, () =>
  console.log(`Servidor online na porta ${PORT}`)
); 