function ballCollisionCheck(ball1, ball2){

    var d = getDistanceBetweenTwoCircles(ball1, ball2);
    
    var result = (Math.abs(d - (ball1.radius + ball2.radius)) < 1);

    return result;
}