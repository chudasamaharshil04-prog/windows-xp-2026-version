/* ===== WINDOWS XP 2026 REMASTERED - SCRIPT ===== */

// ===== STATE =====
let state = {
  currentSetupStep: 0,
  userName: 'User',
  windows: [],
  nextWindowId: 1,
  nextZIndex: 100,
  activeWindowId: null,
  desktopIcons: [],
  selectedIcons: [],
  startMenuOpen: false,
  currentWallpaper: 'bliss',
  isSelecting: false,
  selectStart: { x: 0, y: 0 },
  mediaPlaying: false,
  paintColor: '#000000',
  paintSize: 3,
  paintTool: 'brush'
};

// ===== SVG ICONS - NEO FRUTIGER AERO =====
function getIconSVG(type, size = 44) {
  const s = size;
  const icons = {
    mycomputer: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><defs><linearGradient id="mcA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6ab0ff"/><stop offset="100%" stop-color="#1a66e0"/></linearGradient></defs><rect x="4" y="7" width="40" height="28" rx="10" fill="url(#mcA)" stroke="rgba(255,255,255,0.65)" stroke-width="1"/><rect x="8" y="11" width="32" height="17" rx="5" fill="#eaf4ff"/><rect x="16" y="36.5" width="16" height="3.8" rx="1.9" fill="#b7c0d0"/><rect x="12" y="41.5" width="24" height="3.2" rx="1.6" fill="#d4dbe8"/><circle cx="38" cy="13" r="2.4" fill="white" opacity="0.85"/></svg>`,
    recyclebin: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><defs><linearGradient id="rbA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b8eac0"/><stop offset="100%" stop-color="#72b880"/></linearGradient></defs><path d="M12 20h24L34 42H14L12 20z" fill="url(#rbA)" stroke="rgba(0,0,0,0.08)" stroke-width="0.8"/><rect x="10" y="14" width="28" height="6" rx="3" fill="#86c994" stroke="rgba(255,255,255,0.6)" stroke-width="0.8"/><rect x="19" y="9" width="10" height="5" rx="2.4" fill="#86c994"/></svg>`,
    folder: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><defs><linearGradient id="fdA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe88a"/><stop offset="100%" stop-color="#ffb800"/></linearGradient></defs><path d="M6 14.5V38.5a4 4 0 004 4h30a4 4 0 004-4V19a4 4 0 00-4-4H22l-4-5H10a4 4 0 00-4 4.5z" fill="url(#fdA)" stroke="#f5a300" stroke-width="0.8"/><path d="M6 20h38a2 2 0 012 2v16.5a4 4 0 01-4 4H10a4 4 0 01-4-4V20z" fill="white" opacity="0.34"/></svg>`,
    documents: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><defs><linearGradient id="docA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f1f7ff"/><stop offset="100%" stop-color="#c9dbff"/></linearGradient></defs><rect x="9" y="5" width="26" height="36" rx="8" fill="url(#docA)" stroke="#8fb6ff" stroke-width="1"/><rect x="15" y="12.5" width="14" height="2" rx="1" fill="#7aaaff"/><rect x="15" y="17.5" width="14" height="2" rx="1" fill="#7aaaff"/><rect x="15" y="22.5" width="10" height="2" rx="1" fill="#7aaaff" opacity="0.7"/><path d="M30 5l7 7h-5a2 2 0 01-2-2V5z" fill="#9cc3ff"/></svg>`,
    browser: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><defs><radialGradient id="brA" cx="0.32" cy="0.32" r="0.9"><stop offset="0%" stop-color="#7bc6ff"/><stop offset="100%" stop-color="#1a66e0"/></radialGradient></defs><circle cx="24" cy="24" r="17.5" fill="url(#brA)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/><ellipse cx="24" cy="24" rx="8" ry="17.5" fill="none" stroke="white" stroke-width="1.1" opacity="0.9"/><path d="M6.5 24h35M24 6.5v35" stroke="white" stroke-width="1.1" opacity="0.85" stroke-linecap="round"/></svg>`,
    mediaplayer: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><defs><linearGradient id="mpA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2b2b58"/><stop offset="100%" stop-color="#13132a"/></linearGradient></defs><rect x="6" y="8" width="36" height="32" rx="12" fill="url(#mpA)" stroke="rgba(255,255,255,0.14)" stroke-width="1"/><circle cx="24" cy="24" r="11" fill="none" stroke="#4af2a0" stroke-width="1.8"/><polygon points="21,17 33,24 21,31" fill="#4af2a0"/></svg>`,
    paint: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="10" fill="white" stroke="#d0d8e4" stroke-width="1"/><circle cx="17" cy="19" r="4.2" fill="#ff5a5a" stroke="white" stroke-width="1.2"/><circle cx="29" cy="15" r="4" fill="#2a7bff" stroke="white" stroke-width="1.2"/><circle cx="20" cy="30" r="3.6" fill="#ffbe0b" stroke="white" stroke-width="1.2"/><circle cx="32" cy="28" r="3.8" fill="#4af2a0" stroke="white" stroke-width="1.2"/><path d="M34 38c-4-6-8-2-12-8s-4-10-8-6-8 10-8 10" stroke="#a07bff" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>`,
    calculator: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><rect x="10" y="4" width="28" height="40" rx="10" fill="#eef3ff" stroke="#b8c6da" stroke-width="1"/><rect x="14" y="8" width="20" height="11" rx="4" fill="#d9ecd9" stroke="#9ac99a" stroke-width="0.7"/><rect x="14" y="23" width="5" height="5" rx="2" fill="#c8d2e2"/><rect x="21.5" y="23" width="5" height="5" rx="2" fill="#c8d2e2"/><rect x="29" y="23" width="5" height="5" rx="2" fill="#8fb8ff"/><rect x="14" y="30" width="5" height="5" rx="2" fill="#c8d2e2"/><rect x="21.5" y="30" width="5" height="5" rx="2" fill="#c8d2e2"/><rect x="29" y="30" width="5" height="5" rx="2" fill="#5e9aff"/><rect x="14" y="37" width="12.5" height="5" rx="2" fill="#c8d2e2"/><rect x="29" y="37" width="5" height="5" rx="2" fill="#2a7bff"/></svg>`,
    settings: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><circle cx="24" cy="24" r="8.5" fill="none" stroke="#66748e" stroke-width="2.2"/><path d="M24 4.5l2.9 5.2h-5.8L24 4.5zM24 43.5l-2.9-5.2h5.8L24 43.5zM4.5 24l5.2-2.9v5.8L4.5 24zM43.5 24l-5.2 2.9v-5.8L43.5 24z" fill="#8e9bb2"/><circle cx="24" cy="24" r="2.5" fill="#66748e"/></svg>`,
    network: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><circle cx="24" cy="38" r="4" fill="#4af2a0"/><path d="M12 28a16 16 0 0124 0" fill="none" stroke="#4af2a0" stroke-width="2.6" stroke-linecap="round"/><path d="M6 20a24 24 0 0136 0" fill="none" stroke="#4af2a0" stroke-width="2.6" stroke-linecap="round" opacity="0.84"/><path d="M0 12a32 32 0 0148 0" fill="none" stroke="#4af2a0" stroke-width="2.6" stroke-linecap="round" opacity="0.62"/></svg>`,
    notepad: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><rect x="10" y="4" width="27" height="39" rx="8" fill="#fffbe6" stroke="#d8c46a" stroke-width="1"/><line x1="17" y1="15" x2="33" y2="15" stroke="#d0c090" stroke-width="0.9"/><line x1="17" y1="20" x2="33" y2="20" stroke="#d0c090" stroke-width="0.9"/><rect x="14" y="4" width="2.2" height="7" rx="1" fill="#ff6b6b"/><rect x="20" y="4" width="2.2" height="7" rx="1" fill="#ff6b6b"/><rect x="26" y="4" width="2.2" height="7" rx="1" fill="#ff6b6b"/></svg>`,
    shutdown: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><circle cx="24" cy="24" r="16.5" fill="none" stroke="#ff6b6b" stroke-width="3" stroke-linecap="round"/><line x1="24" y1="8" x2="24" y2="24" stroke="#ff6b6b" stroke-width="3" stroke-linecap="round"/></svg>`,
    controlpanel: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><rect x="6" y="6" width="14" height="14" rx="6" fill="#5a9aff"/><rect x="28" y="6" width="14" height="14" rx="6" fill="#4af2a0"/><rect x="6" y="28" width="14" height="14" rx="6" fill="#ffbe0b"/><rect x="28" y="28" width="14" height="14" rx="6" fill="#ff6b4a"/></svg>`,
    explorer: `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><defs><linearGradient id="exA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe88a"/><stop offset="100%" stop-color="#ffb800"/></linearGradient></defs><path d="M6 15V39a4 4 0 004 4h28a4 4 0 004-4V19a4 4 0 00-4-4H22l-4-5H10a4 4 0 00-4 5z" fill="url(#exA)" stroke="#f5a300" stroke-width="0.8"/><rect x="10" y="22" width="8" height="8" rx="2.5" fill="white" opacity="0.72"/><rect x="21" y="22" width="8" height="8" rx="2.5" fill="white" opacity="0.72"/></svg>`
  };
  return icons[type] || icons.folder;
}

// ===== BOOT SEQUENCE =====
function startBoot() {
  showScreen('bios-screen');
  runBIOS();
}

