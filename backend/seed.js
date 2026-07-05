// Script para criar o primeiro usuário (admin) do sistema.
// Necessário porque, com a proteção JWT, a rota POST /api/usuarios
// passou a exigir login — e sem nenhum usuário cadastrado, ninguém consegue logar.
//
// Como usar:
//   node seed.js
//
// Rode isso UMA VEZ, direto na pasta backend, antes de usar o sistema
// pela primeira vez (ou sempre que quiser criar outro usuário sem passar pela tela).

const bcrypt = require('bcrypt');
const db = require('./db');

async function criarAdmin() {
  const nome = 'Administrador';
  const email = 'admin@supermercado.com';
  const senha = '123456'; // troque depois de logar, se quiser
  const cpf = '00000000000';

  const jaExiste = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
  if (jaExiste) {
    console.log('⚠️  Já existe um usuário com esse email:', email);
    return;
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  db.prepare('INSERT INTO usuarios (nome, email, senha, cpf) VALUES (?, ?, ?, ?)')
    .run(nome, email, senhaCriptografada, cpf);

  console.log('✅ Usuário admin criado com sucesso!');
  console.log('   Email: ' + email);
  console.log('   Senha: ' + senha);
}

criarAdmin().then(() => process.exit(0));
