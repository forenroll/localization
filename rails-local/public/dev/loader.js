/*global document, window, angular*/

(function () {
    'use strict';
    require(["js/dev/jquery"], function () {
        var vendors = [
            'vendor/angular/angular.min',
            'vendor/lodash/lodash.min',
            'vendor/vis/vis',
            'vendor/untar/untar',
            'vendor/angular/angular-resource.min',
            'vendor/angular/angular-cookies.min',
            'vendor/angular/angular-translate.min',
            'vendor/angular/ng-file-upload-shim.min',
            'vendor/angular/ng-file-upload.min',
            'vendor/angular/angular-translate-loader-static-files.min',
            'vendor/vis/angular-vis',
            'main',
            'services/network_service',
            'services/network_options',
            'services/unpack_service',
            'services/network_unit',
            'services/utils',
            'services/multipath_conf',
            'services/conf_files_reader',
            'controller/main_ctrl',
            'controller/upload_ctrl'
        ];
        // config require
        require.config({
            urlArgs: ''
        });
        var base = '/labs/mpcv/js/';
        var paths = {};
        var shim = {};
        vendors.map(function (dep) {
            var pathArr = dep.split('/');
            var module = (pathArr[pathArr.length - 1].split('.'))[0];
            paths[module] = dep;
            shim[module] = {exports: module};
        });
        require.config({
            baseUrl: base,
            paths: paths,
            shim: shim
        });
        // keep track of deferreds we are loading
        var dfds = [];
        var qLoad = function (mod, index) {
            var previousDfd = dfds[index - 1];
            dfds[index] = new jQuery.Deferred();
            // Internal load that actually wraps the chrometwo_require
            var _load = function () {
                require(mod.split(), function () {
                    // All good, resolve deferred
                    dfds[index].resolve();
                });
            };
            if (previousDfd) {
                // We have a previous mod loading, chain the next load
                previousDfd.then(_load);
            } else {
                // First module being loaded. Fire away
                _load();
            }
            return dfds[index].promise();
        };
        // Queue up loading of modules
        var i = 0;
        Object.keys(paths).forEach(function (item) {
            qLoad(item, i);
            i += 1;
        });
        // Once all modules have loaded bootstrap it
        jQuery.when.apply(jQuery, dfds).then(function () {
            // Bootstrap angular app
            angular.bootstrap(document, ['app.main']);
        });

    });
})();

