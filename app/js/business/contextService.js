/*!
 * Created by Jean on 5/30/2015.
 * 
 * email:mahai_1986@126.com
 *
 */
define(["app", "app.config"], function (app, config) {


    app.factory("contextService", function ($q, $http, $injector) {

        var service = {};

        //title
        service.title = function (title) {
            if (title) {
                $(document).attr("title", title);
            }
            else {
                return $(document).attr("title");
            }
        };


        return service;

    });

});