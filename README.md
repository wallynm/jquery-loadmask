##LoadMask jQuery plugin
The behavior of this plugin is largely based on handy Element.mask() method from ExtJS Framework.
LoadMask jQuery plugin can mask DOM elements while their content is loading or changing to prevent user interactions and inform that some background task is still running. It is very light (~2Kb) and easy to use.

[You can try online demo here.](http://jquery-loadmask.googlecode.com/svn/trunk/demo/index.html)

####Usage
jQuery version required: 1.2.3 or later.

Please note that only elements that accept child nodes can be masked.

To start using the plugin you need to include jquery.loadmask.css and jquery.loadmask.js (or its minified version jquery.loadmask.min.js) to your html page:

<link href="jquery.loadmask.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="jquery.loadmask.min.js"></script>
Masking
To put a mask over an element (or multiple elements) simply call mask(label, delay) method with two optional label and delay parameters:

$("#mydiv").mask("Loading...");
$(".grids").mask("Loading...", 500);
If label parameter is provided, a little box with this label and a spinner will be placed on top of the mask, otherwise only a transparent gray mask is displayed.

delay parameter sets a delay in milliseconds before element(s) is masked. If unmask() is called before the delay times out, no mask is displayed. This can be used to prevent unnecessary mask display for quick processes.

####Unmasking
To remove a previously displayed mask from an element (or multiple elements) call unmask() without any parameters:

$("#mydiv").unmask();
Calling unmask() on a delayed mask prevents it from showing up.

####Checking if an element is masked
You can use isMasked() method on a single element to check if it is currently masked. Please note that this method will return false while mask is delayed.

if($("#mydiv").isMasked()) { ... }

####Integration with Jquery UI
Please take a look at this [code](https://code.google.com/p/jquery-loadmask/issues/detail?id=4&can=1)

####Contributors
wpaap - provided snapshot for integration with ASP.net UpdatePanel
Artur Alexandre Moreira (artur.alexandre@gmail.com) - implemented delayed mask
theonlylawislove - provided Jquery UI integration solution
Thank you!
