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
                    // Se o login for bem-sucedido, redireciona para o perfil do usuário
                    const usuario = res.data.usuario;
                    navigate('/perfil', { state: { usuario } });
                } else {
                    setError('Email ou senha incorretos.');
                }
            } catch (err) {
                setError('Erro no login. Tente novamente.');
            }
        }
    };

    return (
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
    );
};

export default Login;
