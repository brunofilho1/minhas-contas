import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";
import logoImg from "../../assets/logo2.png";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterScreen() {
  const { user, SignUp } = useAuth();
  const [valueInput, setValueInput] = useState(Object);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValueInput({ ...valueInput, [name]: value });
  };

  const registerUser = async (event: any) => {
    event.preventDefault();

    const response = await SignUp({
      data: {
        name: valueInput.name,
        email: valueInput.email,
      },
      credentials: {
        password: valueInput.password,
      },
    });

    if (response) {
      toast.success("Registrado com sucesso!");
      return navigate("/transactions");
    } else {
      toast.info("Esse usuário já está cadastrado!");
    }
  };

  return (
    <Container>
      <form id="loginForm" onSubmit={() => registerUser(event)}>
        <div id="loginHeader">
          <img src={logoImg} alt="Minhas Contas" />
          <span>Faça login para continuar</span>
        </div>
        <div id="loginBody">
          <input
            type="text"
            name="name"
            title="Digite seu nome"
            placeholder="Nome"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            title="Digite seu e-mail"
            placeholder="E-mail"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            title="Digite sua senha"
            placeholder="Senha"
            required
            onChange={handleChange}
          />
          <button type="submit">Entrar</button>
        </div>
        <div id="loginFooter">
          <Link to="/login" id="loginBtn">
            Já tem uma conta? <b>Fazer login</b>
          </Link>
        </div>
      </form>
    </Container>
  );
}
