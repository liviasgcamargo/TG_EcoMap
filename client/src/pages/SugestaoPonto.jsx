import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SugestaoPonto = ({ closePopup }) => {
    const [tipoMaterial, setTipoMaterial] = useState('');
    const [cep, setCep] = useState('');
    // const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/sugerirPonto', {
                tipo_material: tipoMaterial,
                cep,
                // comentario
            });

            if (res.status === 200) {
                alert('Sugestão enviada com sucesso!');
                navigate('/'); // Redireciona para a Home page
            } else {
                setError('Erro ao enviar sugestão. Tente novamente.');
            }
        } catch (err) {
            setError('Erro ao enviar sugestão. Tente novamente.');
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <span className="close" onClick={closePopup}>&times;</span>
                <h3>Sugerir Local de Coleta</h3>
                <form onSubmit={handleSubmit}>
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

                    <label htmlFor="cep">CEP</label>
                    <input
                        type="text"
                        id="cep"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        required
                    />

                    {/* <label htmlFor="comentario">Comentário</label>
                    <textarea
                        id="comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    ></textarea> */}

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn-primary">Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default SugestaoPonto;
