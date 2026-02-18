import express from 'express'
import 'dotenv/config'
import connectDB from './Connections/connectDb.js';
import { FortressKey } from './models/Schema.js';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 3000;

// parser the data from frontend to backend
app.use(express.json())

// third-party middleware - Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: process.env.CLIENT_URI, // your fontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // your methods
    // credentials: true // only if we are using cookies/auth
}));

// Connect to database
connectDB()

// get the passwords
app.get('/', async (req, res) => {
    const datas = await FortressKey.find()
    res.json(datas);
})

    // create the data
    .post('/', async (req, res) => {
        try {
            await FortressKey.create({
                id: uuidv4(),
                siteURL: req.body.siteURL,
                username: req.body.username,
                password: req.body.password,
            })
            res.status(201).json({ create: true });
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
    // Update the data
    .put('/', async (req, res) => {
        try {
            const data = await FortressKey.findOneAndUpdate(
                { id: req.body.id, },
                {
                    siteURL: req.body.siteURL,
                    username: req.body.username,
                    password: req.body.password,
                }
            )
            if (!data) {
                res.status(404).json({ message: "Entry not found!" })
            }
            res.status(200).json({ update: true })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })

    //delete the data
    .delete('/', async (req, res) => {
        try {
            const data = await FortressKey.deleteOne({
                id: req.body.id
            })
            if (!data) {
                res.status(400).json({ message: "Entry is not found!" })
            }
            res.status(200).json({ delete: true })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
