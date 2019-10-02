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