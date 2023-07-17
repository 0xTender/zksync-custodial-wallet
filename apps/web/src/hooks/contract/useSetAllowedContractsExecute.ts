import { useState } from "react";
import { type Abi } from "viem";
import { useGetExecutableFunctions } from "./useGetExecutableFunctions";
import { useSetAllowedContractsPrepare } from "@app/hooks/contract/useSetAllowedContractsPrepare";

export const useSetAllowedContractsExecute = ({
  address,
  abi,
}: {
  address: `0x${string}`;
  abi: Abi;
}) => {
  const { selectors } = useGetExecutableFunctions(abi ?? []);

  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const { setAllowedContracts, isTransactionSuccess } =
    useSetAllowedContractsPrepare(address);

  // TODO: do we need a useCallback here?
  const execute = () => {
    const selectorsHex =
      selectors
        ?.filter((e) => selectedNames.includes(e.name))
        .map((e) => e.selector) ?? [];
    const contracts = new Array(selectorsHex.length).fill(address);
    const enabled = new Array(selectorsHex.length).fill(true);
    setAllowedContracts({
      args: [contracts, selectorsHex, enabled],
    });
  };

  return {
    setSelectedNames,
    selectors,
    isTransactionSuccess,
    execute,
    selectedNames,
  };
};
