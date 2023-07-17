import { useAccount, useConfig, useConnect, useSignMessage } from "wagmi";
import MetamaskIcon from "@app/components/icons/MetamaskIcon";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { api } from "@app/utils/api";

export default function MetamaskButton() {
  const { connectors } = useConfig();
  const { connect, status } = useConnect({
    connector: connectors[0],
  });

  const { address } = useAccount();

  const { setAuthenticated } = useContext(AuthContext);

  const { mutate: login, isLoading: isFetching } = api.user.login.useMutation({
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      setAuthenticated(true);
    },
  });

  const [visible, setVisible] = useState(false);

  const {
    data,
    isError: signError,
    signMessage,
    isSuccess: isSignSuccess,
    isLoading: isSigning,
  } = useSignMessage();

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(status === "loading" || isSigning || isFetching);
    }, 100);
    return () => clearTimeout(id);
  }, [status, isSigning, isFetching]);

  const [timestamp, setTimestamp] = useState<number>(0);

  useEffect(() => {
    if (status !== "success" || !address) {
      return;
    }
    const timestamp = Date.now();
    setTimestamp(timestamp);
    signMessage({
      message: JSON.stringify({
        address,
        timestamp,
      }),
    });
  }, [status, signMessage, address]);

  useEffect(() => {
    if (!isSignSuccess || !timestamp || !address) {
      return;
    }

    login({
      address,
      message: {
        address,
        timestamp,
      },
      signature: data ?? "",
    });
  }, [isSignSuccess, timestamp, address, data, login]);

  return (
    <>
      <button
        className="group flex w-full items-center justify-start gap-3 rounded-md border border-blue-600 px-3 py-2 text-blue-500 duration-150  hover:bg-blue-800/10 hover:outline hover:outline-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        onClick={() => {
          if (!address) connect();
          else {
            const timestamp = Date.now();
            setTimestamp(timestamp);
            signMessage({
              message: JSON.stringify({
                address,
                timestamp,
              }),
            });
          }
        }}
      >
        <div className="inline-flex gap-2">
          <MetamaskIcon />
          <span className="text-base font-semibold leading-6">Metamask</span>
        </div>
        <ArrowRightIcon className="h-4 w-4 duration-300 group-hover:ml-[66%]" />
      </button>
      {signError && <div className="py-2">Sign failed</div>}
      {visible && (
        <div className="absolute left-1/2 top-1/2 grid h-full w-full -translate-x-1/2 -translate-y-1/2 transform select-none place-content-center bg-black/50 backdrop-blur">
          <div className="animate-pulse rounded-full bg-white p-8">
            <MetamaskIcon className="h-32 w-32" />
          </div>
        </div>
      )}
    </>
  );
}
