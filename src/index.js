function makeCleanBoard(board) {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
}
var sumGameBoard = function(board) {
    var cnt=0
    for(var x=0;x<10;x++){
        for(var y=0;y<10;y++){
            if(board[x][y]===1){
                cnt++
            }
        }
    }
    return cnt
}

function insertMine(board) {
    var m = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }
    var mineAlreadyExsist = checkMine(board, m.x, m.y)
    if (!mineAlreadyExsist) {
        board[m.y][m.x] = 1
        return true;
    } else {
        mineAlreadyExsist = !mineAlreadyExsist
        return false;
    }
}

function checkMine(board, x, y) {
    if (y === -1 || y === 10 || x === -1 || x === 10) {
        return false
    }
    if (board[y][x] === 0) { 
        return false
    } else {
        return true
    }
}

function printBoard(gameBoard) {
    for (i = 0; i < 10; i++) {
        var boardLine = JSON.stringify(gameBoard[i]).replace(/,/g, ' ').replace(/[\[\]]/g, '')
        console.log(i, boardLine)
    }
}

function insertMines(board, num) {
    for (var x = 0; x < num; x++) {
        var addMine = insertMine(board)
        if (!addMine) {
            console.log("there is mine there")
            x--
        }
    }
}

function checkMissleNorth(board, missle) {
    var vision = missleVision(board, missle)
    if (vision[1] === 1) {
        return "hit"
    }
    if (vision[0] === 1 && vision[2] === 1) {
        return "South"
    }
    if (vision[0] === 1) {
        return "East"
    }
    if (vision[2] === 1) {
        return "West"
    } else {
        return "North"
    }
}

function checkMissleSouth(board, missle) {
    var vision = missleVision(board, missle)
    if (vision[1] === 1) {
        return "hit"
    }
    if (vision[0] === 1 && vision[2] === 1) {
        return "North"
    }
    if (vision[0] === 1) {
        return "East"
    }
    if (vision[2] === 1) {
        return "West"
    } else {
        return "South"
    }
}

function checkMissleEast(board, missle) {
    var vision = missleVision(board, missle)
    if (vision[1] === 1) {
        return "hit"
    }
    if (vision[0] === 1 && vision[2] === 1) {
        return "West"
    }
    if (vision[0] === 1) {
        return "South"
    }
    if (vision[2] === 1) {
        return "North"
    } else {
        return "East"
    }
}

function checkMissleWest(board, missle) {
    var vision = missleVision(board, missle)
    if (vision[1] === 1) {
        return "hit"
    }
    if (vision[0] === 1 && vision[2] === 1) {
        return "East"
    }
    if (vision[0] === 1) {
        return "South"
    }
    if (vision[2] === 1) {
        return "North"
    } else {
        return "West"
    }
}

function insertMineAt(board, x, y) {
    if (!checkMine(board, x, y)) {
        board[y][x] = 1
        return true;
    } else {
        return false
    }
}

function removeMine(board, x, y) {
    //i called the outter array y and the inner array x
    if (checkMine(board, x, y)) {
        board[y][x] = 0
        return true
    } else {
        return false
    }
}

function checkMissle(board, missle) {
    switch (missle.direction) {
        case "North":
            return checkMissleNorth(board, missle)
            break;
        case "South":
            return checkMissleSouth(board, missle)
            break;
        case "East":
            return checkMissleEast(board, missle)
            break;
        case "West":
            return checkMissleWest(board, missle)
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
        case "West":
            if (x > 0) {
                x++
                break
            } else {
                console.log("you are at the Westest place possible")
                break;
            }
    }
    return [x, y]
}

