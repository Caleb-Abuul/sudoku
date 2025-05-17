let numberSelected = null;
let tileSelected = null;
let errors = 0;
let level = null;
let easyBtn = document.getElementById("easy");
let mediumBtn = document.getElementById("medium");
let hardBtn = document.getElementById("hard");
let home = document.getElementById("home");
let homeBody = document.getElementById("home-body");
let game = document.getElementById("game");
let gameBody = document.getElementById("game-body");

let timer = null;
let [hours, minutes, seconds] = [0, 0, 0];
let timerdisplay = document.getElementById("timer");
let pauseBtn = document.getElementById("pause");
let gameOver = false;



easyBtn.addEventListener("click", function(){
    level = "easy";
    homeBody.style.display = "none";
    gameBody.style.display = "block";
    game.style.display = "block";
    home.style.display = "none";

    setGame();
    startTimer();
});

pauseBtn.addEventListener("click", function(){
    if (timer != null){
        clearInterval(timer);
        timer = null;
        pauseBtn.innerText = "Resume";
        gameOver = true;
    } else {
        gameOver = false;
        startTimer();
        pauseBtn.innerText = "Pause";
    }
});

function startTimer(){
    if (timer != null){
        clearInterval(timer);
    }
    timer = setInterval(function(){
        seconds++;
        if (seconds == 60){
            seconds = 0;
            minutes++;
        }
        if (minutes == 60){
            minutes = 0;
            hours++;
        }
        document.getElementById("timer").innerText = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }, 1000);
}

mediumBtn.addEventListener("click", function(){
    level = "medium";
    homeBody.style.display = "none";
    gameBody.style.display = "block";
    game.style.display = "block";
    home.style.display = "none";

    setGame();
    startTimer();
});
hardBtn.addEventListener("click", function(){
    level = "hard";
    homeBody.style.display = "none";
    gameBody.style.display = "block";
    game.style.display = "block";
    home.style.display = "none";

    setGame();
    startTimer();
});

let boardEasy = [
    "--74916--",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

let boardMedium = [
    "--4-8---2",
    "-2--17--3",
    "6-1---7--",
    "-4---68-5",
    "5--324--9",
    "--65---47",
    "4-7-6-9-1",
    "-6-8-1-7-",
    "--2--95--"
]
let boardHard = [
    "--6---9--",
    "4--1--2--",
    "--2---1-3",
    "3---2----",
    "7----9--2",
    "---4----7",
    "----16---",
    "8--9--6--",
    "-7-8---4-"
]

let solutionEasy = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]
let solutionMedium = [
    "734685192",
    "825917463",
    "691432758",
    "943176825",
    "578324619",
    "216598347",
    "457263981",
    "369851274",
    "182749536"
]
let solutionHard = [
    "193672584",
    "457138296",
    "682594173",
    "368725419",
    "714369852",
    "529481367",
    "945216738",
    "831947625",
    "276853941"
]

function setGame(){
    for (let i = 1; i <= 9; i++){
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        number.addEventListener("click", selectNumber);
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (level == "easy"){
                if (boardEasy[r][c] != "-"){
                    tile.innerText = boardEasy[r][c];
                    tile.classList.add("tile-start");
                }
            } else if (level == "medium"){
                if (boardMedium[r][c] != "-"){
                    tile.innerText = boardMedium[r][c];
                    tile.classList.add("tile-start");
                }
            } else {
                if (boardHard[r][c] != "-"){
                    tile.innerText = boardHard[r][c];
                    tile.classList.add("tile-start");
                }
            }
            if (r == 2 || r == 5){
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            document.getElementById("board").append(tile);
            }
           
        }
    }


function selectNumber(){
    if (gameOver){
        return
    }
    if (numberSelected != null){
        numberSelected.classList.remove("number-selected");
    }
    numberSelected = this;
    numberSelected.classList.add("number-selected");
}

function selectTile(){
    if (gameOver){
        return
    }
    if (this.innerText != ""){
        return
    }
    

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (level == "easy"){
        if (solutionEasy[r][c] == numberSelected.id){
            this.innerText = numberSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    } else if (level == "medium"){
        if (solutionMedium[r][c] == numberSelected.id){
            this.innerText = numberSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    } else {
        if (solutionMedium[r][c] == numberSelected.id){
            this.innerText = numberSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }

    checkWin();
}

function checkWin(){
   for (let r = 0; r < 9; r++){
    for (let c = 0; c < 9; c++){
        boardWin.append(boardEasy[r][c]);
    }
   }
   if (boardWin = solutionEasy){
    gameOver = true;
    let popup = document.createElement("div");
    popup.classList.add("win");
    document.getElementById("game-body").append(popup);

   }
}

