angular.module('localmarketApp')
.controller('AdvertiseCtrl', ['AdvertiseService', '$location', function(AdvertiseService, $location) {

  var self = this;
  self.advertiseService = AdvertiseService;
  // self.alertService = AlertService;

  self.advertise = function(data) {
    AdvertiseService.advertise(self.data).then(function() {
       // self.alertService.set('Posted successfully');
       $location.path('/default');
    }, function(err) {
       // self.alertService.set(err.data.msg);
    });
  };
}])

.controller('SearchCtrl', ['SearchService', '$location', function(SearchService,  $location) {
  var self = this;
  self.searchService = SearchService;
  self.searchResults = [];
  // self.alertService = AlertService;
  self.search = function(keyword) {
    return self.searchService.search(self.keyword).then(function() {
       var redirect = function(searchResults) {
        $location.path('/list');
      };
      redirect(searchResults);
    }, function(err) {
       // self.AlertService.set('Sorry, no results at this point. Please spread the word about the app and get your friends to post here.');

    });
  };
}])


.controller('DefaultCtrl', ['$location', function($location) {
  var self = this;
  // self.alertService = AlertService;
  self.search = function() {
        $location.path('/search');
  };
  self.post = function() {
        $location.path('/advertise');
  };
  self.home = function() {
        $location.path('/default');
  };
}])

.controller('ListCtrl', ['ListService','SingleService','$location', function(ListService, SingleService, $location) {
  var self = this;
  self.listService = ListService;
  self.singleService = SingleService;
  self.ads = searchResults;

  self.select = function(ad){
  	self.singleService.set(ad);

  	 var selectOne = function(ad) {
    		$location.path('/single');
  		};
  		selectOne(ad);
  }
}])
.controller('SingleCtrl', ['SingleService', function(SingleService) {
  var self = this;
  self.singleService = SingleService;

  self.ad = function(){
  	return self.singleService.get();
  }
}])

.controller('InterestCtrl', ['InterestService', '$location',  '$scope', '$http',
  function(InterestService, $location, $scope, $http) {
  var self = this;
  self.interestService = InterestService;
  self.locationData = [];

   var loadSuccess = function(resp) {
      resp.data.forEach(function(d){
        self.locationData.push(d.Location + " " + d.District + " (" + d.Pincode + ")");
      });
      $scope.locationData = self.locationData;
      return self.locationData;
    };
    var loadFailure = function(err) {
      return $q.reject(err.data);
    };
    

  self.load = function(){
    return $http.get('data/pincodes.json').then(loadSuccess, loadFailure);
  };

  $scope.complete = function(){
    $("#locations").autocomplete({
      source: $scope.locationData
    });
  } 


self.submit = function(location) {
  self.location = $('#locations').val();
  // console.log(self.buy, self.sell, self.items, self.email);

  return self.interestService.submit(self.buy, self.sell, self.items, self.email, self.location)
      .then(function() {
      console.log('success');
         var redirect = function() {
          $location.path('/thanks');
        };
        redirect();
      }, 
      function(err) {
        console.log(err);
      });
};

}])

;
