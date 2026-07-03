let currentMode = '';
let currentDifficulty = '';
let cardsData = [];
let selectedCards = [];
let matchedPairs = 0;
let timerInterval = null;
let secondsElapsed = 0;

// Database Lengkap Aksara Jawa (Kombinasi Aksara <=> Tulisan Latin)
const aksaraDatabase = {
    'dasar': {
        'paket1': [
            { aksara: '🇮🇩', latin: 'Indonesia' }, { aksara: 'ꦢ', latin: 'da' }, 
            { aksara: 'ꦤ', latin: 'na' }, { aksara: 'ꦠ', latin: 'ta' }, 
            { aksara: 'ꦕ', latin: 'ca' }, { aksara: 'ꦱ', latin: 'sa' }, 
            { aksara: 'ꦫ', latin: 'ra' }, { aksara: 'ꦮ', latin: 'wa' }, 
            { aksara: 'ꦏ', latin: 'ka' }, { aksara: 'ꦭ', latin: 'la' }
        ],
        'paket2': [
            { aksara: 'ꦥ', latin: 'pa' }, { aksara: 'ꦩ', latin: 'ma' }, 
            { aksara: 'ꦝ', latin: 'dha' }, { aksara: 'ꦒ', latin: 'ga' }, 
            { aksara: 'ꦗ', latin: 'ja' }, { aksara: 'ꦧ', latin: 'ba' }, 
            { aksara: 'ꦪ', latin: 'ya' }, { aksara: 'ꦛ', latin: 'tha' }, 
            { aksara: 'ꦚ', latin: 'nya' }, { aksara: 'ꦔ', latin: 'nga' }
        ]
    },
    'pasangan': {
        'paket1': [
            { aksara: '꧀ꦲ', latin: 'Pasangan Ha' }, { aksara: '꧀ꦢ', latin: 'Pasangan Da' }, 
            { aksara: '꧀ꦤ', latin: 'Pasangan Na' }, { aksara: '꧀ꦠ', latin: 'Pasangan Ta' }, 
            { aksara: '꧀ꦕ', latin: 'Pasangan Ca' }, { aksara: '꧀ꦱ', latin: 'Pasangan Sa' }, 
            { aksara: '꧀ꦫ', latin: 'Pasangan Ra' }, { aksara: '꧀ꦮ', latin: 'Pasangan Wa' }, 
            { aksara: '꧀ꦏ', latin: 'Pasangan Ka' }, { aksara: '꧀ꦭ', latin: 'Pasangan La' }
        ],
        'paket2': [
            { aksara: '꧀ꦥ', latin: 'Pasangan Pa' }, { aksara: '꧀ꦩ', latin: 'Pasangan Ma' }, 
            { aksara: '꧀ꦝ', latin: 'Pasangan Dha' }, { aksara: '꧀ꦒ', latin: 'Pasangan Ga' }, 
            { aksara: '꧀ꦗ', latin: 'Pasangan Ja' }, { aksara: '꧀ꦧ', latin: 'Pasangan Ba' }, 
            { aksara: '꧀ꦪ', latin: 'Pasangan Ya' }, { aksara: '꧀ꦛ', latin: 'Pasangan Tha' }, 
            { aksara: '꧀ꦚ', latin: 'Pasangan Nya' }, { aksara: '꧀ꦔ', latin: 'Pasangan Nga' }
        ]
    },
    'sandangan': {
        'paket1': [
            { aksara: 'ꦶ', latin: 'Wulu (i)' }, { aksara: 'ꦸ', latin: 'Suku (u)' }, 
            { aksara: 'ꦺ', latin: 'Taling (é)' }, { aksara: 'ꦼ', latin: 'Pepet (e)' }, 
            { aksara: 'ꦺꦴ', latin: 'Taling Tarung (o)' }, { aksara: '꧀', latin: 'Pangkon (mati)' }
        ],
        'paket2': [
            { aksara: 'ꦂ', latin: 'Layar (paten r)' }, { aksara: 'ꦃ', latin: 'Wignyan (paten h)' }, 
            { aksara: 'ꦁ', latin: 'Cecak (paten ng)' }, { aksara: 'ꦿ', latin: 'Cakra (gandeng r)' }, 
            { aksara: 'ꦽ', latin: 'Cakra Keret (gandeng re)' }, { aksara: 'ꦾ', latin: 'Pengkal (gandeng y)' }

        ]
    },
    'murdha': {
        'paket1': [
            { aksara: 'ꦟ', latin: 'Murdha Na' }, { aksara: 'ꦑ', latin: 'Murdha Ka' }, 
            { aksara: 'ꦡ', latin: 'Murdha Ta' }, { aksara: 'ꦯ', latin: 'Murdha Sa' }, 
            { aksara: 'ꦦ', latin: 'Murdha Pa' }, { aksara: 'ꦓ', latin: 'Murdha Ga' }, 
            { aksara: 'ꦨ', latin: 'Murdha Ba' }, { aksara: 'ꦚ', latin: 'Murdha Nya' },
            { aksara: 'ꦏ', latin: 'Rekan Kha' }, 
            { aksara: 'ꦗ', latin: 'Rekan Dza' }, { aksara: ' get', latin: 'Rekan Fa/Va' }
        ],
        'paket2': [
            { aksara: 'ꦄ', latin: 'Swara A' }, { aksara: 'ꦆ', latin: 'Swara I' }, { aksara: 'ꦈ', latin: 'Swara U' }, { aksara: 'ꦊ', latin: 'Swara E' }, { aksara: 'ꦌ', latin: 'Swara O' },
            { aksara: '꧀ꦦ', latin: 'Pasangan Murdha Na' }, { aksara: '꧀ꦯ', latin: 'Pasangan Murdha Ka' }, { aksara: '꧀ꦯ', latin: 'Pasangan Murdha Ta' }, { aksara: '꧀ꦱ', latin: 'Pasangan Murdha Sa' }, { aksara: '꧀ꦥ', latin: 'Pasangan Murdha Pa' }
        ]
    }
};

