import { PaymasterABI } from "@root/core";
import { useContractWrite, useWaitForTransaction } from "wagmi";

export const useSetAllowedContractsPrepare = (
  paymasterAddress: `0x${string}`
) => {
  const { write: setAllowedContracts, data } = useContractWrite({
    address: paymasterAddress,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    abi: PaymasterABI,
    functionName: "setAllowedContracts",
    onError: (...e) => {
      console.error(...e);
    },
  });

  const { isSuccess: isTransactionSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onError: (...e) => {
      console.error(...e);
    },
  });

  return { setAllowedContracts, isTransactionSuccess };
};
