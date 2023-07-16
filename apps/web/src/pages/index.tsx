import Login from "@app/components/login";
import { api } from "@app/utils/api";

export default function LoginPage() {
  api.dashboard.createPaymaster.useQuery({
    tx: "0x8cc83fd620a4c4f9c5fe88a777b0c22689848d42bbd7d8b311fa2f33fb96b675",
  });
  return <Login />;
}
