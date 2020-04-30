// Liberapp 2020 Tahiti Katagai
// LiberappSDK 便利くん

const BoardName = "board1";

class SdkUtil{

    static I:SdkUtil = null;
    static sdk:any = null;

    constructor() {
        SdkUtil.I = this;
    }

    async init()
    {
        SdkUtil.sdk = window["LiberappSdk"];

        try {
            // ローカルデバッグ　本番
      //    await SdkUtil.sdk.enableDebug({ applicationKey: "2eef7171-6518-4aa2-9c4d-aee9f1db2f4f", debugSigninOptions: { accessToken: "4a70930c-f73e-46a6-8bd9-9372c15b88f1", userAkey: "989ed547-b3f1-45e3-a08f-c9f426d2a14b" } });
            // ローカルデバッグ　staging
      //   await SdkUtil.sdk.enableDebug({ applicationKey: "bda13546-ec77-4398-a54c-e025b240f8e9", debugSigninOptions: { accessToken: "d6717ce2-8053-4402-8eb0-999c3dd8e605", userAkey: "02e412b2-e266-468b-af9b-008b502528ba" } });
            
            await SdkUtil.sdk.initializeAsync();
            await SdkUtil.sdk.startGameAsync();
            if (SdkUtil.sdk.player) {
                console.log("ID", SdkUtil.sdk.player.getID());
                console.log("name", SdkUtil.sdk.player.getName());
                console.log("photo", SdkUtil.sdk.player.getPhoto());
            } else {
                console.log("GUEST");
            }

            // あらかじめ作成してあるリーダーボードを取得します
            const l = await SdkUtil.sdk.getLeaderboardAsync(BoardName);
            // 件数を取得
            const count = await l.getEntryCountAsync();
            console.log("Count", count);
            
            let localScore = Util.getSaveDataNumber( SaveKeyBestScore, DefaultBestScore );
            console.log("localScore = " + localScore );

            let serverEntry = null;
            let serverScore = DefaultBestScore;
            if( count > 0 ){
                serverEntry = await l.getPlayerEntryAsync();  // カウント０の場合エラー
                if( serverEntry )
                {
                    serverScore = serverEntry.getScore();
                    console.log("serverScore = " + serverScore );
                }
            }

            // サーバースコアなしなら、スコア送信
            if( serverEntry == null ){
                serverEntry = await l.setScoreAsync( localScore );  // 引数[追加データ]はバグのため不可
                serverScore = serverEntry.getScore();
                console.log("serverScore updated " + serverScore );
            }
            else{
                // サーバースコアあり、ローカルスコア記録なし（消失）なら、スコア記録
                if( localScore == DefaultBestScore || serverScore > localScore ){
                    Util.setSaveDataNumber( SaveKeyBestScore, serverScore );
                    console.log("localScore updated "+ serverScore );
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    async sendScore( score:number ){
        try {
            // 送信
            const l = await SdkUtil.sdk.getLeaderboardAsync(BoardName);
            const serverEntry = await l.getPlayerEntryAsync();
            let serverScore = serverEntry.getScore();
            // サーバースコアなし or スコア更新なら、スコア送信
            if( serverScore == null || score > serverScore ){
                serverScore = await l.setScoreAsync( score );  // 引数[追加データ]はバグのため不可
            }
        } catch (e) {
            console.log(e);
        }
    }
}



