/**
 * Created by tripham on 2/28/17.
 */

wn.SelectModeScene_Res = {
    bg_png:"res/SelectMode/bg.png",
    classic_png:"res/SelectMode/classic.png",
    advanture_png:"res/SelectMode/advanture.png",
    puzzle_png:"res/SelectMode/puzzle.png",
    SelecMap:{
        bg_png:"res/SelectMap/bg.png",
        lock_png:"res/SelectMap/lock.png",
        back_png:"res/GamePlay/back.png"
    },

}
wn.SelectModeScene_JsList = ["src/SelectMapLayer.js"];

var SelectModeScene = wn.BaseScene.extend({
    ctor:function () {
        this._super();
        for(var i=1;i<=12;i++)
        {
            wn.SelectModeScene_Res.SelecMap[i.toString()] = "res/SelectMap/"+i.toString()+".png";
        }
        this.Res = wn.SelectModeScene_Res;
        this.jsList = wn.SelectModeScene_JsList;
        this.setOnLoadDone( function (err) {
           // if(err) return ;

            var layer = new SelectModeLayer();
            this.addChild(layer);
        });
        this.loadResoures();
    },

});
var SelectModeLayer = cc.Layer.extend({

ctor:function ()
{
    this._super();
    var self = this;
    var bg = new cc.Sprite(wn.SelectModeScene_Res.bg_png);
    this.addChild(bg, -1);
    bg.setPosition(wn.ui.posBG);

    var btnClassic = new ccui.Button(wn.SelectModeScene_Res.classic_png);
    btnClassic.setPressedActionEnabled(true);
    btnClassic.setPosition(cc.p(wn.config.SCREEN_WIDTH_DESIGN*0.5,wn.config.SCREEN_HEIGHT_DESIGN*0.7));
    btnClassic.addClickEventListener(function () {
        wn.playSound(res.Sounds.move_Brick_new_wav);
        wn.GameMode.Mode = wn.GameMode.MODE_CLASSIC;
        wn.replaceScene("TetrisGameScene");
    });
    this.addChild(btnClassic);

    var btnAdvanture = new ccui.Button(wn.SelectModeScene_Res.advanture_png);
    btnAdvanture.setPressedActionEnabled(true);
    btnAdvanture.setPosition(cc.p(wn.config.SCREEN_WIDTH_DESIGN*0.5, wn.config.SCREEN_HEIGHT_DESIGN*0.5));
    btnAdvanture.addClickEventListener(function () {
        wn.playSound(res.Sounds.move_Brick_new_wav);
        wn.GameMode.Mode = wn.GameMode.MODE_ADVANTURE;
        wn.replaceScene("TetrisGameScene");
    });
    this.addChild(btnAdvanture);


    var btnPuzzle = new ccui.Button(wn.SelectModeScene_Res.puzzle_png);
    btnPuzzle.setPressedActionEnabled(true);
    btnPuzzle.setPosition(cc.p(wn.config.SCREEN_WIDTH_DESIGN*0.5, wn.config.SCREEN_HEIGHT_DESIGN*0.3));
    btnPuzzle.addClickEventListener(function () {
        wn.playSound(res.Sounds.move_Brick_new_wav);
        wn.GameMode.Mode = wn.GameMode.MODE_PUZZLE;
        var selectMapLayer = new SelectMapLayer(cc.color(0, 0, 0, 200));
        self.addChild(selectMapLayer, 99);
        selectMapLayer.setName("SelectMap");
    });
    this.addChild(btnPuzzle);


    var move1 = new cc.MoveBy(2, cc.p(wn.config.SCREEN_WIDTH_DESIGN/2+200,0));
    var move2 = new cc.MoveBy(2, cc.p(-wn.config.SCREEN_WIDTH_DESIGN/2-200, 0));
    var ease1 =  move1.clone().easing(cc.easeElasticOut(0.3));
    var ease2 =  move2.clone().easing(cc.easeElasticOut(0.3));

    btnClassic.setPositionX(btnClassic.getPositionX() - wn.config.SCREEN_WIDTH_DESIGN / 2 - 200);
    btnClassic.runAction(ease1);

    btnAdvanture.setPositionX(btnAdvanture.getPositionX() + wn.config.SCREEN_WIDTH_DESIGN / 2 + 200);
    btnAdvanture.runAction(ease2);

    btnPuzzle.x = btnPuzzle.x - wn.config.SCREEN_WIDTH_DESIGN / 2 - 200;
    btnPuzzle.runAction(ease1.clone());

    cc.eventManager.addListener(
        {
            event:cc.EventListener.KEYBOARD,
            onKeyReleased:function (key,event) {
                if (key==cc.KEY.back||key==cc.KEY.escape)
                {
                    if (self.getChildByName("SelectMap"))
                    {
                        return;
                    }
                    wn.replaceScene("MainMenuScene");
                }
            }
        },this
    );
    return true;
}});