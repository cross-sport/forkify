import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }
  parseIngredients() {
    const newIngredient = this.ingredients.map((el) => {
      const unitsLong = [
        "tablespoons",
        "tablespoon",
        "ounces",
        "ounce",
        "teaspoons",
        "teaspoon",
        "cups",
      ];
      const unitShort = ["tsp", "tsp", "tbsp", "tbsp", "oz", "oz", "cup"];
      const units = [...unitShort, "g", "kg", "pound"];

      //1 ინგრედიენტების ტექსტის დამოკლება მასივის ელემენტის მიხედვით
      let ingredient = el.toLowerCase();
      unitsLong.forEach((element, index) => {
        ingredient = ingredient.replace(element, unitShort[index]);
      });

      //2) ფრჩხილების წაშლა ჩანაწერში ()
      ingredient = ingredient.replace(/ *\(([^)]*)\) */g, " "); //regular expreshen -ით ფრჩხილებს ვაქრობთ და რაც შიგნით წერია მაგ (მაგალითად )

      //3) დავსპლიტოთ ტექსტი და ამოვიღოთ ქაუნთი და იუნითი

      const ingArr = ingredient.split(" ");

      const unitIndex = ingArr.findIndex((word) => units.includes(word));

      let objIng = {
        count: "",
        unit: "",
        ingredient: "",
      };
      if (unitIndex > -1) {
        const arrCount = ingArr.slice(0, unitIndex); //ამოჭრის 0 დან ინდექსამდე ანუ count da unit ['4','1/2']

        let count;
        if (arrCount.length === 1) {
          count = eval(arrCount[0]); //[4] |  [1/2]
        } else {
          count = eval(arrCount.join("+")); //[4,1/2]
        }
        objIng = {
          count,
          unit: ingArr[unitIndex],
          ingredient: ingArr.slice(unitIndex + 1).join(" "), // ინგრედიენტი დარჩება იუნიტის ინდექსს პლიუს ერთის შემდეგ ყველაფერი მითითება არ ჭირდება და ბოლომდე გაიტანს
        };
      } else if (+ingArr[0]) {
        // თუ იწყება რიცხვით პირდაპირ შევამოწმებთ 1 ელემენტი თუ რიცხვია თუ არ არის რიცხვი რადგან რიცხვში გადაგვყავს + ნიშნით გამოიტანს NAN ნან ბულენაში არის false
        objIng = {
          count: +ingArr[0],
          unit: " ",
          ingredient: ingArr.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        //თუ მინუს ერთია ინდეხქსი ესეგი არ მოიძებნა დამთხვევა units გ კგ ასშ , იმხოლოდ ინგრედიენტი გვაქ   და ხელით ვუთითებთ 1 , '' , და ინგრედიენტებს
        objIng = {
          count: 1,
          unit: " ",
          ingredient, // ingredient: ingredient, იგივეა
        };
      }
      return objIng;
    });
    this.ingredients = newIngredient;
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
  updateServings(type) {
    // servings
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    //ingredients

    this.ingredients.forEach((ing) => {
      ing.count *= newServings / this.servings;
    });
    this.servings = newServings;
  }
}
