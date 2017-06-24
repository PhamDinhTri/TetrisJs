var res = {
    Sounds: {
        bgmusic_mp3: "res/Sounds/bgmusic.mp3",
        move_Brick_new_wav: "res/Sounds/Move_Brick_new.wav",
        Rotate_Brick_new_wav: "res/Sounds/Rotate_Brick_new.wav",
        Stop_FastDown_new_wav: "res/Sounds/Stop_FastDown_new.wav",
        Eeat_Score_new_mp3: "res/Sounds/Eeat_Score_new.mp3"
    }
};

var g_resources = [];

for (var i in res) {
    g_resources.push(res[i]);
}
