function getDistanceBetweenTwoCircles(ball1, ball2){
    var x1 = ball1.centerX;
    var y1 = ball1.centerY;

    var x2 = ball2.centerX;
    var y2 = ball2.centerY;

    var d = Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) );
    
    return d;
}