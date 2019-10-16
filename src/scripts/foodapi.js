// debugger
// variable to hold data to be passed to dom
const foodStuffContainer = document.querySelector(".foodList");
// function to create sections inside container that goes to dom
function foodFactory(food) {
    console.log("test test", food);
    return `
    <div>
        <section class="foodTitle">${food.name}</section>
        <section class="foodEthnicity">${food.ethnicity}</section>
        <section class="foodCategory">${food.category}</section>
        <section class="barcode">${food.barcode}</section>
        <section class="ingredients">${food.ingredients}</section>
        <section class="countriesOrigin">${food.countries}</section>
    </div>
`
}
// function to add containers to dom
function addFoodToDom(stuff) {
    foodStuffContainer.innerHTML += stuff
}
// fetch command to get info from json server and turn into javascript to be usable
fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        // console.table(parsedFoods);
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // console.log(productInfo);
                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                        console.log("country test", food.countries);
                    } else {
                        food.countries = "no country listed"
                    }
                }).then(() => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // console.log("looking for info", productInfo);
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }
                    const foodAsHTML = foodFactory(food);
                    // console.log("my test", foodAsHTML);
                    addFoodToDom(foodAsHTML);
                })
        })})
    });



