export default class ApiService {
  constructor() {
    this.API_KEY = '23647546-0c9963079c4ed781ee6b1e575';
    this.BASE_URL = 'https://pixabay.com/api/';
  }

  async fetchImage(imageSearch, page) {
    const url = `${this.BASE_URL}?image_type=photo&orientation=horizontal&q=${imageSearch}&page=${page}&per_page=12&key=${this.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.hits;
  }
}
