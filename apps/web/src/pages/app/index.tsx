import { useDisconnect } from "wagmi";

export default function App() {
  const { disconnect } = useDisconnect();
  return (
    <div className="grid h-full w-full place-items-center">
      <button
        onClick={() => disconnect()}
        className="rounded-lg border px-3 py-1.5 hover:bg-gray-100"
      >
        Disconnect
      </button>
    </div>
  );
}
