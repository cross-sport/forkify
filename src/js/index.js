// Global app controller
import List from "./models/List";
import Recipe from "./models/Recipe";
import Search from "./models/Search";
import Like from "./models/Like";
import { clearLoader, elements, renderLoader } from "./view/base"; // import დესტრუქტურიზაციის ხასიათით
// import { renderRecipe } from "./view/recipeView";
import * as recipeView from "./view/recipeView";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";
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
  const id = window.location.hash.replace("#", "");

  if (id) {
    //clear recipe
    recipeView.clearRecipe();
    renderLoader(elements.Recipe);
    //click recipe
    state.search && searchView.activeLinkStyle(id);
    //call api receive query
    state.recipe = new Recipe(id);
    await state.recipe.getRecipe();
    // ingredients in number -> count ,unit, ingredients
    state.recipe.parseIngredients();
    // calc time and serving პერსონა და დრო
    state.recipe.calcTime();
    state.recipe.calcServings();

    clearLoader(elements.Recipe);
    // renderRecipe(state.recipe);
    recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

//Shoping list

const controllerList = () => {
  // create new list if list do not created yeat
  if (!state.list) {
    state.list = new List();
  } else {
    state.list.clearList();
  }
  // cleare listView
  listView.clearShoppingList();
  //add each ingredients

  // console.log(state.list.length);
  // state.list.length > 0 ? (state.list = []) : null;
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItems(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.serchResultPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline"); //onclick ზე დაჭერისას მის უახლოეს კლასს უყურებს რადგან .btn-inlinea ამუშავდება და რაც htmlში searcheView.js data-goto ში იქნება იმას წაოიღებს
  if (btn) {
    const goToPage = +btn.dataset.goto;
    searchView.clearResult();
    searchView.renderResult(state.search.result, goToPage);
  }
});

//like list in reload
const reloadLikes = (like) => {
  like.forEach((el) => likesView.renderLike(el));
};

window.addEventListener("hashchange", () => {
  controlRecipe();
});

// ბრაუზერის რეფრეშის დროს ლოადერი
window.addEventListener("load", () => {
  state.likes = new Like();

  state.likes.readStorage();
  reloadLikes(state.likes.likes); // ლაიქების მასივს ვაწოდებ ფუნქციას state ში likes-> likes
  likesView.toggleLikeMenu(state.likes.getLikeNumber());
  controlRecipe();
});

//like list add თუ იდ არ არსებობს სტეითში მაშინ ვამატებთ ელემენტს

const controllerLike = () => {
  if (!state.likes) state.likes = new Like(); // list არ შეიძლება იყოს განსხვავებული კლასის სახელიდან
  const currentID = state.recipe.id;

  if (!state.likes.isLiked(currentID)) {
    //add likes to the state
    const newLike = state.likes.addLike(
      // const ით აღწერას იმიტო ვაკეტებთ რო რადგან like.js ში ეს ფუნქცია აბრუნებს იგივე პარამეტრებს სტეითში რო არ ვეძიოთ მერე ამას ავღწერთ ამ პარამეტრში და გამოვიყენებთ UI სთვის
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    // toggle button on
    likesView.toggleLikeBtn(true);

    //UI მხარეს გამოტანა
    likesView.renderLike(newLike);

    //like menu visible
    likesView.toggleLikeMenu(state.likes.getLikeNumber());
  } else {
    // თუ არსებობს ელემენტი წავშალოთ delete
    state.likes.deleteLike(currentID);

    // toggle button off
    likesView.toggleLikeBtn(false);

    // delete item
    likesView.deleteLike(currentID);

    //like menu visible
    likesView.toggleLikeMenu(state.likes.getLikeNumber());
  }
};

//+ - პერსონაზე ამუშავება

elements.Recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".recipe__btn_add, .recipe__btn_add *")) {
    controllerList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controllerLike();
  }
});

//shoping list delete update
elements.shopping.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    //delete in list
    state.list.deleteItem(id);
    // delete on UI
    listView.deleteItem(id);
  } else if (e.target.matches(".shopping__count, .shopping__count *")) {
    //update count
    const val = +e.target.value;
    state.list.updateCount(id, val);
  }
});
