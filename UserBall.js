class UserBall extends Ball {
    constructor(colorNum, src, container, centerX, centerY, radius) {
        super(colorNum, src, container, centerX, centerY, radius);

        this.velX = 0;
        this.velY = 0;
    }

    tick() {
        this.centerX += this.velX;
        this.centerY += this.velY;

        if (this.centerX + this.radius > parseInt(this.container.style.width)
            || this.centerX - this.radius < 0) {
            this.velX *= (-1);
        }

        if (this.centerY + this.radius > parseInt(this.container.style.height)
            || this.centerY - this.radius < 0) {
            this.velY *= (-1);
        }

        for (var j = 0; j < gameBallArr.length; j++) {
            for (var i = 0; i < gameBallArr[j].length; i++) {

                if (ballCollisionCheck(gameBallArr[j][i], this)) {
                    if (gameBallArr[j][i].colorNum == this.colorNum) {

                        // removeChild
                        console.log("this will be removed");    

                    } else {
                        this.velX = 0;
                        this.velY = 0;
                        this.centerY = gameBallArr[j][i].centerY + 5 / 3 * this.radius;
                        // gameBallArr에 추가
                    }
                }
            }
        }

    }

    render() {

        super.render();

    }
}