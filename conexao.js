const mysql =require('mysql');

const conexao = mysql.createConnection({
    connectionLimit : 5,
    host : 'localhost',
    user : 'root',
    port : '3306',
    password : 'qwe123',
    database : 'frequencia_bd' 
});

module.exports = conexao;
