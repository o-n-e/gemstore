(function() {
    var app = angular.module('gemStore', ['store-directives']);

    app.controller('StoreController',['$http',  function($http){
        var store = this;
        store.products = [];

        $http.get('data/store-products.json').success(function(data) {
            store.products = data;
        });
    }]);

    app.controller('FeatureController',['$http', '$scope', function($http, $scope){
        var feats = this;
        feats.availableFeatures = [];
        feats.selectedFeatures = [];

        feats.calculation_dates = [];
        feats.cusips = [];
        feats.isons = [];
        feats.iso_country_codes = [];
        feats.sectors = [];
        feats.security_names = [];

        feats.availableValues = [];
        feats.selectedValues = [];

        feats.filter = [];

        $http.get('data/field-taxonomy.json').success(function(data) {
            feats.availableFeatures = data;
        });

        $http.get('data/calculation_date.json').success(function(data) {
            feats.calculation_dates = data;
        });

        $http.get('data/cusip.json').success(function(data) {
            feats.cusips = data;
        });

        $http.get('data/isin.json').success(function(data) {
            feats.isins = data;
        });

        $http.get('data/iso_country_code.json').success(function(data) {
            feats.iso_country_codes = data;
        });

        $http.get('data/sector.json').success(function(data) {
            feats.sectors = data;
        });

        $http.get('data/security_name.json').success(function(data) {
            feats.security_names = data;
        });

        this.moveItem = function(item, from, to) {

            console.log('Move item   Item: '+item+' From:: '+from+' To:: '+to);
            //Here from is returned as blank and to as undefined

            // Add or remove from Box 2
            var idx=from.indexOf(item);
            if (idx != -1) {
                from.splice(idx, 1);
                to.push(item);
                feats.availableValues = [];
            }

            // Add or remove from Filter
            var queryIdx = feats.filter.indexOf(item.name)
            if (queryIdx == -1) {
                var key = item.name;
                feats.filter.push({
                    key: item.name,
                    value: []
                });
            }
            else
            {
                feats.filter.splice(queryIdx, 1);
            }
        };

        this.selectedFeatureChanged = function() {

            if($scope.selectedFeature[0].name == "calc_date") {
                feats.availableValues = feats.calculation_dates;
            }
            if($scope.selectedFeature[0].name == "cusip") {
                feats.availableValues = feats.cusips;
            }
            if($scope.selectedFeature[0].name == "isin") {
                feats.availableValues = feats.isins;
            }
            else if ($scope.selectedFeature[0].name == "iso_country_code") {
                feats.availableValues = feats.iso_country_codes;
            }
            else if ($scope.selectedFeature[0].name == "sector") {
                feats.availableValues = feats.sectors;
            }
            else if ($scope.selectedFeature[0].name == "security_name") {
                feats.availableValues = feats.security_names;
            }
        };

        this.moveAll = function(from, to) {

            console.log('Move all  From:: '+from+' To:: '+to);
            //Here from is returned as blank and to as undefined

            angular.forEach(from, function(item) {
                to.push(item);
            });
            from.length = 0;
        };
    }]);

    app.controller('ReviewController', function() {
        this.review = {};

        this.addReview = function(product) {
            product.reviews.push(this.review);

            this.review = {};
        };
    });
})();
