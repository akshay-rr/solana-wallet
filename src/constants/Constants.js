import { clusterApiUrl } from "@solana/web3.js";

export const CLUSTER_URLS = {
    TEST: "https://api.testnet.solana.com",
    DEV: "https://api.devnet.solana.com",
    MAIN: "https://api.mainnet-beta.solana.com"
}

export const CREATE_NEW_WALLET_STEPS = {
    ACCOUNT_CREDENTIALS: 0,
    SEED_PHRASE: 1,
    COMPLETE: 2
};

export const IMPORT_WALLET_STEPS = {
    SEED_PHRASE: 0,
    ACCOUNT_SELECT: 1,
    ACCOUNT_CREDENTIALS: 2,
    COMPLETE: 3
};

export const DEPOSIT_STEPS = {
    TOKEN_SELECT: 0,
    DEPOSIT_ADDRESS: 1
};

export const SEND_STEPS = {
    TOKEN_SELECT: 0,
    SEND_ADDRESS: 1
};

export const NETWORKS = {
    DEV: {
        name: "Devnet",
        url: clusterApiUrl('devnet')
    },
    TEST: {
        name: "Testnet",
        url: clusterApiUrl('testnet')
    },
    MAIN: {
        name: "Mainnet",
        url: clusterApiUrl('mainnet-beta')
    }
}

export const TEST_NETWORKS = [NETWORKS.DEV.name, NETWORKS.TEST.name];