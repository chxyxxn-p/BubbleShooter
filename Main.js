var ballFileNameArr = ["red", "yellow", "green", "blue", "purple"];

var ballRadius;
var ballRow = 20;

var backgroundDiv;
var gameBallDiv;
var pointerImg;

var gameBallArr = new Array();
var userBallArr = new Array();

var gameBallDivMoveCount = 0;

window.addEventListener("load", function () {
    bodyLayoutInit();
    createUserBallShooter();
    createGameBalls();
    listenMouseEvent();
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

    // gameBallDiv create, style
    gameBallDiv = document.createElement("div");
    gameBallDiv.style.width = parseInt(backgroundDiv.style.width) + "px";
    // gameBallDiv.style.height = ballRadius*2 *30 + "px";
    gameBallDiv.style.position = "absolute";
    gameBallDiv.style.left = backgroundDiv.style.left;
    gameBallDiv.style.top = (-1) * (2 * ballRadius - 8) * (ballRow - 3) + "px";
    // gameBallDiv.style.margin = "auto";
    // gameBallDiv.style.overflow = "hidden";
    backgroundDiv.appendChild(gameBallDiv);
}

function createUserBallShooter() {
    // shooter 생성
    // 1) 받침대

    // 2) 화살표
    pointerImg = document.createElement("img");
    pointerImg.src = "./images/pointer.png";
    pointerImg.style.width = ballRadius + "px";
    pointerImg.style.height = ballRadius * 7 + "px";
    pointerImg.style.position = "absolute";
    pointerImg.style.left = parseInt(backgroundDiv.style.width) / 2 - parseInt(pointerImg.style.width) / 2 + "px";
    pointerImg.style.top = parseInt(backgroundDiv.style.height) - ballRadius * 3 - parseInt(pointerImg.style.height) + "px";
    backgroundDiv.appendChild(pointerImg);

    // gameBallRow 수 만큼 userBall 생성
    for (var i = 0; i < ballRow; i++) {
        var gbTemp = new UserBall(
            "./images/ball_" + ballFileNameArr[parseInt(Math.random() * 5)] + ".png",
            backgroundDiv,  //container
            parseInt(backgroundDiv.style.width) / 2 + i * 2 * ballRadius,    //centerX / 첫번째 공이 backgroundDiv 중앙에 위치하고 그 오른쪽에 연달아 위치
            parseInt(backgroundDiv.style.height) - ballRadius * 3,    //centerY / backgroundDiv와 공 1개만큼의 거리를 둠
            ballRadius);    //radius
        userBallArr.push(gbTemp);  //userBallArr에 push
    }
}
function createGameBalls() {
    // 11개의 gameBall 만들고 남는 화면 여분 공간 2등분(각 줄 시작 위치 조절)
    var gap = (parseInt(backgroundDiv.style.width) - ballRadius * 2 * 11) / 2;

    // gameBallArr에 2차원으로 GameBall 객체 생성
    for (var i = 0; i < ballRow; i++) {
        var tempArr = [];
        for (var j = 0; j < (i % 2 == 0 ? 11 : 10); j++) {
            var gbTemp = new GameBall(
                "./images/ball_" + ballFileNameArr[parseInt(Math.random() * 5)] + ".png",
                gameBallDiv,  //container / 각 GameBall img는 gameBallDiv에 부착(gameBallDiv는 backgroundDiv에 부착되어있음)
                gap + (2 * j + 1 + i % 2) * ballRadius,    //centerX / gap + 1*r : 기본적으로 띄워질 부분, 2*j*r : 몇번째 공인지에 따라 간격 넓어짐, i%2*r : 한줄씩 번갈아가면서 갯수가 달라짐 
                (ballRadius + i * (2 * ballRadius - 8)),    //centerY / r : 기본적으로 띄워질 부분, i* : 몇번째 공인지, (2*r - 8) : 엇갈려있는 공 밀착시키기 위해 지름보다 조금 작게 centerY값 위치시킴
                ballRadius);    //radius
            tempArr.push(gbTemp);   //각 줄 마다 tempArr 새로 만들고
        }
        gameBallArr.push(tempArr);  //tempArr를 통으로 gameBallArr에 push -> 2차원배열 형태
    }
}

function moveGameBallDiv() {
    // gameLoop() 돌 때마다 gameBallDiv는 공 지름크기만큼 아래로 내려옴
    gameBallDiv.style.top = parseInt(gameBallDiv.style.top) + ballRadius * 2 + "px";
}

function listenMouseEvent() {
    document.addEventListener("mousemove", function () {
        // 기존 위치와 마우스 커서 위치 각도 구해서
        // pointerImg.style.rotate?

    });

    document.addEventListener("click", function () {
        // userBall 지금 것 발사하고
        // userBallArr 다음것들 왼쪽으로 한칸씩이동
        userBallArr[0].velX = 10;
        userBallArr[0].velY = -10;

        

    });
}

function gameLoop() {
    console.log("gameLoop() called...");

    gameBallDivMoveCount++;
    if (gameBallDivMoveCount == 140) {
        moveGameBallDiv();
        gameBallDivMoveCount = 0;
    }

    for(var i = 0 ; i < userBallArr.length ; i++){
        userBallArr[i].tick();
        userBallArr[i].render();
    }





    // 7000ms(7s)후에 gameLoop() 호출(재귀호출형태)
    setTimeout("gameLoop()", 50);
}