function showScreen(id) {
  document.querySelectorAll('.boot-screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function runBIOS() {
  const biosText = document.getElementById('bios-text');
  const lines = [
    '>>> WINDOWS XP // NEO BIOS v2026.1.26100 [FRUTIGER AERO REVIVAL]',
    '>>> Copyright (C) 2026 Microsoft Corporation • NEO Subsystem',
    '',
    'CPU: Microsoft NEO Virtual Processor @ 5.2GHz (Turbo Glass Core) [OK]',
    'MEM: 16384MB LPDDR6X Glass Memory • Frequency: 8400MHz • Test: OK',
    'GPU: NEO Aero Glass Accelerator • 12GB VRAM • DirectX 13 • RayTracing [OK]',
    'NEURAL: Copilot+ NPU 120 TOPS • Aero Intelligence [OK]',
    '',
    'Detecting Storage...',
    '  NVMe 0: Virtual Crystal Drive 512GB • Read: 12GB/s [OK]',
    '  NVMe 1: Bliss Archive 256GB • Hologram Cache [OK]',
    'Detecting Display... Fluid Glass Panel @ 240Hz • HDR1000 • Luna Curved [OK]',
    '',
    'Initializing NEO Subsystems...',
    '  > Quantum Glass Compositor ... DONE',
    '  > Hologram Taskbar Island ... DONE',
    '  > Frutiger Aero Orbs + Bliss Engine ... DONE',
    '  > Luna Signature + 4-Panel Flag ... DONE',
    '',
    'Press DEL to enter NEO SETUP • Press F12 for Boot Menu',
    '',
    'Booting from NEO://XP2026.FUTURE/BUILD26100...',
    ''
  ];
  let i = 0;
  biosText.textContent = '';
  const interval = setInterval(() => {
    if (i < lines.length) {
      biosText.textContent += lines[i] + '\n';
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        showScreen('boot-screen');
        setTimeout(() => {
          // Skip setup if returning user? keep for demo
          const hasSeen = localStorage.getItem('xpNeoVisited');
          if (!hasSeen) {
            showScreen('setup-screen');
            initSetup();
          } else {
            showWelcomeScreen();
          }
        }, 3000);
      }, 900);
    }
  }, 95);
}

// ===== SETUP =====
const setupSteps = [
  { name: 'Welcome', type: 'info' },
  { name: 'License', type: 'license' },
  { name: 'Product Key', type: 'key' },
  { name: 'Partition', type: 'partition' },
  { name: 'Formatting', type: 'progress', text: 'Formatting drive C:\\...' },
  { name: 'Copying Files', type: 'progress', text: 'Copying Windows files...' },
  { name: 'Installing', type: 'progress', text: 'Installing Windows components...' },
  { name: 'Devices', type: 'progress', text: 'Installing hardware devices...' },
  { name: 'Region', type: 'region' },
  { name: 'User Account', type: 'user' },
  { name: 'Network', type: 'network' },
  { name: 'Finalizing', type: 'progress', text: 'Completing installation...' }
];

function initSetup() {
  renderSetupStepList();
  renderSetupContent();
}

function renderSetupStepList() {
  const list = document.getElementById('setup-step-list');
  list.innerHTML = setupSteps.map((step, i) => {
    let cls = 'setup-step-item';
    if (i === state.currentSetupStep) cls += ' active';
    else if (i < state.currentSetupStep) cls += ' done';
    return `<div class="${cls}">${i + 1}. ${step.name}</div>`;
  }).join('');
  const bar = document.getElementById('setup-progress-bar');
  bar.style.width = ((state.currentSetupStep / (setupSteps.length - 1)) * 100) + '%';
}

function renderSetupContent() {
  const content = document.getElementById('setup-content');
  const step = setupSteps[state.currentSetupStep];
  const backBtn = document.getElementById('setup-back-btn');
  const nextBtn = document.getElementById('setup-next-btn');
  backBtn.disabled = state.currentSetupStep === 0;
  
  switch (step.type) {
    case 'info':
      content.innerHTML = `
        <h2>Welcome to Windows XP // NEO 2026</h2>
        <p>Future Edition • Frutiger Aero Revival • Luna Glass • Hologram Island Taskbar</p>
        <p>Reimagined for 2026: XP's soul with quantum glass compositor, floating orbs, neon Bliss, and intelligent aero. Classic green Start, but now with holographic depth.</p>
        <div style="margin-top:16px;padding:16px;background:linear-gradient(180deg, rgba(58,240,255,0.10), rgba(42,123,255,0.08));border-radius:14px;border:1px solid rgba(58,240,255,0.18);backdrop-filter:blur(8px)">
          <p style="color:rgba(255,255,255,0.92);font-size:12.5px;line-height:1.7">
            <strong style="letter-spacing:0.5px">NEO SYSTEM REQUIREMENTS:</strong><br>
            • Processor: NEO Glass Core 5.2GHz • NPU 120 TOPS<br>
            • Memory: 16GB LPDDR6X Glass + Hologram Cache<br>
            • Storage: 512GB Crystal NVMe 12GB/s<br>
            • Display: Fluid Glass 240Hz HDR • Aero Orbs Engine<br>
            • Sound: Spatial Audio + XP Startup Nostalgia
          </p>
        </div>
        <p style="margin-top:14px;font-size:12px">Click <strong>Next</strong> to initialize NEO installation • Build 26100</p>`;
      nextBtn.textContent = 'Next';
      break;

    case 'license':
      content.innerHTML = `
        <h2>License Agreement</h2>
        <p>Please read the following license agreement carefully.</p>
        <div style="max-height:140px;overflow-y:auto;padding:12px;background:rgba(0,0,0,0.15);border-radius:6px;font-size:11px;line-height:1.6;color:rgba(255,255,255,0.7);margin:8px 0;">
          MICROSOFT SOFTWARE LICENSE TERMS — WINDOWS XP 2026 REMASTERED EDITION<br><br>
          These license terms are an agreement between Microsoft Corporation and you. Please read them. They apply to the software named above, which includes the media on which you received it, if any.<br><br>
          By using the software, you accept these terms. If you do not accept them, do not use the software.<br><br>
          1. INSTALLATION AND USE RIGHTS. You may install and use one copy of the software on the device with which you acquired the software.<br><br>
          2. SCOPE OF LICENSE. The software is licensed, not sold. This agreement only gives you some rights to use the software.<br><br>
          3. EDUCATIONAL USE. This is a demonstration and educational project.
        </div>
        <label class="setup-radio" style="margin-top:8px;">
          <input type="radio" name="license" value="accept" checked> I accept the agreement
        </label>
        <label class="setup-radio">
          <input type="radio" name="license" value="decline"> I do not accept
        </label>`;
      nextBtn.textContent = 'Next';
      break;

    case 'key':
      content.innerHTML = `
        <h2>Product Key</h2>
        <p>Enter your 25-character product key. You can find it on the Certificate of Authenticity or on a label on your computer.</p>
        <div class="setup-key-inputs" style="margin-top:12px;">
          <input class="setup-key-input" maxlength="5" data-ki="0" value="XPREM">
          <span class="key-dash">-</span>
          <input class="setup-key-input" maxlength="5" data-ki="1" value="2026E">
          <span class="key-dash">-</span>
          <input class="setup-key-input" maxlength="5" data-ki="2" value="DTION">
          <span class="key-dash">-</span>
          <input class="setup-key-input" maxlength="5" data-ki="3" value="GLASS">
          <span class="key-dash">-</span>
          <input class="setup-key-input" maxlength="5" data-ki="4" value="MSFTR">
        </div>
        <p style="margin-top:12px;font-size:11px;">A valid key has been pre-filled for this demonstration.</p>`;
      nextBtn.textContent = 'Next';
      setupKeyInputNav();
      break;

    case 'partition':
      content.innerHTML = `
        <h2>Disk Partition</h2>
        <p>Select the partition where you want to install Windows XP 2026.</p>
        <table class="partition-table">
          <thead><tr><th>Partition</th><th>Type</th><th>Size</th><th>Free Space</th></tr></thead>
          <tbody>
            <tr class="selected"><td>C:</td><td>NTFS</td><td>200 GB</td><td>200 GB</td></tr>
            <tr><td>D:</td><td>NTFS</td><td>56 GB</td><td>56 GB</td></tr>
          </tbody>
        </table>
        <p style="margin-top:8px;font-size:11px;">Windows will be installed to partition C:</p>`;
      nextBtn.textContent = 'Next';
      break;

    case 'progress':
      content.innerHTML = `
        <h2>${step.name}</h2>
        <p>${step.text}</p>
        <div class="setup-progress-anim">
          <div class="setup-progress-fill" id="setup-anim-bar"></div>
        </div>
        <p id="setup-progress-detail" style="font-size:11px;">Preparing...</p>`;
      nextBtn.textContent = 'Next';
      nextBtn.disabled = true;
      runSetupProgress();
      return;

    case 'region':
      content.innerHTML = `
        <h2>Regional Settings</h2>
        <p>Select your region and keyboard layout.</p>
        <label style="margin-top:8px;">Region:</label>
        <select class="setup-input" style="max-width:250px;">
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>Germany</option>
          <option>France</option>
          <option>Japan</option>
        </select>
        <label style="margin-top:12px;">Keyboard Layout:</label>
        <select class="setup-input" style="max-width:250px;">
          <option>US - English</option>
          <option>UK - English</option>
          <option>DE - German</option>
          <option>FR - French</option>
          <option>JP - Japanese</option>
        </select>
        <label style="margin-top:12px;">Time Zone:</label>
        <select class="setup-input" style="max-width:250px;">
          <option>(UTC-08:00) Pacific Time</option>
          <option>(UTC-05:00) Eastern Time</option>
          <option>(UTC+00:00) GMT</option>
          <option>(UTC+01:00) Central European</option>
          <option>(UTC+09:00) Tokyo</option>
        </select>`;
      nextBtn.textContent = 'Next';
      break;

    case 'user':
      content.innerHTML = `
        <h2>User Account</h2>
        <p>Enter a name for your user account. This will appear on the Welcome screen.</p>
        <label style="margin-top:8px;">Your name:</label>
        <input class="setup-input" id="setup-username" placeholder="Enter your name" value="${state.userName !== 'User' ? state.userName : ''}">
        <label style="margin-top:12px;">Computer name:</label>
        <input class="setup-input" id="setup-compname" placeholder="DESKTOP-XP2026" value="DESKTOP-XP2026">`;
      nextBtn.textContent = 'Next';
      break;

    case 'network':
      content.innerHTML = `
        <h2>Network Setup</h2>
        <p>How do you want to connect to the network?</p>
        <div class="setup-radio-group">
          <label class="setup-radio">
            <input type="radio" name="nettype" value="auto" checked> Typical settings (recommended)
          </label>
          <label class="setup-radio">
            <input type="radio" name="nettype" value="custom"> Custom settings
          </label>
        </div>
        <div style="margin-top:12px;padding:12px;background:rgba(255,255,255,0.06);border-radius:6px;">
          <p style="font-size:11px;">Typical settings will configure your network adapter to use DHCP for automatic IP address assignment.</p>
        </div>`;
      nextBtn.textContent = 'Install';
      break;
  }
}

