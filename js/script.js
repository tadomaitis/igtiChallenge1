let filterInput = null;
let searchButton = null;

let globalUsersList = null;
let globalUsersStats = null;

let globalUsersListTitle = null;
let globalStatsTitle = null;

let globalFilteredUsersCount = 0;
let globalMaleFilteredUsersCount = 0;
let globalFemaleFilteredUsersCount = 0;
let globalTotalAge = 0;
let globalAgeAverage = 0;

let usersListDiv = null;
let statsListDiv = null;

window.addEventListener("load", () => {
  filterInput = document.querySelector("#searchField");
  searchButton = document.querySelector(".btn");

  globalUsersListTitle = document.querySelector("#users-list-title");
  globalStatsTitle = document.querySelector("#stats-title");

  usersListDiv = document.querySelector(".users-list");
  statsListDiv = document.querySelector(".stats-list");

  const clickMeButton = document.createElement("button");
  clickMeButton.innerHTML = "Click Me";
  const main = document.querySelector("main");
  main.appendChild(clickMeButton);

  clickMeButton.addEventListener("click", changeThings);

  // fetchUsers();
});

async function fetchUsers() {
  try {
    const res = await fetch(
      "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
    );
    console.log(res);
    const resJson = await res.json();
    console.log(resJson);
  } catch (error) {
    console.error("Não foi possível obter os dados da API. " + error);
  }
}

function changeThings() {
  enableDisableInput();
  changeListTitles();
  hideItem(statsListDiv);
  hideItem(usersListDiv);
}

function enableDisableInput() {
  filterInput.classList.toggle("has-text");
  searchButton.classList.toggle("enabled");
}

function changeListTitles() {
  if (globalUsersListTitle.innerHTML === "Nenhum usuário filtrado") {
    globalUsersListTitle.innerHTML = "N usuário (s) encontrados (s)";
  } else {
    globalUsersListTitle.innerHTML = "Nenhum usuário filtrado";
  }
  if (globalStatsTitle.innerHTML === "Nada a ser exibido") {
    globalStatsTitle.innerHTML = "Estatísticas";
  } else {
    globalStatsTitle.innerHTML = "Nada a ser exibido";
  }
}

function hideItem(element) {
  element.classList.toggle("hidden-item");
}
