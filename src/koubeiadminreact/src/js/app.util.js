/**
 * Created by Administrator on 2016/10/14.
 */
;app.util=(function(){

    function setIframeHeight(){
        var h=document.documentElement.scrollHeight;
        if(h<1416){
            h=1416;
        }
        window.parent.postMessage(`{"pageHeight": ${h}}`, '*');
    }

    return {
        setIframeHeight,

    };
}());

