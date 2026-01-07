// Hieroglyphic mappings for words
const hieroglyphicMap = {
    // Common words
    'I': '𓀀',
    'you': '𓎡',
    'he': '𓀭',
    'she': '𓁐',
    'we': '𓏥',
    'they': '𓏥',
    'the': '𓅪',
    'a': '𓄿',
    'is': '𓇋𓅱',
    'are': '𓃹',
    'was': '𓃹',
    'will': '𓆣',
    'can': '𓌂',
    'have': '𓎛',
    'has': '𓎛',
    'and': '𓎛',
    'or': '𓇌',
    'not': '𓂜',
    'to': '𓂋',
    'from': '𓅓',
    'in': '𓅓',
    'on': '𓁷',
    'at': '𓂋',
    'with': '𓎛',

    // Names
    'Cleopatra': '𓇌𓃭𓇋𓅱𓊪𓄿𓏏𓂋𓄿',
    'Ramses': '𓂋𓄿𓅓𓋴𓋴',
    'Nefertiti': '𓄤𓆑𓂋𓏏𓇋𓏏𓇋',
    'Tutankhamun': '𓇋𓏏𓈖𓇳𓏺',
    'Anubis': '𓇋𓈖𓊪𓅱',
    'Ra': '𓂋𓄿',
    'Osiris': '𓊨𓁹𓀭',
    'Isis': '𓊨𓏏𓁐',
    'Horus': '𓅃𓀭',
    'Thoth': '𓅝𓎛𓅱𓏏𓏭',

    // Actions
    'walk': '𓂻',
    'run': '𓃘',
    'sit': '𓊨',
    'stand': '𓊢',
    'speak': '𓀁',
    'listen': '𓄔',
    'see': '𓁻',
    'eat': '𓀁',
    'drink': '𓀉',
    'sleep': '𓁀',
    'write': '𓏞',
    'read': '𓏌',
    'love': '𓌸',
    'hate': '𓆜',
    'give': '𓂞',
    'take': '𓎁',
    'build': '𓀯',
    'destroy': '𓍌',
    'create': '𓆣',
    'think': '𓄣',

    // Objects
    'sun': '𓇳',
    'moon': '𓇴',
    'star': '𓇵',
    'water': '𓈖',
    'fire': '𓊖',
    'earth': '𓊗',
    'air': '𓊘',
    'house': '𓉐',
    'temple': '𓉗',
    'pyramid': '𓉻',
    'boat': '𓊝',
    'bird': '𓅿',
    'cat': '𓃠',
    'dog': '𓃡',
    'snake': '𓆓',
    'eye': '𓁹',
    'hand': '𓂝',
    'heart': '𓄣',
    'bread': '𓏏',
    'beer': '𓏲',
    'gold': '𓋞',
    'silver': '𓋟',
    'life': '𓋹',
    'death': '𓋺',
    'king': '𓇓',
    'queen': '𓇔'
};

// Word categories
const wordCategories = {
    common: ['I', 'you', 'he', 'she', 'we', 'they', 'the', 'a', 'is', 'are', 'was', 'will', 'can', 'have', 'has', 'and', 'or', 'not', 'to', 'from', 'in', 'on', 'at', 'with'],
    names: ['Cleopatra', 'Ramses', 'Nefertiti', 'Tutankhamun', 'Anubis', 'Ra', 'Osiris', 'Isis', 'Horus', 'Thoth'],
    actions: ['walk', 'run', 'sit', 'stand', 'speak', 'listen', 'see', 'eat', 'drink', 'sleep', 'write', 'read', 'love', 'hate', 'give', 'take', 'build', 'destroy', 'create', 'think'],
    objects: ['sun', 'moon', 'star', 'water', 'fire', 'earth', 'air', 'house', 'temple', 'pyramid', 'boat', 'bird', 'cat', 'dog', 'snake', 'eye', 'hand', 'heart', 'bread', 'beer', 'gold', 'silver', 'life', 'death', 'king', 'queen']
};

// State
let sentence = [];

// DOM elements
const hieroglyphicOutput = document.getElementById('hieroglyphic-output');
const englishOutput = document.getElementById('english-output');
const clearBtn = document.getElementById('clear-btn');
const spaceBtn = document.getElementById('space-btn');
const undoBtn = document.getElementById('undo-btn');

// Initialize word palette
function initializePalette() {
    Object.keys(wordCategories).forEach(category => {
        const container = document.getElementById(`${category}-words`);
        wordCategories[category].forEach(word => {
            const btn = document.createElement('button');
            btn.className = 'word-btn';
            btn.innerHTML = `
                <span class="hieroglyph">${hieroglyphicMap[word]}</span>
                <span class="english">${word}</span>
            `;
            btn.addEventListener('click', () => addWord(word));
            container.appendChild(btn);
        });
    });
}

// Add word to sentence
function addWord(word) {
    sentence.push(word);
    updateDisplay();
    animateAddition();
}

// Add space
function addSpace() {
    if (sentence.length > 0) {
        sentence.push(' ');
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
    const hieroglyphicText = sentence.map(word => {
        if (word === ' ') return ' ';
        return hieroglyphicMap[word] || word;
    }).join('');

    const englishText = sentence.join(' ').replace(/\s+/g, ' ').trim();

    hieroglyphicOutput.textContent = hieroglyphicText;
    englishOutput.textContent = englishText || 'Click words to compose sentences';
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
