import { elements } from "./base";
import { Fraction } from "fractional"; //npm fraction 0.5->1/2 აბრუნებს დოკუმენტაცია npm ზე
// var Fraction = require("fractional").Fraction;  ესეც სწორია

export const clearRecipe = () => (elements.Recipe.innerHTML = "");

const formatCount = (count) => {
  //count= 2.5 --> 2 1/2
  //count= 0.5 -->  1/2
  //count= 2 --> 2

  if (count) {
    const [int, dec] = count
      .toString()
      .split(".")
      .map((el) => +el); // 2.5 -> '2.5' -> ['2', '5']-> [2 , 5]->  int=2 dec =5

    if (!dec) return count;

    if (int === 0) {
      const fr = new Fraction(count); //[0,5] -> 0 რადგანაა დარჩა წილადი 0.5 ამას fraction ერევა და გამოვა 1/2
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(count - int);
      return `${dec} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return "?";
};
const createIngredient = (ingredientArgs) => `
<li class="recipe__item">
<svg class="recipe__icon">
    <use href="img/icons.svg#icon-check"></use>
</svg>
<div class="recipe__count">${ingredientArgs.count}</div>
<div class="recipe__ingredient">
    <span class="recipe__unit">${ingredientArgs.unit}</span>
    ${ingredientArgs.ingredient}
</div>
</li>
`;

export const renderRecipe = (recipe, liked) => {
  const markup = `
<figure class="recipe__fig">
                <img src="${recipe.img}" alt="${
    recipe.title
  }" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      recipe.time
                    }</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.servings
                    }</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${
                          liked ? "" : "-outlined"
                        }"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">

                    ${recipe.ingredients
                      .map((el) => createIngredient(el))
                      .join("")}
                    
                </ul>

                <button class="btn-small recipe__btn recipe__btn_add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${
                      recipe.autthor
                    }</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${
                  recipe.url
                }" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
`;
  elements.Recipe.insertAdjacentHTML("afterbegin", markup);
};

export const updateServingsIngredients = (recipe) => {
  //update servings
  document.querySelector(".recipe__info-data--people").textContent =
    recipe.servings;

  //update ingredients
  // const countElements=Array.from(document.querySelectorAll(".recipe__count"))
  const countElements = [...document.querySelectorAll(".recipe__count")];
  countElements.forEach((el, index) => {
    el.textContent = formatCount(recipe.ingredients[index].count);
  });
};
