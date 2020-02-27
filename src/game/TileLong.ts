// Liberapp 2020 - Tahiti Katagai
// タイルロング

class TileLong extends Tile{

    length:number = 2;

    constructor( x:number, y:number ) {
        super( x, y );

        this.sizeH *= this.length;
        this.display.scaleY = this.length;
    }

    onDestroy(){
        Tile.tiles = Tile.tiles.filter( obj => obj != this );
    }

    update() {
        if( this.checkTouching() ) {
            this.sizeH -= Game.I.speed;
            this.display.scaleY -= Game.I.speed / Util.h(TilePerH);
            this.Y -= Game.I.speed / 2;
            if( (--this.sizeH) <= Util.h(TilePerH) ){
                this.defeated();
                return;
            }
            new Debris( Game.I.tapX, Game.I.tapY );
        }

        this.Y += Game.I.speed;

        // 通過みのがし
        if( this.checkFall() ){
            this.destroy();
        }
    }

    checkTouching():boolean {
        if( Game.I.touch ){
            if( (Game.I.tapX - this.X ) ** 2 < (this.sizeW*0.5) ** 2 &&
                (Game.I.tapY - this.Y ) ** 2 < (this.sizeH*0.5) ** 2 ){
                return true;
            }
        }
    }

    defeated(){
        this.destroy();
        for( let i=0 ; i<30 ; i++ ){
            new Debris( this.X, this.Y );
        }
    }
}

