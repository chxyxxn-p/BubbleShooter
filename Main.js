var gameSpeed = 30; //call gameLoop in setTimeout
var gameScore = 0;
var gameGoalScore = 100;

var backgroundDiv;
var scoreDiv;

var ballFileNameArr = ["red", "orange", "yellow", "green", "blue", "purple"]; //index : 9 -> ball 생성 X
var ballRadius;
var gameBallRow = 20;
var ballSpeed = screen.width / 75;

var userBallArr = new Array();
var userBallShootReadyFlag = true;

var gameBallArr = new Array();
var gameBallImgsMoveCount = 0;
var removeCheckGameBallArr = new Array();
// var gameBallColorMapArr = [
//     [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
//     [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
//     [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
//     [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
//     [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
//     [1, 5, 9, 5, 9, 5, 5, 9, 5, 1],
//     [5, 1, 5, 5, 5, 5, 5, 5, 5, 1, 5],
//     [5, 1, 5, 2, 3, 2, 5, 5, 1, 5],
//     [5, 5, 1, 5, 5, 5, 5, 5, 1, 5, 5],
//     [5, 5, 1, 5, 5, 5, 5, 1, 5, 5],
//     [5, 5, 5, 1, 5, 5, 5, 1, 5, 5, 5],
//     [5, 5, 5, 1, 5, 5, 1, 5, 5, 5],
//     [5, 5, 5, 5, 1, 5, 1, 5, 5, 5, 5],
//     [5, 5, 5, 5, 1, 1, 5, 5, 5, 5],
//     [5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5],
//     [5, 5, 5, 5, 3, 3, 5, 5, 5, 5],
//     [5, 5, 5, 5, 3, 4, 3, 5, 5, 5, 5],
//     [5, 5, 5, 5, 3, 3, 5, 5, 5, 5],
//     [5, 5, 2, 2, 5, 5, 5, 2, 2, 5, 5],
//     [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
// ];
var gameBallMoveSpeed = 5000;

var pointerImg;
var pointerImgSpeed = 2;
var pointerImgRotateDeg = 0;

var gameLoopVar;

window.addEventListener("load", function () {
    bodyLayoutInit();
    createUserBallShooter();
    createGameBalls();
    listenEvent();

    gameLoop();
});

function bodyLayoutInit() {
    // body style
    document.body.style.margin = 0 + "px";
    document.body.style.position = "relative";

    // scoreDiv create, style
    scoreDiv = document.createElement("div");
    scoreDiv.style.width = parseInt(screen.height * 0.95 / 1.7) + "px";
    scoreDiv.style.height = screen.height * 0.05 + "px";
    scoreDiv.style.position = "relative";
    scoreDiv.style.margin = "auto";
    scoreDiv.style.fontSize = screen.height * 0.025 + "pt";
    scoreDiv.style.fontWeight = "bold";
    scoreDiv.style.textAlign = "left";
    scoreDiv.innerHTML = "GOAL : " + gameGoalScore + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSCORE : " + gameScore;
    document.body.appendChild(scoreDiv);

    // backgroundDiv create, style
    backgroundDiv = document.createElement("div");
    backgroundDiv.style.width = parseInt(screen.height * 0.95 / 1.7) + "px";
    backgroundDiv.style.height = screen.height * 0.95 + "px";
    backgroundDiv.style.position = "relative";
    backgroundDiv.style.margin = "auto";
    backgroundDiv.style.overflow = "hidden";
    backgroundDiv.style.backgroundImage = "url('./images/background_f.jpg')";
    backgroundDiv.style.backgroundSize = "cover";
    document.body.appendChild(backgroundDiv);

    // ballRadius value set (backgroundDiv width값이 정해진 후 비율에 맞도록)
    ballRadius = parseInt(parseInt(backgroundDiv.style.width) / 11) / 2;
}

