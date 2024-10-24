import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import PopupBuscarPonto from './PopupBuscarPonto';
import SugestaoPonto from './SugestaoPonto'; // Importa o componente de sugestão

const Home = () => {
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
                    <div>
                        
                    </div>
                    <div class="menu_itens">
                        <a class="menu_item" href="/home">Home</a>
                        <a class="menu_item" href="/info">Guia de Reciclagem</a>
                        <a class="menu_item" href="/info">Perguntas Frequentes</a>
                        <a class="menu_item" href="/info">Sobre nós</a>
                    </div>
                    <div className="nav-buttons">
                        <button className="btn" onClick={handleCadastrarClick}>Cadastrar</button>
                        <button className="btn" onClick={handleLoginClick}>Entrar</button>
                    </div>
                </div>
            </header>

            <section className="hero">
                <h2>Encontre o ponto mais próximo de você</h2>
                <p>Localize pontos de coleta próximos e tome a iniciativa de fazer a diferença. Escolha uma das opções abaixo para começar.</p>
                <div className="actions">
                <button className="btn-primary" onClick={handleOpenPopup}>Quero Descartar</button>
                    <button className="btn-primary" onClick={handleOpenPopup}>Quero Doar</button>
                    <button className="btn-primary" onClick={handleOpenPopup}>Quero Comprar ou Vender</button>
                </div>
            </section>

            <section className="info-cards">
                {/* <div className="card">
                <div class="container-cards"> */}
    <div class="card">
      <h4 class="tituloCard"><a href="/info">O que reciclar?</a></h4>
      {/* <img src="/img/icon_box1.png" alt="Avatar"> */}
      <div class="container">
        <p class="textoCard">Clique para saber mais sobre os tipos de materiais que devem ser descartados adequadamente
        </p>
      </div>
    </div>

    <div class="card">
      <h4 class="tituloCard"><a href="/info">Como reciclar?</a></h4>
      {/* <img src="/img/icon_box2.png" alt="Avatar"> */}
      <div class="container">
        <p class="textoCard">Você conhece os métodos ideais para descartar cada tipo de material?</p>
      </div>
    </div>

    <div class="card">
      <h4 class="tituloCard"><a href="/info">Os impactos da reciclagem</a></h4>
      {/* <img src="/img/icon_box3.png" alt="Avatar"> */}
      <div class="container">
        <p class="textoCard">Aprenda sobre os impactos da reciclagem no meio ambiente</p>
      </div>
    </div>
  {/* </div>
                </div> */}
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

export default Home;
