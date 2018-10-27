/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *  
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */
;(function($){
	
	/**
	 * Displays loading mask over selected element(s). Accepts both single and multiple selectors.
	 *
	 * @param message Text message that will be displayed on top of the mask besides a spinner (optional). 
	 * 				If not provided only mask will be displayed without a message or a spinner.  	
	 * @param delay Delay in milliseconds before element is masked (optional). If unmask() is called 
	 *              before the delay times out, no mask is displayed. This can be used to prevent unnecessary 
	 *              mask display for quick processes.   	
	 */
    $.fn.mask = function (config) {
        var _config = $.extend({
            message: "",
            messageTop: undefined,
            messageLeft: undefined,
            messageClass: "",
            delay: 0,
            opacity: 0.5,
            backgroundColor: '#CCC',
            loadingIcon: true,
            iconBackground: "",
            maskTime: 0,
            cancellable: true,
            showTiming: true,
            callback: null
        }, config);

		$(this).each(function() {
		    if (_config.delay !== undefined && _config.delay > 0) {
		        var element = $(this);

		        element.data("_mask_timeout", setTimeout(function () {
		            $.maskElement(element, _config.message);
		        }, _config.delay));
			} else {
		        $.maskElement($(this), _config);
			}
		});
	};
	
	/**
	 * Removes mask from the element(s). Accepts both single and multiple selectors.
	 */
	$.fn.unmask = function(){
		$(this).each(function() {
			$.unmaskElement($(this));
		});
	};
	
	/**
	 * Checks if a single element is masked. Returns false if mask is delayed or not displayed. 
	 */
	$.fn.isMasked = function(){
		return this.hasClass("masked");
	};

	$.maskElement = function(element, config){
	
		//if this element has delayed mask scheduled then remove it and display the new one
		if (element.data("_mask_timeout") !== undefined) {
			window.clearTimeout(element.data("_mask_timeout"));
			window.element.removeData("_mask_timeout");
		}
		if (element.data("_mask_time") !== undefined) {
		    window.clearTimeout(element.data("_mask_time"));
		    element.removeData("_mask_time");
		}
		if (element.data("_mask_timing") !== undefined) {
		    window.clearTimeout(element.data("_mask_timing"));
		    element.removeData("_mask_timing");
		}

		if(element.isMasked()) {
			$.unmaskElement(element);
		}
		
		if(element.css("position") == "static") {
			element.addClass("masked-relative");
		}
		
		element.addClass("masked");
		
		var maskDiv = $('<div class="loadmask"></div>').css({
            "background-color": config.backgroundColor,
		    opacity: config.opacity,
		    filter: "alpha(opacity=" + (config.opacity * 100) + ")"
        });
		
		//auto height fix for IE
		if(navigator.userAgent.toLowerCase().indexOf("msie") > -1){
			maskDiv.height(element.height() + parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom")));
			maskDiv.width(element.width() + parseInt(element.css("padding-left")) + parseInt(element.css("padding-right")));
		}
		
		//fix for z-index bug with selects in IE6
		if(navigator.userAgent.toLowerCase().indexOf("msie 6") > -1){
			element.find("select").addClass("masked-hidden");
		}
		
		element.append(maskDiv);
		
		if (config.message) {
		    var maskMsgDiv = $('<div class="loadmask-msg" style="display:none;"></div>');
		    var msgElement = $('<div>').addClass("message").addClass(config.messageClass).append(config.message);

		    if (config.loadingIcon) {
		        msgElement.addClass("icon");

		        if (config.iconBackground) {
		            msgElement.css("background", config.iconBackground);
		        }
		    }

		    maskMsgDiv.append(msgElement);

			element.append(maskMsgDiv);
			
			if (config.messageTop != undefined) {
			    maskMsgDiv.css("top", config.messageTop);
			} else {
			    //calculate vertical center position
			    maskMsgDiv.css("top", Math.round(element.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2) + "px");
			}
			if (config.messageLeft != undefined) {
			    maskMsgDiv.css("left", config.messageLeft);
			} else {
			    //calculate horizontal center position
			    maskMsgDiv.css("left", Math.round(element.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2) + "px");
			}
			
			maskMsgDiv.show();
		}
		
		if (config.maskTime) {
		    element.data("_mask_time", window.setTimeout(function () {
		        $.unmaskElement(element);

		        if ($.isFunction(config.callback)) {
		            config.callback(element, config);
		        }
		    }, config.maskTime));
		    
		    if (config.showTiming && $(element).find("div.message span.timing").length > 0) {
		        var time = config.maskTime / 1000;

		        $(element).find("div.message span.timing").text(time);

		        element.data("_mask_timing", window.setInterval(function () {
		            time--;

		            $(element).find("div.message span.timing").text(time);

		            if (time <= 0) {
		                window.clearInterval(element.data("_mask_timing"));
		            }
		        }, 1000));
		    }
		}

		if (config.cancellable) {
		    $(element).find("div.loadmask").click(function () {
		        $.unmaskElement(element);

		        if ($.isFunction(config.callback)) {
		            config.callback(element, config);
		        }
		    });
		}
	};
	
	$.unmaskElement = function(element){
		//if this element has delayed mask scheduled then remove it
		if (element.data("_mask_timeout") !== undefined) {
		    window.clearTimeout(element.data("_mask_timeout"));
		    element.removeData("_mask_timeout");

		    window.clearTimeout(element.data("_mask_time"));
		    element.removeData("_mask_time");

		    window.clearTimeout(element.data("_mask_timing"));
		    element.removeData("_mask_timing");
		}
		
		element.find(".loadmask-msg,.loadmask").remove();
		element.removeClass("masked");
		element.removeClass("masked-relative");
		element.find("select").removeClass("masked-hidden");
	};
 
})(jQuery);
