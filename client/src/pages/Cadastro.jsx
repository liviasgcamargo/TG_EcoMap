import React, { useState } from "react";
import axios from "axios";

const Cadastro = () => {
  const [tipoUsuario, setTipoUsuario] = useState("PESSOA FISICA");
  const [usuario, setUsuario] = useState({
    nome: "",
    cnpj: "",
    email: "",
    senha: "",
    confirmSenha: "",
    telefone: "",
    compra_materiais: false,
    vende_materiais: false,
    materiais_aceitos: [],
    descricao: "",
    servico_retirada: "Nao",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newMateriaisAceitos = checked
      ? [...usuario.materiais_aceitos, value] // Se selecionado, adiciona o material à lista
      : usuario.materiais_aceitos.filter((item) => item !== value); // Se desmarcado, remove o material da lista
    setUsuario({ ...usuario, materiais_aceitos: newMateriaisAceitos });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsuario({
      ...usuario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificação de senhas iguais
    if (usuario.senha !== usuario.confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      // Enviando dados para o backend
      await axios.post("http://localhost:8000/cadastrarUsuario", {
        ...usuario,
        tipo_usuario: tipoUsuario,
        materiais_aceitos: usuario.materiais_aceitos.join(","), // Concatena os materiais aceitos em uma string separada por vírgulas
      });
      alert("Cadastro realizado com sucesso!");
      // Redirecionar para a página de perfil (a ser implementada)
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="cadastro-container">
      <h1>CADASTRAR:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            id="ONG"
            name="tipoUsuario"
            value="ONG"
            checked={tipoUsuario === "ONG"}
            onChange={() => setTipoUsuario("ONG")}
          />
          <label htmlFor="ONG">ONG</label>

          <input
            type="radio"
            id="EMPRESA"
            name="tipoUsuario"
            value="EMPRESA"
            checked={tipoUsuario === "EMPRESA"}
            onChange={() => setTipoUsuario("EMPRESA")}
          />
          <label htmlFor="EMPRESA">EMPRESA</label>

          <input
            type="radio"
            id="PESSOA FISICA"
            name="tipoUsuario"
            value="PESSOA FISICA"
            checked={tipoUsuario === "PESSOA FISICA"}
            onChange={() => setTipoUsuario("PESSOA FISICA")}
          />
          <label htmlFor="PESSOA FISICA">PESSOA FÍSICA</label>
        </div>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={usuario.nome}
          onChange={handleChange}
          required
        />

        {tipoUsuario !== "PESSOA FISICA" && (
          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={usuario.cnpj}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={usuario.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={usuario.senha}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmSenha"
          placeholder="Confirmar senha"
          value={usuario.confirmSenha}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={usuario.telefone}
          onChange={handleChange}
        />

        {(tipoUsuario === "ONG" || tipoUsuario === "EMPRESA") && (
          <>
            <div className="compra-venda-materiais">
              <div>
                <input
                  type="checkbox"
                  name="compra_materiais"
                  checked={usuario.compra_materiais}
                  onChange={handleChange}
                />
                <label>Compra materiais</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vende_materiais"
                  checked={usuario.vende_materiais}
                  onChange={handleChange}
                />
                <label>Vende materiais</label>
              </div>
            </div>

            <div className="materiais-checkbox-group">
              <div>
                <input
                  type="checkbox"
                  value="vidro"
                  onChange={handleCheckboxChange}
                />
                <label>Vidro</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="plástico"
                  onChange={handleCheckboxChange}
                />
                <label>Plástico</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="papel"
                  onChange={handleCheckboxChange}
                />
                <label>Papel</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="papelão"
                  onChange={handleCheckboxChange}
                />
                <label>Papelão</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="metal"
                  onChange={handleCheckboxChange}
                />
                <label>Metal</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="madeira"
                  onChange={handleCheckboxChange}
                />
                <label>Madeira</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="orgânicos"
                  onChange={handleCheckboxChange}
                />
                <label>Orgânicos</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="eletrônicos"
                  onChange={handleCheckboxChange}
                />
                <label>Eletrônicos</label>
              </div>
            </div>

            <textarea
              name="descricao"
              placeholder="Descrição"
              value={usuario.descricao}
              onChange={handleChange}
            />
                    <div>
          <input
            type="radio"
            id="ServicoRetirada"
            name="servico_retirada"
            value="Sim"
            checked={usuario.servico_retirada === "Sim"}
            onChange={handleChange}
          />
          <label htmlFor="ServicoRetirada">Serviço de retirada</label>

          <input
            type="radio"
            id="RecebimentoLocal"
            name="servico_retirada"
            value="Nao"
            checked={usuario.servico_retirada === "Nao"}
            onChange={handleChange}
          />
          <label htmlFor="RecebimentoLocal">Recebimento no local</label>

          <input
            type="radio"
            id="Ambos"
            name="servico_retirada"
            value="Ambos"
            checked={usuario.servico_retirada === "Ambos"}
            onChange={handleChange}
          />
          <label htmlFor="Ambos">Ambos</label>
        </div>
          </>
          
        )}



        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
