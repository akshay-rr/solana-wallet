import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Keypair, PublicKey, Connection, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
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
    const kp = getKeypairFromSeed(seed);
    return kp.publicKey.toBase58();
}

export const getKeypairFromSeed = (seed) => {
    const a = new Uint8Array(seed.data.slice(0,32));
    const kp = Keypair.fromSeed(a);
    return kp;
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
    return transactionDetails;
}

export const createSolTransferTransaction = (fromAddress, toAddress, amount) => {
    const transaction = new Transaction();
    transaction.add(
        SystemProgram.transfer({
            fromPubkey: new PublicKey(fromAddress),
            toPubkey: new PublicKey(toAddress),
            lamports: LAMPORTS_PER_SOL * amount,
        })
    );
    return transaction;
}

export const getTransactionEstimate = async (transaction, wallet, network) => {
    const connection = new Connection(network);
    const { blockhash } = await connection.getLatestBlockhash('finalized');

    const txn = await buildTransaction(transaction, wallet, blockhash);
    const f = await txn.getEstimatedFee(connection);
    return f / LAMPORTS_PER_SOL;
}

export const getTransactionResponse = async (transactionDetails, wallet, network) => {
    const connection = new Connection(network);
    const { blockhash } = await connection.getLatestBlockhash('finalized');

    const txn = await buildTransaction(transactionDetails, wallet, blockhash);

    const signature = await sendAndConfirmTransaction(
        connection,
        txn,
        [wallet],
    );

    return signature;
}

export const buildTransaction = async (transactionDetails, wallet, recentBlockHash) => {
    const toPubKey = new PublicKey(transactionDetails.to);
    const fromPubkey = wallet.publicKey;
    const sendAmount = LAMPORTS_PER_SOL * transactionDetails.amount;

    const txn = new Transaction();
    txn.add(
        SystemProgram.transfer({
            fromPubkey: fromPubkey,
            toPubkey: toPubKey,
            lamports: sendAmount,
        })
    );
    txn.recentBlockhash = recentBlockHash;
    txn.feePayer = fromPubkey;

    return txn;
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

export const getAssociatedTokenAccounts = async (walletAddress, network) => {
    const connection = new Connection(network);
    const pubKey = new PublicKey(walletAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubKey, {
        programId: TOKEN_PROGRAM_ID
    });
    console.log('Token Accounts');
    console.log(tokenAccounts);
    return tokenAccounts;
}

export const createAssociatedTokenAccount = async (walletKeypair, network, mintAddress) => {
    const connection = new Connection(network);
    const tokenMintPubKey = new PublicKey(mintAddress);
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        walletKeypair, 
        tokenMintPubKey, 
        walletKeypair.publicKey,
        false,
        'confirmed',
        undefined,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
    console.log('Fetched Token Acount');
    console.log(tokenAccount);
    return tokenAccount;
}

export const getExplorerUrl = (signature, network) => {
    return `https://solscan.io/tx/${signature}` 
        + (TEST_NETWORKS.includes(network.name) ? 
        `?cluster=${network.name.toLowerCase()}` : '');
}