// DOM Elements
const quoteContainer = document.querySelector('#quote-container');
const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('#author');
const newQuoteBtn = document.querySelector('#new-quote');
const twitterBtn = document.querySelector('#twitter');
const loader = document.querySelector('#loader');

let apiQuotes = [];
let randomQuote = [];

function newQuote(){
    loading();
    // Pick a random quote
    randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if(randomQuote.text.length>120){
        quote.classList.add('long-quote');
    }else{
        quote.classList.remove('long-quote');
    }

    quote.textContent = randomQuote.text;
    quoteAuthor.textContent = randomQuote.author === null ? 'Unknown':randomQuote.author;

    complete();
}

// Fetch quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        alert(error);
    }    
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl,'_blank');
}

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}



// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();