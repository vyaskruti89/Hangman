 
const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");


//-- random word in array and string--

let randomword = [];
let hiddenword = "";

// user guessing the letter during the game
let letter;


//insert letters by user
let replacing = [];

// all the letters the user had previously guessed
// in one round are stored in this array, which is cleared
// out after each round
let guessed = [];

// each round, the user starts off with 6 tries, and loses 1
// for each incorrect guess they make
let tries = 6;

// this variable will increment by 1 for each round the user has won
let roundsWon = 0;

// this variable will increment by 1 for each round the user has played
let roundsPlayed = 0;

// randomly pick a word from the word bank and push '_' characters
// to fillin equal to the number of letters in the selected word
function pickRandomWord(){
    randomword = wordBank[Math.floor(Math.random() * wordBank.length)].split();
    hiddenword = randomword.toString().split("");
    hiddenword.forEach((c) => {
        replacing.push("_");
    });
}

// Is this the user's first time playing?
// If so, print this message.
console.log("Welcome to Hangman!");
// play the game
startgame();

function startgame(){
    // pick a random word from the bank
    pickRandomWord();
    
    console.log("Press ctrl+c to stop.\n");
    // run until the user fully guesses the word or runs out of tries
    while (replacing.indexOf('_') !== -1 && tries > 0){
        // How many tries does the user have left?
        console.log("Remaining tries = " + tries);

        // show the word the player is trying to fill in, with
        // whitespaces between each letter or underscore character
        console.log(replacing.join(" "));

        // obtain a guess from the user, converting it to a lowercase letter
        letter = prompt.question("Please guess a letter: ").toLowerCase();

        // Did the user input a letter character?
        if (/[a-zA-Z]/.test(letter)){
            // check the length of the user input in case they inputted
            // more than one letter
            checkUserInput();

            // Had the user guessed that letter already?
            if(guessed.includes(letter)){
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
}

function rightGuess(hiddenword, letter){
    let newarr = [];
    // push each instance of the correct letter into newarr
    hiddenword.forEach((c, i) => {
        if (c === letter){
            newarr.push(i);
        }
        
    });

    // using newarr, replace each '_' with each instance of the guessed letter
    newarr.forEach((c) => {
        replacing.splice(c, 1, letter);
    });
    
    guessed.push(letter);

    // Did the user guess all the letters in the word?
    if (replacing.indexOf('_') === -1){
        console.log("Yay!! You did it!!");

        roundsWon++;
        roundsPlayed++;

        // How many rounds have been played and won so far?
        console.log("Games won: " + roundsWon + " out of " + roundsPlayed);

        // clear out all arrays and strings (except letter)
        // by setting their length properties to 0
        guessed.length = 0;
        randomword.length = 0;
        hiddenword.length = 0;
        replacing.length = 0;

        // set triesLeft back to 6
        tries = 6;

        // new round
        startgame();
    }
}

function wrongGuess(){
    console.log("There is no '" + letter + "'.");
    tries--;
    guessed.push(letter);

    // Did the user run out of tries?
    if (tries === 0){
        console.log("Round Over");

        // reveal the word to the user
        console.log("The word was '" + randomword + "'.\n");

        roundsPlayed++;

        // How many games have been played and won so far?
        console.log("Games won: " + roundsWon + " out of " + roundsPlayed);

        // clear out all arrays and strings (except letter)
        // by setting their length properties to 0
        guessed.length = 0;
        randomword.length = 0;
        hiddenword.length = 0;
        replacing.length = 0;

        // set triesLeft back to 6
        tries = 6;
        
        // new round
        startgame();
    }
}