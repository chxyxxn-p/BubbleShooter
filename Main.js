var ballFileNameArr = ["red", "yellow", "green", "blue", "purple"];

var ballRadius;

var ballRow = 20;
var gameSpeed = 20;

var backgroundDiv;
// var gameBallDiv;
var pointerImg;

var gameBallArr = new Array();
var userBallArr = new Array();

var gameBallImgsMoveCount = 0;

var pointerImgSpeed = 2;
var pointerImgRotateDeg = 0;

var userBallShootReadyFlag = true;

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

    // backgroundDiv create, style
    backgroundDiv = document.createElement("div");
    backgroundDiv.style.width = parseInt(screen.height / 1.7) + "px";
    backgroundDiv.style.height = screen.height + "px";
    backgroundDiv.style.position = "relative";
    // backgroundDiv.style.left = 0 + "px";
    // backgroundDiv.style.top = 0 + "px";
    backgroundDiv.style.margin = "auto";
    backgroundDiv.style.overflow = "hidden";
    backgroundDiv.style.backgroundImage = "url('./images/background_temp.png')";
    document.body.appendChild(backgroundDiv);

    // ballRadius value set (backgroundDiv width값이 정해진 후 비율에 맞도록)
    ballRadius = parseInt(parseInt(backgroundDiv.style.width) / 11) / 2;

    // // gameBallDiv create, style
    // gameBallDiv = document.createElement("div");
    // gameBallDiv.style.width = parseInt(backgroundDiv.style.width) + "px";
    // // gameBallDiv.style.height = ballRadius*2 *30 + "px";
    // gameBallDiv.style.position = "absolute";
    // gameBallDiv.style.left = backgroundDiv.style.left;
    // gameBallDiv.style.top = (-1) * (2 * ballRadius - 8) * (ballRow - 3) + "px";
    // // gameBallDiv.style.margin = "auto";
    // // gameBallDiv.style.overflow = "hidden";
    // backgroundDiv.appendChild(gameBallDiv);
}

function createUserBallShooter() {
    // 1) 화살표
    pointerImg = document.createElement("img");
    pointerImg.src = "./images/pointer.png";
    pointerImg.style.width = ballRadius + "px";
    pointerImg.style.height = ballRadius * 7 + "px";
    pointerImg.style.position = "absolute";
    pointerImg.style.left = parseInt(backgroundDiv.style.width) / 2 - parseInt(pointerImg.style.width) / 2 + "px";
    pointerImg.style.top = parseInt(backgroundDiv.style.height) - ballRadius * 3 - parseInt(pointerImg.style.height) + "px";
    pointerImg.style.transformOrigin = "bottom";
    backgroundDiv.appendChild(pointerImg);

    // 2) gameBallRow 수 만큼 userBall 생성
    for (var i = 0; i < ballRow; i++) {
        var randomColorNum = parseInt(Math.random() * 5);
        var gbTemp = new UserBall(
            randomColorNum,
            "./images/ball_" + ballFileNameArr[randomColorNum] + ".png",
            backgroundDiv,  //container
            parseInt(backgroundDiv.style.width) / 2,    //centerX / backgroundDiv 중앙에 위치
            parseInt(backgroundDiv.style.height) - ballRadius * 3 + i * 2 * ballRadius,    //centerY / backgroundDiv와 공 1개만큼의 거리를 두고 첫번째 공 아래로 연달아 위치
            ballRadius);    //radius
        userBallArr.push(gbTemp);  //userBallArr에 push
    }

    //3) shooter 받침대

}

