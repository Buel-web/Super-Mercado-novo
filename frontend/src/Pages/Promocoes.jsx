import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../Components/Navbar';

function Promocoes() {
  const [produtos, setProdutos] = useState([]);
  const [preco, setPreco] = useState('');
  const [selecionado, setSelecionado] = useState(null);

  const carregarProdutos = async () => {
    const res = await api.get('/produtos');
    setProdutos(res.data);
  };

  useEffect(() => { carregarProdutos(); }, []);

  const aplicarPromocao = async (id) => {
    if (!preco) return alert('Informe o preço promocional!');
    await api.patch(`/produtos/${id}/promocao`, { preco_promocao: preco });
    setPreco('');
    setSelecionado(null);
    carregarProdutos();
  };

  const removerPromocao = async (id) => {
    await api.delete(`/produtos/${id}/promocao`);
    carregarProdutos();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <Navbar active="promocoes" />
      <h2>🏷️ Promoções</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#FF9800', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px' }}>Produto</th>
            <th style={{ padding: '12px' }}>Preço Normal</th>
            <th style={{ padding: '12px' }}>Preço Promoção</th>
            <th style={{ padding: '12px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td style={{ padding: '12px' }}>{p.nome}</td>
              <td style={{ padding: '12px' }}>R$ {p.preco_atual}</td>
              <td style={{ padding: '12px' }}>{p.preco_promocao ? `R$ ${p.preco_promocao}` : '-'}</td>
              <td style={{ padding: '12px' }}>
                {selecionado === p.id ? (
                  <div>
                    <input
                      type="number"
                      placeholder="Novo preço"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      style={{ padding: '5px', width: '100px', marginRight: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button onClick={() => aplicarPromocao(p.id)} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Confirmar</button>
                    <button onClick={() => setSelecionado(null)} style={{ padding: '5px 10px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => setSelecionado(p.id)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Aplicar</button>
                    {p.preco_promocao && <button onClick={() => removerPromocao(p.id)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remover</button>}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Promocoes;