const bgImages = {
    'dasar': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    'pasangan': 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=800&q=80',
    'sandangan': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    'lainnya': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80'
};

const modeNames = {
    'dasar': 'Aksara Carakan',
    'pasangan': 'Aksara Pasangan',
    'sandangan': 'Aksara Sandangan',
    'lainnya': 'Murdha, Swara & Rekan'
};

function resizeGame() {
    const wrapper = document.getElementById('game-wrapper');
    const scale = Math.min(window.innerWidth / 800, window.innerHeight / 450);
    wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
}
window.addEventListener('resize', resizeGame);
window.addEventListener('DOMContentLoaded', resizeGame);

document.addEventListener('contextmenu', event => event.preventDefault());

function showMenu() {
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
}

function selectDifficulty(mode) {
    currentMode = mode;
    document.getElementById('menu-screen').classList.add('hidden');
    
    // Bangun tombol sub-materi secara dinamis berdasarkan database paket yang tersedia
    const container = document.getElementById('diff-buttons-container');
    container.innerHTML = '';
    
    document.getElementById('diff-screen-title').innerText = `KATEGORI: ${modeNames[mode].toUpperCase()}`;
    
    const paketList = Object.keys(aksaraDatabase[mode]);
    paketList.forEach((paket, idx) => {
        const btn = document.createElement('button');
        btn.onclick = () => startGame(paket);
        btn.className = "py-3 px-5 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer text-xs uppercase tracking-wider";
        btn.innerText = `🔸 MULAI KELOMPOK ${idx + 1}`;
        container.appendChild(btn);
    });

    document.getElementById('diff-screen').classList.remove('hidden');
}

function backToMenu() {
    clearInterval(timerInterval);
    document.getElementById('menu-screen').classList.remove('hidden');
    document.getElementById('diff-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');
    resetGameState();
}

function resetGameState() {
    cardsData = [];
    selectedCards = [];
    matchedPairs = 0;
    secondsElapsed = 0;
    clearInterval(timerInterval);
    document.getElementById('game-grid').innerHTML = '';
    document.getElementById('input-nama').value = '';
    document.getElementById('input-foto').value = '';
    document.getElementById('cert-name').innerText = "Hebat!";
    document.getElementById('cert-avatar').classList.add('hidden');
    document.getElementById('cert-avatar').src = '';
    document.getElementById('cert-avatar-placeholder').classList.remove('hidden');
}

