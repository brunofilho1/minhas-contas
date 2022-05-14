import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";
import logoImg from "../../assets/logo2.png";

export default function LoginScreen() {
  const { userInfo, userStorage } = useAuth();
  const navigate = useNavigate();

  const loginUser = () => {
    userStorage({
      name: "Bruno",
      username: "brunofilho1",
      IsLogged: true,
      password: "bruno123",
    });
  };

  return (
    <Container>
      <form id="loginForm" onSubmit={loginUser}>
        <div id="loginHeader">
          <img src={logoImg} alt="Minhas Contas" />
          <span>Faça login para continuar</span>
        </div>
        <div id="loginBody">
          <input type="text" placeholder="Usuário" required />
          <input type="text" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </div>
        <div id="loginFooter">
          <Link to="/login" id="registerBtn">
            Não tem uma conta? <b>Cadastre-se</b>
          </Link>
        </div>
      </form>
    </Container>
  );
}
