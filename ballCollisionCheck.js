function ballCollisionCheck(ball1, ball2){

    var d = getDistanceBetweenTwoCircles(ball1, ball2);
    
    var result = (d <= ball1.radius + ball2.radius);

    return result;
}