function sendMissle(board, missle) {
    var cnt = 0
    while (true) {
        var x = missle.x
        var y = missle.y
        if (cnt != 0) {
            if (x ===9&&hx==8) {
                console.log("you are at the East borderline of the board x:"+missle.x +" y:"+missle.y+" and you move " + cnt + " moves")
                var theEnd={
                    x:missle.x,
                    y:missle.y,
                    direction:missle.direction
                }
                return theEnd;
            }
            if (y ===9&&hy==8) {
                console.log("you are at the South borderline of the board x:"+missle.x +" y:"+missle.y+" and you move " + cnt + " moves")
                var theEnd={
                    x:missle.x,
                    y:missle.y,
                    direction:missle.direction
                }
                return theEnd
            }
            if (y === 0&&hy==1) {
                console.log("you are at the North borderline of the board x:"+missle.x +" y:"+missle.y+" and you move " + cnt + " moves")
                var theEnd={
                    x:missle.x,
                    y:missle.y,
                    direction:missle.direction
                }
                return theEnd
            }
            if (x === 0&&hx==1) {
                console.log("you are at the West borderline of the board x:"+missle.x +" y:"+missle.y+" and you move " + cnt + " moves")
                var theEnd={
                    x:missle.x,
                    y:missle.y,
                    direction:missle.direction
                }
                return theEnd
            }
        }
        var direction=missle.direction
        var hx=x
        var hy=y
        missle.direction = checkMissle(board, missle)
        if(missle.direction!=direction&&cnt===0){
            console.log("boom x:"+missle.x +" y:"+missle.y+" and you move " + cnt + " moves")
            return "Boom";
        }
        var location = missleStep(missle)
        missle.x = location[0]
        missle.y = location[1]
        cnt++
        if (missle.direction === "hit") {
            console.log("you hit the target and you move " + cnt + " moves")
            return "Hit";
        }
    }
}

function printLocationOfMissle(missle) {
    var x = missle.x
    var y = missle.y
    switch (missle.direction) {
        case North:
            y--;
            break;
        case South:
            y++;
            break;
        case East:
            x++;
            break;
        case West:
            x--;
            break;
    }
    console.log("the loction is: X:" + x + " and Y:" + y)
}

function missleVision(board, missle) {
    var array = new Array(3)
    switch (missle.direction) {
        case "North":
            if (checkMine(board, missle.x - 1, missle.y - 1)) {
                array[0] = 1
            } else {
                array[0] = 0
            }
            if (checkMine(board, missle.x, missle.y - 1)) {
                array[1] = 1
            } else {
                array[1] = 0
            }
            if (checkMine(board, missle.x + 1, missle.y - 1)) {
                array[2] = 1
            } else {
                array[2] = 0
            }
            break;
        case "South":
            if (checkMine(board, missle.x - 1, missle.y + 1)) {
                array[0] = 1
            } else {
                array[0] = 0
            }
            if (checkMine(board, missle.x, missle.y + 1)) {
                array[1] = 1
            } else {
                array[1] = 0
            }
            if (checkMine(board, missle.x + 1, missle.y + 1)) {
                array[2] = 1
            } else {
                array[2] = 0
            }
            break;
        case "East":
            if (checkMine(board, missle.x + 1, missle.y - 1)) {
                array[0] = 1
            } else {
                array[0] = 0
            }
            if (checkMine(board, missle.x + 1, missle.y)) {
                array[1] = 1
            } else {
                array[1] = 0
            }
            if (checkMine(board, missle.x + 1, missle.y + 1)) {
                array[2] = 1
            } else {
                array[2] = 0
            }
            break;
        case "West":
            if (checkMine(board, missle.x - 1, missle.y - 1)) {
                array[0] = 1
            } else {
                array[0] = 0
            }
            if (checkMine(board, missle.x - 1, missle.y)) {
                array[1] = 1
            } else {
                array[1] = 0
            }
            if (checkMine(board, missle.x - 1, missle.y + 1)) {
                array[2] = 1
            } else {
                array[2] = 0
            }
            break;
    }
    printMissleVision(array)
    return array
}

function printMissleVision(array) {
    var ans = ""
    for (var x = 0; x < 3; x++) {
        if (x === 0) {
            ans = array[0]
            continue
        }
        ans = ans + "," + array[x]
    }
    console.log(ans)
    ans = "  ^ "
    console.log(ans)
}

function test1MineDirectionNorthMineAtNorthWest() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "North"
    }
    insertMineAt(myBoard, 4, 4)
    var ans = checkMissle(myBoard, missle)
    if (ans === "East") {
        console.log("succses to change the direction fron North when the mine is in North West")
    } else {
        console.error("failed to change the direction fron North when the mine is in North West")
    }
}

