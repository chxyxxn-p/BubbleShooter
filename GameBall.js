class GameBall extends Ball{
    constructor(colorNum, src, container, centerX, centerY, radius){
        super(colorNum, src, container, centerX, centerY, radius);

    }
    
    tick(){
        this.centerY += this.radius;
    }

    render(){

        super.render();

    }
}