## Custodial Wallet

A custodial wallet service - with Paymasters and Smart Wallet Accounts.

Easily on-board users to your application with OAuth based flows and without the need for them to have their own wallets.

The SDK allows easy integration of custodial wallets to your Decentralized App.

## Onboarding

Go to dashboard and register yourself.
Once done you can create your own PayMaster which will be responsible for transactions.
Add allowed contracts and their functions which you would like to fund for your users.

## Security

- The security is ensured with decentralized split of private key.
- The transactions can only be executed with user with 6-digit otp + authentication ensured from client.
- The request can be left to frontend but it is recommended for clients to ensure auth and make these calls from backend.
- A partial un-encrypted private key is stored on server and part of it is shared with user in case of recovery.

## The API

The API allows you to integrate the custodial solution to your application.

Users on your business can either create:

- A smart wallet whose custody is retained by 0xTender.
- A smart wallet whose custody is retained by the user.

### Create Wallet

- API Request
- URL: `${url}/wallet/create`
- Method: `POST`
  Data

```jsonc
{
  "userId": "your-user-id",
  "apiSecret": "paymaster-secret",
  "apiKey": "paymaster-api",
  // can be less than 6 digit, gets padded with 0
  "sixDigitOtp": 123
}
```

### Execute Transaction

- API Request
- URL: `${url}/wallet/`
- Method: `POST`
  Data

```jsonc
{
  "userId": "your-user-id",
  // can be less than 6 digit, gets padded with 0
  "sixDigitOtp": 123,
  "paymasterId": 1,
  "contractId": 2,
  // function and contract should be added to dashboard
  "args": [spenderAddress, allowanceAmount],
  "functionName": "approve"
}
```

## The Contracts

Registry Contract - This holds rules for the resources.
Deployed PayMasters query the `Registry Contract` for allowed users, allowed contracts, allowed function

PayMasterFactory Contract - Deploys a PayMaster for each business.

PayMaster Contract - The PayMaster contract. Projects can refuel these.

AbstractAccountFactory - An abstract account is created for every custodial wallet.

Features:

- Can set which contract addresses are allowed.
- Can set which functions on the contract address are allowed.
- Can set allowed users.

## Screenshots

<img src="./apps/docs/1.png" />
<img src="./apps/docs/2.png" />
<img src="./apps/docs/3.png" />

## About the Project

A Secure Decentralized Custodial Wallet that blends the convenience of a custodial wallet with the security of decentralized protocols.

In this setup, users retain custody of their private keys, granting them full control over their funds.

The wallet integrates smart contract technology to facilitate secure interactions between users and the custodial service provider, creating a trustless environment.

The transactions can be sponsored by the Paymaster if the project owners choose to do so.

One of the defining features of this wallet is the implementation of account abstraction.

Unlike traditional custodial wallets that rely on simple address-balance account models, this solution allows for more flexible account structures with customizable logic.

Users can now define complex spending conditions, multi-factor authentication, and time-locked transactions, ensuring that their assets are secure even if the custodial provider experiences vulnerabilities.

Centralized points of failure are one of the primary concerns with traditional custodial wallets.

By leveraging decentralized nature, the wallet distribute control and responsibility across a network of nodes.

This approach reduces the risk of a single point of attack and enhances the overall security posture of the custodial service.

The integration of smart contracts into this wallet ensures that custody remains trustless with API.

Smart contracts enforce pre-agreed terms between users and the custodial provider, eliminating the need to place blind trust in a centralized entity.

## Development

Steps to run

```env
DATABASE_URL=mysql://root:password@localhost:3306/account-abstraction
RPC_URL="https://zksync2-testnet.zksync.dev"
```

Run if required:

```sh
docker volume create chain-data
```

Update the env:

```
cp .env.example .env
```

Initialize:

```
./init.sh
```

Start worker:

```
pnpm run start:worker
```

Start dev

```
pnpm run dev
```

You can reset your local deployments with (destructive action):

./reset.sh
