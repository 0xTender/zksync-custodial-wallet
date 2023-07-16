import { useConfig, useConnect } from "wagmi";
import MetamaskIcon from "@app/components/icons/MetamaskIcon";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function MetamaskButton() {
  const { connectors } = useConfig();
  const { connect, status } = useConnect({
    connector: connectors[0],
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(status === "loading");
    }, 100);
    return () => clearTimeout(id);
  }, [status]);

  return (
    <>
      <button
        className="group flex w-full items-center justify-start gap-3 rounded-md border border-orange-600 px-3 py-2 text-orange-500 duration-150  hover:bg-orange-800/10 hover:outline hover:outline-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
        onClick={() => connect()}
      >
        <div className="inline-flex gap-2">
          <MetamaskIcon />
          <span className="text-base font-semibold leading-6">Metamask</span>
        </div>
        <ArrowRightIcon className="h-4 w-4 duration-300 group-hover:ml-[66%]" />
      </button>
      {visible && (
        <div className="absolute left-1/2 top-1/2 grid h-full w-full -translate-x-1/2 -translate-y-1/2 transform select-none place-content-center bg-black/50 backdrop-blur">
          <div className="animate-pulse rounded-full bg-white p-8">
            <MetamaskIcon className="h-32 w-32" />
          </div>
        </div>
      )}
    </>
  );
}
