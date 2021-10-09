# Notes

## Using the distribution version
- We're using a distribution version of CKEditor 4 and Accessibility Checker (AC for short), both downloaded through the official CKEditor 4 website. See the builder here: https://ckeditor.com/cke4/builder
- I worked on quick fixes in the distribution and not the development version because after reading documentation, I found that the developers created AC with extensibility in mind; meaning, they made it so that any user can easily create additional quick fixes/issues as they please. https://ckeditor.com/docs/ckeditor4/latest/guide/dev_a11ychecker_custom_quick_fixes.html

## Files
- ckeditor/testing contains my testing grounds of AC issues. Best to check out 'test.html' first, as it contains most of the quick fixes that I've been working on.
- ckeditor/plugins/a11ychecker is where everything related to AC is found.
- ckeditor/plugins/a11ychecker/libs/quail/guidelines/wcag.tests.json will give you the list of all of the tests/the default tests that AC runs. We don't run all of them, we only run specific tests specified in our testing files.
- If you want more details about the tests, check a11ychecker/libs/quail/tests.min.json. 
- ckeditor/plugins/a11ychecker/quickfix/en is the folder of all of our quick fixes including our custom fixes. This is where we build the logic, and after we build, we bind the quick fix and add it to our testing guidelines in a file in 'testing' that we want to test it on.

## How to run
- All you need to do is download the ckeditor folder, go to the testing file (try 'test.html' first) in ckeditor4/testing and then run it on your browser. Click the 'Accessibility' icon in the CKEditor 4 toolbar to run Accessibility Checker.
- To change what tests CKEditor4 runs, go to the html file of your choice and navigate to the scripts at the bottom of the file, and look for 'guideline: [..]' inside 'CKEditor4.replace('editor1', {..})' (For example, this should be line 288 of test.html). These list of guidelines are all the tests you are running. You can change, delete, and add as necessary by using the tests found in the 'guidelines' folder of a11ychecker/libs/quail.
