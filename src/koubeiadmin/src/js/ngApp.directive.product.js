angular.module('halo')
    .directive('productData', ['$timeout','$sce','$state','productService',function($timeout,$sce,$state,productService){
        var linkFunction=function($scope, $element, $attrs){
            var vm;
            $scope.vm=vm={};
            vm.step=['基本信息','商品头图','图文详情','服务内容','赠品配置'];
            vm.currentStep=1;
            vm.dpOptions = {
                minDate: new Date(),
                showWeeks: false
            };
            function init() {
                getShops();
            }



            vm.formSubmitStep1=function (data) {
                // console.log($scope.formStep1)
                if(!$scope.formStep1.$valid){
                    return
                }
                switch ($scope.formAction){
                    case 'add':
                        vm.currentStep++;
                        break;
                    case 'update':
                        break;
                }
            };
            vm.formSubmitStep2=function (data) {
                if(data.top_images.length==0){
                    app.util.alert('请上传头图');
                    return
                }
                if(!data.cover){
                    app.util.alert('请选择封面');
                    return
                }
                switch ($scope.formAction){
                    case 'add':
                        vm.currentStep++;
                        break;
                    case 'update':
                        break;
                }
            };
            vm.formSubmitStep3=function (data) {
                if(data.content_images.length==0){
                    app.util.alert('请上传头图');
                    return
                }
                switch ($scope.formAction){
                    case 'add':
                        vm.currentStep++;
                        break;
                    case 'update':
                        break;
                }
            };
            vm.formSubmitStep4=function (data) {
                if(!$scope.formStep4.$valid){
                    return
                }
                switch ($scope.formAction){
                    case 'add':
                        vm.currentStep++;
                        break;
                    case 'update':
                        break;
                }
                $timeout(function(){$scope.$apply()});
            };
            vm.formSubmitStep5=function (data) {
                // console.log(data)
                // console.log($scope.formStep5)
                // console.log($scope.formAction)
                

                if(!$scope.formStep5.$valid){
                    return
                }

                if(!_.every(data.top_images, 'aid')){
                    app.util.alert('头图还有未上传完毕的头像，请等待上传完成或删除');
                }
                if(!_.every(data.content_images, 'aid')){
                    app.util.alert('详情图还有未上传完毕的头像，请等待上传完成或删除');
                }

                switch ($scope.formAction){
                    case 'add':
                        var submitData=_.cloneDeep(data);
                        // console.log(data);
                        submitData.top_images=_.map(submitData.top_images,'aid').join(',');
                        submitData.content_images=_.map(submitData.content_images,'aid').join(',');
                        submitData.shop_ids=_.map(submitData.shop_ids,'shop_id').join(',');
                        submitData.gifts=_.map(submitData.gifts,n=>{
                            n.shop_ids=_.map(n.shop_ids,'shop_id').join(',');
                            n.start_time=moment(n.start_time).format("YYYY-MM-DD");
                            n.end_time=moment(n.end_time).format("YYYY-MM-DD");
                            return _.omit(n, ['end_time_isOpen','start_time_isOpen','$$hashKey'])
                        });
                        submitData.gifts=JSON.stringify(submitData.gifts);
                        // console.log(submitData);
                        app.util.loading.show();
                        productService.add(submitData).then(res=> {
                            // vm.productData={name:'jack'};
                            app.util.loading.hide();
                            app.util.toast(res.info);
                            submitData=null;
                            $state.go('product');
                        },res=>app.util.alert(res));
                        break;
                    case 'update':
                        break;
                }
            };

            vm.switchStep=function (currentStep,index) {
                // console.log(currentStep);
                var data=$scope.productData;
                var distStep=index+1;
                switch (currentStep){
                    case 1:
                        if(!$scope.formStep1.$valid){
                            $scope.formStep1.$setSubmitted();
                            return
                        }

                        break;
                    case 2:
                        if(data.top_images.length==0){
                            app.util.alert('请上传头图');
                            return
                        }
                        if(!data.cover){
                            app.util.alert('请选择封面');
                            return
                        }
                        break;
                    case 3:
                        if(data.content_images.length==0){
                            app.util.alert('请上传详情图片');
                            return
                        }
                        break;
                    case 4:
                        if(!$scope.formStep4.$valid){
                            $scope.formStep4.$setSubmitted();
                            return
                        }
                        break;
                    case 5:
                        if(!$scope.formStep5.$valid){
                            $scope.formStep5.$setSubmitted();
                            return
                        }
                        break;
                }
                switch ($scope.formAction){
                    case 'add':
                        switch (distStep){
                            case 1:
                                $timeout(function(){$scope.$apply()});
                                break;
                            case 2:
                                break;
                            case 3:
                                if(data.top_images.length==0){
                                    app.util.alert('请上传头图');
                                    return
                                }
                                if(!data.cover){
                                    app.util.alert('请选择封面');
                                    return
                                }
                                break;
                            case 4:
                                if(data.top_images.length==0){
                                    app.util.alert('请上传头图');
                                    return
                                }
                                if(!data.cover){
                                    app.util.alert('请选择封面');
                                    return
                                }
                                if(data.content_images.length==0){
                                    app.util.alert('请上传详情图片');
                                    return
                                }
                                break;
                            case 5:
                                if(data.top_images.length==0){
                                    app.util.alert('请上传头图');
                                    return
                                }
                                if(!data.cover){
                                    app.util.alert('请选择封面');
                                    return
                                }
                                if(data.content_images.length==0){
                                    app.util.alert('请上传详情图片');
                                    return
                                }
                                if(!$scope.formStep4.$valid){
                                    $scope.formStep4.$setSubmitted();
                                    return
                                }
                                $timeout(function(){$scope.$apply()});
                                break;
                        }
                        break;
                    case 'update':
                        break;
                }


                vm.currentStep=index+1;


            };
            vm.clearGiftsShop_ids=function (data) {
                // console.log(data)
                data.gifts.forEach(n=>{
                    n.shop_ids=null;
                })

            };
            vm.removeImg=function (images,aid) {
                // console.log(images,aid)
                if($scope.productData.cover==aid){
                    $scope.productData.cover=null;
                }
                _.remove(images,{aid:aid});
            };

            vm.addFormStep5Child=function (data) {
                data.unshift({id:0});
            };
            vm.removeFormStep5Child=function (data,index) {
                _.pullAt(data,index);
            };

            vm.top_imagesOptions={
                url : "/file/upload",
                max_file_size: '5mb',
                runtimes: 'html5,flash',
                filters: {
                    mime_types : [
                        { title : "图片文件", extensions : "jpg,gif,png,jpeg" },
                    ]
                },
                headers:{
                    'Authorization': 'Bearer '+ hb.Cookies.get('koubei_token')
                },
                multipart_params:{
                    type:'cehua',
                    module:'top',
                },
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后,处理相关的事情
                            $scope.$apply(function(){
                                $scope.productData.top_images.push({
                                    c_id:file.id,
                                });
                                // vm.applyData.certification=res.url;
                            });
                        });
                    },
                    'FileUploaded': (up, file, info)=> {
                        // console.log(info);
                        var res = JSON.parse(info.response).data;
                        var img=_.find($scope.productData.top_images,{'c_id':file.id});
                        $scope.$apply(()=>{
                            // console.log(up, file,res)
                            // _.find($scope.productData.top_images,{'id':file.id}).url=`https://dl.django.t.taobao.com/rest/1.0/image?fileIds=${res}&zoom=original`;
                            // var img=_.find($scope.productData.top_images,{'c_id':file.id}).url=`https://dl.django.t.taobao.com/rest/1.0/image?fileIds=${res.url}&zoom=original`;

                            img.progress=100;
                            // img.url=res.url;
                            _.assign(img,res);
                            // console.log(img)
                            // img.url=`${res}`;
                            // vm.applyData.certification=res.url;
                        });
                    },
                    'UploadProgress': function(up, file) {
                        // console.log(up.total.percent)
                        var img=_.find($scope.productData.top_images,{'c_id':file.id});
                        $scope.$apply(function(){
                            // console.log(up.total.percent);
                            if(up.total.percent==100){
                                img.progress=99
                            }else{
                                img.progress=up.total.percent;
                            }
                            // vm.progress=up.total.percent;
                        });
                    },
                },
            };
            vm.content_imagesOptions={
                url : "/file/upload",
                max_file_size: '5mb',
                runtimes: 'html5,flash',
                filters: {
                    mime_types : [
                        { title : "图片文件", extensions : "jpg,gif,png,jpeg" },
                    ]
                },
                headers:{
                    'Authorization': 'Bearer '+ hb.Cookies.get('koubei_token')
                },
                multipart_params:{
                    type:'cehua',
                    module:'content',
                },
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后,处理相关的事情
                            $scope.$apply(function(){
                                $scope.productData.content_images.push({
                                    c_id:file.id,
                                });
                                // vm.applyData.certification=res.url;
                            });
                        });
                    },
                    'FileUploaded': (up, file, info)=> {
                        // console.log(info);
                        var res = JSON.parse(info.response).data;
                        var img=_.find($scope.productData.content_images,{'c_id':file.id});
                        $scope.$apply(()=>{
                            // console.log(up, file,res)
                            // _.find($scope.productData.top_images,{'id':file.id}).url=`https://dl.django.t.taobao.com/rest/1.0/image?fileIds=${res}&zoom=original`;
                            // var img=_.find($scope.productData.top_images,{'c_id':file.id}).url=`https://dl.django.t.taobao.com/rest/1.0/image?fileIds=${res.url}&zoom=original`;

                            img.progress=100;
                            // img.url=res.url;
                            _.assign(img,res);
                            // console.log(img)
                            // img.url=`${res}`;
                            // vm.applyData.certification=res.url;
                        });
                    },
                    'UploadProgress': function(up, file) {
                        // console.log(up.total.percent)
                        var img=_.find($scope.productData.content_images,{'c_id':file.id});
                        $scope.$apply(function(){
                            // console.log(up.total.percent);
                            if(up.total.percent==100){
                                img.progress=99
                            }else{
                                img.progress=up.total.percent;
                            }
                            // vm.progress=up.total.percent;
                        });
                    },
                },
            };

            function getShops() {
                productService.getShops({
                    per_page:9999
                }).then(res=>{
                    vm.shops=res.data.list;
                    // vm.shops = [
                    //     { branch_shop_name:'adasd', name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
                    //     { branch_shop_name:'adasd', name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
                    //     { branch_shop_name:'adasd', name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
                    //     { branch_shop_name:'adasd', name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
                    //     { branch_shop_name:'adasd', name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
                    //     { branch_shop_name:'adasd', name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
                    //     { branch_shop_name:'adasd', name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
                    //     { branch_shop_name:'adasd', name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
                    //     { branch_shop_name:'adasd', name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
                    //     { branch_shop_name:'adasd', name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
                    // ];
                });
            }

            init();


        };
        return{
            restrict: 'AE',
            templateUrl: $sce.trustAsResourceUrl('/views/ngApp-directive-product.html'),
            scope: {
                productData:'=',
                formAction:'@',
            },
            link:linkFunction
        }
    }])



;
