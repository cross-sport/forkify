import { elements } from "./base";
import { convertTitle } from "./searchView";

export const toggleLikeBtn = (isLiked) => {
  const iconStr = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${iconStr}`); // recipe__love - ის use ტეგში set atribut ანუ ამ ატრიბუტში href ატრიბუტში ვცვლი კონტენტს
};

export const toggleLikeMenu = (numLikes) => {
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

export const renderLike = (like) => {
  const markup = `
  <li>
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}" alt="${like.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${convertTitle(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
</li>
    
    `;
  elements.likesList.insertAdjacentHTML("beforeend", markup);
};

// delete UI ელემენტი

export const deleteLike = (id) => {
  const item = document.querySelector(`.likes__link[href="#${id}"]`);
  item.parentElement.removeChild(item); //item ს ვეძებთ კლასისი სახელის[href="#673463748"]  parentElement მშობელ ელემენტს ვეუბნებით removeChild(item) წაშაილოს შესაბამის შვილი რომელიცitemSi ვიპოვეთ
};