function createUserBallShooter() {

    // gameBallRow 수의 두배 만큼 userBall 생성
    for (var i = 0; i < gameBallRow * 2; i++) {
        var randomColorNum = parseInt(Math.random() * ballFileNameArr.length);

        var gbTemp = new UserBall(
            randomColorNum,     //colorNum
            "./images/ball_" + ballFileNameArr[randomColorNum] + ".png",    //src
            backgroundDiv,  //container
            parseInt(backgroundDiv.style.width) / 2,    //centerX / backgroundDiv 중앙에 위치
            parseInt(backgroundDiv.style.height) - ballRadius * 3 + i * 2 * ballRadius,    //centerY / backgroundDiv와 공 1개만큼의 거리를 두고 첫번째 공 아래로 연달아 위치
            ballRadius);    //radius
        userBallArr.push(gbTemp);  //userBallArr에 push
    }

    // 화살표
    pointerImg = document.createElement("img");
    pointerImg.src = "./images/ballPointer_" + ballFileNameArr[userBallArr[0].colorNum] + ".png";
    pointerImg.style.width = ballRadius + "px";
    pointerImg.style.height = ballRadius * 30 + "px";
    pointerImg.style.position = "absolute";
    pointerImg.style.left = parseInt(backgroundDiv.style.width) / 2 - parseInt(pointerImg.style.width) / 2 + "px";
    pointerImg.style.top = parseInt(backgroundDiv.style.height) - ballRadius * 3 - parseInt(pointerImg.style.height) + "px";
    pointerImg.style.transformOrigin = "bottom";
    backgroundDiv.appendChild(pointerImg);
}

function createGameBalls() {
    // 11개의 gameBall 만들고 남는 화면 여분 공간 2등분(각 줄 시작 위치 조절)
    var gap = (parseInt(backgroundDiv.style.width) - ballRadius * 2 * 11) / 2;

    // gameBallArr에 1차원으로 GameBall 객체 생성
    for (var i = 0; i < gameBallRow; i++) {
        for (var j = 0; j < (i % 2 == 0 ? 11 : 10); j++) {
            var randomColorNum = parseInt(Math.random() * ballFileNameArr.length);
            // var randomColorNum = gameBallColorMapArr[i][j];
            // if (randomColorNum != 9) {
            var gbTemp = new GameBall(
                randomColorNum,
                "./images/ball_" + ballFileNameArr[randomColorNum] + ".png",
                backgroundDiv,  //container / backgroundDiv
                gap + (1 + 2 * j + i % 2) * ballRadius,    //centerX / gap + 1*r : 기본적으로 띄워질 부분, 2*j*r : 몇번째 공인지에 따라 간격 넓어짐, i%2*r : 한줄씩 번갈아가면서 갯수가 달라짐 
                -screen.height + ballRadius * 14 + (ballRadius + i * (5 / 3 * ballRadius)),
                //centerY / screen.height만큼 화면 위로(-방향으로) 이동, ballRadius*10만큼만 아래로(+방향으로) 이동 [여기까지 기본 위치], r : centerY값은 기본 위치에서 반지름만큼 떨어져있음, i*(5/3)*r : 몇번째 공인지에 따라 간격 넓어짐
                ballRadius);    //radius

            gameBallArr.push(gbTemp);
            // }
        }
    }
}

function listenEvent() {
    window.addEventListener("click", function (e) {
        // spacebar 누르면 지금 슈팅 가능한 상태인지 확인
        if (userBallShootReadyFlag) {
            //다음 볼 슈팅 비활성화
            userBallShootReadyFlag = false;

            // 현재 포인터 각도에 따라 슈팅할 볼 velX, velY 값 설정
            var degreeNegative = 1;
            if (pointerImgRotateDeg < 0) {
                degreeNegative = -1;
            }
            userBallArr[0].velX = ballSpeed * degreeNegative / Math.tan(Math.PI / 180 * (90 - degreeNegative * pointerImgRotateDeg));
            userBallArr[0].velY = -ballSpeed;

            // 슈팅하고 남은 아래 userBall들 한 칸씩 위로 이동
            moveUserBallImgs();
        }
    });
}

function moveUserBallImgs() {
    for (var i = 1; i < userBallArr.length; i++) {
        userBallArr[i].centerY -= ballRadius * 2;
    }
}

function gameLoop() {
    // 1) pointerImg 이동
    movePointerImg();

    // 2) 키보드이벤트로 바뀐 velX, velY 적용하여 (+ 벽에 부딪히는 경우 처리하여) userBall 이동
    for (var i = 0; i < userBallArr.length; i++) {
        userBallArr[i].tick();
        userBallArr[i].render();
    }

    // 3) userBall, gameBall 충돌 검사 후 삭제
    checkCollisionAfterShootUserBall();


    // 4) gameBall 이동

    // if (userBallShootReadyFlag) {
    //     // userBall 이동 중(readyFlag가 false일 때) gameBallImg들이 움직이면 충돌 오류 -> 그래도 오류 有
    gameBallImgsMoveCount++;
    // }
    if (gameBallImgsMoveCount >= (gameBallMoveSpeed / gameSpeed)) {
        for (var i = 0; i < gameBallArr.length; i++) {
            // gameBallArr[i].tick();
            // 새로 gameBallArr에 추가된 userBall의 tick()은 GameBall tick()이 아니라 UserBall tick()이기때문에 움직이지 않는다

            moveGameBallImgs(i);
            gameBallArr[i].render();
        }
        gameBallImgsMoveCount = 0;
    }

    gameLoopVar = setTimeout("gameLoop()", gameSpeed);
    // 7000ms(7s)후에 gameLoop() 호출(재귀호출형태)

    for (var i = 0; i < gameBallArr.length; i++) {
        if (checkGameOver(i)) {
            break;
        }
    }

    checkGameClear();


}