function startGame(difficulty) {
    currentDifficulty = difficulty;
    resetGameState();
    updateTimerDisplay();

    const badge = document.getElementById('game-diff-badge');
    badge.innerText = difficulty.toUpperCase();

    document.getElementById('game-mode-title').innerText = `Materi: ${modeNames[currentMode]}`;
    
    const totalPairs = cardsData.length / 2;
    document.getElementById('pair-counter').innerText = `0/${totalPairs}`;
    
    document.getElementById('bg-game-image').src = bgImages[currentMode];
    document.getElementById('diff-screen').classList.add('hidden');

    generateAksaraPairs(currentMode, difficulty);
    renderGrid();

    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerDisplay();
    }, 1000);
}

function restartLevel() {
    document.getElementById('win-screen').classList.add('hidden');
    startGame(currentDifficulty);
}

function updateTimerDisplay() {
    const minutes = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const seconds = (secondsElapsed % 60).toString().padStart(2, '0');
    document.getElementById('game-timer').innerText = `${minutes}:${seconds}`;
}

// MEMBUAT 10 PASANG KARTU (10 KARTU AKSARA & 10 KARTU JAWABAN LATIN)
function generateAksaraPairs(mode, paket) {
    let rawPairs = [];
    let sumberData = aksaraDatabase[mode][paket];

    // 1. Masukkan data soal asli yang tersedia dari database
    sumberData.forEach((item, index) => {
        rawPairs.push({ id: `p${index}a`, text: item.aksara, val: index, type: 'aksara' });
        rawPairs.push({ id: `p${index}b`, text: item.latin, val: index, type: 'latin' });
    });

    // 2. ACAK SEKARANG (Hanya soal-soal asli saja yang diacak posisinya)
    for (let i = rawPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rawPairs[i], rawPairs[j]] = [rawPairs[j], rawPairs[i]];
    }

    // 3. SELEKSI PENGUNCI GRID: Dorong kartu filler (kosong) ke urutan PALING AKHIR
    const totalKartuSaatIni = rawPairs.length;
    if (totalKartuSaatIni < 20) {
        const sisaKartu = 20 - totalKartuSaatIni;
        const sisaPasang = sisaKartu / 2;

        for (let i = 0; i < sisaPasang; i++) {
            let fillerIdx = `filler_${i}`;
            
            // Masukkan ke array setelah proses shuffle di atas selesai, sehingga posisinya statis di belakang
            rawPairs.push({ id: `f${i}a`, text: '✨', val: fillerIdx, type: 'filler' });
            rawPairs.push({ id: `f${i}b`, text: 'BONUS', val: fillerIdx, type: 'filler' });
            
            // Otomatis terhitung selesai untuk sistem score counter
            matchedPairs++; 
        }
    }

    // Masukkan data final yang terstruktur ke global variabel game
    cardsData = rawPairs;
}

function renderGrid() {
    const gridContainer = document.getElementById('game-grid');
    gridContainer.innerHTML = '';
    
    cardsData.forEach(card => {
        const cardEl = document.createElement('button');
        cardEl.id = card.id;
        cardEl.dataset.value = card.val;
        
        // Pengecekan tipe kartu untuk menentukan desain style-nya
        if (card.type === 'filler') {
            // KARTU FILLER: Dibuat langsung transparan, mati, tidak bisa diklik, agar konstruksi grid tetap 20
            cardEl.className = "border border-amber-900/10 text-amber-500/20 font-bold text-xs rounded-lg flex items-center justify-center h-full w-full p-1 pointer-events-none bg-stone-900/40 select-none";
            cardEl.innerText = card.text;
        } else {
            // KARTU NORMAL AKSARA & LATIN
            if (card.type === 'aksara') {
                cardEl.className = "border border-amber-800 text-amber-100 font-normal rounded-lg flex items-center justify-center transition-all duration-150 shadow shadow-black/60 transform hover:scale-[1.03] cursor-pointer select-none h-full w-full p-1 javanese-text";
            } else {
                cardEl.className = "border border-amber-800 text-stone-200 font-extrabold text-xs tracking-wider rounded-lg flex items-center justify-center transition-all duration-150 shadow shadow-black/60 transform hover:scale-[1.03] cursor-pointer select-none h-full w-full p-1 capitalize";
            }
            
            cardEl.style.backgroundImage = "url('img/card_bg.png')";
            cardEl.style.backgroundSize = "cover";
            cardEl.style.backgroundPosition = "center";
            cardEl.innerText = card.text;
            cardEl.addEventListener('click', () => handleCardClick(cardEl));
        }
        
        gridContainer.appendChild(cardEl);
    });
}

