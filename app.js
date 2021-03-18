// Import
// const fetch = require("node-fetch");


// Variable
let search_text = document.getElementById("search_text");
let search_btn = document.getElementById("search_btn");
let back_btn = document.getElementById("back_btn");
let mainCard = document.getElementById("main");
let sub_main = document.getElementById("sub_main");


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
    } else {
        alert("For Search You Need To Type!");
    }
    
};
function createCard(title, image, ...items) {
    let div = document.createElement("div");
    div.className = "card";
    let p = document.createElement("p");
    p.innerText = title;
    let img = document.createElement("img");
    img.src = image;
    // Add
    div.appendChild(p);
    div.appendChild(img);    
    // Event Listener
    div.addEventListener("click", divClick.bind(title, image, ...items));
    // Add
    mainCard.appendChild(div);
};
function divClick(title, image, ...items) {
    mainCard.style.display = "none";
    sub_main.style.display = "flex";
    // sub main
    let div1 = document.createElement("div")
    div1.className = "card";
    let p1 = document.createElement("p")
    p1.innerText = image;
    let img1 = document.createElement("img")
    img1.src = title;
    let ul1 = document.createElement("ul");
    // Travarsing
    let _item = [...items].slice(0, 6);
    _item.forEach(value => {
        let li1 = document.createElement("li");
        li1.innerText= value;
        ul1.appendChild(li1)
    });
    div1.appendChild(p1);
    div1.appendChild(img1);
    div1.appendChild(ul1);
    sub_main.appendChild(div1);
        
    back_btn.addEventListener("click", () => {
        mainCard.style.display = "block";
        mainCard.style.display = "flex";
        sub_main.style.display = "none";
        div1.remove();
    });
};


async function getMealData(nameOfMeal) {
    try {
        let result = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" +nameOfMeal);
        let data = await result.json();
        let array = Object.entries(data)[0][1];
        array.forEach(value => {
            let _v =  value['strMeal'].length <= 24 ? value['strMeal']:value['strMeal'].slice(0, 24)+'...';
            createCard(_v, value['strMealThumb'], value['strIngredient1'], value['strIngredient2'], value['strIngredient3'], value['strIngredient4'], value['strIngredient5'], value['strIngredient6'], value['strIngredient7']);
        });

    } catch (error) {
        alert("We Have Nothing To Show You!")
        console.log(error);
    }
};
