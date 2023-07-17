import Modal from "../Modal";
import MetamaskButton from "../buttons/MetamaskButton";

export default function Login() {
  return (
    <Modal heading="0xTender - Custodial Wallet">
      <div className="pb-6 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-2xl leading-9 tracking-tight text-slate-200">
          Sign in to your account
        </h2>
      </div>
      <MetamaskButton />
    </Modal>
  );
}
