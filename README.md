# CryptoRunner NFT Minting API

This project provides an API to mint NFTs (Non-Fungible Tokens) from CryptoRunner to the NEAR blockchain. With this API, you can mint NFTs directly from your CryptoRunner account to the NEAR blockchain.

## Prerequisites

Before getting started, ensure you have the following:

- NEAR account: You need a NEAR blockchain account to mint NFTs.
- CryptoRunner account: You need an account on CryptoRunner to interact with the NFT minting API.
- Private key: You should have a private key associated with your NEAR account for signing transactions.
- Node.js: Ensure you have Node.js installed on your system.

## Installation

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install` in the project directory.

## Configuration

Before running the API, make sure to configure the following:

- NEAR credentials: Update the `PRIVATE_KEY`, `accountId`, and `contractName` variables in `index.js` with your NEAR credentials.
- NEAR network URLs: Ensure the NEAR node URL, wallet URL, helper URL, and explorer URL are correctly configured in `index.js`.

## Usage

To start the API server, run the following command:

