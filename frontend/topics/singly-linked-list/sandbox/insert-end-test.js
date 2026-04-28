'use strict';

// ─── DATA ────────────────────────────────────────────────────────────────────
const NODES = [
  { data: 1, addr: '0x101', next: '0x102' },
  { data: 2, addr: '0x102', next: '0x103' },
  { data: 3, addr: '0x103', next: '0x104' },
  { data: 4, addr: '0x104', next: 'NULL'  },
];
const NEW_NODE = { data: 0, addr: '0x100', next: 'NULL' };
const TOTAL_STEPS = 4;

const STEP_DESCS = [
  'Initial linked list with 4 nodes. HEAD points to node 1 (0x101). TAIL points to node 4 (0x104).',
  'A new node is created with value 0 at address 0x100. Its next pointer is set to NULL.',
  'tail→next = newNode — The next field of node 4 (current tail) is updated to point to the new node at 0x100.',
  'tail = newNode — The TAIL pointer moves from node 4 to the new node (0x100).',
  'List rearrangement complete! The new node joins the main row: 1 → 2 → 3 → 4 → 0 → NULL.',
];

// ─── STATE ───────────────────────────────────────────────────────────────────
let currentStep = 0;
let playing = false;
let playTimer = null;

// ─── ELEMENTS ────────────────────────────────────────────────────────────────
const listRow     = document.getElementById('listRow');
const newNodeArea = document.getElementById('newNodeArea');
const newNodeNext = document.getElementById('newNodeNext');
const descText    = document.getElementById('descText');
const stepBadge   = document.getElementById('stepBadge');
const btnNext     = document.getElementById('btnNext');
const btnPrev     = document.getElementById('btnPrev');
const btnPlay     = document.getElementById('btnPlay');
const btnReset    = document.getElementById('btnReset');
const dots        = document.querySelectorAll('.dot');
const animPath    = document.getElementById('animPath');
const arrowSvg    = document.getElementById('arrowSvg');
const stage       = document.getElementById('stage');

const CODE_IDS = ['code0','code1','code2','code3','code4'];

// ─── BUILD INITIAL LIST ───────────────────────────────────────────────────────
function buildList(includeFinal = false) {
  listRow.innerHTML = '';

  const allNodes = includeFinal
    ? [...NODES, NEW_NODE]
    : NODES;

  allNodes.forEach((n, i) => {
    const isHead = i === 0;
    const isTail = includeFinal ? i === allNodes.length - 1 : i === NODES.length - 1;

    const wrap = document.createElement('div');
    wrap.className = 'node-wrap';
    wrap.id = `nodeWrap${i}`;

    // HEAD label
    if (isHead) {
      wrap.innerHTML += `
        <div class="pointer-label">HEAD</div>
        <div class="pointer-addr">${n.addr}</div>
        <div class="pointer-arrow">↓</div>`;
    }

    // TAIL label (only on current tail; updated later)
    if (isTail) {
      wrap.innerHTML += `
        <div class="pointer-label tail-lbl" id="tailLabel">TAIL</div>
        <div class="pointer-addr" id="tailAddr">${n.addr}</div>
        <div class="pointer-arrow tail-arr" id="tailArrow">↓</div>`;
    } else if (!isHead) {
      // Spacer so nodes align
      wrap.innerHTML += `<div style="height:${isHead ? 0 : 54}px"></div>`;
    }

    // Node box
    const nextDisplay = includeFinal
      ? (i < allNodes.length - 1 ? allNodes[i+1].addr : 'NULL')
      : (i < NODES.length - 1 ? NODES[i+1].addr : 'NULL');

    const nodeId = `node${i}`;
    wrap.innerHTML += `
      <div class="node-box ${isTail ? 'tail-highlighted' : ''}" id="${nodeId}">
        <div class="node-data">${n.data}</div>
        <div class="node-next" id="nodeNext${i}">${nextDisplay}</div>
      </div>
      <div class="node-addr-below">${n.addr}</div>`;

    listRow.appendChild(wrap);

    // Connector arrow (between nodes)
    if (i < allNodes.length - 1) {
      const arr = document.createElement('div');
      arr.className = 'conn-arrow';
      arr.innerHTML = '→';
      listRow.appendChild(arr);
    }
  });

  // NULL at end
  const nullBox = document.createElement('div');
  nullBox.className = 'conn-arrow';
  nullBox.innerHTML = '→';
  listRow.appendChild(nullBox);

  const nb = document.createElement('div');
  nb.className = 'null-box';
  nb.id = 'nullBox';
  nb.textContent = 'NULL';
  listRow.appendChild(nb);
}

