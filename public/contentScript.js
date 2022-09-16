function injectScript(file, node) {

    console.log(file);

    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    s.setAttribute('crossorigin', 'anonymous');
    th.appendChild(s);

    // document.getElementsByTagName(node)[0].appendChild('<div>Hi there</div>');
}
injectScript(chrome.runtime.getURL("./injectScript.js"), 'body');


const loadAccount = () => {
    let accountString = localStorage.getItem('account');
    if(accountString){
        return JSON.parse(accountString);
    }
    return null;
}

const getWalletAddressFromSeed = (seed) => {
    const kp = getKeypairFromSeed(seed);
    return kp.publicKey.toBase58();
}

const getKeypairFromSeed = (seed) => {
    const a = new Uint8Array(seed.data.slice(0,32));
    const kp = Keypair.fromSeed(a);
    return kp;
}

const getAccount = () => {
    let tempAccount = loadAccount();
    let account = getWalletAddressFromSeed(tempAccount.wallet.seed);
    return account
}


chrome.runtime.sendMessage(
    {
        operation: "test",
        data: 0
    },
    (response) => {
        console.log(response)
    }
)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    console.log('Received Request: ' + message.operation);
    console.log(message.data)
    console.log('Sent By: ' + message.from);
    console.log(sender)

    sendResponse("Received by content script")
})

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

window.addEventListener("message", (event) => {
    // We only accept messages from ourselves
    if (event.source != window) {
      return;
    }

    console.log("Inside CD: " + JSON.stringify(event));

    switch(event.data.type) {
        case 'CONNECT_REQUEST': {
            chrome.runtime.sendMessage({operation: "get-account"}, function(response) {
                window.postMessage({ type: "CONNECT_RESPONSE", value: response}, "*");
            });
        }
        break;
        default: {
            console.log('UNKNOWN REQUEST RECEIVED BY CS');
            console.log(event.data);
        }
    }
}, false);

// window.cool = 'coolx';