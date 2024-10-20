import React, { useState } from 'react';
import axios from 'axios';

const EditarPontoPopup = ({ ponto, closePopup }) => {
    const [tipoMaterial, setTipoMaterial] = useState(ponto.tipo_material);
    const [endereco, setEndereco] = useState(ponto.endereco);
    const [comentario, setComentario] = useState(ponto.comentario);
    const [linkEndereco, setLinkEndereco] = useState(ponto.link_endereco);
    const [error, setError] = useState('');

    const handleSalvar = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8000/editarPonto/${ponto.pontoid}`, {
                tipo_material: tipoMaterial,
                endereco,
                comentario,
                link_endereco: linkEndereco,
            });

            if (res.status === 200) {
                alert('Ponto atualizado com sucesso!');
                closePopup(); // Fecha o pop-up após salvar
            } else {
                setError('Erro ao atualizar ponto. Tente novamente.');
            }
        } catch (err) {
            setError('Erro ao atualizar ponto. Tente novamente.');
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={closePopup}>&times;</span>
                <h3>Editar Ponto de Coleta</h3>
                <form onSubmit={handleSalvar}>
                    <label htmlFor="tipoMaterial">Tipo de material coletado</label>
                    <select
                        id="tipoMaterial"
                        value={tipoMaterial}
                        onChange={(e) => setTipoMaterial(e.target.value)}
                        required
                    >
                        <option value="Plástico">Plástico</option>
                        <option value="Vidro">Vidro</option>
                        <option value="Papel">Papel</option>
                        <option value="Papelão">Papelão</option>
                        <option value="Metal">Metal</option>
                        <option value="Madeira">Madeira</option>
                        <option value="Orgânicos">Orgânicos</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                    </select>

                    <label htmlFor="endereco">Endereço</label>
                    <input
                        type="text"
                        id="endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        required
                    />

                    <label htmlFor="comentario">Comentário</label>
                    <textarea
                        id="comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    ></textarea>

                    <label htmlFor="linkEndereco">Link do endereço</label>
                    <input
                        type="text"
                        id="linkEndereco"
                        value={linkEndereco}
                        onChange={(e) => setLinkEndereco(e.target.value)}
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn-primary">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default EditarPontoPopup;
