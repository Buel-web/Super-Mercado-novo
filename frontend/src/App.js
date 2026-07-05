import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Produtos from './Pages/Produtos';
import Usuarios from './Pages/Usuarios';
import Promocoes from './Pages/Promocoes';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <Produtos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promocoes"
          element={
            <ProtectedRoute>
              <Promocoes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;