import Modal from "@app/components/Modal";
import { DisconnectButton } from "../../components/buttons/DisconnectButton";
import Onboarding from "@app/components/Onboarding";
import { useEffect, useMemo, useState } from "react";
import CreatePaymaster from "@app/components/CreatePaymaster";
import { api } from "@app/utils/api";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const steps = {
  onboarding: {
    title: "Onboarding",
  },
  register: {
    title: "Create Paymaster",
  },
  app: {
    title: null,
  },
} as const;

export default function App() {
  const [name, setName] = useState("");
  const [appName, setAppName] = useState("");
  const { address } = useAccount();

  const { data } = api.user.details.useQuery({
    address: address || "",
  });
  const step = useMemo(() => {
    const username = data?.username;
    if (!name && username !== undefined) {
      setName(username);
      return steps.register;
    }

    if (!name) return steps.onboarding;

    if (!appName) return steps.register;

    return steps.app;
  }, [appName, name, data]);

  const { push } = useRouter();

  useEffect(() => {
    if (!appName || !push) {
      return;
    }
    // void push("/home");
  }, [appName, push]);

  return (
    <Modal heading={step.title || `${appName} by @${name}`} grayscale>
      {step === steps.onboarding && <Onboarding setName={setName} />}
      {step === steps.register && <CreatePaymaster setAppName={setAppName} />}
      {/* absolute */}
      <DisconnectButton />
    </Modal>
  );
}
