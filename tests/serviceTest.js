'use strict';

describe('Service Tests', function(){

	 beforeEach(function(){
	    angular.mock.module('vovApp')
	    
	 });

	it('should have a growlService Service', function($service) {
	   	  var k = $service('growlService');
		  expect(k).toBeDefined();
	});

	it("Should have a growl method", function($service){
	     expect($service('growlService').growl).to.be.a('function')
	})

});