const connection = require("./config_API/db.cjs");

const router = require(express).router;

const rotas = router();

rotas.get('./usuarios/funcoes',(req, res )=>{
    res.send('estamos listando todos os alunos')
})
rotas.post('./usuarios/funcoes',(req, res )=>{
    res.send('estamos cadastrando um aluno')
})
rotas.put('./usuarios/funcoes/:id',(req, res )=>{
    res.send('estamos atualizando um aluno')
})
rotas.delete('./usuarios/funcoes/:id',(req, res )=>{
    res.send('estamos deletando um aluno')
})
module.export = connection


