import { useContext, useEffect } from "react";
import { query as q } from "faunadb";
import { fauna } from "../services/fauna";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type TypeUser = {
  name?: string;
  email: string;
  password: string;
};

type Props = {
  children: React.ReactNode;
};

type LoginContextType = {
  user: TypeUser | undefined | Object;
  SignUp: (users: TypeUser) => Promise<boolean>;
  SignIn: (users: TypeUser) => Promise<boolean>;
};

type FaunaResponseProps = {
  data: Object;
  ref: Object;
  ts: number;
};

// Contexto com um valor semelhante ao que vai ser usado
export const AuthContext = createContext({} as LoginContextType);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TypeUser | Object>();

  async function SignIn(user: TypeUser) {
    try {
      const faunaResponse: FaunaResponseProps = await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Intersection([
                q.Match(q.Index("user_by_email"), q.Casefold(user.email)),
                q.Match(q.Index("user_by_password"), q.Casefold(user.password)),
              ])
            )
          ),
          null,
          // else
          q.Get(
            q.Intersection([
              q.Match(q.Index("user_by_email"), q.Casefold(user.email)),
              q.Match(q.Index("user_by_password"), q.Casefold(user.password)),
            ])
          )
        )
      );

      if (faunaResponse) {
        setUser(faunaResponse.data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error("Erro ao fazer login...");
      console.log(error);
      return false;
    }
  }

  async function SignUp(user: TypeUser) {
    try {
      const faunaResponse: FaunaResponseProps = await fauna.query(
        q.If(
          q.Not(
            q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          ),
          q.Create(q.Collection("users"), { data: user }),
          // else
          null
        )
      );

      if (faunaResponse) {
        setUser(faunaResponse.data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error("Erro ao se registrar...");
      console.log(error);
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        SignUp,
        SignIn,
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
