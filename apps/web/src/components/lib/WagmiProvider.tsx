"use client";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import { type PropsWithChildren } from "react";
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

export default function WagmiProvider({
  children,
}: PropsWithChildren<unknown>) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
