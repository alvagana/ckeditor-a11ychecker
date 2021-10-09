/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

/*

PLAN:
Similar to TableScope and AddCaption

*/
( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {

			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;
			
			/**
			 * QuickFix adding summary to tables
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class AddTableSummary
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function AddTableSummary( issue ) {
				QuickFix.call( this, issue );
			}

			AddTableSummary.prototype = new QuickFix();

			AddTableSummary.prototype.constructor = AddTableSummary;

			AddTableSummary.prototype.display = function( form ) {
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
			AddTableSummary.prototype.fix = function( formAttributes, callback ) {
				var issueElement = this.issue.element;
				issueElement.setAttribute('summary', formAttributes.summary);

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			AddTableSummary.prototype.validate = function( formAttributes ) {
				var proposedSummary = formAttributes.summary,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedSummary || proposedSummary.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			AddTableSummary.prototype.lang = {"summaryLabel":"Summary","errorEmpty":"Summary text can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/AddTableSummary', AddTableSummary);
		}
	} );
}() );
