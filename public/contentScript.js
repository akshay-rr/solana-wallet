function injectScript(file, node) {
    console.log(file);

    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", file);
    s.setAttribute("crossorigin", "anonymous");
    th.appendChild(s);

    // document.getElementsByTagName(node)[0].appendChild('<div>Hi there</div>');
}
injectScript(chrome.runtime.getURL("./injectScript.js"), "body");

const loadAccount = () => {
    let accountString = localStorage.getItem("account");
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

// chrome.runtime.sendMessage(
//     {
//         operation: "test",
//         data: 0,
//     },
//     (response) => {
//         console.log(response);
//     }
// );

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Received Request: " + message.operation);
//     console.log(message.data);
//     console.log("Sent By: " + message.from);
//     console.log(sender);

//     sendResponse("Received by content script");
// });

// chrome.runtime.onMessageExternal.addListener(
//     function(request, sender, sendResponse) {
//         console.log('Sender');
//         console.log(sender);

//         console.log('Request');
//         console.log(request);

//         if (request.operation === "getAccount") {
//             sendResponse(getAccount());
//         }
//     }
// );

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
//     if (request.greeting === "hello") sendResponse({ farewell: "goodbye" });
// });

// window.addEventListener(
//     "getChromeData",
//     function (evt) {
//         var request = evt.detail;
//         var response = { requestId: request.id };
//         // do Chrome things with request.data, add stuff to response.data
//         window.dispatchEvent(new CustomEvent("sendChromeData", { detail: response }));
//     },
//     false
// );

window.addEventListener(
    "getChromeData",
    function (data) {
        if (data.detail.type === "CONNECT_REQUEST") {
            console.log("Transmitting Connect Request (CS): ", data.detail);
            chrome.runtime.sendMessage(data.detail, function (response) {
                console.log("Transmitting Connect Response (CS): ", response);
            });
        }
    },
    false
);

// window.addEventListener(
//     "message",
//     (event) => {
//         // We only accept messages from ourselves
//         if (event.source != window) {
//             return;
//         }

//         console.log("Inside CD: " + JSON.stringify(event));

//         switch (event.data.type) {
//             case "CONNECT_REQUEST":
//                 {
//                     console.log("====================================");
//                     console.log("inside content script", event.data);
//                     console.log("====================================");
//                     chrome.runtime.sendMessage({ operation: "get-account" }, function (response) {
//                         window.postMessage({ type: "CONNECT_RESPONSE", value: response }, "*");
//                     });
//                 }
//                 break;
//             default: {
//                 console.log("UNKNOWN REQUEST RECEIVED BY CS");
//                 console.log(event.data);
//             }
//         }
//     },
//     false
// );

// window.cool = 'coolx';
