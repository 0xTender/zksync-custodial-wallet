"use client";

import { SessionProvider } from "next-auth/react";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object
// We use client hydration to establish the <SessionProvider />
export default function AuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isConnected } = useAccount();
  const router = useRouter();
  useEffect(() => {
    if (isConnected) router.push("/app");
    else router.push("/");
  }, [isConnected, router]);
  return <SessionProvider>{children}</SessionProvider>;
}
