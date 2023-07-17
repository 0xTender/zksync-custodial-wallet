import { useEffect, useState } from "react";
import { type Abi } from "viem";
import { useGetExecutableFunctions } from "./useGetExecutableFunctions";
import { useSetAllowedContractsPrepare } from "@app/hooks/contract/useSetAllowedContractsPrepare";

export const useSetAllowedContractsExecute = ({
  address,
  abiString,
}: {
  address: `0x${string}`;
  abiString: string;
}) => {
  const [abi, setAbi] = useState<Abi>();

  const { selectors } = useGetExecutableFunctions(abi ?? []);

  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    setAbi(JSON.parse(abiString) as Abi);
  }, [abiString, setAbi]);

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

  return { setSelectedNames, selectors, isTransactionSuccess, execute };
};
