# LinkageRenderer.js
### A simple tool for rendering planar linkages using three.js. 

#### Explaination

This tool was made to aid the production of a report, available at [http://evanharwin.com/projects/linkage_report.pdf]. The introduction to the report may serve as a further explaination to anyone who thinks that this tool may be of use to them. This software is free to use (under the Mozilla Public License 2.0), and I'd happily offer further explaination to anyone who might need it at evanharwin@gmail.com.

#### Usage

###### Setup

This software assumes .html usage, with a structure as follows:

```
|-- directory
	|-- index.html
	|-- three.js
	|-- linkagerenderer.js
	|-- yourcode.js
```

The .html file should have imports like so:

```html
<script src="three.js"></script>
<script src="linkagerenderer.js"></script>
<script src="yourcode.js"></script>
```

See the example html file for more description.

##### Functionality

The code impliments 2 classes `Arm` and `Polygon`.  Feel free to change this and add whatever you need. These classes are set up so you instanciate them like so:

Arm:

```javascript
// an n-length array of positive real numbers
var arm_lengths = [ x_1, ... x_n ]

// an n-1 length array of numbers in [0,2pi] 
var arm_coords = [ a_1, ..., a_(n-1) ] 

// new class instance, automatically renders an n-length arm to variable 'scene'
var arm = new Arm( arm_lengths, arm_coords ) 
```

Polygon:

```javascript
// an n-length array of positive real numbers
var polygon_lengths = [ x_1, ... x_n ]

// an n-2 length array with the first n-3 numbers in [0,2pi] plus one number in {0,1} 
var polygon_coords = [ a_1, ..., a_(n-1) ] 

// a boolean that determines if the other switch position is shown 
var show_alt_switch = true/false 

// new class instance, automatically renders an n-gon to variable'scene'
var polygon = new Polygon( polygon_lengths, polygon_coords, show_alt_switch ) 
```

