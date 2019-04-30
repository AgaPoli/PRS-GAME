const playerNameElement = document.getElementById("js-newGameElement");
const newGameButton = document.getElementById("js-newGameButton");
const playerPickElement = document.getElementById("js-playerPickElement");
const resultsTableElement = document.getElementById("js-resultsTableElement");
const playerPoints = document.getElementById("js-playerPoints");
const playerName = document.getElementById("js-playerName");
const computerPoints = document.getElementById("js-computerPoints");
const computerName = document.getElementById("js-computerName");
const playerChoice = document.getElementById("js-playerPick");
const computerChoice = document.getElementById("js-computerPick");
const playerPoint = document.getElementById("js-playerPoint");
const computerPoint = document.getElementById("js-computerPoint");
const userNameElement = document.getElementById("js-userNameElement");
const startGameBtn = document.getElementById("js-startGameBtn");
// new game (welcome prompt with question how many games and the name)
let scoreBoard = {
  numberOfGames: 0,
  scorePlayer: 0,
  scoreComputer: 0
};
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

// player choice eventlistner, function 



playerPickElement.addEventListener("click", event =>
  playerChoose(event.target)
);


function playerChoose(target) {
  //element to nasz target
  const targetBtn = target.closest(".btn"); //jak naciskam na ikonke w przycisku to szuka najblizszego rodzica .btn;
  const playerChoice = targetBtn.dataset.selection; //ma byc na cala ikone nie tylko na nazwe(papier)ma byc kolko i znaczek
  // console.log(targetBtn, typeof playerChoice, typeof computerPick()); //playerChoice- wyswietli co wybral gracz
  judge (playerChoice, computerPick());
}


function computerPick (){
  const options =["papier", "Rock", "Scissors"];
  return options[ Math.floor(Math.random() * 3)];

}


function judge (playerPick, computerPick) {
  if (computerPick == playerPick) {
    return 0; //remis
  }
  let winner = "";
  if (
    (computerPick == "Papier"   &&  playerPick == "Scissors" )||
    (computerPick == "Rock"     &&  playerPick == "Papier" )||
    (computerPick == "Scissors" &&  playerPick == "Rock" )
  ) {
    scoreBoard.scorePlayer++;
    let winner = "player";
  } else {
    scoreBoard.scoreComputer++;
    let winner = "computer";
  }
  result(winner);

  playerChoice.innerHTML = playerPick;
  computerChoice.innerHTML = computerPick;
  scoreBoard.numberOfGames++;
}


 