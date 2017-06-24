/**
 * Created by tripham on 2/28/17.
 */
MaxI = 27;
MaxJ = 10;
var TetrisGameLogic = cc.Node.extend({
    Board: [],
    mysprite: [],
    ctor: function () {
        this._super();
        this.mysprite = new Array();
        this.Board = new Array(MaxI);
        for (var i = 0; i < MaxI; i++) {
            this.Board[i] = new Array(MaxJ);
        }
        for (var i = 0; i < MaxI; i++)
            for (var j = 0; j < MaxJ; j++) {
                this.Board[i][j] = 0;
                var spr = new cc.Sprite(wn.TetrisGameScene_Res["av1"]);
                spr.setVisible(false);
                this.addChild(spr);
                this.mysprite.push(spr);
            }
        if (wn.GameMode.Mode == wn.GameMode.MODE_PUZZLE) {
            var mymap = new cc.TMXTiledMap(wn.TetrisGameScene_Res["map" + wn.level.toString()]);
            mymap.retain();
            var layer = mymap.getLayer("Map");
            for (var i = 0; i < 20; i++)
                for (var j = 0; j < MaxJ; j++) {
                    var tilegid = layer.getTileGIDAt(j, i);
                    if (tilegid) {
                        this.Board[i + 7][j] = 7;
                    }
                }

            this.updateGach();
        }

        return true;

    },


    CapNhatLaiToaDo: function (hang) {
        for (var i = hang; i > 0; i--)
            for (var j = 0; j < MaxJ; j++) {
                var temp = this.Board[i - 1][j];
                this.Board[i][j] = this.Board[i - 1][j];
            }
    },
    UpdateScore: function (score) {
        wn.thegame.score = wn.thegame.score + score;
        wn.thegame.displayscore();
        if (wn.thegame.score > wn.thegame.levelScore) {
            if (wn.thegame.speedGame > 0.1) {
                wn.thegame.levelScore = wn.thegame.levelScore + 200;
                var t = wn.thegame.speedGame - wn.thegame.speedGame * 0.2;
                if (t < 0.1) {
                    t = 0.1;
                }
                wn.thegame.speedGame = t;
                wn.thegame.unschedule(wn.thegame.update);
                wn.thegame.schedule(wn.thegame.update, wn.thegame.speedGame);
            }
        }
        return 0; //Chua win game.
    },
    Inside: function (i, j) {
        return (i >= 0 && i < MaxI && j >= 0 && j < MaxJ);
    },

    Left: function (i, j) {
        if (j > 0 && this.Inside(i, j) && this.Board[i][j - 1] == 0) return 1;
        return 0;
    },

    Right: function (i, j) {
        if (j < MaxJ - 1 && this.Inside(i, j) && this.Board[i][j + 1] == 0) return 1;
        return 0;
    },
    Down: function (i, j) {
        if (i < MaxI - 1 && this.Inside(i, j) && this.Board[i + 1][j] == 0) return 1;
        return 0;
    },
    SangTrai: function (pkhoigach) {
        for (var i = 0; i < pkhoigach.Row; i++)
            for (var j = 0; j < pkhoigach.Col; j++)
                if (pkhoigach.arr[i][j] == 1) {
                    if (this.Left(pkhoigach.iBoard + i, pkhoigach.jBoard + j) == 0 || pkhoigach.iBoard <= 3)
                        return;
                }

        pkhoigach.jBoard -= 1; //Dich vi tri cua bang trang thai sang trai 1 so voi Board[22][10].
    },
    SangPhai: function (pkhoigach) {
        for (var i = 0; i < pkhoigach.Row; i++)
            for (var j = 0; j < pkhoigach.Col; j++)
                if (pkhoigach.arr[i][j] == 1) {
                    if (this.Right(pkhoigach.iBoard + i, pkhoigach.jBoard + j) == 0 || pkhoigach.iBoard <= 3)
                        return;
                }

        pkhoigach.jBoard += 1; //Dich vi tri cua bang trang thai sang trai 1 so voi Board[22][10].
    },
    RoiXuong: function (pkhoigach) {
        for (var i = 0; i < pkhoigach.Row; i++)
            for (var j = 0; j < pkhoigach.Col; j++)
                if (pkhoigach.arr[i][j] == 1) {
                    if (this.Down(pkhoigach.iBoard + i, pkhoigach.jBoard + j) == 0)
                        return 0;
                }
        pkhoigach.iBoard += 1; //Roi xuong 1 so voi Board[22][10]
        return 1;
    },
    GanGiaTri: function (pkhoigach) {
        for (var i = 0; i < pkhoigach.Row; i++)
            for (var j = 0; j < pkhoigach.Col; j++)
                if (pkhoigach.arr[i][j] == 1) {
                    this.Board[pkhoigach.iBoard + i][pkhoigach.jBoard + j] = pkhoigach.colorBrick;
                }
    },

    XoayKhoiGach: function (pkhoigach) {
        var tmpArr;
        var tmpRow = pkhoigach.Col;
        var tmpCol = pkhoigach.Row;
        //Cấp phát bộ nhớ cho ma trận phụ tmpArr.
        tmpArr = new Array(tmpRow);
        for (var i = 0; i < tmpRow; i++) {
            tmpArr[i] = new Array(tmpCol);
        }
        ///////////////////////////////////////////////
        for (var i = pkhoigach.Row - 1; i >= 0; i--)
            for (var j = pkhoigach.Col - 1; j >= 0; j--) {
                tmpArr[j][pkhoigach.Row - i - 1] = pkhoigach.arr[i][j];
            }
        //Kiểm tra hợp lệ.
        for (var i = 0; i < tmpRow; i++) {
            for (var j = 0; j < tmpCol; j++)
                if (!this.Inside(pkhoigach.iBoard + i, pkhoigach.jBoard + j) || this.Board[pkhoigach.iBoard + i][pkhoigach.jBoard + j] > 0)
                    return;
        }
        //for (int i = 0; i < pkhoigach->Row; i++) free(pkhoigach->arr[i]);
        //free(pkhoigach->arr);

        // for (int i = 0; i < pkhoigach->Row; i++)
        // {
        //     delete[] pkhoigach->arr[i];
        // }
        // delete[] pkhoigach->arr;

        //Cập nhật thay đổi sau khi xoay.
        pkhoigach.Col = tmpCol;
        pkhoigach.Row = tmpRow;
        pkhoigach.arr = tmpArr;
    },
    HuyKhoiGach: function (pkhoigach) {
        //////Huy bo nho cua ma tran trang thai arr.
        //for (int i = 0; i < pkhoigach->Row; i++) free(pkhoigach->arr[i]);
        //free(pkhoigach->arr);
        /////////////////////////////////////////////////////////////
        pkhoigach.removeFromParent();
        this.updateGach();
    },
    KiemTra: function (pkhoigach) //-1 : gameover 0: win
    {
        var eatScore = 0;
        var sohang = 0;
        var i, j, count;
        i = pkhoigach.Row - 1;
        if (pkhoigach.iBoard <= 6) return -1;//Gameover
        do
        {
            count = 0;
            for (j = 0; j < MaxJ; j++) {
                if (this.Board[pkhoigach.iBoard + i][j] > 0) count++;
            }
            if (count == MaxJ) {
                var particle = new cc.ParticleSystem(wn.TetrisGameScene_Res.particle_plist);
                particle.setPosition(wn.config.OFFSETX + 4.5 * wn.config.BRICK_SIZE, wn.config.OFFSETY - (pkhoigach.iBoard + i - sohang) * wn.config.BRICK_SIZE);
                wn.thegame.addChild(particle, 99);
                particle.setAutoRemoveOnFinish(true);
                this.UpdateScore(10 + sohang * 10);
                sohang += 1;
                this.CapNhatLaiToaDo(pkhoigach.iBoard + i);
                eatScore = 1;
            } else {
                i = i - 1;
            }
        } while (i >= 0);
        return eatScore;
    },

    Ve_Next: function (ID) {
        var kh = wn.thegame.getChildByTag(99);
        if (kh) {
            kh.removeFromParent();
        }
        wn.nextColor = 0;
        var pnext = new TetrisBrick(ID);
        pnext.unscheduleUpdate();
        pnext.setPosition(510, 45);
        pnext.setScale(0.5);
        var children = pnext.getChildren();
        for (var i in children) {
            var spr = children[i];
            spr.setVisible(true);
        }
        wn.thegame.addChild(pnext);
        pnext.setTag(99);
        wn.nextColor = pnext.colorBrick;
    },

    Loai: function () {
        var x = wn.RandomInt(0, 6);
        //cc.log("Loại"+x);
        switch (x) {
            case 0:
                return 15;
                break;
            case 1:
                return 31;
                break;
            case 2:
                return 51;
                break;
            case 3:
                return 30;
                break;
            case 4:
                return 58;
                break;
            case 5:
                return 57;
                break;
            case 6:
                return 60;
                break;
        }
    },

    updateGach: function () {
        // for (auto v : mysprite)
        // {
        //     v->setVisible(false);
        // }
        var dem = 0;
        for (var i = 0; i < MaxI; i++)
            for (var j = 0; j < MaxJ; j++) {
                var spr = this.mysprite[dem];
                if (this.Board[i][j] > 0) {
                    spr.setTexture(wn.TetrisGameScene_Res["av" + this.Board[i][j].toString()]);
                    spr.setVisible(true);
                    spr.setPosition(j * wn.config.BRICK_SIZE + wn.config.OFFSETX, wn.config.OFFSETY - i * wn.config.BRICK_SIZE);
                } else {
                    spr.setVisible(false);
                }
                dem += 1;
            }

    },

    AdvantureModeUpdate: function () {
        for (var i = 0; i < MaxI - 1; i++)
            for (var j = 0; j < MaxJ; j++) {
                this.Board[i][j] = this.Board[i + 1][j];
            }
        for (var j = 0; j < MaxJ; j++) {
            var color = wn.RandomInt(0, 6);
            this.Board[MaxI - 1][j] = color;
        }
        this.updateGach();
    },

    isWin: function () {

        for (var i = 0; i < MaxI; i++)
            for (var j = 0; j < MaxJ; j++) {
                if (this.Board[i][j] == 7) {
                    return false;
                }

            }
        return true;
    }
});