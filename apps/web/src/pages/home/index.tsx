import Modal from "@app/components/Modal";
import { useDisconnect } from "wagmi";

export default function App() {
  const { disconnect } = useDisconnect();
  return (
    <Modal heading="Onboarding">
      <button
        onClick={() => disconnect()}
        className="rounded-lg border px-3 py-1.5 hover:bg-gray-100"
      >
        Disconnect
      </button>
    </Modal>
  );
}
