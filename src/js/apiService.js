const pixabayKey = '&key=21253776-b7abc1a0366653f5e4cb35362';
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchHits() {
    const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12${pixabayKey}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
