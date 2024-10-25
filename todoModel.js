const mongoose = require("mongoose")

const TodoModel =new mongoose.Schema({
    text: { type: String },
    isChecked: { type: Boolean }
})

const Todos = mongoose.model("Todos", TodoModel)

module.exports = Todos