import React, { useState } from 'react';
import PontosSugeridos from './PontosSugeridos';
import DetalhesPontoSugerido from './DetalhesPontoSugerido';
import AdicionarPonto from './AdicionarPonto'; // Importar o novo pop-up
import GerenciarPontos from './GerenciarPontos';

const Admin = () => {
    const [showPopup, setShowPopup] = useState({});
    const [selectedPonto, setSelectedPonto] = useState(null);

    const openPopup = (popupType) => {
        setShowPopup({ [popupType]: true });
    };

    const closePopup = () => {
        setShowPopup({});
        setSelectedPonto(null); // Reseta o ponto selecionado quando o pop-up é fechado
    };

    const openPontoDetails = (ponto) => {
        setSelectedPonto(ponto);
        openPopup('detalhesPonto');
    };


    return (
        <div className="admin-container">
            <header>
                <h1>Gerenciar Informações</h1>
            </header>

            <div className="admin-actions">
                <button className="btn" onClick={() => openPopup('pontosSugeridos')}>Pontos de coleta sugerido</button>
                <button className="btn" onClick={() => openPopup('adicionarPonto')}>Adicionar novo ponto de coleta</button>
                <button className="btn" onClick={() => openPopup('editarPonto')}>Editar ponto de coleta</button>
                <button className="btn" onClick={() => openPopup('cadastroEmpresa')}>Cadastro de empresa</button>
            </div>

            {/* Pop-ups para cada ação */}
            {showPopup.pontosSugeridos && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Pontos de Coleta Sugerido</h3>
                        <button onClick={closePopup}>Fechar</button>
                    </div>
                </div>
            )}

            {showPopup.adicionarPonto && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Adicionar Novo Ponto de Coleta</h3>
                        <button onClick={closePopup}>Fechar</button>
                    </div>
                </div>
            )}

            {showPopup.editarPonto && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Editar Ponto de Coleta</h3>
                        <button onClick={closePopup}>Fechar</button>
                    </div>
                </div>
            )}

            {showPopup.cadastroEmpresa && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Cadastro de Empresa</h3>
                        <button onClick={closePopup}>Fechar</button>
                    </div>
                </div>
            )}
            {showPopup.pontosSugeridos && (
                <PontosSugeridos closePopup={closePopup} openPontoDetails={openPontoDetails} />
            )}

{showPopup.detalhesPonto && selectedPonto && (
                <DetalhesPontoSugerido ponto={selectedPonto} closePopup={closePopup} />
            )}

             {/* Pop-up de Adicionar Ponto */}
             {showPopup.adicionarPonto && (
                <AdicionarPonto closePopup={closePopup} />
            )}

            {/* Pop-up de Gerenciar Pontos (Edição/Exclusão) */}
            {showPopup.editarPonto && (
                <GerenciarPontos closePopup={closePopup} />
            )}
        </div>
    );
};

export default Admin;
