const titleGame = document.querySelector("#title-game");
const btnGroup = document.querySelector(".btn-group");
const nextBtn = document.querySelector(".btn-right");
const preBtn = document.querySelector(".btn-left");
let page = 1;
let genre = "";

//  Get API genre of game
const getGenreGames = async (genre) => {
  titleGame.innerHTML = genre;
  let url = `https://cs-steam-api.herokuapp.com/games?page=${page}`;
  // find "&" in string
  if (genre.includes("&")) {
    // Change "&" to "%26"
    let genreChange = genre.replaceAll("&", "%26");
    url += `&genres=${genreChange}`;
  }
  if (!genre.includes("&")) {
    url += `&genres=${genre}`;
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderGame(data.data);
  } catch (error) {
    console.log(error);
  }
};

// function default page game
const pageGame = async () => {
  let url = `https://cs-steam-api.herokuapp.com/games?page=${page}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderGame(data.data);
  } catch (error) {
    console.log(error);
  }
};
pageGame();

// Choose genre
const chooseGame = (data) => {
  page = 1;
  genre = data;
  getGenreGames(data);
  btnGroup.innerHTML = ` <button class="btn btn-left" onclick="previousPage()"> Pre..Page</button>
  </button>
  <button class="btn btn-right" onclick="nextPage()"> Next Page </button>`;
};

//  Function create div game
const renderGame = (data) => {
  const gameWrapper = document.querySelector(".showing-game");
  gameWrapper.innerHTML = "";
  data.forEach((element) => {
    const x = document.createElement("div");
    x.className = "game-wrapper";
    x.innerHTML = `<div class="cover">
      <img
       id="background-game"
        src="${element.header_image}"
        alt="#"
        height="120px"
        width="250px"
        data-id="${element.appid}"
      />
    </div>
    <div class="game-info">
      <p>${element.name}</p>
      <p>${element.price}$</p>
    </div>`;
    gameWrapper.appendChild(x);
  });
};

// Button search name of game
const inputBtn = document.querySelector("#search-input");
inputBtn.addEventListener("change", () => {
  getNameGame(inputBtn.value);
});

// fetch url name of game
const getNameGame = async (name) => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/games?q=${name}`;
    const res = await fetch(url);
    const data = await res.json();
    renderGame(data.data);
  } catch (err) {
    console.log(err);
  }
};

// function render genre list game
const renderGenreList = async () => {
  try {
    const url = "https://cs-steam-api.herokuapp.com/genres?page=2";
    const res = await fetch(url);
    const data = await res.json();
    const genres = data.data;
    getGenreListGame(genres);
  } catch (error) {
    console.log(error);
  }
};
renderGenreList();

//  Function create list of game
const getGenreListGame = (data) => {
  const category = document.querySelector(".category");
  category.innerHTML = "";
  data.map((e) => {
    const x = document.createElement("ul");
    x.innerHTML = `<li onclick="chooseGame('${e.name}')">${e.name}</li>`;
    category.appendChild(x);
  });
};

function resetPage() {
  const btnGroup = document.querySelector(".btn-group");
  pageGame();
  btnGroup.innerHTML = ` <button class="btn btn-left">Previous Page</button>
  <button class="btn btn-right">Next Page</button>`;
  titleGame.innerHTML = "";
  btnGroup.innerHTML = "";
}

// Button next page
function nextPage() {
  page += 1;
  if (page > 4) {
    btnGroup.innerHTML = ` <button class="btn btn-left"  onclick="previousPage()">Pre..Page</button>
  <button class=" btn-right" disabled>Next Page</button>`;
  }
  if ((1 < page) & (page < 4)) {
    btnGroup.innerHTML = ` <button class="btn btn-left"  onclick="previousPage()">Pre..Page</button>
    <button class="btn btn-right" onclick="nextPage()">Next Page</button>`;
  }
  getGenreGames(genre);
}

// Button previous page
function previousPage() {
  page -= 1;
  if (page < 5) {
    btnGroup.innerHTML = ` <button class="btn btn-left"  onclick="previousPage()">Pre..Page</button>
    <button class="btn btn-right" onclick="nextPage()">Next Page</button>`;
  }
  if (page < 2) {
    btnGroup.innerHTML = ` <button class="btn-left"  onclick="previousPage()" disabled>Pre..Page</button>
    <button class="btn btn-right" onclick="nextPage()">Next Page</button>`;
  }
  getGenreGames(genre);
}
