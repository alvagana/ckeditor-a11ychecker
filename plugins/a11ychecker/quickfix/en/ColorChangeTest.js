// todo
// need to style the elements hwow mindtouch styles it
// class: mt-color-######

( function() {
	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			// Variables, elements to use throughout
			var element, color, bgColor, parentStyling, currentTextClass, currentBGClass, textValue, bgValue,
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

			// https://www.delftstack.com/howto/javascript/rgb-to-hex-javascript/
			function ColorToHex(color) {
				var hexadecimal = color.toString(16);
				return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
			}
			  
			function ConvertRGBtoHex(red, green, blue) {
				return ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
			}

			// mt-bgcolor-ecf0f1 mt-color-ecf0f1
			function parseColors(cl) {
				let ret = ["",""];
				let classes = cl.split(" ");
				classes.forEach((c) => {
					let name = c.split("-");
					if (name.length == 3 && name[1] == "color") {
						ret[0] = name[2];
					} else if (name.length == 3 && name[1] == "bgcolor") {
						ret[1] = name[2]
					}
				});
				return ret;
			}
			

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

			ColorChange.prototype.display = function( form ) {
					element = this.issue.element;
					console.log( element.getComputedStyle( 'color' ));
					console.log( element.getComputedStyle( 'background-color' ));

					let computedTextColor = element.getComputedStyle( 'color');
					let computedBGColor = element.getComputedStyle( 'background-color' );

					if ( computedTextColor != "") {
						let t = computedTextColor.split('(');
						let t2 = t[1].split(')');
						let t3 = t2[0].split(',');
						colorPickerText.value = ConvertRGBtoHex(t3[0].trimStart(), t3[1].trimStart(), t3[2].trimStart());
					}

					if ( computedBGColor != "") {
						let t = computedBGColor.split('(');
						let t2 = t[1].split(')');
						let t3 = t2[0].split(',');
						colorPickerBackground.value = ConvertRGBtoHex(t3[0].trimStart(), t3[1].trimStart(), t3[2].trimStart());
					}

					textValue = "fffccc";
					bgValue = "fe123a";
					colorPickerText.value = "#" + textValue;
					colorPickerBackground.value = "#" + bgValue;
					/*
					colorPickerText.setAttribute("value", "#123456");
						console.log(colorPickerText.value);
						console.log(colorPickerBackground.value);
					*/

					// Checking to see if the balloon window has the color pickers already,
					// so we don't append the color pickers each time the script resets.
					if (balloon.children[3].children.length < 5) {
						// Styling for the color pickers
						let colorPickerStyle = "width: 60px; height: 30px; border: 1px solid #333333; border-radius: 5px; padding: 1px; cursor: pointer; position: relative; left: 12px; margin: 10px 5px;";
						colorPickerText.style = colorPickerStyle;
						colorPickerBackground.style = colorPickerStyle;
						
						// Styling for text label
						let labelStyle = "font-weight: bold; position: relative; left: 15px; bottom: 5px;"
						textLabel.textContent = "Text color";
						textLabel.style = labelStyle;
						backgroundLabel.textContent = "Background color";
						backgroundLabel.style = labelStyle;

						// Putting all our elements into one div and then appending it to the balloon window
						colorPickerContainer.appendChild(textLabel);
						colorPickerContainer.appendChild(colorPickerText);
						colorPickerContainer.appendChild(lineBreak);
						colorPickerContainer.appendChild(backgroundLabel);
						colorPickerContainer.appendChild(colorPickerBackground);
						
						balloon.children[3].insertBefore(colorPickerContainer, balloon.children[3].children[2]);
					}
			};

			// When user clicks quick fix, set the colors
			ColorChange.prototype.fix = function( formAttributes, callback ) {
				let classes = element.getAttributes( 'class' );
				let c = parseColors(classes.class);

				if (c[0]) {
					element.removeClass(`mt-color-${c[0]}`);
					element.addClass(`mt-color-${textValue}`);
				} 
				if (c[1]) {
					element.removeClass(`mt-bgcolor-${c[1]}`);
					element.addClass(`mt-bgcolor-${bgValue}`);
				}
				
				
				if ( callback ) {
					callback( this );
				}
			};

			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/ColorChange', ColorChange );
		}
	} );
}() );
