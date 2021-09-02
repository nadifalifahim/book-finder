// Fetching Data
const searchInfo = () => {
  const searchInput = document.getElementById("search-input");
  try {
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
  toggleLoader("visible");

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
      cardDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="..." class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Author(s): ${book.author_name}</h6>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">
              <small class="text-muted">Published on: ${book.publish_date}</small>
              <small class="text-muted">by ${book.publisher}</small>
            </p>
          </div>
        </div>
      </div>
      `;
      toggleLoader("hidden");
      searchResults.appendChild(cardDiv);
    });
  }
};

// Displaying Error
const displayError = () => {};
