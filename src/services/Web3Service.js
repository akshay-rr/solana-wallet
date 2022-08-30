import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Keypair, PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TEST_NETWORKS } from '../constants/Constants';

export const generateNewWallet = () => {
    const mnemonic = generateMnemonic();
    return loadWalletFromMnemonic(mnemonic);
};

export const loadWalletFromMnemonic = (mnemonic) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const a = new Uint8Array(seed.toJSON().data.slice(0,32));
    const kp = Keypair.fromSeed(a);
    
    return {
        seedPhrase: mnemonic,
        seed: seed,
        seedArray: a,
        keypair: kp
    }
};

export const getWalletAddressFromSeed = (seed) => {
    const a = new Uint8Array(seed.data.slice(0,32));
    const kp = Keypair.fromSeed(a);
    return kp.publicKey.toBase58();
}

export const getWalletBalance = async (walletAddress, network) => {
    const publicKey = new PublicKey(walletAddress);
    const connection = new Connection(network);
    const balance = await connection.getBalance(publicKey);
    const balanceInSol = balance / LAMPORTS_PER_SOL;
    return balanceInSol;
};

export const getWalletTransactions = async (walletAddress, network) => {
    const publicKey = new PublicKey(walletAddress);
    const connection = new Connection(network);
    let transactionList = await connection.getSignaturesForAddress(publicKey, {limit:10});
    let signatureList = transactionList.map(transaction=>transaction.signature);
    let transactionDetails = await connection.getParsedTransactions(signatureList);
    return transactionList;
}

export const validateSolAddress = (walletAddress) => {
    try {
        let pubkey = new PublicKey(walletAddress)
        let  isSolana =  PublicKey.isOnCurve(pubkey.toBuffer())
        return isSolana
    } catch (error) {
        return false
    }
}

export const getExplorerUrl = (signature, network) => {
    return `https://solscan.io/tx/${signature}` 
        + (TEST_NETWORKS.includes(network.name) ? 
        `?cluster=${network.name.toLowerCase()}` : '');
}