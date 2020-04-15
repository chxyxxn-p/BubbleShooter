class Ball{
    constructor(container, centerX, centerY, radius){
        this.container = container;
        this.img = document.createElement("img");

        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;

        this.img.src = "./images/ball_temp.png";

        this.img.style.position = "absolute";

        this.img.style.width = this.img.style.height = this.radius * 2 + "px";
        this.img.style.left = this.centerX - this.radius + "px";
        this.img.style.top = this.centerY - this.radius + "px";

        this.container.appendChild(this.img); 
      }
}