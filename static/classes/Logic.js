class board {
    constructor() {
        this.Matrix = [{
                x: 23,
                y: 224
            },
            {
                x: 73,
                y: 224
            },
            {
                x: 124,
                y: 224
            },
            {
                x: 174,
                y: 224
            },
            {
                x: 224,
                y: 224
            },
            {
                x: 224,
                y: 174
            },
            {
                x: 224,
                y: 123
            },
            {
                x: 224,
                y: 73
            },
            {
                x: 224,
                y: 23
            },
            {
                x: 275,
                y: 23
            },
            {
                x: 325,
                y: 23
            },
            {
                x: 325,
                y: 73
            },
            {
                x: 325,
                y: 123
            },
            {
                x: 325,
                y: 174
            },
            {
                x: 325,
                y: 224
            },
            {
                x: 376,
                y: 224
            },
            {
                x: 426,
                y: 224
            },
            {
                x: 477,
                y: 224
            },
            {
                x: 527,
                y: 224
            },
            {
                x: 527,
                y: 275
            },
            {
                x: 527,
                y: 325
            },
            {
                x: 477,
                y: 325
            },
            {
                x: 426,
                y: 325
            },
            {
                x: 376,
                y: 325
            },
            {
                x: 325,
                y: 325
            },
            {
                x: 325,
                y: 376
            },
            {
                x: 325,
                y: 426
            },
            {
                x: 325,
                y: 477
            },
            {
                x: 325,
                y: 527
            },
            {
                x: 275,
                y: 527
            },
            {
                x: 224,
                y: 527
            },
            {
                x: 224,
                y: 477
            },
            {
                x: 224,
                y: 426
            },
            {
                x: 224,
                y: 376
            },
            {
                x: 224,
                y: 325
            },
            {
                x: 174,
                y: 325
            },
            {
                x: 123,
                y: 325
            },
            {
                x: 73,
                y: 325
            },
            {
                x: 23,
                y: 325
            },
            {
                x: 23,
                y: 275
            }
        ]
        this.red = {
            startPositions: [{
                    x: 23,
                    y: 23
                },
                {
                    x: 73,
                    y: 23
                },
                {
                    x: 23,
                    y: 73
                },
                {
                    x: 73,
                    y: 73
                }
            ],
            endPositions: [{
                    x: 73,
                    y: 275
                },
                {
                    x: 123,
                    y: 275
                },
                {
                    x: 174,
                    y: 275
                },
                {
                    x: 224,
                    y: 275
                }
            ],
            startPositionIndex: 0,
            enterEndPositionIndex: 39
        }
        this.green = {
            startPositions: [{
                    x: 477,
                    y: 477
                },
                {
                    x: 527,
                    y: 477
                },
                {
                    x: 477,
                    y: 527
                },
                {
                    x: 527,
                    y: 527
                }
            ],
            endPositions: [{
                    x: 477,
                    y: 275
                },
                {
                    x: 426,
                    y: 275
                },
                {
                    x: 376,
                    y: 275
                },
                {
                    x: 325,
                    y: 275
                }
            ],
            startPositionIndex: 20,
            enterEndPositionIndex: 19
        }
        this.blue = {
            startPositions: [{
                    x: 477,
                    y: 23
                },
                {
                    x: 527,
                    y: 23
                },
                {
                    x: 477,
                    y: 73
                },
                {
                    x: 527,
                    y: 73
                }
            ],
            endPositions: [{
                    x: 275,
                    y: 73
                },
                {
                    x: 275,
                    y: 123
                },
                {
                    x: 275,
                    y: 174
                },
                {
                    x: 275,
                    y: 224
                }
            ],
            startPositionIndex: 10,
            enterEndPositionIndex: 9
        }
        this.yellow = {
            startPositions: [{
                    x: 23,
                    y: 477
                },
                {
                    x: 73,
                    y: 477
                },
                {
                    x: 23,
                    y: 527
                },
                {
                    x: 73,
                    y: 527
                }
            ],
            endPositions: [{
                    x: 275,
                    y: 477
                },
                {
                    x: 275,
                    y: 426
                },
                {
                    x: 275,
                    y: 376
                },
                {
                    x: 275,
                    y: 325
                }
            ],
            startPositionIndex: 30,
            enterEndPositionIndex: 29
        }

    }
}



class Pawn {
    constructor(x, y, i) {
        this.x = x
        this.y = y
        this.i = i
    }

