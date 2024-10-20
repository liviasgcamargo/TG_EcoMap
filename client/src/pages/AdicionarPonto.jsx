import React, { useState } from 'react';
import axios from 'axios';

const AdicionarPonto = ({ closePopup }) => {
    const [tipoMaterial, setTipoMaterial] = useState('');
    const [endereco, setEndereco] = useState('');
    const [comentario, setComentario] = useState('');
    const [linkEndereco, setLinkEndereco] = useState('');
    const [error, setError] = useState('');

    const handleAdicionar = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/adicionarPonto', {
                tipo_material: tipoMaterial,
                endereco,
                comentario,
                link_endereco: linkEndereco,
            });

            if (res.status === 200) {
                alert('Ponto adicionado com sucesso!');
                closePopup(); // Fecha o pop-up após adicionar
            } else {
                setError('Erro ao adicionar ponto. Tente novamente.');
            }
        } catch (err) {
            setError('Erro ao adicionar ponto. Tente novamente.');
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={closePopup}>&times;</span>
                <h3>Adicionar Ponto de Coleta</h3>
                <form onSubmit={handleAdicionar}>
                    <label htmlFor="tipoMaterial">Tipo de material coletado</label>
                    <select
                        id="tipoMaterial"
                        value={tipoMaterial}
                        onChange={(e) => setTipoMaterial(e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
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

                    <button type="submit" className="btn-primary">Adicionar</button>
                    <button type="button" className="btn-danger" onClick={closePopup}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default AdicionarPonto;
