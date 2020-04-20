function checkColorAroundRemovedBall(backgroundDiv, gameBallArr, removeCheckGameBallArr, removedBall){
    var x = removedBall.centerX;
    var y = removedBall.centerY;
    var r = removedBall.radius;

    var scoreTemp = 0;

    for(var i = gameBallArr.length-1 ; i >= 0 ; i--){
        
        if((gameBallArr[i].centerX == x - r && gameBallArr[i].centerY == y - 5/3*r)
        ||(gameBallArr[i].centerX == x + r && gameBallArr[i].centerY == y - 5/3*r)
        ||(gameBallArr[i].centerX == x - 2*r && gameBallArr[i].centerY == y)
        ||(gameBallArr[i].centerX == x && gameBallArr[i].centerY == y)
        ||(gameBallArr[i].centerX == x + 2*r && gameBallArr[i].centerY == y)
        ||(gameBallArr[i].centerX == x - r && gameBallArr[i].centerY == y + 5/3*r)
        ||(gameBallArr[i].centerX == x + r && gameBallArr[i].centerY == y + 5/3*r)){

            if(gameBallArr[i].colorNum == removedBall.colorNum){

                removeCheckGameBallArr.push(gameBallArr[i]);
                backgroundDiv.removeChild(gameBallArr[i].img);
                gameBallArr.splice(i,1);
                scoreTemp += 10;
            }
        }
    }

    removeCheckGameBallArr.splice(0, 1);

    return scoreTemp;
}