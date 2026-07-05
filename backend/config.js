// Centraliza configurações compartilhadas do backend.
// Em produção, o ideal é ler isso de uma variável de ambiente (process.env.JWT_SECRET)
// em vez de deixar fixo no código.
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'supermercado_secreto'
};
