import { useContext } from "react";

import { createContext, useState } from "react";

type TypeUser = {
  name: string | undefined;
  username: string | undefined;
  password: string | undefined;
  IsLogged: boolean | undefined;
};

type Props = {
  children: React.ReactNode;
};

type LoginContextType = {
  userInfo: TypeUser | undefined;
  userStorage: (userInfos: TypeUser) => void;
};

// Contexto com um valor semelhante ao que vai ser usado
export const AuthContext = createContext({} as LoginContextType);

export const AuthProvider = ({ children }: Props) => {
  const [userInfo, setUser] = useState<TypeUser | undefined>();

  const userStorage = (userInfos: TypeUser) => setUser(userInfos);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        userStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}