// ─── RESET ────────────────────────────────────────────────────────────────────
function reset() {
  currentStep = 0;
  stopPlay();
  clearArrow();
  newNodeArea.classList.remove('visible');
  newNodeNext.textContent = 'NULL';
  document.getElementById('newNodeAddr').textContent = NEW_NODE.addr;
  buildList(false);
  updateUI();
}

// ─── STEP LOGIC ──────────────────────────────────────────────────────────────
function goToStep(s) {
  if (s < 0 || s > TOTAL_STEPS) return;
  currentStep = s;
  applyStep();
  updateUI();
}

function applyStep() {
  clearArrow();

  // Highlight code
  CODE_IDS.forEach((id, i) => {
    document.getElementById(id).classList.toggle('active', i === currentStep);
  });

  switch (currentStep) {
    case 0: stepInit();    break;
    case 1: stepCreate();  break;
    case 2: stepLink();    break;
    case 3: stepTail();    break;
    case 4: stepFinal();   break;
  }

  descText.textContent = STEP_DESCS[currentStep];
}

function stepInit() {
  buildList(false);
  newNodeArea.classList.remove('visible');
}

function stepCreate() {
  buildList(false);
  newNodeArea.classList.remove('visible');
  requestAnimationFrame(() => {
    newNodeArea.classList.add('visible');
  });
}

function stepLink() {
  buildList(false);
  newNodeArea.classList.add('visible');

  // Update tail node's next field
  const tailNextEl = document.getElementById(`nodeNext${NODES.length - 1}`);
  if (tailNextEl) {
    tailNextEl.textContent = NEW_NODE.addr;
    tailNextEl.style.color = '#4361ee';
    tailNextEl.style.fontWeight = '700';
  }

  // Highlight tail node
  const tailNode = document.getElementById(`node${NODES.length - 1}`);
  if (tailNode) tailNode.classList.add('highlighted');

  // Draw the curved arrow
  requestAnimationFrame(() => drawCurvedArrow());
}

function stepTail() {
  buildList(false);
  newNodeArea.classList.add('visible');

  // Keep next pointer updated
  const tailNextEl = document.getElementById(`nodeNext${NODES.length - 1}`);
  if (tailNextEl) {
    tailNextEl.textContent = NEW_NODE.addr;
    tailNextEl.style.color = '#4361ee';
    tailNextEl.style.fontWeight = '700';
  }

  // Move TAIL pointer to new node visually
  const oldTailLabel = document.getElementById('tailLabel');
  const oldTailAddr  = document.getElementById('tailAddr');
  const oldTailArrow = document.getElementById('tailArrow');
  if (oldTailLabel) oldTailLabel.style.display = 'none';
  if (oldTailAddr)  oldTailAddr.style.display  = 'none';
  if (oldTailArrow) oldTailArrow.style.display = 'none';

  // Remove tail highlight from node 4
  const tailNode = document.getElementById(`node${NODES.length - 1}`);
  if (tailNode) tailNode.classList.remove('tail-highlighted');

  // Add TAIL pointer above new node
  const nnArea = newNodeArea;
  nnArea.classList.add('visible');

  let tailEl = document.getElementById('newTailLabel');
  if (!tailEl) {
    tailEl = document.createElement('div');
    tailEl.id = 'newTailLabel';
    tailEl.innerHTML = `
      <div class="pointer-label tail-lbl">TAIL</div>
      <div class="pointer-addr">${NEW_NODE.addr}</div>
      <div class="pointer-arrow tail-arr">↓</div>`;
    tailEl.style.display = 'flex';
    tailEl.style.flexDirection = 'column';
    tailEl.style.alignItems = 'center';
    tailEl.style.marginBottom = '4px';
    tailEl.style.opacity = '0';
    tailEl.style.transition = 'opacity 0.5s ease';
    nnArea.insertBefore(tailEl, nnArea.firstChild);
  }
  requestAnimationFrame(() => { tailEl.style.opacity = '1'; });

  // Highlight new node
  const newNodeBox = document.querySelector('.new-node');
  if (newNodeBox) {
    newNodeBox.style.borderColor = '#20bf6b';
    newNodeBox.style.boxShadow = '0 0 0 3px rgba(32,191,107,0.18)';
  }
}

function stepFinal() {
  // Rebuild with final node included inline
  buildList(true);
  newNodeArea.classList.remove('visible');

  // Flash the last node
  const lastNode = document.getElementById(`node${NODES.length}`);
  if (lastNode) {
    lastNode.classList.add('highlighted');
    setTimeout(() => lastNode.classList.remove('highlighted'), 1200);
  }
}

