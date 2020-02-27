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

    private localTouchBegan:boolean = false;
    press:boolean = false;
    touch:boolean = false;
    tapX:number = 0;
    tapY:number = 0;

    constructor() {
        super();
        Game.I = this;
        this.speed = Util.h( 1/90 );

        GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
    }

	onDestroy(){
        Game.I = null;
        GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
    }

    touchBegin(e:egret.TouchEvent){
        this.localTouchBegan = 
        this.press = 
        this.touch = true;
        this.tapX = e.localX;
        this.tapY = e.localY;
    }
    touchMove(e:egret.TouchEvent){
        this.tapX = e.localX;
        this.tapY = e.localY;
    }
    touchEnd(e:egret.TouchEvent){
        this.touch = false;
    }
    touchUpdate(){
        if( this.localTouchBegan ){
            this.localTouchBegan = false;
        }else{
            this.press = false;
        }
    }

	update(){
        this.touchUpdate();
        
        const speed = Util.h( 1/90 );

        this.time += 1/60 * (this.speed/speed);
        this.speed += Util.clamp( speed - this.speed, -speed/20, speed/20 );

        if( this.next <= this.time ){
            const w = Util.w(TilePerW);
            const lane = randI( 0, 3+1 );
            let x = Util.w(0.5) + (lane-1.5) * w;
            let y = -0.5 * Util.h( TilePerH );
            // new Tile( x, y );
            // this.next += randI(2,5+1) * 0.1;

            new TileLong( x, y );
            this.next += 8 * 0.1;
        }
	}
}
