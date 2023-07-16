export default function copyToClipboard(value: string) {
  void navigator.clipboard.writeText(value);
}
