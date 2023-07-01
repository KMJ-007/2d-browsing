let activeButton = document.getElementById('activateButton');


activeButton.addEventListener("click", async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
 
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setBorderColor,
    });
 });
 
 function setBorderColor() {
    
      document.querySelectorAll('div').forEach((element) => {
        element.style.border = "1px solid red";
      });
      

    
 }