document.getElementById('date').innerHTML = Date();
const idForm = document.getElementById('idForm');
const examContainer = document.getElementById('examContainer');
const validExamId = 'ICS111'; // Valid exam ID for this exam

const timerElement = document.getElementById('timer');
let timeLeft = 5400; // 90 minutes in seconds
let timer;
let canSubmit = true;
let examSubmitted = false; // Flag to indicate if the exam has been submitted

function toggleExamContainer() {
    document.getElementById('idForm').classList.add('d-none');
    document.getElementById('examContainer').classList.remove('d-none');
    document.getElementById('excel').classList.add('d-none');
    document.getElementById('wordprocessing').classList.remove('d-none');

    
};

function startExcel() {
    document.getElementById('idForm').classList.add('d-none');
    document.getElementById('examContainer').classList.remove('d-none');
    document.getElementById('excel').classList.remove('d-none');
    document.getElementById('wordprocessing').classList.add('d-none');
};

document.getElementById('startExcelButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior

    // Call the startExcel function
    startExcel();
});

function startPowerPoint() {
    document.getElementById('idForm').classList.add('d-none');
    document.getElementById('examContainer').classList.remove('d-none');
    document.getElementById('powerpoint').classList.remove('d-none');
    document.getElementById('excel').classList.add('d-none');
};

document.getElementById('startPowerPointButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior

    // Call the startExcel function
    startPowerPoint();
});

function startAccess() {
    document.getElementById('idForm').classList.add('d-none');
    document.getElementById('examContainer').classList.remove('d-none');
    document.getElementById('access').classList.remove('d-none');
    document.getElementById('powerpoint').classList.add('d-none');
};

document.getElementById('startAccessButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior

    // Call the startExcel function
    startAccess();
});

function startNetworking() {
    document.getElementById('idForm').classList.add('d-none');
    document.getElementById('examContainer').classList.remove('d-none');
    document.getElementById('networking').classList.remove('d-none');
    document.getElementById('access').classList.add('d-none');
}

document.getElementById('startNetworkingButton').addEventListener('click', function(event) {
    event.preventDefault();
    startNetworking();
});

// Rest of your existing JavaScript functions...

function startExam() {
    const idNumberInput = document.getElementById('idNumber');
    const idNumber = idNumberInput.value.trim();

    const fullNameInput = document.getElementById('fullName');
    const fullName = fullNameInput.value.trim();

    const examIdInput = document.getElementById('examId');
    const examId = examIdInput.value.trim();

    // Check if ID number and exam ID are entered
    if (idNumber === '' || examId === '' || fullName === '') {
        alert('Please enter your full Name, ID number, and the Exam ID to start the exam.');
        return;
    }

    // Check if the entered exam ID is valid
    if (examId !== validExamId) {
        alert('Invalid Exam ID. Please enter the correct Exam ID to access the exam.');
        return;
    }

    // Check if the student has ever submitted the current exam before
    const hasEverSubmitted = localStorage.getItem(`${idNumber}_${validExamId}`);
    if (hasEverSubmitted) {
        const examData = JSON.parse(hasEverSubmitted);
        if (examData.answered) {
            const previousScore = examData.score;
            const previousFullName = examData.fullName;
            const previousExamId = examData.examId;
            const previousStudentId = examData.studentId;
            alert(`You have attempted this exam and your score is: ${previousScore}`);
            alert(`Full Name: ${previousFullName}\nExam ID: ${previousExamId}\nStudent ID: ${previousStudentId}`);
            window.location.href = `score.html?score=${previousScore}`;
            return;
        }
    }

    // Hide the ID form and show the exam container
    toggleExamContainer();

    // If the timer was already running, do not start a new timer
    if (!timer) {
        // Check if the exam has been started before
        const remainingTime = localStorage.getItem(`${idNumber}_${validExamId}_time`);
        if (remainingTime) {
            timeLeft = Math.max(parseInt(remainingTime, 10), 0); // Ensure timeLeft is not negative
            // If timeLeft is 0, the exam has already ended, so submit the exam
            if (timeLeft === 0) {
                handleExamClosure();
                canSubmit = false;
                return;
            }
        }

        updateTimer();
    }

    // Display student ID at the top right corner of the exam page
    const studentIdDisplay = document.createElement('div');
    studentIdDisplay.id = 'studentIdDisplay';
    studentIdDisplay.textContent = `Student ID: ${idNumber}`;
    document.body.appendChild(studentIdDisplay);

    // Display full name  at the top left corner of the exam page
    const fullNameDisplay = document.createElement('div');
    fullNameDisplay.id = 'fullNameDisplay';
    fullNameDisplay.textContent = `Name: ${fullName}`;
    document.body.appendChild(fullNameDisplay);

    // Load saved exam data if available
    loadSavedExamData();
    
     /*Display student ID and full name just after the submit button
     const submitButton = document.getElementById('submitBtn');
     const studentInfoAfterSubmit = document.createElement('div');
    studentInfoAfterSubmit.textContent = `Student ID: ${idNumber}     Full Name: ${fullName}`;
    submitButton.parentNode.insertBefore(studentInfoAfterSubmit, submitButton.nextSibling);*/
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerElement.textContent = displayTime;

    if (timeLeft === 0 && canSubmit) {
        handleExamClosure();
        canSubmit = false;
    } else {
        timeLeft--;
        timer = setTimeout(updateTimer, 1000);
    }
}
 

