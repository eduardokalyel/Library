const livroRoute = require('./Routes/livro.js')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const app = express()


app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use("/livros", livroRoute)

mongoose.connect('mongodb://127.0.0.1:27017/local', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));


app.listen(PORT, () => {
    console.log(`Porta funcionando ${PORT}`)
})