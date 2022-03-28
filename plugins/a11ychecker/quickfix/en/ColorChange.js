// todo
// need to style the elements hwow mindtouch styles it
// class: mt-color-######

( function() {
	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			var balloon = document.querySelector(".cke_balloon_content")

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

					let container = document.createElement("div");
					let btn = document.createElement("button");
					btn.textContent = "Color picker"
					container.append(btn)
					console.log(balloon.childNodes)
					balloon.childNodes[1].append(container)

					
					// balloon.children[3].insertBefore(colorPickerContainer, balloon.children[3].children[2]);
			};

			// When user clicks quick fix, set the colors
			ColorChange.prototype.fix = function( formAttributes, callback ) {
				
				if ( callback ) {
					callback( this );
				}
			};

			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/ColorChange', ColorChange );
		}
	} );
}() );
