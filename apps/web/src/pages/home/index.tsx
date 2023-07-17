import { api } from "@app/utils/api";

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
            <>
              {e.address} - {e.chainId}
            </>
          );
        })}
    </>
  );
}
