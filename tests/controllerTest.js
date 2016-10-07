'use strict';
describe('Controller Tests', function(){

	var scope;
    var controller;

	beforeEach(function(){
	    angular.mock.module('vovApp')
	 });

	it('should have a komiCtrl controller', function($controller) {
	    expect($controller('komiCtrl')).toBeDefined();
	});

	it('should have a headerCtrl controller', function($controller) {
	    expect($controller('headerCtrl')).toBeDefined();
	});

	it('should have a working growlService service', 
		function($controller) {
	   	  var k = $controller('growlService');
          expect(k.growl).toBeDefined();
     	  var message = 'Hello!';
     	  var type = 'inverse';
     	  var p = growlService.growl(message, type);
     	  expect(p).toBeDefined();
    });

    //$scope.getCurrentWeather

	it('should have a getCurrentWeather function', function($controller) {
	    var k = $controller('komiCtrl');
	    expect(k.getCurrentWeather).toBeDefined()
	});

});