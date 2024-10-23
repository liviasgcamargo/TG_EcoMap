import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import { useLocation } from 'react-router-dom';
import SugestaoPonto from './SugestaoPonto'; // Importa o componente de sugestão

const ResultadosPontos = () => {
    const [pontos, setPontos] = useState([]);
    const location = useLocation(); // Hook do React Router para pegar query params
    const navigate = useNavigate(); // Hook para redirecionar o usuário

    const handleCadastrarClick = () => {
        navigate('/cadastrar'); // Redireciona para a página de cadastro
    };

    const handleLoginClick = () => {
        navigate('/login'); // Redireciona para a página de login
    };
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const [showPopupSug, setShowPopupSug] = useState(false);

    const openPopup = () => {
        setShowPopupSug(true);
    };

    const closePopup = () => {
        setShowPopupSug(false);
    };


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
        <div>
            <header>
                <div className="container">
                    <div className="logo">
                        <h1>EcoMap</h1>
                    </div>
                    <div className="nav-buttons">
                        <button className="btn" onClick={handleCadastrarClick}>Cadastrar</button>
                        <button className="btn" onClick={handleLoginClick}>Entrar</button>
                    </div>
                </div>
            </header>
        
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

        </div>
        <section className="cta">
                <p>Conhece algum ponto de entrega ainda não registrado? <a href="#" onClick={openPopup}>Clique aqui para sugerir um novo endereço de coleta!</a></p>
            </section>

            {showPopupSug && <SugestaoPonto closePopup={closePopup} />} {/* Renderiza o pop-up */}

            <footer>
                <p>&copy; 2024 EcoMap</p>
                <div className="footer-links">
                    <a href="#">Sobre nós</a>
                    <a href="#">Entre em contato</a>
                </div>
                <div className="social-media">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </footer>
    </div>
    );
};

export default ResultadosPontos;
