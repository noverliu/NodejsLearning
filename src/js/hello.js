
/**
* peopleServices Module
*
* 数据服务模块
*/
angular.module('peopleServices', ['ngResource']).
	factory('people',['$resource',function($resource){
		return $resource('GetAgent', {}, {
			list:{method:'GET',isArray:false},
			query:{method:'POST',isArray:false}
		});
	}]);	

/**
* testApp Module
*
* 主模块
*/
var app=angular.module('testApp', ['ngRoute','ngAnimate','peopleServices'])
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/peoples',{templateUrl:'partials/people-list.html',controller:'HelloAngular'}).
		when('/peoples/:peopleId',{templateUrl:'partials/people-detail.html',controller:'peopleDetailCtrl'}).
		otherwise({redirectTo:'/peoples'});
}])

app.factory('jcache', ['$cacheFactory', function($cacheFactory){
	return $cacheFactory('jcache');
}])

// 首字母大写过滤器
app.filter('FirstCharUpper',function(){
	return function(input){
		var a=input.trim().split(" ");
		var b=[];
		for(var i in a){
			b.push(a[i][0].toUpperCase()+a[i].substr(1).toLowerCase());
		}
		return b.join(" ");
	}
})

/// 列表页控制器
app.controller('HelloAngular', ['$scope','$http','$filter','people','jcache','$route', function($scope,$http,$filter,people,cache,$route){

	$scope.peoples=cache.get("people.list");
	if(!$scope.peoples){
		RefreshList();
	}
	function RefreshList(){
		people.query({type:"Pager",from:1,qty:4},function(data){
			$scope.peoples=data.data;
			$scope.Total=data.total;
			cache.put("people.list",$scope.peoples);
		});		
	}
	$scope.Refresh=function(){
		RefreshList();
	};
	$scope.orderfield="id";
	$scope.pageSize=3;
	$scope.pageIndex="0";
	jQuery(".pn.actived").css({
		'color':'red',
		'font-size':'40px'	
	})
	//$scope.pages=Math.ceil($filter("filter")($scope.peoples,$scope.query).length/$scope.pageSize);
	// $scope.peoples=a;
	$scope.BA=BuildArray;
	$scope.PrevPage=function(){
		var i=Number.parseInt($scope.pageIndex)-1;
		$scope.pageIndex=(i<0?0:i).toString();
	};
	$scope.NextPage=function(){		
		var i=Number.parseInt($scope.pageIndex)+1;
		var max=Math.ceil($filter("filter")($scope.peoples,$scope.query).length/$scope.pageSize)-1;
		$scope.pageIndex=(i>max?max:i).toString();
		if(i>=max){
			$scope.More();
		}

	};
	$scope.GoPage=function(i){
		$scope.pageIndex=(i-1).toString();
	}
	$scope.ChangeSize=function(){
		var pages=Math.ceil($filter("filter")($scope.peoples,$scope.query).length/$scope.pageSize);
		if($scope.pageIndex+1>pages){
			$scope.pageIndex=pages-1;
		}
	}
	$scope.More=function(){
		if(!($scope.query)){
			if($scope.peoples.length<$scope.Total){
				var f=$scope.peoples.length+1,
					t=4;
				people.query({type:"Pager",from:f,qty:t},function(data){
					$scope.peoples=$scope.peoples.concat(data.data);
					cache.put("people.list",$scope.peoples);
				})
			}
		}else{
			alert("请先清空筛选条件");
		}
	};
	function BuildArray(n){
		var a=[];
		for(var i=1;i<n;i++){
			a.push(i);
		}
		return a;
	}
}])

///详细页控制器
app.controller('peopleDetailCtrl', ['$scope','$routeParams','people','jcache', function($scope,$routeParams,people,cache){
	//var d=new people();
	
	//$scope.p=people.query({agentid:$routeParams.peopleId});
	$scope.p=cache.get('people.Id'+$routeParams.peopleId);
	if(!$scope.p){
		people.query({type:"Detail",agentid:$routeParams.peopleId},function(data){
			console.log(data.length);
			$scope.p=data.data[0];
			cache.put('people.Id'+$routeParams.peopleId,$scope.p);
		});		
	}
}])

///动画
app.animation(".pn",function(){
	return {
		addClass:function(element,className,done){
			if(className!="actived"){
				return;
			}
			// element.css({
			
			// });
			jQuery(element).css({
				'animation': 'zoom-in 0.3s forwards'
			});
			return function(cancel){
				if(cancel){
					element.stop();
				}
			};
		},
		removeClass:function(element,className,done){
			if(className!="actived"){
				return;
			}
			// element.css({
			// 	'font-size':'40px'			
			// });
			jQuery(element).css({
				'animation': 'zoom-out 0.3s forwards'
			});
			return function(cancel){
				if(cancel){
					element.stop();
				}
			};
		}
	};
});

///全局事件注册
app.run(['$rootScope','$log','$location','$window',function($rootScope,$log,$location,$window){
	var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);  
    var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);  
  
    var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);  
    var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);  
  
    function locationChangeStart(event) {  
        $log.log('locationChangeStart');  
        $log.log(arguments);  
        
        if($location.path()!=""&&$location.path()!="/peoples"){
        	
        }

    }  
  
    function locationChangeSuccess(event) {  
        $log.log('locationChangeSuccess');  
        $log.log(arguments);  
        console.log($location.path());
    }  
  
    function routeChangeStart(event) {  
        $log.log('routeChangeStart');  
        $log.log(arguments);  
        console.log($location.path());
    }  
  
    function routeChangeSuccess(event) {  
        $log.log('routeChangeSuccess');  
        $log.log(arguments);  
        console.log($location.path());
    }  
}])