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
			 * QuickFix for fixing links with empty text.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class 
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function EmptyLinkFix( issue ) {
				QuickFix.call( this, issue );
			}

			EmptyLinkFix.prototype = new QuickFix();

			EmptyLinkFix.prototype.constructor = EmptyLinkFix;

			EmptyLinkFix.prototype.display = function( form ) {
				console.log(this.issue);
				form.setInputs( {
					tag: {
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
             EmptyLinkFix.prototype.fix = function( formAttributes, callback ) {
                console.log(this.issue.element);
				var element = this.issue.element;
				var child = element.getChild(0);

                child.setAttribute("alt", formAttributes.tag);

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			EmptyLinkFix.prototype.validate = function( formAttributes ) {
				var proposedText = formAttributes.tag,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedText || proposedText.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			EmptyLinkFix.prototype.lang = {"textLabel":"Alt tag","errorEmpty":"Alt tag can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/EmptyLink', EmptyLinkFix);
		}
	} );
}() );
