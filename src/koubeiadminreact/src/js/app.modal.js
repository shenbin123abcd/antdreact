;app.modal=(function(){
    "use strict";
    var autoMiddle=function(){
        var totalHeight=$('#modal-block-mask').outerHeight();
        var dialogHeight=$("#modal-block-dialog").outerHeight();
        var height=($('#modal-block-mask').outerHeight()-$("#modal-block-dialog").outerWidth())/2;
        var width=($('#modal-block-mask').outerWidth()-$("#modal-block-dialog").outerWidth())/2;
        $('#modal-block-dialog').css('margin-top',height);
        $('#modal-block-dialog').css('margin-left',width);
    }
    var _alert=function(settings={
        content:'提示内容',
        btn:'确定',
    }){
        var deferred = $.Deferred();
        var alertHtmlStr=`
                <div class="modal-alert-block">
                    <div class="modal-block-mask" id="modal-block-mask"></div>
                    <div class="modal-block-dialog" id="modal-block-dialog">
                        <div class='modal-dialog-body'>
                            <div class="modal-dialog-text">${settings.content}</div>
                        </div>
                        <div class='modal-dialog-footer'>
                            <div class="modal-dialog-alert">${settings.btn}</div>
                        </div>
                    </div>
                </div>`;
            var $alertHtml=$(alertHtmlStr);
            $("body").append($alertHtml);
            autoMiddle();
            $alertHtml.find(".modal-block-dialog").addClass('animated fadeInUp');
            var $confirmBt=$alertHtml.find(".modal-dialog-footer");
            $confirmBt.on('click',function(){
                $alertHtml.find(".modal-block-dialog").addClass('animated fadeOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                    $alertHtml.remove()
                });
                deferred.resolve(true);
            });

            return deferred.promise();
        };

        var _confirm=function(settings={
            title:'温馨提示',
            content:'提示内容',
            leftBtn:'取消',
            rightBtn:'确定'
        }){
            var deferred = $.Deferred();
            var confirmHtmlStr= `
                <div class="modal-alert-block">
                    <div class="modal-block-mask" id="modal-block-mask"></div>
                    <div class="modal-block-dialog confirm" id="modal-block-dialog">
                        <div class='modal-confirm-title'>
                            <div class="modal-dialog-text">${settings.title}</div>
                        </div>
                        <div class="modal-confirm-content">
                            <div class="modal-dialog-text">${settings.content}</div>
                            <div class="line"></div>
                        </div>
                        <div class='modal-confirm-footer'>
                            <div class="confirm-left-btn btn-style" id='confirm-left-btn'>${settings.leftBtn}</div>
                            <div style="flex:0 0 .22rem;"></div>
                            <div class="confirm-right-btn btn-style" id='confirm-right-btn'>${settings.rightBtn}</div>
                        </div>
                    </div>
                </div>`;
            var $confirmHtmlStr=$(confirmHtmlStr);
            $("body").append($confirmHtmlStr);
            autoMiddle();
            $confirmHtmlStr.find(".modal-block-dialog").addClass('animated fadeInUp');
            $('#confirm-left-btn').on('click',function(){
                $confirmHtmlStr.find(".modal-block-dialog").addClass('animated fadeOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                    $confirmHtmlStr.remove()
                });
                deferred.resolve(true);
            });
            $('#confirm-right-btn').on('click',function(){
                $confirmHtmlStr.find(".modal-block-dialog").addClass('animated fadeOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                    $confirmHtmlStr.remove()
                });
                deferred.reject(true);
            });

            return deferred.promise();

        };

        var loading=(function(){
            var loadingHtmlStr='' +
                '<div id="loadingToast" class="weui_loading_toast" >' +
                '<div class="weui_mask_transparent"></div>' +
                '<div class="weui_toast">' +
                '<div class="weui_loading">' +
                '<div class="weui_loading_leaf weui_loading_leaf_0"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_1"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_2"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_3"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_4"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_5"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_6"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_7"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_8"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_9"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_10"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_11"></div>' +
                '</div>' +
                '<p class="weui_toast_content">数据加载中</p>' +
                '</div>' +
                '</div>' +
                '';
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

        return{
            alert:_alert,
            confirm:_confirm,
            loading:loading,
        };
}());


