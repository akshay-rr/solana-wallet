import { NETWORKS } from "../constants/Constants";

export const getNetworkObjectByNetworkName = (name) => {
    switch(name) {
        case NETWORKS.MAIN.name:
            return NETWORKS.MAIN;
        case NETWORKS.TEST.name:
            return NETWORKS.TEST;
        default:
            return NETWORKS.DEV;
    }
}

export const isValidString = (str) => {
    return str !== null && str !== undefined && str.trim().length > 0;
}