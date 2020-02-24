// Liberapp 2020 - Tahiti Katagai
// タイル

const TilePerW = 0.20;
const TilePerH = 0.25;
const TileColor = 0x000000;

class Tile extends GameObject{

    static tiles:Tile[] = [];

    sizeW:number;
    sizeH:number;

    tapX:number;
    tapY:number;

    constructor( x:number, y:number ) {
        super();

        Tile.tiles.push(this);
        this.sizeW = Util.w(TilePerW);
        this.sizeH = Util.h(TilePerH);
        this.setShape(x, y);
        GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
    }

    onDestroy(){
        Tile.tiles = Tile.tiles.filter( obj => obj != this );
        GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
    }

    setShape(x:number, y:number){
        this.display = new egret.Shape();
        GameObject.gameDisplay.addChild(this.display);
        let shape = this.display as egret.Shape;
        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill(TileColor);
        shape.graphics.drawRoundRect(-0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH, this.sizeW*0.2);
        shape.graphics.endFill();
    }

    touchBegin(e:egret.TouchEvent){
        this.tapX = e.localX;
        this.tapY = e.localY;
    }

    update() {
        this.Y += Game.I.speed;

        if( this.checkTouch() ) {
            this.destroy();
        }

        if( this.Y >= Util.height + this.sizeH * 0.5 ){
            // todo ミス処理
            this.destroy();
        }

        this.tapX = this.tapY = 0;
    }

    checkTouch() : boolean {
        if( this.tapX > 0 ){
            if( (this.tapX - this.X ) ** 2 < (this.sizeW*0.5) ** 2 &&
                (this.tapY - this.Y ) ** 2 < (this.sizeH*0.5) ** 2 ){
                return true;
            }
        }
        return false;
    }
}

