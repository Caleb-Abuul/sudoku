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
let popup = document.getElementById("popup");
let solve = document.getElementById("solve-puzzle");
let restartBtn = document.getElementById("restart");
let homeBtn = document.getElementById("home-btn");
let count = 0;

let timer = null;
let [hours, minutes, seconds] = [0, 0, 0];
let timerdisplay = document.getElementById("timer");
let pauseBtn = document.getElementById("pause");
let gameOver = false;

solve.addEventListener("click", solvePuzzle);


easyBtn.addEventListener("click", startEasy);

function startEasy(){
    level = "easy";
    homeBody.style.display = "none";
    gameBody.style.display = "block";
    game.style.display = "block";
    home.style.display = "none";

    setGame();
    startTimer();
}

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

mediumBtn.addEventListener("click", startMedium);

function startMedium(){
    level = "medium";
    homeBody.style.display = "none";
    gameBody.style.display = "block";
    game.style.display = "block";
    home.style.display = "none";

    setGame();
    startTimer();
}

hardBtn.addEventListener("click", startHard);

function startHard(){
    level = "hard";
    homeBody.style.display = "none";
    gameBody.style.display = "block";
    game.style.display = "block";
    home.style.display = "none";

    setGame();
    startTimer();
}

let boardEasy = [
    "--74-1-25",
    "2--568--9",
    "5---2-418",
    "7-861---4",
    "1-3--45-6",
    "---253-87",
    "-3--768--",
    "67--329-1",
    "-12--576-"
]

let boardMedium = [
    "73---5--2",
    "--5-17---",
    "-914--75-",
    "--31--8-5",
    "-783--6-9",
    "21---83--",
    "4--2--9-1",
    "---85--74",
    "-82--9--6"
]
let boardHard = [
    "--3--2--4",
    "--7---2--",
    "-8---4--3",
    "-6---5--9",
    "-1---9-5-",
    "5--4---6-",
    "---2--7--",
    "-3---7-2-",
    "--6---9--"
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
            count++;
           
            console.log(count);
            if (count == 36){
                popup.classList.remove("hide");
                clearInterval(timer);
                timer = null;
            }
            
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    } else if (level == "medium"){
        if (solutionMedium[r][c] == numberSelected.id){
            this.innerText = numberSelected.id;
            count++;
            console.log(count);
            
            if (count == 44){
                popup.classList.remove("hide");
                clearInterval(timer);
                timer = null;
            }
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    } else {
        if (solutionHard[r][c] == numberSelected.id){
            this.innerText = numberSelected.id;
            count++;
            console.log(count);
            if (count == 58){
                popup.classList.remove("hide");
                clearInterval(timer);
                timer = null;
            }
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}


function solvePuzzle(){
    let board = document.getElementById("board");
    board.innerHTML = " ";
    count = 0;
    for (let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            if (level == "easy"){
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + c.toString();
                tile.classList.add("tile");
                tile.classList.add("tile-start");
                tile.innerText = solutionEasy[r][c];
                board.append(tile);
            } else if (level == "medium"){
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + c.toString();
                tile.classList.add("tile");
                tile.classList.add("tile-start");
                tile.innerText = solutionMedium[r][c];
                board.append(tile);
            } else {
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + c.toString();
                tile.classList.add("tile");
                tile.classList.add("tile-start");
                tile.innerText = solutionHard[r][c];
                board.append(tile);
            }
        }
    }
    clearInterval(timer);
    popup.classList.remove("hide");
}

restartBtn.addEventListener("click", ()=>{
    popup.classList.add("hide");
    gameOver = false;
    document.getElementById("board").innerHTML = " ";
    [hours, minutes, seconds] = [0, 0, 0];
    startTimer();
    count = 0;

    if (level == "easy"){
        startEasy();
    } else if (level == "medium"){
        startMedium();
    } else {
        startHard();
    }
})

homeBtn.addEventListener("click", ()=>{
    popup.classList.add("hide");
    gameOver = false;
    clearInterval(timer);
    timer = null;
    document.getElementById("board").innerHTML = " ";
    [hours, minutes, seconds] = [0, 0, 0];
    document.getElementById("timer").innerText = "00:00:00";
    homeBody.style.display = "block";
    gameBody.style.display = "none";
    game.style.display = "none";
    home.style.display = "block";
    count = 0;
})

