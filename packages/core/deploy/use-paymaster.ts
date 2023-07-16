import { Provider, utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// Put the address of the deployed paymaster here
// 0xaE7F6b4f2fF21fC5Fc52932A25faea11Bf5F509e
const PAYMASTER_ADDRESS = "0xfEfb66104517a9410FDDb485D1b8a3d0aF752fAe";

// Put the address of the ERC20 token here:
const TOKEN_ADDRESS = "0xA1B809005E589f81dE6EF9F48D67e35606c05fC3";

// Wallet private key
const EMPTY_WALLET_PRIVATE_KEY =
  "0xd6c493b7f1314b65b291f14161baebdd01e64d7c764c4218c774680f310ee646";

function getToken(hre: HardhatRuntimeEnvironment, wallet: Wallet) {
  const artifact = hre.artifacts.readArtifactSync("MyERC20");
  return new ethers.Contract(TOKEN_ADDRESS, artifact.abi, wallet);
}

export default async function (hre: HardhatRuntimeEnvironment) {
  const provider = new Provider("http://192.168.29.82:3050");
  const emptyWallet = new Wallet(EMPTY_WALLET_PRIVATE_KEY, provider);

  // const paymasterWallet = new Wallet(PAYMASTER_ADDRESS, provider);
  // Obviously this step is not required, but it is here purely to demonstrate that indeed the wallet has no ether.
  const ethBalance = await emptyWallet.getBalance();
  if (!ethBalance.eq(0)) {
    throw new Error("The wallet is not empty!");
  }

  console.log(
    `ERC20 token balance of the empty wallet before mint: ${await emptyWallet.getBalance(
      TOKEN_ADDRESS
    )}`
  );

  let paymasterBalance = await provider.getBalance(PAYMASTER_ADDRESS);
  console.log(`Paymaster ETH balance is ${paymasterBalance.toString()}`);

  const erc20 = getToken(hre, emptyWallet);

  const gasPrice = await provider.getGasPrice();

  // Encoding the "ApprovalBased" paymaster flow's input
  const paymasterParams = utils.getPaymasterParams(PAYMASTER_ADDRESS, {
    type: "General",
    // token: TOKEN_ADDRESS,
    // set minimalAllowance as we defined in the paymaster contract
    // minimalAllowance: ethers.BigNumber.from(1),
    // empty bytes as testnet paymaster does not use innerInput
    innerInput: new Uint8Array(),
  });

  // Estimate gas fee for mint transaction
  const gasLimit = await erc20.estimateGas.mint(emptyWallet.address, 5, {
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      paymasterParams: paymasterParams,
    },
  });

  const fee = gasPrice.mul(gasLimit.toString());
  console.log("Transaction fee estimation is :>> ", fee.toString());

  console.log(`Minting 5 tokens for empty wallet via paymaster...`);
  const r = await (
    await erc20.mint(emptyWallet.address, 5, {
      // paymaster info
      customData: {
        paymasterParams: paymasterParams,
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      },
    })
  ).wait();
  console.log(r);
  console.log(JSON.stringify(r));

  console.log(
    `Paymaster ERC20 token balance is now ${await erc20.balanceOf(
      PAYMASTER_ADDRESS
    )}`
  );

  paymasterBalance = await provider.getBalance(PAYMASTER_ADDRESS);
  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

  console.log(
    `ERC20 token balance of the empty wallet after mint: ${await emptyWallet.getBalance(
      TOKEN_ADDRESS
    )}`
  );
}
