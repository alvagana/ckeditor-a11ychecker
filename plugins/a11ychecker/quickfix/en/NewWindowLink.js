/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

 ( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;

			/**
			 * QuickFix for adding a warning to links that open in a new window
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class NewWindowLink
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function NewWindowLink( issue ) {
				QuickFix.call( this, issue );
			}

			NewWindowLink.prototype = new QuickFix();

			NewWindowLink.prototype.constructor = NewWindowLink;

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
             NewWindowLink.prototype.fix = function( formAttributes, callback ) {
                console.log(this.issue.element);
				var element = this.issue.element;

                element.appendText("(opens in new window)");

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			NewWindowLink.prototype.lang = {"textLabel":"Alt tag"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/NewWindowLink', NewWindowLink);
		}
	} );
}() );
