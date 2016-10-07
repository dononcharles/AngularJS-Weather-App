vovApp
    // =========================================================================
    // Base controller for Home
    // =========================================================================
    .controller('komiCtrl', function($timeout, $geolocation, $state, $scope, growlService, getOpenWeatherMap){
        //Welcome Message
        growlService.growl('Welcome Work For Us!', 'inverse')

        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           angular.element('html').addClass('ismobile');
        }
        // get button onclick action
        $scope.geo = {};
        var w = null;
        $scope.getCurrentWeather = function () {
            if ($scope.geo.country==undefined || $scope.geo.country=="" || $scope.geo.type == undefined) {
                $scope.geo.errorfindclasse = "label label-danger";
                $scope.geo.errorfindmsg = "Oops! Country or Country code or Zip code must be supplied!";
                return false;
            } else {
                $scope.loading = true;
                $scope.geo.errorfindmsg = $scope.geo.errorfindclasse = "";
                // instantiate a new weather
                if ($scope.geo.type  == 'zip') {
                    w = new getOpenWeatherMap(null, $scope.geo.country, null,null);
                } else {
                    w = new getOpenWeatherMap($scope.geo.country, null, null,null);
                } 
                $("#weather-widget").html("");
                w.getWeather().then(function() {
                    $scope.loading = false;
                    weather_shows(w)
                });
            }
        }

        /**
        ** Get weather by geolocation
        **/
        //$scope.loading = true;
        if (navigator.geolocation) {
           
           $geolocation.getCurrentPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
            }).then(function (position) {
                    $scope.loading = true;
                    // get position variables
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    // instantiate class
                    w = new getOpenWeatherMap(null, null, lat,lng);
                    // get weather according to position

                    w.getWeather().then(function() {
                        var html = "";
                        $scope.loading = false;
                        weather_shows(w)
                    });
                }
            );
        }else {}
        //Skin Switch
        this.currentSkin = 'teal';
        this.skinSwitch = function (color) {
            this.currentSkin = color;
        }

     weather_shows = function (w) {
    // Basic informations
        var html = "";
        var theDate = new Date(w.weather.dt * 1000);
        html += '<div class="col-sm-4" style="text-align:center">';
        html += '<div style="font-size: 18px !important;" class="weather-info m-b-10"> Weather in '+w.weather.name+', '+w.weather.sys.country+'</div>';
        html += '<div style="font-size: 20px;text-align:center" class="weather-info m-b-10">'+w.weather.weather[0].main+'</div>';
        html += '<div class="weather-status">'+parseFloat(w.weather.main.temp+(-273.15)).toFixed(2)+'&deg; Celsuis</div>';
        html += '<div class="weather-icon wi-'+w.weather.weather[0].icon+'"></div>';
        html += '<div style="font-size: 16px !important;" class="weather-info m-b-10">'+w.weather.weather[0].description+'</div>';
        html += '<div style="font-size: 15px !important" class="weather-info m-b-10">At '+theDate.toUTCString()+'</div>';
        html += '</div><br/>';
        // Other informations
        html += '<div class="col-sm-4" style="color:#000">';
        html += '<table class="table table-bordered table-striped"><tbody>';
        html += '<tr><td>Pressure(hPa)</td><td>'+w.weather.main.pressure+'</td></tr>';
        html += '<tr><td>Pressure on the sea(hPa)</td><td>'+w.weather.main.sea_level+'</td></tr>';
        html += '<tr><td>Pressure on the ground(hPa)</td><td>'+w.weather.main.grnd_level+'</td></tr>';
        html += '<tr><td>Humidity(%)</td><td>'+w.weather.main.humidity+'</td></tr>';
        html += '<tr><td>Min. Temp.(&deg;C)</td><td>'+parseFloat(w.weather.main.temp_min+(-273.15)).toFixed(2)+'</td></tr>';
        html += '<tr><td>Max. Temp.(&deg;C)</td><td>'+parseFloat(w.weather.main.temp_max+(-273.15)).toFixed(2)+'</td></tr>';
        html += '</tbody></table>';
        html += '</div>';
        // Others informations
        var theDate_sr = new Date(w.weather.sys.sunrise * 1000);
        var theDate_ss = new Date(w.weather.sys.sunset * 1000);
        html += '<div class="col-sm-4" style="color:#000">';
        html += '<table class="table table-bordered table-striped"><tbody>';
        html += '<tr><td>Wind speed(meter/sec)</td><td>'+w.weather.wind.speed+'</td></tr>';
        html += '<tr><td>Sunrise time</td><td>'+theDate_sr.toUTCString()+'</td></tr>';
        html += '<tr><td>Sunset time</td><td>'+theDate_ss.toUTCString()+'</td></tr>';
        html += '<tr><td>Geo coords</td><td>['+w.weather.coord.lat+','+w.weather.coord.lon+']</td></tr>';
        html += '</tbody></table>';
        html += '</div>';

        $("#weather-widget").html(html);
    }
  })
    // =========================================================================
    // Header
    // =========================================================================
    .controller('headerCtrl', function($timeout){})