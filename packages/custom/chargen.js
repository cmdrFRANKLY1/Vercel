const fs = require('fs');
const path = require('path');

// Load JSON data
function loadJSON(filename) {
    const filePath = path.join(__dirname, filename);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error loading ${filename}:`, err.message);
        return null;
    }
}

// Load all JSON files
const attributes = loadJSON('rndAttributes.json');
const biography = loadJSON('rndBiography.json');
const birthplaces = loadJSON('rndBirthplaces.json');
const idols = loadJSON('rndIdols.json');
const names = loadJSON('rndNames.json');

function randomPick(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateCharacter() {
    // Generate a random name
    const name = randomPick(names);
    const fullName = name || 'Unknown';

    // Generate random stats
    const statKeys = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
    const stats = {};
    statKeys.forEach(key => {
        const options = attributes[key] || [];
        const selected = randomPick(options) || 'Unknown';
        // Random value between 1-20 for the stat score
        const value = Math.floor(Math.random() * 20) + 1;
        stats[key] = { value, trait: selected };
    });

    // Generate biography
    const reputation = randomPick(biography.reputation) || '';
    const background = randomPick(biography.background) || '';
    const motivation = randomPick(biography.motivation) || '';
    const secret = randomPick(biography.secrets) || '';

    // Generate birthplace
    const birthplace = randomPick(birthplaces);
    const birthPlaceName = birthplace ? birthplace.name : 'Unknown';
    const birthOrigin = birthplace && birthplace.origin ? birthplace.origin : null;

    // Generate idol
    const idol = randomPick(idols);
    const idolName = idol ? idol.name : 'Unknown';
    const idolOrigin = idol && idol.origin ? idol.origin : null;

    // Build the character sheet
    const character = {
        name: fullName,
        stats: stats,
        biography: {
            reputation: reputation,
            background: background,
            motivation: motivation,
            secret: secret
        },
        birthplace: {
            name: birthPlaceName,
            origin: birthOrigin
        },
        idol: {
            name: idolName,
            origin: idolOrigin
        }
    };

    return character;
}

function displayCharacter(char) {
    console.log('═══════════════════════════════════════');
    console.log(`  CHARACTER SHEET: ${char.name}`);
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log('📊 STATISTICS:');
    console.log('─────────────────────────────────────');
    for (const [stat, data] of Object.entries(char.stats)) {
        console.log(`  ${stat.padEnd(14)} ${data.value.toString().padStart(2)}  (${data.trait})`);
    }
    console.log('');
    console.log('📖 BIOGRAPHY:');
    console.log('─────────────────────────────────────');
    console.log(`  Reputation:   ${char.biography.reputation}`);
    console.log(`  Background:   ${char.biography.background}`);
    console.log(`  Motivation:   ${char.biography.motivation}`);
    console.log(`  Secret:       ${char.biography.secret}`);
    console.log('');
    console.log('📍 BIRTHPLACE:');
    console.log('─────────────────────────────────────');
    console.log(`  Location:     ${char.birthplace.name}`);
    if (char.birthplace.origin) {
        console.log(`  Origin:       ${char.birthplace.origin}`);
    }
    console.log('');
    console.log('🌟 IDOL:');
    console.log('─────────────────────────────────────');
    console.log(`  Name:         ${char.idol.name}`);
    if (char.idol.origin) {
        console.log(`  Origin:       ${char.idol.origin}`);
    }
    console.log('');
    console.log('═══════════════════════════════════════');
}

// Generate and display a random character
const character = generateCharacter();
displayCharacter(character);