
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
// learn.js - Mobile responsiveness implementation

document.addEventListener('DOMContentLoaded', function() {
    // Set viewport meta tag dynamically if not present
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(meta);
    }

    // Responsive adjustments
    function adjustForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        // Adjust header and navigation
        const header = document.querySelector('header .container');
        const nav = document.querySelector('nav');
        if (isMobile) {
            if (header) {
                header.style.padding = '1rem';
                header.querySelector('h1').style.fontSize = '1.5rem';
                header.querySelector('p').style.fontSize = '0.9rem';
            }
            
            if (nav) {
                nav.style.flexDirection = 'column';
                nav.style.alignItems = 'center';
                nav.style.padding = '0.5rem 0';
                
                const navItems = document.querySelectorAll('nav ul li');
                navItems.forEach(item => {
                    item.style.margin = '0.3rem 0';
                    item.style.padding = '0.3rem 1rem';
                    item.style.width = '100%';
                    item.style.textAlign = 'center';
                });
            }
        } else {
            if (header) {
                header.style.padding = '';
                header.querySelector('h1').style.fontSize = '';
                header.querySelector('p').style.fontSize = '';
            }
            
            if (nav) {
                nav.style.flexDirection = '';
                nav.style.alignItems = '';
                nav.style.padding = '';
                
                const navItems = document.querySelectorAll('nav ul li');
                navItems.forEach(item => {
                    item.style.margin = '';
                    item.style.padding = '';
                    item.style.width = '';
                    item.style.textAlign = '';
                });
            }
        }
        
        // Adjust content boxes
        const contentBoxes = document.querySelectorAll('.content-box');
        contentBoxes.forEach(box => {
            if (isMobile) {
                box.style.flexDirection = 'column';
                box.querySelector('img').style.width = '100%';
                box.querySelector('img').style.marginBottom = '1rem';
                box.querySelector('.text-content').style.width = '100%';
            } else {
                box.style.flexDirection = '';
                box.querySelector('img').style.width = '';
                box.querySelector('img').style.marginBottom = '';
                box.querySelector('.text-content').style.width = '';
            }
        });
        
        // Adjust effects grid
        const effectsGrid = document.querySelector('.effects-grid');
        if (effectsGrid) {
            if (isMobile) {
                effectsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                effectsGrid.style.gap = '1rem';
            } else {
                effectsGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                effectsGrid.style.gap = '2rem';
            }
        }
        
        // Adjust causes chart layout
        const causesChart = document.querySelector('.causes-chart');
        if (causesChart) {
            if (isMobile) {
                causesChart.style.flexDirection = 'column';
                causesChart.querySelector('.chart-container').style.width = '100%';
                causesChart.querySelector('.chart-container').style.marginBottom = '1rem';
                causesChart.querySelector('.causes-list').style.width = '100%';
            } else {
                causesChart.style.flexDirection = '';
                causesChart.querySelector('.chart-container').style.width = '';
                causesChart.querySelector('.chart-container').style.marginBottom = '';
                causesChart.querySelector('.causes-list').style.width = '';
            }
        }
        
        // Adjust timeline
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            if (isMobile) {
                timeline.style.flexDirection = 'column';
                timeline.style.alignItems = 'flex-start';
                
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => {
                    item.style.flexDirection = 'row';
                    item.style.alignItems = 'center';
                    item.style.marginBottom = '1rem';
                    item.style.width = '100%';
                    
                    item.querySelector('.timeline-year').style.marginRight = '1rem';
                    item.querySelector('.timeline-dot').style.marginRight = '1rem';
                });
            } else {
                timeline.style.flexDirection = '';
                timeline.style.alignItems = '';
                
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => {
                    item.style.flexDirection = '';
                    item.style.alignItems = '';
                    item.style.marginBottom = '';
                    item.style.width = '';
                    
                    item.querySelector('.timeline-year').style.marginRight = '';
                    item.querySelector('.timeline-dot').style.marginRight = '';
                });
            }
        }
        
        // Adjust solutions accordion
        const accordionItems = document.querySelectorAll('.accordion-item');
        if (isMobile) {
            accordionItems.forEach(item => {
                item.style.marginBottom = '0.5rem';
                item.querySelector('.accordion-btn').style.padding = '0.8rem';
                item.querySelector('.accordion-btn').style.fontSize = '0.9rem';
            });
        } else {
            accordionItems.forEach(item => {
                item.style.marginBottom = '';
                item.querySelector('.accordion-btn').style.padding = '';
                item.querySelector('.accordion-btn').style.fontSize = '';
            });
        }
        
        // Adjust personal actions grid
        const actionsGrid = document.querySelector('.actions-grid');
        if (actionsGrid) {
            if (isMobile) {
                actionsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                actionsGrid.style.gap = '1rem';
                
                const actionCards = document.querySelectorAll('.action-card');
                actionCards.forEach(card => {
                    card.style.padding = '0.8rem';
                    card.querySelector('i').style.fontSize = '1.2rem';
                    card.querySelector('p').style.fontSize = '0.8rem';
                });
            } else {
                actionsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                actionsGrid.style.gap = '1.5rem';
                
                const actionCards = document.querySelectorAll('.action-card');
                actionCards.forEach(card => {
                    card.style.padding = '';
                    card.querySelector('i').style.fontSize = '';
                    card.querySelector('p').style.fontSize = '';
                });
            }
        }
        
        // Adjust quiz container
        const quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) {
            if (isMobile) {
                quizContainer.style.padding = '1rem';
                
                const optionsContainer = document.querySelector('.options-grid');
                if (optionsContainer) {
                    optionsContainer.style.gridTemplateColumns = '1fr';
                    optionsContainer.style.gap = '0.5rem';
                }
            } else {
                quizContainer.style.padding = '';
                
                const optionsContainer = document.querySelector('.options-grid');
                if (optionsContainer) {
                    optionsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                    optionsContainer.style.gap = '1rem';
                }
            }
        }
        
        // Adjust footer resources
        const resourcesList = document.querySelector('.resources');
        if (resourcesList) {
            if (isMobile) {
                resourcesList.style.flexDirection = 'column';
                resourcesList.style.alignItems = 'flex-start';
                
                const resourceItems = document.querySelectorAll('.resources li');
                resourceItems.forEach(item => {
                    item.style.marginBottom = '0.5rem';
                });
            } else {
                resourcesList.style.flexDirection = '';
                resourcesList.style.alignItems = '';
                
                const resourceItems = document.querySelectorAll('.resources li');
                resourceItems.forEach(item => {
                    item.style.marginBottom = '';
                });
            }
        }
    }
    
    // Initialize Chart.js if canvas exists
    const causesChartCanvas = document.getElementById('causesChart');
    if (causesChartCanvas) {
        const causesChart = new Chart(causesChartCanvas, {
            type: 'pie',
            data: {
                labels: ['Burning Fossil Fuels', 'Deforestation', 'Agriculture', 'Industrial Processes', 'Waste'],
                datasets: [{
                    data: [65, 11, 10, 8, 6],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: isMobile ? 'bottom' : 'right'
                    }
                }
            }
        });
    }
    
    // Toggle more content functionality
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.toggle('hidden');
                this.textContent = targetContent.classList.contains('hidden') ? 'Learn More' : 'Show Less';
            }
        });
    });
    
    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.style.maxHeight;
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.querySelector('i').className = 'fas fa-chevron-down';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                content.style.maxHeight = null;
                this.querySelector('i').className = 'fas fa-chevron-down';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                this.querySelector('i').className = 'fas fa-chevron-up';
            }
        });
    });
    
    // Quiz functionality
    const quizData = [
        {
            question: "What is the main cause of current climate change?",
            options: [
                "Natural climate cycles",
                "Human activities like burning fossil fuels",
                "Changes in the Earth's orbit",
                "Volcanic eruptions"
            ],
            answer: 1
        },
        {
            question: "Which of these is NOT a greenhouse gas?",
            options: [
                "Carbon dioxide (CO2)",
                "Methane (CH4)",
                "Oxygen (O2)",
                "Nitrous oxide (N2O)"
            ],
            answer: 2
        },
        {
            question: "How much has global average temperature increased since pre-industrial times?",
            options: [
                "0.5°C",
                "1.1°C",
                "2.0°C",
                "3.5°C"
            ],
            answer: 1
        },
        {
            question: "Which sector contributes the most to global greenhouse gas emissions?",
            options: [
                "Transportation",
                "Agriculture",
                "Energy (electricity and heat production)",
                "Industry"
            ],
            answer: 2
        },
        {
            question: "What is the Paris Agreement's main goal?",
            options: [
                "Limit global warming to well below 2°C",
                "Stop all fossil fuel use by 2030",
                "Reduce plastic pollution",
                "Plant 1 trillion trees"
            ],
            answer: 0
        }
    ];
    
    const startQuizBtn = document.getElementById('start-quiz');
    const nextQuestionBtn = document.getElementById('next-question');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionDisplay = document.getElementById('current-question');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const scoreDisplay = document.getElementById('score-display');
    const resultFeedback = document.getElementById('result-feedback');
    
    if (startQuizBtn && nextQuestionBtn && retakeQuizBtn) {
        let currentQuestion = 0;
        let score = 0;
        let userAnswers = [];
        
        totalQuestionsDisplay.textContent = quizData.length;
        
        startQuizBtn.addEventListener('click', startQuiz);
        nextQuestionBtn.addEventListener('click', nextQuestion);
        retakeQuizBtn.addEventListener('click', startQuiz);
        
        function startQuiz() {
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
            
            quizIntro.classList.add('hidden');
            quizQuestions.classList.remove('hidden');
            quizResults.classList.add('hidden');
            
            showQuestion();
        }
        
        function showQuestion() {
            const question = quizData[currentQuestion];
            currentQuestionDisplay.textContent = currentQuestion + 1;
            
            questionContainer.innerHTML = `<h3>${question.question}</h3>`;
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('button');
                optionElement.className = 'option-btn';
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => selectAnswer(index));
                optionsContainer.appendChild(optionElement);
            });
            
            nextQuestionBtn.classList.add('hidden');
        }
        
        function selectAnswer(index) {
            const question = quizData[currentQuestion];
            userAnswers[currentQuestion] = index;
            
            // Highlight selected answer
            const optionButtons = document.querySelectorAll('.option-btn');
            optionButtons.forEach((button, i) => {
                button.classList.remove('selected', 'correct', 'incorrect');
                if (i === index) {
                    button.classList.add('selected');
                }
            });
            
            nextQuestionBtn.classList.remove('hidden');
        }
        
        function nextQuestion() {
            const question = quizData[currentQuestion];
            const selectedAnswer = userAnswers[currentQuestion];
            
            // Check if answer is correct
            if (selectedAnswer === question.answer) {
                score++;
            }
            
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
            scoreDisplay.innerHTML = `<h4>You scored ${score} out of ${quizData.length} (${percentage}%)</h4>`;
            
            let feedback = '';
            if (percentage >= 80) {
                feedback = "Excellent! You have a great understanding of climate change.";
            } else if (percentage >= 60) {
                feedback = "Good job! You know quite a bit about climate change.";
            } else if (percentage >= 40) {
                feedback = "Not bad! Consider learning more about climate change.";
            } else {
                feedback = "Keep learning! Climate change is an important topic to understand.";
            }
            
            resultFeedback.textContent = feedback;
        }
    }
    
    // Initial adjustments
    adjustForMobile();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustForMobile);
    
    // Helper function to check if element has class
    function hasClass(element, className) {
        return element.classList.contains(className);
    }
    
    // Add class to body for mobile detection
    function checkMobile() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
});
