/*
* Author : Jean
* Email  : jean.ma.1986@gmail.com
* Url    : https://github.com/m860/jquery-components
* Date   : Sun May 10 2015 11:43:41
*/
/*!
 * Created by Jean on 5/10/2015.
 * 
 * email:mahai_1986@126.com
 *
 */
(function(nameSpace){
    if(!window[nameSpace]) window[nameSpace]={};

    //var Component=window[nameSpace];

    function Component(){
        this.event = {};
    }
    Component.prototype={
        on: function (name, fn) {
            if (!this.event[name]) {
                this.event[name] = [];
            }
            this.event[name].push(fn);
        },
        trigger: function (name, data) {
            var me = this;
            var evt = this.event[name];
            if (!evt) return;
            $.each(evt, function (index, fn) {
                fn.bind(me)(data);
            });
        }
    };

    window[nameSpace]["Base"]=Component;

})("Component");
/*!
 * Created by Jean on 5/10/2015.
 * 
 * email:mahai_1986@126.com
 *
 */
(function (component) {

    function Loading(loadingStyle) {

        component.Base.call(this);

        this._arr = [];
        this._loadingStyle = "";
        switch (typeof(loadingStyle)) {
            case "function":
                this._loadingStyle = loadingStyle();
                break;
            default:
                var reg = /\.gif$/i;
                if (reg.test(loadingStyle)) {
                    this._loadingStyle = '<img src="' + loadingStyle + '">';
                }
                else {
                    this._loadingStyle = loadingStyle;
                }
        }

        this._mask = '<div class="loading-mask"></div>';
        this._loading = '<div class="loading"></div>';
        this._startIndex = 10000;
    }

    Loading.prototype = new component.Base();
    Loading.prototype = {
        appendLoading: function (container) {
            var top = 0
                , left = 0
                , width
                , height
                , hideScreen = false
                , zIndex = this._startIndex;

            if (typeof(container) === "boolean") {
                $(document.body).css("overflow", "hidden");
                container = $(document.documentElement);
                width = container.width();
                height = container.height();
                var winHeight = $(window).height();
                if (height < winHeight) height = winHeight;
                hideScreen = true;
            }
            else {
                container = $(container);
                width = container.outerWidth(true);
                height = container.outerHeight(true);
                var offset = container.offset();
                top = offset.top;
                left = offset.left;
            }

            //mask
            var mask = $(this._mask);
            zIndex += this._arr.length;
            mask.css({
                top: top
                , left: left
                , width: width
                , height: height
                , zIndex: zIndex
            });
            this._arr.push(mask);
            mask.appendTo(document.body);

            //loading
            var loading = $(this._loading);
            loading.html(this._loadingStyle);
            zIndex += this._arr.length;
            loading.css({
                top: top + (height / 2)
                , left: left
                , width: width
                , zIndex: zIndex
            });
            if (hideScreen) {
                loading.css({
                    top: top + (height / 2) + $(window).scrollTop()
                });
            }


            this._arr.push(loading);
            loading.appendTo(document.body);


        },
        removeLoading: function () {
            if(this._arr.length<=0) return;
            this._arr.pop().remove();
            this._arr.pop().remove();
            $(document.body).css("overflow", "auto");
        }
    };

    component["Loading"] = Loading;

})(window["Component"]);