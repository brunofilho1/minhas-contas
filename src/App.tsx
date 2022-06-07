import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";
import Modal from "react-modal";
import { MemoryRouter as Router } from "react-router-dom";
import RoutesApp from "./routes";

Modal.setAppElement("#root");

export function App() {
  return (
    <Router>
      <TransactionsProvider>
        <RoutesApp />
        <GlobalStyle />
      </TransactionsProvider>
    </Router>
  );
}
