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
			var decorative = false;
			
			/**
			 * Fixes the image with missing alt attribute.
			 *
			 * @constructor
			 */
			function ImgAltAnchor( issue ) {
				QuickFix.call( this, issue );
			}

			/**
			 * Maximal count of characters in the alt. It might be changed to `0` to prevent
			 * length validation.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix.AttributeRename
			 * @static
			 */
             ImgAltAnchor.altLengthLimit = 150;

             ImgAltAnchor.prototype = new QuickFix();
             ImgAltAnchor.prototype.constructor = ImgAltAnchor;

             ImgAltAnchor.prototype.display = function( form ) {
				form.setInputs( {
					alt: {
						type: 'text',
						label: this.lang.altLabel,
						value: this.issue.element.getAttribute( 'alt' ) || ' '
					}
				} );
			};

			ImgAltAnchor.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element

                var imgElement = element.getChild(0)
                if ( imgElement ) {
                    imgElement.setAttribute( 'alt', formAttributes.alt.trim() );
                }

				if ( callback ) {
					callback( this );
				}
			};

			ImgAltAnchor.prototype.validate = function( formAttributes ) {
                var ret = [],
                proposedAlt = formAttributes.alt + '';

                if ( !proposedAlt ) {
                    ret.push( this.lang.errorEmpty );
                }

                if ( !ret.length ) {
                    ret = ImgAltAnchor.prototype.validate.call( this, formAttributes );
                }

                return ret;
			};

			ImgAltAnchor.prototype.lang = {"altLabel":"Alternative text","errorTooLong":"Alternative text is too long. It should be up to {limit} characters while your has {length}","errorWhitespace":"Alternative text/captions can not only contain whitespace characters/can not be empty","errorSameAsFileName":"Image alt should not be the same as the file name"};
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/ImgAltAnchor', ImgAltAnchor );
		}
	} );
}() );
