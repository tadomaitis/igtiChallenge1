let filterInput = null;
let searchButton = null;

let globalAllUsers = null;
let globalUsersStats = null;

let globalUsersList = null;
let globalStatsList = null;

let globalUsersListTitle = null;
let globalStatsTitle = null;

let globalMaleUsers = null;
let globalFemaleUsers = null;
let globalTotalAge = 0;
let globalAverageAge = 0;

let usersListDiv = null;
let statsListDiv = null;

window.addEventListener("load", () => {
  filterInput = document.querySelector("#search-field");
  searchButton = document.querySelector(".btn");

  globalUsersListTitle = document.querySelector("#users-list-title");
  globalStatsTitle = document.querySelector("#stats-title");

  usersListDiv = document.querySelector(".users-list");
  statsListDiv = document.querySelector(".stats-list");

  globalUsersList = document.querySelector("#users-list");
  globalStatsList = document.querySelector("#stats-list");

  filterInput.addEventListener("keyup", (event) => {
    if (filterInput.value.trim() === "") {
      clearInput();
      disableInput();
    } else {
      enableInput();
    }
    if (event.key === "Enter" && filterInput.value.trim() !== "") {
      renderDataDivs();
    }
  });

  searchButton.addEventListener("click", () => {
    if (filterInput.value.trim() !== "") {
      renderDataDivs();
    }
  });

  clearInput();
  fetchUsers();
});

async function fetchUsers() {
  try {
    const res = await fetch(
      "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
    );
    const json = await res.json();
    console.log(json.results);

    globalAllUsers = json.results.map((user) => {
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
  const data = [];
  let usersHTML = "";

  globalAllUsers.filter((user) => {
    if (user.fullName.toLowerCase().includes(filterInput.value.toLowerCase())) {
      data.push(user);
    }
  });

  data.forEach((user) => {
    const userHTML = `
      <li>
        <img class="avatar" src="${user.picture}" alt="user avatar"/>
        <p>${user.fullName}, ${user.age}</p>
      </li>`;
    usersHTML += userHTML;
  });

  globalUsersList.innerHTML = usersHTML;
  changeListTitles();
  setCounters();
  showItem(statsListDiv);
  showItem(usersListDiv);

  function changeListTitles() {
    if (data === []) {
      globalUsersListTitle.innerHTML = "Nenhum usuário filtrado";
      globalStatsTitle.innerHTML = "Nada a ser exibido";
    } else {
      globalUsersListTitle.innerHTML = `${data.length} usuário(s) encontrado(s)`;
      globalStatsTitle.innerHTML = "Estatísticas";
    }
  }

  function setCounters() {
    const maleUsers = [];
    const femaleUsers = [];

    data.filter((user) => {
      if (user.gender === "male") {
        maleUsers.push(user);
      }
    });

    data.filter((user) => {
      if (user.gender === "female") {
        femaleUsers.push(user);
      }
    });

    globalMaleUsers = document.querySelector("#male-users");
    globalFemaleUsers = document.querySelector("#female-users");

    globalMaleUsers.innerHTML = maleUsers.length;
    globalFemaleUsers.innerHTML = femaleUsers.length;

    globalTotalAge = data.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);
    globalAverageAge = parseFloat((globalTotalAge / data.length).toFixed(2));

    const totalAgeHTML = document.querySelector("#total-age");
    const averageAgeHTML = document.querySelector("#average-age");

    totalAgeHTML.innerHTML = globalTotalAge;
    averageAgeHTML.innerHTML = globalAverageAge;
  }
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
