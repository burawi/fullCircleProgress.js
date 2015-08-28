**FullCircleProgress Plugin requires jQuery library**
# Installation
Set up by importing fcp.js or fcp.min.js to your page
```html
<script src="path/fcp.min.js"></script>
```
# Initialization
Initialize by fullCircleProgress(parameters). Example:
```javascript
$('myDiv').fullCircleProgress({
    side: 100,
    levels: 5,
    level: 3,
    alternativeColor: '#ff4586'
})
```
# Params
#### Required:
- **side**: the diameter of the circle in pixels
- **levels**: the total number of division in the circle. *(Must be > 1)*
- **level**: the current level.

#### Optional:
- **colors**: array contaning colors of levels. levels[i] will be filled by colors[i]
- **alternativeColor**: this color is used when colors[i] doesn't exist

> if you initialized colors array but not enough to fill all levels and you didn't initialize an alternativeColor then colors[0] will take the place in the levels without color.
if neither colors nor alternativeColor are initialized then the levels will be filled in black

- **achievedStyle**: object of css style as you do with jQuery `.css()`. This style will be affected to achieved levels *( those <= level)*. By default:
```javascript
{"opacity": "1"}
```
- **leftStyle**: same as achievedStyle but for *levels > level*. By default:
```javascript
{"opacity": "0.3"}
```
- **backgroundImage**: path to image. This image will appear in background *(Must be a square)*
- **onClick**: function executed on click on any level it gives the level clicked. Example:
```javascript
function(level){alert(level)}
```
- **onHover**: array of two functions, to be executed when the mouse pointer enters and leaves the level. Example:
```javascript
onHover: [
    function(level){
        alert('entred in level '+level)
    },function(level){
        alert('left level '+level)
    }
]
```
- **hoverStyle**: css style object (same as achievedStyle & leftStyle), affected to level on mouse enter or leave.By default *(only if onClick or onHover are initialized)*:
```javascript
{"opacity": "0.8"}
```
