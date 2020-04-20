function ballCollisionCheck(ball1, ball2){

    var d = getDistanceBetweenTwoCircles(ball1, ball2);

    // if(d <= ball1.radius*3){
    //     console.log("dis with " + ballNumText  + " : " +Math.abs(d - (ball1.radius + ball2.radius)));
    // }

    var result = (Math.abs(d - (ball1.radius + ball2.radius)) < 8);

    // if(result){
    //     console.log("col with " + ballNumText);
    // }

    return result;
}