const express = require('express');
const router = express.Router();
const livroModel = require('../livros.modules/livros.model'); 

router.get('/', async (req, res) => {
    try {
        const livros = await livroModel.find();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({status: 'ERRO', mensagem: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const livro = await livroModel.findOne({id: req.params.id});
        if (!livro) throw new Error('Livro não encontrado');
        res.status(200).json(livro);
    } catch (error) {
        res.status(500).json({status: 'ERRO', mensagem: error.message});
    }
});

router.post('/', async (req, res) => { 
    try {
        const { id, titulo, paginas, isbn, editora } = req.body;
        const novoLivro = new livroModel({ id, titulo, paginas, isbn, editora });
        const respostaBD = await novoLivro.save();
        res.status(201).json({ status: 'OK', mensagem: 'Livro criado com sucesso', livro: respostaBD });
    } catch (error) {
        res.status(500).json({ status: 'ERRO', mensagem: error.message });
    }
});

router.put('/:id', async (req, res) => { 
    try {
        const { id, titulo, paginas, isbn, editora } = req.body;
        const livroAtualizado = await livroModel.findOneAndUpdate( {id: req.params.id}, { id, titulo, paginas, isbn, editora }, { new: true });
        if (!livroAtualizado) throw new Error('Livro não encontrado');
        res.status(200).json({ status: 'Ok', mensagem: 'Livro atualizado com sucesso', livro: livroAtualizado });
    } catch (error) {
        res.status(500).json({ status: 'ERRO', mensagem: error.message });
    }
});

router.delete('/:id', async (req, res) => { 
    try {
        const livroDeletado = await livroModel.findOneAndDelete( {id: req.params.id} );
        if (!livroDeletado) throw new Error('Livro não encontrado');
        res.status(200).json({ status: 'Ok', mensagem: 'Livro deletado com sucesso', livro: livroDeletado });
    } catch (error) {
        res.status(500).json({ status: 'ERRO', mensagem: error.message });
    }
});

module.exports = router;