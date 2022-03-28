/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

/*

*/
( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;

			/**
			 * QuickFix for fixing links with suspicious text.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class TableScope
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function SuspiciousLinkFix( issue ) {
				QuickFix.call( this, issue );
			}

			SuspiciousLinkFix.prototype = new QuickFix();

			SuspiciousLinkFix.prototype.constructor = SuspiciousLinkFix;

			SuspiciousLinkFix.prototype.display = function( form ) {
				form.setInputs( {
					summary: {
						type: 'text',
						label: this.lang.textLabel
					}
				} );
			};


			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			SuspiciousLinkFix.prototype.fix = function( formAttributes, callback ) {
				var issueElement = this.issue.element;
				issueElement.setText(formAttributes.summary)

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			SuspiciousLinkFix.prototype.validate = function( formAttributes ) {
				var proposedText = formAttributes.summary,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedText || proposedText.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			SuspiciousLinkFix.prototype.lang = {"textLabel":"Link text","errorEmpty":"Link text can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/SuspiciousLinkFix', SuspiciousLinkFix);
		}
	} );
}() );
