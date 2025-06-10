const express = require('express');
// importaçoes:
const app = express();

const tabelas = require('../config_API/tebelas.js');
const conexao = require('../config_API/db.cjs');

// Middleware para JSON
app.use(express.json());

// Inicializa as tabelas
tabelas.init(conexao);

// Página de cadastro
app.post('/usuarios', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).send('Email e senha são obrigatórios!');
    }
    const sql = 'INSERT INTO administracao (login, senha) VALUES (?, ?)';
    conexao.query(sql, [email, senha], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao cadastrar usuário!');
        }
        res.send('Usuário cadastrado com sucesso!');
    });
});

// Página de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).send('Email e senha são obrigatórios!');
    }
    const sql = 'SELECT * FROM administracao WHERE login = ? AND senha = ?';
    conexao.query(sql, [email, senha], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao fazer login!');
        }
        if (result.length > 0) {
            res.send('Login realizado com sucesso!');
        } else {
            res.status(401).send('Usuário ou senha inválidos!');
        }
    });
});

// Consulta de aluno pelo QRCode
app.get('/aluno', (req, res) => {
    const { qrcode } = req.query;
    if (!qrcode) {
        return res.status(400).send('QRCode é obrigatório!');
    }
    const sql = 'SELECT * FROM aluno WHERE qrcode = ?';
    conexao.query(sql, [qrcode], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar aluno!');
        }
        res.send(result);
    });
});



