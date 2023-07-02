(async function main() {
    console.log("hello");
    // First, create the main page iframe
    document.body.innerHTML = ''; 
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'row';
    const mainPageIframe = createFrame(window.location.href);
    mainPageIframe.id = "iframe-1";
    // remove all the elements and replace the body with the page frame
    // Inject event listener into the main page iframe
    injectEventListenerInIframe(mainPageIframe.contentWindow);
  
  })();
  
  function createFrame(url) {
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
      iframeDocument.body.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            console.log(event.target.href);
            event.preventDefault()
            openPage(event.target.href)
          }
      });
    });
  }
  
  function openPage(url) {
    const iframe = createFrame(url);
    const allIframes = document.querySelectorAll('iframe');
    // mainPageIframe.id = `iframe-${allIframes.length}`;
    injectEventListenerInIframe(iframe.contentWindow);
    fixTheStyle();
  }
  
  function fixTheStyle() {
    const allIframes = document.querySelectorAll('iframe');
    const iframeCount = allIframes.length;

    
  }
  