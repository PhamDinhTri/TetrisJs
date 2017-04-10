/**
 * Created by tripham on 3/1/17.
 */
var GameOverLayer = cc.LayerColor.extend({
    ctor:function (color, width, height) {
        this._super(color, width, height);
        var gameOverBg = new cc.Sprite(wn.TetrisGameScene_Res.gameover_png);
        gameOverBg.setPosition(wn.config.SCREEN_WIDTH_DESIGN*0.5, wn.config.SCREEN_HEIGHT_DESIGN*0.5);
        this.addChild(gameOverBg);


        var btnReplay = new ccui.Button(wn.TetrisGameScene_Res.replay_png);
        btnReplay.setPosition(wn.config.SCREEN_WIDTH_DESIGN*0.35, wn.config.SCREEN_HEIGHT_DESIGN*0.45);
        this.addChild(btnReplay);
        btnReplay.addClickEventListener(function () {
            wn.replaceScene("TetrisGameScene");
        });

        var btnRate = new ccui.Button(wn.TetrisGameScene_Res.rate_png);
        btnRate.setPosition(wn.config.SCREEN_WIDTH_DESIGN*0.5, wn.config.SCREEN_HEIGHT_DESIGN*0.45);
        this.addChild(btnRate);
        btnRate.addClickEventListener(function () {
            cc.sys.openURL(wn.config.LINK_GOOGLEPLAY);
        });

        var btnMainmenu = new ccui.Button(wn.TetrisGameScene_Res.home_png);
        btnMainmenu.setPosition(wn.config.SCREEN_WIDTH_DESIGN*0.65, wn.config.SCREEN_HEIGHT_DESIGN*0.45);
        this.addChild(btnMainmenu);
        btnMainmenu.addClickEventListener(function () {
            wn.replaceScene("SelectModeScene");
        });

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan:function (touch, event) {

                return true;
            },

        }, this);

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function(key,event) {
                if (key==cc.KEY.back||key==cc.KEY.escape)
                {
                    wn.replaceScene("SelectModeScene");
                }
            }
        },this);

    }
})