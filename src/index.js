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
    if (y <= -1 || y >= 10 || x <= -1 || x >= 10) {
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
                    x--
                    break;
                } else {
                    console.log("you are at the Westest place possible")
                    break;
                    }   
    }
    return [x, y]
}
function fromButton(missile){
    innerMissile={
        fromX:missile.fromX,
        fromY:missile.fromY,
        x:missile.x,
        y:missile.y,
        direction:missile.direction
    }
    if(innerMissile.fromX===-1){
        innerMissile.x=innerMissile.fromX
        innerMissile.y=innerMissile.fromY
        innerMissile.direction="West"
    }
    if(innerMissile.fromX===10){
        innerMissile.x=innerMissile.fromX
        innerMissile.y=innerMissile.fromY
        innerMissile.direction="East"
    }
    if(innerMissile.fromY===-1){
        innerMissile.x=innerMissile.fromX
        innerMissile.y=innerMissile.fromY
        innerMissile.direction="North"
    }
    if(innerMissile.fromY===10){
        innerMissile.x=innerMissile.fromX
        innerMissile.y=innerMissile.fromY
        innerMissile.direction="South"
    }
    var button=toButton(innerMissile)
    return button;
}
function toButton(missile){
    var button=missile.direction.charAt(0)
    button=button.toUpperCase()
    switch(missile.direction){
        case "North":
            button="btn"+button+missile.x
            break;
        case "South":
            button="btn"+button+missile.x
            break;
        case "East":
            button="btn"+button+missile.y
            break;
        case "West":
            button="btn"+button+missile.y
            break;
    }
    return button
}
function enterTryNumber(buttonStart,buttonEnd,cntTry){
    $("#"+buttonStart).css('background-color',colors[cntTry])
    $("#"+buttonEnd).css('background-color',colors[cntTry])
    return true;
}
function changeColor(buttonStart,buttonEnd,direction){
    if(direction==="hit"){
        $("#"+buttonStart).css('background-color','red')
        return "red"
    }
    if(direction==="boom"){
        $("#"+buttonStart).css('background-color','blue')
        return "blue"
    }
    else{
        $("#"+buttonStart).css('background-color','yellow')
        $("#"+buttonEnd).css('background-color','yellow')
    }
}
function doUTurn(missle,direction){
    switch(direction){
        case "North":
            missle.direction="South"
            break;
        case "South":
            missle.direction="North"
            break;
        case "East":
            missle.direction="West"
            break;
        case "West":
            missle.direction="East"
            break;
    }
    return missle
}
function enterUTurn(button){
    $("#"+button).html("U")
    return true
}
function enterHit(button){
    $("#"+button).html("X")
    return true
}
function showExit(missle,uTurn,cntTry,hitTheTarget){
    if(uTurn){
        if(missle.x==missle.fromX&&missle.y==missle.fromY){
            var button=fromButton(missle)
            enterUTurn(button)
            return true
        }
        else{
            if(hitTheTarget!==true){
                var btnStart=fromButton(missle)
                var btnEnd= toButton(missle)
                enterTryNumber(btnStart,btnEnd,cntTry)
            }
            else{
                var button=fromButton(missle)
                enterHit(button)
            } 
        }
    }
    else{
        if(hitTheTarget!=true){
            var btnStart=fromButton(missle)
            var btnEnd= toButton(missle)
            enterTryNumber(btnStart,btnEnd,cntTry)
        }
        else{
            var button=fromButton(missle)
            enterHit(button)
        }
    }
}
function checkHit(board,missile){
    var direction=checkMissle(board,missile)
    if(direction=="hit"){
        missileHitSound.play()
        return true
    }
    else{
        return false
    }
}
function checkUTurn(board,missle){
    switch(direction){
        case "North":
            var direction=checkMissle(gameBoard,missle)
            if(directio=="South"){
                return true
            }  
            return false
            
    }
}
function checkAvailableStep(board,missile,firsttime){
    if(outBoardAndDontEnter(missile,firsttime)){return true}
    if(onBorderAndGoingOut(missile)){return true}
    return false
}
function checkDirection(board,missile){
    var lastDirection=missile.direction
    missile.direction=checkMissle(board,missile)
    if(missile.direction==="hit"){return "hit"}
    if(lastDirection!==missile.direction){return "U"}
    else{return "normal"}
}
function sendMissile(board,missile,cntTry){
    if(checkAvailableStep(board,missile,firsttime)){
        showExit(missile,false,cntTry,false)
        return true
    }
    var direction=checkDirection(board,missile)
    if(direction=="hit"){
        showExit(missile,false,cntTry,true)
        missileHitSound.play()
        return true
    }
    if(firsttime&&direction==="U"){
            firsttime=false
            showExit(missile,true,cntTry,false)
            return true
    }
    var step=missleStep(missile)
    missile.x=step[0]
    missile.y=step[1]
    var location="xy"+step[0]+step[1]
    moves[cntTry].push(location)
    firsttime=false
    missileStepSound.play()
    missileStepSound.onended=function(){sendMissile(board,missile,cntTry)}
}
function outBoardAndDontEnter(missle,firsttime){
    if(missle.y==-1&&missle.direction!="South"&&firsttime){return true}
    if(missle.y==10&&missle.direction!="North"&&firsttime){return true}
    if(missle.x==-1&&missle.direction!="East"&&firsttime){return true}
    if(missle.x==10&&missle.direction!="West"&&firsttime){return true}
    return false
}
function onBorderAndGoingOut(missle){
    if(missle.y==0&&missle.direction=="North"){return true}
    if(missle.y==9&&missle.direction=="South"){return true}
    if(missle.x==0&&missle.direction=="West"){return true}
    if(missle.x==9&&missle.direction=="East"){return true}
    return false;
}
function outBorderCantEnter(missle){
    if(missle.y==-1&&missle.direction!='South'){return true}
    if(missle.y==10&&missle.direction!='North'){return true}
    if(missle.x==-1&&missle.direction!='East'){return true}
    if(missle.x==10&&missle.direction!='West'){return true}
    return false
}
function onBorderHit(missle){
    if(missle.y==-1&&missle.direction=='hit'){return true}
    if(missle.y==10&&missle.direction=='hit'){return true}
    if(missle.x==-1&&missle.direction=='hit'){return true}
    if(missle.x==10&&missle.direction=='hit'){return true}
    return false
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
function findAndRmoveMine(mine){
    var index=-1
    if(mineList.length===0){
        return false
    }
    for(var a=0;a<mineList.length;a++){
        if(mineList[a][0]===mine[0]&&mineList[a][1]===mine[1]){
            index=a
            break;
        }
    }
    if(index===-1){
        return false
    }
    else{
        if(index===0){
            mineList=[]
            cntMine--
            return true
        }
        if(index+1===mineList.length){
            mineList.pop()
            cntMine--
            return true
        }
        for(var x=index;x<mineList.length;x++){
            var y=x-1
            mineList[y][0]=mineList[x][0]
            mineList[y][1]=mineList[x][1]
        }
        cntMine--
        mineList.pop()
        return true
    }
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
function correctGuesses(){
    var cnt=0
    for(var x=0;x<mineList.length;x++){
        if(checkMine(gameBoard,mineList[x][0],mineList[x][1])){
            cnt++
        }
    }
    return cnt
}
function endGame(){
    endMusic.play()
    var correct=correctGuesses()
    var score=(2*correct/(cntTry+1))
    var ans=true
    if(numMine!==cntMine){
        ans=false
    }
    if(correct===numMine){
        ans=true
    }
    else{
        ans=false
    }
    if(ans){
        endMusic.pause()
        $("#result").html("you are the best winner and your score is "+score)
        endGamePopup()
    }
    else{
        endMusic.pause()
        $("#result").html("better luck next time but look at the bright side your score is "+score)
        endGamePopup()
    }
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
function addToHistory(button,cntTry,history){
    history[cntTry]=button
    return true
}
function startGame(minesNum) {
    moves=[]
    history=[]
    numMine=minesNum
    $("#mineNumber").html("there are "+numMine+" mines hidden in the board")
     gameBoard=makeCleanBoard()
     insertMines(gameBoard,numMine)
     printBoard(gameBoard)
     cntTry=0
     mineList=[]
     colors=['AliceBlue','Bisque','Black','Blue','BlueViolet','Brown','CadetBlue','Chartreuse','DarkGreen','DeepPink']
}
function cleanBoardAndMakeAStep(id){
    $(".table").css("background-color","aqua")
    $("#"+id).css("background-color","red")
}
function replay1try(x){
    cleanBoardAndMakeAStep(moves[x][num])
    if(++num==moves[x].length){beReadyForNextReplay(x)}
    else{
        window.setTimeout(function(){replay1try(x)},300)
    }
}
function beReadyForNextReplay(x){
 if(num>=moves[x].length){
    num=0 
    if(x>=moves.length-1){
         endMusic.pause()
     }
     else{
        x++
        setTimeout(function(){replay1try(x)},300)
     }
 }
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
    moves.push([])
    var btnx=this.id
    btnx=btnx.split('N')
    btnx=btnx[1]
    btnx=parseInt(btnx)
    var missile={
        fromX:btnx,
        fromY:-1,
        x:btnx,
        y:-1,
        direction:"South"
    }
    firsttime=true
    sendMissile(gameBoard,missile,cntTry)
    cntTry++
    if(cntTry===10){
        cntTry=0
    }
})
$(".btnW").click(function sendMissleSouth(){
    moves.push([])
    var btny=this.id
    btny=btny.split('W')
    btny=btny[1]
    btny=parseInt(btny)
    var missile={
        fromX:-1,
        fromY:btny,
        x:-1,
        y:btny,
        direction:"East"
    }
    firsttime=true
     sendMissile(gameBoard,missile,cntTry)
     cntTry++
     if(cntTry===10){
         cntTry=0
     }
})
$(".btnE").click(function sendMissleSouth(){
    moves.push([])
    var btny=this.id
    btny=btny.split('E')
    btny=btny[1]
    btny=parseInt(btny)
    var missile={
        fromX:10,
        fromY:btny,
        x:10,
        y:btny,
        direction:"West"
    }
    firsttime=true
     sendMissile(gameBoard,missile,cntTry)
     cntTry++
     if(cntTry===10){
         cntTry=0
     }
})
$(".btnS").click(function sendMissleSouth(){
    moves.push([])
    var btnx=this.id
    btnx=btnx.split('S')
    btnx=btnx[1]
    btnx=parseInt(btnx)
    var missile={
        fromX:btnx,
        fromY:10,
        x:btnx,
        y:10,
        direction:"North"
    }
    firsttime=true
     sendMissile(gameBoard,missile,cntTry)
     cntTry++
     if(cntTry===10){
         cntTry=0
     }
})
$(".table").click(function signAsMine(){
    mine= new Array(2)
    var mines=this.id
    minex=parseInt(mines.charAt(2))
    miney=parseInt(mines.charAt(3))
    mine[0]=minex
    mine[1]=miney
    if(findAndRmoveMine(mine)){
        $("#"+this.id).html("XX")
    }
    else{
        mineList.push(mine)
        cntMine++
        $("#"+this.id).html("!!!!")
    }
    $("#numGuesses").html("you are have guessed the location of "+cntMine+" mines")
    if(cntMine===numMine){
        endGame()
    }
})
$("#replay").click( function showReplay(){
    endMusic.play()
    num=0
    replay1try(0)
})
function endGamePopup(){
    $("#endGameMessage").css('display','block')
}
$("#refresh").click(function refresh(){
    location.reload(true)
})
$("#yes").click(function(){
    startGame(numMine+5)
    $("#endGameMessage").css('display','none')
})
$("#no").click(function(){
    $("#endGameMessage").css('display','none')
})
var cntMine=0
var numMine
var firsttime
var num=0
var mineList
var colors
 var gameBoard
 var moves
 var cntTry
 var history
 var missileImage= document.createElement("img");
 missileImage.src='images/src=rocket-146104_640.png'
 var missileHitSound = document.createElement("audio");
 missileHitSound.src = "sounds/80938__tony-b-kksm__soft-explosion.wav";
 var endMusic = document.createElement("audio");
 endMusic.src = "sounds/ponponpon.mp3";
 var missileStepSound = document.createElement("audio");
 missileStepSound.src = "sounds/157439__nengisuls__misslie-1.mp3";
 window.onload = startGame(1)