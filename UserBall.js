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

        if (this.centerY - this.radius < - this.radius * 3) {
            this.container.removeChild(this.img);
            userBallArr.splice(0, 1);
            userBallShootReadyFlag = true;
            console.log("userBall delete");
        }

        if (this.centerY + this.radius > parseInt(this.container.style.height)){
            this.velY *= (-1);
        }
}

    render() {

        super.render();

    }
}