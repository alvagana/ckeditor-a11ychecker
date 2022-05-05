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
			 * QuickFix for fixing text inputs without a label.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class TextInputs
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function TextLabelFix( issue ) {
				QuickFix.call( this, issue );
			}

			TextLabelFix.prototype = new QuickFix();

			TextLabelFix.prototype.constructor = TextLabelFix;

			TextLabelFix.prototype.display = function( form ) {
				form.setInputs( {
					label: {
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
             TextLabelFix.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element;
                let id = element.getAttribute("id");

                var label = new CKEDITOR.dom.element( 'label' );
                label.appendText(formAttributes.label);


                if (id == null) { 
					element.setAttribute("id", formAttributes.label);
					label.setAttribute("for", formAttributes.label);
				} else {
					label.setAttribute("for", id);
				}

                element.insertBeforeMe(label);

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			TextLabelFix.prototype.validate = function( formAttributes ) {
				var proposedText = formAttributes.label,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedText || proposedText.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			TextLabelFix.prototype.lang = {"textLabel":"Label","errorEmpty":"Label title can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/FormFieldLabel', TextLabelFix);
		}
	} );
}() );