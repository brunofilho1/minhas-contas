import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

// Types **************************************

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: Transaction) => Promise<void>;
  removeTransaction: (transaction: number) => Promise<void>;
}

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>

interface TransactionsProviderProps {
  children: ReactNode;
}

//**************************************

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const localTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(localTransactions);
  }, []);

  async function createTransaction(transactionInput: Transaction) {
    try {
      localStorage.setItem(
        "transactions",
        JSON.stringify([...transactions, transactionInput])
      );
      setTransactions([...transactions, transactionInput]);
      toast.success("Transação adicionada com sucesso! 🤪");
    } catch (error) {
      toast.error("Erro ao adicionar transação... 😢");
      console.error(error);
    }
  }

  async function removeTransaction(transactionId: number) {
    try {
      const newTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      setTransactions(newTransactions);
      toast.info("Transação removida com sucesso! 😎");
    } catch (error) {
      toast.error("Erro ao remover essa transação... 😢");
      console.error(error);
    }
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, removeTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
