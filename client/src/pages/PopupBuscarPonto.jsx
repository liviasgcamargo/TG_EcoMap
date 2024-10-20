import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PopupBuscarPonto = ({ onClose }) => {
    const [cep, setCep] = useState('');
    const [distancia, setDistancia] = useState('');
    const [material, setMaterial] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const handleBuscar = () => {
        // Redireciona para a página de resultados com query string contendo os parâmetros
        navigate(`/resultados?cep=${cep}&tipo_material=${material}`);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Buscar Ponto de Coleta</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleBuscar(); }}>
                    <label htmlFor="cep">CEP</label>
                    <input
                        type="text"
                        id="cep"
                        placeholder="Digite o CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />

                    <label htmlFor="distancia">Distância</label>
                    <select
                        id="distancia"
                        value={distancia}
                        onChange={(e) => setDistancia(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="5km">5km</option>
                        <option value="10km">10km</option>
                        <option value="20km">20km</option>
                    </select>

                    <label htmlFor="material">Tipo de Material</label>
                    <select
                        id="material"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="eletronicos">Eletrônicos</option>
                        <option value="plasticos">Plásticos</option>
                        <option value="vidro">Vidro</option>
                        <option value="papel">Papel</option>
                    </select>

                    <button type="submit">Buscar</button>
                </form>
            </div>
        </div>
    );
};

export default PopupBuscarPonto;
