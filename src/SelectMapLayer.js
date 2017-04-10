/**
 * Created by tripham on 2/28/17.
 */

var SelectMapLayer = cc.LayerColor.extend({
    ctor:function (color, width, height) {
        this._super(color,width,height);

        bg = new cc.Sprite(wn.SelectModeScene_Res.SelecMap.bg_png);
        bg.setPosition(wn.ui.posBG);
        this.addChild(bg);


        var btnBack = new ccui.Button(wn.SelectModeScene_Res.SelecMap.back_png);
        btnBack.setPosition(wn.config.SCREEN_WIDTH_DESIGN*0.2, wn.config.SCREEN_HEIGHT_DESIGN*0.2);
        this.addChild(btnBack);
        btnBack.addClickEventListener(function () {
            wn.replaceScene("SelectModeScene");
        });
        var count = 1;
        var levelOpen = wn.getLevelOpen();
        //levelOpen = 30;
        if(levelOpen<0)
            levelOpen = 1;
        //levelOpen = 100;
        for (var i = 2; i >-2; i--)
        for (var j= -1 ; j < 2; j++)
        {
            var btnLevel = new ccui.Button(wn.SelectModeScene_Res.SelecMap[count.toString()]);

            btnLevel.setPosition(wn.config.SCREEN_WIDTH_DESIGN*0.5+j*190, wn.config.SCREEN_HEIGHT_DESIGN*0.47+i*190);
            this.addChild(btnLevel);
            btnLevel.setTag(count);
            btnLevel.addTouchEventListener(function(sender,type)
            {
                if (type == ccui.Widget.TOUCH_ENDED){
                    wn.GameMode.Mode = wn.GameMode.MODE_PUZZLE;
                    wn.level = sender.getTag();
                    wn.replaceScene("TetrisGameScene");
                }

            },btnLevel);
            if (count>levelOpen)
            {
                btnLevel.setTouchEnabled(false);
                btnLevel.loadTextureNormal(wn.SelectModeScene_Res.SelecMap.lock_png);
            }
            count++;
        }


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
                    if (self.getChildByName("SelectMap"))
                    {
                        self.removeFromParent();
                    }
                }
            }
        },this);
    },


})


