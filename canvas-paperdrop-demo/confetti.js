var Confetti = function () {

    function Confetti(params) {
        console.log(params)
        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.parent = params.elm || document.body;
        this.width = params.width || this.parent.offsetWidth;
        this.height = params.height || this.parent.offsetHeight;
        this.length = params.length || Confetti.CONST.PAPER_LENGTH;
        this.yRange = params.yRange || this.height
        this.progress = new Progress({
            duration: params.duration,
            isLoop: true
        })
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
        for (let i = 0; i < this.length; i++) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = Confetti.CONST.SPRITE_WIDTH;
            canvas.height = Confetti.CONST.SPRITE_HEIGHT

            canvas.position = {
                initX: Math.random() * 400,
                initY: 0
            }

            canvas.speed = this.speedRange / 2 + Math.random() * (this.speedRange / 2); // 5-10

            ctx.save();
            ctx.fillStyle = Confetti.CONST.COLORS[Math.random() * Confetti.CONST.COLORS.length | 0];
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore()

            this.sprites.push(canvas)
        }
        console.log(this.sprites)
    }

    Confetti.prototype.render = function render(now) {
        let progress = this.progress.tick(now)
        this.canvas.width = this.width
        this.canvas.height = this.height
        for (let i = 0; i < this.length; i++) {
            this.ctx.save()
            this.ctx.translate(this.sprites[i].position.initX, this.sprites[i].position.initY + progress * this.height);
            this.ctx.drawImage(this.sprites[i], -Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.cos(Math.PI * 2 * progress*this.sprites[i].speed))/2, Confetti.CONST.SPRITE_HEIGHT / 2,  Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.cos(Math.PI * 2 * progress * this.sprites[i].speed)), Confetti.CONST.SPRITE_HEIGHT);
            this.ctx.restore()
        }
        requestAnimationFrame(this.render) 
    }

    _createClass(Confetti, null, [{
        key: "CONST",
        get: function get() {
            return {
                SPRITE_WIDTH: 50,
                SPRITE_HEIGHT: 50,
                PAPER_LENGTH: 2,
                DURATION: 8000,
                COLORS: ["#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C"]
            };
        }
    }])

    return Confetti
}()