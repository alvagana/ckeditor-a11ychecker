// To use this template, copy this file and paste it in plugins/a11ychecker/quickfix/en and rename it
// to the name of your quick fix.

( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {

			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;
			
			/**
			 * {DESC of quick fix here}
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class {Name of quick fix here}
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function QUICK_FIX_NAME( issue ) {
				QuickFix.call( this, issue );
			}

			QUICK_FIX_NAME.prototype = new QuickFix();

			QUICK_FIX_NAME.prototype.constructor = QUICK_FIX_NAME;

			QUICK_FIX_NAME.prototype.display = function( form ) {
				form.setInputs( {
					summary: {
						type: 'text',
						label: this.lang.summaryLabel
					}
				} );
			};

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 QUICK_FIX_NAME.prototype.fix = function( formAttributes, callback ) {
				
				




				if ( callback ) {
					callback( this );
				}
			};

			// This is used if user needs to type something in. It will check if they typed something empty.
			// If you are not typing anything in, you can remove this/comment out.
			// Change "proposedSummary" to a name that represents your text input.
			// formAttributes.summary should be renamed to the object in form.setInputs.
			QUICK_FIX_NAME.prototype.validate = function( formAttributes ) {
				var proposedSummary = formAttributes.summary,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedSummary || proposedSummary.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			QUICK_FIX_NAME.prototype.lang = {"summaryLabel":"Summary","errorEmpty":"Summary text can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/QUICK_FIX_NAME', QUICK_FIX_NAME);
		}
	} );
}() );
