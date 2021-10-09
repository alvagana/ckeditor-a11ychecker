/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

/*

PLAN:
This quick fix will be called because AC detected that a table has multiple headers with no scope.
Plan is to then locate all of the header elements (th) in that table, and in the back end,
determine if they are column or row headers. The user will click on the "Quick Fix" button, and then
it will automatically input those changes.

DONE:
Linked issue with quick fix JS class


*/
( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			/**
			 * QuickFix adding scope to 'th' elements.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class TableScope
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function TableScope( issue ) {
				QuickFix.call( this, issue );
			}

			TableScope.prototype = new QuickFix();

			TableScope.prototype.constructor = TableScope;

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			TableScope.prototype.fix = function( formAttributes, callback ) {
				
				var table = this.issue.element;
				let i = 0;
				let j = 0;

				// TODO OPTIMIZATION:
				// Runtime for checking offset headers is slow (n^2).
				// Rewrite logic for better readability


				console.log(table);
				// Checking headers in rows
				let tableRowLength = table.$.rows.length;
				for (i = 0; i < tableRowLength; i++) {
					let newCell = new CKEDITOR.dom.element(table.$.rows[i].cells[0]);
					if (newCell.is("th")) {
						if (newCell.hasAttribute("rowspan")) {
							newCell.setAttribute('scope', 'rowgroup');
						} else {
							newCell.setAttribute('scope', 'row');
						}
					}
				}

				// Checking headers in columns
				let tableColLength = table.$.rows[0].cells.length;
				for (i = 0; i < tableColLength; i++) {
					let newCell = new CKEDITOR.dom.element(table.$.rows[0].cells[i]);
					if (newCell.is("th")) {
						if (newCell.hasAttribute("colspan")) {
							newCell.setAttribute('scope', 'colgroup');
							
							let k;
							let colSpanLength = table.$.rows[1].cells.length;
							for (k = i; k < colSpanLength + i; k++) {
								let colGroupCell = new CKEDITOR.dom.element(table.$.rows[1].cells[k]);
								if (colGroupCell.is("th")) {
									colGroupCell.setAttribute('scope', 'col');
								}
							}
							
						} else {
							newCell.setAttribute('scope', 'col');
						}
					} 
				}
				
				// Checking offset headers in rows
				for (i = 1; i < tableRowLength; i++) {
					for (j = 0; j < table.$.rows[i].cells.length; j++) {
						let newCell = new CKEDITOR.dom.element(table.$.rows[i].cells[j]);
						if (newCell.is("th") && !newCell.hasAttribute('scope')) {
							newCell.setAttribute('scope', 'row');
						}
					}
				}

				

				// Check top left cell (usually empty for two header tables)
				let topLeftCell = new CKEDITOR.dom.element(table.$.rows[0].cells[0]);
				let topRightCell = new CKEDITOR.dom.element(table.$.rows[0].cells[table.$.rows[0].cells.length - 1])
				if (!topRightCell.hasAttribute('scope')) {
					topLeftCell.setAttribute('scope', 'row');
				}
				if ((topLeftCell.is("th") || topLeftCell.is("td")) && topLeftCell.$.textContent === '') {
					topLeftCell.removeAttribute('scope');
				}


				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/TableScope', TableScope);
		}
	} );
}() );
