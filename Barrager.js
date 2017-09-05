// 弹幕定时器
var timers = [];
// 控制弹幕显隐变量
var isShow = true;
// 监听发送按钮
$(".sub").on("click", function () {
    // 创建弹幕
    var jqueryDom = createScreenbullet($("#dm").val());
    // 添加定时任务
    addInterval(jqueryDom);
});
// 监听关闭弹幕按钮
$(".del").on("click", function () {
    if (isShow) {
        $(".bullet").css("opacity", 0);
        isShow = false;
    } else {
        $(".bullet").css("opacity", 1);
        isShow = true;
    }   
});
// 新建一个弹幕
function createScreenbullet(text) {
    var jqueryDom = $("<div class='bullet'>" + text + "</div>");
    var fontColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random()) + ")";
    var fontSize = Math.floor((Math.random() + 1) * 24) + "px";
    var left = $(".show").width() + "px";
    var top = Math.floor(Math.random() * 300) + "px";
    top = parseInt(top) > 252 ? "252px" : top;
    jqueryDom.css({
        "position": 'absolute',
        "color": fontColor,
        "font-size": fontSize,
        "left": left,
        "top": top
    $(".show").append(jqueryDom);
    return jqueryDom;
}
// 为弹幕添加定时任务
function addInterval(jqueryDom) {
    var left = jqueryDom.offset().left - $(".show").offset().left;  //使left为负值
    var timer = setInterval(function () {
        left--;
        jqueryDom.css("left", left + "px");
        if (jqueryDom.offset().left + jqueryDom.width() < $(".show").offset().left) {
            jqueryDom.remove();              //到达墙最左边后移除弹幕
            clearInterval(timer);
        }
    }, 10);
    timers.push(timer);
}