var windowUtils = require('sdk/window/utils');

var sinbleKeyBackForward = {

	init : function(window) {
		window.addEventListener("keypress", this.onKeyPress, false);
	},

	onKeyPress : function(event) {
		if (sinbleKeyBackForward.isFocused() || event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
			return false;
		}

		switch(event.which) {
		case "z".charCodeAt(0):
			windowUtils.getFocusedWindow().history.back();
			sinbleKeyBackForward.stopEvent(event);
			break;
		case "x".charCodeAt(0):
			windowUtils.getFocusedWindow().history.forward()
			sinbleKeyBackForward.stopEvent(event);
			break;
		}
	},

	isFocused : function() {
		var focusedElement = windowUtils.getFocusedElement();
		if (focusedElement) {
			switch(focusedElement.localName.toLowerCase()) {
			case "input":
			case "textarea":
			case "select":
			case "button":
			case "isindex":
				return true;
			case "div":
				if (focusedElement.attributes.getNamedItem("contenteditable").nodeValue === "true") {
					return true;
				}
			}
		}

		var focusedWindow = windowUtils.getFocusedWindow();
		if (focusedWindow && focusedWindow.document.designMode === "on") {
			return true;
		}
		return false;
	},

	stopEvent : function(event) {
		event.preventDefault();
		event.stopPropagation();
	}
};

for each (let window in windowUtils.windows()) {
	sinbleKeyBackForward.init(window);
}
