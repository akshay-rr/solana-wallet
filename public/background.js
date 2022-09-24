const loadAccount = () => {
    let accountString = window.localStorage.getItem("account");
    if (accountString) {
        return JSON.parse(accountString);
    }
    return null;
};

const getWalletAddressFromSeed = (seed) => {
    const kp = getKeypairFromSeed(seed);
    return kp.publicKey.toBase58();
};

const getKeypairFromSeed = (seed) => {
    const a = new Uint8Array(seed.data.slice(0, 32));
    const kp = Keypair.fromSeed(a);
    return kp;
};

const getAccount = () => {
    let tempAccount = loadAccount();
    let account = getWalletAddressFromSeed(tempAccount.wallet.seed);
    return account;
};

// console.log("Initialize event listeners");

// chrome.tabs.onActivated.addListener((tab) => {
//     executeListenerFunction(tab);
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "CONNECT_REQUEST") {
        console.log("Connect Request Received (BS): ", request);
        sendResponse({
            type: "CONNECT_RESPONSE",
            data: getAccount()
        });
    }
});

// chrome.tabs.onUpdated.addEventListener((tab) => {
//     executeListenerFunction(tab);
// })

// const executeListenerFunction = (tab) => {
//     console.log(tab);

//     chrome.tabs.get(tab.tabId, (CurrentTabData) => {
//         let request = {
//             operation: "account-injection",
//             from: "background",
//             data: getAccount(),
//         };

//         setTimeout(() => {
//             chrome.tabs.sendMessage(tab.tabId, request, (response) => {
//                 console.log(response);
//             });
//         }, 2000);
//     });
// };

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message);
//     console.log(sender);

//     switch (message.operation) {
//         case "test":
//             sendResponse("Received by background");
//         case "get-account":
//             sendResponse(getAccount());
//         default:
//             sendResponse("Unknown operation");
//     }
// });

// var port = chrome.runtime.connect();

// window.addEventListener("message", (event) => {
//     // We only accept messages from ourselves
//     if (event.source != window) {
//       return;
//     }

//     if (event.data.type && (event.data.type == "FROM_PAGE")) {
//       console.log("Content script received: " + event.data.text);
//       port.postMessage(event.data.text);
//     }
// }, false);
