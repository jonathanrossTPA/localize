The javascript file jetPaytest will run tests on the current folder containing JSON files for localization.

Tests to be run: -
- Validate each of these files is present
- Validate that the json files contain the expected language localization.
- Validate that the json files are correctly formatted with no errors.
- Validate that the json files do not contain missing strings. 
- Validate that the json files do not contain multiple adjacent whitespace characters.

  The script makes use of a list of expected files and their language mapping then tests the contents using a sampling of expected words
