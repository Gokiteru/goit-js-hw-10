import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const searchForm = document.querySelector('.breed-select');
const showInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
let numberBreeds = [];
searchForm.addEventListener('input', onSearch);

fetchBreeds()
  .then(data => {
    loader.hidden = true;
    searchForm.hidden = false;
    numberBreeds = data;

    for (let i = 0; i < numberBreeds.length; i += 1) {
      const breed = numberBreeds[i];
      let option = document.createElement('option');

      option.value = i;
      option.innerHTML = `${breed.name}`;
      searchForm.appendChild(option);
    }
  })
  .catch(function (error) {
    console.log(error);
    Notiflix.Notify.warning(
      'Oops! Something went wrong! Try reloading the page!'
    );
    clearHTML();
    return;
  });

function onSearch(evt) {
  const breedId = evt.currentTarget.value;
  loader.hidden = false;
  clearHTML();

  fetchCatByBreed(breedId)
  .then(data => {
    loader.hidden = true;
    numberBreeds = data;
    if (!numberBreeds[breedId].image) {
      Notiflix.Notify.warning(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw new Error(data.statusText);
    }
    const catCard = `<img src="${numberBreeds[breedId].image.url}" width="500 px" alt="cat image"><h2>${numberBreeds[breedId].name}</h2><p>${numberBreeds[breedId].description}</p>`;

    showInfo.innerHTML = catCard;
    showInfo.style.fontSize = '20px';
  })
  .catch(function (error) {
    console.log(error);
    clearHTML();
    return;
  });
}

function clearHTML() {
  showInfo.innerHTML = '';
}
