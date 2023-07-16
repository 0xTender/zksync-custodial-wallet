import Modal from "@app/components/Modal";
import { DisconnectButton } from "../../components/buttons/DisconnectButton";
import Onboarding from "@app/components/Onboarding";
import { useMemo, useState } from "react";
import Register from "@app/components/Register";

const steps = {
  onboarding: {
    title: "Onboarding",
  },
  register: {
    title: "Register Paymaster",
  },
  app: {
    title: null,
  },
} as const;

export default function App() {
  const [name, setName] = useState("");
  const [appName, setAppName] = useState("");
  const step = useMemo(() => {
    if (!name) return steps.onboarding;
    if (!appName) return steps.register;
    return steps.app;
  }, [appName, name]);
  return (
    <Modal heading={step.title || `${appName} by @${name}`} grayscale>
      {step === steps.onboarding && <Onboarding setName={setName} />}
      {step === steps.register && <Register setAppName={setAppName} />}
      {/* absolute */}
      <DisconnectButton />
    </Modal>
  );
}
