class Ball{
    constructor(colorNum, src, container, centerX, centerY, radius){
        this.container = container;

        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;

        this.img = document.createElement("img");
        this.img.src = src;
        this.img.style.position = "absolute";
        this.img.style.width = this.img.style.height = this.radius * 2 + "px";
        this.img.style.left = this.centerX - this.radius + "px";
        this.img.style.top = this.centerY - this.radius + "px";
        this.container.appendChild(this.img); 
      
        this.colorNum = colorNum;

        this.collisionFlag = false;
        this.removeFlag = false;
      }

      tick(){
        //collision check method

        
      }

      render(){
        if(this.collisionFlag && !this.removeFlag){
          this.container.removeChild(this.img);
          
          this.removeFlag = true;
        }

        this.img.style.left = this.centerX - this.radius + "px";
        this.img.style.top = this.centerY - this.radius + "px";
      }
}