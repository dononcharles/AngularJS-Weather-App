vovApp
	/*
	* we define a new factory 
	*and inject our original service so we can extend it properly
	*/
	.factory('getOpenWeatherMap', function($http){
		
		var API_ID = '26ebd56d290f2db6d9ca2aa38a830db9';
		var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';

		// instantiate our initial object by country
		var getOpenWeatherMap = function(country, zip, lat, long) {
			this.country = country;
			this.weather = null;
			this.zip = zip;
			this.lat = lat;
			this.long = long;
		}

		// define the getWeather method which will fetch data
	    // from openweathermap API and *returns* a promise
	    getOpenWeatherMap.prototype.getWeather = function() {
			var self = this;
			var params = '';
			if(this.country != null ){
				params = '?q=' + this.country;
			}else if(this.lat != null && this.long != null){
				params = '?lat=' + this.lat + '&lon=' + this.long;
			}else{
				params = '?zip=' + this.zip;
			}

	        return $http.get(apiUrl + params + '&APPID=' + API_ID).then(function(response) {
	            // when we get the results we store the data in weather
	            self.weather = response.data
	            return response;
	        });
	    };


		return getOpenWeatherMap;
	})