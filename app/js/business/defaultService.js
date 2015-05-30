/*!
 * Created by Jean on 5/30/2015.
 * 
 * email:mahai_1986@126.com
 *
 */
define(["app","app.config"],function(app,config){

    app.factory("defaultService",function(){

        var service={};

        service.hello=function(){
            alert("Hello , i am  a default service");
        };

        return service;

    });

});