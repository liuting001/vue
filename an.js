/*
* COMMONS
* */

function myEach(source, cb){
    if(!source || !source.length) return;
    var i = 0, len = source.length;
    for(; i < len; i++){
        cb.call(source, i, source[i]);
    }
}
function lazyFunction(fn, timeout){
    var timer = 0;
    return function(){
        if(timer) window.clearTimeout(timer);
        var args = arguments, that = this;
        timer = window.setTimeout(function(){
            fn.apply(that, args)
        }, timeout);
    };
}
function limitFunction(fn, timeout){
    var last_exec = 0;
    return function(){
       var now = +new Date();
       if(now - last_exec < timeout) return;
        last_exec = now;
        fn.apply(this, arguments);
    };
}
function loadScript(url, cb){
    var script = document.createElement ("script")
    script.type = "text/javascript";
    if (script.readyState){ //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                script.parentNode.removeChild(script);
                cb && cb();
            }
        };
    } else {
        script.onload = function(){
            script.parentNode.removeChild(script);
            cb && cb();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}