function movePointerImg() {
    pointerImg.src = "./images/ballPointer_" + ballFileNameArr[userBallArr[0].colorNum] + ".png";

    if (userBallShootReadyFlag) {
        if (pointerImgRotateDeg > 70 || pointerImgRotateDeg < -70) {
            pointerImgSpeed *= -1;
        }

        pointerImgRotateDeg += pointerImgSpeed;

        pointerImg.style.transform = "rotate(" + pointerImgRotateDeg + "deg)";

    }
}

function checkCollisionAfterShootUserBall() {
    // 공의 좌상단부터 gameBall이 push된 배열이기때문에 userBall이 가장 먼저 만날 수 있는 gameBall은 아랫줄(배열의 뒷 번호 인덱스)부터 -> 반복문 내림차순
    for (var i = gameBallArr.length - 1; i >= 0; i--) {
        // shooting된 userBall은 항상 0번째(발사 후 userBallArr에서 splice하기 때문에)
        // 충돌했을 경우
        if (ballCollisionCheck(gameBallArr[i], userBallArr[0])) {

            console.log("collision! gameBall : " + ballFileNameArr[gameBallArr[i].colorNum] + ", userBall : " + ballFileNameArr[userBallArr[0].colorNum]);

            // 같은 색일 경우 : userBall, gameBall 삭제 -> 삭제된 gameBall 주변 gameBall 반복 검사 후 삭제체크할배열에 삭제된 gameBall push
            if (gameBallArr[i].colorNum == userBallArr[0].colorNum) {
                removeCheckGameBallArr.push(gameBallArr[i]);
                backgroundDiv.removeChild(gameBallArr[i].img);
                gameBallArr.splice(i, 1);
                gameScore += 20;
                scoreDiv.innerHTML = "GOAL : " + gameGoalScore + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSCORE : " + gameScore;
                // console.log("remove shooted userball");
                console.log("userBall remove -> score : " + gameScore);

                // 반복작업하여 연쇄삭제
                while (true) {

                    if (removeCheckGameBallArr.length == 0) {
                        break;
                    }

                    // 부딪힌 게임볼, 그 게임볼 주변 여섯개의 게임볼(총 7개)을 색상 검사하여 removeChild, gameBallArr에서 삭제
                    var scoreTemp = checkColorAroundRemovedBall(backgroundDiv, gameBallArr, removeCheckGameBallArr, removeCheckGameBallArr[0]);
                    // console.log(checkColorAroundRemovedBall(backgroundDiv, gameBallArr, removeCheckGameBallArr, removeCheckGameBallArr[0]));

                    console.log("same color scoreTemp : " + scoreTemp);

                    gameScore += scoreTemp;
                    scoreDiv.innerHTML = "GOAL : " + gameGoalScore + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSCORE : " + gameScore;
                    console.log("same color while remove -> score : " + gameScore);
                    

                }

                // 발사했던 userBall도 removeChild
                backgroundDiv.removeChild(userBallArr[0].img);
            }

            // 다른 색일 경우
            else {
                // 발사된 userBall 멈추기

                // userBallArr[0].centerY = gameBallArr[i].centerY + (5 / 3 * ballRadius);

                // if (userBallArr[0].centerX < gameBallArr[i].centerX) {
                //     userBallArr[0].centerX = gameBallArr[i].centerX - ballRadius;
                // } else {
                //     userBallArr[0].centerX = gameBallArr[i].centerX + ballRadius;
                // }

                setShootedBallCenterValue(gameBallArr[i], userBallArr[0]);

                userBallArr[0].render();

                userBallArr[0].velX = 0;
                userBallArr[0].velY = 0;

                // userBallArr -> gameBallArr에 새로 추가
                gameBallArr.push(userBallArr[0]);

                // 발사된 userBall이 처음으로 충돌한 gameBall과 다른 색이기때문에 정렬되어 부착 -> 정렬 후 같은 색을 만날 경우
                removeCheckGameBallArr.push(userBallArr[0]);
                // 반복작업하여 연쇄삭제

                while (true) {

                    if (removeCheckGameBallArr.length == 0) {
                        break;
                    }

                    // 부딪힌 게임볼, 그 게임볼 주변 여섯개의 게임볼(총 7개)을 색상 검사하여 removeChild, gameBallArr에서 삭제
                    var scoreTemp = checkColorAroundRemovedBall(backgroundDiv, gameBallArr, removeCheckGameBallArr, removeCheckGameBallArr[0]);
                    // console.log(checkColorAroundRemovedBall(backgroundDiv, gameBallArr, removeCheckGameBallArr, removeCheckGameBallArr[0]));
                    console.log("different color scoreTemp : " + scoreTemp);
                    gameScore += scoreTemp;
                    scoreDiv.innerHTML = "GOAL : " + gameGoalScore + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSCORE : " + gameScore;
                    console.log("different color while remove -> score : " + gameScore);

                }

            }
            // userBallArr에서 삭제
            userBallArr.splice(0, 1);

            // 다음 userBall shooting 활성화
            userBallShootReadyFlag = true;
            break;
        }
    }
}

