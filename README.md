# jsLibraries

## DESCRIPTION

This is a collection of Vanilla JS libraries to aid you in web development.

## macKeys.js

macKeys.js library allows you to check if any of modifier key (ctrl, shift, alt, cmd) was pressed on Mac.

### Usage:
1. include the code into your JS/HTML and then you will be able to
2. check if any of the buttons is pressed, e.g.:
```js
window.onclick = function (event) {
    if (event.ctrlKey || macKeys.ctrlKey) {
        //do something
    }
}
```

## xmlConverter

This is a library which allows you to convert XML document into JS object.

### Usage:
1. Include the code into your library.
2. Convert XML document:
```js
xmlConverter.xml2obj(xmlDoc)
```