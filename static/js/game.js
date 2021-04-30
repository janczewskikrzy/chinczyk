import Updater from '../js/updater.js'

const updater = new Updater
let rollButt = document.querySelector('#roll')
let dice = document.querySelector('#dice')
rollButt.onclick = () => {
    fetch('/rollTheDice')
        .then(res => res.json())
        .then(data => {
            showDiceSequence(data.rolls)
            displayMoves(data.pawnMoves, data.color)
        })
        .catch(err => {
            console.error(err)
        })
}

const showDiceSequence = async (roll) => {
            dice.style.backgroundImage = `url(../gfx/${roll}.png)`
            var synth = window.speechSynthesis;
            function speak(){
                var u=new SpeechSynthesisUtterance();
                u.text=roll;
                u.pitch=1;
                u.rate= 1;
                synth.speak(u);
}
            speak()
}


const board = document.querySelector('#board')
const shadow = document.querySelector('.grey')

const displayMoves = (moves, color) => {
    let divs = document.querySelectorAll(`.${color}`)
    for (let i = 0; i < 4; i++) {
        if (moves[i].next == undefined) continue
        let div = divs[i]
        console.log(div)
        div.classList.add('blink')
        div.onclick = () => {
            fetch('/move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    i: i
                }),
            })
        }
        div.onmouseenter = () => {
            shadow.style.left = `${moves[i].next.x + board.offsetLeft}px`
            shadow.style.top = `${moves[i].next.y + board.offsetTop}px`
        }
        div.onmouseleave = () => {
            shadow.style.left = `-50px`
            shadow.style.top = `0px`
        }

    }
}


let interval = setInterval(() => {
    fetch('/getUpdates')
        .then(res => res.json())
        .then(data => {
            update(data)
        })
        .catch(err => {
            console.error(err)
        })
}, 250)

const update = (gameData) => {
    updater.updatePlayers(gameData.players)
    updater.updateRoom(gameData.room)
    updater.updatePawns(gameData.pawns)
    if (gameData.room.finished) {
        clearInterval(interval)
        updater.showVictoryScreen(gameData.room.winner)
    }
}

let rd = false
let ready = document.querySelector('#ready')
let text = document.querySelector('#text')
ready.onclick = () => {
    fetch('/changeReady', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            state: ready.checked
        }),
    })
    if (rd == false){
    text.innerText = 'Jestem gotowy'
    rd = !rd}else{
    text.innerText = "Czekam na innych graczy"
    rd = !rd}
}
