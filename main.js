let randomBtn = document.getElementById("randomBtn");
let searchInput = document.getElementById("wikiSearchInput");
let searchBtn = document.getElementById("searchBtn");
let wikiContainer = document.getElementById("wikiContainer");
let searchResuts = document.getElementById("searchResuts");

wikiContainer.style.display = 'none';
searchResuts.style.display = 'none';

randomBtn.addEventListener("click", function (e) {
    wikiContainer.style.display = "block";
    searchResuts.style.display = "none";
    wikiContainer.src = this.href;
    e.preventDefault();
}, false);

function wikiSearch() {
    wikiContainer.style.display = 'none';
    searchResuts.style.display = "block";

    // this chunck of code found here: https://github.com/wikimedia/mediawiki-api-demos/blob/master/javascript/search.js
    let url = "https://en.wikipedia.org/w/api.php";

    let params = {
        action: "query",
        list: "search",
        srsearch: `${searchInput.value}`,
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (response) {
            for (let i = 0; i < response.query.search.length; i++) {
                let answerLink = document.createElement("a");
                answerLink.href = `https://en.wikipedia.org/?curid=${response.query.search[i].pageid}`;
                answerLink.target = '_blank';
                answerLink.classList.add("answer-link");
                answerLink.innerHTML = `
                    <div class="answer">
                        <h1 class="answer-heading">${response.query.search[i].title}</h1>
                        <p class="answer-text">${response.query.search[i].snippet}</p>
                    </div>
                `;
                searchResuts.appendChild(answerLink);
            }

        })
        .catch(function (error) { console.log(error); });
    // end of code piece, found at Github Wikipedia API demos

}

searchBtn.addEventListener("click", wikiSearch, false);
document.body.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        wikiSearch();
    }
}, false)
