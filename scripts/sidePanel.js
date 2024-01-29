// sidePanel.js

const getMetaDataBtn = document.getElementById("get-OG-data");
getMetaDataBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({
    type: 'request-meta-data'
  }, (response) => {
    const metaData = response.data;
    console.log('meta data: ', metaData);
    displayMetaData(metaData);
  });
});

function displayMetaData(metaData) {
  
  const card = document.querySelector(".card")

  const title = document.createElement('h1');
  title.classList.add('card__title');
  title.textContent = metaData.title;

  const img = document.createElement('img');
  img.classList.add('card__img');
  img.src = metaData.image;

  const description = document.createElement('p');
  description.classList.add('card__description');
  description.textContent = metaData.description;

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(description);
};