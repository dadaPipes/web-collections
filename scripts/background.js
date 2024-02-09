// background.js

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
 if (message.request === 'getMetaData') {
    getCurrentTab()
      .then((currentTab) => {
        return requestMetaData(currentTab);
      })
      .then((metaData) => {
        console.log('metaData: ', metaData);
        sendResponse({ metaData });
      })
      .catch((error) => {
        console.error('Error handling meta data request: ', error);
        sendResponse({ error: error.message });
      });
    return true; // keep to send it async
 }
});

async function getCurrentTab() {
  return new Promise((resolve, reject) => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, tabs => {
      if (chrome.runtime.lastError) {
        reject(new Error('Error getting current tab: ' + chrome.runtime.lastError.message));
      } else if (tabs.length === 0) {
        reject(new Error('No active tab found'));
      } else {
        let [tab] = tabs;
        resolve(tab);
      }
    });
  }).catch(error => { console.error('An error occurred: ', error); });
}

async function requestMetaData(tab) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tab.id, {request: 'fetchMetaData'}, response => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
}


/*
// TODO: local storage expects a json to store the data
async function saveMetaData(metaData) {
  try {
    await chrome.storage.local.set({ key: metaData }).then(() => {
      // something
    });
  } catch (error) {
    console.error('Saving meta data failed: ', error);
  }
};
*/