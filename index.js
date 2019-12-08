const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");


//-- random word in array and string--

let randomword = [];
let hiddenword = "";

// user guessing the letter during the game
let letter;


//insert letters by user
let replacing = [];

//letters previously gussed
let guessed = [];

//user start with tries
let tries = 6;

// each round user wins
let winner = 0;

// game round user plays
let gameround = 0;

// body parts
let top = "_______";
let rope = "|     |";
let pole = "|     "; // 5
let platform = "_________";
let head = "|     o";
let body = "|     |";
let leftArm = "|    /|\\";
let rightArm = "|    /|";
let leg1 = "|    / \\";
let leg2 = "|    /";



console.log(top)
console.log(rope)
console.log(pole)
console.log(pole)
console.log(pole)
console.log(platform)

const drawMan = (tries) =>
{
    if (tries === 5) {
        console.log(top)
        console.log(rope)
        console.log(pole)
        console.log(pole)
        console.log(pole)
        console.log(platform)
    }
    if (tries === 4) {
        console.log(top)
        console.log(rope)
        console.log(head)
        console.log(pole)
        console.log(pole)
        console.log(platform)
    }
    if (tries === 3) {
        console.log(top)
        console.log(rope)
        console.log(head)
        console.log(body)
        console.log(pole)
        console.log(platform)
    }
    if (tries === 2) {
        console.log(top)
        console.log(rope)
        console.log(head)
        console.log(rightArm)
        console.log(pole)
        console.log(platform)
    }
    if (tries === 1) {
        console.log(top)
        console.log(rope)
        console.log(head)
        console.log(leftArm)
        console.log(pole)
        console.log(platform)
    }
    if (tries === 0) {
        console.log(top)
        console.log(rope)
        console.log(head)
        console.log(leftArm)
        console.log(leg2)
        console.log(platform)
    }
    if (tries === 0) {
        console.log(top)
        console.log(rope)
        console.log(head)
        console.log(rightArm)
        console.log(leg1)
        console.log(platform)
    }


};

drawMan();



 // pick the random word and push '_' and replace mached letter 

function pickRandomWord(){
    randomword = wordBank[Math.floor(Math.random() * wordBank.length)].split();
    hiddenword = randomword.toString().split("");
    hiddenword.forEach((c) => {
        replacing.push("_");
    });
}

//------- start game----

console.log("Welcome to Hangman!");

startgame();

function startgame(){

    // pick a random word from the  wordbank
    pickRandomWord();    
    console.log("Press ctrl+c to stop.\n");

    

    // get letters till tries last
    while (replacing.indexOf('_') !== -1 && tries > 0){
        drawMan(tries);

        // showing tries progress to player
        console.log("Remaining tries = " + tries);

        // show the word progress to player 
        console.log(replacing.join(" "));

        // Get guess form player
        letter = prompt.question("Please guess a letter: ").toLowerCase();

        // single letter 
        if (/[a-zA-Z]/.test(letter)){
            checkUserInput();

            // Already guessed letter
            if(guessed.includes(letter)){
                console.log("Sorry, you have already guessed that letter.");
            }
            // Or haven't guessed letter 
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
        // If the player guessing charactor other than letters or the ctrl+c command,
        // either ignore that input or end gameplay.
        else{
            console.log();
        }
    }
}
 
    // for single letter:If typed more than one letter accept first letter

function checkUserInput(){
   
    if (letter.length > 1){
        letter = letter[0];
    }
}

function rightGuess(hiddenword, letter){
    let newarr = [];
    // push correct letter into newarr
    hiddenword.forEach((c, i) => {
        if (c === letter){
            newarr.push(i);
        }
        
    });

    // using newarr, replace each '_' with  the guessed letter
    newarr.forEach((c) => {
        replacing.splice(c, 1, letter);
    });
    
    guessed.push(letter);

    // Did the player guess all the letters in the word?
    if (replacing.indexOf('_') === -1){
        console.log("Yay!! You did it!!");

        winner++;
        gameround++;

        // How many rounds have been played and won so far?
        console.log("Games won: " + winner + " out of " + gameround);

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

    // Did the player run out of tries?
    if (tries === 0){
        console.log("Round Over");

        // reveal the word to the player
        console.log("Better next luck time.")
        console.log("The word was '" + randomword + "'.\n");

        gameround++;

        // How many games have been played and won so far?
        console.log("Games won: " + winner + " out of " + gameround);

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