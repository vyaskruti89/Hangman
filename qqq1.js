const prompt = require('readline-sync');
const wordBank = require('./word-bank.json');

//-- random word in array and string--

let randomWord = [];
let hiddenword = "";

// user guessing the letter during the game
let letter;

//insert letters by user
let replacedmathches = [];


//letters previously gussed
let guessed  = [];

//user start with tries
let tries = 6;

// each round user wins
let winner = 0;

// game round user plays
 let gameround = 0;

 // pick the random word and push '_' and replace mached letter 

 function getRandomWord(){
    randomword = wordBank[Math.floor(Math.random() * wordBank.length)].split();
    hiddenword = randomWord.toString().split("");
    hiddenword.forEach((c) => {
        replacedmathches.push("_");
    });
}
console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");


//------- start game----

startGame();

function startGame(){

    // pick a random word from the  wordbank
    getRandomWord();
    
    // run until the user complete the word  or runs out of tries
    while (replacedmathches.indexOf('_') !== -1 && tries > 0){
        
        // How many tries does the user have left?
        console.log("Remaining tries = " + tries);

     // show the word the player is trying to fill in, with
    // whitespaces between each letter or underscore character
        console.log(replacedmathches.join(" "));

    // obtain a guess from the user, converting it to a lowercase letter
        letter = prompt.question("Please guess a letter: ").toLowerCase();

        if (/[a-zA-Z]/.test(letter)){
           
          //check user put  more than one letter
            checkUserInput();

            // Had the user guessed that letter already?
            if (guessed.includes(letter)){
                console.log("Sorry, you have already guessed that letter.");
            }
            // Or had the user NOT guessed that letter already?
            else{
                // If the letter is in the word, go to
                // rightGuess.
                if (hiddenword.includes(letter)){
                    rightGuess(hiddenword, letter);
                }
                // If the letter isn't in the word,
                // go to wrongGuess.
                else{
                    wrongGuess();
                }
            }
        }
        // If the user inputted a non-alphabetic character or the ctrl+c command,
        // either ignore that input or end gameplay.
        else{
            console.log();
        }
    }
}

function checkUserInput(){
    // Did the user input more than one letter character?
    // If so, accept only the first letter of the
    // input and ignore everything else.
    if (letter.length > 1){
        letter = letter[0];
    }
    console.log("please type single letter")
}

function rightGuess(hiddenword, letter){
    let newarr = [];
    // push each instance of the correct letter into newarr
    hiddenword.forEach((e, i) => {
        if (e === letter){
            newarr.push(i);
        }
    });
   // using newarr, replace each '_' 
   newarr.forEach((e) => {
    replacedmathches.splice(e, 1, letter);
});

guessed.push(letter);

// Did the user guess all the letters in the word?
if (replacedmathches.indexOf('_') === -1){
    console.log("Yay!! You did it!!");

    winner++;
    gameround++;

    // How many rounds have been played and won so far?
    console.log("Games won: " + winner + " out of " + gameround);

    // clear out all arrays and strings (except letter)
    // by setting their length properties to 0
    guessed.length = 0;
    randomWord.length = 0;
    hiddenword.length = 0;
    replacedmathches.length = 0;

    // set triesLeft back to 6
    tries = 6;

    // new round
    startGame();
}
}