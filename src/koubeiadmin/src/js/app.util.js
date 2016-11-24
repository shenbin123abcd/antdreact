window.app.util=(function(){
    var _alert=function(options){
        var deferred = $.Deferred();
        var defaults = {
            title:'提示',
            content:'提示内容',
            btn:'确定',
        };
        if(typeof options=="string"){
            defaults = $.extend(defaults,{
                content:options
            });
        }else{

        }

        var settings = $.extend( {},defaults, options );

        var alertHtmlStr='' +
            '<div class="weui-dialog__alert" >'+
            '<div class="weui-mask"></div>'+
            '<div class="weui-dialog" style="display: none;" >'+
            '<div class="weui-dialog__hd"><strong class="weui-dialog__title">'+
            settings.title+
            '</strong></div>' +
            '<div class="weui-dialog__bd">'+
            settings.content +
            '</div>' +
            '<div class="weui-dialog__ft">' +
            '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">'+settings.btn +'</a>' +
            '</div>' +
            ' </div>' +
            ' </div>' +
            '';
        var $alertHtml=$(alertHtmlStr);
        $("body").append($alertHtml);
        $alertHtml.find(".weui-dialog").fadeIn(200);
        var $confirmBt=$alertHtml.find(".weui-dialog__btn");
        $confirmBt.on('click',function(){
            $alertHtml.remove();
            deferred.resolve(true);
        });
        return deferred.promise();
    };

    var _confirm=function(options){
        var deferred = $.Deferred();
        var defaults = {
            title:'提示',
            content:'提示内容',
            rightBtn:'确定',
            leftBtn:'取消',
        };

        if(typeof options=="string"){
            defaults = $.extend(defaults,{
                content:options
            });
        }else{

        }

        var settings = $.extend( {},defaults, options );
        var confirmHtmlStr=`
                    <div class="weui-dialog__confirm">
                    <div class="weui-mask"></div>
                    <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">${settings.title}</strong></div>
                    <div class="weui-dialog__bd">${settings.content}</div>
                    <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">${settings.leftBtn}</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">${settings.rightBtn}</a>
                    </div>
                    </div>
                    </div>
                    `;


        var $confirmHtml=$(confirmHtmlStr);
        $("body").append($confirmHtml);
        $confirmHtml.find(".weui-dialog").fadeIn(200);
        var $confirmBt=$confirmHtml.find(".weui-dialog__btn.weui-dialog__btn_primary");
        $confirmBt.on('click',function(){
            $confirmHtml.remove();
            deferred.resolve(true);
        });
        var $cancelBt=$confirmHtml.find(".weui-dialog__btn.weui-dialog__btn_default");
        $cancelBt.on('click',function(){
            $confirmHtml.remove();
            deferred.reject(false);
        });
        return deferred.promise();

    };



    var loading=(function(){
        var loadingHtmlStr=`<div  >
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">数据加载中</p>
    </div>
</div>`;
        var $loadingHtml=$(loadingHtmlStr);
        var show=function(){
            $("body").append($loadingHtml);
        };
        var hide=function(){
            $loadingHtml.remove();
        };

        return{
            show:show,
            hide:hide
        }
    }());



    var guideDownload,guideShare;
    (function(){
        var guide=function(url){
            var imgUrl=url;
            var loadingHtmlStr=`
                    <div style="position: fixed;z-index: 99999;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.8);">
                        <img style='position: absolute;width: 138px;top: 5px;right: 20px;' src="${imgUrl}">
                    </div>
                `;
            var $loadingHtml=$(loadingHtmlStr);

            var show=function(){
                $("body").append($loadingHtml);
                $loadingHtml.on('click touchmove',function(){
                    $loadingHtml.remove();
                });
            };

            var hide=function(){
                $loadingHtml.remove();
            };

            return{
                show:show,
                hide:hide
            }
        };










    }());




    var toast=function(msg){
        var toastHtmlStr=`<div >
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">${msg}</p>
    </div>
</div>`;
        var $toastHtml=$(toastHtmlStr);
        $("body").append($toastHtml);
        var $weui_toast=$toastHtml.find(".weui-toast");
        $weui_toast.fadeIn(200);
        var hideToast=function(){
            $toastHtml.fadeOut(400).remove();
        };
        setTimeout(hideToast,600);
    };



    return{
        alert:_alert,
        confirm:_confirm,
        loading:loading,
        toast:toast,
    };
}());