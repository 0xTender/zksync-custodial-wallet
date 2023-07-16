import { useRouter } from "next/router";
import { type PropsWithChildren, useEffect } from "react";
import { useAccount } from "wagmi";

export default function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const router = useRouter();

  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      void router.push("/home");
    } else {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return <>{children}</>;
}
