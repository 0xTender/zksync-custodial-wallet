import Login from "@app/components/login";
import { api } from "@app/utils/api";

export default function LoginPage() {
  api.dashboard.createPaymaster.useQuery({
    tx: "0xceb4e1570bde7fec8cb0c1234fdf81c513f92b60fedd1bd99bc3efb53552130d",
  });
  return <Login />;
}
