import { useState } from "react";
import { type Abi } from "viem";
import { useGetExecutableFunctions } from "./useGetExecutableFunctions";
import { useSetAllowedContractsPrepare } from "@app/hooks/contract/useSetAllowedContractsPrepare";
import { api } from "@app/utils/api";

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

  const { mutate: updateDB } = api.paymaster.addContract.useMutation();

  // TODO: do we need a useCallback here?
  const execute = ({
    paymasterId,
    name,
    contractAddress,
    abiString,
  }: {
    paymasterId: number;
    name: string;
    contractAddress: string;
    abiString: string;
  }) => {
    const selectorsHex =
      selectors
        ?.filter((e) => selectedNames.includes(e.name))
        .map((e) => e.selector) ?? [];
    const contracts = new Array(selectorsHex.length).fill(address);
    const enabled = new Array(selectorsHex.length).fill(true);
    setAllowedContracts({
      args: [contracts, selectorsHex, enabled],
    });
    void updateDB({
      paymasterId,
      contract: {
        address: contractAddress,
        name,
        abiString,
        selectors: selectors ?? [],
      },
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
