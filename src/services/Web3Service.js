import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Keypair, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

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

export const getWalletBalance = async (walletAddress) => {
    const publicKey = new PublicKey(walletAddress);
    const connection = new Connection(clusterApiUrl('devnet'));
    const balance = await connection.getBalance(publicKey);
    const balanceInSol = balance / LAMPORTS_PER_SOL;
    return balanceInSol;
};