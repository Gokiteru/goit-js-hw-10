const BASE_URL = `https://api.thecatapi.com/v1/breeds`;
const apiKey =
  'live_rXLydfuFknLtFmsT7yOyvmJmKPAAJhlYuZOnndTITcIciYTjG3C0CtUEiJT8eQiq';

export function fetchBreeds() {
  return fetch(BASE_URL, {
    headers: {
      'x-api-key': apiKey,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
};

export function fetchCatByBreed(breedId) {
  return fetch(BASE_URL, {
    headers: {
      'x-api-key': apiKey,
      breed_ids: breedId,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
  };