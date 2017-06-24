/**
 * Created by tripham on 2/17/17.
 */

var MainMenuLayer = cc.Layer.extend({
    bg: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        this.bg = new cc.Sprite(wn.MainMenuScene_Resources.bg_png);
        this.addChild(this.bg);
        this.bg.x = size.width / 2;
        this.bg.y = size.height / 2;

        wn.playBgMusic(res.Sounds.bgmusic_mp3);

        var btnPlay = new ccui.Button(wn.MainMenuScene_Resources.btnPlay_png);
        btnPlay.setPosition(wn.ui.posbtPlay);
        btnPlay.setPressedActionEnabled(true);
        btnPlay.setZoomScale(-0.1);
        btnPlay.addClickEventListener(function () {
            wn.replaceScene("SelectModeScene");
        });
        this.addChild(btnPlay);

        var ac1 = new cc.ScaleTo(2, 0.9);
        var ac2 = new cc.ScaleTo(2, 0.6);

        var sqe = new cc.Sequence(ac2, ac1);

        btnPlay.runAction(new cc.RepeatForever(sqe));

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: function (key, event) {
                    if (key == cc.KEY.back) {
                        cc.director.end();
                    }
                }
            }, this);
        }
        return true;
    }
});

var MainMenuScene = wn.BaseScene.extend({
    onEnter: function () {
        this._super();
        this.Res = wn.MainMenuScene_Resources;
        this.jsList = wn.MainMenuScene_JsList;
        this.setOnLoadDone(function (err) {
            //if(err) return ;
            var layer = new MainMenuLayer();
            this.addChild(layer);
        });
        this.loadResoures();
    }
});

wn.MainMenuScene_Resources = {
    bg_png: "res/MainMenu/bg.png",
    btnPlay_png: "res/MainMenu/btnPlay.png"
};
wn.MainMenuScene_JsList = [];
