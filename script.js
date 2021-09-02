// Fetching Data
const searchInfo = () => {
  const searchInput = document.getElementById("search-input");
  try {
    toggleLoader("visible");
    fetch(`https://openlibrary.org/search.json?q=${searchInput.value}`)
      .then((res) => res.json())
      .then((data) => displayData(data));
  } catch {}
};

// Toggle Spinner
const toggleLoader = (state) => {
  document.getElementById("spinner").style.visibility = state;
};

// Displaying Data
const displayData = (data) => {
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "";

  if (data.numFound === 0) {
    document.getElementById("books-found").innerHTML = "No results found";
  } else {
    document.getElementById(
      "books-found"
    ).innerHTML = `Books Found: <span id="total-results-num">${data.numFound}</span>`;
    const bookInfo = data.docs;
    bookInfo.forEach((book) => {
      console.log(book);
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.classList.add("mb-3");
      cardDiv.style.maxWidth = "540px";

      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      rowDiv.classList.add("g-0");
      cardDiv.appendChild(rowDiv);

      const colDiv1 = document.createElement("div");
      colDiv1.classList.add("col-md-4");
      rowDiv.appendChild(colDiv1);

      if (book.cover_i !== undefined) {
        const imgElem = document.createElement("img");
        imgElem.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        imgElem.classList.add("img-fluid");
        imgElem.classList.add("rounded-start");
        colDiv1.appendChild(imgElem);
      }

      const colDiv2 = document.createElement("div");
      colDiv2.classList.add("col-md-8");
      rowDiv.appendChild(colDiv2);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      colDiv2.appendChild(cardBody);

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerHTML = book.title;
      cardBody.appendChild(cardTitle);

      if (book.author_name !== undefined) {
        const cardSubTitle = document.createElement("h6");
        cardSubTitle.classList.add("card-subtitle");
        cardSubTitle.classList.add("mb-2");
        cardSubTitle.classList.add("text-muted");
        cardSubTitle.innerHTML = `Author(s): ${book.author_name}`;
        cardBody.appendChild(cardSubTitle);
      }

      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardBody.appendChild(cardText);

      if (book.publish_date !== undefined) {
        const publishedOn = document.createElement("small");
        publishedOn.classList.add("text-muted");
        publishedOn.innerHTML = `Published on: ${book.publish_date}`;
        cardText.appendChild(publishedOn);
        const lineBreak = document.createElement("br");
        cardText.appendChild(lineBreak);
      }

      if (book.publisher !== undefined) {
        const publishedBy = document.createElement("small");
        publishedBy.classList.add("text-muted");
        publishedBy.innerHTML = `Published by: ${book.publisher}`;
        cardText.appendChild(publishedBy);
      }

      toggleLoader("hidden");
      searchResults.appendChild(cardDiv);
    });
  }
};

// Displaying Error
const displayError = () => {
  toggleLoader("hidden");
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "<h2>Request Error. Try again later. </h2>";
};
