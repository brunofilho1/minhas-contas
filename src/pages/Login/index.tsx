import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";
import logoImg from "../../assets/logo2.png";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginScreen() {
  const { user, SignIn } = useAuth();
  const [valueInput, setValueInput] = useState(Object);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValueInput({ ...valueInput, [name]: value });
  };

  const loginUser = async (event: any) => {
    event.preventDefault();

    const response = await SignIn({
      email: valueInput.email,
      password: valueInput.password,
    });

    if (response) {
      toast.success("Logado com sucesso!");
    } else {
      toast.error("E-mail ou senha incorreta!");
    }
  };

  return (
    <Container>
      <form id="loginForm" onSubmit={loginUser}>
        <div id="loginHeader">
          <img src={logoImg} alt="Minhas Contas" />
          <span>Faça login para continuar</span>
        </div>
        <div id="loginBody">
          <input
            type="text"
            name="email"
            title="Digite seu e-mail"
            placeholder="Usuário ou E-mail"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            title="Digite seu senha"
            placeholder="Senha"
            required
            onChange={handleChange}
          />
          <button type="submit">Entrar</button>
        </div>
        <div id="loginFooter">
          <Link to="/register" id="registerBtn">
            Não tem uma conta? <b>Cadastre-se</b>
          </Link>
        </div>
      </form>
    </Container>
  );
}
