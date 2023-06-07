export default function fetchBreeds() {
  const BASE_URL = `https://api.thecatapi.com/v1/breeds`;
  const apiKey =
    'live_rXLydfuFknLtFmsT7yOyvmJmKPAAJhlYuZOnndTITcIciYTjG3C0CtUEiJT8eQiq';
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
}
