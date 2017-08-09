$(document).ready(function() {
    var ref=new Wilddog("https://wd6274823488zzlisu.wilddogio.com");
    var arr = [];
    // 监听发送按钮
    $(".sub").click(function () {
        //将弹幕压入后台野狗数据库
        var bar=$("#dm").val();
        ref.child("message").push(bar);
        $("#dm").val('');
        // 添加定时任务
        addInterval(jqueryDom);
    });

    $("#dm").keypress(function(event) {
        if(event.keyCode=='13'){
            $(".sub").trigger('click');
        }
    });

    // 监听关闭弹幕按钮
    $(".del").on("click", function () {
        ref.remove();
        arr=[];  
        $(".show").empty();
    });

    // 新建一个弹幕
    ref.child('message').on('child_added', function(snapshot){
                var text = snapshot.val();
                arr.push(text);   //压入数组内
                var jqueryDom = $("<div class='bullet'>" + text + "</div>");
                $(".show").append(jqueryDom);
                createScreenbullet(jqueryDom);
            }

    var createScreenbullet=function(jqueryDom){
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
        });
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

    var getRun=function(){
        if (arr.length>0){
            var n=Math.floor(Math.random()*arr.length+1)-1;
            var jqueryDom=$("<div>"+arr[n]+"</div>");
            $(.show).append(jqueryDom);
            createScreenbullet(jqueryDom);
        }
        setTimeout(getRun,3000);    //设定每隔三秒调用一次getRun方法，使放在arr数组中的一个弹幕显示出来
    }

    jQuery.fx.interval = 50;
          getRun();

});


 