function setupKeyInputNav() {
  setTimeout(() => {
    document.querySelectorAll('.setup-key-input').forEach(input => {
      input.addEventListener('input', (e) => {
        if (e.target.value.length >= 5) {
          const idx = parseInt(e.target.dataset.ki);
          const next = document.querySelector(`[data-ki="${idx + 1}"]`);
          if (next) next.focus();
        }
      });
    });
  }, 100);
}

function runSetupProgress() {
  const bar = document.getElementById('setup-anim-bar');
  const detail = document.getElementById('setup-progress-detail');
  const nextBtn = document.getElementById('setup-next-btn');
  const details = [
    'Preparing files...',
    'Processing system files...',
    'Configuring components...',
    'Registering system services...',
    'Applying settings...',
    'Almost done...',
    'Complete!'
  ];
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      nextBtn.disabled = false;
    }
    bar.style.width = progress + '%';
    const dIdx = Math.min(Math.floor(progress / 15), details.length - 1);
    detail.textContent = details[dIdx];
  }, 200);
}

function setupNext() {
  const step = setupSteps[state.currentSetupStep];
  
  if (step.type === 'user') {
    const nameInput = document.getElementById('setup-username');
    if (nameInput && nameInput.value.trim()) {
      state.userName = nameInput.value.trim();
    }
  }

  if (state.currentSetupStep < setupSteps.length - 1) {
    state.currentSetupStep++;
    renderSetupStepList();
    renderSetupContent();
  } else {
    finishSetup();
  }
}

function setupBack() {
  if (state.currentSetupStep > 0) {
    state.currentSetupStep--;
    renderSetupStepList();
    renderSetupContent();
  }
}

function finishSetup() {
  localStorage.setItem('xpNeoVisited','1');
  showScreen('boot-screen');
  // Change boot text to NEO Ready
  const bs = document.querySelector('#boot-screen .boot-subtitle');
  if (bs) bs.textContent = 'NEO KERNEL READY • LAUNCHING GLASS SHELL...';
  setTimeout(() => {
    showWelcomeScreen();
  }, 2400);
}

function showWelcomeScreen() {
  document.getElementById('welcome-username').textContent = state.userName;
  showScreen('welcome-screen');
  document.getElementById('welcome-user-card').onclick = () => {
    document.getElementById('welcome-user-card').style.display = 'none';
    document.getElementById('welcome-loading').style.display = 'block';
    setTimeout(() => {
      enterDesktop();
    }, 2200);
  };
}

// ===== DESKTOP =====
function enterDesktop() {
  showScreen('desktop');
  document.getElementById('start-menu-username').textContent = state.userName;
  loadTheme();
  initDesktopIcons();
  initClock();
  initDesktopEvents();
  // Re-render start menu right panel with actual SVGs
  renderStartMenuRight();
  setTimeout(() => {
    showNotification('Windows XP 2026', `Welcome, ${state.userName}! Your desktop is ready.`);
  }, 1000);
}

function loadTheme() {
  const saved = localStorage.getItem('xp2026_wallpaper');
  if (saved) {
    state.currentWallpaper = saved;
    setWallpaper(saved);
  }
}

function renderStartMenuRight() {
  const right = document.querySelector('.start-menu-right');
  if (!right) return;
  right.innerHTML = `
    <div class="start-menu-item" onclick="openApp('mycomputer')">
      <span class="smi-icon">${getIconSVG('mycomputer',20)}</span> My Computer
    </div>
    <div class="start-menu-item" onclick="openApp('documents')">
      <span class="smi-icon">${getIconSVG('documents',20)}</span> My Documents
    </div>
    <div class="start-menu-item" onclick="openApp('explorer')">
      <span class="smi-icon">${getIconSVG('folder',20)}</span> File Explorer
    </div>
    <div class="start-menu-item" onclick="openApp('controlpanel')">
      <span class="smi-icon">${getIconSVG('controlpanel',20)}</span> Control Panel
    </div>
    <div class="start-menu-item" onclick="openApp('settings')">
      <span class="smi-icon">${getIconSVG('settings',20)}</span> Settings
    </div>
    <div class="start-menu-divider"></div>
    <div class="start-menu-item" onclick="openApp('network')">
      <span class="smi-icon">${getIconSVG('network',20)}</span> Network
    </div>
  `;
}

const desktopIconDefs = [
  { id: 'mycomputer', label: 'My Computer', icon: 'mycomputer', x: 20, y: 20 },
  { id: 'recyclebin', label: 'Recycle Bin', icon: 'recyclebin', x: 20, y: 110 },
  { id: 'documents', label: 'My Documents', icon: 'documents', x: 20, y: 200 },
  { id: 'explorer', label: 'File Explorer', icon: 'explorer', x: 20, y: 290 },
  { id: 'browser', label: 'Internet Explorer', icon: 'browser', x: 20, y: 380 },
  { id: 'notepad', label: 'Notepad', icon: 'notepad', x: 110, y: 20 },
  { id: 'calculator', label: 'Calculator', icon: 'calculator', x: 110, y: 110 },
  { id: 'paint', label: 'Paint', icon: 'paint', x: 110, y: 200 },
  { id: 'mediaplayer', label: 'Media Player', icon: 'mediaplayer', x: 110, y: 290 },
  { id: 'controlpanel', label: 'Control Panel', icon: 'controlpanel', x: 110, y: 380 },
  { id: 'settings', label: 'Settings', icon: 'settings', x: 200, y: 20 },
];

function initDesktopIcons() {
  const container = document.getElementById('desktop-icons');
  container.innerHTML = '';
  desktopIconDefs.forEach(def => {
    const el = document.createElement('div');
    el.className = 'desktop-icon';
    el.dataset.id = def.id;
    el.style.left = def.x + 'px';
    el.style.top = def.y + 'px';
    el.innerHTML = `
      <div class="desktop-icon-img">${getIconSVG(def.icon, 44)}</div>
      <div class="desktop-icon-label">${def.label}</div>
    `;
    el.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      openApp(def.id);
    });
    el.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      selectIcon(def.id, e.ctrlKey);
    });
    container.appendChild(el);
  });

  // Also populate start menu programs
  renderStartMenuPrograms();
}

