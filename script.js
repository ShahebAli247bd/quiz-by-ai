const quizData = {
  categories: [
    {
      name: "Computer Fundamentals",
      questions: [
        {
          question: "What does CPU stand for?",
          options: ["Central Processing Unit", "Central Programming Unit", "Computer Personal Unit", "Central Personal Unit"],
          correct: 0
        },
        {
          question: "Which of the following is a peripheral device?",
          options: ["CPU", "Keyboard", "RAM", "Hard Disk"],
          correct: 1
        },
        {
          question: "What type of memory is volatile?",
          options: ["ROM", "SSD", "RAM", "HDD"],
          correct: 2
        },
        {
          question: "What does RAM stand for?",
          options: ["Random Access Memory", "Read Access Memory", "Ready Access Memory", "Random Active Memory"],
          correct: 0
        },
        {
          question: "Which of these is an input device?",
          options: ["Monitor", "Printer", "Mouse", "Speaker"],
          correct: 2
        },
        {
          question: "Which unit is responsible for all logical operations in a computer?",
          options: ["ALU", "CU", "CPU", "RAM"],
          correct: 0
        },
        {
          question: "What is the primary function of an operating system?",
          options: ["Manage hardware", "Run applications", "Control memory", "All of the above"],
          correct: 3
        },
        {
          question: "What is the full form of HDD?",
          options: ["Hardware Device Disk", "Hard Drive Disk", "Hard Disk Drive", "High Definition Disk"],
          correct: 2
        },
        {
          question: "Which of these is not an example of an operating system?",
          options: ["Windows", "Linux", "Android", "MS Word"],
          correct: 3
        },
        {
          question: "What does BIOS stand for?",
          options: ["Basic Input Output System", "Binary Input Output System", "Built-in Operating System", "Basic Information Operating System"],
          correct: 0
        }
      ]
    },
    {
      name: "HTML & CSS Fundamentals",
      questions: [
        {
          question: "What does HTML stand for?",
          options: ["HyperText Markup Language", "Hyper Transfer Markup Language", "HyperTool Markup Language", "HyperText Management Language"],
          correct: 0
        },
        {
          question: "Which HTML tag is used to define an unordered list?",
          options: ["<ol>", "<ul>", "<li>", "<list>"],
          correct: 1
        },
        {
          question: "What does CSS stand for?",
          options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Cascading Script Sheets"],
          correct: 0
        },
        {
          question: "Which HTML element is used for the largest heading?",
          options: ["<h1>", "<h6>", "<header>", "<h5>"],
          correct: 0
        },
        {
          question: "What is the correct HTML element for inserting a line break?",
          options: ["<lb>", "<br>", "<break>", "<newline>"],
          correct: 1
        },
        {
          question: "How can you make text bold in HTML?",
          options: ["<strong>", "<b>", "<bold>", "Both <strong> and <b>"],
          correct: 3
        },
        {
          question: "Which CSS property is used to change the background color?",
          options: ["color", "bgcolor", "background-color", "background"],
          correct: 2
        },
        {
          question: "Which HTML tag is used to define a hyperlink?",
          options: ["<a>", "<link>", "<href>", "<hyperlink>"],
          correct: 0
        },
        {
          question: "Which CSS property controls the text size?",
          options: ["font-size", "text-style", "font-weight", "text-size"],
          correct: 0
        },
        {
          question: "How can you create a comment in HTML?",
          options: ["<!-- Comment -->", "// Comment", "/* Comment */", "' Comment"],
          correct: 0
        }
      ]
    }
  ]
};


let currentQuestionIndex = 0;
let currentCategory = null;
let score = 0;
let totalQuestions = 0;
let userData = {};
let answeredQuestions = [];

document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category-select");
  quizData.categories.forEach((category, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
});

// function startQuiz() {
//   // Collect user info
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;
//   const phone = document.getElementById("phone").value;

//   if (!name || !email || !phone) {
//     alert("Please fill all fields.");
//     return;
//   }

//   // Store user data
//   userData = { name, email, phone };

//   // Hide user info form and show quiz
//   document.getElementById("user-info-container").style.display = "none";
//   document.getElementById("quiz-container").style.display = "block";
// }

function loadQuestions() {
  const categorySelect = document.getElementById("category-select");

  if (!categorySelect.value) {
    alert("Please select a category.");
    return;
  }

  // Show buttons when category is selected
  document.getElementById("prev-btn").style.display = "inline-block";
  document.getElementById("next-btn").style.display = "inline-block";
  document.getElementById("submit-btn").style.display = "inline-block";

  currentCategory = quizData.categories[categorySelect.value];
  currentQuestionIndex = 0;
  score = 0;
  totalQuestions = currentCategory.questions.length;
  answeredQuestions = [];
  displayQuestion();
}

