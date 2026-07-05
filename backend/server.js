const express = require('express');
const cors = require('cors');
const verificarToken = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/teste', (req, res) => {
  res.json({ mensagem: 'funcionou!' });
});

// A rota de login fica de fora da proteção, senão ninguém consegue logar
try {
  const authRoutes = require('./resources/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ auth carregado');
} catch(e) {
  console.log('❌ erro em auth:', e.message);
}

// A partir daqui, todas as rotas exigem um token JWT válido
try {
  const usuariosRoutes = require('./resources/Usuarios-resources');
  app.use('/api/usuarios', verificarToken, usuariosRoutes);
  console.log('✅ usuarios carregado');
} catch(e) {
  console.log('❌ erro em usuarios:', e.message);
}

try {
  const produtosRoutes = require('./resources/Produtos-resources');
  app.use('/api/produtos', verificarToken, produtosRoutes);
  console.log('✅ produtos carregado');
} catch(e) {
  console.log('❌ erro em produtos:', e.message);
}

try {
  const clientesRoutes = require('./resources/Clientes-resources');
  app.use('/api/clientes', verificarToken, clientesRoutes);
  console.log('✅ clientes carregado');
} catch(e) {
  console.log('❌ erro em clientes:', e.message);
}

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001 🚀');
});