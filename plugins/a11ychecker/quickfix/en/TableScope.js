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

				// Checking headers in rows
				let tableRowLength = table.$.rows.length;
				var rowSpan = 0;

				for (i = 0; i < tableRowLength; i++) {
					for (j = 0; j < table.$.rows[i].cells.length; j++) {
						let scope;
						let newCell = new CKEDITOR.dom.element(table.$.rows[i].cells[j]);
						let k = 0; // This keeps track of any row spans
						if (newCell.is("th")) {
							if (newCell.hasAttribute("rowspan") && newCell.getAttribute("rowspan") != 1) {
								scope = "rowgroup";
							} else if (newCell.hasAttribute("colspan") && newCell.getAttribute("colspan") != 1 && checkRightCell(table, i, j)) {
								scope = "colgroup";
							} else if (newCell.$.textContent === "" || newCell.$.textContent === "&nbsp;") {
								newCell.renameNode("td");
								continue;
							} else {
								scope = getDataDirection(table, i, j);
							}
							newCell.setAttribute("scope", scope);
						} 
					}
				}

				function checkRightCell(table, i, j) {
					let rightCellIndex = j + 1;
					if (rightCellIndex >= table.$.rows[i].cells.length) {
						rightCellIndex = -1;
					}
					if (rightCellIndex != -1) {
						let newCell = new CKEDITOR.dom.element(table.$.rows[i].cells[rightCellIndex]);
						if (newCell.is("td")) {
							return false;
						} 
					}
					return true;
				}


				// TODO: Revise and refine, as the results from calling this may vary due to different edge cases
				function getDataDirection(table, i, j) {
					let rightCellIndex = j + 1;
					let bottomCellIndex = i + 1;
					let topCellIndex = i - 1;
					let leftCellIndex = j - 1;
					if (rightCellIndex >= table.$.rows[i].cells.length) {
						rightCellIndex = -1;
					}
					if (bottomCellIndex >= table.$.rows.length) {
						bottomCellIndex = -1;
					}
					if (rightCellIndex != -1) {
						if (i >= table.$.rows.length) {
							i = table.$.rows.length - 1;
						}
						let newCell = new CKEDITOR.dom.element(table.$.rows[i].cells[rightCellIndex]);
						if (newCell.is("td")) {
							return "row";
						} 
					}
					if (bottomCellIndex != -1) {
						if (j >= table.$.rows[bottomCellIndex].cells.length) {
							j = table.$.rows[bottomCellIndex].cells.length - 1
						}
						let newCell = new CKEDITOR.dom.element(table.$.rows[bottomCellIndex].cells[j]);
						if (newCell.is("td")) {
							return "col";
						}
					}

					if (topCellIndex != -1) {
						let newCell = new CKEDITOR.dom.element(table.$.rows[topCellIndex].cells[j]);
						if (newCell.getAttribute("scope") === "colgroup") {
							return "col";
						} else if (newCell.getAttribute("scope") === "row") {
							return "row";
						}
 					}
					return "col";

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
