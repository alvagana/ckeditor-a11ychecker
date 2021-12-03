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
			 * QuickFix for fixing fieldset inputs without a legend.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class TextInputs
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function LegendFix( issue ) {
				QuickFix.call( this, issue );
			}

			LegendFix.prototype = new QuickFix();

			LegendFix.prototype.constructor = LegendFix;

			LegendFix.prototype.display = function( form ) {
				form.setInputs( {
					legend: {
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
             LegendFix.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element;

                var legend = new CKEDITOR.dom.element( 'legend' );
                legend.appendText(formAttributes.legend);

                element.append(legend);

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			LegendFix.prototype.validate = function( formAttributes ) {
				var proposedText = formAttributes.legend,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedText || proposedText.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			LegendFix.prototype.lang = {"textLabel":"Legend","errorEmpty":"Label title can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/FieldsetLegend', LegendFix);
		}
	} );
}() );