function displayQuestion() {
  const questionBox = document.getElementById("question");
  const answerOptions = document.getElementById("answer-options");
  const currentQuestion = currentCategory.questions[currentQuestionIndex];

  questionBox.textContent = currentQuestion.question;
  answerOptions.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;

    // Check if the answer is already selected from localStorage
    const storedAnswer = answeredQuestions[currentQuestionIndex];
    if (storedAnswer && storedAnswer.selectedAnswer === option) {
      li.classList.add("selected");
      document
        .querySelectorAll("#answer-options li")
        .forEach((li) => (li.onclick = null)); // Disable other options
    } else if (storedAnswer) {
      li.classList.add("disabled"); // Disable unselected answers
    }

    li.onclick = () => checkAnswer(index); // Allow answer selection
    answerOptions.appendChild(li);
  });

  updateButtons();
}

function checkAnswer(selectedIndex) {
  const currentQuestion = currentCategory.questions[currentQuestionIndex];
  const correctIndex = currentQuestion.correct; // Assuming `correct` holds the index of the correct answer

  // Disable all other answer options once one is selected
  document.querySelectorAll("#answer-options li").forEach((li, index) => {
    li.onclick = null; // Disable further clicks
    if (index !== selectedIndex) {
      li.classList.add("disabled"); // Add a disabled class for unselected options
    }
  });

  // Highlight the selected answer
  const selectedLi =
    document.querySelectorAll("#answer-options li")[selectedIndex];
  selectedLi.classList.add("selected"); // Add class to change color of selected answer

  // Check if the selected answer is correct
  const isCorrect = selectedIndex === correctIndex;

  // Store the answer and correctness in localStorage
  answeredQuestions[currentQuestionIndex] = {
    question: currentQuestion.question,
    selectedAnswerIndex: selectedIndex,
    selectedAnswer: currentQuestion.options[selectedIndex],
    correctAnswer: currentQuestion.options[correctIndex], // Store the correct answer
    isCorrect: isCorrect, // Boolean to track if the answer is correct
  };

  // Update the score if the answer is correct
  if (isCorrect) {
    score++;
  }

  // Store quiz progress in localStorage
  localStorage.setItem(
    "quizProgress",
    JSON.stringify({
      userData,
      currentCategoryIndex: document.getElementById("category-select").value,
      currentQuestionIndex,
      answeredQuestions,
    })
  );
}

function nextQuestion() {
  if (currentQuestionIndex < currentCategory.questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

function updateButtons() {
  document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;
  document.getElementById("next-btn").disabled =
    currentQuestionIndex === currentCategory.questions.length - 1;
}

// Function to submit the quiz
function submitQuiz() {
  // Hide the quiz section
  document.getElementById("quiz-container").style.display = "none";

  // Show the result section
  showResult();

  // Store quiz data and personal info in localStorage
  storeQuizData();
}
function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  // Calculate percentage
  const percentage = (score / totalQuestions) * 100;

  // Get user data from localStorage or previously saved variable
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  // Display the result to the user
  const resultHeading = document.getElementById("result-heading");
  resultHeading.innerHTML = `
     <p>Name: ${storedUserData.name}</p>
     <p>Email: ${storedUserData.email}</p>
     <p>Phone: ${storedUserData.phone}</p>
     <h3>You scored ${score}/${totalQuestions} (${percentage.toFixed(2)}%)</h3>
 `;

  // Save the quiz result and user information in localStorage
  const resultData = {
    name: storedUserData.name,
    email: storedUserData.email,
    phone: storedUserData.phone,
    score: score,
    totalQuestions: totalQuestions,
    percentage: percentage.toFixed(2),
    answeredQuestions: answeredQuestions,
  };

  // Store result in localStorage
  localStorage.setItem("quizResult", JSON.stringify(resultData));

  // Optionally, generate the chart or any other post-result logic
  const ctx = document.getElementById("result-chart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Incorrect"],
      datasets: [
        {
          data: [score, totalQuestions - score],
          backgroundColor: ["#4CAF50", "#f44336"],
        },
      ],
    },
  });
}

