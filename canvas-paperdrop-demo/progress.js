var Progress = function () {
    function Progress() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        
        this.timestamp = null;
        this.duration = params.duration || Progress.CONST.DURATION;
        this.progress = 0;
        this.delta = 0;
        this.progress = 0;
        this.isLoop = !!params.isLoop;

        this.reset()
    }

    Progress.prototype.reset = function reset() {
        this.timestamp = null;
    };

    Progress.prototype.start = function start(now) {
        console.log('start')
        this.timestamp = now;
    };

    Progress.prototype.tick = function tick(now) {
        if (this.timestamp) {
            this.delta = now - this.timestamp;
            this.progress = Math.min(this.delta / this.duration, 1);

            if (this.progress >= 1 && this.isLoop) {
                this.start(now);
            }

            return this.progress;
        } else {
            return 0;
        }
    };

    _createClass(Progress, null, [{
        key: "CONST",
        get: function get() {
            return {
                DURATION: 1000
            };
        }
    }]);

    return Progress;
}()