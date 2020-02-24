// Liberapp 2020 - Tahiti Katagai
// ゲーム

const SaveKeyBestScore = "beattiles-bestScore";
const DefaultBestScore = 50;

const BACK_COLOR = 0xf8fafc;    // index.htmlで設定
const FONT_COLOR = 0x303030;
const FONT2_COLOR = 0xe00000;
const BIKER_COLOR = 0x202020;
const RIVAL_COLOR = 0xA02000;
const LAND_COLOR = 0x202020;

class Game extends GameObject{

    static I:Game;

    time:number = 0;
    speed:number;
    next:number = 0;

    constructor() {
        super();
        Game.I = this;
        this.speed = Util.h( 1/90 );
    }

	onDestroy(){
        Game.I = null;
    }

	update(){
        this.time += 1/60;

        if( this.next <= this.time ){
            const w = Util.w(TilePerW);
            const lane = randI( 0, 3+1 );
            let x = Util.w(0.5) + (lane-1.5) * w;
            let y = -0.5 * Util.h( TilePerH );
            new Tile( x, y );

            this.next += randI(1,4+1) * 0.1;
        }
	}
}
