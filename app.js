// Import
// const fetch = require("node-fetch");


// Variable
let search_text = document.getElementById("search_text");
let search_btn = document.getElementById("search_btn");
let mainCard = document.getElementById("main");


// Event Listener
search_text.addEventListener("keypress", getSearchText);
search_btn.addEventListener("click", clickButton);


// Function
function getSearchText(event) {
    if (event.key === "Enter") {
        search_btn.click();
    }
};
function clickButton() {
    let _value = search_text.value;
    if (_value.trim()) {
        search_text.value = '';
        let childs = mainCard.children;
        if (childs) {
            [...childs].forEach(childd => {
                childd.remove();
            })
        };
        getMealData(_value.trim());

    }
    
};
function createCard(title, image) {
    let div = document.createElement("div");
    div.className = "card";
    let p = document.createElement("p");
    p.innerText = title;
    let img = document.createElement("img");
    img.src = image;
    // Add
    div.appendChild(p);
    div.appendChild(img);
    mainCard.appendChild(div);
}
async function getMealData(nameOfMeal) {
    try {
        let result = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" +nameOfMeal);
        let data = await result.json();
        let array = Object.entries(data)[0][1];
        array.forEach(value => {
            let _v =  value['strMeal'].length <= 24 ? value['strMeal']:value['strMeal'].slice(0, 24)+'...';
            createCard(_v, value['strMealThumb']);
        });

    } catch (error) {
        console.log(error);
    }
};
