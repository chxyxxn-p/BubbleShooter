class UserBall extends Ball{
    constructor(colorNum, src, container, centerX, centerY, radius){
        super(colorNum, src, container, centerX, centerY, radius);

        this.velX = 0;
        this.velY = 0;
    }

    tick(){
        this.centerX += this.velX;
        this.centerY += this.velY;

        if (this.centerX+this.radius > parseInt(this.container.style.width)
            || this.centerX-this.radius < 0){
            this.velX *= (-1);
        }

        if (this.centerY+this.radius > parseInt(this.container.style.height)
            || this.centerY-this.radius < 0){
            this.velY *= (-1);
        }

        for (var j = 0; j < gameBallArr.length; j++) {
            for (var i = 0; i < gameBallArr[j].length; i++) {
    
                var result = ballCollisionCheck(gameBallArr[j][i], this);
                if(result){
                    console.log("collision!");
                }
            }
        }

    }

    render(){
        
        super.render();
        
    }
}