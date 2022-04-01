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
			function ImgAltVerify( issue ) {
				QuickFix.call( this, issue );
			}

			/**
			 * Maximal count of characters in the alt. It might be changed to `0` to prevent
			 * length validation.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix.AttributeRename
			 * @static
			 */
            ImgAltVerify.altLengthLimit = 100;

			ImgAltVerify.prototype = new QuickFix();
			ImgAltVerify.prototype.constructor = ImgAltVerify;

			ImgAltVerify.prototype.display = function( form ) {
                var defaultValue = "Non-decorative";
                if (this.issue.element.getAttribute("alt") == " ") {
                    defaultValue = "Decorative"
                }

				var dict = {
					'Non-decorative': 'Non-decorative',
					'Decorative': 'Decorative',
					'Caption': 'Caption used'
				}
				form.setInputs( {
					type: {
						type: 'select',
						label: 'Image type',
						value: defaultValue,
						options: dict
					},
					alt: {
						type: 'text',
						label: this.lang.altLabel,
						value: this.issue.element.getAttribute( 'alt' ) || ' '
					}
				} );
			};

			ImgAltVerify.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element
				console.log(element)
				
				// If selected decorative,
				// we ignore the form and just set the alt image to blank
				if (formAttributes.type === 'Decorative') {
					element.setAttribute( 'alt', " " );
				
				// Need to check if a caption already exists so we don't append it again.
                // Logic: check parent nodes children (should be a figure)
                // If not a figure, make figure and append caption as usual
                // Else, if figure, check if it has caption child, if not, append, if so, change textContent
				} else if (formAttributes.type === 'Caption') {
					element.setAttribute( 'alt', " " );
					var parent = element.getParent()

					var figcaption = new CKEDITOR.dom.element( 'figcaption' )
					figcaption.appendText(formAttributes.alt)

					if ( parent.getName() != "figure") {
						var figure = new CKEDITOR.dom.element( 'figure' );
						var elementCopy = element.clone()
						figure.append(elementCopy)
						figure.append(figcaption)

						element.insertBeforeMe(figure);
						element.remove()
					} else {
                        console.log("Parent is figure");
                        let parentChildren = parent.getChildren()
                        console.log(parentChildren.length)
                        for (let i = 0; i < parentChildren.length; i++) {
                            console.log(parentChildren[i].tagName)
                            if (parentChildren[i].tagName == "figcaption") {
                                parentChildren[i].textContent = formAttributes.alt;
                                console.log("child: ", parentChildren[i])
                            }
                        }
					}
				} else {
					element.setAttribute( 'alt', formAttributes.alt );
				}
				
                this.issue.element.addClass('alt-tag-verified');

				if ( callback ) {
					callback( this );
				}
			};

			ImgAltVerify.prototype.validate = function( formAttributes ) {
				if (formAttributes.type === 'Non-decorative') {
					var ret = [],
					proposedAlt = formAttributes.alt + '',
					imgElem = this.issue && this.issue.element,
					lang = this.lang;

					// Test if the alt has only whitespaces.
					if ( proposedAlt.match( emptyWhitespaceRegExp ) ) {
						ret.push( lang.errorWhitespace );
					}

					// Testing against exceeding max length.
					if ( ImgAltVerify.altLengthLimit && proposedAlt.length > ImgAltVerify.altLengthLimit ) {
						var errorTemplate = new CKEDITOR.template( lang.errorTooLong );

						ret.push( errorTemplate.output( {
							limit: ImgAltVerify.altLengthLimit,
							length: proposedAlt.length
						} ) );
					}

					if ( imgElem ) {
						var fileName = String( imgElem.getAttribute( 'src' ) ).split( '/' ).pop();
						if ( fileName == proposedAlt ) {
							ret.push( lang.errorSameAsFileName );
						}
					}
					return ret;
				}

				return [];
			};

			ImgAltVerify.prototype.lang = {"altLabel":"Alternative text","errorTooLong":"Alternative text is too long. It should be up to {limit} characters while your has {length}","errorWhitespace":"Alternative text can not only contain whitespace characters/can not be empty","errorSameAsFileName":"Image alt should not be the same as the file name"};
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/ImgAltVerify', ImgAltVerify );
		}
	} );
}() );
