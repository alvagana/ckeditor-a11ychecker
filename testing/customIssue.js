// This function simply registers the meta data of the custom Issues.
function registerCustomIssueTypes( a11ychecker ) {
    a11ychecker.engine.issueDetails.preferHttpsLinks = {
        title: 'Prefer HTTPS links',
        descr: 'It\'s year ' + ( new Date() ).getFullYear() + ' already - our website uses HTTPS. ' +
            'You should use a safe protocol whenever possible.'
    };

    a11ychecker.engine.issueDetails.avoidStrongs = {
        title: 'Avoid strongs',
        descr: 'Our users do not like <strong>strongs</strong>, use <em>emphasize</em> instead 😉'
    };

    a11ychecker.engine.issueDetails.avoidh5 = {
        title: 'Avoid H5 tags without a class',
        descr: 'Label h5 tags without a class'
    };

    a11ychecker.engine.issueDetails.flagP = {
        title: 'Flag P tags',
        descr: 'find p tags and flag as issue for quick fix'
    };

    a11ychecker.engine.issueDetails.flagSection = {
        title: 'Flag Section tags',
        descr: 'Specifically mt-content-container tags'
    };
}

function a11yCheckerReadyCustom( editor ) {
    var a11ychecker = editor._.a11ychecker;

    registerCustomIssueTypes( a11ychecker );

    a11ychecker.engine.on( 'process', function( evt ) {
        // This is where the actual checking occurs, and this is where you want to report custom issues.
        var Issue = CKEDITOR.plugins.a11ychecker.Issue,
            contentElement = evt.data.contentElement,
            issues = evt.data.issues

        CKEDITOR.tools.array.forEach( contentElement.find( 'a[href^="http://ckeditor.com"]' ).toArray(), function( link ) {
            issues.addItem( new Issue( {
                originalElement: link,
                testability: Issue.testability.ERROR,
                id: 'preferHttpsLinks'
            }, a11ychecker.engine ) );
        } );

        CKEDITOR.tools.array.forEach( contentElement.find( 'strong' ).toArray(), function( strong ) {
            issues.addItem( new Issue( {
                originalElement: strong,
                testability: Issue.testability.NOTICE,
                id: 'avoidStrongs'
            }, a11ychecker.engine ) );
        } );

        CKEDITOR.tools.array.forEach( contentElement.find( 'h5' ).toArray(), function( h5 ) {
            issues.addItem( new Issue( {
                originalElement: h5,
                testability: Issue.testability.ERROR,
                id: 'avoidh5'
            }, a11ychecker.engine ) );
        } );

        CKEDITOR.tools.array.forEach( contentElement.find( 'p' ).toArray(), function( p ) {
            issues.addItem( new Issue( {
                originalElement: p,
                testability: Issue.testability.ERROR,
                id: 'flagP'
            }, a11ychecker.engine ) );
        } );

        // Finds all the section tags and checks for a specific classname
        CKEDITOR.tools.array.forEach( contentElement.find( 'section' ).toArray(), function (section) {
            if ( section.hasClass( "mt-content-container" )) {
                issues.addItem( new Issue( {
                    originalElement: section,
                    testability: Issue.testability.ERROR,
                    id: 'flagSection'
                }, a11ychecker.engine ) );
            }
        });    
        
    } );
    
};

