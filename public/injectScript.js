class SolanaProvider {
    constructor() {
        this.account = null;
        this.extensionId = "hmfnhohaabdnnekdplaabepfcbgegdka";
    }

    connect() {
        console.log('Calling connect');
        window.postMessage({ type: "CONNECT_REQUEST" }, "*");
    }
}

window.addEventListener("message", (event) => {
    // We only accept messages from ourselves
    if (event.source != window) {
      return;
    }
    console.log('Inside IS: ' + JSON.stringify(event));

    switch(event.data.type) {
        case "CONNECT_RESPONSE": {
            window.solana2.account = event.data.value;
            alert(event.data.value);
        } 
        break;
        default: {
            console.log('UNKNOWN MESSAGE RECEIVED BY IS');
            console.log(event.data);
        }
    }
  
    // if (event.data.type && (event.data.type == "FROM_PAGE")) {
    //     console.log("Content script received: " + event.data.text);
    //     chrome.runtime.sendMessage(this.extensionId, {operation: "getAccount"}, function(response) {
    //         console.log('Connect Response');
    //         console.log(response);
    //     });
    // }
}, false);

window.solana2 = new SolanaProvider();

console.log(window.solana2);