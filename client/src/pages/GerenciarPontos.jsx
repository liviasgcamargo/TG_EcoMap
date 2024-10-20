import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarPontoPopup from './EditarPontoPopup';

const GerenciarPontos = () => {
    const [pontos, setPontos] = useState([]);
    const [selectedPonto, setSelectedPonto] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);

    useEffect(() => {
        const fetchPontos = async () => {
            try {
                const res = await axios.get('http://localhost:8000/pontosValidados');
                setPontos(res.data);
            } catch (err) {
                console.error('Erro ao buscar pontos de coleta:', err);
            }
        };

        fetchPontos();
    }, []);

    const handleEditClick = (ponto) => {
        setSelectedPonto(ponto);
        setShowEditPopup(true);
    };

    const handleDeleteClick = async (pontoId) => {
        try {
            await axios.delete(`http://localhost:8000/excluirPonto/${pontoId}`);
            alert('Ponto excluído com sucesso!');
            setPontos(pontos.filter((ponto) => ponto.pontoid !== pontoId));
        } catch (err) {
            console.error('Erro ao excluir ponto:', err);
            alert('Erro ao excluir ponto.');
        }
    };

    const closePopup = () => {
        setShowEditPopup(false);
        setSelectedPonto(null);
    };

    return (
        <div className="gerenciar-pontos-container">
            <h1>Gerenciar Pontos de Coleta</h1>
            <input type="text" placeholder="Pesquisar por ponto de coleta" className="search-input" />

            <div className="pontos-lista">
                {pontos.map((ponto) => (
                    <div className="ponto-item" key={ponto.pontoid}>
                        <p>{ponto.endereco}</p>
                        <div className="ponto-tags">
                            <span>{ponto.tipo_material}</span>
                        </div>
                        <div className="ponto-actions">
                            <button onClick={() => handleEditClick(ponto)} className="btn-edit">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => handleDeleteClick(ponto.pontoid)} className="btn-delete">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showEditPopup && selectedPonto && (
                <EditarPontoPopup ponto={selectedPonto} closePopup={closePopup} />
            )}
        </div>
    );
};

export default GerenciarPontos;
