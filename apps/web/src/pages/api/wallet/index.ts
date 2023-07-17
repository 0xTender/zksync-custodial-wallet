/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { env } from "@app/env.mjs";
import { recoverWallet } from "@app/server/api/routers/wallet";
import { prisma } from "@app/server/db";
import { ethers } from "ethers";
import { type NextRequest, type NextResponse } from "next/server";
import { utils } from "zksync-web3";

import { Provider, Wallet } from "zksync-web3";

export default async function handler(req: NextRequest, res: NextResponse) {
  const body = req.body as unknown as {
    userId: string;
    sixDigitOtp: number;
    paymasterId: number;
    contractId: number;
    args: any[];
    functionName: string;
  };

  const paymaster = await prisma.paymaster.findFirstOrThrow({
    where: {
      id: body.paymasterId,
    },
  });

  const contract = await prisma.contract.findFirstOrThrow({
    where: {
      id: body.contractId,
    },
  });

  const privateKey = await recoverWallet(
    body.userId,
    body.sixDigitOtp,
    body.paymasterId,
    prisma
  );

  const paymasterParams = utils.getPaymasterParams(paymaster.address, {
    type: "General",
    innerInput: new Uint8Array(),
  });

  const instance = new ethers.Contract(
    contract.address,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    JSON.parse(contract.abiString)
  );

  const provider = new Provider(env.RPC_URL);
  const wallet = new Wallet(privateKey, provider);

  const gasLimit = await instance
    .connect(wallet)
    .estimateGas[body.functionName]?.(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...body.args,
      {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams: paymasterParams,
        },
      }
    );

  if (!gasLimit) {
    throw new Error("Gas limit not found");
  }

  const gasPrice = await provider.getGasPrice();
  const fee = gasPrice.mul(gasLimit.toString());
  console.log("Transaction fee estimation is :>> ", fee.toString());

  const r = await (
    await instance.connect(wallet).mint(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...body.args,
      {
        customData: {
          paymasterParams: paymasterParams,
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        },
      }
    )
  ).wait();

  // @ts-ignore
  return res.json({ r });
}
