import Login from "@app/components/login";
import { useGetExecutableFunctions } from "@app/hooks/useGetExecutableFunctions";
import { PaymasterABI } from "@root/core";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  useGetExecutableFunctions(PaymasterABI);
  return <Login />;
}
