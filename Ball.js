class Ball{
    constructor(backgroundDiv, centerX, centerY){
        this.backgroundDiv = backgroundDiv;
        this.img = document.createElement("img");

        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = 10;

        this.img.src = "../images/ball_temp.png";

        this.img.style.position = "absolute";

        this.img.style.width = this.img.style.height = this.radius + "px";
        this.img.style.left = this.centerX - this.radius/2 + "px";
        this.img.style.top = this.centerY - this.radius/2 + "px";

        this.backgroundDiv.appendChild(this.img);

        
        
        
    }
}