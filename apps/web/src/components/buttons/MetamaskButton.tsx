import { useConfig, useConnect } from "wagmi";
import MetamaskIcon from "@app/components/icons/MetamaskIcon";

export default function MetamaskButton() {
  const { connectors } = useConfig();
  const { connect, status } = useConnect({
    connector: connectors[0],
  });
  return (
    <>
      <button
        className="flex w-full items-center justify-center gap-3 rounded-md bg-orange-100 px-3 py-2 text-orange-950 duration-150 hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
        onClick={() => connect()}
      >
        <MetamaskIcon />
        <span className="text-base font-semibold leading-6">Metamask</span>
      </button>
      {status === "loading" && (
        <div className="absolute left-1/2 top-1/2 grid h-full w-full -translate-x-1/2 -translate-y-1/2 transform select-none place-content-center bg-black/50 backdrop-blur">
          <div className="animate-pulse rounded-full bg-white p-8">
            <MetamaskIcon className="h-32 w-32" />
          </div>
        </div>
      )}
    </>
  );
}
