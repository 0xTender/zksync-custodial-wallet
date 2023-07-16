import Login from "@app/components/login";
import { useCreatePaymaster } from "@app/hooks/useCreatePaymaster";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  useCreatePaymaster();
  return <Login />;
}
