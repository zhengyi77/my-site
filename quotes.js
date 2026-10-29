/* ==========================================================================
   quotes.js — item 2 (at least 15 quotes) and item 5 (a random one on top)

   The quotes are data, not markup. That is the whole lesson here: when the
   data changes, the page changes, and you never duplicate a line of HTML.
   ========================================================================== */
(function () {
  'use strict';

  /* 18 quotes. Add one at the bottom of the list and it appears everywhere. */
  var quotes = [
    { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
    { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
    { text: 'Design is not just what it looks like. Design is how it works.', author: 'Steve Jobs' },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
    { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
    { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
    { text: 'The web is more a social creation than a technical one.', author: 'Tim Berners-Lee' },
    { text: 'Content precedes design. Design in the absence of content is not design, it is decoration.', author: 'Jeffrey Zeldman' },
    { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
    { text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
    { text: 'A user interface is like a joke. If you have to explain it, it is not that good.', author: 'Martin LeBlanc' },
    { text: 'Simplicity is a great virtue but it requires hard work to achieve it.', author: 'Edsger W. Dijkstra' },
    { text: 'The details are not the details. They make the design.', author: 'Charles Eames' },
    { text: 'Good design is as little design as possible.', author: 'Dieter Rams' },
    { text: 'Premature optimization is the root of all evil.', author: 'Donald Knuth' },
    { text: 'There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.', author: 'Jeff Atwood' },
    { text: 'Deleted code is debugged code.', author: 'Jeff Sickel' },
    { text: 'It works on my machine.', author: 'Every developer, once' }
  ];

  var featureText = document.getElementById('quote-of-the-visit');
  var featureAuthor = document.getElementById('quote-of-the-visit-author');
  var list = document.getElementById('quote-list');
  var nextButton = document.getElementById('next-quote');

  /* Pick a random index. Math.random() gives 0 <= n < 1, so multiplying by the
     length and rounding down always lands inside the array. */
  function randomQuote() {
    var index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  function showFeature() {
    var quote = randomQuote();
    if (!featureText || !featureAuthor) return;

    featureText.textContent = '“' + quote.text + '”';
    featureAuthor.textContent = '— ' + quote.author;
  }

  /* Build the full list once, when the page is ready. */
  function renderList() {
    if (!list) return;

    var fragment = document.createDocumentFragment();

    quotes.forEach(function (quote, index) {
      var card = document.createElement('figure');
      card.className = 'quote-card';

      var text = document.createElement('blockquote');
      text.textContent = quote.text;

      var author = document.createElement('figcaption');
      author.textContent = quote.author;

      var number = document.createElement('span');
      number.className = 'quote-number';
      number.setAttribute('aria-hidden', 'true');
      number.textContent = String(index + 1).padStart(2, '0');

      card.appendChild(number);
      card.appendChild(text);
      card.appendChild(author);
      fragment.appendChild(card);
    });

    list.appendChild(fragment);
  }

  showFeature();
  renderList();

  if (nextButton) {
    nextButton.addEventListener('click', showFeature);
  }
})();
