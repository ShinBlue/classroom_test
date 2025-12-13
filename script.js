// 絵カードのデータ
const cards = [
    { emoji: '🍎', name: 'りんご' },
    { emoji: '🍌', name: 'バナナ' },
    { emoji: '🍊', name: 'みかん' },
    { emoji: '🍕', name: 'ピザ' },
    { emoji: '🐱', name: 'ねこ' },
    { emoji: '🐶', name: 'いぬ' }
];

let currentIndex = 0;

// DOM要素の取得
const emojiElement = document.getElementById('emoji');
const cardNameElement = document.getElementById('cardName');
const cardCounterElement = document.getElementById('cardCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');

// 初期化
function init() {
    currentIndex = 0;
    updateCard();
}

// カード表示の更新
function updateCard() {
    const card = cards[currentIndex];
    emojiElement.textContent = card.emoji;
    cardNameElement.textContent = card.name;
    cardCounterElement.textContent = `${currentIndex + 1} / ${cards.length}`;
    
    // ボタンの有効/無効を切り替え
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
}

// 前へボタン
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
});

// 次へボタン
nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCard();
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
    updateCard();
});

// リセットボタン
resetBtn.addEventListener('click', () => {
    cards.sort((a, b) => {
        // 元の順序に戻す（元のデータを使用）
        const originalCards = [
            { emoji: '🍎', name: 'りんご' },
            { emoji: '🍌', name: 'バナナ' },
            { emoji: '🍊', name: 'みかん' },
            { emoji: '🍕', name: 'ピザ' },
            { emoji: '🐱', name: 'ねこ' },
            { emoji: '🐶', name: 'いぬ' }
        ];
        return originalCards.indexOf(originalCards.find(card => card.name === a.name)) - 
               originalCards.indexOf(originalCards.find(card => card.name === b.name));
    });
    currentIndex = 0;
    updateCard();
});

// ページ読み込み時に初期化
window.addEventListener('DOMContentLoaded', init);
