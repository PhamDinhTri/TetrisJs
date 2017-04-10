var SplashLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(wn.SplashScene_Res.splash_png);
        //this.sprite.setPosition(wn.ui.posBG);
        this.sprite.x = wn.ui.posBG.x;
        this.sprite.y = wn.ui.posBG.y;
        this.addChild(this.sprite, 0);

        this.scheduleOnce(this.PlayGame,1,"playgame");

        return true;
    },

    PlayGame:function (dt){

        wn.replaceScene("MainMenuScene");

    },
});

var SplashScene = wn.BaseScene.extend({
    ctor:function () {
        this._super();
        this.Res = wn.SplashScene_Res;
        this.jsList = wn.SplashScene_JS;
        this.setOnLoadDone( function (err) {
           // if(err) return ;
            var layer = new SplashLayer();
            this.addChild(layer);
        });
        this.loadResoures();
    },

});

wn.SplashScene_Res = {
    splash_png: "res/splash.png"
};
wn.SplashScene_JS = [];