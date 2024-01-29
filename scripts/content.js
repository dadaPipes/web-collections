// content.js

console.log('script fired!'); // see: web page console

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'fetch-meta-data') {
    const metaTagData = extractMetaData();
    sendResponse({data: metaTagData});
  }
});

function extractMetaData() {
  return {
    title: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    image: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    description: document.querySelector('meta[property="og:description"]')?.getAttribute('content')
  };
}