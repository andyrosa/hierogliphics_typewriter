// State
let sentence = [];

// DOM elements
const hieroglyphicOutput = document.getElementById('hieroglyphic-output');
const englishOutput = document.getElementById('english-output');
const clearBtn = document.getElementById('clear-btn');
const spaceBtn = document.getElementById('space-btn');
const undoBtn = document.getElementById('undo-btn');
const themeBtn = document.getElementById('theme-btn');

// Theme state
let isDesert = false;
document.body.classList.add('theme-nile');

themeBtn.addEventListener('click', () => {
    isDesert = !isDesert;
    if (isDesert) {
        document.body.classList.remove('theme-nile');
        document.body.classList.add('theme-desert');
    } else {
        document.body.classList.remove('theme-desert');
        document.body.classList.add('theme-nile');
    }
});

// Categories mapping to global data
const categories = {
    phrases: window.phrasesData || [],
    nouns: window.nounsData || [],
    names: window.namesData || [],
    finisher: window.finisherData || []
};

// Initialize word palette
function initializePalette() {
    Object.keys(categories).forEach(category => {
        const container = document.getElementById(`${category}-words`);
        if (!container) return;

        categories[category].forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'word-btn';

            // Handle if item is just a string (fallback) or object
            const english = cleanText(item.english || item);
            const glyphs = item.glyphs || '';

            btn.innerHTML = `
                <span class="hieroglyph">${glyphs}</span>
                <span class="english">${english}</span>
            `;
            btn.addEventListener('click', () => addWord(item));
            container.appendChild(btn);
        });
    });
}

// Add word to sentence
function addWord(item) {
    // If item is just a string or space, wrap it? Use simple objects.
    // We store the full item object in the sentence array.
    sentence.push(item);
    updateDisplay();
    animateAddition();
}

// Add space
function addSpace() {
    if (sentence.length > 0) {
        sentence.push({ english: ' ', glyphs: ' ', isSpace: true });
        updateDisplay();
    }
}

// Remove last word
function undo() {
    if (sentence.length > 0) {
        sentence.pop();
        updateDisplay();
    }
}

// Clear all
function clearAll() {
    sentence = [];
    updateDisplay();
}

// Update display
function updateDisplay() {
    hieroglyphicOutput.innerHTML = '';

    sentence.forEach((item) => {
        if (item.isSpace) {
            // Space is a visual gap
            const spacer = document.createElement('div');
            spacer.style.width = '20px';
            hieroglyphicOutput.appendChild(spacer);
            return;
        }

        const glyphsStr = item.glyphs || '';
        const englishStr = item.english || '';

        // Split by code point (important for surrogate pairs like emojis/hieroglyphs)
        const glyphs = [...glyphsStr];

        const wordContainer = document.createElement('div');
        wordContainer.className = 'quadrat-word';
        wordContainer.title = cleanText(englishStr); // Tooltip for English meaning

        // Pack into quadrats
        let i = 0;
        // If no glyphs, maybe show placeholder? But assuming data is good.
        if (glyphs.length === 0) return;

        while (i < glyphs.length) {
            const remaining = glyphs.length - i;
            let take = 1;
            let layoutClass = 'layout-1';

            if (remaining >= 4) {
                take = 4;
                layoutClass = 'layout-4';
            } else if (remaining === 3) {
                take = 3;
                // Alternate between left-big and top-big for variety, but deterministically based on index
                layoutClass = (i % 2 === 0) ? 'layout-3-left' : 'layout-3-top';
            } else if (remaining === 2) {
                take = 2;
                layoutClass = 'layout-2-v';
            } else {
                take = 1;
                layoutClass = 'layout-1';
            }

            const quadrat = document.createElement('div');
            quadrat.className = `quadrat ${layoutClass}`;

            for (let j = 0; j < take; j++) {
                const glyphItem = document.createElement('div');
                glyphItem.className = 'hieroglyph-item';
                const span = document.createElement('span');
                span.textContent = glyphs[i + j];
                glyphItem.appendChild(span);
                quadrat.appendChild(glyphItem);
            }

            wordContainer.appendChild(quadrat);
            i += take;
        }

        hieroglyphicOutput.appendChild(wordContainer);
    });

    const englishText = sentence.map(item => cleanText(item.english)).join(' ').replace(/\s+/g, ' ').trim();
    englishOutput.textContent = englishText || 'Etch away';
}

// Animate addition
function animateAddition() {
    hieroglyphicOutput.style.transform = 'scale(1.05)';
    setTimeout(() => {
        hieroglyphicOutput.style.transform = 'scale(1)';
    }, 200);
}

// Event listeners
clearBtn.addEventListener('click', clearAll);
spaceBtn.addEventListener('click', addSpace);
undoBtn.addEventListener('click', undo);

// Initialize
hieroglyphicOutput.style.transition = 'transform 0.2s ease';
initializePalette();
updateDisplay();

// Helper to remove parentheticals, ellipses, and extra definitions
function cleanText(text) {
    if (!text) return '';
    let cleaned = text;
    // Remove parentheticals
    cleaned = cleaned.replace(/\s*\(.*?\)/g, '');
    // Remove anything after a slash
    cleaned = cleaned.split('/')[0];
    // Remove leading ellipsis
    cleaned = cleaned.replace(/^\s*\u2026\s*/, '').replace(/^\s*\.\.\.\s*/, '');
    return cleaned.trim();
}
