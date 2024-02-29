import express from 'express';
import * as nearAPI from 'near-api-js';

const { keyStores, KeyPair, connect, Contract } = nearAPI;
const app = express();
const PORT = 8080;

// Define NEAR credentials and configuration
const PRIVATE_KEY = ""; // Insert your private key here

const accountId = ""; // Insert your NEAR account ID here
const contractName = ""; // Insert your NEAR contract name here

// Initialize key store and key pair
const keyStore = new keyStores.InMemoryKeyStore();
const keyPair = KeyPair.fromString(PRIVATE_KEY);
await keyStore.setKey("testnet", accountId, keyPair);

// NEAR configuration
const nearConfig = {
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
};

// Connect to NEAR
const nearConnection = await connect(nearConfig);
const account = await nearConnection.account(accountId);

// Function to interact with NEAR contract
async function mintNFT() {
    const contract = new Contract(account, contractName, {
        viewMethods: [],
        changeMethods: ["mint"],
    });

    try {
        const response = await account.functionCall({
            contractId: contractName,
            methodName: "mint",
            args: {},
            gas: "300000000000000",
            attachedDeposit: "1000000000000000000000000",
        });

        console.log("Mint function response:", response);
        const transactionId = response.transaction_outcome.id;
        return transactionId;
    } catch (error) {
        console.error("Error calling mint function:", error);
        return error;
    }
}

// Endpoint to trigger NFT minting
app.get('/mintnft', async (req, res) => {
    try {
        const transactionId = await mintNFT();
        console.log(transactionId);
        res.send({ transactionId: transactionId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to mint NFT' });
    }
});

// Start the server
app.listen(process.env.PORT || PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
