// No changes needed in background.js for this approach
console.log("here is backgroundscript beta")
// chrome.runtime.onMessageExternal.addListner((request, sender, sendResponse) => {
//     console.log(request.openUrlInEditor)
//     console.log("Received message in background:");
//     sendResponse({ response: "Message received by the extension" });
//   });
// chrome.runtime.onInstalled.addListener(() => {
//     console.log("hii");
//     chrome.runtime.onMessageExternal.addListner((request, sender, sendResponse) => {
//         console.log(request.openUrlInEditor)
//         console.log("Received message in background:");
//         sendResponse({ response: "Message received by the extension" });
//       });
// });

// function handleMessage(message, sender) {
//     // check that the message is from "blue@mozilla.org"
//     console.log(sender.id)
//     console.log("hii or bye");
//   }
// chrome.runtime.onMessageExternal.addListener(handleMessage);
chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        console.log("inside the callback of background.js")
        fetch(request.openUrlInEditor, {
            method: 'GET',
          }).then(res => {
           
            return res.json();
          }).then(res => {
            console.log(res)
            console.log(res.ip)
            sendResponse(res);
          }).catch((err)=>{
            console.log("error bro",err);
          })
          
  });


 
  