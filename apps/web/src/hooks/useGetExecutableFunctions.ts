import { useEffect, useState } from "react";
import { getFunctionSelector, type Abi } from "viem";

export const useGetExecutableFunctions = (data: Abi) => {
  const [selectors, setSelectors] =
    useState<{ name: string; selector: `0x${string}` }[]>();

  useEffect(() => {
    try {
      if (data.length === 0) return;

      const selectors = data
        .filter(
          (e) => e.type === "function" && e.stateMutability === "nonpayable"
        )
        .map((e) => {
          if (e.type === "function") {
            return { selector: getFunctionSelector(e), name: e.name };
          }
          return null;
        })
        .filter((e) => e !== null) as {
        name: string;
        selector: `0x${string}`;
      }[];

      setSelectors(selectors);
    } catch (err) {
      // handle case where ABI is invalid
      console.error(err);
    }
  }, [data]);

  return { selectors };
};
