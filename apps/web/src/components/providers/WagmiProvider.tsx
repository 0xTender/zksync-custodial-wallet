import { type Chain, WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import { type PropsWithChildren } from "react";

export const zkSyncTestnet = {
  id: 1663,
  name: "ZkSync Era Testnet",
  network: "zksync-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://zksync2-testnet.zksync.dev"] },
    default: { http: ["https://zksync2-testnet.zksync.dev"] },
  },
  blockExplorers: {
    etherscan: {
      name: "EraExplorer",
      url: "https://goerli.explorer.zksync.io/",
    },
    default: {
      name: "EraExplorer",
      url: "https://goerli.explorer.zksync.io/",
    },
  },
} as const satisfies Chain;

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: zkSyncTestnet,
    transport: http(),
  }),
});

export default function WagmiProvider({
  children,
}: PropsWithChildren<unknown>) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
