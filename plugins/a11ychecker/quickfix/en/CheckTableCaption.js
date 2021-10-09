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
			 * QuickFix adding a caption in the `table` element.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class AddTableCaption
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function CheckTableCaption( issue ) {
				QuickFix.call( this, issue );
			}

			CheckTableCaption.prototype = new QuickFix();

			CheckTableCaption.prototype.constructor = CheckTableCaption;

			CheckTableCaption.prototype.display = function( form ) {
				var e = this.issue.element;
				form.setInputs( {
					caption: {
						type: 'text',
						label: this.lang.captionLabel,
						value: e.$.textContent
					}
				} );
			};

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			CheckTableCaption.prototype.fix = function( formAttributes, callback ) {
				var issueElement = this.issue.element;
				issueElement.$.textContent = formAttributes.caption;

				if ( callback ) {
					callback( this );
				}
			};

			CheckTableCaption.prototype.validate = function( formAttributes ) {
				var proposedCaption = formAttributes.caption,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedCaption || proposedCaption.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			CheckTableCaption.prototype.lang = {"captionLabel":"Caption","errorEmpty":"Caption text can not be empty"};
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/CheckTableCaption', CheckTableCaption );
		}
	} );
}() );
