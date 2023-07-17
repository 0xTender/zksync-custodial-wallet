import { api } from "@app/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

export default function App() {
  const { data: paymasters } = api.dashboard.getPaymasters.useQuery(
    undefined,
    {}
  );

  const { push } = useRouter();
  return (
    <>
      <div className="h-full bg-slate-900">
        <div className="flex h-full flex-col gap-2 bg-slate-900 py-12 font-thin  sm:px-6 lg:px-8">
          <h1 className="text-xl font-medium">Paymasters</h1>
          <button
            suppressHydrationWarning
            className={twMerge(
              "group pointer-events-none my-4 flex cursor-not-allowed items-center justify-start gap-3 rounded-md border border-slate-600 px-3 py-2 text-slate-500 opacity-50 duration-300",
              "hover:bg-blue-800/10 hover:outline hover:outline-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400",
              "pointer-events-auto cursor-pointer border-blue-600 text-blue-500 opacity-100 marker:bg-blue-500",
              "w-fit"
            )}
            onClick={() => {
              void push("/onboarding");
            }}
          >
            Create Paymaster
          </button>
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
        </div>
      </div>
    </>
  );
}
