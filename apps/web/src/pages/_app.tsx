import { type AppType } from "next/app";

import { api } from "@app/utils/api";

import "@app/styles/globals.css";
import WagmiProvider from "@app/components/providers/WagmiProvider";
import AuthProvider from "@app/components/providers/AuthProvider";

import { Outfit as Font } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Head from "next/head";

const fontFamily = Font({
  weight: ["200", "300", "500"],
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <WagmiProvider>
      <AuthProvider>
        <main className={twMerge(fontFamily.className, "h-full")}>
          <Head>
            <title>0xTender</title>
            <meta name="description" content="0xTender" />
            <link rel="icon" href="/logo.png" />
          </Head>
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </WagmiProvider>
  );
};

export default api.withTRPC(MyApp);
