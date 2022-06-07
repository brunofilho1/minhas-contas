import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import HomeScreen from "../pages/Home";
import LoginScreen from "../pages/Login";
import RegisterScreen from "../pages/Register";
import TransactionsScreen from "../pages/Transactions";

export default function RoutesApp() {
  const { user } = useAuth();

  const PrivateRoute = ({ children, redirectTo }: any) => {
    return user ? children : <Navigate to={redirectTo} />;
  };

  const PublicRoute = ({ children, redirectTo }: any) => {
    return user ? <Navigate to={redirectTo} /> : children;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute redirectTo="/transactions">
              <HomeScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute redirectTo="/transactions">
              <RegisterScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute redirectTo="/transactions">
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
