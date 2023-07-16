import { type AppType } from "next/app";

import { api } from "@app/utils/api";

import "@app/styles/globals.css";
import WagmiProvider from "@app/components/lib/WagmiProvider";
import AuthProvider from "@app/components/lib/AuthProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </WagmiProvider>
  );
};

export default api.withTRPC(MyApp);
