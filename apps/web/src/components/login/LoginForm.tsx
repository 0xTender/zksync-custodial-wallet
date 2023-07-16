import { Field, Formik } from "formik";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  return (
    <Formik<FormValues>
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={toFormikValidationSchema(formSchema)}
      onSubmit={(values) => {
        signIn("credentials", {
          email: values.email,
          password: values.password,
        })
          .then(console.log)
          .catch(console.error);
      }}
      validateOnBlur
      validateOnChange={false}
      validateOnMount={false}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          id="login-form"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-sm text-red-500">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-sm text-red-500">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm leading-6">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            form="login-form"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </form>
      )}
    </Formik>
  );
}
