function Ball(x, y, radius, color) {
    this.x = x || 0
    this.y = y || 0
    this.radius = radius || 12
    this.color = color || '#6699FF'

    this.scaleX = 1
    this.scaleY = 1
}

Ball.prototype = {
    fill: function(cxt) {
        cxt.save()
        cxt.translate(this.x, this.y)
        cxt.rotate(this.rotation)
        cxt.scale(this.scaleX, this.scaleY)
        cxt.fillStyle = this.color
        cxt.globalAlpha = .5
        cxt.beginPath()
        cxt.arc(0, 0, this.radius, 0, 360 * Math.PI / 180, false)
        cxt.closePath()
        cxt.fill()
        cxt.restore()
    },
    getRect: function() {
        var rect = {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
        }
        return rect
    }
}