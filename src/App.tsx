import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";
import Modal from "react-modal";
import RoutesApp from "./routes";
import { MemoryRouter as Router } from "react-router-dom";

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
