// sidePanel.js

document.getElementById("get-OG-data").addEventListener('click', () => {
  getWebPageData();
});

async function getWebPageData() {
  try {
    const response = await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({request: 'getMetaData'}, response => {
        console.log('early response from background: ', response);
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          console.log('resolve response: ', response);
          resolve(response);
        }
      });
    });
    displayMetaData(response);
  } catch (error) {
    console.error("Error fetching meta data: ", error.message);
  }
  return true;
}

function displayMetaData(metaDataWrapper) {
  console.log('argument: ', metaDataWrapper)
 const metaData = metaDataWrapper.metaData; // Access the nested metaData object
 console.log('Display meta data:', metaData);

 const title = document.createElement('h1');
 title.classList.add('card__title');
 title.textContent = metaData.title;
 console.log('title: ', title.textContent);

 const img = document.createElement('img');
 img.classList.add('card__img');
 img.src = metaData.image;
 console.log('img: ', img.src);

 const description = document.createElement('p');
 description.classList.add('card__description');
 description.textContent = metaData.description;
 console.log('description: ', description.textContent);

 const card = document.querySelector(".card");
 card.appendChild(title);
 card.appendChild(img);
 card.appendChild(description);
};