function renderStartMenuPrograms() {
  const prog = document.getElementById('start-menu-programs');
  if (!prog) return;
  const apps = [
    { id: 'browser', label: 'Internet Explorer', icon: 'browser' },
    { id: 'explorer', label: 'File Explorer', icon: 'explorer' },
    { id: 'notepad', label: 'Notepad', icon: 'notepad' },
    { id: 'calculator', label: 'Calculator', icon: 'calculator' },
    { id: 'paint', label: 'Paint', icon: 'paint' },
    { id: 'mediaplayer', label: 'Media Player', icon: 'mediaplayer' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  prog.innerHTML = apps.map(a => `
    <div class="start-menu-item" onclick="openApp('${a.id}')">
      <span class="smi-icon">${getIconSVG(a.icon, 20)}</span> ${a.label}
    </div>
  `).join('');
}

function selectIcon(id, multi) {
  if (!multi) {
    state.selectedIcons = [id];
  } else {
    const idx = state.selectedIcons.indexOf(id);
    if (idx >= 0) state.selectedIcons.splice(idx, 1);
    else state.selectedIcons.push(id);
  }
  updateIconSelection();
}

function updateIconSelection() {
  document.querySelectorAll('.desktop-icon').forEach(el => {
    el.classList.toggle('selected', state.selectedIcons.includes(el.dataset.id));
  });
}

// ===== CLOCK =====
function initClock() {
  updateClock();
  setInterval(updateClock, 1000);
  // parallax for orbs
  document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.fx-orb');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 8;
      orb.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0) scale(${1 + i*0.02})`;
    });
  });
}

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  
  const tray = document.getElementById('tray-clock');
  if (tray) {
    tray.innerHTML = `${h12}:${m} ${ampm}<small style="display:block;font-size:9px;opacity:.6;letter-spacing:.2px">${months[now.getMonth()]} ${now.getDate()} • NEO</small>`;
    tray.title = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} 2026 - ${h12}:${m}:${s} ${ampm}`;
  }
  const dTime = document.getElementById('desktop-clock-time');
  const dDate = document.getElementById('desktop-clock-date');
  if (dTime) dTime.textContent = `${h12}:${m}`;
  if (dDate) dDate.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} 2026 • ${ampm} • ${s}s uptime`;
}

// ===== DESKTOP EVENTS =====
function initDesktopEvents() {
  const desktop = document.getElementById('desktop');
  const iconsArea = document.getElementById('desktop-icons');
  
  // Right-click context menu
  iconsArea.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY);
  });

  // Click to deselect
  iconsArea.addEventListener('mousedown', (e) => {
    if (e.target === iconsArea || e.target.id === 'desktop-icons') {
      state.selectedIcons = [];
      updateIconSelection();
      closeStartMenu();
      // Start selection rectangle
      state.isSelecting = true;
      state.selectStart = { x: e.clientX, y: e.clientY };
      const rect = document.getElementById('select-rect');
      rect.style.display = 'block';
      rect.style.left = e.clientX + 'px';
      rect.style.top = e.clientY + 'px';
      rect.style.width = '0px';
      rect.style.height = '0px';
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (state.isSelecting) {
      const rect = document.getElementById('select-rect');
      const x = Math.min(e.clientX, state.selectStart.x);
      const y = Math.min(e.clientY, state.selectStart.y);
      const w = Math.abs(e.clientX - state.selectStart.x);
      const h = Math.abs(e.clientY - state.selectStart.y);
      rect.style.left = x + 'px';
      rect.style.top = y + 'px';
      rect.style.width = w + 'px';
      rect.style.height = h + 'px';
      
      // Check which icons are in selection
      const selRect = { x, y, w, h };
      state.selectedIcons = [];
      document.querySelectorAll('.desktop-icon').forEach(icon => {
        const ir = icon.getBoundingClientRect();
        if (ir.left < selRect.x + selRect.w &&
            ir.right > selRect.x &&
            ir.top < selRect.y + selRect.h &&
            ir.bottom > selRect.y) {
          state.selectedIcons.push(icon.dataset.id);
        }
      });
      updateIconSelection();
    }
  });

  document.addEventListener('mouseup', () => {
    if (state.isSelecting) {
      state.isSelecting = false;
      document.getElementById('select-rect').style.display = 'none';
    }
  });

  // Close context menu on click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.context-menu')) {
      document.getElementById('context-menu').style.display = 'none';
    }
    if (!e.target.closest('.start-menu') && !e.target.closest('.start-button')) {
      closeStartMenu();
    }
  });
  
  // Start search
  document.addEventListener('keydown', (e) => {
    const searchInput = document.getElementById('start-search');
    if (searchInput && document.activeElement === searchInput) {
      // Filter start menu programs
      setTimeout(() => filterStartMenu(searchInput.value), 10);
    }
  });
}

function filterStartMenu(query) {
  const items = document.querySelectorAll('#start-menu-programs .start-menu-item');
  query = query.toLowerCase();
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}

function showContextMenu(x, y) {
  const menu = document.getElementById('context-menu');
  menu.style.display = 'block';
  menu.style.left = Math.min(x, window.innerWidth - 200) + 'px';
  menu.style.top = Math.min(y, window.innerHeight - 250) + 'px';
  menu.innerHTML = `
    <div class="ctx-item" onclick="contextAction('refresh')">↻ Refresh</div>
    <div class="ctx-divider"></div>
    <div class="ctx-item" onclick="contextAction('newFolder')">📁 New Folder</div>
    <div class="ctx-item" onclick="contextAction('newText')">📄 New Text Document</div>
    <div class="ctx-divider"></div>
    <div class="ctx-item" onclick="contextAction('sortName')">Sort by Name</div>
    <div class="ctx-item" onclick="contextAction('sortSize')">Sort by Size</div>
    <div class="ctx-divider"></div>
    <div class="ctx-item" onclick="contextAction('wallpaper')">🖼 Change Wallpaper</div>
    <div class="ctx-item" onclick="contextAction('settings')">⚙ Display Settings</div>
    <div class="ctx-divider"></div>
    <div class="ctx-item" onclick="contextAction('properties')">Properties</div>
  `;
}

function contextAction(action) {
  document.getElementById('context-menu').style.display = 'none';
  switch (action) {
    case 'refresh':
      showNotification('Desktop', 'Desktop refreshed.');
      break;
    case 'wallpaper':
    case 'settings':
      openApp('settings');
      break;
    case 'properties':
      showNotification('Properties', 'System: Windows XP 2026 Remastered');
      break;
    case 'newFolder':
      showNotification('New Folder', 'Created "New Folder" on desktop.');
      break;
    case 'newText':
      showNotification('New File', 'Created "New Text Document.txt"');
      break;
  }
}

// ===== START MENU =====
function toggleStartMenu() {
  if (state.startMenuOpen) {
    closeStartMenu();
  } else {
    openStartMenu();
  }
}

function openStartMenu() {
  const menu = document.getElementById('start-menu');
  menu.style.display = 'block';
  state.startMenuOpen = true;
}

function closeStartMenu() {
  const menu = document.getElementById('start-menu');
  menu.style.display = 'none';
  state.startMenuOpen = false;
}

// ===== NOTIFICATION =====
function showNotification(title, body) {
  const notif = document.getElementById('notification');
  document.getElementById('notif-title').textContent = title;
  document.getElementById('notif-body').textContent = body;
  notif.style.display = 'block';
  notif.style.animation = 'none';
  notif.offsetHeight;
  notif.style.animation = 'notifSlide 0.3s ease';
  setTimeout(() => {
    notif.style.display = 'none';
  }, 4000);
}

// ===== WINDOW SYSTEM =====
function createWindow(appId, title, width, height, content, options = {}) {
  closeStartMenu();
  
  // Check if already open
  const existing = state.windows.find(w => w.appId === appId && !options.allowMultiple);
  if (existing) {
    focusWindow(existing.id);
    if (existing.minimized) restoreWindow(existing.id);
    return existing.id;
  }

  const id = state.nextWindowId++;
  const z = state.nextZIndex++;
  const x = 80 + (id * 30) % 200;
  const y = 40 + (id * 25) % 150;

  const win = {
    id, appId, title, x, y,
    width: width || 600,
    height: height || 420,
    z, minimized: false, maximized: false,
    prevRect: null
  };
  state.windows.push(win);

  const el = document.createElement('div');
  el.className = 'window';
  el.id = 'window-' + id;
  el.style.left = win.x + 'px';
  el.style.top = win.y + 'px';
  el.style.width = win.width + 'px';
  el.style.height = win.height + 'px';
  el.style.zIndex = z;

  el.innerHTML = `
    <div class="window-titlebar" data-wid="${id}">
      <div class="window-title-icon">${getIconSVG(appId, 18)}</div>
      <div class="window-title-text">${title}</div>
      <div class="window-controls">
        <button class="window-ctrl-btn min-btn" onclick="minimizeWindow(${id})" title="Minimize">
          <svg viewBox="0 0 12 12" fill="white"><rect x="2" y="9" width="8" height="1.5"/></svg>
        </button>
        <button class="window-ctrl-btn max-btn" onclick="maximizeWindow(${id})" title="Maximize">
          <svg viewBox="0 0 12 12" fill="none" stroke="white" stroke-width="1.5"><rect x="2" y="2" width="8" height="8" rx="1"/></svg>
        </button>
        <button class="window-ctrl-btn close-btn" onclick="closeWindow(${id})" title="Close">
          <svg viewBox="0 0 12 12" stroke="white" stroke-width="1.5"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
        </button>
      </div>
    </div>
    <div class="window-body">${content}</div>
    <div class="resize-handle" data-wid="${id}"></div>
  `;

  document.getElementById('windows-container').appendChild(el);
  initWindowDrag(el, id);
  initWindowResize(el, id);
  focusWindow(id);
  updateTaskbar();

  // mousedown on window to focus
  el.addEventListener('mousedown', () => focusWindow(id));

  // Run app init if needed
  if (options.onInit) {
    setTimeout(() => options.onInit(id), 50);
  }

  return id;
}

function focusWindow(id) {
  state.activeWindowId = id;
  const z = state.nextZIndex++;
  const el = document.getElementById('window-' + id);
  if (el) {
    el.style.zIndex = z;
    const w = state.windows.find(w => w.id === id);
    if (w) w.z = z;
  }
  // Update active/inactive states
  document.querySelectorAll('.window').forEach(w => {
    w.classList.toggle('inactive', w.id !== 'window-' + id);
  });
  updateTaskbar();
}

function minimizeWindow(id) {
  const el = document.getElementById('window-' + id);
  const win = state.windows.find(w => w.id === id);
  if (!el || !win) return;
  el.classList.add('minimizing');
  setTimeout(() => {
    el.style.display = 'none';
    el.classList.remove('minimizing');
    win.minimized = true;
    updateTaskbar();
  }, 250);
}

function restoreWindow(id) {
  const el = document.getElementById('window-' + id);
  const win = state.windows.find(w => w.id === id);
  if (!el || !win) return;
  win.minimized = false;
  el.style.display = 'flex';
  el.classList.add('restoring');
  setTimeout(() => el.classList.remove('restoring'), 250);
  focusWindow(id);
  updateTaskbar();
}

function maximizeWindow(id) {
  const el = document.getElementById('window-' + id);
  const win = state.windows.find(w => w.id === id);
  if (!el || !win) return;

  if (win.maximized) {
    // Restore
    win.maximized = false;
    el.classList.remove('maximized');
    if (win.prevRect) {
      el.style.left = win.prevRect.x + 'px';
      el.style.top = win.prevRect.y + 'px';
      el.style.width = win.prevRect.w + 'px';
      el.style.height = win.prevRect.h + 'px';
    }
  } else {
    // Maximize
    win.prevRect = {
      x: parseInt(el.style.left),
      y: parseInt(el.style.top),
      w: parseInt(el.style.width),
      h: parseInt(el.style.height)
    };
    win.maximized = true;
    el.classList.add('maximized');
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.width = '100%';
    el.style.height = 'calc(100% - 42px)';
  }
}

function closeWindow(id) {
  const el = document.getElementById('window-' + id);
  if (!el) return;
  el.classList.add('closing');
  setTimeout(() => {
    el.remove();
    state.windows = state.windows.filter(w => w.id !== id);
    updateTaskbar();
    if (state.activeWindowId === id) {
      state.activeWindowId = null;
    }
  }, 180);
}

function initWindowDrag(el, id) {
  const titlebar = el.querySelector('.window-titlebar');
  let isDragging = false, startX, startY, origX, origY;

  titlebar.addEventListener('mousedown', (e) => {
    if (e.target.closest('.window-controls')) return;
    const win = state.windows.find(w => w.id === id);
    if (win && win.maximized) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origX = parseInt(el.style.left) || 0;
    origY = parseInt(el.style.top) || 0;
    focusWindow(id);
    e.preventDefault();
  });

  // Double-click titlebar to maximize
  titlebar.addEventListener('dblclick', (e) => {
    if (e.target.closest('.window-controls')) return;
    maximizeWindow(id);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    el.style.left = (origX + dx) + 'px';
    el.style.top = Math.max(0, origY + dy) + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

function initWindowResize(el, id) {
  const handle = el.querySelector('.resize-handle');
  let isResizing = false, startX, startY, origW, origH;

  handle.addEventListener('mousedown', (e) => {
    const win = state.windows.find(w => w.id === id);
    if (win && win.maximized) return;
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    origW = parseInt(el.style.width) || 400;
    origH = parseInt(el.style.height) || 300;
    focusWindow(id);
    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    el.style.width = Math.max(320, origW + dx) + 'px';
    el.style.height = Math.max(200, origH + dy) + 'px';
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
  });
}

// ===== TASKBAR =====
function updateTaskbar() {
  const container = document.getElementById('taskbar-apps');
  container.innerHTML = '';
  state.windows.forEach(win => {
    const btn = document.createElement('button');
    btn.className = 'taskbar-app';
    if (win.id === state.activeWindowId && !win.minimized) btn.classList.add('active');
    if (win.minimized) btn.classList.add('minimized');
    btn.innerHTML = `${getIconSVG(win.appId, 16)} <span>${win.title}</span>`;
    btn.onclick = () => {
      if (win.minimized) {
        restoreWindow(win.id);
      } else if (win.id === state.activeWindowId) {
        minimizeWindow(win.id);
      } else {
        focusWindow(win.id);
      }
    };
    container.appendChild(btn);
  });
}

// ===== SHUTDOWN =====
function doShutdown(type) {
  closeStartMenu();
  const screen = document.getElementById('shutdown-screen');
  const text = document.getElementById('shutdown-text');

  if (type === 'logoff') {
    text.textContent = 'Logging off...';
    screen.classList.add('active');
    setTimeout(() => {
      screen.classList.remove('active');
      // Clear windows
      document.getElementById('windows-container').innerHTML = '';
      state.windows = [];
      updateTaskbar();
      showWelcomeScreen();
    }, 2500);
  } else if (type === 'shutdown') {
    text.textContent = 'Saving your settings...';
    screen.classList.add('active');
    setTimeout(() => {
      text.textContent = 'Windows is shutting down...';
      setTimeout(() => {
        document.body.style.background = '#000';
        document.querySelectorAll('.boot-screen').forEach(s => s.classList.remove('active'));
        // Show black screen
        const black = document.createElement('div');
        black.style.cssText = 'position:fixed;inset:0;background:#000;z-index:999999;display:flex;align-items:center;justify-content:center;color:#666;font-size:14px;';
        black.textContent = 'It is now safe to refresh your browser.';
        document.body.appendChild(black);
      }, 2000);
    }, 1500);
  } else if (type === 'restart') {
    text.textContent = 'Restarting...';
    screen.classList.add('active');
    setTimeout(() => {
      screen.classList.remove('active');
      document.getElementById('windows-container').innerHTML = '';
      state.windows = [];
      showScreen('boot-screen');
      setTimeout(() => {
        showWelcomeScreen();
      }, 2500);
    }, 2500);
  }
}

// ===== APPLICATIONS =====
function openApp(appId) {
  closeStartMenu();
  switch (appId) {
    case 'mycomputer': openMyComputer(); break;
    case 'explorer': openExplorer(); break;
    case 'browser': openBrowser(); break;
    case 'calculator': openCalculator(); break;
    case 'notepad': openNotepad(); break;
    case 'paint': openPaint(); break;
    case 'mediaplayer': openMediaPlayer(); break;
    case 'controlpanel': openControlPanel(); break;
    case 'settings': openSettings(); break;
    case 'documents': openDocuments(); break;
    case 'network': openNetwork(); break;
    case 'recyclebin': openRecycleBin(); break;
  }
}

// My Computer
function openMyComputer() {
  const content = `
    <div class="window-menubar">
      <span class="window-menu-item">File</span>
      <span class="window-menu-item">Edit</span>
      <span class="window-menu-item">View</span>
      <span class="window-menu-item">Help</span>
    </div>
    <div class="explorer-content">
      <div class="explorer-sidebar">
        <div class="explorer-sidebar-header">System</div>
        <div class="explorer-sidebar-item active">${getIconSVG('mycomputer',16)} My Computer</div>
        <div class="explorer-sidebar-item">${getIconSVG('documents',16)} Documents</div>
        <div class="explorer-sidebar-item">${getIconSVG('network',16)} Network</div>
      </div>
      <div class="explorer-main">
        <div class="explorer-item" ondblclick="openExplorer()">
          <div class="explorer-item-icon">
            <svg width="36" height="36" viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="28" rx="3" fill="#90caf9" stroke="#42a5f5" stroke-width="1"/><rect x="10" y="16" width="28" height="6" rx="1" fill="#e3f2fd"/><text x="24" y="34" text-anchor="middle" font-size="10" fill="#1565c0">C:</text></svg>
          </div>
          <div class="explorer-item-name">Local Disk (C:)</div>
        </div>
        <div class="explorer-item">
          <div class="explorer-item-icon">
            <svg width="36" height="36" viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="28" rx="3" fill="#a5d6a7" stroke="#66bb6a" stroke-width="1"/><rect x="10" y="16" width="28" height="6" rx="1" fill="#e8f5e9"/><text x="24" y="34" text-anchor="middle" font-size="10" fill="#2e7d32">D:</text></svg>
          </div>
          <div class="explorer-item-name">Data (D:)</div>
        </div>
        <div class="explorer-item">
          <div class="explorer-item-icon">
            <svg width="36" height="36" viewBox="0 0 48 48"><circle cx="24" cy="26" r="14" fill="#e0e0e0" stroke="#bdbdbd" stroke-width="1"/><circle cx="24" cy="26" r="4" fill="#9e9e9e"/><circle cx="24" cy="26" r="1" fill="#616161"/></svg>
          </div>
          <div class="explorer-item-name">DVD Drive (E:)</div>
        </div>
      </div>
    </div>
    <div class="window-statusbar">3 items</div>
  `;
  createWindow('mycomputer', 'My Computer', 650, 420, content);
}

// File Explorer
function openExplorer() {
  const files = [
    { name: 'Documents', icon: 'folder' },
    { name: 'Downloads', icon: 'folder' },
    { name: 'Music', icon: 'folder' },
    { name: 'Pictures', icon: 'folder' },
    { name: 'Videos', icon: 'folder' },
    { name: 'Desktop', icon: 'folder' },
    { name: 'readme.txt', icon: 'documents' },
    { name: 'notes.txt', icon: 'documents' },
    { name: 'photo.jpg', icon: 'paint' },
  ];
  
  const content = `
    <div class="window-menubar">
      <span class="window-menu-item">File</span>
      <span class="window-menu-item">Edit</span>
      <span class="window-menu-item">View</span>
      <span class="window-menu-item">Tools</span>
      <span class="window-menu-item">Help</span>
    </div>
    <div class="window-toolbar">
      <button class="toolbar-btn">← Back</button>
      <button class="toolbar-btn">→ Forward</button>
      <button class="toolbar-btn">↑ Up</button>
    </div>
    <div class="window-addressbar">
      <span style="font-size:11px;color:#666;">Address:</span>
      <input class="address-input" value="C:\\Users\\${state.userName}">
    </div>
    <div class="explorer-content">
      <div class="explorer-sidebar">
        <div class="explorer-sidebar-header">Quick Access</div>
        <div class="explorer-sidebar-item">${getIconSVG('folder',16)} Desktop</div>
        <div class="explorer-sidebar-item active">${getIconSVG('folder',16)} Home</div>
        <div class="explorer-sidebar-item">${getIconSVG('documents',16)} Documents</div>
        <div class="explorer-sidebar-item">${getIconSVG('folder',16)} Downloads</div>
        <div class="explorer-sidebar-header">Drives</div>
        <div class="explorer-sidebar-item">${getIconSVG('mycomputer',16)} C:</div>
        <div class="explorer-sidebar-item">${getIconSVG('mycomputer',16)} D:</div>
      </div>
      <div class="explorer-main">
        ${files.map(f => `
          <div class="explorer-item" ondblclick="${f.icon === 'folder' ? "showNotification('Explorer','Opening " + f.name + "...')" : f.name.endsWith('.txt') ? "openNotepad()" : "showNotification('File','" + f.name + "')"}">
            <div class="explorer-item-icon">${getIconSVG(f.icon, 36)}</div>
            <div class="explorer-item-name">${f.name}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="window-statusbar">${files.length} items</div>
  `;
  createWindow('explorer', 'File Explorer', 700, 460, content);
}

// Browser
function openBrowser() {
  const content = `
    <div class="window-toolbar" style="gap:6px;">
      <button class="toolbar-btn" onclick="browserBack()">←</button>
      <button class="toolbar-btn" onclick="browserForward()">→</button>
      <button class="toolbar-btn" onclick="browserRefresh()">↻</button>
      <button class="toolbar-btn" onclick="browserHome()">🏠</button>
      <input class="address-input" id="browser-url" value="https://www.msn.com" style="flex:1;" onkeydown="if(event.key==='Enter')browserGo()">
      <button class="address-go-btn" onclick="browserGo()">Go</button>
    </div>
    <div class="window-body browser-content" id="browser-body">
      <div class="browser-home">
        <svg width="60" height="60" viewBox="0 0 80 80" style="margin-bottom:12px;">
          <rect x="2" y="2" width="34" height="34" rx="6" fill="#F25022"/>
          <rect x="42" y="2" width="34" height="34" rx="6" fill="#7FBA00"/>
          <rect x="2" y="42" width="34" height="34" rx="6" fill="#00A4EF"/>
          <rect x="42" y="42" width="34" height="34" rx="6" fill="#FFB900"/>
        </svg>
        <h1>Internet Explorer 2026</h1>
        <p>Your gateway to the web, reimagined.</p>
        <div class="browser-search-wrap">
          <input class="browser-search-input" placeholder="Search the web..." id="browser-search-input" onkeydown="if(event.key==='Enter')browserSearch()">
          <button class="browser-search-btn" onclick="browserSearch()">Search</button>
        </div>
        <div class="browser-shortcuts">
          <div class="browser-shortcut" onclick="browserNavigate('MSN')">
            <div class="browser-shortcut-icon" style="background:#0078d4;">M</div>
            <span>MSN</span>
          </div>
          <div class="browser-shortcut" onclick="browserNavigate('Outlook')">
            <div class="browser-shortcut-icon" style="background:#0072c6;">O</div>
            <span>Outlook</span>
          </div>
          <div class="browser-shortcut" onclick="browserNavigate('Bing')">
            <div class="browser-shortcut-icon" style="background:#008373;">B</div>
            <span>Bing</span>
          </div>
          <div class="browser-shortcut" onclick="browserNavigate('Office')">
            <div class="browser-shortcut-icon" style="background:#d83b01;">O</div>
            <span>Office</span>
          </div>
        </div>
      </div>
    </div>
  `;
  createWindow('browser', 'Internet Explorer 2026', 750, 500, content);
}

function browserGo() {
  const url = document.getElementById('browser-url');
  if (url) {
    browserNavigate(url.value);
  }
}

function browserSearch() {
  const input = document.getElementById('browser-search-input');
  if (input && input.value.trim()) {
    browserNavigate('Search: ' + input.value);
  }
}

function browserNavigate(site) {
  const body = document.getElementById('browser-body');
  if (!body) return;
  const url = document.getElementById('browser-url');
  if (url) url.value = 'https://www.' + site.toLowerCase().replace(/\s/g,'') + '.com';
  body.innerHTML = `
    <div style="padding:40px 24px;text-align:center;">
      <h2 style="color:var(--primary-blue);margin-bottom:8px;">${site}</h2>
      <p style="color:#666;">This is a simulated web page for <strong>${site}</strong>.</p>
      <p style="color:#999;font-size:12px;margin-top:8px;">Internet Explorer 2026 - Browsing simulation</p>
      <div style="margin-top:24px;padding:16px;background:rgba(36,94,219,0.04);border-radius:8px;max-width:500px;margin-left:auto;margin-right:auto;">
        <p style="font-size:12px;color:#555;line-height:1.6;">
          Welcome to the ${site} portal. This simulated page demonstrates the browser functionality 
          of Windows XP 2026 Remastered Edition. In a real browser, this would display the actual website content.
        </p>
      </div>
    </div>
  `;
}

function browserBack() { showNotification('Browser', 'No previous page'); }
function browserForward() { showNotification('Browser', 'No next page'); }
function browserRefresh() { showNotification('Browser', 'Page refreshed'); }
function browserHome() {
  const url = document.getElementById('browser-url');
  if (url) url.value = 'https://www.msn.com';
  const body = document.getElementById('browser-body');
  if (body) {
    body.innerHTML = `
      <div class="browser-home">
        <svg width="60" height="60" viewBox="0 0 80 80" style="margin-bottom:12px;">
          <rect x="2" y="2" width="34" height="34" rx="6" fill="#F25022"/>
          <rect x="42" y="2" width="34" height="34" rx="6" fill="#7FBA00"/>
          <rect x="2" y="42" width="34" height="34" rx="6" fill="#00A4EF"/>
          <rect x="42" y="42" width="34" height="34" rx="6" fill="#FFB900"/>
        </svg>
        <h1>Internet Explorer 2026</h1>
        <p>Your gateway to the web, reimagined.</p>
        <div class="browser-search-wrap">
          <input class="browser-search-input" placeholder="Search the web..." id="browser-search-input" onkeydown="if(event.key==='Enter')browserSearch()">
          <button class="browser-search-btn" onclick="browserSearch()">Search</button>
        </div>
        <div class="browser-shortcuts">
          <div class="browser-shortcut" onclick="browserNavigate('MSN')">
            <div class="browser-shortcut-icon" style="background:#0078d4;">M</div>
            <span>MSN</span>
          </div>
          <div class="browser-shortcut" onclick="browserNavigate('Outlook')">
            <div class="browser-shortcut-icon" style="background:#0072c6;">O</div>
            <span>Outlook</span>
          </div>
          <div class="browser-shortcut" onclick="browserNavigate('Bing')">
            <div class="browser-shortcut-icon" style="background:#008373;">B</div>
            <span>Bing</span>
          </div>
          <div class="browser-shortcut" onclick="browserNavigate('Office')">
            <div class="browser-shortcut-icon" style="background:#d83b01;">O</div>
            <span>Office</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Calculator
function openCalculator() {
  const content = `
    <div class="calc-display" id="calc-display">0</div>
    <div class="calc-buttons">
      <button class="calc-btn clear" onclick="calcAction('C')">C</button>
      <button class="calc-btn op" onclick="calcAction('±')">±</button>
      <button class="calc-btn op" onclick="calcAction('%')">%</button>
      <button class="calc-btn op" onclick="calcAction('÷')">÷</button>
      <button class="calc-btn" onclick="calcAction('7')">7</button>
      <button class="calc-btn" onclick="calcAction('8')">8</button>
      <button class="calc-btn" onclick="calcAction('9')">9</button>
      <button class="calc-btn op" onclick="calcAction('×')">×</button>
      <button class="calc-btn" onclick="calcAction('4')">4</button>
      <button class="calc-btn" onclick="calcAction('5')">5</button>
      <button class="calc-btn" onclick="calcAction('6')">6</button>
      <button class="calc-btn op" onclick="calcAction('-')">−</button>
      <button class="calc-btn" onclick="calcAction('1')">1</button>
      <button class="calc-btn" onclick="calcAction('2')">2</button>
      <button class="calc-btn" onclick="calcAction('3')">3</button>
      <button class="calc-btn op" onclick="calcAction('+')">+</button>
      <button class="calc-btn" onclick="calcAction('0')" style="grid-column:span 2;">0</button>
      <button class="calc-btn" onclick="calcAction('.')">.</button>
      <button class="calc-btn eq" onclick="calcAction('=')">=</button>
    </div>
  `;
  createWindow('calculator', 'Calculator', 280, 380, content);
}

let calcState = { display: '0', prev: null, op: null, fresh: true };

function calcAction(key) {
  const display = document.getElementById('calc-display');
  if (!display) return;

  if (key >= '0' && key <= '9') {
    if (calcState.fresh) {
      calcState.display = key;
      calcState.fresh = false;
    } else {
      calcState.display = calcState.display === '0' ? key : calcState.display + key;
    }
  } else if (key === '.') {
    if (!calcState.display.includes('.')) {
      calcState.display += '.';
      calcState.fresh = false;
    }
  } else if (key === 'C') {
    calcState = { display: '0', prev: null, op: null, fresh: true };
  } else if (key === '±') {
    calcState.display = String(-parseFloat(calcState.display));
  } else if (key === '%') {
    calcState.display = String(parseFloat(calcState.display) / 100);
  } else if (['+', '-', '×', '÷'].includes(key)) {
    if (calcState.prev !== null && !calcState.fresh) {
      calcState.display = String(calcExecute(calcState.prev, parseFloat(calcState.display), calcState.op));
    }
    calcState.prev = parseFloat(calcState.display);
    calcState.op = key;
    calcState.fresh = true;
  } else if (key === '=') {
    if (calcState.prev !== null) {
      calcState.display = String(calcExecute(calcState.prev, parseFloat(calcState.display), calcState.op));
      calcState.prev = null;
      calcState.op = null;
      calcState.fresh = true;
    }
  }
  display.textContent = calcState.display;
}

function calcExecute(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b !== 0 ? a / b : 'Error';
    default: return b;
  }
}

// Notepad
function openNotepad() {
  const content = `
    <div class="window-menubar">
      <span class="window-menu-item">File</span>
      <span class="window-menu-item">Edit</span>
      <span class="window-menu-item">Format</span>
      <span class="window-menu-item">View</span>
      <span class="window-menu-item">Help</span>
    </div>
    <textarea class="notepad-textarea" placeholder="Type here..." spellcheck="false">Welcome to Notepad - Windows XP 2026 Remastered Edition

This is a simple text editor that supports basic text editing functionality.
You can type, edit, and format your text here.

Features:
- Clean text editing interface
- Classic Windows Notepad experience
- Modern glass design integration

Enjoy using Windows XP 2026!</textarea>
  `;
  createWindow('notepad', 'Notepad', 560, 400, content, { allowMultiple: true });
}

// Paint
function openPaint() {
  const colors = ['#000000','#ffffff','#e74c3c','#e67e22','#f1c40f','#2ecc71','#3498db','#9b59b6','#1abc9c','#e91e63','#795548','#607d8b','#ff9800','#8bc34a','#00bcd4','#673ab7'];
  
  const content = `
    <div class="paint-container">
      <div class="paint-toolbar">
        <button class="paint-tool active" data-tool="brush" onclick="setPaintTool('brush',this)" title="Brush">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#333"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 00-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 000-1.41z"/></svg>
        </button>
        <button class="paint-tool" data-tool="eraser" onclick="setPaintTool('eraser',this)" title="Eraser">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#333"><path d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 01-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0zM4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53-4.95-4.95-4.95 4.95z"/></svg>
        </button>
        <button class="paint-tool" data-tool="line" onclick="setPaintTool('line',this)" title="Line">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><line x1="4" y1="20" x2="20" y2="4"/></svg>
        </button>
        <button class="paint-tool" data-tool="rect" onclick="setPaintTool('rect',this)" title="Rectangle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="1"/></svg>
        </button>
        <button class="paint-tool" data-tool="circle" onclick="setPaintTool('circle',this)" title="Circle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>
        </button>
        <button class="paint-tool" onclick="clearCanvas()" title="Clear">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#e74c3c"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
        <div class="paint-color-palette">
          ${colors.map(c => `<div class="paint-color ${c === '#000000' ? 'active' : ''}" style="background:${c}" onclick="setPaintColor('${c}',this)"></div>`).join('')}
        </div>
        <div class="paint-size-group">
          <span>Size:</span>
          <input type="range" class="paint-size-slider" min="1" max="20" value="3" oninput="state.paintSize=this.value">
        </div>
      </div>
      <div class="paint-canvas-wrap">
        <canvas class="paint-canvas" id="paint-canvas" width="640" height="400"></canvas>
      </div>
    </div>
  `;
  createWindow('paint', 'Paint', 720, 500, content, {
    onInit: () => initPaintCanvas()
  });
}

function initPaintCanvas() {
  const canvas = document.getElementById('paint-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let isDrawing = false;
  let lastX, lastY;
  let startX, startY;

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    lastX = (e.clientX - rect.left) * scaleX;
    lastY = (e.clientY - rect.top) * scaleY;
    startX = lastX;
    startY = lastY;
    
    if (state.paintTool === 'brush' || state.paintTool === 'eraser') {
      ctx.beginPath();
      ctx.arc(lastX, lastY, state.paintSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = state.paintTool === 'eraser' ? '#ffffff' : state.paintColor;
      ctx.fill();
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (state.paintTool === 'brush' || state.paintTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = state.paintTool === 'eraser' ? '#ffffff' : state.paintColor;
      ctx.lineWidth = state.paintSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    lastX = x;
    lastY = y;
  });

  canvas.addEventListener('mouseup', (e) => {
    if (!isDrawing) return;
    isDrawing = false;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const endX = (e.clientX - rect.left) * scaleX;
    const endY = (e.clientY - rect.top) * scaleY;
    
    if (state.paintTool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = state.paintColor;
      ctx.lineWidth = state.paintSize;
      ctx.lineCap = 'round';
      ctx.stroke();
    } else if (state.paintTool === 'rect') {
      ctx.strokeStyle = state.paintColor;
      ctx.lineWidth = state.paintSize;
      ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    } else if (state.paintTool === 'circle') {
      const rx = Math.abs(endX - startX) / 2;
      const ry = Math.abs(endY - startY) / 2;
      const cx = startX + (endX - startX) / 2;
      const cy = startY + (endY - startY) / 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = state.paintColor;
      ctx.lineWidth = state.paintSize;
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseleave', () => { isDrawing = false; });
}

function setPaintTool(tool, btn) {
  state.paintTool = tool;
  document.querySelectorAll('.paint-tool').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function setPaintColor(color, el) {
  state.paintColor = color;
  document.querySelectorAll('.paint-color').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
}

function clearCanvas() {
  const canvas = document.getElementById('paint-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// Media Player
function openMediaPlayer() {
  const barsHtml = Array.from({length:24}, () => 
    `<div class="vis-bar" style="height:${Math.random()*80+10}px"></div>`
  ).join('');

  const content = `
    <div class="media-player">
      <div class="media-visualization">
        <div class="media-vis-bars" id="media-vis-bars">${barsHtml}</div>
      </div>
      <div class="media-info">
        <div class="media-song-title" id="media-song-title">Windows XP Startup Sound</div>
        <div class="media-artist">Microsoft Sound Studio</div>
        <div class="media-progress-bar" onclick="seekMedia(event)">
          <div class="media-progress-fill" id="media-progress-fill"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,0.4);">
          <span id="media-time-current">1:23</span>
          <span>3:45</span>
        </div>
      </div>
      <div class="media-controls">
        <button class="media-ctrl-btn" onclick="mediaPrev()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>
        <button class="media-ctrl-btn play" id="media-play-btn" onclick="toggleMedia()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" id="media-play-icon"><polygon points="8,5 20,12 8,19"/></svg>
        </button>
        <button class="media-ctrl-btn" onclick="mediaNext()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M16 18h2V6h-2zM6 18l8.5-6L6 6z"/></svg>
        </button>
      </div>
    </div>
  `;
  createWindow('mediaplayer', 'Media Player', 380, 400, content, {
    onInit: () => { if (state.mediaPlaying) startMediaVis(); }
  });
}

function toggleMedia() {
  state.mediaPlaying = !state.mediaPlaying;
  const icon = document.getElementById('media-play-icon');
  if (icon) {
    icon.innerHTML = state.mediaPlaying
      ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
      : '<polygon points="8,5 20,12 8,19"/>';
  }
  if (state.mediaPlaying) startMediaVis();
}

let mediaVisInterval;
function startMediaVis() {
  clearInterval(mediaVisInterval);
  mediaVisInterval = setInterval(() => {
    if (!state.mediaPlaying) {
      clearInterval(mediaVisInterval);
      return;
    }
    const bars = document.querySelectorAll('#media-vis-bars .vis-bar');
    bars.forEach(bar => {
      bar.style.height = (Math.random() * 80 + 10) + 'px';
    });
    // Update progress
    const fill = document.getElementById('media-progress-fill');
    if (fill) {
      let w = parseFloat(fill.style.width) || 35;
      w += 0.2;
      if (w > 100) w = 0;
      fill.style.width = w + '%';
    }
  }, 200);
}

function mediaPrev() { showNotification('Media Player', 'Previous track'); }
function mediaNext() { showNotification('Media Player', 'Next track'); }
function seekMedia(e) {
  const fill = document.getElementById('media-progress-fill');
  if (fill) {
    const rect = e.target.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    fill.style.width = pct + '%';
  }
}

// Control Panel
function openControlPanel() {
  const items = [
    { name: 'Display', icon: 'settings' },
    { name: 'Network', icon: 'network' },
    { name: 'System', icon: 'mycomputer' },
    { name: 'Programs', icon: 'folder' },
    { name: 'Security', icon: 'settings' },
    { name: 'User Accounts', icon: 'documents' },
    { name: 'Sound', icon: 'mediaplayer' },
    { name: 'Devices', icon: 'controlpanel' },
    { name: 'Date & Time', icon: 'settings' },
    { name: 'Accessibility', icon: 'settings' },
    { name: 'Fonts', icon: 'notepad' },
    { name: 'Mouse', icon: 'settings' },
  ];
  const content = `
    <div class="window-menubar">
      <span class="window-menu-item">File</span>
      <span class="window-menu-item">View</span>
      <span class="window-menu-item">Help</span>
    </div>
    <div class="window-addressbar">
      <span style="font-size:11px;color:#666;">Address:</span>
      <input class="address-input" value="Control Panel" readonly>
    </div>
    <div class="cpanel-grid">
      ${items.map(item => `
        <div class="cpanel-item" onclick="showNotification('Control Panel','Opening ${item.name}...')">
          <div class="cpanel-item-icon">${getIconSVG(item.icon, 40)}</div>
          <div class="cpanel-item-name">${item.name}</div>
        </div>
      `).join('')}
    </div>
  `;
  createWindow('controlpanel', 'Control Panel', 600, 440, content);
}

// Settings / Themes / Wallpaper Changer
function openSettings() {
  const wallpapers = [
    { id: 'bliss', name: 'Bliss (Classic)' },
    { id: 'sunset', name: 'Sunset Vista' },
    { id: 'ocean', name: 'Ocean Blue' },
    { id: 'mountain', name: 'Mountain Peak' },
    { id: 'aurora', name: 'Northern Aurora' },
  ];

  const content = `
    <div class="settings-container">
      <div class="settings-nav">
        <div class="settings-nav-item active" onclick="settingsTab('appearance',this)">🎨 Appearance</div>
        <div class="settings-nav-item" onclick="settingsTab('wallpaper',this)">🖼 Wallpaper</div>
        <div class="settings-nav-item" onclick="settingsTab('system',this)">💻 System</div>
        <div class="settings-nav-item" onclick="settingsTab('about',this)">ℹ About</div>
      </div>
      <div class="settings-content" id="settings-panel">
        <div class="settings-section-title">Appearance</div>
        <div class="settings-group">
          <label>Window Transparency</label>
          <input type="range" min="60" max="100" value="85" style="width:200px;accent-color:var(--primary-blue);" 
            oninput="document.documentElement.style.setProperty('--win-opacity', this.value/100)">
        </div>
        <div class="settings-group">
          <label>Taskbar Style</label>
          <select class="settings-select" onchange="showNotification('Settings','Taskbar style updated')">
            <option>Glass Blue (Default)</option>
            <option>Dark Glass</option>
            <option>Classic XP</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Font Size</label>
          <select class="settings-select">
            <option>Small (11px)</option>
            <option selected>Normal (13px)</option>
            <option>Large (15px)</option>
          </select>
        </div>
      </div>
    </div>
  `;
  createWindow('settings', 'Settings', 580, 420, content);
}

function settingsTab(tab, el) {
  document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  const panel = document.getElementById('settings-panel');
  if (!panel) return;

  if (tab === 'wallpaper') {
    const wallpapers = [
      { id: 'bliss', name: 'Bliss (Classic)' },
      { id: 'sunset', name: 'Sunset Vista' },
      { id: 'ocean', name: 'Ocean Blue' },
      { id: 'mountain', name: 'Mountain Peak' },
      { id: 'aurora', name: 'Northern Aurora' },
    ];
    panel.innerHTML = `
      <div class="settings-section-title">Wallpaper</div>
      <p style="font-size:12px;color:#666;margin-bottom:12px;">Choose your desktop background</p>
      <div class="wallpaper-grid">
        ${wallpapers.map(wp => `
          <div class="wallpaper-thumb wallpaper-${wp.id} ${state.currentWallpaper === wp.id ? 'active' : ''}" 
            onclick="changeWallpaper('${wp.id}',this)" title="${wp.name}"></div>
        `).join('')}
      </div>
      <p style="font-size:11px;color:#999;margin-top:12px;">Current: ${wallpapers.find(w => w.id === state.currentWallpaper)?.name || 'Bliss'}</p>
    `;
  } else if (tab === 'system') {
    panel.innerHTML = `
      <div class="settings-section-title">NEO System • Quantum Glass</div>
      <div style="font-size:12.5px;line-height:2.2;background:rgba(248,250,255,0.6);padding:14px;border-radius:12px;border:1px solid rgba(0,0,0,0.04)">
        <div><strong>OS:</strong> Windows XP // NEO 2026 Future Edition</div>
        <div><strong>Build:</strong> 26100. Future • Frutiger Aero Revival</div>
        <div><strong>User:</strong> ${state.userName} • NEO ID: xp_${state.userName.toLowerCase()}_2026</div>
        <div><strong>Device:</strong> DESKTOP-NEO-2026 • Glass Island</div>
        <div><strong>CPU:</strong> NEO Glass Core @ 5.2GHz + NPU 120 TOPS</div>
        <div><strong>Memory:</strong> 16384 MB LPDDR6X Glass</div>
        <div><strong>GPU:</strong> Aero Glass Accelerator 12GB • DirectX 13</div>
        <div><strong>Display:</strong> ${window.innerWidth} × ${window.innerHeight} • 240Hz HDR • Luna Curved</div>
        <div><strong>Storage:</strong> 512 GB Crystal NVMe • 12GB/s</div>
      </div>
    `;
  } else if (tab === 'about') {
    panel.innerHTML = `
      <div style="text-align:center;padding:22px;">
        <div style="width:72px;height:72px;margin:0 auto 14px;border-radius:18px;background:linear-gradient(180deg, rgba(42,123,255,0.14), rgba(42,123,255,0.06));display:grid;place-items:center;border:1px solid rgba(42,123,255,0.12)">
          <svg width="48" height="48" viewBox="0 0 80 80"><rect x="4" y="4" width="30" height="30" rx="8" fill="#F25022"/><rect x="44" y="4" width="30" height="30" rx="8" fill="#7FBA00"/><rect x="4" y="44" width="30" height="30" rx="8" fill="#00A4EF"/><rect x="44" y="44" width="30" height="30" rx="8" fill="#FFB900"/></svg>
        </div>
        <h2 style="color:#10204a;letter-spacing:-0.02em">Windows XP // NEO</h2>
        <p style="color:#2a7bff;font-weight:700;letter-spacing:2px;font-size:10px;margin:6px 0">2026 FUTURE EDITION • BUILD 26100</p>
        <p style="font-size:12px;color:#5a6a86;margin-top:12px;line-height:1.6">Frutiger Aero Revival + Luna Future<br>Glass Morphism • Hologram Island • Bliss Engine</p>
        <div style="margin-top:16px;padding:12px;background:linear-gradient(180deg, rgba(42,123,255,0.06), rgba(58,240,255,0.04));border-radius:12px;border:1px solid rgba(42,123,255,0.08)">
          <p style="font-size:11px;color:#3a4a68;line-height:1.6">Fan-made NEO concept by Harshil • Code_Like_Dev<br>Not affiliated with Microsoft. Made for nostalgia & future UX exploration.</p>
        </div>
      </div>
    `;
  } else if (tab === 'appearance') {
    panel.innerHTML = `
      <div class="settings-section-title">Appearance</div>
      <div class="settings-group">
        <label>Window Transparency</label>
        <input type="range" min="60" max="100" value="85" style="width:200px;accent-color:var(--primary-blue);">
      </div>
      <div class="settings-group">
        <label>Taskbar Style</label>
        <select class="settings-select">
          <option>Glass Blue (Default)</option>
          <option>Dark Glass</option>
          <option>Classic XP</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Font Size</label>
        <select class="settings-select">
          <option>Small (11px)</option>
          <option selected>Normal (13px)</option>
          <option>Large (15px)</option>
        </select>
      </div>
    `;
  }
}

function changeWallpaper(id, el) {
  state.currentWallpaper = id;
  setWallpaper(id);
  localStorage.setItem('xp2026_wallpaper', id);
  document.querySelectorAll('.wallpaper-thumb').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  showNotification('Wallpaper', 'Wallpaper changed successfully!');
}

function setWallpaper(id) {
  const wp = document.getElementById('wallpaper');
  wp.className = 'wallpaper wallpaper-' + id;
}

// Documents
function openDocuments() {
  const docs = [
    { name: 'My Resume.docx', size: '24 KB', date: '01/10/2026' },
    { name: 'Project Plan.xlsx', size: '156 KB', date: '01/08/2026' },
    { name: 'Meeting Notes.txt', size: '4 KB', date: '01/12/2026' },
    { name: 'Vacation Photos', size: 'Folder', date: '12/25/2025' },
    { name: 'Budget 2026.xlsx', size: '89 KB', date: '01/05/2026' },
    { name: 'Presentation.pptx', size: '2.4 MB', date: '01/11/2026' },
    { name: 'Todo List.txt', size: '1 KB', date: '01/13/2026' },
  ];
  const content = `
    <div class="window-menubar">
      <span class="window-menu-item">File</span>
      <span class="window-menu-item">Edit</span>
      <span class="window-menu-item">View</span>
      <span class="window-menu-item">Help</span>
    </div>
    <div class="documents-content">
      ${docs.map(d => `
        <div class="doc-list-item" ondblclick="${d.name.endsWith('.txt') ? "openNotepad()" : "showNotification('Documents','Opening " + d.name + "...')"}">
          <div class="doc-list-icon">${getIconSVG(d.size === 'Folder' ? 'folder' : 'documents', 32)}</div>
          <div class="doc-list-info">
            <div class="doc-list-name">${d.name}</div>
            <div class="doc-list-meta">${d.size} • ${d.date}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="window-statusbar">${docs.length} items</div>
  `;
  createWindow('documents', 'My Documents', 500, 420, content);
}

// Network
function openNetwork() {
  const content = `
    <div class="network-content">
      <div class="network-status">
        <div class="network-connected-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M1 9l2 2a12.7 12.7 0 0118 0l2-2A15.5 15.5 0 001 9zm4 4l2 2a8.5 8.5 0 0110 0l2-2a11.3 11.3 0 00-14 0zm4 4l3 3 3-3a5.2 5.2 0 00-6 0z"/></svg>
        </div>
        <div class="network-info">
          <h3>Connected</h3>
          <p>XP-Network-2026 • Signal: Excellent</p>
        </div>
      </div>
      <div class="settings-section-title">Network Details</div>
      <div class="network-details">
        <div class="network-detail-row">
          <span class="network-detail-label">Connection Type</span>
          <span class="network-detail-value">Wi-Fi</span>
        </div>
        <div class="network-detail-row">
          <span class="network-detail-label">SSID</span>
          <span class="network-detail-value">XP-Network-2026</span>
        </div>
        <div class="network-detail-row">
          <span class="network-detail-label">IP Address</span>
          <span class="network-detail-value">192.168.1.${Math.floor(Math.random()*200+10)}</span>
        </div>
        <div class="network-detail-row">
          <span class="network-detail-label">Subnet Mask</span>
          <span class="network-detail-value">255.255.255.0</span>
        </div>
        <div class="network-detail-row">
          <span class="network-detail-label">Gateway</span>
          <span class="network-detail-value">192.168.1.1</span>
        </div>
        <div class="network-detail-row">
          <span class="network-detail-label">DNS Server</span>
          <span class="network-detail-value">8.8.8.8</span>
        </div>
        <div class="network-detail-row">
          <span class="network-detail-label">Speed</span>
          <span class="network-detail-value">866 Mbps</span>
        </div>
        <div class="network-detail-row">
          <span class="network-detail-label">Status</span>
          <span class="network-detail-value" style="color:var(--highlight-green);">●  Active</span>
        </div>
      </div>
    </div>
  `;
  createWindow('network', 'Network Connections', 450, 440, content);
}

// Recycle Bin
function openRecycleBin() {
  const content = `
    <div class="window-menubar">
      <span class="window-menu-item">File</span>
      <span class="window-menu-item">Edit</span>
      <span class="window-menu-item">View</span>
      <span class="window-menu-item">Help</span>
    </div>
    <div class="window-toolbar">
      <button class="toolbar-btn" onclick="showNotification('Recycle Bin','Recycle Bin emptied.')">Empty Recycle Bin</button>
      <button class="toolbar-btn">Restore All Items</button>
    </div>
    <div class="explorer-main" style="min-height:200px;">
      <div class="explorer-item">
        <div class="explorer-item-icon">${getIconSVG('documents', 36)}</div>
        <div class="explorer-item-name">old_file.txt</div>
      </div>
      <div class="explorer-item">
        <div class="explorer-item-icon">${getIconSVG('documents', 36)}</div>
        <div class="explorer-item-name">draft.docx</div>
      </div>
      <div class="explorer-item">
        <div class="explorer-item-icon">${getIconSVG('folder', 36)}</div>
        <div class="explorer-item-name">Temp Files</div>
      </div>
    </div>
    <div class="window-statusbar">3 items</div>
  `;
  createWindow('recyclebin', 'Recycle Bin', 500, 380, content);
}

// ===== WALLPAPER =====
// Wallpaper is handled via CSS classes

// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
  startBoot();
});
