import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Verifica se o login é de administrador
        if (email === 'adm@gmail.com' && senha === 'adm123') {
            navigate('/admin'); // Redireciona para a página do administrador
        } else {
            try {
                const res = await axios.post('http://localhost:8000/login', {
                    email,
                    senha
                });

                if (res.data.success) {
                    // Se o login for bem-sucedido, armazena os dados do usuário no localStorage
                    const usuario = res.data.usuario;
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    navigate('/perfil', { state: { usuario } });
                } else {
                    setError('Email ou senha incorretos.');
                }
            } catch (err) {
                setError('Erro no login. Tente novamente.');
            }
        }
    };


  const handleCadastrarClick = () => {
      navigate('/cadastrar'); // Redireciona para a página de cadastro
  };

  const handleLoginClick = () => {
      navigate('/login'); // Redireciona para a página de login
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
        <div className="login-container">
            <h1>ENTRAR</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <a href="#" className="forgot-password">Esqueci minha senha</a>
                <p>Não tem uma conta? <a href="/cadastrar">Cadastre-se</a></p>
                <button type="submit" className="btn-primary">ENTRAR</button>
            </form>
        </div>
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

export default Login;
