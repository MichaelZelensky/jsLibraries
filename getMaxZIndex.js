/**
 * (c) Michael Zelensky 2015
 *
 * DESCRIPTION
 *
 * Ctrl, Shift, Alt, Cmd buttons detector for Mac
 * to support corresponding event.ctrlKey, event.shiftKey, event.altKey which do not work on Mac
 *
 * LICENSE
 *
 * Distributed under MIT License
 * You can use this code in your project without limitation, no matter if it is commercial or not,
 * with all copyright marks intact
 *
 * USAGE
 *
 * Just include this code into your JS or HTML and then check if key is pressed in your code, e.g.:
 *
 * window.onclick = function (event) {
 *     if (event.ctrlKey || macKeys.ctrlKey) {
 *         //do something
 *     }
 * }
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