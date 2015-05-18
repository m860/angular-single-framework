/*
* Author : Jean
* Email  : jean.ma.1986@gmail.com
* Url    : https://github.com/m860/jsext
* Date   : Mon May 18 2015 21:30:26
*/
/*
* @item:Array的元素
* @index:当前索引值
* @list:当前Array的引用
* [].each(function(item,index,list){
*
* });
*
* */
if (!Array.prototype.each) {
    Array.prototype.each = function (callback) {
        var i = 0, len = this.length;
        for (; i < len; i++) {
            callback(this[i], i, this);
        }
    };
}

/**
 * Created by Jean on 4/25/2015.
 */


if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
/*!
 * Created by Jean on 5/18/2015.
 * 
 * email:mahai_1986@126.com
 *
 */
if(!Array.prototype.find){
    Array.prototype.find=function(fn){
        var i= 0,len=this.length;
        for(;i<len;i++){
            if(fn(this[i])){
                return this[i];
            }
        }
        return null;
    };
}