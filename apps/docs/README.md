# About the Project

A custodial wallet service - with Paymasters and Smart Wallet Accounts.

Easily on-board users to your application with OAuth based flows and without the need for them to have their own wallets.

The SDK allows easy integration of custodial wallets to your Decentralized App.

# Onboarding

Go to dashboard and register yourself.
Once done you can create your own PayMaster which will be responsible for transactions.
Add allowed contracts and their functions which you would like to fund for your users.

# The SDK

The SDK allows you to integrate the custodial solution to your application.

Users on your business can either create:

- A smart wallet whose custody is retained by 0xTender.
- A smart wallet whose custody is retained by the user.

# The Contracts

Registry Contract - This holds rules for the resources.
Deployed PayMasters query the `Registry Contract` for allowed users, allowed contracts, allowed function

PayMasterFactory Contract - Deploys a PayMaster for each business.

PayMaster Contract - The PayMaster contract.
Features:

- Can set which contract addresses are allowed.
- Can set which functions on the contract address are allowed.
- Can set allowed amount for the user.
- Can set allowed users.
