import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


const selectBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

fetchBreeds()
  .then(data => {
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = '😸 Select a cat breed 😸';
    selectBreed.appendChild(placeholderOption);

    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      option.placeholder = 'Select breed';
      selectBreed.appendChild(option);
    });
  })
  .catch(err => console.log(err));

const onSelectClick = event => {
  const breedId = event.target.value;
  selectBreed.value = '';
  loader.style.display = 'block';
  fetchCatByBreed(breedId)
    .then(data => createMarkup(data))
    .catch(err => console.log(err));
};

selectBreed.addEventListener('change', onSelectClick);

function createMarkup(data) {
  const imageUrl = data[0].url;
  const markup = data[0].breeds
    .map(breed => {
      return `<img class="breed-image" alt=${breed.name} src=${imageUrl}>
                        <div class="breed-container">
                        <h2 class="breed-name"> ${breed.name}</h2>
                        <p class="breed-temperament"> ${breed.temperament}</p>
                        <p class="breed-description"> ${breed.description}</p>
                    </div>`;
    })
    .join('');

  catInfo.innerHTML = markup;
  loader.style.display = 'none';
}
