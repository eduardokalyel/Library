const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/local')
const { Schema } = mongoose
const livroSchema = new Schema({

   id: String,
   titulo: String,
   paginas: Number,
   isbn: String,
   editora: String,

}, { timestamps: true })

const livroModel = mongoose.model('livros', livroSchema)

module.exports = livroModel