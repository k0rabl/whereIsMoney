import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './auth/routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express()
const URI = process.env.DB_CONNECT

//cors
app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', authRouter)

//connected server
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

//connected mongo
mongoose.connect(URI, {})
