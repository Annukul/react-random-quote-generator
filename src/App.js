import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const url = "https://my-quote-api.herokuapp.com/quotes";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const quote = await response.json();
      setLoading(false);
      setQuotes(quote);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, [])

  if (loading) {
    return (
      <div className="container">
        <Loading />
      </div>
    )
  }

  const randomQuote = Math.floor(Math.random() * 30);
  console.log(randomQuote);

  return (
    <div className="container">
      {quotes.map((quotee) => {
        const { id, quote, author } = quotee;

        let newClass = "hide";
        if (randomQuote === id) {
          console.log(randomQuote);
          newClass = "show";
        }

        return (
          <div key={id} className={newClass}>
            <p className="quote">{quote}</p>
            <span className="author">{author}</span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