function viewExistingResult() {
  // Retrieve the quiz result and user data from localStorage
  const resultData = JSON.parse(localStorage.getItem("quizResult"));

  // Check if there is any result saved in localStorage
  if (resultData) {
    // Hide all other sections on the page
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("user-info-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    // Display the stored user information and quiz result
    const resultHeading = document.getElementById("result-heading");
    resultHeading.innerHTML = `
         <p>Name: ${resultData.name}</p>
         <p>Email: ${resultData.email}</p>
         <p>Phone: ${resultData.phone}</p>
         <h3>You scored ${resultData.score}/${resultData.totalQuestions} (${resultData.percentage}%)</h3>
     `;

    // Optionally, regenerate the chart using the stored result
    const ctx = document.getElementById("result-chart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            data: [
              resultData.score,
              resultData.totalQuestions - resultData.score,
            ],
            backgroundColor: ["#4CAF50", "#f44336"],
          },
        ],
      },
    });

    // Show the "Back" button to go back to the personalization page
    const backButton = document.getElementById("back-btn");
    backButton.style.display = "block"; // Make the back button visible
  } else {
    // If no result is found, alert the user
    alert("No previous result found. Please complete a quiz first.");
  }
}
function clearResult() {
  // Remove the result from localStorage
  localStorage.removeItem("quizResult");
  alert("Previous result has been cleared. You can now take the quiz again.");
}

// Function to store quiz data in localStorage
function storeQuizData() {
  const quizDataToStore = {
    userInfo: userData,
    score: score,
    totalQuestions: totalQuestions,
    percentage: (score / totalQuestions) * 100,
    answeredQuestions: answeredQuestions,
  };

  // Store the data in localStorage
  localStorage.setItem("quizResult", JSON.stringify(quizDataToStore));
}
function downloadJPG() {
  const resultSection = document.getElementById("result-container");

  // Use html2canvas to capture the result section as an image
  html2canvas(resultSection).then(function (canvas) {
    // Convert the canvas to a JPG image
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 1.0); // Convert to JPG with 100% quality
    link.download = "quiz_result.jpg"; // Set the file name for the download

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function exportToExcel() {
  const rows = [
    [
      "Name",
      "Email",
      "Phone",
      "Question",
      "Your Answer",
      "Correct Answer",
      "Is Correct",
    ],
    ...answeredQuestions.map((q) => [
      userData.name,
      userData.email,
      userData.phone,
      q.question,
      q.selectedAnswer,
      q.correctAnswer,
      q.isCorrect ? "Yes" : "No",
    ]),
  ];

  let csvContent =
    "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${userData.name}_quiz_results.csv`);
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
}

function checkIPParticipation() {
  const storedIP = localStorage.getItem("quizIP");

  // Simulate the user's IP (in a real application, this would come from a server-side API)
  const userIP = "user-ip-address"; // Placeholder for user IP address

  // Check if the user has already taken the quiz from the same IP
  if (storedIP && storedIP === userIP) {
    alert("You have already participated in this quiz from this IP address.");
    return false; // Block further participation
  }

  // Store the user's IP in localStorage
  localStorage.setItem("quizIP", userIP);
  return true;
}

function startQuiz() {
 
  let getUserData = JSON.parse(localStorage.getItem("userData")) || {}
  if(getUserData.name || getUserData.email || getUserData==phone){
      // Ensure the user has not already participated
      if (!checkIPParticipation()) {
        return; // Stop the quiz if the user has already participated
      }
  }
  // Collect user info
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!name || !email || !phone) {
    alert("Please fill all fields.");
    return;
  } 

  // Store user data
  userData = { name, email, phone };
  localStorage.setItem("userData", JSON.stringify(userData));


  
  // Hide user info form and show quiz
  document.getElementById("user-info-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
}

/**
 * capture screenshot and send mail
 */
function captureScreenshotAndOpenGmail() {
  const resultSection = document.getElementById("result-container");

  // Capture the screenshot of the result section
  html2canvas(resultSection).then(function (canvas) {
    // Convert the canvas to a data URL (base64 image)
    const screenshotDataURL = canvas.toDataURL("image/png");

    // Display the image in a new window (so the user can download it manually)
    const newWindow = window.open();
    newWindow.document.write(
      '<img src="' +
        screenshotDataURL +
        '" alt="Quiz Result Screenshot" style="width:410px" width="410" />'
    );
    newWindow.document.title = "Quiz Result Screenshot - Right-click to Save";

    // Now prepare the pre-filled email link userData.email
    const email = "shahebali247bd@gmail.com";
    const subject = encodeURIComponent("My Quiz Results");
    const body = encodeURIComponent(
      `Hi LearnWithShaheb,\n\nHere is My quiz results:\n` +
        `- Score: ${score}/${totalQuestions} (${(
          (score / totalQuestions) *
          100
        ).toFixed(2)}%)\n` +
        `\n\nPlease find the result screenshot attached.`
    );

    // Open Gmail with pre-filled TO, Subject, and Body fields
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailLink, "_blank");
  });
}
