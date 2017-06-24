/**
 * Created by tripham on 3/1/17.
 */
var GameWinLayer = cc.LayerColor.extend({
    ctor: function (color, width, height) {
        this._super(color, width, height);
        var win = new cc.Sprite(wn.TetrisGameScene_Res.win_png);
        win.setPosition(wn.config.SCREEN_WIDTH_DESIGN * 0.5, wn.config.SCREEN_HEIGHT_DESIGN);
        this.addChild(win, 99);
        var self = this;
        win.runAction(new cc.Sequence(new cc.MoveTo(0.5, wn.ui.posBG), new cc.Blink(2, 4), new cc.CallFunc(function () {
                cc.director.pause();
                wn.setLevelOpen(wn.getLevelOpen() + 1);
                win.removeFromParent();
                var selectMapLayer = new SelectMapLayer(cc.color(0, 0, 0, 200));
                self.addChild(selectMapLayer, 99);
                selectMapLayer.setName("SelectMap");
            }
        )));

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {

                return true;
            },

        }, this);
        return true;
    }
})