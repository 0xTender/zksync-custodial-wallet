export default function minifyAddress(address?: `0x${string}`) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}` as const;
}
