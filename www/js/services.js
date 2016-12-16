//angular.module('starter.services', [])
//
//.factory('Items', function ItemsFactory($http) {
//
//  return {
//    getAll: function (data) {
//
//
//    
//      return $http({
//        url: "http://localhost:8100/search/index.xml?key=82xm1jqMij4RLVs4dlXCw&q" + "&q=" + $scope.value,
//        method: "GET",
//        transformResponse: function (value) {            
//          var x2js = new X2JS({});            
//          $scope.test = value.toString();            
//          var response = angular.bind(x2js, x2js.xml_str2json, value)();            
//          return response;        
//        }
//      })
//    },
//
//  }
//});