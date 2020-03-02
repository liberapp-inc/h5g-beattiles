function randInt(){return globalRandom["int"]()}function rand01(){return globalRandom.f01()}function randF(t,e){return globalRandom.f(t,e)}function randI(t,e){return globalRandom.i(t,e)}function randBool(t){return void 0===t&&(t=.5),globalRandom.bool(t)}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))(function(o,r){function a(t){try{l(n.next(t))}catch(e){r(e)}}function s(t){try{l(n["throw"](t))}catch(e){r(e)}}function l(t){t.done?o(t.value):new i(function(e){e(t.value)}).then(a,s)}l((n=n.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return n([t,e])}}function n(i){if(o)throw new TypeError("Generator is already executing.");for(;l;)try{if(o=1,r&&(a=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[0,a.value]),i[0]){case 0:case 1:a=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,r=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(a=l.trys,!(a=a.length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){l=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){l.label=i[1];break}if(6===i[0]&&l.label<a[1]){l.label=a[1],a=i;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(i);break}a[2]&&l.ops.pop(),l.trys.pop();continue}i=e.call(t,l)}catch(n){i=[6,n],r=0}finally{o=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var o,r,a,s,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return Object.defineProperty(t.prototype,"X",{get:function(){return this.display.x},set:function(t){this.display.x=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"Y",{get:function(){return this.display.y},set:function(t){this.display.y=t},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.baseDisplay=e,t.gameDisplay=new egret.DisplayObjectContainer,t.baseDisplay.addChild(t.gameDisplay)},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t._delete(),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t._delete(),!1})},t.prototype._delete=function(){this.onDestroy(),this.display&&(this.display.parent.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var TilePerW=.2,TilePerH=.18,TileColor=0,Tile=function(t){function e(i,n){var o=t.call(this)||this;return e.tiles.push(o),o.sizeW=Util.w(TilePerW),o.sizeH=Util.h(TilePerH),o.setShape(i,n),o}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;e.tiles=e.tiles.filter(function(e){return e!=t})},e.prototype.setShape=function(t,e){this.display=new egret.Shape,GameObject.gameDisplay.addChild(this.display);var i=this.display;i.x=t,i.y=e,i.graphics.beginFill(TileColor),i.graphics.drawRect(-.5*this.sizeW,-.45*this.sizeH,this.sizeW,.9*this.sizeH),i.graphics.endFill()},e.prototype.update=function(){if(!GameOver.I){if(this.checkTouch())return void this.defeated();this.Y+=Game.I.speed,this.checkFall()&&new GameOver}},e.prototype.checkTouch=function(){return Game.I.press&&Math.pow(Game.I.tapX-this.X,2)<Math.pow(.6*this.sizeW,2)&&Math.pow(Game.I.tapY-this.Y,2)<Math.pow(.6*this.sizeH,2)?!0:void 0},e.prototype.checkFall=function(){return this.Y>Util.height},e.prototype.defeated=function(){this.destroy(),SoundEffect.I.play(),Score.I.addPoint(10);for(var t=0;15>t;t++)new Debris(this.X,this.Y)},e.tiles=[],e}(GameObject);__reflect(Tile.prototype,"Tile");var Button=function(t){function e(e,i,n,o,r,a,s,l,c,h,p){var u=t.call(this)||this;u.text=null,u.onTap=null,u.press=!1,u.touch=!1,u.x=0,u.y=0;var d=new egret.Shape;GameObject.baseDisplay.addChild(d),h?d.graphics.lineStyle(2,n):d.graphics.lineStyle(0),d.graphics.beginFill(l,c);var f=a*Util.width,y=s*Util.height;return d.graphics.drawRoundRect(-.5*f,-.5*y,f,y,.4*y),d.graphics.endFill(),d.touchEnabled=!0,d.x=o*Util.width,d.y=r*Util.height,u.display=d,e&&(u.text=Util.newTextField(e,i,n,o,r,!0,!1),GameObject.baseDisplay.addChild(u.text)),u.onTap=p,u.onTap&&u.display.addEventListener(egret.TouchEvent.TOUCH_TAP,u.onTap,u),u.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,u.touchBegin,u),u.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,u.touchMove,u),u.display.addEventListener(egret.TouchEvent.TOUCH_END,u.touchEnd,u),u}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.baseDisplay.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX),this.press=!1},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.press=!0,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var ScenePlay=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.loadScene=function(){new Game,new Score},e.prototype.update=function(){},e}(GameObject);__reflect(ScenePlay.prototype,"ScenePlay");var SceneTitle=function(t){function e(){var e=t.call(this)||this;e.texts=[],e.startButton=null,e.settingsButton=null,e.texts[0]=Util.newTextField("黒いのを打て",Util.width/9,FONT_COLOR,.5,.25,!0,!0);var i=Util.getSaveDataNumber(SaveKeyBestScore,DefaultBestScore);return e.texts[2]=Util.newTextField("BEST"+i,Util.width/14,FONT_COLOR,.5,.35,!0,!0),e.startButton=new Button("スタート",Util.width/16,BACK_COLOR,.5,.7,.7,.12,FONT_COLOR,1,!0,e.onTapStart),e.texts.forEach(function(t){t&&GameObject.baseDisplay.addChild(t)}),e}return __extends(e,t),e.loadScene=function(){new e},e.prototype.onDestroy=function(){this.texts.forEach(function(t){t&&t.parent.removeChild(t)}),this.texts=null},e.prototype.update=function(){},e.prototype.onTapStart=function(){GameObject.transit=ScenePlay.loadScene},e}(GameObject);__reflect(SceneTitle.prototype,"SceneTitle");var SoundEffect=function(t){function e(){var i=t.call(this)||this;return i.sound=null,e.I=i,i.startLoad(),i}return __extends(e,t),e.prototype.onDestroy=function(){e.I=null},e.prototype.update=function(){},e.prototype.startLoad=function(){var t=new egret.Sound,e="resource/assets/kick-middle1.mp3";t.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this),t.load(e)},e.prototype.onLoadComplete=function(t){this.sound=t.target},e.prototype.play=function(){this.sound.play(0,1)},e.I=null,e}(GameObject);__reflect(SoundEffect.prototype,"SoundEffect");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return Util.initial(this),GameObject.initial(this.stage),Camera2D.initial(),SceneTitle.loadScene(),egret.startTick(this.tickLoop,this),[2]})})},e.prototype.tickLoop=function(t){return GameObject.process(),Camera2D.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var tileBigScale=2,TileBig=function(t){function e(e,i){var n=t.call(this,e,i)||this;return n.hp=10,n.sizeW*=tileBigScale,n.sizeH*=tileBigScale,n.display.scaleX=n.display.scaleY=tileBigScale,n}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;Tile.tiles=Tile.tiles.filter(function(e){return e!=t})},e.prototype.update=function(){if(!GameOver.I){if(this.display.rotation*=.75,this.checkTouch()){if(--this.hp<=0)return void this.defeated();Score.I.addPoint(2),SoundEffect.I.play(),Game.I.speed=0,this.display.rotation=randI(-5,5);for(var t=0;4>t;t++)new Debris(Game.I.tapX,Game.I.tapY)}this.Y+=Game.I.speed,this.checkFall()&&new GameOver}},e}(Tile);__reflect(TileBig.prototype,"TileBig");var TileLongLength=3,TileLong=function(t){function e(e,i){var n=t.call(this,e,i)||this;return n.length=TileLongLength,n.Y+=.5*n.sizeH,n.sizeH*=n.length,n.Y-=.5*n.sizeH,n.display.scaleX=.8,n.display.scaleY=n.length,n}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;Tile.tiles=Tile.tiles.filter(function(e){return e!=t})},e.prototype.update=function(){if(!GameOver.I){if(this.display.anchorOffsetX*=.5,this.display.anchorOffsetY*=.5,this.checkTouching()){if(this.sizeH-=Game.I.speed,this.display.scaleY-=Game.I.speed/Util.h(TilePerH),this.Y-=Game.I.speed/2,this.sizeH<=Util.h(1.5*TilePerH))return void this.defeated();Game.I.counter%3==0&&(Score.I.addPoint(1),SoundEffect.I.play(),this.display.anchorOffsetX=randF(-6,6),this.display.anchorOffsetY=randF(-5,5)),new Debris(this.X+randF(.5*-this.sizeW,.5*this.sizeW),this.Y+.5*this.sizeH)}this.Y+=Game.I.speed,this.checkFall()&&new GameOver}},e.prototype.checkTouching=function(){return Game.I.touch&&Math.pow(Game.I.tapX-this.X,2)<Math.pow(.6*this.sizeW,2)&&Math.pow(Game.I.tapY-this.Y,2)<Math.pow(.6*this.sizeH,2)?!0:void 0},e}(Tile);__reflect(TileLong.prototype,"TileLong");var DebrisPerW=.1,DebrisPerH=.1,DebrisColor=0,DebrisVPerW=.06,DebrisVR=20,Debris=function(t){function e(e,i){var n=t.call(this)||this,o=Util.w(DebrisVPerW);return n.vx=randF(-o,+o),n.vy=randF(-o,+o),n.vr=randF(-DebrisVR,DebrisVR),n.setShape(e,i),n}return __extends(e,t),e.prototype.onDestroy=function(){},e.prototype.setShape=function(t,e){this.display=new egret.Shape,GameObject.gameDisplay.addChild(this.display);var i=this.display;i.x=t,i.y=e,i.graphics.beginFill(TileColor);var n=Util.w(randF(DebrisPerW/4,DebrisPerW)),o=Util.h(randF(DebrisPerH/4,DebrisPerH));i.graphics.drawRoundRect(-.5*n,-.5*o,n,o,.2*n),i.graphics.endFill()},e.prototype.update=function(){this.vy+=Util.h(.001),this.X+=this.vx,this.Y+=this.vy,this.display.rotation+=this.vr,this.Y>Util.height&&this.destroy()},e}(GameObject);__reflect(Debris.prototype,"Debris");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.localX=0,t.localY=0,t.scale=1,t.rotation=0},t.process=function(){GameObject.gameDisplay.anchorOffsetX=t.x,GameObject.gameDisplay.anchorOffsetY=t.y,GameObject.gameDisplay.x=this.localX,GameObject.gameDisplay.y=this.localY,GameObject.gameDisplay.scaleX=GameObject.gameDisplay.scaleY=t.scale,GameObject.gameDisplay.rotation=t.rotation},t}();__reflect(Camera2D.prototype,"Camera2D");var SaveKeyBestScore="beattiles-bestScore",DefaultBestScore=50,BACK_COLOR=16317180,FONT_COLOR=3158064,FONT2_COLOR=13631488,GameSpeedLowPH=1/120,GameSpeedTopPH=1/30,Game=function(t){function e(){var i=t.call(this)||this;return i.counter=0,i.length=0,i.next=0,i.localTouchBegan=!1,i.press=!1,i.touch=!1,i.tapX=0,i.tapY=0,e.I=i,new SoundEffect,i.speedMax=i.speed=Util.h(GameSpeedLowPH),GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(t){return i.touchBegin(t)},i),GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(t){return i.touchMove(t)},i),GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_END,function(t){return i.touchEnd(t)},i),i}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;e.I=null,GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){return t.touchBegin(e)},this),GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,function(e){return t.touchMove(e)},this),GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_END,function(e){return t.touchEnd(e)},this)},e.prototype.touchBegin=function(t){this.localTouchBegan=this.press=this.touch=!0,this.tapX=t.localX,this.tapY=t.localY},e.prototype.touchMove=function(t){this.tapX=t.localX,this.tapY=t.localY},e.prototype.touchEnd=function(t){this.touch=!1},e.prototype.touchUpdate=function(){this.localTouchBegan?this.localTouchBegan=!1:this.press=!1},e.prototype.update=function(){if(null==GameOver.I){this.counter++,this.touchUpdate();var t=Util.clamp01(this.counter/7200),e=Util.h(Util.lerp(GameSpeedLowPH,GameSpeedTopPH,t));if(this.length+=this.speed,this.speed+=Util.clamp(e-this.speed,-e/20,e/20),this.next<=this.length){var i=Util.w(TilePerW),n=randI(0,4),o=Util.w(.5)+(n-1.5)*i,r=-.5*Util.h(TilePerH);randBool(.8)?(new Tile(o,r),this.next+=randI(1,4)*Util.h(TilePerH)):randBool(.7)?(new TileLong(o,r),this.next+=TileLongLength*Util.h(TilePerH)):(new TileBig(o,r-.5*Util.h(TilePerH)),this.next+=randI(2,6)*Util.h(TilePerH))}}},e}(GameObject);__reflect(Game.prototype,"Game");var InputField=function(t){function e(e,i,n,o,r,a,s,l,c,h){var p=t.call(this)||this;p.text=null,p.onChange=null;var u=new egret.Shape;GameObject.baseDisplay.addChild(u),u.graphics.beginFill(l,c);var d=a*Util.width,f=s*Util.height;return u.graphics.drawRoundRect(-.5*d,-.5*f,d,f,.4*f),u.graphics.endFill(),u.touchEnabled=!0,u.x=o*Util.width,u.y=r*Util.height,p.display=u,p.text=new egret.TextField,p.text.type=egret.TextFieldType.INPUT,p.text.maxChars=e,p.text.size=i,p.text.textColor=n,p.text.width=d,p.text.height=f,p.text.x=Util.width*o-.5*p.text.width+.5*i,p.text.y=Util.height*r-.5*i,GameObject.baseDisplay.addChild(p.text),p.onChange=h,p.onChange&&p.text.addEventListener(egret.Event.CHANGE,function(){return p.onChange(p.text.text)},p),p}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.baseDisplay.removeChild(this.text)},e.prototype.update=function(){},e}(GameObject);__reflect(InputField.prototype,"InputField");var Random=function(){function t(e){void 0===e&&(e=Math.floor(Math.random()*t.max)),this.x=123456789,this.y=362436069,this.z=521288629,this.w=e}return t.prototype["int"]=function(){return this.next()&t.max},t.prototype.f01=function(){return this["int"]()/(t.max+1)},t.prototype.f=function(t,e){return t+this.f01()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(t){return void 0===t&&(t=.5),this.f01()<t},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=1073741823,t}();__reflect(Random.prototype,"Random");var globalRandom=new Random,Rect=function(t){function e(e,i,n,o,r,a,s){void 0===a&&(a=!1),void 0===s&&(s=!1);var l=t.call(this)||this,c=new egret.Shape;l.display=c;var h=a?GameObject.gameDisplay:GameObject.baseDisplay;return s?h.addChild(l.display):h.addChildAt(l.display,1),c.graphics.beginFill(r,1),c.graphics.drawRect(e,i,n,o),c.graphics.endFill(),l}return __extends(e,t),e.prototype.update=function(){},e}(GameObject);__reflect(Rect.prototype,"Rect");var Util=function(){function t(){}return t.w=function(e){return e*t.width},t.h=function(e){return e*t.height},t.initial=function(t){this.width=t.stage.stageWidth,this.height=t.stage.stageHeight},t["break"]=function(t,e){t&&console.log(e)},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.clamp01=function(e){return t.clamp(e,0,1)},t.lerp=function(t,e,i){return t+(e-t)*i},t.deltaAngle=function(t){var e=(t+Math.PI)/(2*Math.PI);return e=65536*e&65535,e=e/65536*Math.PI*2-Math.PI},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var n=1-i,o=((16711680&t)*n+(16711680&e)*i&16711680)+((65280&t)*n+(65280&e)*i&65280)+((255&t)*n+(255&e)*i&255);return o},t.newTextField=function(e,i,n,o,r,a,s){var l=new egret.TextField;return l.text=e,l.bold=a,l.size=i,l.textColor=n,s?(l.x=(t.width-l.width)*o,l.y=(t.height-l.height)*r):(l.x=t.width*o-.5*l.width,l.y=t.height*r-.5*l.height),l},t.newShadowText=function(t,e,i){void 0===i&&(i=1.5);var n=new egret.TextField;return n.text=t.text,n.bold=t.bold,n.size=t.size,n.textColor=e,n.x=t.x+i,n.y=t.y+i,n.alpha=.5,n},t.newBitmap=function(t,e,i,n){var o=new egret.Bitmap;return o.texture=RES.getRes(t),GameObject.baseDisplay.addChild(o),o.x=e,o.y=i,o.anchorOffsetX=.5*o.width,o.anchorOffsetY=.5*o.height,o.scaleX=o.scaleY=n,o},t.getSaveDataNumber=function(t,e){var i=egret.localStorage.getItem(t),n=e;return null!=i&&(n=parseInt(i)),n},t.setSaveDataNumber=function(t,e){egret.localStorage.setItem(t,""+e)},t.getSaveDataString=function(t,e){var i=egret.localStorage.getItem(t);return null==i&&(i=e),i},t.setSaveDataString=function(t,e){egret.localStorage.setItem(t,e)},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(){var i=t.call(this)||this;return i.texts=[],i.retryButton=null,i.step=0,i.fadeInFrame=64,e.I=i,Game.I.speed=0,i.texts[0]=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/12,FONT2_COLOR,.5,.3,!0,!1),egret.Tween.get(i.texts[0],{loop:!1}).to({alpha:0},0).to({alpha:1},1e3),GameObject.baseDisplay.addChild(i.texts[0]),i}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.baseDisplay.removeChild(t)}),this.texts=null,e.I=null},e.prototype.update=function(){this.step++,this.step==this.fadeInFrame&&(this.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.55,.4,.1,FONT2_COLOR,1,!1,this.onTapRetry),Score.I.point>Score.I.bestScore&&(Util.setSaveDataNumber(SaveKeyBestScore,Score.I.point),this.texts[1]=Util.newTextField("NEW RECORD!",Util.width/13,FONT2_COLOR,.5,.4,!0,!1),egret.Tween.get(this.texts[1],{loop:!0}).to({alpha:0},500).to({alpha:1},500),GameObject.baseDisplay.addChild(this.texts[1])))},e.prototype.onTapRetry=function(){GameObject.transit=ScenePlay.loadScene},e.I=null,e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;return i.point=0,i.bestScore=0,i.text=null,e.I=i,i.point=0,i.text=Util.newTextField("",Util.width/22,FONT2_COLOR,0,0,!0,!0),GameObject.baseDisplay.addChild(i.text),i.bestScore=Util.getSaveDataNumber(SaveKeyBestScore,DefaultBestScore),i}return __extends(e,t),e.prototype.onDestroy=function(){this.text.parent.removeChild(this.text),this.text=null,e.I=null},e.prototype.update=function(){},e.prototype.addPoint=function(t){void 0===t&&(t=1),this.setPoint(this.point+t)},e.prototype.setPoint=function(t){var e=this.point.toFixed(),i=t.toFixed();this.point=t,e!=i&&(this.text.text=""+i)},e.I=null,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var i=t.call(this)||this;return i.rectFilter=null,i.texts=[],i.button=null,e.I=i,i.rectFilter=new Rect(0,Util.h(.325),Util.width,Util.h(.3),0,!1,!0),i.rectFilter.display.alpha=.4,i.texts[0]=Util.newTextField("黒いのを打て",Util.width/12,FONT_COLOR,.5,.4,!0,!1),i.texts[1]=Util.newTextField("流れてくる黒タイルをタップ！",Util.width/20,FONT_COLOR,.5,.5,!0,!1),i.texts.forEach(function(t){GameObject.baseDisplay.addChild(t)}),i.button=new Button(null,0,0,.5,.5,1,1,0,0,!1,i.onTap),i}return __extends(e,t),e.prototype.onDestroy=function(){this.rectFilter.destroy(),this.rectFilter=null,this.texts.forEach(function(t){t.parent.removeChild(t)}),this.texts=null,this.button.destroy(),e.I=null},e.prototype.update=function(){},e.prototype.onTap=function(){e.I&&e.I.destroy()},e.I=null,e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");