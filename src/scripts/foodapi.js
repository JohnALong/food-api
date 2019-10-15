fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods);
        parsedFoods.forEach(food => {
            console.log("food", food);
            console.log(food.name);
        }) 
        });
    