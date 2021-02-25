function getCategories() {
    let categoriesUrl = "http://jservice.io/api/categories?count=100&offset=" + (Math.floor(Math.random() * 18250));
    roundCategories = [];
    fetch(categoriesUrl).then(data => data.json()).then(categoriesList => {
        for (var i = 0; i < 6; i++) {
            let categoryIndex = Math.floor(Math.random() * categoriesList.length);
            let category = categoriesList.pop(categoriesList
                [categoryIndex])
            roundCategories.push(category);
            
        }
        console.log(roundCategories);
    });
}
