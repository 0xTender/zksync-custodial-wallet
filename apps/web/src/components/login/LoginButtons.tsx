import MetamaskButton from "@app/components/buttons/MetamaskButton";

export default function LoginButtons() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <MetamaskButton />
        <div className="flex w-full select-none items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
          <span className="text-base font-semibold leading-6">
            More coming soon
          </span>
        </div>
      </div>
    </>
  );
}
