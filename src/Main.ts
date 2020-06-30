// Liberapp 2020 - Tahiti Katagai
// 黒いのを打て

const SDK = true;

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }

    private async addToStage() {
        Util.initial( this );
        GameObject.initial( this.stage );
        // PhysicsObject.prepare( PIXEL_PER_METER );
        Camera2D.initial();

        if( SDK ){
            await Social.init();
        }
        SceneTitle.loadScene();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        // PhysicsObject.progress();
        GameObject.process();
        Camera2D.process();
        return false;
    }
}

