let roundCategories = [];

// FUNCTION TO RETRIEVE 6 RANDOM CATEGORIES FROM A RANDOM SET OF 100 
function getCategories() {
    let categoriesUrl = "http://jservice.io/api/categories?count=100&offset=" + (Math.floor(Math.random() * 18250));
    fetch(categoriesUrl).then(data => data.json()).then(categoriesList => {
        for (var i = 0; i < 6; i++) {
            let categoryIndex = Math.floor(Math.random() * categoriesList.length);
            let category = categoriesList.pop(categoriesList[categoryIndex])
            roundCategories.push(category.title);
            
        }
        console.log(roundCategories);
        setCategories();
    });
}

// WRITE CATEGORIES TO CATEGORY BOARD SPACES
function setCategories() {
    let categorySpaces = document.getElementsByClassName("category");
    for (var i = 0; i < 6; i++) {
        categorySpaces[i].innerHTML = roundCategories[i].toUpperCase();
    }
    console.log(categorySpaces);
}
getCategories();