/**
 * Created by tripham on 2/28/17.
 */
wn.TetrisGameScene_Res = {
    particle_plist: "res/GamePlay/particle.plist",
    gameover_png: "res/GamePlay/gameover.png",
    replay_png: "res/GamePlay/replay.png",
    rate_png: "res/GamePlay/rate.png",
    home_png: "res/GamePlay/home.png",
    gamepause_png: "res/GamePlay/gamepause.png",
    btnResume_png: "res/GamePlay/btnResume.png",
    btnReplay_png: "res/GamePlay/btnReplay.png",
    btnMainmenu_png: "res/GamePlay/btnMainmenu.png",
    help_jpg: "res/GamePlay/help.jpg",
    bg_png: "res/GamePlay/bg.png",
    down_png: "res/GamePlay/down.png",
    turn_png: "res/GamePlay/turn.png",
    pause_png: "res/GamePlay/pause.png",
    win_png: "res/GamePlay/win.png"
}

for (var i = 1; i <= 7; i++) {
    wn.TetrisGameScene_Res["av" + i.toString()] = "res/GamePlay/av" + i.toString() + ".png";
}

for (var i = 1; i <= 12; i++) {
    wn.TetrisGameScene_Res["map" + i.toString()] = "res/GamePlay/map" + i.toString() + ".tmx";
}

wn.TetrisGameScene_JsList = ["src/TetrisGameLogic.js", "src/TetrisBrick.js",
    "src/SimpleRecognizer.js", "src/GameOverLayer.js",
    "src/GamePauseLayer.js", "src/GameWinLayer.js"];
