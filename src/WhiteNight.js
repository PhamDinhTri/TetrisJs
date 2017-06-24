/**
 * Created by tripham on 2/18/17.
 */
var wn = wn || {};
wn.replaceScene = function (ClassScene) {
    // cc.loader.loadJs("src/"+ ClassScene +".js",function (err) {
    //     if(err) return;
    var pScene = new cc.TransitionFade(0.5, eval('new ' + ClassScene + '()'));
    cc.director.runScene(pScene);
    // });
}


wn.replaceSceneDontLoad = function (ClassScene) {

    var pScene = new cc.TransitionFade(0.5, eval('new ' + ClassScene + '()'));
    cc.director.runScene(pScene);

}

wn.RandomInt = function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Sound manager
wn.LoadDone = false;
wn.isSound = true;
wn.playSound = function (soundFile, loop) {
    if (wn.isSound)
        cc.audioEngine.playEffect(soundFile, loop);
}

wn.stopSound = function (soundID) {
    cc.audioEngine.stopEffect(soundID);
}

wn.stopAllSounds = function () {
    cc.audioEngine.stopAllEffects();
}

wn.playBgMusic = function (bgMusicFile, loop) {
    if (wn.isSound)
        cc.audioEngine.playMusic(bgMusicFile, loop);
}
wn.stopBgMusic = function () {
    cc.audioEngine.stopMusic();
}

wn.pauseBgMusic = function () {
    cc.audioEngine.pauseMusic();
}

wn.resumeBgMusic = function () {
    cc.audioEngine.resumeMusic();
}

wn.rewindBgMusic = function () {
    cc.audioEngine.rewindMusic();
}

wn.SCREEN_SIZE = cc.winSize;
wn.config = wn.config || {};
wn.config.HIGH_SCORE = "highscore";

wn.config.LINK_GOOGLEPLAY = "market://details?id=com.funnygame.brickpuzzle.games";
wn.config.SCREEN_WIDTH_DESIGN = 960;
wn.config.SCREEN_HEIGHT_DESIGN = 1280;

wn.config.OFFSETX = 165;
wn.config.OFFSETY = 1480;
wn.config.BRICK_SIZE = 50;

// possition Main menu

wn.ui = wn.ui || {};

wn.ui.posBG = cc.p(wn.config.SCREEN_WIDTH_DESIGN / 2, wn.config.SCREEN_HEIGHT_DESIGN / 2);
wn.ui.posTitle = cc.p(wn.config.SCREEN_WIDTH_DESIGN / 2, wn.config.SCREEN_HEIGHT_DESIGN * 0.8);
wn.ui.posbtPlay = cc.p(wn.config.SCREEN_WIDTH_DESIGN / 2, wn.config.SCREEN_HEIGHT_DESIGN * 0.35);
wn.ui.posbtLeft = cc.p(wn.config.SCREEN_WIDTH_DESIGN * 0.22, wn.config.SCREEN_HEIGHT_DESIGN * 0.06);
wn.ui.posbtDown = cc.p(wn.config.SCREEN_WIDTH_DESIGN * 0.40, wn.config.SCREEN_HEIGHT_DESIGN * 0.06);
wn.ui.posbtRight = cc.p(wn.config.SCREEN_WIDTH_DESIGN * 0.58, wn.config.SCREEN_HEIGHT_DESIGN * 0.06);
wn.ui.posbtTurn = cc.p(wn.config.SCREEN_WIDTH_DESIGN * 0.78, wn.config.SCREEN_HEIGHT_DESIGN * 0.06);
// Game Mode

wn.GameMode = wn.GameMode || {};
wn.GameMode.MODE_CLASSIC = "classic";
wn.GameMode.MODE_ADVANTURE = "advanture";
wn.GameMode.MODE_PUZZLE = "puzzle";
wn.GameMode.Mode = wn.GameMode.MODE_ADVANTURE;

//GameManager

wn.level = 1;
wn.nextColor = 1;
wn.thegame = null;
wn.getLevelOpen = function () {
    var levelopen = cc.sys.localStorage.getItem("levelopen");
    return levelopen || 1;
}

wn.setLevelOpen = function (level) {
    if (level > wn.getLevelOpen()) {
        cc.sys.localStorage.setItem("levelopen", level);
    }
}

wn.getHighScore = function () {
    var highscore = 0;
    switch (wn.GameMode.Mode) {
        case wn.GameMode.MODE_CLASSIC:
            highscore = cc.sys.localStorage.getItem("classic");
            break;
        case wn.GameMode.MODE_ADVANTURE:
            highscore = cc.sys.localStorage.getItem("advanture");
            break;
        case wn.GameMode.MODE_PUZZLE:
            highscore = cc.sys.localStorage.getItem("puzzle");
            break;
        default:
            break;
    }
    return highscore || 0;
}

wn.setHighScore = function (score) {
    var highscore = wn.getHighScore();
    if (score > highscore) {
        switch (wn.GameMode.Mode) {
            case wn.GameMode.MODE_CLASSIC:
                cc.sys.localStorage.setItem("classic", score);

                break;
            case wn.GameMode.MODE_ADVANTURE:
                cc.sys.localStorage.setItem("advanture", score);

                break;
            case wn.GameMode.MODE_PUZZLE:
                cc.sys.localStorage.setItem("puzzle", score);

                break;
            default:
                break;
        }
    }
}
