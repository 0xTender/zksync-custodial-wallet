import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function MetamaskIcon(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props;
  return (
    <div className={twMerge("relative h-6 w-6", className)} {...rest}>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png"
        alt="Metamask Logo"
        fill
        unoptimized
      />
    </div>
  );
}
