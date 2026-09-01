// -------------------------
// SCORE TRACKING
// -------------------------
let score = 0;

// -------------------------
// SLIDE SETUP
// -------------------------
const slides = document.querySelectorAll(".quiz-slide");
let currentSlide = 0;

function showSlide(index) {
	slides.forEach(slide => slide.classList.remove("active"));
	slides[index].classList.add("active");
}

// Show first slide
showSlide(currentSlide);

// -------------------------
// FEEDBACK DATA (explanations + hints)
// -------------------------
const feedbackData = {
	1: {
		correct: "Correct! APIs let programs talk to each other.",
		wrong: {
			"It stores data in a database.": "Databases store data — APIs communicate.",
			"It formats text into JSON.": "JSON is a format, not the purpose of an API."
		},
	},
	2: {
		correct: "Correct! JSON has strict formatting rules.",
		wrong: {
			"It can only store numbers.": "JSON stores strings, booleans, arrays, objects, and numbers.",
			"It only works inside browsers.": "JSON works everywhere, not just browsers."
		},
		
	},
	3: {
		correct: "Correct! 200 means the request succeeded.",
		wrong: {
			"The API key is invalid.": "Invalid keys give 401 or 403.",
			"The server is offline.": "Offline servers give 500 or connection errors."
		},
		
	},
	4: {
		correct: "Correct! Headers carry extra info with the request.",
		wrong: {
			"A type of API error.": "Headers are metadata, not errors.",
			"The first line of a JSON file.": "JSON doesn’t have headers."
		},
		
	},
	5: {
		correct: "Correct! API keys identify who is making the API request.",
		wrong: {
			"Formatting URLs.": "URLs don’t need API keys to be formatted.",
			"Encrypting JSON.": "Encryption is separate from API keys."
		},
	},
	6: {
		correct: "Correct! Parameters are variables in the function definition.",
		wrong: {
			"A JavaScript error.": "Parameters are part of normal function syntax.",
			"The value passed into a function.": "That’s the argument."
		},
	},
	7: {
		correct: "Correct! Arguments are the actual values you pass in.",
		wrong: {
			"A JSON property.": "JSON properties have nothing to do with function calls.",
			"A variable created inside a function.": "That’s a local variable."
		},
	},
	8: {
		correct: "Correct! JavaScript returns undefined when something doesn’t exist.",
		wrong: {
			"0": "0 is a number, not a missing value.",
			"null": "null is an intentional empty value."
		},
	}
};

// -------------------------
// ANSWER BUTTON LOGIC
// -------------------------
slides.forEach((slide, index) => {
	const buttons = slide.querySelectorAll(".choice");
	const feedback = slide.querySelector(".feedback");
	
	buttons.forEach(button => {
		button.addEventListener("click", () => {
			const answer = button.textContent.trim();
			const isCorrect = button.dataset.answer === "correct";
			
			if (isCorrect) {
				score++;
				feedback.textContent = feedbackData[index + 1].correct + " " + feedbackData[index + 1].hint;
				feedback.style.color = "green";
				} else {
				const wrongMessage = feedbackData[index + 1].wrong[answer];
				feedback.textContent = wrongMessage + " " + feedbackData[index + 1].hint;
				feedback.style.color = "red";
			}
		});
	});
});

// -------------------------
// NEXT BUTTON LOGIC (fixed)
// -------------------------
const nextButtons = document.querySelectorAll(".next-btn");

nextButtons.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		
		// Move to next slide
		if (index < slides.length - 1) {
			currentSlide++;
			showSlide(currentSlide);
		}
		
		// If last question, show score card
		if (index === slides.length - 2) {
			const finalScoreText = document.querySelector(".final-score");
			finalScoreText.textContent =
			`You scored ${score} out of ${slides.length - 1}!`;
		}
	});
});

// -------------------------
// restart quiz
// -------------------------
const restartBtn = document.querySelector(".final-restart");

restartBtn.addEventListener("click", () => {
	score = 0;
	currentSlide = 0;
	
	// Clear feedback text
	slides.forEach(slide => {
		const feedback = slide.querySelector(".feedback");
		if (feedback) feedback.textContent = "";
	});
	
	showSlide(currentSlide);
});
