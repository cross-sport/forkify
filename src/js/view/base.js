export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  serchResultList: document.querySelector(".results__list"),
  serchResultPages: document.querySelector(".results__pages"),
  Recipe: document.querySelector(".recipe"),
  shopping: document.querySelector(".shopping__list"),
  likesList: document.querySelector(".likes__list"),
  likesMenu: document.querySelector(".likes__field"),

  // serving: document.querySelector(".recipe__info-data--people"),
};

export const renderLoader = (parent) => {
  const loader = `
    <div class="loader">
  <svg>
    <use href="img/icons.svg#icon-cw"></use>
  </svg>
</div>`;

  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(".loader");
  loader && loader.parentElement.removeChild(loader);
};
