import logoImg from "../../assets/logo.png";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content id="headerContent">
        <img src={logoImg} alt="minhas.conta$" />
        <div id="optionsDiv">
          <button onClick={onOpenNewTransactionModal}>Nova transação</button>
          <img src="https://github.com/brunofilho1.png" alt="Perfil" />
        </div>
      </Content>
    </Container>
  );
}
