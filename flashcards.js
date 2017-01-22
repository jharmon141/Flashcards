var inquirer = require("inquirer");
var questions = require('./flashcards.json');

function Flashcard(front, back, answer){
    this.front = front;
    this.back = back;
    this.answer = answer;
}

var count = 0;

var askQuestion = function(){
    if (count < 5) {
        console.log(questions[count].front);
        inquirer.prompt([
            {
                name: "userInput",
                message: "Your Answer: "
            }
        ]).then(function(userResponse) {
            var currentCard = new Flashcard(questions[count].front, questions[count].back, questions[count].answer);

            currentCard.printAnswer = function(){
                if (userResponse.userInput  === this.answer){
                    console.log("That's correct! " + this.back);
                } else {
                    console.log("Sorry, that's incorrect. " + this.back);
                }
            };
            currentCard.printAnswer();
            count++;
            askQuestion();
        });
    } else {
        console.log("End of Flashcards");
        inquirer.prompt([
            {
                name: "confirm",
                message: "Would you like to go through the Flashcards again?(y/n) "
            }
        ]).then(function(user) {
            count = 0;
            if (user.confirm === "y") {
                askQuestion();
            } else if (user.confirm === "n") {
                console.log("Ok. See you next time!");
            }
        });
    }
};

askQuestion();
