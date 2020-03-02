// http://developer.egret.com/en/apidoc/index/name/egret.Sound#example

/**
 * 以下示例加载一个 MP3 文件，进行播放，并输出播放该 MP3 文件时所发生的声音事件的相关信息。
 */

class SoundEffect extends GameObject {//egret.DisplayObjectContainer {

    public static I:SoundEffect = null;

    sound:egret.Sound = null;

    public constructor() {
        super();
        SoundEffect.I = this;
        this.startLoad();
    }

    onDestroy(){
        SoundEffect.I = null;
    }

    update(){
    }


    private startLoad():void {
        //创建 Sound 对象
        var sound = new egret.Sound();
        // var url:string = "resource/assets/kick-middle1.mp3";
        var url:string = "resource/assets/kick-middle1mono.wav";
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(url);
    }

    private onLoadComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        this.sound = <egret.Sound>event.target;
    }

    play(){
        //播放音乐
        // egret.log("play");
        var channel:egret.SoundChannel = this.sound.play(0.0, 1);
        // channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }

    // private onSoundComplete(event:egret.Event):void {
    //     egret.log("onSoundComplete");
    // }
}
