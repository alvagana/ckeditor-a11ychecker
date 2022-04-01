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
			 * Fixes font size for LibreTexts elements.
			 *
			 * @constructor
			 */
			function FontSizeFix( issue ) {
				QuickFix.call( this, issue );
			}

			/**
			 * Font size fix.
			 * 
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix.AttributeRename
			 * @static
			 */
            FontSizeFix.prototype = new QuickFix();
            FontSizeFix.prototype.constructor = FontSizeFix;

			FontSizeFix.prototype.display = function( form ) {
				var dict = {
					'10': '10',
                    '11': '11',
                    '12': '12',
                    '14': '14',
                    '16': '16',
                    '18': '18',
                    '20': '20',
                    '22': '22',
                    '24': '24',
                    '26': '26',
                    '28': '28',
                    '36': '36',
                    '48': '48',
                    '72': '72',
				}
				form.setInputs( {
					type: {
						type: 'select',
						label: this.lang.fontLabel,
						options: dict
					}
				});
			};

			FontSizeFix.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element
                element.removeClass('mt-font-size-8');
                element.addClass(`mt-font-size-${formAttributes.type}`)

				if ( callback ) {
					callback( this );
				}
			};

			FontSizeFix.prototype.lang = {"fontLabel":"Font size"};
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/FontSizeFix', FontSizeFix );
		}
	} );
}() );