var TetrisGameScene = wn.BaseScene.extend({
    onEnter: function () {
        this._super();
        this.Res = wn.TetrisGameScene_Res;
        this.jsList = wn.TetrisGameScene_JsList;
        this.setOnLoadDone(function (err) {
            // if (err){
            //     cc.log("load error");
            // };
            wn.LoadDone = true;
            cc.log("-----------LOADDONE------------");
            var layer = new TetrisGameLayer();
            this.addChild(layer);
        });
        if (wn.LoadDone) {
            var layer = new TetrisGameLayer();
            this.addChild(layer);
        }
        else {
            this.loadResoures();
        }

    }
});
var TetrisGameLayer = cc.Layer.extend({
    score: 0,
    levelScore: 200,
    speedGame: 0.7,
    _currentTouchID: -1,
    isPlaying: true,
    _countBrick: -3,
    game: null,
    currKhoi: null,
    IDKhoiTiepTheo: 0,
    recognizer: null,
    scorelabel: null,
    ctor: function () {
        this._super();
        wn.thegame = this;
        this._currentTouchID = -1;
        if (wn.GameMode.Mode == wn.GameMode.MODE_PUZZLE) {
            var help = new cc.Sprite(wn.TetrisGameScene_Res.help_jpg);
            this.addChild(help, 99);
            help.setPosition(300, wn.config.SCREEN_HEIGHT_DESIGN * 0.5);
            help.runAction(new cc.Sequence(new cc.MoveTo(0.5, wn.ui.posBG),
                new cc.DelayTime(1),
                new cc.MoveTo(0.5, cc.p(wn.config.SCREEN_WIDTH_DESIGN + 300, wn.config.SCREEN_HEIGHT_DESIGN * 0.5)),
                new cc.CallFunc(function () {
                    help.removeFromParent();
                })));
        }

        this.makeControlButton();
        this.game = new TetrisGameLogic();
        this.addChild(this.game);
        this.currKhoi = new TetrisBrick(this.game.Loai());
        this.addChild(this.currKhoi);
        this.IDKhoiTiepTheo = this.game.Loai();
        this.game.Ve_Next(this.IDKhoiTiepTheo);
        //cc.log(this.IDKhoiTiepTheo);
        this.schedule(this.update, this.speedGame);

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function (key, event) {
                if (!self.isPlaying) {
                    return;
                }
                if (self.getChildByName("SelectMap")) {
                    return;
                }
                if (key == cc.KEY.back || key == cc.KEY.escape) {
                    self.isPlaying = false;
                    var pauselayer = new GamePauseLayer(cc.color(0, 0, 0, 200));
                    self.addChild(pauselayer, 99);
                }
                if (key == cc.KEY.w) {
                    wn.playSound(res.Sounds.Rotate_Brick_new_wav);
                    self.game.XoayKhoiGach(self.currKhoi);
                }
                self.unschedule(self.sangtrai);
                self.unschedule(self.roixuong);
                self.unschedule(self.sangphai);
                // if (key == cc.KEY.a){
                //
                // }
                // if (key == cc.KEY.s){
                //
                // }
                //
                // if (key == cc.KEY.d){
                //
                // }
            },
            onKeyPressed: function (key, event) {
                if (!self.isPlaying) {
                    return;
                }
                if (self.getChildByName("SelectMap")) {
                    return;
                }
                if (key == cc.KEY.a) {
                    self.schedule(self.sangtrai, 0.1);
                }
                if (key == cc.KEY.s) {
                    self.schedule(self.roixuong, 0.05);
                }

                if (key == cc.KEY.d) {
                    self.schedule(self.sangphai, 0.1);
                }
            }
        }, this);


        this.recognizer = new SimpleRecognizer();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: self.onTouchBegan,
            onTouchMoved: self.onTouchMoved,
            onTouchEnded: self.onTouchEnded,

        }, this);

        return true;
    },
    makeControlButton: function () {

        var self = this;

        var bg = new cc.Sprite(wn.TetrisGameScene_Res.bg_png);
        this.addChild(bg, -1);
        bg.setPosition(wn.ui.posBG);

        this.scorelabel = new ccui.Text("0", "arial", 40);
        this.addChild(this.scorelabel, 10);
        this.scorelabel.setPosition(740, 460);

        var highscorelabel = new ccui.Text(wn.getHighScore().toString(), "arial", 40);
        this.addChild(highscorelabel, 10);
        highscorelabel.setPosition(740, 260);

        var uilayout = new ccui.Layout();
        this.addChild(uilayout, 1);

        var moveLeft = new ccui.Button(wn.TetrisGameScene_Res.down_png);
        moveLeft.setRotation(90);
        moveLeft.setPressedActionEnabled(true);
        moveLeft.setPosition(wn.ui.posbtLeft);
        moveLeft.addTouchEventListener(this.tapMoveLeft, this);
        uilayout.addChild(moveLeft);


        var moveRight = new ccui.Button(wn.TetrisGameScene_Res.down_png);
        moveRight.setRotation(-90);
        moveRight.setPressedActionEnabled(true);
        moveRight.setPosition(wn.ui.posbtRight);
        moveRight.addTouchEventListener(this.tapMoveRight, this);
        uilayout.addChild(moveRight);

        var moveDown = new ccui.Button(wn.TetrisGameScene_Res.down_png);
        moveDown.setPressedActionEnabled(true);
        moveDown.setPosition(wn.ui.posbtDown);
        moveDown.addTouchEventListener(this.tapMoveDown, this);
        uilayout.addChild(moveDown);

        var Turn = new ccui.Button(wn.TetrisGameScene_Res.turn_png);
        Turn.setPressedActionEnabled(true);
        Turn.setPosition(wn.ui.posbtTurn);
        Turn.addTouchEventListener(this.tapTurn, this);
        uilayout.addChild(Turn);

        var btnPause = new ccui.Button(wn.TetrisGameScene_Res.pause_png);
        btnPause.setPressedActionEnabled(true);
        btnPause.setPosition(wn.config.SCREEN_WIDTH_DESIGN * 0.78, wn.config.SCREEN_HEIGHT_DESIGN * 0.85);
        btnPause.addClickEventListener(function () {
            self.isPlaying = false;
            var pauselayer = new GamePauseLayer(cc.color(0, 0, 0, 200));
            self.addChild(pauselayer, 99);
        });
        uilayout.addChild(btnPause);

        // Button* btnRank = Button::create();
        // btnRank->loadTextures("GamePlay/rank.png", "GamePlay/rank.png");
        // btnRank->setPressedActionEnabled(true);
        // btnRank->setPosition(Vec2(SCREEN_WIDTH_DESIGN*0.78, SCREEN_HEIGHT_DESIGN*0.72));
        // btnRank->addClickEventListener([=](Ref*)
        // {
        //     if (NativeUtils::isSignedIn())
        //     {
        //         NativeUtils::showLeaderboards();
        //     }
        //     else
        //     {
        //         NativeUtils::signIn();
        //     }
        // });
        // uilayout->addChild(btnRank);


    },

    tapMoveLeft: function (pSender, type) {
        if (type == ccui.Widget.TOUCH_BEGAN) {
            wn.playSound(res.Sounds.move_Brick_new_wav);
            this.game.SangTrai(this.currKhoi);
            this.schedule(this.sangtrai, 0.1);
        }
        else if (type != ccui.Widget.TOUCH_MOVED) {
            //SoundGame::getInstance()->stopAllEffects();
            this.unschedule(this.sangtrai);
        }
    },


    tapMoveRight: function (pSender, type) {
        if (type == ccui.Widget.TOUCH_BEGAN) {
            wn.playSound(res.Sounds.move_Brick_new_wav);
            this.game.SangPhai(this.currKhoi);
            this.schedule(this.sangphai, 0.1);
        }
        else if (type != ccui.Widget.TOUCH_MOVED) {
            //SoundGame::getInstance()->stopAllEffects();
            this.unschedule(this.sangphai);
        }
    },
    tapMoveDown: function (pSender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                //SoundGame::getInstance()->playEffect("tetris/MoveFast_Brick_new.wav");
                this.game.RoiXuong(this.currKhoi);
                this.schedule(this.roixuong, 0.05);
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            default:
                //SoundGame::getInstance()->stopAllEffects();
                this.unschedule(this.roixuong);
                break;
        }
    },
    tapTurn: function (pSender, type) {
        if (type == ccui.Widget.TOUCH_BEGAN) {
            wn.playSound(res.Sounds.Rotate_Brick_new_wav);
            this.game.XoayKhoiGach(this.currKhoi);
        }
    },
    update: function (dt) {
        if (!this.isPlaying) {
            return;
        }
        if (this.game.RoiXuong(this.currKhoi) == 0) {
            wn.playSound(res.Sounds.Stop_FastDown_new_wav);
            this.game.GanGiaTri(this.currKhoi);
            if (wn.GameMode.Mode == wn.GameMode.MODE_ADVANTURE) {
                this._countBrick++;
                if (this._countBrick == 3) {
                    this._countBrick = 0;
                    this.game.AdvantureModeUpdate();
                }

            }

            var ketqua = this.game.KiemTra(this.currKhoi);
            if ((ketqua == -1)) {
                //cc.log("gameover");
                // AdMob::showFullGame();
                this.gameover();
                return;
            } else if (ketqua == 1) {
                if (wn.GameMode.Mode == wn.GameMode.MODE_PUZZLE) {
                    if (this.game.isWin()) {

                        this.isPlaying = false;
                        //AdMob::showFullGame();
                        var gameWinLayer = new GameWinLayer(cc.color(0, 0, 0, 100));
                        this.addChild(gameWinLayer, 99);
                    }
                }
            }


            this.game.HuyKhoiGach(this.currKhoi);
            this.currKhoi = new TetrisBrick(this.IDKhoiTiepTheo);
            this.addChild(this.currKhoi);
            this.IDKhoiTiepTheo = this.game.Loai();
            this.game.Ve_Next(this.IDKhoiTiepTheo);
        }
    },
    displayscore: function () {
        this.scorelabel.setString(this.score.toString());
        wn.playSound(res.Sounds.Eeat_Score_new_mp3);
        wn.setHighScore(this.score);
    },
    gameover: function () {
        this.isPlaying = false;
        var gameoverLayer = new GameOverLayer(cc.color(0, 0, 0, 200));
        this.addChild(gameoverLayer, 99);
    },
    roixuong: function (dt) {
        //SoundGame::getInstance()->playEffect("tetris/MoveFast_Brick_new.wav");
        this.game.RoiXuong(this.currKhoi);
    },
    sangtrai: function (dt) {
        wn.playSound(res.Sounds.move_Brick_new_wav);
        this.game.SangTrai(this.currKhoi);
    },
    sangphai: function (dt) {
        wn.playSound(res.Sounds.move_Brick_new_wav);
        this.game.SangPhai(this.currKhoi);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._currentTouchID < 0) {

            target._currentTouchID = touch.getID();
        }
        else {
            return false;
        }
        var beginPoint = touch.getLocation();
        target.recognizer.beginPoint(beginPoint);
        return true;
    },
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._currentTouchID != touch.getID()) {
            return;
        }

        var pos = touch.getLocation();
        target.recognizer.movePoint(pos);
        if (target.recognizer.getDistance() >= 40) {
            var rtn = target.recognizer.endPoint(pos);
            target.recognizer.beginPoint(pos);
            //recognizer->getPoints().clear();
            //log("xx=%f", touch->getCurrentForce());
            switch (rtn) {
                case wn.SimpleGestures.SimpleGesturesLeft:
                    wn.playSound(res.Sounds.move_Brick_new_wav);
                    target.game.SangTrai(target.currKhoi);
                    //this->schedule(schedule_selector(TetrisGameScene::sangtrai), 0.1f);

                    break;
                case wn.SimpleGestures.SimpleGesturesRight:
                    wn.playSound(res.Sounds.move_Brick_new_wav);
                    target.game.SangPhai(target.currKhoi);

                    break;
                case wn.SimpleGestures.SimpleGesturesUp:
                    break;
                case wn.SimpleGestures.SimpleGesturesDown:
                    target.game.RoiXuong(target.currKhoi);
                    break;

                case wn.SimpleGestures.SimpleGesturesNotSupport:
                case wn.SimpleGestures.SimpleGesturesError:
                    log("not support or error touch,use geometricRecognizer!!");
                    break;

                default:
                    break;
            }
        }
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._currentTouchID == touch.getID()) {
            target._currentTouchID = -1;
        } else return;

        //Point pos = touch->getLocation();
//	recognizer->movePoint(pos);
        //log("%d,%d", recognizer->getDistance(), recognizer->getPoints().size());
        if (cc.pDistance(touch.getLocation(), touch.getStartLocation()) < 3) {
            wn.playSound(res.Sounds.Rotate_Brick_new_wav);
            target.game.XoayKhoiGach(target.currKhoi);
        }

    }
});










