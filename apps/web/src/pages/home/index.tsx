import { api } from "@app/utils/api";
import Link from "next/link";

export default function App() {
  const { data: paymasters } = api.dashboard.getPaymasters.useQuery(
    undefined,
    {}
  );
  return (
    <>
      {paymasters &&
        paymasters.map((e) => {
          return (
            <Link href={`/paymaster/${e.id}`} key={e.id}>
              <div>
                {e.name} - ({e.address})
              </div>
            </Link>
          );
        })}
    </>
  );
}
