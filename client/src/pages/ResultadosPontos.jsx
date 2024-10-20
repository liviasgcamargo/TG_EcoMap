import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResultadosPontos = () => {
    const [pontos, setPontos] = useState([]);
    const location = useLocation(); // Hook do React Router para pegar query params

    useEffect(() => {
        const fetchPontos = async () => {
            const queryParams = new URLSearchParams(location.search);
            const cep = queryParams.get('cep');
            const tipo_material = queryParams.get('tipo_material');

            try {
                const res = await axios.get('http://localhost:8000/buscarPontos', {
                    params: {
                        cep,
                        tipo_material
                    }
                });
                setPontos(res.data);
            } catch (err) {
                console.error('Erro ao buscar pontos de coleta:', err);
            }
        };

        fetchPontos();
    }, [location]);

    return (
        <div className="resultados-pontos">
            <h1>Pontos de Coleta Próximos de Você</h1>
            <div className="search-bar">
                <input type="text" placeholder="Pesquisar endereço" />
            </div>

            <div className="pontos-lista">
                {pontos.length > 0 ? (
                    pontos.map((ponto) => (
                        <div key={ponto.pontoid} className="ponto-item">
                            <h2>{ponto.pontoname}</h2>
                            <p>{ponto.endereco || "Endereço não disponível"}, {ponto.cep}</p>
                            <p>Material: {ponto.tipo_material}</p>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${ponto.latitude},${ponto.longitude}`} target="_blank" rel="noopener noreferrer">
                                Como chegar
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Nenhum ponto de coleta encontrado com os critérios fornecidos.</p>
                )}
            </div>

            <footer>
                <p>&copy; 2024 EcoMap</p>
                <a href="#">Clique aqui para sugerir um novo endereço de coleta!</a>
            </footer>
        </div>
    );
};

export default ResultadosPontos;
