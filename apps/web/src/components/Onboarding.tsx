import { z } from "zod";
import { Field, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ArrowRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().min(8).max(64),
});

type FormValues = z.infer<typeof schema>;

export default function Onboarding() {
  const { address } = useAccount();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
  }, []);

  return (
    <Formik<FormValues>
      initialValues={{ name: "" }}
      validationSchema={toFormikValidationSchema(schema)}
      onSubmit={console.log}
      validateOnMount
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-extralight text-zinc-200">
              Username
            </label>
            <Field
              name="name"
              placeholder="Enter your name"
              className="rounded-md border border-orange-500 bg-orange-500/0 p-2 px-3 py-2 text-orange-500 placeholder-orange-700/25 duration-300 hover:bg-orange-800/10 hover:outline hover:outline-orange-600  focus:border-orange-700 focus:bg-orange-600/10 focus:ring-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-extralight text-zinc-200">
              Address
            </label>
            <input
              disabled
              value={address}
              name="address"
              placeholder="Enter your name"
              className="rounded-md border border-orange-500 bg-orange-500/20 p-2 px-3 py-2 text-orange-500 placeholder-orange-700/50"
            />
          </div>
          <button
            suppressHydrationWarning
            className={twMerge(
              "group pointer-events-none mt-8 flex w-full cursor-not-allowed items-center justify-start gap-3 rounded-md border border-zinc-600 px-3 py-2 text-zinc-500 opacity-50 duration-300 hover:bg-orange-800/10 hover:outline hover:outline-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400",
              formik.isValid &&
                mounted === true &&
                "pointer-events-auto cursor-pointer border-orange-600 text-orange-500 opacity-100 marker:bg-orange-500"
            )}
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            <div className="inline-flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5" />
              <span className="text-base font-semibold leading-6">Submit</span>
            </div>
            <ArrowRightIcon className="h-4 w-4 duration-300 group-hover:ml-[72%]" />
          </button>
        </form>
      )}
    </Formik>
  );
}
