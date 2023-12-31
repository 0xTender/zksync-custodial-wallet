import { z } from "zod";
import { Field, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  ArrowRightIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { useChainId } from "wagmi";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useCreatePaymaster } from "@app/hooks/contract/useCreatePaymaster";
import { api } from "@app/utils/api";
import { useRouter } from "next/router";

const schema = z.object({
  name: z.string().min(8).max(64),
});

type FormValues = z.infer<typeof schema>;

export default function CreatePaymaster({
  setAppName,
}: {
  setAppName: (name: string) => void;
}) {
  const { data: paymasters } = api.dashboard.getPaymasters.useQuery(undefined, {
    retry(failureCount) {
      return failureCount < 3;
    },
  });
  const id = useChainId();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
  }, []);

  const [app, setApp] = useState<string>();

  const { createPaymaster, isSuccess } = useCreatePaymaster({
    paymasterName: app ?? "",
  });

  useEffect(() => {
    if (!isSuccess || !app) return;

    setAppName(app);
  }, [isSuccess, app, setAppName]);

  const { push } = useRouter();

  useEffect(() => {
    if (!push || !paymasters || paymasters?.length === 0) return;

    // void push("/home");
  }, [paymasters, push]);

  return (
    <Formik<FormValues>
      initialValues={{ name: "" }}
      validationSchema={toFormikValidationSchema(schema)}
      onSubmit={(values) => {
        createPaymaster();
        setApp(values.name);
      }}
      validateOnMount
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-extralight text-slate-200">
              Paymaster
            </label>
            <Field
              name="name"
              placeholder="Enter paymaster name"
              className="rounded-md border border-blue-500 bg-blue-500/0 p-2 px-3 py-2 text-blue-500 placeholder-blue-700/25 duration-300 hover:bg-blue-800/10 hover:outline hover:outline-blue-600  focus:border-blue-700 focus:bg-blue-600/10 focus:ring-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-extralight text-slate-200">
              Network
            </label>
            <input
              disabled
              value={`${id}  -  ZKSync Era Network`}
              name="address"
              placeholder="Enter your name"
              className="rounded-md border border-blue-500 bg-blue-500/20 p-2 px-3 py-2 text-blue-500 placeholder-blue-700/50"
            />
          </div>
          <button
            suppressHydrationWarning
            className={twMerge(
              "group pointer-events-none mt-8 flex w-full cursor-not-allowed items-center justify-start gap-3 rounded-md border border-slate-600 px-3 py-2 text-slate-500 opacity-50 duration-300 hover:bg-blue-800/10 hover:outline hover:outline-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400",
              formik.isValid &&
                mounted === true &&
                "pointer-events-auto cursor-pointer border-blue-600 text-blue-500 opacity-100 marker:bg-blue-500"
            )}
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            <div className="inline-flex items-center gap-2">
              <IdentificationIcon className="h-5 w-5" />
              <span className="text-base font-semibold leading-6">
                Create Paymaster
              </span>
            </div>
            <ArrowRightIcon className="h-4 w-4 duration-300 group-hover:ml-[53%]" />
          </button>
        </form>
      )}
    </Formik>
  );
}
