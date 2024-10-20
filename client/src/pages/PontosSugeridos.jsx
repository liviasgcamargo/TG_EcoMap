import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PontosSugeridos = ({ closePopup, openPontoDetails }) => {
    const [pontos, setPontos] = useState([]);

    useEffect(() => {
        const fetchPontos = async () => {
            try {
                const res = await axios.get('http://localhost:8000/pontosSugeridos');
                setPontos(res.data);
            } catch (err) {
                console.error('Erro ao buscar pontos sugeridos:', err);
            }
        };

        fetchPontos();
    }, []);

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={closePopup}>&times;</span>
                <h3>Pontos de Coleta Sugeridos</h3>
                <ul className="pontos-lista">
                    {pontos.map((ponto) => (
                        <li key={ponto.pontoid}>
                            <a href="#" onClick={() => openPontoDetails(ponto)}>
                                {ponto.endereco}, {ponto.cidade}, {ponto.estado}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PontosSugeridos;
