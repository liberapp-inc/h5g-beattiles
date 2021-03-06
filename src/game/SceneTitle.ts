// Liberapp 2020 - Tahiti Katagai
// タイトルシーン

class SceneTitle extends GameObject{

    texts:egret.TextField[] = [];
    startButton:Button = null;
    settingsButton:Button = null;

    static loadScene() {
        new SoundEffect();
        new SceneTitle();
    }

    constructor() {
        super();

        this.texts[0] = Util.newTextField("黒いのを打て", Util.width / 9, FONT_COLOR, 0.5, 0.25, true, true);
        this.texts[1] = Util.newTextField("流れてくる黒タイルをタップ！", Util.width / 20, FONT_COLOR, 0.5, 0.35, true, false);

        const bestScore = Score.bestScore;
        this.texts[2] = Util.newTextField("BEST"+bestScore+"", Util.width / 14, FONT_COLOR, 0.5, 0.45, true, true);

        this.startButton = new Button("スタート", Util.width/16, BACK_COLOR, 0.50, 0.70, 0.7, 0.12, FONT_COLOR, 1.0, true, this.onTapStart );

        this.texts.forEach( text =>{ if( text ){ GameObject.baseDisplay.addChild( text ); } });
    }

	onDestroy(){
        this.texts.forEach( text =>{ if( text ){ text.parent.removeChild( text ); } });
        this.texts = null;
    }

	update(){
	}

    onTapStart(){
        GameObject.transit = ScenePlay.loadScene;
        SoundEffect.I.play();
    }
}