function test1MineDirectionNorthMineAtNorthEast() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "North"
    }
    insertMineAt(myBoard, 6, 4)
    var ans = checkMissle(myBoard, missle)
    if (ans === "West") {
        console.log("succses to change the direction fron North when the mine is in North East")
    } else {
        console.error("failed to change the direction fron North when the mine is in North East")
    }
}

function test1MineDirectionNorthHittingTheTarget() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "North"
    }
    insertMineAt(myBoard, 5, 4)
    var ans = checkMissle(myBoard, missle)
    if (ans=== "hit") {
        console.log("succses to hit the target")
    } else {
        console.error("failed to hit the target")
    }
}

function test2MinesDirectionNorthU_Turn() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "North"
    }
    insertMineAt(myBoard, 6, 4)
    insertMineAt(myBoard, 4, 4)
    var ans = checkMissle(myBoard, missle)
    if (ans === "South") {
        console.log("succses to do U_Turn with 2 mines")
    } else {
        console.error("failed to do U_Turn with 2 mines")
    }
}

function test1MineDirectionSouthMineAtSouthhWest() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "South"
    }
    insertMineAt(myBoard, 4, 6)
    var ans = checkMissle(myBoard, missle)
    if (ans === "East") {
        console.log("succses to change the direction fron South when the mine is in South West")
    } else {
        console.error("failed to change the direction fron South when the mine is in South West")
    }
}

function test1MineDirectionSouthMineAtSouthEast() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "South"
    }
    insertMineAt(myBoard, 6, 6)
    var ans = checkMissle(myBoard, missle)
    if (ans === "West") {
        console.log("succses to change the direction fron South when the mine is in South East")
    } else {
        console.error("failed to change the direction fron South when the mine is in South East")
    }
}

function test1MineDirectionSouthHittingTheTarget() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "South"
    }
    insertMineAt(myBoard, 5, 6)
    var ans = checkMissle(myBoard, missle)
    if (ans === "hit") {
        console.log("succses to hit the target")
    } else {
        console.error("failed to hit the target")
    }
}

function test2MinesDirectionSouthU_Turn() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "South"
    }
    insertMineAt(myBoard, 6, 6)
    insertMineAt(myBoard, 4, 6)
    var ans = checkMissle(myBoard, missle)
    if (ans === "North") {
        console.log("succses to do U_Turn with 2 mines")
    } else {
        console.error("failed to do U_Turn with 2 mines")
    }
}

function test1MineDirectionWestMineAtNorthWest() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "West"
    }
    insertMineAt(myBoard, 4, 4)
    var ans = checkMissle(myBoard, missle)
    if (ans === "South") {
        console.log("succses to change direction from West when the mine is in Nort West")
    } else {
        console.error("failed to change direction from West when the mine is in Nort West")
    }
}

function test1MineDirectionWestMineAtSouthWest() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "West"
    }
    insertMineAt(myBoard, 4, 6)
    var ans = checkMissle(myBoard, missle)
    if (ans === "North") {
        console.log("succses to change direction from West when the mine is in South West")
    } else {
        console.error("failed to change direction from West when the mine is in South West")
    }
}

function test1MineDirectionWestHittingTheTarget() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "West"
    }
    insertMineAt(myBoard, 4, 5)
    var ans = checkMissle(myBoard, missle)
    if (ans === "hit") {
        console.log("succses to hit the target direction West")
    } else {
        console.error("failed to hit the target direction West")
    }
}