    moveSelf(move) {
        this.x = move.next.x
        this.y = move.next.y
        this.i = move.next.i
    }

}
class Logic {
    constructor() {
        this.matrix = new board()
    }

    addPawns(player) {
        const color = player.color
        for (let i = 0; i < 4; i++) {
            player.pawns.push(new Pawn(
                this.matrix[color].startPositions[i].x,
                this.matrix[color].startPositions[i].y,
                this.matrix[color].startPositionIndex
            ))
        }
    }

    retrievePawnsThatCanMove(player, move) {
        const color = player.color
        let tab = []

        for (const pawn of player.pawns) {
            let endI = this.matrix[color].enterEndPositionIndex,
                newI = pawn.i + move
            if (!this.checkIfPawnLeftStart(pawn, color)) {
                if (move == 1 || move == 6) {
                    tab.push({
                        next: {
                            x: this.matrix.Matrix[pawn.i].x,
                            y: this.matrix.Matrix[pawn.i].y,
                            i: this.matrix[color].startPositionIndex
                        },
                        house: false
                    })
                } else {
                    tab.push({
                        next: undefined
                    })
                }

            } else if (this.checkIfPawnIsInHouse(pawn, color)[0]) {
                let houseI = this.checkIfPawnIsInHouse(pawn, color)[1]
                if (this.checkIfHouseIndexIsEmpty(player.pawns, color, houseI + move)) {
                    tab.push({
                        next: {
                            x: this.matrix[color].endPositions[houseI + move].x,
                            y: this.matrix[color].endPositions[houseI + move].y,
                            i: houseI + move
                        },
                        house: true
                    })
                } else {
                    tab.push({
                        next: undefined
                    })
                }
            } else if (pawn.i <= endI && newI > endI) {
                if (newI > (endI + 4)) {
                    tab.push({
                        next: undefined
                    })
                } else {
                    let houseI = newI - endI - 1
                    if (this.checkIfHouseIndexIsEmpty(player.pawns, color, houseI)) {
                        tab.push({
                            next: {
                                x: this.matrix[color].endPositions[houseI].x,
                                y: this.matrix[color].endPositions[houseI].y,
                                i: houseI
                            },
                            house: true
                        })
                    } else {
                        tab.push({
                            next: undefined
                        })
                    }
                }
            } else {
                if (newI > 39)
                    newI = newI - 40
                tab.push({
                    next: {
                        x: this.matrix.Matrix[newI].x,
                        y: this.matrix.Matrix[newI].y,
                        i: newI
                    },
                    house: false
                })
            }
        }
        return tab
    }

    checkIfPawnLeftStart(pawn, color) {
        for (const pos of this.matrix[color].startPositions) {
            if (pos.x == pawn.x && pos.y == pawn.y)
                return false
        }
        return true
    }

    checkIfHouseIndexIsEmpty(pawns, color, i) {
        if (i > 3) return false
        const pos = this.matrix[color].endPositions[i]
        for (const pawn of pawns) {
            if (pawn.x == pos.x && pawn.y == pos.y)
                return false
        }
        return true
    }

    checkIfPawnIsInHouse(pawn, color) {
        const pos = this.matrix[color].endPositions
        for (let i = 0; i < 4; i++) {
            if (pos[i].x == pawn.x && pos[i].y == pawn.y)
                return [true, i]
        }
        return [false]
    }

    checkIfMovesAreEmpty(moves) {
        for (const move of moves) {
            if (move.next != undefined)
                return false
        }
        return true
    }

    killAllPawnsOnTile(pawn, room, color) {
        if (this.checkIfPawnIsInHouse(pawn, color)[0]) return

        for (let player of room.players) {
            if (player.color != color) {
                for (let i = 0; i < 4; i++) {
                    if (this.checkIfPawnIsInHouse(player.pawns[i], player.color)[0]) continue
                    if (player.pawns[i].i == pawn.i) {
                        player.pawns[i].x = this.matrix[player.color].startPositions[i].x
                        player.pawns[i].y = this.matrix[player.color].startPositions[i].y
                        player.pawns[i].i = this.matrix[player.color].startPositionIndex
                    }
                }
            }
        }
    }

    checkIfPlayerWon(player, room) {
        let pawnsInHouse = 0
        for (const pawn of player.pawns) {
            if (this.checkIfPawnIsInHouse(pawn, player.color)[0]) pawnsInHouse++
        }
        if (pawnsInHouse == 4)
            room.endGame(player.nick)
        return
    }
}

module.exports = Logic