// Liberapp 2020 - Tahiti Katagai
// タイル

const TilePerW = 0.20;
const TilePerH = 0.18;
const TileColor = 0x000000;

class Tile extends GameObject{

    static tiles:Tile[] = [];

    sizeW:number;
    sizeH:number;

    constructor( x:number, y:number ) {
        super();

        Tile.tiles.push(this);
        this.sizeW = Util.w(TilePerW);
        this.sizeH = Util.h(TilePerH);
        this.setShape(x, y);
    }

    onDestroy(){
        Tile.tiles = Tile.tiles.filter( obj => obj != this );
    }

    setShape(x:number, y:number){
        this.display = new egret.Shape();
        GameObject.gameDisplay.addChild(this.display);
        let shape = this.display as egret.Shape;
        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill(TileColor);
        shape.graphics.drawRect(-0.5*this.sizeW, -0.45*this.sizeH, this.sizeW, this.sizeH*0.9 );
        shape.graphics.endFill();
    }

    update() {
        if( GameOver.I ) return;
        
        if( this.checkTouch() ) {
            this.defeated();
            return;
        }

        this.Y += Game.I.speed;

        // 通過みのがし
        if( this.checkFall() ){
            new GameOver();
            // this.destroy();
        }
    }

    checkTouch():boolean {
        if( Game.I.press ){
            if( (Game.I.tapX - this.X ) ** 2 < (this.sizeW*0.6) ** 2 &&
                (Game.I.tapY - this.Y ) ** 2 < (this.sizeH*0.6) ** 2 ){
                return true;
            }
        }
    }
    checkFall():boolean{
        // return ( this.Y >= Util.height + this.sizeH * 0.5 );
        return this.Y > Util.height;
    }

    defeated(){
        this.destroy();
        SoundEffect.I.play();
        Score.I.addPoint(10);
        for( let i=0 ; i<15 ; i++ ){
            new Debris( this.X, this.Y );
        }
    }
}

