window.tools = {}
window.tools.getMouse = function(element) {
    var mouse = { x: 0, y: 0}
    addEvent(element, "mousemove", function(e) {
        var x , y
        // 在IE中，event对象是作为window对象的一个属性存在
        var e = e || window.event
        // 兼容Firefox，chrome，IE9及以上
        if (e.pageX || e.pageY) {
            x = e.pageX
            y = e.pageY
        // 兼容IE8及以下，以及混杂模式下的chrome和Safari
        } else {
            x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft
            y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop
        }

        x -= element.offsetLeft
        y -= element.offsetTop

        mouse.x = x
        mouse.y = y
    })
    return mouse
}

window.tools.getKey = function() {
    var key = {}
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 38 || e.keyCode === 87) {
            key.direction = 'up'
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            key.direction = 'right'
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            key.direction = 'down'
        } else if (e.keyCode === 37 || e.keyCode === 65) {
            key.direction = 'left'
        } else {
            key.direction = ''
        }
    }, false)
    return key
}

window.tools.getRandomColor = function() {
    return '#' + 
    (function(color) {
        let c = (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && (color.length === 6) ? color : arguments.callee(color)
        return c
    })('')
}

window.tools.checkRect = function(rectA, rectB) {
    return (rectA.x + rectA.width > rectB.x &&
        rectB.x + rectB.width > rectA.x &&
        rectA.y + rectA.height > rectB.y &&
        rectB.y + rectB.height > rectA.y )
}

window.tools.checkCircle = function(circleA, circleB) {
    var dx = circleB.x - circleA.x
    var dy = circleB.y - circleA.y
    var distance = Math.sqrt(dx*dx + dy*dy)
    if (distance < (circleA.radius + circleB.radius)) {
        return true
    } else {
        return false
    }
}