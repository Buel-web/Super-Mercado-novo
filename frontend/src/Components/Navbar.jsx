import { useNavigate } from 'react-router-dom';

// Barra de navegação simples usada dentro das páginas protegidas.
// `active` indica qual página atual (usado só pra destacar visualmente, se quiser).
function Navbar({ active }) {
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const botao = (label, path, key) => (
    <button
      onClick={() => navigate(path)}
      style={{
        marginRight: '10px',
        padding: '8px 16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: active === key ? '#333' : '#e0e0e0',
        color: active === key ? 'white' : '#333'
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
      {botao('🛍️ Produtos', '/produtos', 'produtos')}
      {botao('👥 Usuários', '/usuarios', 'usuarios')}
      {botao('🏷️ Promoções', '/promocoes', 'promocoes')}
      <button
        onClick={sair}
        style={{ padding: '8px 16px', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#f44336', color: 'white' }}
      >
        🚪 Sair
      </button>
    </div>
  );
}

export default Navbar;
