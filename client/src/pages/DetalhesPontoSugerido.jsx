import React from 'react';
import axios from 'axios';

const DetalhesPontoSugerido = ({ ponto, closePopup }) => {

    const handleAprovar = async () => {
        try {
            await axios.put(`http://localhost:8000/aprovarPonto/${ponto.pontoid}`, { validado: true });
            alert('Ponto aprovado com sucesso!');
            closePopup();
        } catch (err) {
            console.error('Erro ao aprovar o ponto:', err);
            alert('Erro ao aprovar o ponto.');
        }
    };

    const handleRecusar = async () => {
        try {
            await axios.delete(`http://localhost:8000/recusarPonto/${ponto.pontoid}`);
            alert('Ponto recusado e removido com sucesso!');
            closePopup();
        } catch (err) {
            console.error('Erro ao recusar o ponto:', err);
            alert('Erro ao recusar o ponto.');
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={closePopup}>&times;</span>
                <h3>Detalhes do Ponto Sugerido</h3>
                <p><strong>Endereço:</strong> {ponto.endereco}, {ponto.cidade}, {ponto.estado}</p>
                <p><strong>Tipo de Material:</strong> {ponto.tipo_material}</p>
                <p><strong>Comentário:</strong> {ponto.comentario}</p>

                <button className="btn-primary" onClick={handleAprovar}>Aprovar</button>
                <button className="btn-danger" onClick={handleRecusar}>Recusar</button>
            </div>
        </div>
    );
};

export default DetalhesPontoSugerido;
