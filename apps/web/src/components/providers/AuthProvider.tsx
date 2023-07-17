import { useRouter } from "next/router";
import React, { useState } from "react";
import { type PropsWithChildren, useEffect } from "react";
import { useAccount } from "wagmi";

export const AuthContext = React.createContext<{
  authenticated: boolean | undefined;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}>({
  authenticated: undefined,
  setAuthenticated: () => {
    //
  },
});

export default function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const router = useRouter();

  const { isConnected } = useAccount();

  const [authenticated, setAuthenticated] = useState<boolean>();

  useEffect(() => {
    if (isConnected && authenticated === true) {
      void router.push("/onboarding");
    } else {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, authenticated]);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
