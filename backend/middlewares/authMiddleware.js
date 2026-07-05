const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Middleware que exige um token JWT válido no header Authorization.
// Formato esperado: "Authorization: Bearer <token>"
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não informado' });
  }

  const partes = authHeader.split(' ');
  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({ erro: 'Token mal formatado' });
  }

  const token = partes[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
    // Disponibiliza os dados do usuário logado para as próximas rotas, se precisar
    req.usuario = decoded;
    next();
  });
}

module.exports = verificarToken;
