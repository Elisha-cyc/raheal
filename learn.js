document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('nav li a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Learn More buttons functionality
    document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement.classList.contains('hidden')) {
                targetElement.classList.remove('hidden');
                this.textContent = 'Show Less';
            } else {
                targetElement.classList.add('hidden');
                this.textContent = 'Learn More';
            }
        });
    });

    // Accordion functionality
    document.querySelectorAll('.accordion-btn').forEach(button => {
        button.addEventListener('click', () => {
            const accordionContent = button.nextElementSibling;
            const isActive = button.classList.contains('active');
            
            // Close all accordion items first
            document.querySelectorAll('.accordion-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.classList.remove('active');
            });
            
            // Open current one if it wasn't active
            if (!isActive) {
                button.classList.add('active');
                accordionContent.classList.add('active');
            }
        });
    });

    // Chart for causes section
    const causesCtx = document.getElementById('causesChart').getContext('2d');
    const causesChart = new Chart(causesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electricity & Heat', 'Transportation', 'Industry', 'Agriculture', 'Buildings', 'Other Energy'],
            datasets: [{
                data: [25, 14, 21, 24, 6, 10],
                backgroundColor: [
                    '#2c7873',
                    '#6fb98f',
                    '#f8b400',
                    '#004445',
                    '#2ecc71',
                    '#e74c3c'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Global Greenhouse Gas Emissions by Sector',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });

    // Quiz functionality
    const quizData = [
        {
            question: "What is the main cause of current climate change?",
            options: [
                "Natural climate cycles",
                "Human activities, especially burning fossil fuels",
                "Changes in the Earth's orbit",
                "Volcanic eruptions"
            ],
            correct: 1
        },
        {
            question: "Which of these is NOT a greenhouse gas?",
            options: [
                "Carbon dioxide (CO2)",
                "Methane (CH4)",
                "Nitrogen (N2)",
                "Water vapor (H2O)"
            ],
            correct: 2
        },
        {
            question: "How much has the global average temperature increased since the pre-industrial era?",
            options: [
                "About 0.5°C",
                "About 1.2°C",
                "About 2.0°C",
                "About 3.5°C"
            ],
            correct: 1
        },
        {
            question: "Which of these is a major effect of climate change?",
            options: [
                "More frequent and intense heatwaves",
                "Rising sea levels",
                "More extreme weather events",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is the Paris Agreement?",
            options: [
                "A UN agreement to limit global warming to well below 2°C",
                "A trade agreement between European countries",
                "A plan to reduce air pollution in cities",
                "A strategy to protect endangered species"
            ],
            correct: 0
        }
    ];

    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const startQuizBtn = document.getElementById('start-quiz');
    const nextQuestionBtn = document.getElementById('next-question');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const scoreDisplay = document.getElementById('score-display');
    const resultFeedback = document.getElementById('result-feedback');

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    totalQuestionsEl.textContent = quizData.length;

    startQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    retakeQuizBtn.addEventListener('click', retakeQuiz);

    function startQuiz() {
        quizIntro.classList.add('hidden');
        quizQuestions.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const question = quizData[currentQuestion];
        currentQuestionEl.textContent = currentQuestion + 1;
        
        questionContainer.textContent = question.question;
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });
    }

    function resetState() {
        nextQuestionBtn.classList.add('hidden');
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
        selectedOption = null;
    }

    function selectOption(index) {
        selectedOption = index;
        const options = document.querySelectorAll('.option-btn');
        
        options.forEach(option => {
            option.disabled = true;
        });
        
        const question = quizData[currentQuestion];
        if (index === question.correct) {
            options[index].classList.add('correct');
            score++;
        } else {
            options[index].classList.add('incorrect');
            options[question.correct].classList.add('correct');
        }
        
        nextQuestionBtn.classList.remove('hidden');
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizQuestions.classList.add('hidden');
        quizResults.classList.remove('hidden');
        
        const percentage = Math.round((score / quizData.length) * 100);
        scoreDisplay.textContent = `You scored ${score} out of ${quizData.length} (${percentage}%)`;
        
        let feedback = '';
        if (percentage >= 80) {
            feedback = "Excellent! You have a great understanding of climate change.";
        } else if (percentage >= 60) {
            feedback = "Good job! You know quite a bit about climate change.";
        } else if (percentage >= 40) {
            feedback = "Not bad! Consider reviewing the information to learn more.";
        } else {
            feedback = "Keep learning! The information on this page can help improve your knowledge.";
        }
        
        resultFeedback.textContent = feedback;
    }

    function retakeQuiz() {
        currentQuestion = 0;
        score = 0;
        quizResults.classList.add('hidden');
        quizQuestions.classList.remove('hidden');
        showQuestion();
    }

    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});