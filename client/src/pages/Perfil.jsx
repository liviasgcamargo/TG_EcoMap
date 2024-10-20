import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Perfil = () => {
    const location = useLocation();
    const [usuario, setUsuario] = useState(location.state?.usuario || {});
    const [editMode, setEditMode] = useState(false); // Define se o perfil está em modo de edição

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/usuario/${usuario.usuario_id}`, usuario);
            alert('Dados atualizados com sucesso!');
            setEditMode(false); // Sai do modo de edição após salvar
        } catch (err) {
            console.error('Erro ao atualizar os dados:', err);
            alert('Erro ao atualizar os dados. Tente novamente.');
        }
    };

    if (!usuario) {
        return <p>Carregando informações do usuário...</p>;
    }

    return (
        <div className="perfil-container">
            <header>
                <div className="container">
                    <div className="logo">
                        <h1>EcoMap</h1>
                    </div>
                    <div className="nav-buttons">
                        <a className="btn" href="/perfil">Perfil</a>
                    </div>
                </div>
            </header>

            <section className="perfil-info">
                <h2>Perfil do Usuário</h2>
                <div className="perfil-details">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={usuario.nome}
                        onChange={handleInputChange}
                        disabled={!editMode} // Desabilitado se não estiver no modo de edição
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={usuario.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    />

                    <label>Telefone:</label>
                    <input
                        type="text"
                        name="telefone"
                        value={usuario.telefone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    />

                    {usuario.tipo_usuario !== 'PESSOA FISICA' && (
                        <>
                            <label>CNPJ:</label>
                            <input
                                type="text"
                                name="cnpj"
                                value={usuario.cnpj}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </>
                    )}

                    <label>Materiais Aceitos:</label>
                    <input
                        type="text"
                        name="materiais_aceitos"
                        value={usuario.materiais_aceitos}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    />

                    <label>Descrição:</label>
                    <textarea
                        name="descricao"
                        value={usuario.descricao}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    />

                    <label>Serviço:</label>
                    <select
                        name="servico_retirada"
                        value={usuario.servico_retirada}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    >
                        <option value="Sim">Sim</option>
                        <option value="Nao">Não</option>
                        <option value="Ambos">Ambos</option>
                    </select>

                    {editMode ? (
                        <button className="btn" onClick={handleSave}>Salvar</button>
                    ) : (
                        <button className="btn" onClick={() => setEditMode(true)}>Editar Perfil</button>
                    )}
                </div>
            </section>

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

export default Perfil;
