$(document).ready(function () {

    const questions = [
        {
            question: 'What must be manufactured by Victorinox or Wenger to be official?',
            answer: 'Swiss Army knives',
            answerBank: ['Patek', 'Swiss Army knives', 'Swavorski', 'Knox'],
            answerImage: './assets/images/SwissArmyKnife.jpg'
        },
        {
            question: 'What was the original brand of cereal whose mascot was Sunny?',
            answer: 'Kellogs Raisin Bran',
            answerBank: ['Sunny D', 'Captain Crunch', 'Chex', 'Kellogs Raisin Bran'],
            answerImage: './assets/images/raisinBran.jpg'


        },
        {
            question: 'What is Japanese sake made from?',
            answer: 'Rice',
            answerBank: ['Wheat', 'Sugar', 'Rice', 'Tofu'],
            answerImage: './assets/images/sake.jpg'

        },
        {
            question: 'What flavor soda pop did Roy Allen and Frank Wright begin selling in 1919?',
            answer: 'Root Beer',
            answerBank: ['Coca Cola', 'C-Plus', 'Ginger Ale', 'Root Beer'],
            answerImage: './assets/images/rootBeer.jpeg'


        },
        {
            question: 'When was the first Wal-Mart store opened?',
            answer: '1962',
            answerBank: ['1970', '1982', '1920', '1962'],
            answerImage: './assets/images/walmart.jpeg'


        },
        {
            question: 'How many bits are there in a byte?',
            answer: '8',
            answerBank: ['100', '8', '16', '24'],
            answerImage: './assets/images/8bitDane.gif'

        },
        {
            question: 'How long is a fortnight?',
            answer: 'Two Weeks',
            answerBank: ['One Week', 'A Month', 'Two Weeks', 'Three Weeks'],
            answerImage: './assets/images/fortnitelol.gif'

        },
        {
            question: 'What Kind of Animal is Chuck-E-Cheese?',
            answer: 'A Mouse',
            answerBank: ['A Cat', 'A Mouse', 'A Bird', 'A Dog'],
            answerImage: './assets/images/chuckcheese.jpeg'

        },
    ]

    let counter = 30;
    let intervelID;
    let questionIndex = 0;
    let chosenAnswer;
    let answerCorrect = 0;
    let answerWrong = 0;
    let unansweredQuestion = 0;

    const resetGame = function () {
        questionIndex = 0;
    }


    const elementBuilder = function (questionNum) {
        // (questionNum >= questions.length) ? console.log('NO MORE QUESTIONS') : console.log('More questions coming')
        if (questionNum >= questions.length) {
            //Play again button, display of total of right/wrong answers, and unanswered
            return `<div>
                        <h1>Game Over..</h1>
                        <p>Correct Answers: </p><span id="ansCorrect">${answerCorrect}</span>
                        <p>Incorrect Answers: </p><span id="ansIncorrect">${((questions.length) - answerCorrect)}</span>
                        <p>Unanswered Questions: </p><span id="ansUnanswered">${unansweredQuestion}</span>
                        <div><button id="start">Play Again?</button></div>
                    </div>`
        } else {
            let question = questions[questionNum]
            return (`
            <div><h1 id="countdown">30</h1></div>
            <div class='questionBox'>
                <h2>${question.question}</h2>
            </div>
            <div class='answerBox'>
                <p class="answer">${question.answerBank[0]}</p>
                <p class="answer">${question.answerBank[1]}</p>
                <p class="answer">${question.answerBank[2]}</p>
                <p class="answer">${question.answerBank[3]}</p>
            </div>`)
        }
    }

    const winnerGIF = [
        "./assets/images/SuccessMemes/greatSuccess.webp",
        "./assets/images/SuccessMemes/kawhiChamp.gif",
        "./assets/images/SuccessMemes/kipYes.webp",
        "./assets/images/SuccessMemes/macCharlieDance.gif",
        "./assets/images/SuccessMemes/skeletorWins.webp"
    ];



    const answerScreen = function (answer) {

        const winnerScreen = function () {
            answerCorrect++;
            let randWinIndex = Math.floor(Math.random() * ((questions.length - 1) - 2))
            console.log(randWinIndex)

            if (questionIndex > questions.length) { console.log('END OF QUESTIONS') }
            return (`<div>
                        <h2>Thats the right answer!</h2>
                        <img class="answerImage" src="${winnerGIF[randWinIndex]}" />
                    </div>`)
        }
        const loserScreen = function () {
            answerWrong++;
            return (`<div>
                        <h2>Wrong..</h2>
                        <p>The answer was ${questions[questionIndex].answer}</p>
                        <img class="answerImage" src="${questions[questionIndex].answerImage}"/>
                    </div>`)
        }

        //Check to see if we are done questions, if not, show answers, and build elements of new questions
        if (questionIndex <= questions.length) {
            if (answer == questions[questionIndex].answer) {
                //RIGHT ANSWER SCREEN, Increase question index, start a 4second timeout before next Question
                $('.game-container').html(winnerScreen())
                questionIndex++;
                console.log('winner, right answer chosen')
                setTimeout(function () {
                    if (questionIndex <= questions.length) {
                        $('.game-container').html(elementBuilder(questionIndex))
                        startInterval()
                    }
                }, 4000)


                //WRONG ANSWER SCREEN
            } else {
                $('.game-container').html(loserScreen())
                questionIndex++;
                console.log('loser, wrong answer')
                setTimeout(function () {
                    if (questionIndex <= questions.length) {
                        $('.game-container').html(elementBuilder(questionIndex))
                        startInterval()
                    }
                }, 4000)
            }
        }
    }

    //Start an interval of 30seconds.
    const startInterval = function () {
        counter = 30;
        intervelID = setInterval(function () {
            counter--;
            $('#countdown').text(counter)
            //Counter hit 0, user did not select, show answer screen.
            if (counter === 0) {
                //reset Counter
                clearInterval(intervelID)
                unansweredQuestion++;
                answerScreen();
            }
        }, 1000)
    }



    const initialGame = function () {

        //Build elements, inital array index 0
        $('.game-container').html(elementBuilder(questionIndex))

        //Set an interval counting down from 30 - 0
        startInterval()
    }



    //CLICK HANDLERS

    $('.game-container').on('click', '.answer', function (e) {
        //User clicks an answer, clear the intervelID, show answer screen.
        clearInterval(intervelID)
        console.log(e.currentTarget.innerText)
        let chosenAnswer = e.currentTarget.innerText
        answerScreen(chosenAnswer);
    })


    //The initial Start button on click.
    $('.game-container').on('click', '#start', function () {

        clearInterval(intervelID)
        answerCorrect = 0;
        answerWrong = 0;
        unansweredQuestion = 0;
        questionIndex = 0;
        initialGame();
    })


})
