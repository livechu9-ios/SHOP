const BOT_TOKEN = "8514216249:AAEji7EoHNi_5FZc-f69aTztecq6-SILDio"; 
const CHAT_ID = "7111762119"; 
const QR_IMG_LINK = "https://i.postimg.cc/SQ1ThDnS/IMG-3632.jpg";

const database = [
    { id: 1, category: 'freefire', name: 'FILE SHADOWROCKET NHẸ TÂM FIX...(78%)', price: 100000, image: 'https://i.postimg.cc/4dD1YFVz/IMG-3683.jpg', desc: 'ALL MAP', tag: 'HOT', data: 'NHẸ TÂM | FIX', features: ['ALL MAP', 'FIX LỐ FIX RUNG...', 'NHẸ TÂM'] },
    { id: 11, category: 'roblox', name: 'FILE NHẸ TÂM ADR', price: 50000, image: 'https://i.postimg.cc/QdDhQ8hn/IMG-3684.png', tag: 'VIP', data: 'TK: nhap_tk | MK: nhap_mk', features: ['KÉO NHẸ', 'ALL MAP', ] },
];

let usersData = JSON.parse(localStorage.getItem('usersData')) || { "admin": { pass: "123", balance: 0, history: [] } };
let currentUser = localStorage.getItem('currentUser');
let currentProd = null;

function init() {
    renderProducts('freefire'); 
    updateUI();
}

function renderProducts(filter) {
    const grid = document.getElementById('product-grid-area'); grid.innerHTML = "";
    document.querySelectorAll('.cat-btn').forEach(b => { b.classList.remove('active'); if(b.dataset.filter === filter) b.classList.add('active'); });
    database.forEach(item => {
        if (filter === 'all' || item.category === filter) {
            let featHtml = item.features ? item.features.map(f => `<div class="feat-item"><i class="fa-solid fa-circle-check feat-icon"></i> ${f}</div>`).join('') : '';
            grid.innerHTML += `<div class="product-card"><div class="card-header-strip"><i class="fa-solid fa-ghost"></i> HACK GAME</div><div class="card-body"><div class="card-top-row"><img src="${item.image}" class="card-thumb"><div class="card-title-box"><div class="card-title">${item.name}</div></div></div><div class="feature-list">${featHtml}</div><div class="info-table"><div class="info-col"><span class="info-label">Quốc gia</span><img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" class="flag-icon"></div><div class="info-col"><span class="info-label">Hiện có</span><span class="stock-badge">1</span></div><div class="info-col"><span class="old-price"></span><span class="new-price">${item.price.toLocaleString()}đ</span></div></div><div class="action-row"><button class="btn-desc"><i class="fa-regular fa-image"></i> Hình ảnh mô tả</button><button class="btn-buy-now" onclick="openPaymentModal(${item.id})"><i class="fa-solid fa-cart-shopping"></i> MUA NGAY</button></div></div></div>`;
        }
    });
}

function openPaymentModal(id) { if(!currentUser) return openLoginModal(); currentProd = database.find(p => p.id === id); document.getElementById('pm-name').value = currentProd.name; document.getElementById('pm-qty').value = 1; updateTotal(); openModal('payment-modal'); }
function updateTotal() { if(!currentProd) return; document.getElementById('pm-total').innerText = (currentProd.price * document.getElementById('pm-qty').value).toLocaleString() + 'đ'; }
function processPayment() { const total = currentProd.price * document.getElementById('pm-qty').value; if(usersData[currentUser].balance >= total) { usersData[currentUser].balance -= total; usersData[currentUser].history = usersData[currentUser].history || []; usersData[currentUser].history.unshift({ name: currentProd.name, price: total, date: new Date().toLocaleString() }); localStorage.setItem('usersData', JSON.stringify(usersData)); alert("MUA THÀNH CÔNG! Kiểm tra lịch sử."); closeModal('payment-modal'); updateUI(); } else alert("Số dư không đủ!"); }

function openLoginModal() { if(!currentUser) openModal('auth-modal'); } function closeLoginModal() { closeModal('auth-modal'); }
function switchAuthTab(t) { 
    const l = document.getElementById('login-form'); const r = document.getElementById('register-form'); 
    const tabs = document.querySelectorAll('.auth-tab-new');
    if(t === 'login') { l.style.display='block'; r.style.display='none'; tabs[0].classList.add('active'); tabs[1].classList.remove('active'); }
    else { l.style.display='none'; r.style.display='block'; tabs[0].classList.remove('active'); tabs[1].classList.add('active'); }
}
function handleLogin() { 
    const u = document.getElementById('login-user').value.trim(); const p = document.getElementById('login-pass').value.trim();
    if(usersData[u] && usersData[u].pass === p) { currentUser = u; localStorage.setItem('currentUser', u); alert("Đăng nhập thành công!"); closeModal('auth-modal'); updateUI(); } else alert("Sai thông tin!");
}
function handleRegister() {
    const u = document.getElementById('reg-user').value.trim(); const p = document.getElementById('reg-pass').value.trim(); const rp = document.getElementById('reg-repass').value.trim();
    if(!u || !p || !rp) return alert("Nhập đủ thông tin!"); if(p!==rp) return alert("Mật khẩu không khớp!");
    if(Object.keys(usersData).some(k => k.toLowerCase() === u.toLowerCase())) return alert("Tên đã tồn tại!");
    usersData[u] = { pass: p, balance: 0, history: [] }; localStorage.setItem('usersData', JSON.stringify(usersData));
    alert("Đăng ký thành công! Vui lòng đăng nhập."); switchAuthTab('login');
}

