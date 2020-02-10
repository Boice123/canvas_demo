var Confetti = function () {

    function Confetti(params) {
        this.parent = params.elm || document.body;
        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = params.width || this.parent.offsetWidth;
        this.height = params.height || this.parent.offsetHeight;
        this.length = params.length || Confetti.CONST.PAPER_LENGTH;
        this.yRange = params.yRange || this.height
        this.progress = new Progress({
            duration: params.duration,
            isLoop: true
        })
        this.rotationRange = params.rotationRange || 10
        this.speedRange = params.speedRange || 10
        this.sprites = []
        this.canvas.style.cssText = ["display: block", "position: absolute", "top: 0", "left: 0","pointer-events: none"].join(";");

        this.render = this.render.bind(this);

        this.build();

        this.parent.append(this.canvas);
        this.progress.start(performance.now());

        requestAnimationFrame(this.render);
    }

    Confetti.prototype.build = function build() {
        for (var i = 0; i < this.length; ++i) {
            var canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d");

            canvas.width = Confetti.CONST.SPRITE_WIDTH;
            canvas.height = Confetti.CONST.SPRITE_HEIGHT;
            canvas.position = {
                initX: Math.random() * this.width,
                initY: -Math.random() * this.yRange
            };

            canvas.rotation = this.rotationRange / 2 - Math.random() * this.rotationRange; // 0-5
            canvas.speed = this.speedRange / 2 + Math.random() * (this.speedRange / 2); // 5-10

            ctx.save();
            ctx.fillStyle = Confetti.CONST.COLORS[Math.random() * Confetti.CONST.COLORS.length | 0];
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();

            this.sprites.push(canvas);
        }
    }

    Confetti.prototype.render = function render(now) {
        let progress = this.progress.tick(now)

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        for (var i = 0; i < this.length; ++i) {
            this.ctx.save();                                   // 0-5     50      一次周期的百分比   
            this.ctx.translate(this.sprites[i].position.initX +this.sprites[i].rotation * Confetti.CONST.ROTATION_RATE * progress, this.sprites[i].position.initY + progress * (this.height + this.yRange));
            this.ctx.rotate(this.sprites[i].rotation);
            this.ctx.drawImage(this.sprites[i], -Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)) / 2, -Confetti.CONST.SPRITE_HEIGHT / 2, Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)), Confetti.CONST.SPRITE_HEIGHT);
            this.ctx.restore();
        }

        requestAnimationFrame(this.render);
    };

    _createClass(Confetti, null, [{
        key: "CONST",
        get: function get() {
            return {
                SPRITE_WIDTH: 9,
                SPRITE_HEIGHT: 16,
                PAPER_LENGTH: 100,
                DURATION: 8000,
                ROTATION_RATE: 50,
                COLORS: ["#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C"]
            };
        }
    }])
    return Confetti
}()