function createGameBalls() {
    // 11개의 gameBall 만들고 남는 화면 여분 공간 2등분(각 줄 시작 위치 조절)
    var gap = (parseInt(backgroundDiv.style.width) - ballRadius * 2 * 11) / 2;

    // gameBallArr에 2차원으로 GameBall 객체 생성
    for (var i = 0; i < ballRow; i++) {
        for (var j = 0; j < (i % 2 == 0 ? 11 : 10); j++) {
            var randomColorNum = parseInt(Math.random() * 5);
            var gbTemp = new GameBall(
                randomColorNum,
                "./images/ball_" + ballFileNameArr[randomColorNum] + ".png",
                backgroundDiv,  //container / 각 GameBall img는 gameBallDiv에 부착(gameBallDiv는 backgroundDiv에 부착되어있음) -> backgroundDiv
                gap + (2 * j + 1 + i % 2) * ballRadius,    //centerX / gap + 1*r : 기본적으로 띄워질 부분, 2*j*r : 몇번째 공인지에 따라 간격 넓어짐, i%2*r : 한줄씩 번갈아가면서 갯수가 달라짐 
                -(screen.height - ballRadius * 10) + (ballRadius + i * (5 / 3 * ballRadius)),    //centerY / r : 기본적으로 띄워질 부분, i* : 몇번째 공인지, (2*r - 8) : 엇갈려있는 공 밀착시키기 위해 지름보다 조금 작게 centerY값 위치시킴
                ballRadius);    //radius
            gameBallArr.push(gbTemp);
        }
    }
}

function listenEvent() {
    window.addEventListener("keydown", function (e) {
        if (e.keyCode == 32) {
            if (userBallShootReadyFlag) {
                userBallShootReadyFlag = false;
                userBallArr[0].velX = 5;
                userBallArr[0].velY = -5;
                moveUserBallImgs();
            }

        }
    });
}

function moveUserBallImgs() {
    for (var i = 0; i < userBallArr.length; i++) {
        userBallArr[i].centerY -= ballRadius * 2;
    }
}

function gameLoop() {
    // console.log("gameLoop() called...");

    gameBallImgsMoveCount++;
    if (gameBallImgsMoveCount == 7000 / 20) {
        moveGameBallImgs();
        gameBallImgsMoveCount = 0;
    }

    movePointerImg();

    for (var i = 0; i < userBallArr.length; i++) {
        checkAfterShootUserBall();
        userBallArr[i].tick();
        userBallArr[i].render();
    }

    for (var i = 0; i < gameBallArr.length; i++) {

        gameBallArr[i].tick();
        gameBallArr[i].render();
    }


    // 7000ms(7s)후에 gameLoop() 호출(재귀호출형태)
    setTimeout("gameLoop()", gameSpeed);
}

function moveGameBallImgs() {
    // gameLoop() 돌 때마다 gameBallDiv는 공 지름크기만큼 아래로 내려옴
    // gameBallDiv.style.top = parseInt(gameBallDiv.style.top) + ballRadius * 2 + "px";

    for (var i = 0; i < gameBallArr.length; i++) {
        gameBallArr[i].centerY += ballRadius;
    }
}

function movePointerImg() {
    if (pointerImgRotateDeg > 70 || pointerImgRotateDeg < -70) {
        pointerImgSpeed *= -1;
    }

    pointerImgRotateDeg += pointerImgSpeed;

    pointerImg.style.transform = "rotate(" + pointerImgRotateDeg + "deg)";

}

function checkAfterShootUserBall() {
    for (var i = 0; i < gameBallArr.length; i++) {

        if (ballCollisionCheck(gameBallArr[i], userBallArr[0])) {
            if (gameBallArr[i].colorNum == userBallArr[0].colorNum) {

                // removeChild
                backgroundDiv.removeChild(gameBallArr[i]);
                backgroundDiv.removeChild(userBallArr[0]);

                gameBallArr.splice(i, 1);
            } else {
                userBallArr[0].velX = 0;
                userBallArr[0].velY = 0;

                // while(true){
                //     if(userBallArr[n].centerY - gameBallArr[i].centerY >= 5/3 * ballRadius){
                //         break;
                //     }
                    
                //     userBallArr[n].centerY  += 0.01;
                // }

                gameBallArr.push(userBallArr[0]);
            }
            userBallArr.splice(0, 1);
            userBallShootReadyFlag = true;
            break;
        }
    }
}
