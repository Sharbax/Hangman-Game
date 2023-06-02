// Letters 
const letters = "abcdefghijklmnopqrstuvwxyz"

// Set Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container 
let lettersContainer = document.querySelector(".letters");

// Generate Letters 
lettersArray.forEach(letter => {
    
    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = 'letter-box';

    // Append Span To The Letters Container 
    lettersContainer.appendChild(span);

});

    // Object Of Words + Categories 
    const words = {
        programming: ["javascript", "python", "java", "css", "html", "laravel", "ruby", "swift", "rust", "typescript"],
        movies: ["the godfather", "titanic", "the shawshank redemption", "the dark knight", "forrest gump", "the lord of the rings", "star wars", "jurassic park", "the matrix", "avatar", "indiana jones", "back to the future", "terminator", "rocky", "jaws", "interstellar", "coco", "up", "parasite", "memento", "eternal sunshine of the spotless mind", "the wolf of wall street"],
        people: ["albert einstein", "nelson mandela", "leonardo da vinci", "marie curie", "mahatma gandhi", "amelia earhart", "walt disney", "pablo picasso", "coco chanel", "martin luther king", "malala yousafzai", "neil armstrong", "mother teresa", "steve jobs", "oprah winfrey", "stephen hawking", "bill gates", "elon musk", "barack obama", "michelle obama", "angelina jolie", "david Beckham", "marilyn monroe", "charlie chaplin", "muhammad ali", "michael jackson", "madonna", "bob marley", "freddie mercury", "taylor swift", "beyoncé", "cristiano ronaldo", "lionel messi", "serena williams", "roger federer", "usain bolt", "emma watson", "tom hanks", "johnny depp", "jennifer lawrence", "scarlett johansson", "dwayne johnson", "tom cruise", "will smith", "keanu reeves", "robert downey", "brad pitt"],
        countries: ["argentina", "australia", "brazil", "canada", "china", "denmark", "egypt", "france", "germany", "greece", "india", "indonesia", "italy", "japan", "kenya", "mexico", "netherlands", "new zealand", "norway", "pakistan", "peru", "russia", "saudi arabia", "south africa", "south korea", "spain", "sweden", "switzerland", "thailand", "turkey", "ukraine", "united arab emirates", "united kingdom", "united states", "uruguay", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"]
    }

    // Get Random Property 
    let allKeys = Object.keys(words);

    // Random Number Related On Keys Length
    let randomPropNumber = Math.floor(Math.random() * allKeys.length);

    // Category Name
    let randomPropName = allKeys[randomPropNumber];

    // Category Words Array
    let randomPropValue = words[randomPropName];

    // Random Number Related On Words
    let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

    // The Random Word Inside The Random Category 
    let randomValuevalue = randomPropValue[randomValueNumber];

    // Set Category Info 
    document.querySelector(".game-info .category span").innerHTML = randomPropName;

    // Select Letters Guess Element
    let lettersGuessContainer = document.querySelector(".letters-guess");

    // Convert Chosen Word To Array 
    let lettersAndSpace = Array.from(randomValuevalue);

    // Create Span Depend On Word 
    lettersAndSpace.forEach(letter => {

        // Create Empty Span
        let emptySpan = document.createElement("span");

        // If Letter Is Space
        if (letter === ' ') {

            // Add Class To Span
            emptySpan.className = 'with-space';

        }

        // Append Span To The Letters Guess Container
        lettersGuessContainer.appendChild(emptySpan);
        
    });

    // Select Guess Spans
    let guessSpans = document.querySelectorAll(".letters-guess span");

    // Set Wrong Attempts
    let wrongAttempts = 0;

    // Select The Draw Element
    let theDraw = document.querySelector(".hangman-draw");

    // Handle Clicking On Letters 
    document.addEventListener("click", (e) => {

        // Set The Chose Status
        let theStatus = false;

        if (e.target.className === 'letter-box') {

            e.target.classList.add("clicked");

            // Get Clicked Letter
            let theClickedLetter = e.target.innerHTML.toLowerCase();

            // The Chosen Word
            let theChosenWord = Array.from(randomValuevalue.toLowerCase());

            lettersAndSpace.forEach((wordLetter, wordIndex) => {

                // If The Clicked Letter Equal To One Of The Word Letter 
                if (theClickedLetter === wordLetter) {

                // Set Status To Correct
                theStatus = true;



                    // Loop On All Guess Spans
                    guessSpans.forEach((span, spanIndex) => {

                        if (wordIndex === spanIndex) {

                        span.innerHTML = theClickedLetter;

                        }

                    });

                } 

            });

            // If Letter Is Wrong
            if (theStatus !== true) {

                // Increase The Wrong Attempts
                wrongAttempts++;

                // Add Class Wrong On The Draw Element
                theDraw.classList.add(`wrong-${wrongAttempts}`);

                // Play Fail Sound 
                document.getElementById("fail").play();

                if (wrongAttempts === 8) {
                
                endGame();

                lettersContainer.classList.add("finished");

                } 

            } else {

                // Play Success Sound
                document.getElementById("success").play();

                if(isWordGuessed()) {

                    endGame(true);

                    lettersContainer.classList.add("finished");
                }

            } 
    
        }

    });

    // Function To Check If The Word Has Been Fully Guessed
    function isWordGuessed() {
        for (let i = 0; i < guessSpans.length; i++) {
            const span = guessSpans[i];
            const spanText = span.innerHTML.trim();

            if (spanText === '' && lettersAndSpace[i] !== ' ') {
            return false;
        }
    }
    return true;
    }

    // End Game Function 
    function endGame(success) {

        // Create PopUp Div
        let div = document.createElement("div");

        // Create Text
        let divText = document.createTextNode(success ?`Congrats! You Guessed The Word ${randomValuevalue}` : `Game Over, The Word Is ${randomValuevalue}`);

        // Append Text To Div
        div.appendChild(divText);

        // Add Class On Div
        div.className = 'popup';

        // Append To Thr Body
        document.body.appendChild(div);
    }
