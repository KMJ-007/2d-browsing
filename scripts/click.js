(async function main() {
    console.log("hello");
    // First, create the main page iframe
    const mainPageIframe = createIframe(window.location.href);
    mainPageIframe.id = "page-1";
  
    // Inject event listener into the main page iframe
    injectEventListenerInIframe(mainPageIframe.contentWindow);
  
  })();
  
  function createIframe(url) {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    return iframe;
  }
  
  function injectEventListenerInIframe(iframeWindow) {
    iframeWindow.addEventListener('DOMContentLoaded', () => {
      const iframeDocument = iframeWindow.document;
      console.log(iframeDocument);
      iframeDocument.body.addEventListener('click', () => {
        alert('Click inside iframe!');
      });
    });
  }
  
  
  function openPage(url) {
    const iframe = createIframe(url);
    fixTheStyle();
  }
  
  function fixTheStyle() {
    const allIframes = document.querySelectorAll('iframe');
    allIframes.forEach((iframe, index) => {
      iframe.style.width = "50%"; // Adjust the width as needed
      iframe.style.height = "100vh"; // Adjust the height as needed
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.right = `${index * 50}%`; // Adjust the positioning of iframes
      iframe.style.border = "none";
      iframe.style.zIndex = "999999";
    });
  }
  