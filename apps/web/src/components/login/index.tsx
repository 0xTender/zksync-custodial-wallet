import LoginButtons from "./LoginButtons";

export default function Login() {
  return (
    <div className="flex h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white p-6 shadow sm:rounded-lg">
          <div className="pb-6 sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <LoginButtons />
        </div>
      </div>
    </div>
  );
}
