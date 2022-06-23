// My javaScript code here
// API URL
const baseURL = "https://www.themealdb.com/api/json/v1/1/random.php";
const generateMealBtn = document.getElementById("generateBtn");
const mealTitle = document.getElementById("title");
const instructions = document.getElementById("instructions");
const category = document.getElementById("category");
const area = document.getElementById("area");
const tags = document.getElementById("tags");
const image = document.querySelector(".img-fluid");
const embedVideo = document.getElementById("recipeVideo");
const list = document.getElementById("list");

generateMealBtn.addEventListener("click", () => {
  getMeal();
});

// function get the random meal
const getMeal = () => {
  fetch(baseURL)
    .then((res) => res.json())
    .then((resData) => {
      displayMeal(resData.meals[0]);
    })
    .catch((error) => {
      console.log(error);
    });
};

const displayMeal = (mealObj) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (mealObj[`strIngredient${i}`]) {
      ingredients.push(
        `${mealObj[`strIngredient${i}`]} - ${mealObj[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  mealTitle.innerText = mealObj.strMeal;
  instructions.innerText = mealObj.strInstructions;
  category.innerText = mealObj.strCategory;
  area.innerText = mealObj.strArea;
  tags.innerText = mealObj.strTags?.split(",").join(", ");
  image.src = mealObj.strMealThumb;
  embedVideo.src = `https://www.youtube.com/embed/${mealObj.strYoutube.slice(
    -11
  )}`;

  //   iterate through the array and return string
  list.innerHTML = `${ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("")}`;
};
