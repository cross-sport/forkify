// Global app controller
import Recipe from "./models/Recipe";
import Search from "./models/Search";
import { clearLoader, elements, renderLoader } from "./view/base"; // import დესტრუქტურიზაციის ხასიათით
// import { renderRecipe } from "./view/recipeView";
import * as recipeView from "./view/recipeView";

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

//recipe

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", " ");

  if (id) {
    recipeView.clearRecipe();
    renderLoader(elements.Recipe);
    state.recipe = new Recipe(id);
    await state.recipe.getRecipe();
    clearLoader(elements.Recipe);
    // renderRecipe(state.recipe);
    recipeView.renderRecipe(state.recipe);
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

window.addEventListener("hashchange", () => {
  controlRecipe();
});
