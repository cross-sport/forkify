// Global app controller
import Search from "./models/Search";
import { clearLoader, elements, renderLoader } from "./view/base"; // import დესტრუქტურიზაციის ხასიათით
import * as searchView from "./view/searchView"; //import

const state = {};
window.state = state;

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.serchResultList);

    state.search = new Search(query);
    await state.search.getResults();

    clearLoader();

    searchView.renderResult(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.serchResultPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline"); //onclick ზე დაჭერისას მის უახლოეს კლასს უყურებს რადგან .btn-inlinea ამუშავდება და რაც data-goto ში იქნება იმას წაოიღებს
  if (btn) {
    const goToPage = +btn.dataset.goto;
    searchView.clearResult();
    searchView.renderResult(state.search.result, goToPage);
  }
});
