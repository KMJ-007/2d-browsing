(async function main() {
    console.log("hello");
    document.body.innerHTML = "";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "row";
    const mainPageIframe = await createFrameOrReplace(window.location.href, document.body);
    injectEventListenerInIframe(mainPageIframe.contentWindow|| mainPageIframe.contentWindow.document);
  })();
  
  async function createFrameOrReplace(url, parentElement) {
    const iframe = document.createElement("iframe");
    const iframeCount = document.querySelectorAll("iframe").length;
  
    iframe.id = `iframe-${iframeCount + 1}`;
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "none";
    iframe.src = url;
    iframe.className = "iframeContainer";
  
    parentElement.appendChild(iframe);
  
    return new Promise((resolve) => {
      iframe.addEventListener("load", () => {
        resolve(iframe);
      });
    });
  }
  
  function injectEventListenerInIframe(iframeWindow) {
    const iframeDocument = iframeWindow.document;
    iframeDocument.body.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        event.preventDefault();
        const linkUrl = event.target.href;
        const iframeId = getIframeIdFromAnchor(event.target);
        console.log(iframeId);
        // because it was blocking some interaction for iframe
        window.parent.postMessage({ type: "navigate", url: linkUrl, iframeId: iframeId }, "*");
      }
    });
  }
  
  function getIframeIdFromAnchor(anchorElement) {
    console.log(document);
    const iframes = document.getElementsByTagName("iframe");
    for (let i = 0; i < iframes.length; i++) {
        
        let iframe = iframes[i];
        let iframeDocument = iframe.contentDocument || iframe.contentWindow.document

        if (iframeDocument.contains(anchorElement)) {
            return iframe.id;
        }
    }
    return null;
  }
  
  
  
  
  
  async function openPage(url, iframeId) {
    const allIframes = document.querySelectorAll(".iframeContainer");
    const currentIframeIndex = Array.from(allIframes).findIndex((iframe) => iframe.id === iframeId);
    console.log("inside open page");
    console.log(currentIframeIndex,currentIframeIndex >= 0 && currentIframeIndex < allIframes.length - 1)
    let newIframe;
    if (currentIframeIndex >= 0 && currentIframeIndex < allIframes.length - 1) {
      // Replace subsequent iframes
      const parentDiv = allIframes[currentIframeIndex].parentElement;
      const nextSiblings = Array.from(allIframes).slice(currentIframeIndex + 1);
  
      nextSiblings.forEach((sibling) => {
        parentDiv.removeChild(sibling);
      });
  
      newIframe = await createFrameOrReplace(url, parentDiv);
    } else {
      // Append the new iframe
      newIframe =  await createFrameOrReplace(url, document.body);
    }
    console.log(newIframe)
    injectEventListenerInIframe(newIframe.contentWindow || newIframe.contentWindow.document)
  }
  
  function fixTheStyle() {
    const allIframes = document.querySelectorAll("iframe");
    const iframeCount = allIframes.length;
    const iframeWidthPercentage = 100 / iframeCount;
  
    allIframes.forEach((iframe, index) => {
      iframe.style.height = "100vh";
      iframe.style.width = `${iframeWidthPercentage}%`;
      iframe.style.left = `${index * iframeWidthPercentage}%`;
      iframe.style.border = "none";
      iframe.style.zIndex = "999999";
      iframe.style.overflowX = "auto";
      iframe.style.scrollBehavior = "smooth";
    });
  
    const firstIframe = allIframes[0];
    firstIframe.style.width = "20%";
    firstIframe.style.left = "0";
  }
  
  window.addEventListener("message", (event) => {
    console.log({ event });
    if (event.data.type === "navigate") {
      const { url, iframeId } = event.data;
      openPage(url, iframeId);
    }
  });
  