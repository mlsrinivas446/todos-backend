const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Todos = require("./todoModel")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}));


async function initializeDBAndServer() {
    try {
        app.listen(process.env.PORT, () => {
            console.log("server running at port",process.env.PORT)
        })
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongoDB connected")
    }
    catch (error) {
        console.log(error.message)
    }
}
initializeDBAndServer()


app.get("/get-todos", async (request, response) => {
    try {
        const todos = await Todos.find({})
        response.status(200).json(todos)
    }
    catch (error) {
        console.error("Error retrieving todos:", error);
        response.status(500).send("Failed to retrieve todos");
    }

})

app.post("/add-todo", async (request, response) => {
    try {
        const { text, isChecked } = request.body; 
        await Todos.insertMany({
            text,
            isChecked
        });
        response.status(200).json("Todo added successfully");
    } catch (error) {
        console.error("Error inserting todo:", error.message);
        response.status(500).send("Failed to add todo");
    }
});

app.put("/update-todo/:id", async (request, response) => {
    try {
        const { id } = request.params 
        const {isChecked} = request.body
        await Todos.updateOne({ _id: id }, { $set: { isChecked: isChecked } })
        response.status(200).send("Todo updated successfully");
    }
    catch (error) {
        console.error("Error update todo:", error.message);
        response.status(500).send("Failed to update todo");
    }

})


app.delete("/delete-todo/:id", async (request, response) => {
    try {
        const { id } = request.params 
        await Todos.deleteMany({ _id: id })
        response.status(200).send("Todo deleted successfully");
    }
    catch (error) {
        console.error("Error delete todo:", error.message);
        response.status(500).send("Failed to delete todo");
    }
    
})


