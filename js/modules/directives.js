vovApp

// =========================================================================
// Directive for loading spinner
// ================================================================= 
.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div style="margin-left: 42%;" class="preloader pls-pink pl-xl"><svg class="pl-circular" viewBox="25 25 50 50"><circle class="plc-path" cx="50" cy="50" r="20"></circle></svg></div>',
        link: function (scope, element, attr) {
          scope.$watch('loading', function (val) {
              if (val)
                  $(element).show();
              else
                  $(element).hide();
          });
        }
      }
})