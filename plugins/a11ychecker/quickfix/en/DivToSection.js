( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {

			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;
			
			/**
			 * Quick fix for changing divs to sections.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class ReservedHeaders
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function DivToSection( issue ) {
				QuickFix.call( this, issue );
			}

			DivToSection.prototype = new QuickFix();

			DivToSection.prototype.constructor = DivToSection;

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 DivToSection.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element;

                element.renameNode("section");
				
				if ( callback ) {
					callback( this );
				}
			};

			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/DivToSection', DivToSection);
		}
	} );
}() );
