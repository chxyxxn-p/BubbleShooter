var backgroundDiv;
var ballRadius;
var gameBallDiv;
var gameBallArr = new Array();

    window.addEventListener("load", function(){            
        bodyLayoutInit();
        createUserBallShooter();
        createGameBalls();
        gameLoop();
    });

    function bodyLayoutInit(){
        // body style
        document.body.style.margin = 0+"px";
        document.body.style.position = "relative";

        // backgroundDiv create, style
        backgroundDiv = document.createElement("div");
        backgroundDiv.style.width = parseInt(screen.height/1.7)+"px";
        backgroundDiv.style.height = screen.height+"px";
        backgroundDiv.style.position = "relative";
            // backgroundDiv.style.left = 0 + "px";
            // backgroundDiv.style.top = 0 + "px";
        backgroundDiv.style.margin = "auto";
        backgroundDiv.style.backgroundImage = "url('./images/background_temp.png')";
        document.body.appendChild(backgroundDiv);

        // ballRadius value set (backgroundDiv width값이 정해진 후 비율에 맞도록)
        ballRadius = parseInt(parseInt(backgroundDiv.style.width) /11) /2;

        // gameBallDiv create, style
        gameBallDiv = document.createElement("div");
        gameBallDiv.style.width = parseInt(backgroundDiv.style.width)+"px";
            // gameBallDiv.style.height = ballRadius*2 *30 + "px";
        gameBallDiv.style.position = "absolute";
        gameBallDiv.style.left = backgroundDiv.style.left;
        gameBallDiv.style.top = (-1) * ballRadius*2 *25 + "px";
            // gameBallDiv.style.margin = "auto";
            // gameBallDiv.style.overflow = "hidden";
        backgroundDiv.appendChild(gameBallDiv);
    }

    function createUserBallShooter(){
    }

    function createGameBalls(){
        // 11개의 gameBall 만들고 남는 화면 여분 공간 2등분(각 줄 시작 위치 조절)
        var gap = (parseInt(backgroundDiv.style.width)-ballRadius*2*11) /2;

        // gameBallArr에 2차원으로 GameBall 객체 push
        for(var i = 0 ; i < 30; i++){
            var tempArr = [];
            for(var j = 0 ; j < (i%2 == 0 ? 11 : 10) ; j++){
                var gbTemp = new GameBall(gameBallDiv,  //cntainer / 각 GameBall img는 gameBallDiv에 부착(gameBallDiv는 backgroundDiv에 부착되어있음)
                    gap+ (2*j + 1 + i%2)*ballRadius,    //centerX / gap + 1*r : 기본적으로 띄워질 부분, 2*j*r : 몇번째 공인지에 따라 간격 넓어짐, i%2*r : 한줄씩 번갈아가면서 갯수가 달라짐 
                    (2*i + 1)*ballRadius - i*(ballRadius/2 - 5),    //centerY : 1*r : 기본적으로 띄워질 부분, 2*i*r : 몇번째 공인지에 따라 간격 넓어짐 - i*(r/2 -5) : 엇갈려있는 공 밀착시키기 위해 소량 이동
                    ballRadius);    //radius
                tempArr.push(gbTemp);   //각 줄 마다 tempArr 새로 만들고
            }
            gameBallArr.push(tempArr);  //tempArr를 통으로 gameBallArr에 push -> 2차원배열 형태
        }
    }

    function moveGameBallDiv(){
        // gameLoop() 돌 때마다 gameBallDiv는 공 지름크기만큼 아래로 내려옴
        gameBallDiv.style.top = parseInt(gameBallDiv.style.top) + ballRadius * 2 + "px";
    }

    function gameLoop(){
        console.log("gameLoop() called...");
        moveGameBallDiv();

        // 7000ms(7s)후에 gameLoop() 호출(재귀호출형태)
        setTimeout("gameLoop()", 7000);
    }
