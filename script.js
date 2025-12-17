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
    { emoji: '🍎', name: 'りんご' },
    { emoji: '🍇', name: 'ぶどう' },
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
    { emoji: '🌲', name: 'あさひ' },
    { emoji: '🏔️', name: 'やま' },
    { emoji: '🏖️', name: 'ビーチ' },
    { emoji: '🌊', name: 'なみ' },
    { emoji: '⛅', name: 'くも' },
    { emoji: '🌈', name: '虹' }
];

let cards = [...originalCards];
let currentIndex = 0;
let showText = true;

// DOM要素の取得
const emojiElement = document.getElementById('emoji');
const cardNameElement = document.getElementById('cardName');
const cardCounterElement = document.getElementById('cardCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');
const textToggleBtn = document.getElementById('textToggleBtn');

// 初期化
function init() {
    currentIndex = 0;
    updateCard();
}

// カード表示の更新
function updateCard() {
    const card = cards[currentIndex];
    emojiElement.textContent = card.emoji;
    cardNameElement.textContent = showText ? card.name : '';
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
    cards = [...originalCards];
    currentIndex = 0;
    updateCard();
});

// 文字表示切り替えボタン
textToggleBtn.addEventListener('click', () => {
    showText = !showText;
    textToggleBtn.textContent = showText ? '文字: ON' : '文字: OFF';
    textToggleBtn.classList.toggle('text-on', showText);
    textToggleBtn.classList.toggle('text-off', !showText);
    updateCard();
});

// ページ読み込み時に初期化
window.addEventListener('DOMContentLoaded', init);
