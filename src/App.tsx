import { GlobalStyle } from './styles/global';
import { Header } from './components/Header/index';
import { Dashboard } from './components/Dashboard/index';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal/index.tsx';
import { TransactionsProvider } from './hooks/useTransactions';
import Modal from 'react-modal';

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransationModal() {
    setIsNewTransactionModalOpen(true);
  }
  
  function handleCloseNewTransationModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransationModal}/>
      <Dashboard />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransationModal}/>
      <GlobalStyle />
    </TransactionsProvider>
  );
}
