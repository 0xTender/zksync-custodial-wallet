import { type PropsWithChildren } from "react";

export default function Modal({
  children,
  heading,
}: PropsWithChildren<{
  heading: string | JSX.Element;
}>) {
  return (
    <div className="flex h-full flex-1 flex-col justify-center bg-zinc-900 py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <h1 className="my-4 text-xl text-zinc-100/90">{heading}</h1>
        <div className="border-[0.5px] border-amber-800/50 bg-amber-800/5 p-6 sm:rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
