import { useContext, useEffect } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";
import { FaRegTrashAlt } from "react-icons/fa";
import cactusImg from "../../assets/cactus.png";
import { useAuth } from "../../hooks/useAuth";

export function TransactionsTable() {
  const { transactions, removeTransaction } = useTransactions();

  return (
    <Container id="transactionsContainer">
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(transaction.createdAt)
                  )}
                </td>
                <td id="optionIcons">
                  <FaRegTrashAlt
                    title="Remover"
                    onClick={() => removeTransaction(transaction.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div id="noResultsAnimation">
          <img src={cactusImg} alt="" />
          <span>Nada para mostrar...</span>
        </div>
      )}
    </Container>
  );
}
