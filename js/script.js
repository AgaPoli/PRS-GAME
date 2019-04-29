const playerNameElement = document.getElementById("js-newGameElement");
const newGameButton = document.getElementById("js-newGameButton");
const playerPickElement = document.getElementById("js-playerPickElement");
const resultsTableElement = document.getElementById("js-resultsTableElement");
const playerPoints = document.getElementById("js-playerPoints");
const playerName = document.getElementById("js-playerName");
const computerPoints = document.getElementById("js-computerPoints");
const computerName = document.getElementById("js-computerName");
const playerPick = document.getElementById("js-playerPick");
const computerPick = document.getElementById("js-computerPick");
const playerPoint = document.getElementById("js-playerPoint");
const computerPoint = document.getElementById("js-computerPoint");
const userNameElement = document.getElementById("js-userNameElement");
const startGameBtn = document.getElementById("js-startGameBtn");
// new game (welcome prompt with question how many games and the name)

//Enter your name (assumptions for the name)
function getUserName() {
  return userNameElement.value;
  // return prompt(
  //   `Please enter your name
  // name can't be null
  // name nact be number
  // min 3 dig`,
  //   `Agaa`
  // );
}

// name validation(length, numbers, cansel, aeneded)
function validateUserName(name) {
  const nameLength = name.length;
  const isNameNull = name == null;
  const isMax11Characters = nameLength <= 11;
  const isMinimum3Characters = nameLength >= 3;
  const isOnlyNumbers = /^\d+$/.test(name);
  const isAEnded = /a$/.test(name);

  return (
    !isNameNull &&
    isMax11Characters &&
    isMinimum3Characters &&
    !isOnlyNumbers &&
    isAEnded
  );
}

function newGame() {
  const name = getUserName();
  if (!validateUserName(name)) {
    alert("imie nie poprawne");

    return;
  }

  $("#myModal").modal("hide");
}

startGameBtn.addEventListener("click", event => newGame());
