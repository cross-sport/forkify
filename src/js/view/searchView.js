import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => (elements.searchInput.value = " ");
export const clearResult = () => {
  elements.serchResultList.innerHTML = " ";
  elements.serchResultPages.innerHTML = " ";
};
//active click
export const activeLinkStyle = (id) => {
  const resArr = [...document.querySelectorAll(".results__link")];
  resArr.map((el) => el.classList.remove("results__link--active"));

  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add("results__link--active");
};

const convertTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`; //join არის split ოპერატორის შემობრუნებული ვარიანტი
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = ` <li>
  <a class="results__link results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.image_url}">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${convertTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>`;

  elements.serchResultList.insertAdjacentHTML("beforeend", markup);
};

//buttons pagenition ფენჯინეიშენის მარქაფი

const createButton = (page, type) => {
  return `<button class="btn-inline results__btn--${type}" data-goto=${
    type == "prev" ? page - 1 : page + 1
  }>
            <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type == "prev" ? "left" : "right"
            }"></use>
        </svg>
        
</button>`;
};

const renderButton = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage); //მეტობით დამრგვალება
  let button;
  if (page === 1 && pages > 1) {
    //next button
    button = createButton(page, "next");
  } else if (page < pages) {
    //both button
    button = `
        ${createButton(page, "next")}
        ${createButton(page, "prev")}
        `;
  } else if (page == pages && page > 1) {
    //only prev
    button = createButton(page, "prev");
  }
  elements.serchResultPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResult = (recipes, page = 1, resPerPage = 5) => {
  const start = (page - 1) * resPerPage; //pagination თემით
  const end = page * resPerPage;
  recipes.slice(start, end).forEach((el) => renderRecipe(el));
  renderButton(page, recipes.length, resPerPage);
};
