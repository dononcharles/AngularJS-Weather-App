'use strict';

describe('Factory Tests', function(){

	var $http;
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';

	 beforeEach(function(){
	    angular.mock.module('vovApp')
	 });

	it('should have a getOpenWeatherMap Service', function($factory) {
	   	  var k = $factory('getOpenWeatherMap');
		  expect(k).toBeDefined();
	});

	it("Should call Json", function($factory){
		var k = $factory('getOpenWeatherMap');
		$http.expectJSONP(k.apiUrl).respond(true)
	})

});