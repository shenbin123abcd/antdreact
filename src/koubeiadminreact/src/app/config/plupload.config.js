var imagesOptions={
    url : "/file/upload",
    max_file_size: '5mb',
    flash_swf_url: '/plupload/js/Moxie.swf',
    runtimes: 'html5,flash',
    max_retries: 3,
    dragdrop: true,    //开启可拖曳上传
    chunk_size: '5mb',                //分块上传时，每片的体积
    filters: {
        mime_types : [
            { title : "图片文件", extensions : "jpg,gif,png,jpeg" },
        ]
    },
    headers:{
        'Authorization': 'Bearer '+ hb.Cookies.get('koubei_token')
    },
    init: {
        'FilesAdded': function(up, files) {
            plupload.each(files, function(file) {
                // 文件添加进队列后,处理相关的事情

            });
        },
        'FileUploaded': (up, file, info)=> {
            // console.log(info);
            var res = JSON.parse(info.response).data;
            // var img=_.find($scope.productData.top_images,{'c_id':file.id});
            console.log(res)
        },
        'UploadProgress': function(up, file) {
            console.log(up.total.percent)
            // var img=_.find($scope.productData.top_images,{'c_id':file.id});
            // $scope.$apply(function(){
            //     // console.log(up.total.percent);
            //     if(up.total.percent==100){
            //         img.progress=99
            //     }else{
            //         img.progress=up.total.percent;
            //     }
            //     // vm.progress=up.total.percent;
            // });
        },
    },
};

export default imagesOptions
