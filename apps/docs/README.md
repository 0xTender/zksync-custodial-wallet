# About the Project

A custodial wallet service - with Paymasters and Smart Wallet Accounts.

Easily on-board users to your application with OAuth based flows and without the need for them to have their own wallets.

The SDK allows easy integration of custodial wallets to your Decentralized App.

# Onboarding

Go to dashboard and register yourself.
Once done you can create your own PayMaster which will be responsible for transactions.
Add allowed contracts and their functions which you would like to fund for your users.

# Security

- The security is ensured with decentralized split of private key.
- The transactions can only be executed with user with 6-digit otp + authentication ensured from client.
- The request can be left to frontend but it is recommended for clients to ensure auth and make these calls from backend.
- A partial un-encrypted private key is stored on server and part of it is shared with user in case of recovery.

# The API

The API allows you to integrate the custodial solution to your application.

Users on your business can either create:

- A smart wallet whose custody is retained by 0xTender.
- A smart wallet whose custody is retained by the user.

## Create Wallet

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

## Execute Transaction

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

# The Contracts

Registry Contract - This holds rules for the resources.
Deployed PayMasters query the `Registry Contract` for allowed users, allowed contracts, allowed function

PayMasterFactory Contract - Deploys a PayMaster for each business.

PayMaster Contract - The PayMaster contract.

AbstractAccountFactory - An abstract account is created for every custodial wallet.

Features:

- Can set which contract addresses are allowed.
- Can set which functions on the contract address are allowed.
- Can set allowed users.
