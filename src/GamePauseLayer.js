/**
 * Created by tripham on 3/1/17.
 */
var GamePauseLayer = cc.LayerColor.extend({
    ctor: function (color, width, height) {
        this._super(color, width, height);
        var self = this;
        var gamePauseTitle = new cc.Sprite(wn.TetrisGameScene_Res.gamepause_png);
        gamePauseTitle.setPosition(wn.config.SCREEN_WIDTH_DESIGN * 0.5, wn.config.SCREEN_HEIGHT_DESIGN * 0.8);
        this.addChild(gamePauseTitle);
        gamePauseTitle.setScale(1.2);

        var btnResume = new ccui.Button(wn.TetrisGameScene_Res.btnResume_png);
        btnResume.setPosition(wn.config.SCREEN_WIDTH_DESIGN * 0.5, wn.config.SCREEN_HEIGHT_DESIGN * 0.65);
        this.addChild(btnResume);
        btnResume.addClickEventListener(
            function () {
                self.getParent().isPlaying = true;
                self.removeFromParent();
            });

        var btnReplay = new ccui.Button(wn.TetrisGameScene_Res.btnReplay_png);
        btnReplay.setPosition(wn.config.SCREEN_WIDTH_DESIGN * 0.5, wn.config.SCREEN_HEIGHT_DESIGN * 0.5);
        this.addChild(btnReplay);
        btnReplay.addClickEventListener(function () {
            wn.replaceScene("TetrisGameScene");
            //cc.director.runScene(new TetrisGameScene());
        });

        var btnMainmenu = new ccui.Button(wn.TetrisGameScene_Res.btnMainmenu_png);
        btnMainmenu.setPosition(wn.config.SCREEN_WIDTH_DESIGN * 0.5, wn.config.SCREEN_HEIGHT_DESIGN * 0.35);
        this.addChild(btnMainmenu);
        btnMainmenu.addClickEventListener(function () {
            wn.replaceScene("SelectModeScene");
        });

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {

                return true;
            },

        }, this);

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function (key, event) {
                if (key == cc.KEY.back || key == cc.KEY.escape) {
                    self.getParent().isPlaying = true;
                    self.removeFromParent();
                }
            }
        }, this);

        return true;
    }
})