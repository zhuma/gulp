/**
 * Created by hanshaojie on 2016/11/4.
 */
$(function(){
    console.log('iiii');
});
/*锁屏*/
function lockScreen(obj) {
    if($(window).scrollTop() === 0){
        obj.css({
            top: 0
        });
    }else{
        obj.css({
            top: $(window).scrollTop() + ($(window).height() / 2 - obj.height() / 2) + "px"
        });
    }

    obj.css({
        "visibility": "visible"
    });
    $("body").css("overflow", "hidden");
}

/*取消锁屏*/
function unlockScreen(obj) {
    obj.css({
        "visibility": "hidden"
    });
    $("body").css("overflow", "auto");
}
/*排序*/
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

