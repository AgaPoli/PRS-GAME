const newGameButton = document.getElementById("js-newGameButton");
const playerPickElement = document.getElementById("js-playerPickElement");
const resultsTableElement = document.getElementById("js-resultsTableElement");
const playerPoints = document.getElementById("js-playerPoints");
const playerNameElement = document.getElementById("js-playerName");
const computerPoints = document.getElementById("js-computerPoints");
const computerName = document.getElementById("js-computerName");
const playerChoice = document.getElementById("js-playerPick");
const computerChoice = document.getElementById("js-computerPick");
const playerPoint = document.getElementById("js-playerPoint");
const computerPoint = document.getElementById("js-computerPoint");
const userNameElement = document.getElementById("js-userNameElement");
const startGameBtn = document.getElementById("js-startGameBtn");
const usernameElement = document.getElementById("js-username");
const numberOfGamesElement = document.getElementById("js-numberOfGames");
// Results Table
const resultsTableBodyElement = document.getElementById("js-resultsTableBody");

// new game (welcome prompt with question how many games and the name)
let scoreBoard = {
  numberOfGames: 0,
  scorePlayer: 0,
  scoreComputer: 0
};

const gameRules = {
  numberOfGames: 3
};

let courseOfTheGame = [];
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
    alert("name not correct");

    return;
  }

  $("#myModal").modal("hide");
  gameRules.numberOfGames = numberOfGamesElement.value;
  newGameButton.classList.add("hidden");
  playerNameElement.innerHTML = name;
  playerPickElement.classList.remove("hidden");
  resultsTableElement.classList.remove("hidden");
}

startGameBtn.addEventListener("click", event => newGame());

// player choice eventlistner, function 
playerPickElement.addEventListener("click", event => {
  event.stopPropagation();

  playerChoose(event.target)
});


function playerChoose(target) {
  //element to nasz target
  const targetBtn = target.closest(".btn"); //jak naciskam na ikonke w przycisku to szuka najblizszego rodzica .btn;
  if (targetBtn != null) {
    const playerChoice = targetBtn.dataset.selection; //ma byc na cala ikone nie tylko na nazwe(papier)ma byc kolko i znaczek
    // console.log(targetBtn, typeof playerChoice, typeof computerPick()); //playerChoice- wyswietli co wybral gracz
    judge(playerChoice, computerPick());
  }
}


function computerPick() {
  const options = ["Papier", "Rock", "Scissors"];
  return options[Math.floor(Math.random() * 3)];

}


function judge(playerPick, computerPick) {
  if (computerPick == playerPick) {
    return 0; //remis
  }
  let winner = "";
  if (
    (computerPick == "Papier" && playerPick == "Scissors") ||
    (computerPick == "Rock" && playerPick == "Papier") ||
    (computerPick == "Scissors" && playerPick == "Rock")
  ) {
    scoreBoard.scorePlayer++;
    winner = "player";
  } else {
    scoreBoard.scoreComputer++;
    winner = "computer";
  }
  result(winner);

  playerChoice.innerHTML = playerPick;
  computerChoice.innerHTML = computerPick;
  scoreBoard.numberOfGames++;

  const courseOfTheRound = {
    scorePlayer: scoreBoard.scorePlayer,
    scoreComputer: scoreBoard.scoreComputer,
    playerMove: playerPick.toString(),
    computerMove: computerPick.toString(),
    won: winner
  };

  courseOfTheGame.push(courseOfTheRound); // adding an element to the end of the array

  showResult(courseOfTheRound);

  console.log('liczba rozegranych gier ', scoreBoard.numberOfGames);
  console.log('limit gier ', gameRules.numberOfGames);

  courseOfTheGame.forEach(element => {
    showResult(element)
  });

  if (scoreBoard.numberOfGames >= gameRules.numberOfGames) {
    $("#resultModal").modal("show");
  }
}

// The number of js-playerPoints is to be used for the name
function result(winner, reset = false) {
  playerPoints.innerHTML = reset ? "0" : scoreBoard.scorePlayer.toString();
  computerPoints.innerHTML = reset ? "0" : scoreBoard.scoreComputer.toString();

  playerPoint.innerHTML =
    winner == "player" ? '<i class="fa fa-smile-o" aria-hidden="true"></i>' : "";

  computerPoint.innerHTML =
    winner == "computer" ? '<i class="fa fa-smile-o" aria-hidden="true"></i>' : "";

}

function endGame() {
  newGameButton.classList.remove("hidden");
  playerNameElement.innerHTML = "PlayerName";
  playerPickElement.classList.add("hidden");
  resultsTableElement.classList.add("hidden");
  playerChoice.innerHTML = "";
  computerChoice.innerHTML = "";
  result("", true);

  courseOfTheGame = [];
  resultsTableBodyElement.innerHTML = "";

  let scoreBoard = {
    numberOfGames: 0,
    scorePlayer: 0,
    scoreComputer: 0
  };
}



function showResult(courseOfTheRound) {
  const row = `
    <tr>
      <th scope="row">${scoreBoard.numberOfGames}</th>
      <td>${courseOfTheRound.playerPoint}</td>
      <td>${courseOfTheRound. computerPoint}</td>
      <td>${courseOfTheRound.playerMove}</td>
      <td>${courseOfTheRound.computerMove}</td>
      <td>${courseOfTheRound.won}</td>
    </tr>
  `;

  resultsTableBodyElement.innerHTML = resultsTableBodyElement.innerHTML + row;
}

$("#resultModal").on("hide.bs.modal", endGame);