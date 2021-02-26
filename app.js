let roundCategories = [];

// RETRIEVE 6 RANDOM CATEGORIES FROM A RANDOM SET OF 100 
function getCategories() {
    let categoriesUrl = "http://jservice.io/api/categories?count=100&offset=" + (Math.floor(Math.random() * 18250));
    fetch(categoriesUrl).then(data => data.json()).then(categoriesList => {
        //console.log(categoriesList);
        for (var i = 0; i < 6; i++) {
            let categoryIndex = Math.floor(Math.random() * categoriesList.length);
            let category = categoriesList.pop(categoriesList[categoryIndex]);
            roundCategories.push(category);          
        }
        //console.log(roundCategories);
        setCategories();
        getClues();
    });
}

// WRITE CATEGORIES TO CATEGORY BOARD SPACES
function setCategories() {
    let categorySpaces = document.getElementsByClassName("category");
    for (var i = 0; i < 6; i++) {
        categorySpaces[i].innerHTML = roundCategories[i].title.toUpperCase();
    }
    //console.log(categorySpaces);
}




// RETREIVE CLUES
async function getClues() {
    /*let url = "http://jservice.io/api/category?id=" + roundCategories[0].id;
    fetch(url).then(data => data.json()).then(category => {
        roundCategories[0].clues = category.clues.slice(0, 5);
    })*/
    for (var i in roundCategories) {
        let url = "http://jservice.io/api/category?id=" + roundCategories[i].id;
        await fetch(url).then(data => data.json()).then(category => {
            roundCategories[i].clues = category.clues.slice(0, 5);
            //console.log(category);
        })
    }
    console.log(roundCategories);
}

getCategories();