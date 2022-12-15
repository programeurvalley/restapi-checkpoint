const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")

const app = express()
app.use(express.json())
const router = express.Router()

const User = require('./models/User')

dotenv.config({ path: './config/.env' })

// Connect To Database 

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xttzpjy.mongodb.net/Users`, { useNewUrlParser: true, useUnifiedTopology: true });

// Create the server

app.listen(3000, function () {
    console.log("Server is running on localhost:3000");
});

//! RETURN ALL USERS 

router.get("/getAllusers", async (req, res) => {
	const users = await User.find()
	res.send(users)
    console.log(users)
})

//! ADD A NEW USER TO THE DATABASE

router.post('/adduser', async (req, res) => {
    const data = new User({
        id: req.body.id,
        username: req.body.username,
        password : req.body.password,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//!  EDIT A USER BY ID

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//! REMOVE A USER BY ID 

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.username} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//? Browse :  http://localhost:3000/api/getAllusers

app.use("/api" , router)
