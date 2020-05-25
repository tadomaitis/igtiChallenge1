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
  filterInput = document.querySelector("#search-field");
  searchButton = document.querySelector(".btn");

  globalUsersListTitle = document.querySelector("#users-list-title");
  globalStatsTitle = document.querySelector("#stats-title");

  usersListDiv = document.querySelector(".users-list");
  statsListDiv = document.querySelector(".stats-list");

  filterInput.addEventListener("keyup", (event) => {
    if (filterInput.value.trim() === "") {
      clearInput();
      disableInput();
    } else {
      enableInput();
    }
    if (event.key === "Enter" && filterInput.value.trim() !== "") {
      renderDataDivs();
      changeListTitles();
    }
  });

  searchButton.addEventListener("click", renderDataDivs);

  clearInput();
  //fetchUsers();
});

async function fetchUsers() {
  try {
    const res = await fetch(
      "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
    );
    const json = await res.json();
    console.log(json.results);

    globalUsersList = json.results.map((user) => {
      const { name, picture, dob, gender } = user;

      return {
        fullName: `${name.first} ${name.last}`,
        picture: picture.large,
        age: dob.age,
        gender,
      };
    });
  } catch (error) {
    console.error("Não foi possível obter os dados da API. " + error);
  }
}

function renderEmptyDivs() {
  hideItem(statsListDiv);
  hideItem(usersListDiv);
}

function renderDataDivs() {
  showItem(statsListDiv);
  showItem(usersListDiv);
}

function enableInput() {
  filterInput.classList.add("has-text");
  searchButton.classList.add("enabled");
  searchButton.disabled = false;
}

function disableInput() {
  filterInput.classList.remove("has-text");
  searchButton.classList.remove("enabled");
  searchButton.disabled = true;
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
  element.classList.add("hidden-item");
}

function showItem(element) {
  element.classList.remove("hidden-item");
}

function clearInput() {
  filterInput.value = "";
  filterInput.focus();
}
