class SolanaProvider {
    constructor() {
        this.account = null;
        this.extensionId = "hmfnhohaabdnnekdplaabepfcbgegdka";
    }

    connect() {
        window.dispatchEvent(
            new CustomEvent("getChromeData", {
                detail: { type: "CONNECT_REQUEST" },
            })
        );
    }
}

window.addEventListener(
    "getChromeData",
    function (data) {
        if (data.detail.type === "CONNECT_RESPONSE") {
            console.log("Connect Response Received (IS): ", data.detail);
        }
    },
    false
);

// var ChromeRequest = (function () {
//     var requestId = 0;

//     function getData(data) {
//         var id = requestId++;

//         return new Promise(function (resolve, reject) {
//             var listener = function (evt) {
//                 if (evt.detail.requestId == id) {
//                     // Deregister self
//                     window.removeEventListener("sendChromeData", listener);
//                     resolve(evt.detail.data);
//                 }
//             };

//             window.addEventListener("sendChromeData", listener);

//             var payload = { data: data, id: id };

//             window.dispatchEvent(new CustomEvent("getChromeData", { detail: payload }));
//         });
//     }

//     return { getData: getData };
// })();

// window.addEventListener(
//     "message",
//     (event) => {
//         // We only accept messages from ourselves
//         if (event.source != window) {
//             return;
//         }
//         console.log("Inside IS: " + JSON.stringify(event));

//         switch (event.data.type) {
//             case "CONNECT_RESPONSE":
//                 {
//                     window.solana2.account = event.data.value;
//                     alert(event.data.value);
//                 }
//                 break;
//             default: {
//                 console.log("UNKNOWN MESSAGE RECEIVED BY IS");
//                 console.log(event.data);
//             }
//         }

//         // if (event.data.type && (event.data.type == "FROM_PAGE")) {
//         //     console.log("Content script received: " + event.data.text);
//         //     chrome.runtime.sendMessage(this.extensionId, {operation: "getAccount"}, function(response) {
//         //         console.log('Connect Response');
//         //         console.log(response);
//         //     });
//         // }
//     },
//     false
// );

window.solana2 = new SolanaProvider();

console.log(window.solana2);
