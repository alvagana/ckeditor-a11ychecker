
/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

/*
todo:
ORGANIZE CODE. its spaghetti right now, alvin
Write comments of how this works.

*/
( function() {
	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			// Variables, elements to use throughout
			var element, color, bgColor, parentStyling,
				textLabel = document.createElement("label"),
				backgroundLabel = document.createElement("label"),
				colorPickerContainer = document.createElement("div"),
				colorPickerText = document.createElement("input"),
				colorPickerBackground = document.createElement("input"),
				balloon = document.querySelector(".cke_balloon"),
				buttons = document.querySelectorAll(".cke_a11yc_ui_button"),
				ratioElem = document.createElement("div"),
				lineBreak = document.createElement("br");
			
			colorPickerText.setAttribute("type", "color");
			colorPickerText.setAttribute("value", "#FFFFFF");
			colorPickerBackground.setAttribute("type", "color");
			colorPickerBackground.setAttribute("value", "#FFFFFF");
			colorPickerContainer.setAttribute("id", "colorPickerContainer");
			

			/**
			 * QuickFix for changing color contrast of text elements.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class ColorChange
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function ColorChange( issue ) {
				QuickFix.call( this, issue );

			}

			ColorChange.prototype = new QuickFix();

			ColorChange.prototype.constructor = ColorChange;

			// console.log(balloon.children[3]);
			// balloon.children[3].children[2].remove();
			console.log(buttons);


			/*
			for (let i = 2; i < buttons.length; i++) {
				buttons[i].addEventListener('click', event => {
					let e = document.querySelector('#colorPickerContainer')
					//console.log(e);
					//console.log(balloon.children[3]);
					//console.log(btn);
					if (e && e.style.display != "none") {
						e.style.display = "none";
						console.log("changed display to none of color picker container");
					}
				})
			}
			*/

			/*
			buttonsForEvtListener.forEach(btn => btn.addEventListener('click', event => {
				let e = document.querySelector('#colorPickerContainer')
				//console.log(e);
				//console.log(balloon.children[3]);
				//console.log(btn);

				if (e && e.style.display != "none") {

					//e.style.display = "none";
					console.log("changed display to none of color picker container");
					console.log("accessed display");
					//var m = balloon.children[3].children.splice(3,1);
					balloon.children[3].children[2].remove();
				}
			}))
			*/
			

			// The widow display of the quick fix.
			ColorChange.prototype.display = function( form ) {
				if (this.issue.id == 'colorFontContrast') {

					// element is the focused element of the quick fix
					element = this.issue.element;


					// The focused elements data quail id
					var elementDataQuailId = element.$.getAttribute('data-quail-id');

					// Check if there's inline styling.
					let s = element.$.getAttribute("style");
					if (s !== null) {
						// Parse the style attribute's value
						let properties = s.split(';');
						for (let i = 0; i < properties.length; i++) {
							if (properties[i] != "") {
								let propertyType = properties[i].split(':')[0];
								var propertyValue = properties[i].split(':')[1];
								propertyValue = propertyValue.trimStart();

								// Make sure it's in hex
								if (propertyValue.startsWith("rgb")) {
									let propertyValueTemp = new CKEDITOR.tools.color(propertyValue);
									propertyValue = propertyValueTemp.getHex();
								}

								// Set the values accordingly
								if (propertyType === 'background-color') {
									colorPickerBackground.value = propertyValue;
								} else if (propertyType === 'color') {
									colorPickerText.value = propertyValue;
								}
							}
						}

						// CKEditor has weird ways of styling an element
						// EX: <span style="background-color: #FF122F"><p style="color: #FF123F">This is a colored text.</p></span>
						// So we need to check the parent element of the focused element.
						// Logic here is identical to the code above.
						let p = element.$.parentNode.getAttribute("style");
							if (p !== null) {
								let properties = p.split(';');
								for (let i = 0; i < properties.length; i++) {
									if (properties[i] != "") {
										let propertyType = properties[i].split(':')[0];
										var propertyValue2 = properties[i].split(':')[1];
										propertyValue2 = propertyValue2.trimStart();
										if (propertyValue2.startsWith("rgb")) {
											let propertyValueTemp = new CKEDITOR.tools.color(propertyValue2);
											propertyValue2 = propertyValueTemp.getHex();
										}

										if (propertyType === 'background-color') {
											colorPickerBackground.value = propertyValue2;
											parentStyling = 'background-color';
										} else if (propertyType === 'color') {
											colorPickerText.value = propertyValue2;
											parentStyling = 'color';
										} 
									}
								}
						}
					} else {
						// Getting the CSS defined styling for the element.
						/*
						How it works:
						Each focused element is recreated in a CKEditor 4 instance.
						But, each focused element also has its actual, native element hidden in the HTML file as well.
						You can find it using the matching data quail id to retrieve the computed CSS style
						associating with the focused element.
						*/
						var e = document.querySelectorAll("[style='display: none;']");
						for (let i = 0; i < e.length; i++) {
							if (e[i].getAttribute('data-quail-id') !== null) {
								for (let j = 0; j < e[i].children.length; j++) {
									if (e[i].children[j].getAttribute('data-quail-id') === elementDataQuailId) {
										bgColor = new CKEDITOR.tools.color(getComputedStyle(e[i].children[j]).getPropertyValue("background-color"));
										color = new CKEDITOR.tools.color(getComputedStyle(e[i].children[j]).getPropertyValue("color"));
									}
								}
							};
						}
						parentStyling = '';
						colorPickerText.value = color.getHex();
						colorPickerBackground.value = bgColor.getHex();
					}

					// Checking to see if the balloon window has the color pickers already,
					// so we don't append the color pickers each time the script resets.
					if (balloon.children[3].children.length < 5) {
						// Styling for the color pickers
						let colorPickerStyle = "width: 60px; height: 30px; border: 1px solid #333333; border-radius: 5px; padding: 1px; cursor: pointer; position: relative; left: 12px; margin: 5px 5px;";
						colorPickerText.style = colorPickerStyle;
						colorPickerBackground.style = colorPickerStyle;
						
						// Styling for text label
						let labelStyle = "font-weight: bold; position: relative; left: 15px; bottom: 5px;"
						textLabel.textContent = "Text color";
						textLabel.style = labelStyle;
						backgroundLabel.textContent = "Background color";
						backgroundLabel.style = labelStyle;

						// Putting all our elements into one div and then appending it to the balloon window
						colorPickerContainer.appendChild(colorPickerText);
						colorPickerContainer.appendChild(textLabel);
						colorPickerContainer.appendChild(lineBreak);
						colorPickerContainer.appendChild(colorPickerBackground);
						colorPickerContainer.appendChild(backgroundLabel);

						balloon.children[3].insertBefore(colorPickerContainer, balloon.children[3].children[2]);
					}
				}
			};

			// When user clicks quick fix, set the colors
			ColorChange.prototype.fix = function( formAttributes, callback ) {
				console.log(colorPickerText.getAttribute("value"));
				if (parentStyling == 'background-color') {
					element.setStyle('color',colorPickerText.getAttribute("value"));
					//element.$.parentNode.style.backgroundColor = colorPickerBackground.value;
				} else if (parentStyling == 'color') {
					element.setStyle('background-color',colorPickerBackground.value);
					//element.$.parentNode.style.color = colorPickerText.value;
				} else {
					element.setStyle('color', colorPickerText.getAttribute("value"));
					element.setStyle('background-color', colorPickerBackground.getAttribute("value"));
				}

				/*
				var m = balloon.children[3].children.splice(3,1);
				balloon.children[3].children[2].remove();
				*/

				if ( callback ) {
					callback( this );
				}
			};

			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/ColorChange', ColorChange );
		}
	} );
}() );