function setShootedBallCenterValue(gb, ub) {
    var ux = ub.centerX;
    var uy = ub.centerY;
    var gx = gb.centerX;
    var gy = gb.centerY;

    var tx, ty;
    var tBallColorNum = 9;

    while (true) {

        // console.log("tBallColorNum : " + tBallColorNum);

        if (ux < gx) {
            tx = gx - ballRadius;
        } else {
            tx = gx + ballRadius;
        }

        ty = gy + (5 / 3 * ballRadius);

        // console.log("tx : " + tx + "   ty : " + ty);

        // if (uy < gy - 5/3*ballRadius) {
        //     ty = gy - 5/3*ballRadius;
        // } else if (uy < gy + 5/3*ballRadius) {
        //     ty = gy;
        // } else {
        //     ty = gy + 5/3*ballRadius;
        // }

        for (var i = gameBallArr.length - 1; i >= 0; i--) {
            if (gameBallArr[i].centerX == tx && gameBallArr[i].centerY == ty) {
                tBallColorNum = gameBallArr[i].colorNum;
                console.log("tBallColorNum : " + tBallColorNum);
                break;
            }
        }

        if (tBallColorNum == 9) {
            userBallArr[0].centerX = tx;
            userBallArr[0].centerY = ty;
            console.log("userBall center set");
            break;
        } else {
            gx = tx;
            gy = ty;
            // userBallArr[0].centerX = tx;
            // userBallArr[0].centerY = ty + 5/3*ballRadius;
            console.log("gx = tx / gy = ty");
            tBallColorNum = 9;
            // break;

        }
    }


}

function moveGameBallImgs(i) {
    // gameLoop() 돌 때마다 gameBallDiv는 공 지름크기만큼 아래로 내려옴
    // gameBallDiv.style.top = parseInt(gameBallDiv.style.top) + ballRadius * 2 + "px";

    gameBallArr[i].centerY += ballRadius;


}

function checkGameOver(i) {
    var gameOverFlag = gameBallArr[i].centerY >= parseInt(backgroundDiv.style.height) - ballRadius * 6;
    if (gameOverFlag) {
        clearTimeout(gameLoopVar);
        console.log("game over");
        createGameOverOrClearImg(0);
    }
    return gameOverFlag;
}

function checkGameClear() {
    if (gameScore >= gameGoalScore) {
        clearTimeout(gameLoopVar);
        console.log("game clear");
        createGameOverOrClearImg(1);
    }
}

function createGameOverOrClearImg(n) {
    scoreDiv.innerHTML = "GOAL : " + gameGoalScore + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSCORE : " + gameScore;

    var background = document.createElement("img");
    // n == 0 : gameOver , n == 1 : gameClear
    background.src = "./images/gameClearBackground.png";
    background.style.width = parseInt(backgroundDiv.style.width) + "px";
    background.style.height = parseInt(backgroundDiv.style.height) + "px";
    background.style.position = "absolute";
    background.style.left = background.style.top = 0 + "px";
    backgroundDiv.appendChild(background);

    var img = document.createElement("img");
    // n == 0 : gameOver , n == 1 : gameClear
    img.src = (n == 0) ? "./images/gameOver.png" : "./images/gameClear.png";
    img.style.width = parseInt(backgroundDiv.style.width) / 2 + "px";
    img.style.height = parseInt(backgroundDiv.style.width) / 2 + "px";
    img.style.position = "absolute";
    img.style.left = parseInt(backgroundDiv.style.width) / 2 - parseInt(img.style.width) / 2 + "px";
    img.style.top = parseInt(backgroundDiv.style.height) / 2 - parseInt(img.style.height) / 2 + "px";
    backgroundDiv.appendChild(img);
}
