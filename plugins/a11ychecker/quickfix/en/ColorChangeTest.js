
( function() {
	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			// Variables, elements to use throughout
			var element, color, bgColor, parentStyling,
				textLabel = new CKEDITOR.dom.element("label"),
				backgroundLabel = new CKEDITOR.dom.element("label"),
				colorPickerContainer = new CKEDITOR.dom.element("div"),
				colorPickerText = new CKEDITOR.dom.element("input"),
				colorPickerBackground = new CKEDITOR.dom.element("input"),
				balloon = document.querySelector(".cke_balloon"),
				buttons = document.querySelectorAll(".cke_a11yc_ui_button"),
				lineBreak = new CKEDITOR.dom.element("br");
			
				colorPickerText.setAttributes({
					"type": "color",
					"value": "#BABABA"
				});
				colorPickerBackground.setAttributes({
					"type": "color",
					"value": "#BABABA"
				})
				colorPickerContainer.setAttribute("id", "colorPickerContainer");

				let colorPickerStyleAttributes = ["width", "height", "border", "border-radius", "padding", "cursor", "position", "left", "margin"];
				let colorPickerStyleValues = ["60px", "30px", "1px solid #333333", "5px", "1px", "pointer", "relative", "12px", "5px 5px"]
				let labelAttributes = ["font-weight", "position", "left", "bottom"];
				let labelValues = ["bold", "relative", "15px", "5px"];
				for (let i = 0; i < colorPickerStyleAttributes.length; i++) {
					colorPickerText.setStyle(colorPickerStyleAttributes[i], colorPickerStyleValues[i]);
					colorPickerBackground.setStyle(colorPickerStyleAttributes[i], colorPickerStyleValues[i]);
				}

				for (let i = 0; i < labelValues.length; i++) {
					textLabel.setStyle(labelAttributes[i], labelValues[i]);
					backgroundLabel.setStyle(labelAttributes[i], labelValues[i]);
				}

				textLabel.appendText("Text color");
				backgroundLabel.appendText("Background color");

				colorPickerContainer.append(colorPickerText);
				colorPickerContainer.append(textLabel);
				colorPickerContainer.append(lineBreak);
				colorPickerContainer.append(colorPickerBackground);
				colorPickerContainer.append(backgroundLabel);

		
			/**
			 * QuickFix for changing color contrast of text elements.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class ColorChange
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function ColorChangeTest( issue ) {
				QuickFix.call( this, issue );
			}

			function getColors( element ) {
			
				// The focused elements data quail id
				var elementDataQuailId = element.$.getAttribute('data-quail-id');

				// Check if there's inline styling.
				let s = element.$.getAttribute("style");
				if (s) {
					// Parse the style attribute's value
					let properties = s.split(';');
					let definedStyleList = [], definedStyleValueList = [];
					properties.pop();
					
					// Get the inline styling
					for (let i = 0; i < properties.length; i++) {
						let definedStyle = properties[i].split(':'), 
							val = definedStyle[1].trimStart();

						if (val.startsWith("rgb")) {
							let temp = new CKEDITOR.tools.color(val);
							val = temp.getHex();
						}
						definedStyleList.push(definedStyle[0].trimStart());
						definedStyleValueList.push(val);
					}
					
					let colorIndex = -1, bgColorIndex = -1;
					definedStyleList.forEach((e, index) => {
						if (e == 'color') {
							colorIndex = index;
							colorPickerText.setAttribute("value", definedStyleValueList[index]);
						} else if (e == 'background-color') {
							bgColorIndex = index;
							colorPickerBackground.setAttribute("value", definedStyleValueList[index]);
						}
					})

					if (colorIndex == -1 || bgColorIndex == -1) {
						let p = element.$.parentNode.getAttribute("style")

						if (p) {
							let properties = p.split(";");
							properties.pop();
							definedStyleList = [];
							definedStyleValueList = [];
							for (let i = 0; i < properties.length; i++) {
								let definedStyle = properties[i].split(':'),
									val = definedStyle[1].trimStart();

								if (val.startsWith("rgb")) {
									let temp = new CKEDITOR.tools.color(val);
									val = temp.getHex();
								}
								definedStyleList.push(definedStyle[0].trimStart())
								definedStyleValueList.push(val)
							}

							definedStyleList.forEach((e, index) => {
								if (e == 'color' && colorIndex == -1) {
									colorPickerText.setAttribute("value", definedStyleValueList[index]);
									parentStyling = 'color'
								}

								if (e == 'background-color' && bgColorIndex == -1) {
									colorPickerBackground.setAttribute("value", definedStyleValueList[index]);
									parentStyling = 'background-color';
								}
							})

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
					colorPickerText.setAttribute("value", color.getHex());
					colorPickerBackground.setAttribute("value", bgColor.getHex());
				}
			}

			ColorChangeTest.prototype = new QuickFix();

			ColorChangeTest.prototype.constructor = ColorChangeTest;

			ColorChangeTest.prototype.display = function( form ) {
				// element is the focused element of the quick fix
				element = this.issue.element;
				getColors( element );

				form.addInput('temp', {
					type: 'text',
					label: 'remove'
				})
				form.inputs.temp.wrapper.append(colorPickerContainer);
				form.inputs.temp.wrapper.$.children[1].remove()
				form.inputs.temp.wrapper.$.children[0].remove()
			};

			ColorChangeTest.prototype.fix = function( formAttributes, callback ) {
				if (parentStyling == 'background-color') {
					element.setStyle('color', colorPickerText.getValue());
					element.$.parentNode.style.backgroundColor = colorPickerBackground.getValue();
				} else if (parentStyling == 'color') {
					element.setStyle('background-color', colorPickerBackground.getValue());
					element.$.parentNode.style.color = colorPickerText.getValue();
				} else {

					element.setStyle('color', colorPickerText.getValue());
					element.setStyle('background-color', colorPickerBackground.getValue());
				}

				if ( callback ) {
					callback( this );
				}
			};

			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/ColorChangeTest', ColorChangeTest );
		}
	} );
}() );
