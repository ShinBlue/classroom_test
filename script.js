// 絵カードのデータ
const originalCards = [
    { emoji: '🍎', name: 'りんご' },
    { emoji: '🍌', name: 'バナナ' },
    { emoji: '🍊', name: 'みかん' },
    { emoji: '🍕', name: 'ピザ' },
    { emoji: '🐱', name: 'ねこ' },
    { emoji: '🐶', name: 'いぬ' },
    { emoji: '🍇', name: 'ぶどう' },
    { emoji: '🍓', name: 'いちご' },
    { emoji: '🍉', name: 'すいか' },
    { emoji: '🥕', name: 'にんじん' },
    { emoji: '🌽', name: 'とうもろこし' },
    { emoji: '🥦', name: 'ブロッコリー' },
    { emoji: '🍔', name: 'ハンバーガー' },
    { emoji: '🍜', name: 'ラーメン' },
    { emoji: '🌻', name: 'ひまわり' },
    { emoji: '🌹', name: 'バラ' },
    { emoji: '🌸', name: 'さくら' },
    { emoji: '🦁', name: 'ライオン' },
    { emoji: '🐘', name: 'ぞう' },
    { emoji: '🦒', name: 'キリン' },
    { emoji: '🦓', name: 'しまうま' },
    { emoji: '🐠', name: 'さかな' },
    { emoji: '🦋', name: 'ちょうちょ' },
    { emoji: '🐝', name: 'ミツバチ' },
    { emoji: '🌲', name: 'まつ' },
    { emoji: '🏔️', name: 'やま' },
    { emoji: '🏖️', name: 'ビーチ' },
    { emoji: '🌊', name: 'なみ' },
    { emoji: '⛅', name: 'くも' },
    { emoji: '🌈', name: '虹' }
];

let cards = [...originalCards];
let currentIndex = 0;
let showText = true;
let cardsPerPage = 1;

// DOM要素の取得
const emojiElement = document.getElementById('emoji');
const cardNameElement = document.getElementById('cardName');
const cardCounterElement = document.getElementById('cardCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');
const textToggleBtn = document.getElementById('textToggleBtn');
const cardsPerPageSelect = document.getElementById('cardsPerPageSelect');
const gridContainer = document.getElementById('gridContainer');

// 初期化
function init() {
    currentIndex = 0;
    updateDisplay();
}

// 表示の更新
function updateDisplay() {
    if (cardsPerPage === 1) {
        displaySingleCard();
    } else {
        displayMultipleCards();
    }
}

// 1枚表示モード
function displaySingleCard() {
    const card = cards[currentIndex];
    emojiElement.textContent = card.emoji;
    emojiElement.style.display = '';
    cardNameElement.textContent = showText ? card.name : '';
    cardNameElement.style.display = '';
    cardCounterElement.textContent = `${currentIndex + 1} / ${cards.length}`;
    
    // ボタンの有効/無効を切り替え
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
    
    gridContainer.style.display = 'none';
    document.getElementById('card').style.display = '';
}

// 複数枚表示モード
function displayMultipleCards() {
    emojiElement.style.display = 'none';
    cardNameElement.style.display = 'none';
    document.getElementById('card').style.display = 'none';
    gridContainer.style.display = 'grid';
    
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + cardsPerPage, cards.length);
    
    gridContainer.innerHTML = '';
    for (let i = startIndex; i < endIndex; i++) {
        const card = cards[i];
        const cardElement = document.createElement('div');
        cardElement.className = 'grid-card';
        cardElement.innerHTML = `
            <div class="grid-emoji">${card.emoji}</div>
            ${showText ? `<div class="grid-name">${card.name}</div>` : ''}
        `;
        gridContainer.appendChild(cardElement);
    }
    
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    const currentPage = Math.floor(currentIndex / cardsPerPage) + 1;
    cardCounterElement.textContent = `ページ ${currentPage} / ${totalPages}`;
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = endIndex >= cards.length;
}

// 前へボタン
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        if (cardsPerPage === 1) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, currentIndex - cardsPerPage);
        }
        updateDisplay();
    }
});

// 次へボタン
nextBtn.addEventListener('click', () => {
    if (cardsPerPage === 1) {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateDisplay();
        }
    } else {
        const nextStart = currentIndex + cardsPerPage;
        if (nextStart < cards.length) {
            currentIndex = nextStart;
            updateDisplay();
        }
    }
});

// シャッフルボタン
shuffleBtn.addEventListener('click', () => {
    // Fisher-Yatesシャッフル
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    currentIndex = 0;
    updateDisplay();
});

// リセットボタン
resetBtn.addEventListener('click', () => {
    cards = [...originalCards];
    currentIndex = 0;
    updateDisplay();
});

// 文字表示切り替えボタン
textToggleBtn.addEventListener('click', () => {
    showText = !showText;
    textToggleBtn.textContent = showText ? '文字: ON' : '文字: OFF';
    textToggleBtn.classList.toggle('text-on', showText);
    textToggleBtn.classList.toggle('text-off', !showText);
    updateDisplay();
});

// 表示枚数選択
cardsPerPageSelect.addEventListener('change', (e) => {
    cardsPerPage = parseInt(e.target.value);
    currentIndex = 0;
    updateDisplay();
});

// ページ読み込み時に初期化
window.addEventListener('DOMContentLoaded', init);