function test2MinesDirectionWestU_Turn() {
    var myBoard = makeCleanBoard()
    var missle = {
        x: 5,
        y: 5,
        direction: "West"
    }
    insertMineAt(myBoard, 4, 6)
    insertMineAt(myBoard, 4, 4)
    var ans = checkMissle(myBoard, missle)
    if (ans === "East") {
        console.log("succses to do u_turn direction West")
    } else {
        console.error("failed to do u_turn direction West")
    }
}
var testAddingRandomMinesToBoard = function() {
    var myBoard = makeCleanBoard()
    insertMines(myBoard, 50)
    var actualNumberOfMines = sumGameBoard(myBoard)
    if (50 === actualNumberOfMines) {
        console.log("succses to add 50 random mines to board")
        printBoard(myBoard)
    } else {
        console.error("failed to 50 random mines to board, actualNumberOfMines:", actualNumberOfMines)
        printBoard(myBoard)
    }
}
function nextStepIsOutOfTheBoardLines(board,missle){
    if(missle.x===0){
        if(missle.direction==="West"){
            return true
        }
        return false
    }
    if(missle.y===0){
        if(missle.direction==="North"){
            return true
        }
        return false
    }
    if(missle.x===9){
        if(missle.direction==="East"){
            return true
        }
        return false
    }
    if(missle.y===9){
        if(missle.direction==="South"){
            return true
        }
        return false
    }
    return false
}
function testMissleSendFromWestBorderline1mineAtX1Y5(){
    var myBoard=makeCleanBoard()
    var missle={
        x:-1,
        y:5,
        direction:"East"
    }
    insertMineAt(myBoard,1,5)
    printBoard(myBoard)
    var result=sendMissle(myBoard,missle)
    if(result==="Hit"){
        console.log("Succses Hit the target")
    }
    else(
        console.log("faild to send the missle")
    )
}
function testMissleSendFromWestBorderline1mineAtX1Y4(){
    var myBoard=makeCleanBoard()
    var missle={
        x:-1,
        y:5,
        direction:"East"
    }
    insertMineAt(myBoard,1,4)
    printBoard(myBoard)
    var result=sendMissle(myBoard,missle)
    if(result==="South"){
        console.log("Succses ressponde to sennding the missle form the borderline the target")
    }
    else(
        console.log("faild to send the missle")
    )
}
function testMissleSendFromWestBorderline1mineAtX1Y6(){
    var myBoard=makeCleanBoard()
    var missle={
        x:-1,
        y:5,
        direction:"East"
    }
    insertMineAt(myBoard,1,6)
    printBoard(myBoard)
    var result=sendMissle(myBoard,missle)
    if(result==="North"){
        console.log("Succses ressponde to sennding the missle form the borderline the target")
    }
    else(
        console.log("faild to send the missle")
    )
}

function testAll() {
    test1MineDirectionNorthMineAtNorthWest();
    test1MineDirectionNorthMineAtNorthEast()
    test1MineDirectionNorthHittingTheTarget()
    test2MinesDirectionNorthU_Turn()
    test1MineDirectionSouthMineAtSouthhWest()
    test1MineDirectionSouthMineAtSouthEast()
    test1MineDirectionSouthHittingTheTarget()
    test2MinesDirectionSouthU_Turn()
    test1MineDirectionWestMineAtNorthWest()
    test1MineDirectionWestMineAtSouthWest()
    test1MineDirectionWestHittingTheTarget()
    test2MinesDirectionWestU_Turn()
    testAddingRandomMinesToBoard()
}
$(".btnN").click(function sendMissleSouth(){
    var btnx=this.id
    btnx=btnx.split('N')
    btnx=btnx[1]
    var missle={
        x:btnx,
        y:-1,
        direction:"South"
    }
    // printBoard(gameBoard)
    // sendMissle(gameBoard,missle)
})
$(".btnW").click(function sendMissleSouth(){
    var btny=this.id
    btny=btny.split('W')
    btny=btny[1]
    var missle={
        x:-1,
        y:btny,
        direction:"East"
    }
    // sendMissle(gameBoard,missle)
})
$(".btnE").click(function sendMissleSouth(){
    var btny=this.id
    btny=btny.split('E')
    btny=btny[1]
    var missle={
        x:10,
        y:btny,
        direction:"West"
    }
    // sendMissle(gameBoard,missle)
})
$(".btnS").click(function sendMissleSouth(){
    var btnx=this.id
    btnx=btnx.split('S')
    btnx=btnx[1]
    var missle={
        x:btnx,
        y:10,
        direction:"North"
    }
    // sendMissle(gameBoard,missle)
})
// var gameBoard
// window.onload = function() {
//     gameBoard=makeCleanBoard()
//     printBoard(gameBoard)
//   };