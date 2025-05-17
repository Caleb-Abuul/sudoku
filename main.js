let numberSelected = null;
let tileSelected = null;
let errors = 0;

let board = [
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

let solution = [
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

window.onload = () =>{
    setGame();
}

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
            if (board[r][c] != "-"){
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            tile.addEventListener("click", selectTile);
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numberSelected != null){
        numberSelected.classList.remove("number-selected");
    }
    numberSelected = this;
    numberSelected.classList.add("number-selected");
}

function selectTile(){
    if (this.innerText != ""){
        return
    }
    

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numberSelected.id){
        this.innerText = numberSelected.id;
    } else {
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    
}