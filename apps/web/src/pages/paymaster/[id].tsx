import { api } from "@app/utils/api";
import { useRouter } from "next/router";
import { Field, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import {
  ArrowRightIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { useGetExecutableFunctions } from "@app/hooks/contract/useGetExecutableFunctions";
import { type Abi } from "viem";
import { useSetAllowedContractsExecute } from "@app/hooks/contract/useSetAllowedContractsExecute";
import Modal from "@app/components/Modal";

const schema = z.object({
  name: z.string(),
  address: z.string(),
  abi: z.string(),
});

type FormValues = z.infer<typeof schema>;

const AddContract = (data: { address: string | undefined }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
  }, []);

  const [{ abi, name, address: addContractAddress }, setData] = useState<{
    abi: Abi;
    name: string;
    address: string;
  }>({
    abi: [],
    name: "",
    address: "",
  });

  const { selectors } = useGetExecutableFunctions(abi);

  const { selectedNames, setSelectedNames, execute } =
    useSetAllowedContractsExecute({
      address: data?.address as `0x${string}`,
      abi,
    });

  const {
    query: { id },
  } = useRouter();

  return (
    <div>
      <Formik<FormValues>
        validationSchema={toFormikValidationSchema(schema)}
        initialValues={{
          name: "TestToken",
          address: "0x7000fA0F7D422c9B559DFCE5763Efc941cd46ed9",
          abi: `[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol_",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "decimals_",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]`,
        }}
        onSubmit={(values) => {
          setData({
            abi: JSON.parse(values.abi) as Abi,
            name: values.name,
            address: values.address,
          });
        }}
        validateOnMount
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-1">
              <label className="text-sm font-extralight text-slate-200">
                Contract Name
              </label>
              <Field
                name="name"
                placeholder="Enter paymaster name"
                className="rounded-md border border-blue-500 bg-blue-500/0 p-2 px-3 py-2 text-blue-500 placeholder-blue-700/25 duration-300 hover:bg-blue-800/10 hover:outline hover:outline-blue-600  focus:border-blue-700 focus:bg-blue-600/10 focus:ring-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-extralight text-slate-200">
                Contract Address
              </label>
              <Field
                name="address"
                placeholder="Enter paymaster name"
                className="rounded-md border border-blue-500 bg-blue-500/0 p-2 px-3 py-2 text-blue-500 placeholder-blue-700/25 duration-300 hover:bg-blue-800/10 hover:outline hover:outline-blue-600  focus:border-blue-700 focus:bg-blue-600/10 focus:ring-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-extralight text-slate-200">
                ABI
              </label>
              <textarea
                {...formik.getFieldProps("abi")}
                name="abi"
                rows={12}
                placeholder="Enter your name"
                className="rounded-md border border-blue-500 bg-blue-500/20 p-2 px-3 py-2 text-blue-500 placeholder-blue-700/50"
              />
            </div>
            <button
              suppressHydrationWarning
              className={twMerge(
                "group pointer-events-none my-4 flex w-full cursor-not-allowed items-center justify-start gap-3 rounded-md border border-slate-600 px-3 py-2 text-slate-500 opacity-50 duration-300 hover:bg-blue-800/10 hover:outline hover:outline-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400",
                formik.isValid &&
                  mounted === true &&
                  "pointer-events-auto cursor-pointer border-blue-600 text-blue-500 opacity-100 marker:bg-blue-500"
              )}
              type="submit"
              disabled={!formik.isValid || (selectors && selectors.length > 0)}
            >
              <div className="inline-flex items-center gap-2">
                <IdentificationIcon className="h-5 w-5" />
                <span className="text-base font-semibold leading-6">
                  Add Contract
                </span>
              </div>
              <ArrowRightIcon className="h-4 w-4 duration-300 group-hover:ml-[53%]" />
            </button>
          </form>
        )}
      </Formik>
      {selectors && (
        <>
          {" "}
          <div className="flex flex-wrap gap-2 py-3">
            {selectors.map((selector) => {
              return (
                <div
                  onClick={() => {
                    if (selectedNames.includes(selector.name)) {
                      setSelectedNames(
                        selectedNames.filter((name) => name !== selector.name)
                      );
                    } else {
                      setSelectedNames([...selectedNames, selector.name]);
                    }
                  }}
                  className={twMerge(
                    "cursor-pointer rounded-md border border-blue-500 bg-blue-500/20",
                    "p-2 px-3 py-2",
                    "text-blue-500 placeholder-blue-700/50",
                    selectedNames.includes(selector.name) ? "" : "opacity-50"
                  )}
                  key={selector.selector}
                >
                  {selector.name}
                </div>
              );
            })}
          </div>
          <button
            suppressHydrationWarning
            onClick={() => {
              execute({
                paymasterId: parseInt((id as string) ?? "-1"),
                abiString: JSON.stringify(abi),
                contractAddress: addContractAddress as `0x${string}`,
                name: name,
              });
            }}
            className={twMerge(
              "group pointer-events-none my-4 flex w-full cursor-not-allowed items-center justify-start gap-3 rounded-md border border-slate-600 px-3 py-2 text-slate-500 opacity-50 duration-300 hover:bg-blue-800/10 hover:outline hover:outline-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400",
              mounted === true
                ? "pointer-events-auto cursor-pointer border-blue-600 text-blue-500 opacity-100 marker:bg-blue-500"
                : ""
            )}
            type="submit"
          >
            <div className="inline-flex items-center gap-2">
              <IdentificationIcon className="h-5 w-5" />
              <span className="text-base font-semibold leading-6">
                Allow Function
              </span>
            </div>
            <ArrowRightIcon className="h-4 w-4 duration-300 group-hover:ml-[53%]" />
          </button>
        </>
      )}
    </div>
  );
};

export default function PaymasterId() {
  const {
    query: { id },
  } = useRouter();

  const { data } = api.paymaster.paymasterDetails.useQuery({
    id: parseInt((id as string) ?? "-1"),
  });

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="h-full bg-slate-900">
      <div className="flex h-full flex-row justify-between bg-slate-900">
        <div className="flex-1 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <h1>{data && data.name}</h1>
            <button
              suppressHydrationWarning
              className={twMerge(
                "group pointer-events-none my-4 flex cursor-not-allowed items-center justify-start gap-3 rounded-md border border-slate-600 px-3 py-2 text-slate-500 opacity-50 duration-300",
                "hover:bg-blue-800/10 hover:outline hover:outline-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400",
                "pointer-events-auto cursor-pointer border-blue-600 text-blue-500 opacity-100 marker:bg-blue-500",
                "w-fit"
              )}
              onClick={() => setOpen(true)}
            >
              Add Contracts
            </button>
          </div>
          <div></div>
        </div>
        {open && (
          <div className="h-full overflow-x-scroll bg-slate-800 py-12 sm:max-w-[480px] sm:px-6 md:w-[480px] lg:px-8">
            <AddContract address={data?.address}></AddContract>
          </div>
        )}
      </div>
    </div>
  );
}
