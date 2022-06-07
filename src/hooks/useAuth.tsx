import { useContext, useEffect } from "react";
import { query as q } from "faunadb";
import { fauna } from "../services/fauna";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import usePersistedState from "./usePersistedState";

type TypeUser = {
  name?: string;
  email: string;
};

type Props = {
  children: React.ReactNode;
};

type LoginContextType = {
  user: TypeUser | undefined | Object;
  SignUp: (users: SignProps) => Promise<boolean>;
  SignIn: (users: SignProps) => Promise<boolean>;
};

type FaunaResponseProps = {
  data: {
    name: string;
    email: string;
    password: string;
  };
  ref: Object;
  ts: number;
};

type SignProps = {
  data: TypeUser;
  credentials: {
    password: string;
  };
};

// Contexto com um valor semelhante ao que vai ser usado
export const AuthContext = createContext({} as LoginContextType);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = usePersistedState<TypeUser | Object>("userInfo", "");

  async function SignIn(user: SignProps) {
    const userPassword: any = await fauna
      .query(
        q.If(
          q.Exists(
            q.Match(q.Index("user_by_email"), q.Casefold(user.data.email))
          ),
          q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.data.email))),
          null
        )
      )
      .then((res: any) => {
        const passwordIsCorrect = bcrypt.compareSync(
          user.credentials.password,
          res.data.password
        );
        if (passwordIsCorrect) return res.data.password;
      })
      .catch((error) => {
        return null;
      });

    try {
      const faunaResponse: FaunaResponseProps = await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Intersection([
                q.Match(q.Index("user_by_email"), q.Casefold(user.data.email)),
                q.Match(q.Index("user_by_password"), userPassword),
              ])
            )
          ),
          null,
          // else
          q.Get(
            q.Intersection([
              q.Match(q.Index("user_by_email"), q.Casefold(user.data.email)),
              q.Match(q.Index("user_by_password"), userPassword),
            ])
          )
        )
      );

      const userInfo = {
        name: faunaResponse.data.name,
        email: faunaResponse.data.email,
      };

      if (faunaResponse) {
        setUser(JSON.stringify(userInfo));
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

  async function SignUp(user: SignProps) {
    const saltRounds = bcrypt.genSaltSync(15);

    const hashedPassword = bcrypt.hashSync(
      user.credentials.password,
      saltRounds
    );

    try {
      const faunaResponse: FaunaResponseProps = await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(q.Index("user_by_email"), q.Casefold(user.data.email))
            )
          ),
          q.Create(q.Collection("users"), {
            data: {
              ...user.data,
              password: hashedPassword,
            },
          }),
          // else
          null
        )
      );

      const userInfo = {
        name: faunaResponse.data.name,
        email: faunaResponse.data.email,
      };

      if (faunaResponse) {
        setUser(JSON.stringify(userInfo));
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
