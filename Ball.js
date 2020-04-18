class Ball{
    constructor(src, container, centerX, centerY, radius){
        this.container = container;
        this.img = document.createElement("img");

        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;

        this.img.src = src;

        this.img.style.position = "absolute";

        this.img.style.width = this.img.style.height = this.radius * 2 + "px";
        this.img.style.left = this.centerX - this.radius + "px";
        this.img.style.top = this.centerY - this.radius + "px";

        this.container.appendChild(this.img); 
      
        this.collisionFlag = false;
      }

      tick(){
        //collision check method
      }

      render(){
        if(this.collisionFlag){
          this.container.removeChild(this.img);
          
          this.collisionFlag = false;
        }
      }
}