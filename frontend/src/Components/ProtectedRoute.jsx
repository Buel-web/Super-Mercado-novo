import { Navigate } from 'react-router-dom';

// Envolve as páginas que exigem login.
// Se não houver token salvo, o funcionário é mandado de volta pra tela de login.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
