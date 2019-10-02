function Box(x, y, width, height, color) {
    this.x = x || 0
    this.y = y || 0
    this.width = width || 80
    this.height = height || 80
    this.color = color || '#6699FF'

    this.vx = 0
    this.vy = 0
}

Box.prototype = {
    stroke : function(cxt) {
        cxt.save()
        cxt.strokeStyle = this.color
        cxt.beginPath()
        cxt.rect(this.x, this.y, this.width, this.height)
        cxt.closePath()
        cxt.stroke()
        cxt.restore()
    },
    fill: function(cxt) {
        cxt.save()
        cxt.fillStyle = this.color
        cxt.beginPath()
        cxt.rect(this.x, this.y, this.width, this.height)
        cxt.closePath()
        cxt.fill()
        cxt.restore()
    }
}