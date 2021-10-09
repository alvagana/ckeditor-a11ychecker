/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {

			/**
			 * QuickFix removing a caption in the `table` element.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class AddTableCaption
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function RemoveTableCaption( issue ) {
				QuickFix.call( this, issue );
			}

			RemoveTableCaption.prototype = new QuickFix();

			RemoveTableCaption.prototype.constructor = RemoveTableCaption;
			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			RemoveTableCaption.prototype.fix = function( formAttributes, callback ) {
				var issueElement = this.issue.element;
				console.log(issueElement);
				for (let i = 0; i < issueElement.$.children.length; i++) {
					if (issueElement.$.children[i].tagName === 'CAPTION') {
						issueElement.$.children[i].remove();
						break;
					}
				}


				if ( callback ) {
					callback( this );
				}
			};


			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/RemoveTableCaption', RemoveTableCaption );
		}
	} );
}() );
