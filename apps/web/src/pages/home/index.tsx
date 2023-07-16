import Modal from "@app/components/Modal";
import { DisconnectButton } from "../../components/buttons/DisconnectButton";
import Onboarding from "@app/components/Onboarding";

export default function App() {
  return (
    <Modal heading="Onboarding" grayscale>
      <Onboarding />
      {/* absolute */}
      <DisconnectButton />
    </Modal>
  );
}
