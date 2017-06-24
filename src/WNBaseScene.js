/**
 * Created by tripham on 2/28/17.
 */
wn.BaseScene = cc.Scene.extend({
    jsList: [],
    Res: {},
    onLoadDone: null,
    setOnLoadDone: function (call) {
        this.onLoadDone = call;
    },
    loadResoures: function () {
        var res = [];
        var self = this;
        for (var i in this.Res) {
            res.push(this.Res[i]);
        }
        cc.loader.load(res, function (result, count, loadedCount) {
        }, function (err) {
            self.onLoadDone(err);
        });
        // });
    },
});