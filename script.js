const Questions = [
    {
        id: 0,
        q: "What country is known to have the best quality tap water?",
        a: [
            { text: "Switzerland", isCorrect: true },
            { text: "Canada", isCorrect: false },
            { text: "Norway", isCorrect: false },
            { text: "New Zealand", isCorrect: false }
        ]
    },
    {
        id: 1,
        q: "Where is the highest mountain in the world located?",
        a: [
            { text: "China", isCorrect: false },
            { text: "Singapore", isCorrect: false },
            { text: "Nepal", isCorrect: true },
            { text: "India", isCorrect: false }
        ]
    },
    {
        id: 2,
        q: "What is the capital of France? Choose one:",
        a: [
            { text: "Paris", isCorrect: true },
            { text: "Versailles", isCorrect: false },
            { text: "Marseille", isCorrect: false },
            { text: "Berlin", isCorrect: false }
        ]
    },
    {
        id: 3,
        q: "What iconic statue in the Financial District symbolizes confidence and optimism in finance?",
        a: [
            { text: "Raging Bull", isCorrect: false },
            { text: "Charging Bull", isCorrect: true },
            { text: "Strong Bull", isCorrect: false },
            { text: "Wall Street Bull", isCorrect: false }
        ]
    },
    {
        id: 4,
        q: "Which is the largest continent by land?",
        a: [
            { text: "Asia", isCorrect: true },
            { text: "Africa", isCorrect: false },
            { text: "Europe", isCorrect: false },
            { text: "North America", isCorrect: false }
        ]
    }
];

let start = true;
let currentQuestionIndex = 0;
let correctAnswers = 0;

function displayQuestion(questionIndex) {
    const question = document.getElementById("question");
    question.innerText = Questions[questionIndex].q;

    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.innerText = Questions[questionIndex].a[index].text;
        option.value = Questions[questionIndex].a[index].isCorrect;
        option.style.backgroundColor = "lightskyblue";
    });
}

function evaluateAnswer(selectedOption) {
    if (selectedOption === "true") {
        correctAnswers++;
    }
}

if (start) {
    displayQuestion(currentQuestionIndex);
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener("click", () => {
        document.querySelectorAll('.option').forEach(o => o.style.backgroundColor = "lightskyblue");
        option.style.backgroundColor = "lightgoldenrodyellow";
    });
});

document.querySelector('.evaluate').addEventListener("click", () => {
    const selectedOption = document.querySelector('.option[style*="lightgoldenrodyellow"]').value;
    evaluateAnswer(selectedOption);
    document.querySelector('.result').innerText = (selectedOption === "true") ? "True" : "False";
});

document.querySelector('.next').addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        displayQuestion(currentQuestionIndex);
        document.querySelector('.result').innerText = "";
    } else {
        start = false;
        endGame();
    }
});
function endGame() {
    const endMessage = document.getElementById("question");
    endMessage.innerText = `You got ${correctAnswers} answers correct. Thanks for playing!`;

    const options = document.querySelectorAll('.option');
    options.forEach(option => option.style.display = "none");

    const navigation = document.querySelector('.navigation');
    navigation.style.display = "none";

    // Create restart button
    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart Quiz";
    restartButton.style.backgroundColor = "blue"; // Set background color to blue
    restartButton.style.color = "white"; // Set text color to white
    restartButton.style.padding = "10px 20px"; // Set padding
    restartButton.style.border = "none"; // Remove border
    restartButton.style.borderRadius = "5px"; // Set border radius
    restartButton.style.boxShadow = "0px 0px 10px orange"; // Set box shadow
    restartButton.addEventListener("click", () => {
        currentQuestionIndex = 0;
        correctAnswers = 0;
        start = true;
        displayQuestion(currentQuestionIndex);
        endMessage.innerText = "";
        options.forEach(option => option.style.display = "block");
        navigation.style.display = "flex";
        // Remove the restart button from the DOM after it's clicked
        restartButton.remove();
    });

    // Append restart button after the end message
    endMessage.insertAdjacentElement("afterend", restartButton);
}
