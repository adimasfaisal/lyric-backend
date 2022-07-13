import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import cors from 'cors';

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use('/api', routes);
app.get('/', (req, res) => res.send(process.env.APPLICATION_NAME));

app.listen(port, () => console.log(`Example app listening on port ${port} ${process.env.APPLICATION_NAME}!`));