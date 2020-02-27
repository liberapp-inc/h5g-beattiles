// Liberapp 2020 - Tahiti Katagai
// タイル大

const tileBigScale = 2;

class TileBig extends Tile{

    hp:number = 10;

    constructor( x:number, y:number ) {
        super( x, y );

        this.sizeW *= tileBigScale;
        this.sizeH *= tileBigScale;
        this.display.scaleX = this.display.scaleY = tileBigScale;
    }

    onDestroy(){
        Tile.tiles = Tile.tiles.filter( obj => obj != this );
    }

    update() {
        if( this.checkTouch() ) {
            if( (--this.hp) <= 0 ){
                this.defeated();
                return;
            }
            Game.I.speed = 0;
            for( let i=0 ; i<4 ; i++ ){
                new Debris( Game.I.tapX, Game.I.tapY );
            }
        }

        this.Y += Game.I.speed;

        // 通過みのがし
        if( this.checkFall() ){
            this.destroy();
        }
    }

    defeated(){
        this.destroy();
        for( let i=0 ; i<30 ; i++ ){
            new Debris( this.X, this.Y );
        }
    }
}

