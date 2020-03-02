// Liberapp 2020 - Tahiti Katagai
// タイルロング

const TileLongLength = 3;

class TileLong extends Tile{

    length:number = TileLongLength;

    constructor( x:number, y:number ) {
        super( x, y );

        this.Y += this.sizeH*0.5;
        this.sizeH *= this.length;
        this.Y -= this.sizeH*0.5;
        this.display.scaleX = 0.8;
        this.display.scaleY = this.length;
    }

    onDestroy(){
        Tile.tiles = Tile.tiles.filter( obj => obj != this );
    }

    update() {
        if( GameOver.I ) return;
        
        this.display.anchorOffsetX *= 0.5;
        this.display.anchorOffsetY *= 0.5;

        if( this.checkTouching() ) {
            this.sizeH -= Game.I.speed;
            this.display.scaleY -= Game.I.speed / Util.h(TilePerH);
            this.Y -= Game.I.speed / 2;
            if( this.sizeH <= Util.h(TilePerH*1.5) ){
                this.defeated();
                return;
            }
            if( Game.I.counter % 3 == 0 ){
                Score.I.addPoint(1);
                SoundEffect.I.play();
                this.display.anchorOffsetX = randF(-6,+6);
                this.display.anchorOffsetY = randF(-5,+5);
            }
            new Debris( this.X + randF(-this.sizeW*0.5, this.sizeW*0.5), this.Y + this.sizeH*0.5 );
        }

        this.Y += Game.I.speed;

        // 通過みのがし
        if( this.checkFall() ){
            new GameOver();
            // this.destroy();
        }
    }

    checkTouching():boolean {
        if( Game.I.touch ){
            if( (Game.I.tapX - this.X ) ** 2 < (this.sizeW*0.6) ** 2 &&
                (Game.I.tapY - this.Y ) ** 2 < (this.sizeH*0.6) ** 2 ){
                return true;
            }
        }
    }
}

