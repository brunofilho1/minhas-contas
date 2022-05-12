/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import HomeScreen from "./pages/Home";
import LoginScreen from "./pages/Login";
import TransactionsScreen from "./pages/Transactions";

export default function RoutesApp() {
  const { userInfo } = useAuth();

  const PrivateRoute = ({ children, redirectTo }: any) => {
    return userInfo?.IsLogged ? children : <Navigate to={redirectTo} />;
  };

  const PublicRoute = ({ children, redirectTo }: any) => {
    return userInfo?.IsLogged ? <Navigate to={redirectTo} /> : children;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute redirectTo="/">
              <HomeScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute redirectTo="/login">
              <LoginScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute redirectTo="/">
              <TransactionsScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
