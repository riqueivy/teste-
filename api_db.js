class Tabelas {
    init(conexao) {
      this.conexao = conexao;
      this.criarTabelas();
      module.exports = new Tabelas();
    }
  
    executarQuery(sql) {
      this.conexao.query(sql, (erro, resultado) => {
        if (erro) {
          console.log("Erro ao criar tabela: ", erro);
        } else {
          console.log("Tabela criada com sucesso!");
        }
      });
    }
  
    criarTabelas() {
      const tabelas = [
        `CREATE TABLE IF NOT EXISTS administracao (
          id_adm INT NOT NULL PRIMARY KEY,
          senha INT NOT NULL,
          login VARCHAR(30) NOT NULL
        )`,
        
        `CREATE TABLE IF NOT EXISTS aluno (
          matricula VARCHAR(20) PRIMARY KEY,
          nome VARCHAR(50) NOT NULL
        )`,
        
        `CREATE TABLE IF NOT EXISTS frequencia (
          id_frequencia VARCHAR(20) PRIMARY KEY,
          status_fr VARCHAR(10) NOT NULL,
          hora TIME NOT NULL,
          data_fr DATE NOT NULL,
          fk_matricula VARCHAR(20) NOT NULL,
          FOREIGN KEY (fk_matricula) REFERENCES aluno(matricula)
        )`,
        
        `CREATE TABLE IF NOT EXISTS resumo_frequencia (
          id_resumo_frequencia VARCHAR(4) PRIMARY KEY,
          total_faltas INT NOT NULL,
          total_atrasos INT NOT NULL,
          total_presencas INT NOT NULL,
          data_registro DATE NOT NULL,
          data_inicio_periodo DATE NOT NULL,
          tipo_periodo VARCHAR(10) NOT NULL,
          ano_letivo YEAR NOT NULL,
          fk_matricula VARCHAR(20) NOT NULL,
          fk_turma VARCHAR(2) NOT NULL,
          FOREIGN KEY (fk_matricula) REFERENCES aluno(matricula),
          FOREIGN KEY (fk_turma) REFERENCES turma(codigo_turma)
        )`,
        
        `CREATE TABLE IF NOT EXISTS turma (
          codigo_turma VARCHAR(2) PRIMARY KEY,
          ano_entrada YEAR NOT NULL,
          serie INT NOT NULL,
          turma VARCHAR(5) NOT NULL
        )`
      ];
  
      tabelas.forEach(sql => this.executarQuery(sql));
      
    }
  }
