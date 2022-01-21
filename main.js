'use strict'

//IIFE 
const init = (() => {

    let players = []; // array wo die Spieler gespeichert werden
    const showForm = document.querySelector('#btn-start');
    const startForm = document.querySelector('#start-container');

    //Star Game-Clickevent
    showForm.addEventListener('click', () => {
        let p1name = document.querySelector('#player-1').value;
        let p2name = document.querySelector('#player-2').value;
        if (pruefe(p1name, p2name)) { // wenn beide namen eingegeben wurden, dann zeig das Spielfeld und hide Start Container
            const formular = document.querySelector('#spiel-container');
            formular.classList.add('show-form'); //Spielfeld zeigen
            startForm.style.display = 'none'; // hiding start container
        }
        pruefe(p1name, p2name);
        let p1 = player(p1name, 'X');
        players.push(p1);
        let p2 = player(p2name, 'O');
        players.push(p2);

    });

    //Eingabekontrolle & Alert
    function pruefe(p1name, p2name) {
        let text = "<div class='alert alert-danger' role='alert'>Haben beide Spieler*innen einen Namen eingegeben? </div>";

        if (p1name == "" || p2name == "") {
            document.getElementById('error').innerHTML = text;
            return false;
        } else {
            document.getElementById('error').innerHTML = "";
            return true;

        }
    }
    //FF Function / Blaupause
    function player(name, sign, won) {
        const getPlayerName = () => name;
        const getSign = () => sign;
        won = false;
        const changeWin = () => {
            if (!won) {
                won = true
            }
        }
        return { getPlayerName, getSign, changeWin };
    }
    return { players }
})();

let playCount = 0;
const btnReset = document.querySelector('#btn-reset');
let p1name = document.querySelector('#player-1').value;
let p2name = document.querySelector('#player-2').value;
let board = [];
board.length = 9;

//Gameboard clickevent
function game() {
    const gamefield = document.querySelectorAll('.box');
    gamefield.forEach((field) => {
        field.addEventListener("click", handleGamefieldClick);
    });
}
//Modulo Rechnung
function handleGamefieldClick(e) {
    let players = init.players;
    const field = e.target;

    if (playCount % 2 === 0) {
        field.textContent = players[0].getSign();
        board[field.dataset.index] = players[0].getSign();
        const header = document.querySelector('.spiel-header');
        header.textContent = players[0].getPlayerName() + ", it's your turn.";
    } else {
        field.textContent = players[1].getSign();
        board[field.dataset.index] = players[1].getSign();
        const header = document.querySelector('.spiel-header');
        header.textContent = players[1].getPlayerName() + ", it's your turn."
    }
    playCount++;
    whoWon();
}
game();

//Mehrdimensionales Array mit Gewinnmöglichkeiten
let winChances = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

//geht jedes (mehrdimensionales) array durch, und überpruft ob die "signs" gleich sind
function whoWon() {
    let players = init.players;
    let boxes = document.querySelectorAll('.box')
    let winnerText = document.querySelector('.winner');

    winChances.forEach((item) => {
        if (board[item[0]] === players[0].getSign() &&
            board[item[1]] === players[0].getSign() &&
            board[item[2]] === players[0].getSign()) {
            players[0].won = true;
            for (let item of boxes) {
                item.style.display = 'none';
            }
            const header = document.querySelector('.spiel-header');
            header.innerHTML = "End of Game!"
            winnerText.textContent = players[0].getPlayerName() + ' won the Game!';

        }
        if (board[item[0]] === players[1].getSign() &&
            board[item[1]] === players[1].getSign() &&
            board[item[2]] === players[1].getSign()) {
            players[1].won = true;
            for (let item of boxes) {
                item.style.display = 'none';
            }
            const header = document.querySelector('.spiel-header');
            header.innerHTML = "End of Game!"
            winnerText.textContent = players[1].getPlayerName() + ' won the Game!';

        }
    })
}
//Restart button
btnReset.addEventListener('click', () => {location.reload()})