// ─── CURVED ARROW ─────────────────────────────────────────────────────────────
// ─── STRAIGHT RECTANGULAR PATH ────────────────────────────────────────────────
//
//  Shape (5 segments, 4 sharp 90° corners):
//
//  node4 ──────────┐        (1) right from node4
//                  │        (2) down to midpoint between rows
//       ┌──────────┘        (3) left, overshooting node0 by ~30px
//       │                   (4) down to node0 vertical center
//       └──→ [node 0]       (5) right into node0, arrowhead →
//
function drawCurvedArrow() {
  const svgRect = arrowSvg.getBoundingClientRect();

  const tailNodeEl = document.getElementById(`node${NODES.length - 1}`);
  if (!tailNodeEl) return;
  const tailRect = tailNodeEl.getBoundingClientRect();

  const newNodeBox = document.querySelector('#newNodeArea .node-box');
  if (!newNodeBox) return;
  const nnRect = newNodeBox.getBoundingClientRect();

  const ox = svgRect.left;
  const oy = svgRect.top;

  // START: right edge of node4, vertically centered
  const sx = tailRect.right - ox + 4;
  const sy = tailRect.top + tailRect.height / 2 - oy;

  // END: left edge of node0, vertically centered → arrowhead points right
  const ex = nnRect.left - ox - 2;
  const ey = nnRect.top + nnRect.height / 2 - oy;

  // Corner 1 x: how far right before turning down
  const rightX = sx + 40;

  // Corner 1→2 y / Corner 2→3 y: midpoint between list row bottom and new node top
  const listBottom = tailRect.bottom - oy;
  const newNodeTop = nnRect.top - oy;
  const midY = listBottom + (newNodeTop - listBottom) / 2;

  // Corner 3 x: overshoot node0 left edge by 30px
  const overshootX = nnRect.left - ox - 30;

  // Corner 3→4 y / Corner 4→5 y: same as node0 center
  // (already = ey)

  // 5-segment path: right → down → left (overshoot) → down → right
  const d = [
    `M ${sx} ${sy}`,          // start at node4 right-center
    `L ${rightX} ${sy}`,      // (1) go right
    `L ${rightX} ${midY}`,    // (2) go down to midpoint
    `L ${overshootX} ${midY}`,// (3) go left, past node0 by 30px
    `L ${overshootX} ${ey}`,  // (4) go down to node0 center level
    `L ${ex} ${ey}`,          // (5) go right → arrowhead at node0 left-center
  ].join(' ');

  animPath.setAttribute('d', d);

  const length = animPath.getTotalLength();
  animPath.style.transition = 'none';
  animPath.style.strokeDasharray  = `${length}`;
  animPath.style.strokeDashoffset = `${length}`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animPath.style.transition = 'stroke-dashoffset 1.1s ease-in-out';
      animPath.style.strokeDashoffset = '0';
    });
  });
}

function clearArrow() {
  animPath.setAttribute('d', '');
  animPath.style.strokeDasharray = '0';
  animPath.style.strokeDashoffset = '0';
  animPath.style.transition = 'none';
  // remove injected tail label
  const el = document.getElementById('newTailLabel');
  if (el) el.remove();
  // restore new node style
  const newNodeBox = document.querySelector('.new-node');
  if (newNodeBox) {
    newNodeBox.style.borderColor = '';
    newNodeBox.style.boxShadow = '';
  }
}

// ─── UI UPDATE ────────────────────────────────────────────────────────────────
function updateUI() {
  stepBadge.textContent = `Step ${currentStep} / ${TOTAL_STEPS}`;

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === currentStep);
  });

  btnPrev.disabled = currentStep === 0;
  btnNext.disabled = currentStep === TOTAL_STEPS;
  btnPlay.textContent = playing ? '⏸ Pause' : '▶ Play';
}

// ─── AUTO PLAY ────────────────────────────────────────────────────────────────
function startPlay() {
  playing = true;
  updateUI();
  function tick() {
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1);
      playTimer = setTimeout(tick, 2000);
    } else {
      stopPlay();
    }
  }
  playTimer = setTimeout(tick, 600);
}

function stopPlay() {
  playing = false;
  clearTimeout(playTimer);
  playTimer = null;
  updateUI();
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
btnNext.addEventListener('click', () => {
  stopPlay();
  if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
});

btnPrev.addEventListener('click', () => {
  stopPlay();
  if (currentStep > 0) goToStep(currentStep - 1);
});

btnPlay.addEventListener('click', () => {
  if (playing) { stopPlay(); }
  else {
    if (currentStep === TOTAL_STEPS) goToStep(0);
    startPlay();
  }
});

btnReset.addEventListener('click', reset);

dots.forEach(d => {
  d.addEventListener('click', () => {
    stopPlay();
    goToStep(parseInt(d.dataset.i));
  });
});

// ─── INIT ────────────────────────────────────────────────────────────────────
reset();