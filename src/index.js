function make2DArray() {
    var gameBoard = new Array(10)
    for (var x = 0; x < 10; x++) {
        array[x] = new Array(10)
    }
    return array
}

function cleanBoard(board) {
    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            board[x][y] = 0
        }
    }
}

function inserMine(board) {
    var m = createMine()
    var mx = m[0]
    var my = m[1]
    var t = checkMine(mx, my, board)
    if (!t) {
        board[mx][my] = 1
        t = !t
        return t
    } else {
        t = !t
        return t
    }
}

function checkMine(x, y, board) {
    if (board[y][x] === 0) {
        return false
    } else {
        return true
    }
}

function createMine() {
    var mine = new Array(2)
    mine[0] = Math.floor(Math.random() * 10)
    mine[1] = Math.floor(Math.random() * 10)
    return mine
}

function printBoard(array) {
    for (var x = 0; x < 10; x++) {
        var line = ""
        for (var y = 0; y < 10; y++) {
            line = line + " " + array[x][y]
        }
        line = x + " " + line
        console.log(line)
    }
}

function inserMines(board, num) {
    for (var x = 0; x < num; x++) {
        var addMine = inserMine(board)
        if (!addMine) {
            console.log("there is mine there")
            x--
        }
    }
}

function checkMissleNorth(location, board) {
    var x = location[0]
    var y = location[1]

    if (checkMine(x, y - 1, board)) {
        console.log("hit")
        return "hit"
    } else {
        if (checkMine(x + 1, y - 1, board)) {
            console.log("there is a mine at north east")
            return "Weast"
        } else {
            if (checkMine(x - 1, y - 1, board)) {
                console.log("there is a mine at north west")
                return "East"
            } else {
                console.log("there is nothing")
                return "North"
            }
        }
    }
}

function checkMissleSouth(location, board) {
    var x = location[0]
    var y = location[1]
    if (checkMine(x, y + 1, board)) {
        console.log("hit")
        return "hit"
    } else {
        if (checkMine(x + 1, y + 1, board)) {
            console.log("there is a mine at north east")
            return "Weast"
        } else {
            if (checkMine(x - 1, y + 1, board)) {
                console.log("there is a mine at north west")
                return "East"
            } else {
                console.log("there is nothing")
                return "South"
            }
        }
    }
}

function checkMissleEast(location, board) {
    var x = location[0]
    var y = location[1]
    if (checkMine(x + 1, y, board)) {
        console.log("hit")
        return "hit"
    } else {
        if (checkMine(x + 1, y - 1, board)) {
            console.log("there is a mine at north east")
            return "South"
        } else {
            if (checkMine(x + 1, y + 1, board)) {
                console.log("there is a mine at South east")
                return "North"
            } else {
                console.log("there is nothing")
                return "East"
            }
        }
    }
}

function checkMissleWeast(location, board) {
    var x = location[0]
    var y = location[1]
    if (checkMine(x - 1, y, board)) {
        console.log("hit")
        return "hit"
    } else {
        if (checkMine(x - 1, y - 1, board)) {
            console.log("there is a mine at north east")
            return "South"
        } else {
            if (checkMine(x - 1, y + 1, board)) {
                console.log("there is a mine at South east")
                return "North"
            } else {
                console.log("there is nothing")
                return "Weast"
            }
        }
    }
}

function insertMineAt(x, y, board) {
    if (!checkMine(x, y, board)) {
        board[y][x] = 1
        return true;
    } else {
        return false
    }
}

function removeMine(x, y, board) {
    if (checkMine(x, y, board)) {
        board[x][y] = 0
        return true
    } else {
        return false
    }
}

function checkMissle(direction, location, board) {
    switch (direction) {
        case "North":
            return checkMissleNorth(location, board)
            break;
        case "South":
            return checkMissleSouth(location, board)
            break;
        case "East":
            return checkMissleEast(location, board)
            break;
        case "Weast":
            return checkMissleWeast(location, board)
            break;
        case "hit":
            return direction
    }
}

function missleStep(location, direction, board) {
    var x = location[0]
    var y = location[1]
    switch (direction) {
        case "North":
            if (y > 0) {
                y--
                break;
            } else {
                console.log("you are at the northest place possible")
                break;
            }
        case "South":
            if (y < 9) {
                y++
                break;
            } else {
                console.log("you are at the southest place possible")
                break;
            }
        case "East":
            if (x < 9) {
                x++
                break;
            } else {
                console.log("you are at the eastest place possible")
                break;
            }
        case "Weast":
            if (x > 0) {
                x++
                break
            } else {
                console.log("you are at the weastest place possible")
                break;
            }
    }
    return [x, y]
}

function sendMissle(direction, location, board) {
    var cnt = 0
    while (true) {
        var x = location[0]
        var y = location[1]
        if (cnt != 0) {
            if (x > board[0].length - 2) {
                console.log("you are at heaven and you move " + cnt + " moves")
                break;
            }
            if (y > board[0].length - 2) {
                console.log("you are at south pole and you move " + cnt + " moves")
                break;
            }
            if (y < 1) {
                console.log("you are at the north pole and you move " + cnt + " moves")
                break;
            }
            if (x < 1) {
                console.log("you are at hell and you move " + cnt + " moves")
                break;
            }
        }
        direction = checkMissle(direction, location, board)
        location = missleStep(location, direction, board)
        cnt++
        if (direction === "hit") {
            console.log("you hit the target and you move " + cnt + " moves")
            break;
        }
    }
}

function printLocationOfMissle(x, y, board, direction) {
    switch (direction) {
        case North:
            y--;
            break;
        case South:
            y++;
            break;
        case East:
            x++;
            break;
        case Weast:
            x--;
            break;
    }
    console.log("the loction is: X:" + x + " and Y:" + y)
}
var gameBoard = make2DArray()
cleanBoard(gameBoard)
printBoard(gameBoard)
inserMines(gameBoard, 20)
sendMissle("South", [1, 1], gameBoard)
printBoard(gameBoard)

// sendMissile(gameBoard, { x: 1, y: 1, direction: 's' })
// checkMissle(gameBoard, { x: 1, y: 1, direction: 's' })
// missileStep(gameBoard, { x: 1, y: 1, direction: 's' })