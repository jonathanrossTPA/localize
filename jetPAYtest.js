const fs = require('fs');
const path = require('path');

// Expected localization files and languages
const expectedFiles = {
    'bg.json': 'Bulgarian',
    'ca.json': 'Canadian',
    'da.json': 'Danish',
    'de-CH.json': 'Swiss German',
    'de.json': 'German',
    'en-CA.json': 'Canadian English',
    'en.json': 'English',
    'es.json': 'Spanish',
    'fr-CA.json': 'Canadian French',
    'fr.json': 'French',
    'he.json': 'Hebrew',
    'it.json': 'Italian',
    'nl-BE.json': 'Belgian Dutch',
    'nl.json': 'Dutch',
    'no.json': 'Norwegian',
    'pl.json': 'Polish',
    'pt.json': 'Portuguese',
    'ro.json': 'Romanian'
};

// Language-specific keywords for basic validation
const languageKeywords = {
    'Bulgarian': ['и', 'да', 'е', 'не'],
    'Canadian': ['the', 'and', 'with'],
    'Danish': ['og', 'er', 'det'],
    'Swiss German': ['der', 'die', 'und', 'ist'],
    'German': ['und', 'ist', 'zu'],
    'Canadian English': ['the', 'and', 'with'],
    'English': ['the', 'and', 'is'],
    'Spanish': ['el', 'la', 'y', 'es'],
    'Canadian French': ['le', 'la', 'est', 'et'],
    'French': ['le', 'la', 'et', 'est'],
    'Hebrew': ['ו', 'של', 'את'],
    'Italian': ['e', 'il', 'la'],
    'Belgian Dutch': ['en', 'de', 'het'],
    'Dutch': ['en', 'de', 'het'],
    'Norwegian': ['og', 'er', 'det'],
    'Polish': ['i', 'jest', 'na'],
    'Portuguese': ['o', 'e', 'é'],
    'Romanian': ['și', 'este', 'în']
};

// Helper function to validate language content
function validateLanguageContent(content, expectedLanguage) {
    const keywords = languageKeywords[expectedLanguage];
    return keywords.some(keyword => content.includes(keyword));
}

// Validate JSON files in a folder with line number logging
function validateLocalizationFiles(folderPath) {
    const filesInFolder = fs.readdirSync(folderPath);

    Object.keys(expectedFiles).forEach(file => {
        const filePath = path.join(folderPath, file);
        const language = expectedFiles[file];

        // Check if file is present
        if (!filesInFolder.includes(file)) {
            console.error(`❌ Missing file: ${file}`);
            return;
        }
        console.log(`✅ Found file: ${file}`);

        // Validate JSON format and content
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            // Validate that content contains expected language keywords
            if (!validateLanguageContent(fileContent, language)) {
                console.error(`❌ ${file} does not contain expected ${language} keywords.`);
            } else {
                console.log(`✅ ${file} contains expected ${language} keywords.`);
            }

            // Split file content by lines for detailed validation
            const lines = fileContent.split('\n');
            lines.forEach((line, index) => {
                // Check for empty or whitespace-only values
                if (line.match(/:\s*""/) || line.match(/:\s*"\s+"/)) {
                    console.error(`❌ ${file} contains missing or whitespace-only string on line ${index + 1}`);
                }
                
                // Check for multiple adjacent whitespace characters
                if (line.match(/\s{2,}/)) {
                    console.error(`❌ ${file} contains multiple adjacent whitespaces on line ${index + 1}`);
                }
            });

        } catch (error) {
            console.error(`❌ ${file} has invalid JSON format:`, error.message);
        }
    }); 
}

// Example usage
const folderPath = './'; // specify the folder with JSON files
validateLocalizationFiles(folderPath);
