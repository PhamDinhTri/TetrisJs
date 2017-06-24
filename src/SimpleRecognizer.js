/**
 * Created by tripham on 2/28/17.
 */
wn.SimpleGestures = wn.SimpleGestures || {};
wn.SimpleGestures.SimpleGesturesRight = 0;
wn.SimpleGestures.SimpleGesturesLeft = 1;
wn.SimpleGestures.SimpleGesturesUp = 2;
wn.SimpleGestures.SimpleGesturesDown = 3;
wn.SimpleGestures.SimpleGesturesError = 4;
wn.SimpleGestures.SimpleGesturesNotSupport = 5;

var SimpleRecognizer = cc.Class.extend({
    result: null,
    X: 0,
    Y: 0,
    points: [],
    isMove: false,
    ctor: function () {
        this.result = wn.SimpleGestures.SimpleGesturesError;
    },
    beginPoint: function (point) {
        this.result = wn.SimpleGestures.SimpleGesturesError;
        this.points = [];
        this.points.push(point);
        this.isMove = true;
    },
    movePoint: function (point) {
        this.points.push(point);
    },
    endPoint: function (point) {
        this.points.push(point);
        this.isMove = false;
        if (this.points.length < 3) {
            return wn.SimpleGestures.SimpleGesturesError;
        }

        var newRtn = wn.SimpleGestures.SimpleGesturesError;
        var len = this.points.length;

        var dx = this.points[len - 1].x - this.points[0].x;
        var dy = this.points[len - 1].y - this.points[0].y;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                newRtn = wn.SimpleGestures.SimpleGesturesRight;
            }
            else {
                newRtn = wn.SimpleGestures.SimpleGesturesLeft;
            }
        }
        else {
            if (dy > 0) {
                newRtn = wn.SimpleGestures.SimpleGesturesUp;
            }
            else {
                newRtn = wn.SimpleGestures.SimpleGesturesDown;
            }
        }

        // first set result
        if (this.result == wn.SimpleGestures.SimpleGesturesError) {
            this.result = newRtn;
        }

        // if diretcory change, not support Recongnizer
        if (this.result != newRtn) {
            this.result = wn.SimpleGestures.SimpleGesturesNotSupport;
        }
        return this.result;
    },
    getDistance: function () {
        return cc.pDistance(this.points[this.points.length - 1], this.points[0]);
    }
});

