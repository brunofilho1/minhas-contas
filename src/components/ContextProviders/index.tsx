import { ReactNode } from "react";
import { AuthProvider } from "../../hooks/useAuth";

type Props = {
  children: ReactNode;
};

export function ContextProviders({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}
