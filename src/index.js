import mainRender from './templates/render_html.hbs';
import fotoCardsTpl from './templates/foto_cards.hbs';
import bigFotoTpl from './templates/bigImage.hbs';
import './styles.css';
import ApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import * as basicLightbox from 'basiclightbox';

const bodyRef = document.querySelector('body');
bodyRef.insertAdjacentHTML('afterbegin', mainRender());

const refs = {
  searchForm: document.querySelector('#search-form'),
  hitsContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;

  if (apiService.query === '') {
    return alert('Ведите что вы хотите найти');
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearHitsContainer();
  fetchHits();
}

async function fetchHits(e) {
  loadMoreBtn.disable();
  const result = await apiService.fetchHits();
  appendHitsMarkup(result);
  window.scrollTo({
    top: Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    ) - (window.innerWidth * 0.85),
    left: 0,
    behavior: 'smooth',
  });
  loadMoreBtn.enable();
}

function appendHitsMarkup(hits) {
  refs.hitsContainer.insertAdjacentHTML('beforeend', fotoCardsTpl(hits));
}

function clearHitsContainer() {
  refs.hitsContainer.innerHTML = '';
}
