/**
 * (c) Michael Zelensky 2015
 *
 * DESCRIPTION
 *
 * Library for converting XML into JS object
 *
 * LICENSE
 *
 * Distributed under MIT License
 * You can use this code in your project without limitation, no matter if it is commercial or not,
 * with all copyright marks intact
 *
 * USAGE
 *
 * Just include this code into your JS or HTML and then you will have xmlConverter object in global namespace
 * (literally, window.xmlConverter). This object has only one method xml2obj which accepts XML document as
 * parameter and returns JS object. NOTE, that parameter must be XML document type, the method will not accept
 * String type.
 *
 */

var xmlConverter = {};

xmlConverter.xml2obj = function(xmlDoc) {
    if (typeof xmlDoc !== 'object' || xmlDoc.nodeType !== 9) return;
    removeBlank(xmlDoc);
    return addNode(xmlDoc);

    function addNode (node) {
        if (node.nodeName === '#text') return;
        var nodeObj = {
                name : (node.nodeName === '#document') ? 'root' : node.nodeName
            },
            attributes = node.attributes,
            nodes = node.childNodes,
            i, n;

        if (nodes.length && nodes[0].nodeName === '#text') {
            if (nodes[0].textContent) {
                nodeObj.content = nodes[0].textContent;
            }  else if (nodes[0].text) { //IE
                nodeObj.content = nodes[0].text;
            }
        }

        //add attributes
        if (attributes !== undefined && attributes.length) {
            nodeObj.attributes = {};
            for (i = 0, n = attributes.length; i < n; i++) {
                nodeObj.attributes[attributes[i].name] = attributes[i].value;
            }
        }

        //add child nodes
        if (nodes.length) {
            nodeObj.childNodes = [];
            for (i = 0, n = nodes.length; i < n; i++) {
                nodeObj.childNodes.push(addNode(nodes[i]));
            }
        }

        return nodeObj;
    }


    /*
    * By T.J. Crowder: http://stackoverflow.com/users/157247/t-j-crowder
    * From here: http://stackoverflow.com/questions/5817069/dom-navigation-eliminating-the-text-nodes
    * */
    function removeBlank(node) {
        var child, next, reBlank = /^\s*$/;
        switch (node.nodeType) {
            case 3: // Text node
                if (reBlank.test(node.nodeValue)) {
                    node.parentNode.removeChild(node);
                }
                break;
            case 1: // Element node
            case 9: // Document node
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    removeBlank(child);
                    child = next;
                }
                break;
        }
    }
};