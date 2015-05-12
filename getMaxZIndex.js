/**
 * (c) Michael Zelensky 2015
 *
 * DESCRIPTION
 *
 * Returns maximum z-index on page for all elements
 *
 * LICENSE
 *
 * Distributed under MIT License
 * You can use this code in your project without limitation, no matter if it is commercial or not,
 * with all copyright marks intact
 *
 * USAGE
 *
 * Just include this code into your JS or HTML and then
 *
 * var maxZIndex = getMaxZIndex();
 *
 */

getMaxZIndex = function () {
    var zIndex,
        z = 0,
        all = document.getElementsByTagName('*');
    for (var i = 0, n = all.length; i < n; i++) {
        zIndex = document.defaultView.getComputedStyle(all[i],null).getPropertyValue("z-index");
        zIndex = parseInt(zIndex, 10);
        z = (zIndex) ? Math.max(z, zIndex) : z;
    }
    return z;
};