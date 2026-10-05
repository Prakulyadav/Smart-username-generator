// ========================================
// SMART USERNAME GENERATOR
// FRONTEND INTERACTIONS
// ========================================


// ========================================
// SMART USERNAME GENERATOR
// FRONTEND LOGIC
// ========================================


// ========================================
// 1. START BUTTON → SCROLL TO FORM
// ========================================

console.log("SCRIPT.JS IS WORKING!");
const startBtn = document.getElementById("startBtn");
const generatorSection = document.getElementById("generator");

startBtn.addEventListener("click", () => {
    generatorSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// ========================================
// 2. FORM ELEMENTS
// ========================================

const form = document.getElementById("generatorForm");

const nameInput = document.getElementById("name");
const cityInput = document.getElementById("city");
const dobInput = document.getElementById("dob");
const wordInput = document.getElementById("word");


// ========================================
// 3. RESULT ELEMENTS
// ========================================

const previewUsername = document.getElementById("previewUsername");

const usernameResult = document.getElementById("usernameResult");
const passwordResult = document.getElementById("passwordResult");

const firstCharacter = document.getElementById("firstCharacter");
const lastCharacter = document.getElementById("lastCharacter");
const nameLength = document.getElementById("nameLength");
const reversedName = document.getElementById("reversedName");
const lastDigits = document.getElementById("lastDigits");
const aInName = document.getElementById("aInName");

const resultsSection = document.getElementById("results");


// ========================================
// 4. FORM SUBMISSION
// ========================================

form.addEventListener("submit", async (event) => {

    // Stop page from refreshing
    event.preventDefault();


    // Get user input
    const name = nameInput.value;
    const city = cityInput.value;
    const dob = dobInput.value;
    const favouriteWord = wordInput.value;


    // Show loading state
    const generateButton = form.querySelector(".generate-btn");

    generateButton.innerHTML = `
        <span>ANALYZING...</span>
        <span>◌</span>
    `;

    generateButton.disabled = true;


    try {

        // Send data to Python Flask
        const response = await fetch("/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                city: city,
                dob: dob,
                favourite_word: favouriteWord
            })

        });


        // Convert Flask response to JSON
        const data = await response.json();


        // ========================================
        // DISPLAY RESULTS
        // ========================================

        usernameResult.textContent = data.username;
        passwordResult.textContent = data.password;

        previewUsername.textContent = data.username;


        // Python analysis

        firstCharacter.textContent = data.first_character;
        lastCharacter.textContent = data.last_character;
        nameLength.textContent = data.name_length;
        reversedName.textContent = data.reversed_name;
        lastDigits.textContent = data.last_two_digits;

        aInName.textContent = data.a_in_name;


        // Scroll to results

        setTimeout(() => {

            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 300);


    } catch (error) {

        console.error("Error:", error);

        alert(
            "Something went wrong while connecting to the Python server."
        );

    }


    // Restore button

    generateButton.innerHTML = `
        <span>GENERATE IDENTITY</span>
        <span>→</span>
    `;

    generateButton.disabled = false;

});


// ========================================
// 5. COPY BUTTONS
// ========================================

const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const targetId = button.dataset.copy;

        const text = document.getElementById(targetId).textContent;

        await navigator.clipboard.writeText(text);

        const originalText = button.textContent;

        button.textContent = "COPIED ✓";

        setTimeout(() => {
            button.textContent = originalText;
        }, 1500);

    });

});