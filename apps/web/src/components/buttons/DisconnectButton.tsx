import { useDisconnect } from "wagmi";
import { PowerIcon } from "@heroicons/react/24/outline";

export function DisconnectButton() {
  const { disconnect } = useDisconnect();
  return (
    <button
      onClick={() => disconnect()}
      className="group absolute right-4 top-4 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 pr-1 duration-300 hover:border-red-500 hover:bg-red-500/20 hover:pr-3 hover:text-red-500 hover:outline hover:outline-red-500 focus:border-red-500 focus:text-red-500 focus:outline-0 focus:ring-1 focus:ring-red-500"
    >
      Disconnect
      <PowerIcon className="h-4 w-0 text-red-500 duration-300 group-hover:w-4" />
    </button>
  );
}
