/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

/*
HOW THE TEST WORKS:
Checks for list elements created using <p> and <br/> elements.

PLAN:
Create a dropdown menu that selects "unordered" or "ordered"
Fix elements to be a list of their choice
*/
( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			
			/**
			 * QuickFix for changing markup into lists
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class FixListMarkup
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function FixListMarkup( issue ) {
				QuickFix.call( this, issue );
			}

			FixListMarkup.prototype = new QuickFix();

			FixListMarkup.prototype.constructor = FixListMarkup;

			FixListMarkup.prototype.display = function( form ) {
				var listDict = {1: "Ordered (numbers)", 2: "Unordered (bulletpoints)"};
				form.setInputs( {
					listType: {
						type: 'select',
						label: this.lang.listTypeLabel,
						options: listDict
					}
				});
			};

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			FixListMarkup.prototype.fix = function( formAttributes, callback ) {
				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			FixListMarkup.prototype.lang = {"listTypeLabel": "List type"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/FixListMarkup', FixListMarkup);
		}
	} );
}() );
