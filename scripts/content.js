// content.js

console.log('script fired!');

// fetch meta data
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'requestMetaData') {
    const data = {
    title: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    image: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    description: document.querySelector('meta[property="og:description"]')?.getAttribute('content')};
    
    console.log('meta tag data: ', data);
    sendResponse(data);
  }
});