let roundCategories = [];
let roundClues = [];

// RETRIEVE 6 RANDOM CATEGORIES FROM A RANDOM SET OF 100 
function getCategories() {
    let categoriesUrl = "https://jservice.io/api/categories?count=100&offset=" + (Math.floor(Math.random() * 18250));
    fetch(categoriesUrl).then(data => data.json()).then(categoriesList => {
        for (var i = 0; i < 6; i++) {
            let categoryIndex = Math.floor(Math.random() * categoriesList.length);
            let category = categoriesList[categoryIndex];
            categoriesList.splice(categoryIndex, 1);
            roundCategories.push(category);          
        }
        for (var clueSpace of clueSpaces) {
            clueSpace.addEventListener("click", showModal);
        }
        setCategories();
        getClues();       
    });
    document.querySelector(".start-button").setAttribute("disabled", "disabled");
}

// WRITE CATEGORIES TO CATEGORY BOARD SPACES
function setCategories() {
    let categorySpaces = document.getElementsByClassName("category");
    for (var i = 0; i < 6; i++) {
        categorySpaces[i].innerHTML = "<span>" + roundCategories[i].title.toUpperCase() + "</span>";
    }
}

// RETREIVE CLUES
async function getClues() {
    for (var i in roundCategories) {
        let url = "https://jservice.io/api/category?id=" + roundCategories[i].id;
        await fetch(url).then(data => data.json()).then(category => {
            roundCategories[i].clues = category.clues.slice(0, 5);
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
}

// ASSIGN CLUE ID TO PROPER DIV ID ATTRIBUTE
function assignClueIDs() {
    for (var i in roundCategories) {
        let categoryClues = document.getElementsByClassName(`category-${i}-clue`);
        for (var x = 0; x < 5; x++) {
            categoryClues[x].setAttribute("id", roundCategories[i].clues[x].id);
        }
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
}

// SHOW ANSWER
function showAnswer() {
    answerSpace.innerHTML = hiddenAnswer;
    answerSpace.classList.add("revealed");
}

closeButton.addEventListener("click", function() {
    modal.style.display = "none";
    answerSpace.innerHTML = "Click here to reveal answer."
    answerSpace.classList.remove("revealed");
})

answerSpace.addEventListener("click", showAnswer);
document.querySelector(".start-button").addEventListener("click", getCategories);

