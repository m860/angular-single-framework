/**
 * Created by Jean on 4/30/2015.
 */
require("colors");

var path = require("path")
    , fmt = require("string-formatter");

exports.i = function () {
    arguments[0] = fmt.format(">>> {0}", arguments[0]).magenta;
    console.log.apply(null, arguments);
};

exports.w = function () {
    arguments[0] = fmt.format("*** {0}", arguments[0]).yellow;
    console.log.apply(null, arguments);
};