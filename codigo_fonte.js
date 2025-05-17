const express = require('express');
// importaçoes:
const app = express();

const tabelas = require('./config_API/tebelas');

const conexao = require('./config_API/db.cjs');

const router = require('./routers.js');

app.use = (express.json())

//pagina de cadastro
app.post('/usuarios', (req, res)=>{
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO administracao (id_adm, login, senha) VALUES (?, ?, ?)';
    
    connection.query(sql, [nome, email, senha], (err, result) => {
        if (err) throw err;
        res.send('Usuário cadastrado com sucesso!');
    });


})



//pagina de login
app.get('/usuarios', (req, res)=>{
    const { email, senha } = req.body;
    const sql = 'SELECT * FROM administracao WHERE login = ? AND senha = ?';

    res.send('ok')
})

app.get('/usuarios', (req, res)=> {
    res.send('bem vindo')
})

app.listen(3000)
