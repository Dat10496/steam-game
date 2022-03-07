const titleGame = document.querySelector("#title-game");
const btnGroup = document.querySelector(".btn-group");
let page = 1;
let genre = "";

//  Get API all game
const getAllGames = async (genre) => {
  let url = `https://cs-steam-api.herokuapp.com/games?page=${page}`;
  // if (genre) {
    // 1. find & in string
    genre.match("&")
    // 2. change & to %26
    genre.replaceAll("&","%26")
  //   url += `&genres=${genre}`;
  //   console.log(url);
  // }

  if (genre) {
    if(genre.match("&")) {
      let genreChange =  genre.replaceAll("&", "%26")
     console.log(genreChange)

      // console.log(genre)
      url += `&genres=${genreChange}`;
      console.log(url);
    }
    // console.log(genre)
    // url += `&genres=${genre}`;
    // console.log(url);
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    renderGame(data.data);
  } catch (error) {
    console.log(error);
  }
};
getAllGames();

// Choose genre
const chooseGame = (data) => {
  genre = data;
  console.log(data);
  getAllGames(genre);
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

const renderGenreList = async () => {
  try {
    const url = "https://cs-steam-api.herokuapp.com/genres";
    const res = await fetch(url);
    const data = await res.json();
    const genres = data.data;
   getGenreListGame(genres)
  } catch (error) {
    console.log(error);
  }
};
renderGenreList()


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
  renderAllGame();
  btnGroup.innerHTML = ` <button class="btn btn-left">Previous Page</button>
  <button class="btn btn-right">Next Page</button>`;
  titleGame.innerHTML = "";
}
