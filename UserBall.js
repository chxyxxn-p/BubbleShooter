class UserBall extends Ball{
    constructor(src, container, centerX, centerY, radius){
        super(src, container, centerX, centerY, radius);

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

    }

    render(){
        
        super.render();
        this.img.style.left = this.centerX - this.radius + "px";
        this.img.style.top = this.centerY - this.radius + "px";
    }
}