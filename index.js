const prompt = require('readline-sync');
const wordBank = require('./word-bank.json');

//const myVariable = prompt.question("say somethingS");
//console.log(myVariable + "/n");
//console.log(myVariable);
const letter = /[a-zA-Z]/
console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

const getRandomWord = (wordBank) => {
    let randomIndex = Math.floor(Math.random() * wordBank.length)
    return wordBank[randomIndex]
}

const createHiddenWord = (wordBank) => {
    let hiddenWord = wordBank.split('').map(char =>{return '_'})
    return hiddenWord
}

const isLetterinWord = (letter,word) => {
return word.include(letter)
}

const startGame = () =>{
let randomWord = getRandomWord (wordBank);
let hiddenWord = createHiddenWord(randomWord)

console.log(hiddenWord.join(''))

let tries = 6;
while (tries > 1 && hiddenWord.join('')!== randomWord){
    console.log('==================')
    console.log('=>Tries: ${tries}')
    console.log('=>',hiddenWord.join(''))
    const answer = prompt.question("Please guess a letter: ")

if(isLetterinWord(answer, randomWord)){
    hiddenWord = replaceMatches(answer,randomWord,hiddenWord)
    console.log("CORRECT!")
}else {
    tries--;
    console.log("INCORRECT!")
    console.log("you have ${tries} remaining.")
}
}

if (word === 0) {

    console.log(" ")
    console.log("you lose")
    console.log("the word was${randomWord}")
    console.log(" ")

} else {
    console.log(" ")
    console.log("you did it")
    console.log("the word was ${randomWord}")
    console.log(" ")
}
inquire.prompt(
    [
        {
            type:"confirm",
            name:"playagain",
            message:"would you like to play again",
            default:true    
        }
    ]
).then(function(replay){
    if(replay,playagain){
        getRandomWord()
    }
    else {
        Process.exit();
    }
})

}

startGame()
