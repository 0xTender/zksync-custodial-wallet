import { env } from "@app/env.mjs";
import { api } from "@app/utils/api";
import { RegistryABI, addresses } from "@root/core";
import { useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";

export const useCreatePaymaster = (userLimit?: bigint) => {
  const {
    mutateAsync: updateDB,
    isSuccess,
    isError,
  } = api.dashboard.createPaymaster.useMutation({
    onError: (...e) => {
      console.error(...e);
    },
  });

  const { write: createPaymaster, data } = useContractWrite({
    address: addresses[env.NEXT_PUBLIC_CHAIN_ID].Registry as `0x${string}`,
    abi: RegistryABI,
    functionName: "createPaymaster",
    args: [userLimit ?? 0n],
    onError: (e) => {
      console.error(e);
    },
  });

  const { isSuccess: transactionSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onError: (e) => {
      console.error(e);
    },
  });

  useEffect(() => {
    if (transactionSuccess === true && data?.hash !== undefined) {
      void updateDB({ tx: data?.hash });
    }
  }, [transactionSuccess, data, updateDB]);

  return { createPaymaster, isSuccess, isError };
};
