import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import PopupBuscarPonto from './PopupBuscarPonto';
import SugestaoPonto from './SugestaoPonto'; // Importa o componente de sugestão

const Informacao = () => {
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

            <section className="cta">
                <div>
                    <h2>O que é Reciclagem?</h2>
                    <p>A reciclagem é o processo de reaproveitamento de materiais descartados. 
                        Seu objetivo é reintroduzi-los na cadeia produtiva a fim de que ainda gerem valor e sejam reutilizados, aumentando a preservação dos recursos naturais e melhorando a qualidade de vida das pessoas. 
                        É considerada uma das alternativas mais eficientes para tratar os resíduos sólidos, tanto do ponto de vista ambiental quanto social, e está diretamente inserida no contexto da economia circular.</p>
                </div>
                <div>
                    <h2>Como Reciclar?</h2>
                    <p>A reciclagem é o processo de reaproveitamento de materiais descartados. 
                        Seu objetivo é reintroduzi-los na cadeia produtiva a fim de que ainda gerem valor e sejam reutilizados, aumentando a preservação dos recursos naturais e melhorando a qualidade de vida das pessoas. 
                        É considerada uma das alternativas mais eficientes para tratar os resíduos sólidos, tanto do ponto de vista ambiental quanto social, e está diretamente inserida no contexto da economia circular.</p>
                </div>
                <div>
                    <h2>Como Reciclar?</h2>
                    <p>A reciclagem é o processo de reaproveitamento de materiais descartados. 
                        Seu objetivo é reintroduzi-los na cadeia produtiva a fim de que ainda gerem valor e sejam reutilizados, aumentando a preservação dos recursos naturais e melhorando a qualidade de vida das pessoas. 
                        É considerada uma das alternativas mais eficientes para tratar os resíduos sólidos, tanto do ponto de vista ambiental quanto social, e está diretamente inserida no contexto da economia circular.</p>
                </div>
            </section>
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
            {showPopup && <PopupBuscarPonto onClose={handleClosePopup} />}
        </div>
    );
};

export default Informacao;
