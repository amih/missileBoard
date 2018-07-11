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
    var t = checkMine(board,mx, my)
    if (!t) {
        board[mx][my] = 1
        t = !t
        return t
    } else {
        t = !t
        return t
    }
}

function checkMine(board,x, y) {
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

function checkMissleNorth(board,missle) {
    var x = missle.x
    var y = missle.y

    if (checkMine(board,x, y - 1)) {
        console.log("hit")
        return "hit"
    } else {
        if (checkMine(board,x + 1, y - 1)) {
            console.log("there is a mine at north east")
            return "Weast"
        } else {
            if (checkMine(board,x - 1, y - 1)) {
                console.log("there is a mine at north west")
                return "East"
            } else {
                console.log("there is nothing")
                return "North"
            }
        }
    }
}

function checkMissleSouth(board,missle) {
    var x = missle.x
    var y = missle.y
    if (checkMine(board,x, y + 1)) {
        console.log("hit")
        return "hit"
    } else {
        if (checkMine(board,x + 1, y + 1)) {
            console.log("there is a mine at north east")
            return "Weast"
        } else {
            if (checkMine(board,x - 1, y + 1)) {
                console.log("there is a mine at north west")
                return "East"
            } else {
                console.log("there is nothing")
                return "South"
            }
        }
    }
}

function checkMissleEast(board,missle) {
    var x = missle.x
    var y = missle.y
    if (checkMine(board,x + 1, y)) {
        console.log("hit")
        return "hit"
    } else {
        if (checkMine(board,x + 1, y - 1)) {
            console.log("there is a mine at north east")
            return "South"
        } else {
            if (checkMine(board,x + 1, y + 1)) {
                console.log("there is a mine at South east")
                return "North"
            } else {
                console.log("there is nothing")
                return "East"
            }
        }
    }
}

function checkMissleWeast(board,missle) {
	var x = missle.x
    var y = missle.y
    if (checkMine(board,x - 1, y)) {
        console.log("hit")
        return "hit"
    } else {
        if (checkMine(board ,x - 1, y - 1)){
            console.log("there is a mine at north east")
            return "South"
        } else {
            if (checkMine(board,x - 1, y + 1)) {
                console.log("there is a mine at South east")
                return "North"
            } else {
                console.log("there is nothing")
                return "Weast"
            }
        }
    }
}

function insertMineAt(board,x, y) {
    if (!checkMine(board,x, y)) {
        board[y][x] = 1
        return true;
    } else {
        return false
    }
}

function removeMine(board,x, y) {
    if (checkMine(board,x, y)) {
        board[x][y] = 0
        return true
    } else {
        return false
    }
}

function checkMissle(board,missle) {
	switch (missle.direction) {
        case "North":
            return checkMissleNorth(board,missle)
            break;
        case "South":
            return checkMissleSouth(board,missle)
            break;
        case "East":
            return checkMissleEast(board,missle)
            break;
        case "Weast":
            return checkMissleWeast(board,missle)
            break;
        case "hit":
            return missle.direction
    }
}

function missleStep(missle) {
	var x = missle.x
    var y = missle.y
    switch (missle.direction) {
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

function sendMissle( board,missle) {
    var cnt = 0
    while (true) {
		var x = missle.x
		var y = missle.y
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
        missle.direction = checkMissle(board,missle)
		location = missleStep(missle)+""
		missle.x=location[0]
		missle.y=loction[1]
        cnt++
        if (missle.direction === "hit") {
            console.log("you hit the target and you move " + cnt + " moves")
            break;
        }
    }
}

function printLocationOfMissle(missle){
	var x = missle.x
	var y = missle.y
	switch (missle.direction){
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
	console.log("the loction is: X:"+x+" and Y:"+y)
}
var gameBoard = make2DArray()
cleanBoard(gameBoard)
printBoard(gameBoard)
inserMines(gameBoard, 20)
var missle={
	x:1,
	y:1,
	direction:"South"
}
sendMissle(gameBoard,missle)
printBoard(gameBoard)