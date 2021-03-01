let roundCategories = [];
let roundClues = [];

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
    assignClueIDs();
    pushClues();
}

// PUSH CLUES INTO ROUNDCLUES ARRAY
function pushClues() {
    for (var i in roundCategories) {
        for (var x in roundCategories[i].clues) {
            roundClues.push(roundCategories[i].clues[x]);
        }
    }
    console.log(roundClues);
}

// ASSIGN CLUE ID TO PROPER DIV ID ATTRIBUTE
function assignClueIDs() {
    for (var i in roundCategories) {
        let categoryClues = document.getElementsByClassName(`category-${i}-clue`);
        for (var x = 0; x < 5; x++) {
            categoryClues[x].setAttribute("id", roundCategories[i].clues[x].id);
            //console.log(categoryClues[x].id);
            //console.log(roundCategories[i].clues);
        }
        //console.log(categoryClues);
    }
}



let clueSpaces = document.querySelectorAll(".clue");
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let question = document.querySelector(".question");
let answerSpace = document.querySelector(".answer");
let hiddenAnswer;


// SHOW MODAL
function showModal() {
    //this.getClue();
    //console.log(this.getAttribute("id"));
    for (var i in roundClues) {
        if (this.getAttribute("id") == roundClues[i].id) {
            question.innerHTML = roundClues[i].question.toUpperCase();
            hiddenAnswer = roundClues[i].answer.toUpperCase();
        }
    }
    modal.style.display = "block";
    this.setAttribute("class", "clicked-clue");
    this.innerHTML = "";
    this.removeEventListener("click", showModal);
    console.log(hiddenAnswer);
}

// SHOW ANSWER
function showAnswer() {
    answerSpace.innerHTML = hiddenAnswer;
    answerSpace.classList.add("revealed");
}


for (var clueSpace of clueSpaces) {
    clueSpace.addEventListener("click", showModal);
}

closeButton.addEventListener("click", function() {
    modal.style.display = "none";
    answerSpace.classList.remove("revealed");
    answerSpace.innerHTML = "Click here to reveal answer."
})

answerSpace.addEventListener("click", showAnswer);


getCategories();