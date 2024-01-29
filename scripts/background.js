// background.js

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'request-meta-data') {
    handleMetaDataRequest(sendResponse);
    return true;
  }
});

async function handleMetaDataRequest(sendResponse) {
  const activeTab = await queryActiveTab();
  if (activeTab) {
    await injectScript(activeTab.id);
    requestMetaData(activeTab.id, sendResponse);
  } else {
    console.error('No active tab found');
    sendResponse({error: 'Failed to find active tab'});
  }
};

function requestMetaData(tabId, sendResponse) {
  chrome.tabs.sendMessage(tabId, {type: 'fetch-meta-data'}, (response) => {
    sendResponse({data: response.data});
  });
}

function queryActiveTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length === 0) {
        reject("No active tab found.");
      } else {
        resolve(tabs[0]);
      }
    });
  });
}


async function injectScript(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: {tabId: tabId},
      files: ['scripts/content.js']
    });
    console.log('Script injected successfully!');
  } catch (error) {
    console.error('Script injection failed:', error);
  }
}