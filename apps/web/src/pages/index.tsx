import Login from "@app/components/login";
import { useGetExecutableFunctions } from "@app/hooks/useGetExecutableFunctions";
import { PaymasterABI } from "@root/core";
import { useCreatePaymaster } from "@app/hooks/useCreatePaymaster";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  useCreatePaymaster();
  return <Login />;
}
