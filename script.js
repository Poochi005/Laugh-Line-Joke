// ======================================
// Laugh Line - AI Joke Generator
// ======================================

let historyList = [];
let currentCategory = "Any";

// ==========================
// Fetch Joke
// ==========================
async function getJoke() {

    const jokeText = document.getElementById("jokeText");
    const jokeCategory = document.getElementById("jokeCategory");

    jokeText.innerHTML = "😂 Loading joke...";

    try {

        const response = await fetch(
            `https://v2.jokeapi.dev/joke/${currentCategory}?type=single`
        );

        const data = await response.json();

        if (data.error) {
            jokeText.innerHTML = "Unable to load joke!";
            return;
        }

        jokeText.innerHTML = data.joke;
        jokeCategory.innerHTML = "Category : " + data.category;

        saveHistory(data.joke);

    } catch (error) {

        jokeText.innerHTML = "No Internet Connection!";

    }

}

// ==========================
// Category
// ==========================
function getCategory(category) {

    currentCategory = category;
    getJoke();

}

// ==========================
// Copy Joke
// ==========================
function copyJoke() {

    const joke = document.getElementById("jokeText").innerText;

    navigator.clipboard.writeText(joke);

    alert("✅ Joke Copied!");

}

// ==========================
// Share Joke
// ==========================
async function shareJoke() {

    const joke = document.getElementById("jokeText").innerText;

    if (navigator.share) {

        await navigator.share({

            title: "Laugh Line",

            text: joke

        });

    } else {

        alert("Sharing not supported in this browser.");

    }

}

// ==========================
// Save History
// ==========================
function saveHistory(joke) {

    historyList.unshift(joke);

    if (historyList.length > 8) {
        historyList.pop();
    }

    localStorage.setItem(
        "jokeHistory",
        JSON.stringify(historyList)
    );

    displayHistory();

}

// ==========================
// Display History
// ==========================
function displayHistory() {

    const history = document.getElementById("historyList");

    history.innerHTML = "";

    historyList.forEach((joke) => {

        const li = document.createElement("li");

        li.className = "list-group-item";

        li.innerHTML = joke;

        history.appendChild(li);

    });

}

// ==========================
// Load History
// ==========================
function loadHistory() {

    const saved = JSON.parse(
        localStorage.getItem("jokeHistory")
    );

    if (saved) {

        historyList = saved;

        displayHistory();

    }

}

// ==========================
// Dark Mode
// ==========================
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';

        localStorage.setItem("theme", "light");

    }

});

// ==========================
// Load Theme
// ==========================
function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';

    }

}

// ==========================
// Startup
// ==========================
window.onload = function() {

    loadTheme();

    loadHistory();

    getJoke();

};