function handleCardClick(cardEl) {
    if (selectedCards.includes(cardEl) || cardEl.classList.contains('card-fade-out')) return;
    
    // Efek ketika dipilih: Kartu membesar mencolok, z-index teratas, dan garis pinggir tebal berwarna kuning emas menyala
    cardEl.classList.remove('border-amber-800', 'hover:scale-[1.03]');
    cardEl.classList.add('border-4', 'border-yellow-400', 'scale-[1.06]', 'z-20', 'shadow-xl', 'shadow-amber-500/40');
    
    selectedCards.push(cardEl);

    if (selectedCards.length === 2) {
        document.getElementById('game-grid').classList.add('pointer-events-none');
        setTimeout(checkMatch, 300);
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    const totalPairs = cardsData.length / 2;
    
    if (card1.dataset.value === card2.dataset.value) {
        [card1, card2].forEach(card => {
            card.classList.remove('scale-[1.06]', 'z-20', 'shadow-xl', 'shadow-amber-500/40');
            card.classList.add('card-fade-out');
        });

        setTimeout(() => {
            card1.style.visibility = 'hidden';
            card2.style.visibility = 'hidden';
        }, 400);

        matchedPairs++;
        document.getElementById('pair-counter').innerText = `${matchedPairs}/${totalPairs}`;

        if (matchedPairs === totalPairs) {
            clearInterval(timerInterval);
            setTimeout(triggerWinScreen, 600);
        }
        
        selectedCards = [];
        document.getElementById('game-grid').classList.remove('pointer-events-none');

    } else {
        setTimeout(() => {
            [card1, card2].forEach(card => {
                card.classList.remove('border-4', 'border-yellow-400', 'scale-[1.06]', 'z-20', 'shadow-xl', 'shadow-amber-500/40');
                card.classList.add('border-amber-800', 'hover:scale-[1.03]');
            });

            selectedCards = [];
            document.getElementById('game-grid').classList.remove('pointer-events-none');
        }, 1000);
    }
}

function triggerWinScreen() {
    document.getElementById('cert-mode').innerText = modeNames[currentMode];
    document.getElementById('cert-diff').innerText = currentDifficulty.replace('paket', 'Bagian ');
    
    const minutes = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const seconds = (secondsElapsed % 60).toString().padStart(2, '0');
    document.getElementById('cert-time-spent').innerText = `${minutes}:${seconds}`;

    document.getElementById('cert-date').innerText = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    document.getElementById('win-screen').classList.remove('hidden');
}

function updateCertName(val) {
    document.getElementById('cert-name').innerText = val.trim() ? val : "Hebat!";
}

function uploadFoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgEl = document.getElementById('cert-avatar');
            imgEl.src = e.target.result;
            imgEl.classList.remove('hidden');
            document.getElementById('cert-avatar-placeholder').classList.add('hidden');
        }
        reader.readAsDataURL(file);
    }
}

function downloadCertificate() {
    const targetArea = document.getElementById('certificate-area');
    html2canvas(targetArea, {
        scale: 2, // Menggunakan skala 2 agar hasil unduhan gambar PNG sangat jernih & tajam saat dicetak
        useCORS: true,
        allowTaint: true,
        logging: false
    }).then(canvas => {
        try {
            const link = document.createElement('a');
            const namaFile = document.getElementById('input-nama').value.replace(/\s+/g, '_') || 'juara';
            link.download = `Sertifikat_Hanacaraka_${currentDifficulty}_${namaFile}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            alert("Gagal mengunduh gambar sertifikat.");
        }
    });
}