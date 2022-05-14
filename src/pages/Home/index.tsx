import { useAuth } from "../../hooks/useAuth";

export default function HomeScreen() {
  const { userInfo, userStorage } = useAuth();

  const loginUser = () => {
    userStorage({
      name: "Bruno",
      username: "brunofilho1",
      IsLogged: true,
      password: "bruno123",
    });
  };

  return (
    <>
      <h1>HomeScreen</h1>
      <button onClick={loginUser}>Login</button>
    </>
  );
}