document.addEventListener('click', e => { const b = document.createElement('div'); b.className='click-effect'; b.style.top=(e.clientY-10)+'px'; b.style.left=(e.clientX-10)+'px'; document.body.appendChild(b); setTimeout(()=>b.remove(),500); });

const cv = document.getElementById('snow-canvas'); const ctx = cv.getContext('2d');
let w, h, particles = [];
function initEffect() {
    w = window.innerWidth; h = window.innerHeight;
    cv.width = w; cv.height = h;
    particles = [];
    for(let i=0; i<40; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 10 + 5, 
            s: Math.random() * 1 + 0.5, 
            o: Math.random() 
        });
    }
}
function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        ctx.fillStyle = "rgba(255, 255, 255, " + p.o + ")";
        ctx.font = p.r + "px sans-serif";
        ctx.fillText("★", p.x, p.y);
        p.y += p.s;
        if(p.y > h) { p.y = -10; p.x = Math.random() * w; }
    });
    requestAnimationFrame(draw);
}
window.addEventListener('resize', initEffect);
initEffect(); draw();

function updateUI() { if(currentUser) { document.getElementById('user-balance').innerText=usersData[currentUser].balance.toLocaleString()+'đ'; document.getElementById('nav-login-btn').innerText=currentUser; document.getElementById('nav-login-btn').onclick=handleLogout; } else { document.getElementById('user-balance').innerText='0đ'; document.getElementById('nav-login-btn').innerText='Đăng Nhập'; document.getElementById('nav-login-btn').onclick=openLoginModal; } }
function handleLogout() { localStorage.removeItem('currentUser'); location.reload(); }
function resetAppData() { if(confirm("Xóa data?")) { localStorage.clear(); location.reload(); } }
document.querySelectorAll('.cat-btn').forEach(b=>{b.addEventListener('click',()=>{renderProducts(b.dataset.filter)})});
function openModal(id){document.getElementById(id).style.display='flex'} function closeModal(id){document.getElementById(id).style.display='none'} function toggleMenu(){document.getElementById('sidebar').classList.toggle('active');document.getElementById('overlay').style.display=document.getElementById('sidebar').classList.contains('active')?'block':'none'}

function openDepositModal(){if(!currentUser)return openLoginModal();openModal('deposit-modal')} function closeDepositModal(){closeModal('deposit-modal')}
function switchDepositTab(t){if(t==='bank'){document.getElementById('deposit-bank-form').style.display='block';document.getElementById('deposit-card-form').style.display='none';document.getElementById('tab-bank').className='auth-tab active';document.getElementById('tab-card').className='auth-tab'}else{document.getElementById('deposit-bank-form').style.display='none';document.getElementById('deposit-card-form').style.display='block';document.getElementById('tab-bank').className='auth-tab';document.getElementById('tab-card').className='auth-tab active'}}
function showStaticQR(){if(!document.getElementById('bank-amount').value)return alert("Nhập tiền!"); document.getElementById('qr-image').src=QR_IMG_LINK; document.getElementById('qr-result').style.display='block'; document.getElementById('qr-content').innerText=`NAPTIEN ${currentUser}`}
function handleDepositCard(){alert("Đã gửi thẻ! Chờ duyệt.");closeDepositModal()}

function openHistoryModal(){if(!currentUser)return openLoginModal();openModal('history-modal');const l=document.getElementById('history-list-buy');l.innerHTML='';(usersData[currentUser].history||[]).forEach(i=>{l.innerHTML+=`<tr><td>${i.name}</td><td>-${i.price.toLocaleString()}</td><td>${i.date}</td></tr>`})} function closeHistoryModal(){closeModal('history-modal')}
function openContactModal(){openModal('contact-modal')} function closeContactModal(){closeModal('contact-modal')}
function openAdminModal(){openModal('admin-modal')} function closeAdminModal(){closeModal('admin-modal')}
function adminAction(a){const u=document.getElementById('admin-username').value;if(!usersData[u])return alert("K tìm thấy!"); if(a==='add')usersData[u].balance+=Number(document.getElementById('admin-amount').value);localStorage.setItem('usersData',JSON.stringify(usersData));alert("Xong!");updateUI();closeAdminModal()}

init();