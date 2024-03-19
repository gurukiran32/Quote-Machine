import './App.css';
import React, { useState, useEffect } from 'react';

const Button = ({id, text, handleClick, buttonColor}) => {
  return (
    <div>
      <button id={id} onClick={handleClick} style={{backgroundColor: buttonColor, color: 'white'}}>{text}</button>
    </div>
  );
};

const QuoteBox = ({quote, author, getNewQuote, buttonColor, setButtonColor}) => {

  const handleClick = () => {
    // Change the color
    const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setButtonColor(newColor);
    document.body.style.backgroundColor = newColor;

    // Fetch a new quote
    getNewQuote();
  };

  return (
    <div id="quote-box" style={{backgroundColor: 'white'}}>
      <p id="text" style={{color: buttonColor}}>{quote}</p>
      <p id="author" style={{color: buttonColor}}>- {author}</p>
      <Button id="new-quote" text="New Quote" handleClick={handleClick} buttonColor={buttonColor}></Button>
      <a id="tweet-quote" href={`https://twitter.com/intent/tweet?="${quote}"-${author}`} target="_top" rel="nonopener noreferrer" style={{color: buttonColor}}><i class="fa fa-twitter">Tweet</i></a>
    </div>
  );
};

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [buttonColor, setButtonColor] = useState('#000000');
  
  const getNewQuote = () => {
    // fetch quotes from api
    fetch('https://api.quotable.io/random/').then(
    (response) => response.json()).then((data) => {
      setQuote(data.content);
      setAuthor(data.author);
    }).catch((error) => console.log("Error! Fetching quote:", error));
  };
  
  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div className="App">
      <QuoteBox quote={quote} author={author} getNewQuote={getNewQuote} buttonColor={buttonColor} setButtonColor={setButtonColor}/>
    </div>
  );
}

export default App;