function handleExamClosure() {
    // Save exam data when the time is up or when the student closes the exam
    saveExamData();
    gradeExam();
}


function saveExamData() {
    const idNumberInput = document.getElementById('idNumber');
    const idNumber = idNumberInput.value.trim();
    const form = document.getElementById('examForm');
    const formData = new FormData(form);
    const examData = {
        answered: true,
        answers: {},
        fullName: document.getElementById('fullName').value.trim(),
        examId: document.getElementById('examId').value.trim(),
        studentId: idNumber,
    };

    // Save the selected answers for each question
    for (const pair of formData.entries()) {
        const questionId = pair[0];
        const selectedAnswer = pair[1];
        examData.answers[questionId] = selectedAnswer;
    }

    localStorage.setItem(`${idNumber}_${validExamId}`, JSON.stringify(examData));
    localStorage.setItem(`${idNumber}_${validExamId}_time`, timeLeft.toString());
}


function loadSavedExamData() {
    const idNumberInput = document.getElementById('idNumber');
    const idNumber = idNumberInput.value.trim();

    // Retrieve saved exam data from localStorage
    const savedData = localStorage.getItem(`${idNumber}_${validExamId}`);
    if (savedData) {
        const examData = JSON.parse(savedData);

        // Restore the answered questions
        const form = document.getElementById('examForm');
        for (const questionId in examData.answers) {
            const selectedAnswer = examData.answers[questionId];
            const radioBtn = form.querySelector(`input[name="${questionId}"][value="${selectedAnswer}"]`);
            if (radioBtn) {
                radioBtn.checked = true;
            }
        }
    }
}

function gradeExam() {
    const form = document.getElementById('examForm');
    const formData = new FormData(form);
    const totalQuestions = document.querySelectorAll('.question').length;
    let correctAnswers = 0;

    // Compare answers with correct ones
    const correctAnswersMap = {
        q1: "b",
        q2: "c",
        q3: "a",
        q4: "a",
        q5: "c",
        q6: "a",
        q7: "b",
        q8: "c",
        q9: "b",
        q10: "c",
        q11: "a",
        q12: "c",
        q13: "c",
        q14: "d",
        q15: "b",
        q16: "d",
        q17: "a",
        q18: "b",
        q19: "b",
        q20: "a",
        q21: "a",
        q22: "c",
        q23: "a",
        q24: "b",
        q25: "b",
        q26: "c",
        q27: "b",
        q28: "b",
        q29: "c",
        q30: "b",
        q31: "c",
    };

    for (const pair of formData.entries()) {
        const questionId = pair[0];
        const selectedAnswer = pair[1];

        if (correctAnswersMap[questionId] === selectedAnswer) {
            correctAnswers++;
        }
    }
    // Process user input, store exam data in localStorage.
    const idNumberInput = document.getElementById('idNumber');
    const idNumber = idNumberInput.value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const examId = document.getElementById('examId').value.trim();
    localStorage.setItem(
        `${idNumber}_${validExamId}`,
        JSON.stringify({ answered: true, score: correctAnswers, fullName, examId, studentId: idNumber })
    );

    // Calculate the number of failed questions (unanswered questions)
    const failedQuestions = totalQuestions - correctAnswers;

    // Show the student's score for the exam
    alert(`Your score: ${correctAnswers} out of ${totalQuestions}. ${failedQuestions} question(s) were not answered.`);

    // Set the examSubmitted flag to prevent resubmission
    examSubmitted = true;

    // Disable the submit button to prevent going back to the exam
    document.getElementById('submitBtn').disabled = true;

    // Redirect to the score page with the score and failed questions count as parameters in the URL
    window.location.href = `score.html?score=${correctAnswers}&failed=${failedQuestions}&idNumber=${idNumber}&fullName=${fullName}&examId=${examId}`;
}
// Automatically load saved exam data when the exam page is loaded
window.addEventListener('DOMContentLoaded', loadSavedExamData);

// Ensure the DOM content is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    const startExcelButton = document.getElementById('startExcelButton');
    if (startExcelButton) {
        startExcelButton.addEventListener('click', function(event) {
            event.preventDefault();
            startExcel();
        });
    }

    const startPowerPointButton = document.getElementById('startPowerPointButton');
    if (startPowerPointButton) {
        startPowerPointButton.addEventListener('click', function(event) {
            event.preventDefault();
            startPowerPoint();
        });
    }

    const startAccessButton = document.getElementById('startAccessButton');
    if (startAccessButton) {
        startAccessButton.addEventListener('click', function(event) {
            event.preventDefault();
            startAccess();
        });
    }

    const startNetworkingButton = document.getElementById('startNetworkingButton');
    if (startNetworkingButton) {
        startNetworkingButton.addEventListener('click', function(event) {
            event.preventDefault();
            startNetworking();
        });
    }
});

// Handle the window.onbeforeunload event to show a confirmation warning
window.onbeforeunload = function (event) {
    if (timeLeft > 0 && canSubmit && !examSubmitted) {
        handleExamClosure(); // Save the exam data before leaving the page
        const confirmationMessage = 'Your exam progress will be lost if you leave this page. Do you want to stay on the page?';
        (event || window.event).returnValue = confirmationMessage; // For modern browsers
        return confirmationMessage; // For older versions of IE and Firefox
    }
};
