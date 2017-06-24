/**
 * Created by tripham on 2/28/17.
 */
var TetrisBrick = cc.Node.extend({
    Row: 0,
    Col: 0,
    iBoard: 0,
    jBoard: 0,
    arr: [],
    colorBrick: 1,
    mysprite: [],

    ctor: function (ID) {
        this._super(ID);
        switch (ID) {
            case 15:
                this.Row = 4;
                this.Col = 1;
                this.iBoard = 0 + 3;
                this.jBoard = 5;
                break;
            case 31:
                this.Row = this.Col = 2;
                this.iBoard = 2 + 3;
                this.jBoard = 5;
                break;
            default:
                this.Row = 2;
                this.Col = 3;
                this.iBoard = 2 + 3;
                this.jBoard = 5;
                break;
        }
        this.mysprite = new Array();
        this.arr = new Array(this.Row);
        for (var i = 0; i < this.Row; i++) {
            this.arr[i] = new Array(this.Col);
        }
        for (var k = 0; k < this.Col * this.Row; k++) {
            this.arr[Math.floor(k / this.Col)][k % this.Col] = (ID >> (this.Col * this.Row - 1 - k)) & 1;
        }

        if (wn.nextColor) {
            this.colorBrick = wn.nextColor;
        }
        else {
            this.colorBrick = wn.RandomInt(1, 6);
        }

        for (var i = 0; i < this.Row; i++)
            for (var j = 0; j < this.Col; j++)
                if (this.arr[i][j] == 1) {
                    var spr = new cc.Sprite(wn.TetrisGameScene_Res["av" + this.colorBrick.toString()]);
                    //cc.log(this.colorBrick.toString());
                    spr.setPosition((this.jBoard + j) * wn.config.BRICK_SIZE + wn.config.OFFSETX, wn.config.OFFSETY - (this.iBoard + i) * wn.config.BRICK_SIZE);
                    this.addChild(spr);
                    spr.setVisible(false);
                    this.mysprite.push(spr);
                    //spr->release();
                }
        this.scheduleUpdate();

        return true;
    },
    update: function (dt) {
        var dem = 0;
        for (var i = 0; i < this.Row; i++)
            for (var j = 0; j < this.Col; j++)
                if (this.arr[i][j] == 1) {
                    var spr = this.mysprite[dem];
                    dem += 1;
                    spr.setPosition((this.jBoard + j) * wn.config.BRICK_SIZE + wn.config.OFFSETX, wn.config.OFFSETY - (this.iBoard + i) * wn.config.BRICK_SIZE);
                    if (spr.getPositionY() > wn.config.OFFSETY - 7 * wn.config.BRICK_SIZE) {
                        spr.setVisible(false);
                    }
                    else {
                        spr.setVisible(true);
                    }
                }
    }
});





