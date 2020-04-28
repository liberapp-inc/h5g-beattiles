// Liberapp 2020 - Tahiti Katagai
// 黒いのを打て

class Main extends eui.UILayer {

    static sdk:any;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private async addToStage() {
        // await this.loadResource();
        await this.liberappSdkInit();

        Util.initial( this );
        GameObject.initial( this.stage );
        // PhysicsObject.prepare( PIXEL_PER_METER );
        Camera2D.initial();

        SceneTitle.loadScene();
        egret.startTick(this.tickLoop, this);
    }

    // private async loadResource() {
    //     try {
    //         await RES.loadConfig("resource/default.res.json", "resource/");
    //         await RES.loadGroup("preload", 0);
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
    // }

    tickLoop(timeStamp:number):boolean{
        // PhysicsObject.progress();
        GameObject.process();
        Camera2D.process();
        return false;
    }

    async liberappSdkInit()
    {
        Main.sdk = window["LiberappSdk"]; // window["FBInstant"]; でも可能

        try {
            // ローカルデバッグ　本番
        //    await Main.sdk.enableDebug({ applicationKey: "2eef7171-6518-4aa2-9c4d-aee9f1db2f4f", debugSigninOptions: { accessToken: "4a70930c-f73e-46a6-8bd9-9372c15b88f1", userAkey: "989ed547-b3f1-45e3-a08f-c9f426d2a14b" } });
            // ローカルデバッグ　staging
        //   await Main.sdk.enableDebug({ applicationKey: "bda13546-ec77-4398-a54c-e025b240f8e9", debugSigninOptions: { accessToken: "d6717ce2-8053-4402-8eb0-999c3dd8e605", userAkey: "02e412b2-e266-468b-af9b-008b502528ba" } });
            
            await Main.sdk.initializeAsync();
            await Main.sdk.startGameAsync();
            if (Main.sdk.player) {
                console.log("ID", Main.sdk.player.getID());
                console.log("name", Main.sdk.player.getName());
                console.log("photo", Main.sdk.player.getPhoto());
            } else {
                console.log("GUEST");
            }

            // あらかじめ作成してあるリーダーボードを取得します
            const l = await Main.sdk.getLeaderboardAsync("board");
            const serverEntry = await l.getPlayerEntryAsync();
            let serverScore = serverEntry.getScore();
            let localScore = Util.getSaveDataNumber( SaveKeyBestScore, DefaultBestScore );

            // サーバースコアなし、ローカルスコア記録あり（未送信）なら、スコア送信
            if( serverScore == null && localScore > DefaultBestScore ){
                serverScore = await l.setScoreAsync( localScore );  // 引数[追加データ]はバグのため不可
                console.log("serverScore updated " + serverScore.getScore() );
            }
            else{
                // サーバースコアあり、ローカルスコア記録なし（消失）なら、スコア記録
                if( serverScore != null && localScore == DefaultBestScore ){
                    Util.setSaveDataNumber( SaveKeyBestScore, serverScore );
                    console.log("localScore updated "+ serverScore );
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

