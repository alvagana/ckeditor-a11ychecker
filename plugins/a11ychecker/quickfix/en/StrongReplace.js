( function() {
    'use strict';

    CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
        name: 'ElementReplace',
        callback: function( ElementReplace ) {

            /**
             * Replaces `<strong>` elements with `<em>`.
             *
             * @member CKEDITOR.plugins.a11ychecker.ElementReplace
             * @class StrongReplace
             * @constructor
             * @param {CKEDITOR.plugins.a11ychecker.Issue} issue
             */
            function StrongReplace( issue ) {
                ElementReplace.call( this, issue );
            }

            StrongReplace.prototype = new ElementReplace();
            StrongReplace.prototype.constructor = StrongReplace;

            /**
             * Returns the name of the tag that `issue.element` should be converted to.
             *
             * @member CKEDITOR.plugins.a11ychecker.ElementReplace.StrongReplace
             * @param {Object} formAttributes Form attributes from `fix` method.
             * @returns {String}
             */
            StrongReplace.prototype.getTargetName = function( formAttributes ) {
                return 'em';
            };

            CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/StrongReplace', StrongReplace);
        }
    } );
}() );

