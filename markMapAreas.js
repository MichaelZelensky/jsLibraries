/*
* (c) 2016 Michael Zelensky <michaelzelensky@gmail.com>
*
* JavaScript, which highlights maps' clickable areas
*
* Usage:
*
* mapMapAreas.show() - highlights areas for all visible images that have maps
* mapMapAreas.hide() - de-highlights all areas
*
* markMapAreas.rectStyle for highlight styles set up
*
* */
(function(){
    //http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom

    var markMapAreas = {
        rectStyle : 'position:absolute; border:1px solid #ccc; background: rgba(127,174,238,.5); top: %t; left: %l; width: %w; height: %h',
        rectClass : 'markMapAreas',
        show: function () {
            var mapName, map, areas, shape, coords, w, h, x, y, div, style, a,
                imgs = document.getElementsByTagName('img');

            function isHidden(el) {
                return (el.offsetParent === null)
            }

            for (var i in imgs) {
                if (imgs.hasOwnProperty(i) && !isHidden(imgs[i]) && imgs[i].hasAttribute('usemap')) {
                    mapName = imgs[i].getAttribute('usemap').replace('#','');
                    map = document.getElementsByName(mapName)[0];
                    areas = map.childNodes;
                    for (var j in areas) {
                        if (areas.hasOwnProperty(j) && areas[j].nodeName.toLowerCase() === 'area') {
                            shape = areas[j].getAttribute('shape').toLowerCase();
                            coords = areas[j].getAttribute('coords').split(',');
                            switch (shape) {
                                case 'rect':
                                    x = imgs[i].offsetLeft + coords[0] * 1;
                                    y = imgs[i].offsetTop + coords[1] * 1;
                                    w = coords[2] * 1 - coords[0] * 1;
                                    h = coords[3] * 1 - coords[1] * 1;
                                    a = document.createElement('a');
                                    a.setAttribute('href', areas[j].getAttribute('href'));
                                    div = document.createElement('div');
                                    div.className = this.rectClass;
                                    style = this.rectStyle
                                        .replace('%t', y + 'px')
                                        .replace('%l', x + 'px')
                                        .replace('%w', w + 'px')
                                        .replace('%h', h + 'px');
                                    div.setAttribute('style', style);
                                    a.append(div);
                                    document.body.append(a);
                                    break;
                                case 'default':
                                case 'circle':
                                case 'poly':
                                    break;
                            }

                        }
                    }
                }
            }
        },
        hide: function () {
            var els;
            els = document.getElementsByClassName(this.rectClass);
            while (els.length > 0) {
                for (var i = 0, n = els.length; i < n; i++) {
                    if (els[i]) els[i].remove();
                }
                els = els = document.getElementsByClassName(this.rectClass);
            }
        }
    };

    //export
    window.markMapAreas = markMapAreas;
})();