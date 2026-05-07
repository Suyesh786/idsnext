/* ════════════════════════════════════════════════
   Binary Tree Visualize Code — IDS Studio Next
   Step-by-step call stack + code line visualizer
   ════════════════════════════════════════════════ */

/* ── Code lines with syntax highlighting ── */
const CODE_LINES = [
  { n:1,  html: '<span class="c-kw">#include</span><span class="c-str">&lt;stdio.h&gt;</span>' },
  { n:2,  html: '<span class="c-kw">#include</span><span class="c-str">&lt;stdlib.h&gt;</span>' },
  { n:3,  html: '<span class="c-kw">struct</span> <span class="c-type">node</span>{' },
  { n:4,  html: '  <span class="c-kw">int</span> data;' },
  { n:5,  html: '  <span class="c-kw">struct</span> <span class="c-type">node</span>* left, *right;' },
  { n:6,  html: '};' },
  { n:7,  html: '<span class="c-kw">struct</span> <span class="c-type">node</span>* <span class="c-fn">create</span>(){' },
  { n:8,  html: '  <span class="c-kw">int</span> x;' },
  { n:9,  html: '  <span class="c-fn">scanf</span>(<span class="c-str">"%d"</span>, &amp;x);' },
  { n:10, html: '  <span class="c-kw">if</span>(x == <span class="c-num">-1</span>){' },
  { n:11, html: '    <span class="c-kw">return</span> <span class="c-num">NULL</span>;' },
  { n:12, html: '  }' },
  { n:13, html: '  <span class="c-kw">struct</span> <span class="c-type">node</span>* newnode =' },
  { n:14, html: '      <span class="c-fn">malloc</span>(<span class="c-kw">sizeof</span>(<span class="c-kw">struct</span> <span class="c-type">node</span>));' },
  { n:15, html: '  newnode-&gt;data = x;' },
  { n:16, html: '  newnode-&gt;left = <span class="c-fn">create</span>();' },
  { n:17, html: '  newnode-&gt;right = <span class="c-fn">create</span>();' },
  { n:18, html: '  <span class="c-kw">return</span> newnode;' },
  { n:19, html: '}' },
  { n:20, html: '<span class="c-kw">int</span> <span class="c-fn">main</span>(){' },
  { n:21, html: '  <span class="c-kw">struct</span> <span class="c-type">node</span>* root = <span class="c-fn">create</span>();' },
  { n:22, html: '}' },
];

/* ── Box definitions ── */
const BOX_DEFS = {
  main: {
    id: 'main', label: 'int main', isMain: true, badge: '',
    steps: [{ id:'m1', text:'struct node* root = create()' }]
  },
  c1: {
    id: 'c1', label: 'create()', badge: 'x = 5',
    steps: [
      { id:'c1s1', text:'int x' },
      { id:'c1s2', text:'x = 5' },
      { id:'c1s3', text:'x == -1 ? NO' },
      { id:'c1s4', text:'malloc → newnode (0x500)' },
      { id:'c1s5', text:'newnode->data = 5' },
      { id:'c1s6', text:'newnode->left = create()' },
      { id:'c1s7', text:'newnode->right = create()' },
      { id:'c1s8', text:'return newnode (0x500)' },
    ]
  },
  c2: {
    id: 'c2', label: 'create()', badge: 'x = 2',
    steps: [
      { id:'c2s1', text:'int x' },
      { id:'c2s2', text:'x = 2' },
      { id:'c2s3', text:'x == -1 ? NO' },
      { id:'c2s4', text:'malloc → newnode (0x300)' },
      { id:'c2s5', text:'newnode->data = 2' },
      { id:'c2s6', text:'newnode->left = create()' },
      { id:'c2s7', text:'newnode->right = create()' },
      { id:'c2s8', text:'return newnode (0x300)' },
    ]
  },
  c3: {
    id: 'c3', label: 'create()', badge: 'x = −1', isNull: true,
    steps: [
      { id:'c3s1', text:'int x' },
      { id:'c3s2', text:'x = −1' },
      { id:'c3s3', text:'x == -1 ? YES' },
      { id:'c3s4', text:'return NULL' },
    ]
  },
  c4: {
    id: 'c4', label: 'create()', badge: 'x = −1', isNull: true,
    steps: [
      { id:'c4s1', text:'int x' },
      { id:'c4s2', text:'x = −1' },
      { id:'c4s3', text:'x == -1 ? YES' },
      { id:'c4s4', text:'return NULL' },
    ]
  },
  c5: {
    id: 'c5', label: 'create()', badge: 'x = −1', isNull: true,
    steps: [
      { id:'c5s1', text:'int x' },
      { id:'c5s2', text:'x = −1' },
      { id:'c5s3', text:'x == -1 ? YES' },
      { id:'c5s4', text:'return NULL' },
    ]
  },
};

/* ── Full step sequence ──
   linkArrow: persistent blue dashed line from parent call site → child fn header
              stays visible until child box disappears
   arrow:     the transient call (blue animated) or return (green) arrow for this specific step
*/
const STEPS = [

  /* 1 */ {
    codeLines: [21],
    boxes: ['main'],
    activeBox: 'main', activeStep: 0,
    dimmed: [], hidden: ['c1','c2','c3','c4','c5'],
    arrow: null, linkArrow: null,
    panTo: 'main',
    expl: 'Program starts. main() is called. It will call create() to build the root of the binary tree.'
  },

  /* 2 */ {
    codeLines: [21],
    boxes: ['main','c1'],
    activeBox: 'c1', activeStep: 0,
    dimmed: ['main'], hidden: ['c2','c3','c4','c5'],
    arrow: { type:'call', fromBox:'main', fromStep:0, toBox:'c1', toStep:0 },
    linkArrow: { fromBox:'main', fromStep:0, toBox:'c1' },
    panTo: 'c1',
    expl: 'main() calls create() for the root node. User enters: 5. create() begins execution.'
  },

  /* 3 */ {
    codeLines: [8],
    boxes: ['main','c1'],
    activeBox: 'c1', activeStep: 0,
    dimmed: ['main'], hidden: ['c2','c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'main', fromStep:0, toBox:'c1' },
    panTo: 'c1',
    expl: 'Declare integer variable x to hold the input value.'
  },

  /* 4 */ {
    codeLines: [9],
    boxes: ['main','c1'],
    activeBox: 'c1', activeStep: 1,
    dimmed: ['main'], hidden: ['c2','c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'main', fromStep:0, toBox:'c1' },
    panTo: 'c1',
    expl: 'scanf reads x = 5. Since x ≠ -1, we will proceed to create a node.'
  },

  /* 5 */ {
    codeLines: [10],
    boxes: ['main','c1'],
    activeBox: 'c1', activeStep: 2,
    dimmed: ['main'], hidden: ['c2','c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'main', fromStep:0, toBox:'c1' },
    panTo: 'c1',
    expl: 'Condition x == -1 is FALSE. We do not return NULL. Continue building the node.'
  },

  /* 6 */ {
    codeLines: [13,14],
    boxes: ['main','c1'],
    activeBox: 'c1', activeStep: 3,
    dimmed: ['main'], hidden: ['c2','c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'main', fromStep:0, toBox:'c1' },
    panTo: 'c1',
    expl: 'malloc() allocates memory for a new node. newnode is created at address 0x500.'
  },

  /* 7 */ {
    codeLines: [15],
    boxes: ['main','c1'],
    activeBox: 'c1', activeStep: 4,
    dimmed: ['main'], hidden: ['c2','c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'main', fromStep:0, toBox:'c1' },
    panTo: 'c1',
    expl: 'Store the value 5 into newnode->data. Node 5 now has its data set.'
  },

  /* 8 */ {
    codeLines: [16],
    boxes: ['main','c1','c2'],
    activeBox: 'c2', activeStep: 0,
    dimmed: ['main','c1'], hidden: ['c3','c4','c5'],
    arrow: { type:'call', fromBox:'c1', fromStep:5, toBox:'c2', toStep:0 },
    linkArrow: { fromBox:'c1', fromStep:5, toBox:'c2' },
    panTo: 'c2',
    expl: 'create() called recursively for the LEFT child of node 5. User enters: 2.'
  },

  /* 9 */ {
    codeLines: [8],
    boxes: ['main','c1','c2'],
    activeBox: 'c2', activeStep: 0,
    dimmed: ['main','c1'], hidden: ['c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'c1', fromStep:5, toBox:'c2' },
    panTo: 'c2',
    expl: 'New create() call starts for left child of node 5. Declare int x.'
  },

  /* 10 */ {
    codeLines: [9],
    boxes: ['main','c1','c2'],
    activeBox: 'c2', activeStep: 1,
    dimmed: ['main','c1'], hidden: ['c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'c1', fromStep:5, toBox:'c2' },
    panTo: 'c2',
    expl: 'scanf reads x = 2. Not -1, so proceed to create a node.'
  },

  /* 11 */ {
    codeLines: [10],
    boxes: ['main','c1','c2'],
    activeBox: 'c2', activeStep: 2,
    dimmed: ['main','c1'], hidden: ['c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'c1', fromStep:5, toBox:'c2' },
    panTo: 'c2',
    expl: 'Condition x == -1 is FALSE. Continue building node 2.'
  },

  /* 12 */ {
    codeLines: [13,14],
    boxes: ['main','c1','c2'],
    activeBox: 'c2', activeStep: 3,
    dimmed: ['main','c1'], hidden: ['c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'c1', fromStep:5, toBox:'c2' },
    panTo: 'c2',
    expl: 'malloc() allocates memory. newnode created at address 0x300.'
  },

  /* 13 */ {
    codeLines: [15],
    boxes: ['main','c1','c2'],
    activeBox: 'c2', activeStep: 4,
    dimmed: ['main','c1'], hidden: ['c3','c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'c1', fromStep:5, toBox:'c2' },
    panTo: 'c2',
    expl: 'Store value 2 into newnode->data. Node 2 has its data set.'
  },

  /* 14 */ {
    codeLines: [16],
    boxes: ['main','c1','c2','c3'],
    activeBox: 'c3', activeStep: 0,
    dimmed: ['main','c1','c2'], hidden: ['c4','c5'],
    arrow: { type:'call', fromBox:'c2', fromStep:5, toBox:'c3', toStep:0 },
    linkArrow: { fromBox:'c2', fromStep:5, toBox:'c3' },
    panTo: 'c3',
    expl: 'create() called recursively for LEFT child of node 2. User enters: -1.'
  },

  /* 15 */ {
    codeLines: [8],
    boxes: ['main','c1','c2','c3'],
    activeBox: 'c3', activeStep: 0,
    dimmed: ['main','c1','c2'], hidden: ['c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'c2', fromStep:5, toBox:'c3' },
    panTo: 'c3',
    expl: 'New create() call. Declare int x.'
  },

  /* 16 */ {
    codeLines: [9],
    boxes: ['main','c1','c2','c3'],
    activeBox: 'c3', activeStep: 1,
    dimmed: ['main','c1','c2'], hidden: ['c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'c2', fromStep:5, toBox:'c3' },
    panTo: 'c3',
    expl: 'scanf reads x = -1. This is the termination signal!'
  },

  /* 17 */ {
    codeLines: [10],
    boxes: ['main','c1','c2','c3'],
    activeBox: 'c3', activeStep: 2,
    dimmed: ['main','c1','c2'], hidden: ['c4','c5'],
    arrow: null,
    linkArrow: { fromBox:'c2', fromStep:5, toBox:'c3' },
    panTo: 'c3',
    expl: 'Condition x == -1 is TRUE! We will return NULL — no node created.'
  },

  /* 18 */ {
    codeLines: [11],
    boxes: ['main','c1','c2','c3'],
    activeBox: 'c3', activeStep: 3,
    dimmed: ['main','c1','c2'], hidden: ['c4','c5'],
    arrow: { type:'ret', fromBox:'c3', fromStep:3, toBox:'c2', toStep:5 },
    linkArrow: { fromBox:'c2', fromStep:5, toBox:'c3' },
    panTo: 'c3',
    expl: 'Returning NULL. Left child of node 2 is NULL. create() call ends.'
  },

  /* 19 */ {
    codeLines: [17],
    boxes: ['main','c1','c2','c4'],
    activeBox: 'c4', activeStep: 0,
    dimmed: ['main','c1','c2'], hidden: ['c3','c5'],
    arrow: { type:'call', fromBox:'c2', fromStep:6, toBox:'c4', toStep:0 },
    linkArrow: { fromBox:'c2', fromStep:6, toBox:'c4' },
    panTo: 'c4',
    expl: 'c3 fades out. Now create() called for RIGHT child of node 2. User enters: -1.'
  },

  /* 20 */ {
    codeLines: [8],
    boxes: ['main','c1','c2','c4'],
    activeBox: 'c4', activeStep: 0,
    dimmed: ['main','c1','c2'], hidden: ['c3','c5'],
    arrow: null,
    linkArrow: { fromBox:'c2', fromStep:6, toBox:'c4' },
    panTo: 'c4',
    expl: 'Declare int x in this new create() call.'
  },

  /* 21 */ {
    codeLines: [9],
    boxes: ['main','c1','c2','c4'],
    activeBox: 'c4', activeStep: 1,
    dimmed: ['main','c1','c2'], hidden: ['c3','c5'],
    arrow: null,
    linkArrow: { fromBox:'c2', fromStep:6, toBox:'c4' },
    panTo: 'c4',
    expl: 'x = -1 again. This call will also terminate.'
  },

  /* 22 */ {
    codeLines: [10],
    boxes: ['main','c1','c2','c4'],
    activeBox: 'c4', activeStep: 2,
    dimmed: ['main','c1','c2'], hidden: ['c3','c5'],
    arrow: null,
    linkArrow: { fromBox:'c2', fromStep:6, toBox:'c4' },
    panTo: 'c4',
    expl: 'Condition TRUE. Will return NULL.'
  },

  /* 23 */ {
    codeLines: [11],
    boxes: ['main','c1','c2','c4'],
    activeBox: 'c4', activeStep: 3,
    dimmed: ['main','c1','c2'], hidden: ['c3','c5'],
    arrow: { type:'ret', fromBox:'c4', fromStep:3, toBox:'c2', toStep:6 },
    linkArrow: { fromBox:'c2', fromStep:6, toBox:'c4' },
    panTo: 'c4',
    expl: 'Returning NULL. Right child of node 2 is NULL. Both children of node 2 are set.'
  },

  /* 24 */ {
    codeLines: [18],
    boxes: ['main','c1','c2'],
    activeBox: 'c2', activeStep: 7,
    dimmed: ['main','c1'], hidden: ['c3','c4','c5'],
    arrow: { type:'ret', fromBox:'c2', fromStep:7, toBox:'c1', toStep:5 },
    linkArrow: { fromBox:'c1', fromStep:5, toBox:'c2' },
    panTo: 'c2',
    expl: 'Both children of node 2 are done. Returning newnode (0x300) back to create#1.'
  },

  /* 25 */ {
    codeLines: [17],
    boxes: ['main','c1','c5'],
    activeBox: 'c5', activeStep: 0,
    dimmed: ['main','c1'], hidden: ['c2','c3','c4'],
    arrow: { type:'call', fromBox:'c1', fromStep:6, toBox:'c5', toStep:0 },
    linkArrow: { fromBox:'c1', fromStep:6, toBox:'c5' },
    panTo: 'c5',
    expl: 'create#2 done and fades. Now create() called for RIGHT child of node 5. User enters: -1.'
  },

  /* 26 */ {
    codeLines: [8],
    boxes: ['main','c1','c5'],
    activeBox: 'c5', activeStep: 0,
    dimmed: ['main','c1'], hidden: ['c2','c3','c4'],
    arrow: null,
    linkArrow: { fromBox:'c1', fromStep:6, toBox:'c5' },
    panTo: 'c5',
    expl: 'Declare int x.'
  },

  /* 27 */ {
    codeLines: [9],
    boxes: ['main','c1','c5'],
    activeBox: 'c5', activeStep: 1,
    dimmed: ['main','c1'], hidden: ['c2','c3','c4'],
    arrow: null,
    linkArrow: { fromBox:'c1', fromStep:6, toBox:'c5' },
    panTo: 'c5',
    expl: 'x = -1. Right child of root will also be NULL.'
  },

  /* 28 */ {
    codeLines: [10],
    boxes: ['main','c1','c5'],
    activeBox: 'c5', activeStep: 2,
    dimmed: ['main','c1'], hidden: ['c2','c3','c4'],
    arrow: null,
    linkArrow: { fromBox:'c1', fromStep:6, toBox:'c5' },
    panTo: 'c5',
    expl: 'Condition TRUE. Will return NULL.'
  },

  /* 29 */ {
    codeLines: [11],
    boxes: ['main','c1','c5'],
    activeBox: 'c5', activeStep: 3,
    dimmed: ['main','c1'], hidden: ['c2','c3','c4'],
    arrow: { type:'ret', fromBox:'c5', fromStep:3, toBox:'c1', toStep:6 },
    linkArrow: { fromBox:'c1', fromStep:6, toBox:'c5' },
    panTo: 'c5',
    expl: 'Returning NULL. Right child of node 5 is NULL. Both children of node 5 are set.'
  },

  /* 30 */ {
    codeLines: [18],
    boxes: ['main','c1'],
    activeBox: 'c1', activeStep: 7,
    dimmed: ['main'], hidden: ['c2','c3','c4','c5'],
    arrow: { type:'ret', fromBox:'c1', fromStep:7, toBox:'main', toStep:0 },
    linkArrow: { fromBox:'main', fromStep:0, toBox:'c1' },
    panTo: 'c1',
    expl: 'All children set. Returning root node (0x500) back to main().'
  },

  /* 31 */ {
    codeLines: [21],
    boxes: ['main'],
    activeBox: 'main', activeStep: 0,
    dimmed: [], hidden: ['c1','c2','c3','c4','c5'],
    arrow: null, linkArrow: null,
    panTo: 'main',
    expl: 'root now points to node 5 (address 0x500). Binary tree created successfully!'
  },

  /* 32 */ {
    codeLines: [],
    boxes: [],
    activeBox: null, activeStep: -1,
    dimmed: [], hidden: ['main','c1','c2','c3','c4','c5'],
    arrow: null, linkArrow: null,
    panTo: null,
    done: true,
    expl: 'Tree creation complete! root → node(5) | node(5).left → node(2) | node(2).left → NULL | node(2).right → NULL | node(5).right → NULL'
  },
];

const TOTAL_STEPS = STEPS.length; // 32

/* ── Layout ── */
const BOX_WIDTH      = 240;
const BOX_GAP_H      = 60;   // horizontal gap between parent and child (left offset indent)
const BOX_GAP_V      = 32;   // vertical gap between parent and child
const CANVAS_LEFT_PAD = 40;

/* Depth in the call chain: main=0, c1=1, c2=2, c3/c4/c5=3 */
const BOX_DEPTH = { main:0, c1:1, c2:2, c3:3, c4:3, c5:3 };

/* Parent map for vertical positioning */
const BOX_PARENT = { c1:'main', c2:'c1', c3:'c2', c4:'c2', c5:'c1' };

function boxLeft(id) {
  return CANVAS_LEFT_PAD + BOX_DEPTH[id] * (BOX_GAP_H);
}

/* Compute estimated box height based on number of steps */
function estimatedBoxHeight(id) {
  const def = BOX_DEFS[id];
  if (!def) return 60;
  // header ~40px + steps ~28px each + padding ~16px
  return 40 + def.steps.length * 28 + 16;
}

/* Compute top position of a box based on its parent's top + parent height + gap */
function computeBoxTop(id) {
  const parentId = BOX_PARENT[id];
  if (!parentId) return 40; // main starts at top
  const parentTop = computeBoxTop(parentId);
  const parentH   = estimatedBoxHeight(parentId);
  return parentTop + parentH + BOX_GAP_V;
}

/* ── State ── */
let currentStep = 0;

/* ── DOM refs — match IDs in HTML ── */
const codeLines   = document.getElementById('codeLines');
const animCanvas  = document.getElementById('animCanvas');
const animViewport= document.getElementById('animViewport');
const arrowsSvg   = document.getElementById('arrowsSvg');
const explText    = document.getElementById('explText');
const animStatus  = document.getElementById('animStatus');
const headerStepNum   = document.getElementById('headerStepNum');
const headerStepTotal = document.getElementById('headerStepTotal');
const stepPill    = document.getElementById('stepPill');
const progressDots= document.getElementById('progressDots');
const btnPrev     = document.getElementById('btnPrev');
const btnNext     = document.getElementById('btnNext');
const btnReset    = document.getElementById('btnReset');

/* ── Build code panel ── */
function buildCodePanel() {
  if (!codeLines) return;
  codeLines.innerHTML = CODE_LINES.map(l =>
    `<div class="viz-code-line" id="cl${l.n}" data-line="${l.n}">` +
      `<span class="lnum">${l.n}</span>` +
      `<span class="lcode">${l.html}</span>` +
    `</div>`
  ).join('');
}

/* ── Build progress dots ── */
function buildProgressDots() {
  if (!progressDots) return;
  progressDots.innerHTML = Array.from({ length: TOTAL_STEPS }, (_, i) =>
    `<div class="viz-dot" id="dot-${i+1}"></div>`
  ).join('');
}

function updateProgressDots(stepNum) {
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const d = document.getElementById('dot-' + i);
    if (!d) continue;
    d.classList.toggle('viz-dot-active', i === stepNum);
    d.classList.toggle('viz-dot-done',   i < stepNum);
    d.classList.remove('viz-dot-active');
    if (i === stepNum) d.classList.add('viz-dot-active');
    else if (i < stepNum) d.classList.add('viz-dot-done');
  }
}

/* ── Build call boxes ── */
const boxEls = {};

/* Track which boxes were visible last render to detect newly shown boxes */
let _prevVisibleBoxes = new Set();

function buildBox(id) {
  const def = BOX_DEFS[id];
  const el = document.createElement('div');
  el.className = 'call-box';
  el.id = 'box-' + id;
  el.style.left = boxLeft(id) + 'px';
  el.style.top  = computeBoxTop(id) + 'px';
  el.style.display = 'none';

  const badgeClass = def.isMain ? 'main-badge' : (def.isNull ? 'null-badge' : '');
  const nameClass  = def.isMain ? 'is-main' : '';

  el.innerHTML =
    `<div class="box-header">` +
      `<span class="box-fn-name ${nameClass}">${def.label}</span>` +
      (def.badge ? `<span class="box-badge ${badgeClass}">${def.badge}</span>` : '') +
    `</div>` +
    `<div class="box-steps" id="steps-${id}">` +
      def.steps.map((s, i) =>
        `<div class="box-step" id="bstep-${id}-${i}">` +
          `<span class="step-num">${i+1}</span>` +
          `<span>${s.text}</span>` +
        `</div>`
      ).join('') +
    `</div>`;

  animCanvas.appendChild(el);
  boxEls[id] = el;
}

function buildAllBoxes() {
  Object.keys(BOX_DEFS).forEach(buildBox);
}

/* ── Helpers ── */
function setCodeHighlight(lines) {
  document.querySelectorAll('.viz-code-line').forEach(el => {
    const active = lines.includes(+el.dataset.line);
    el.classList.toggle('viz-line-active', active);
  });
  if (lines.length) {
    const first = document.getElementById('cl' + lines[0]);
    if (first) first.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

function setBoxVisibility(step) {
  const dimmedIds = step.dimmed || [];
  const hiddenIds = step.hidden || [];

  Object.keys(BOX_DEFS).forEach(id => {
    const el = boxEls[id];
    if (!el) return;
    if (hiddenIds.includes(id)) {
      el.style.display = 'none';
      el.classList.remove('active-box','dimmed','fading','box-fadein');
    } else {
      const wasHidden = el.style.display === 'none';
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      const isActive = id === step.activeBox;
      const isDimmed = dimmedIds.includes(id);
      el.classList.toggle('active-box', isActive);
      el.classList.toggle('dimmed', isDimmed && !isActive);
      if (wasHidden) {
        el.classList.remove('box-fadein');
        void el.offsetWidth;
        el.classList.add('box-fadein');
      }
    }
  });
}

function setBoxStepHighlight(step) {
  Object.keys(BOX_DEFS).forEach(id => {
    BOX_DEFS[id].steps.forEach((_, i) => {
      const el = document.getElementById(`bstep-${id}-${i}`);
      if (!el) return;
      el.classList.toggle('active-step', id === step.activeBox && i === step.activeStep);
    });
  });
}

/* ── Pan canvas to bring active box into view ── */
function computePanTarget(id) {
  if (!id) return null;
  const vpWidth  = animViewport.offsetWidth;
  const vpHeight = animViewport.offsetHeight;
  const boxX     = boxLeft(id);

  const targetX  = boxX - vpWidth / 2 + BOX_WIDTH / 2;
  const maxOffX  = 2400 - vpWidth;
  const clampedX = Math.max(0, Math.min(targetX, maxOffX));

  const parentId = BOX_PARENT[id];
  const scrollY  = parentId
    ? Math.max(0, computeBoxTop(parentId) - 24)
    : Math.max(0, computeBoxTop(id) - 24);
  const maxOffY  = Math.max(0, 1200 - vpHeight);
  const clampedY = Math.min(scrollY, maxOffY);

  return { x: clampedX, y: clampedY };
}

function panToBox(id) {
  const t = computePanTarget(id);
  if (!t) return;
  animCanvas.style.transform = `translate(-${t.x}px, -${t.y}px)`;
}

/* Smooth animated pan. Calls callback when done. skipReturn = don't draw green during pan */
function smoothPanToBox(id, duration, callback) {
  const t = computePanTarget(id);
  if (!t) { if (callback) callback(); return; }

  animCanvas.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  animCanvas.style.transform  = `translate(-${t.x}px, -${t.y}px)`;

  // Redraw ancestor links (no green) mid-flight so they track positions
  const interval = setInterval(() => {
    if (currentStep > 0) {
      const s = STEPS[currentStep - 1];
      if (s) redrawAllArrows(s, true /* skipReturn during scroll */);
    }
  }, 60);

  setTimeout(() => {
    clearInterval(interval);
    animCanvas.style.transition = '';
    if (callback) callback();
  }, duration + 20);
}

/* ── Arrow drawing ── */
function clearArrows() {
  // Keep <defs>, remove all drawn paths/lines
  arrowsSvg.querySelectorAll('path, line, polyline').forEach(el => el.remove());
}

function getStepRowMidpoint(boxId, stepIdx, side /* 'right' | 'left' | 'top' */) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;

  const vpRect     = animViewport.getBoundingClientRect();
  const stepsEl    = el.querySelector('.box-steps');
  const stepEls    = stepsEl ? stepsEl.querySelectorAll('.box-step') : [];
  const targetStep = stepEls[stepIdx];

  if (!targetStep) {
    // fallback: box header midpoint
    const hdr = el.querySelector('.box-header');
    if (!hdr) return null;
    const r = hdr.getBoundingClientRect();
    return {
      x: side === 'right' ? r.right - vpRect.left : r.left - vpRect.left,
      y: r.top - vpRect.top + r.height / 2
    };
  }

  const r = targetStep.getBoundingClientRect();
  return {
    x: side === 'right' ? r.right - vpRect.left : r.left - vpRect.left,
    y: r.top - vpRect.top + r.height / 2
  };
}

function getBoxHeaderMidpoint(boxId, side) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;
  const hdr = el.querySelector('.box-header');
  if (!hdr) return null;
  const vpRect = animViewport.getBoundingClientRect();
  const r = hdr.getBoundingClientRect();
  return {
    x: side === 'right' ? r.right - vpRect.left : r.left - vpRect.left,
    y: r.top  - vpRect.top  + r.height / 2
  };
}

/* Draw the persistent blue "link" arrow from parent call-step → child box header */
/* Build a bezier path string between two points going left-to-right */
function bezierPath(x1, y1, x2, y2) {
  const dx   = Math.abs(x2 - x1);
  const cp1x = x1 + dx * 0.4;
  const cp2x = x2 - dx * 0.4;
  return `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
}

/* ── Track which link arrows have already been drawn (animate only first time) ── */
const drawnLinks = new Set();

function makePath(d, cls, markerId, animate) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', cls);
  if (markerId) path.setAttribute('marker-end', `url(#${markerId})`);
  arrowsSvg.appendChild(path);

  if (animate) {
    const isRet  = cls.includes('arrow-ret');
    const isLink = cls.includes('arrow-link') && !cls.includes('faded');
    const drawDuration = 520;

    requestAnimationFrame(() => {
      const len = path.getTotalLength();
      path.style.strokeDasharray  = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.transition = 'none';
      void path.getBoundingClientRect();
      path.style.transition = `stroke-dashoffset ${drawDuration}ms cubic-bezier(0.4,0,0.2,1)`;
      path.style.strokeDashoffset = '0';

      setTimeout(() => {
        if (!path.isConnected) return;
        path.style.transition = '';
        path.style.strokeDasharray  = '';
        path.style.strokeDashoffset = '';
        if (isRet)  path.style.animation = 'dash-flow-ret 0.65s linear infinite';
        if (isLink) path.style.animation = 'dash-flow 0.7s linear infinite';
      }, drawDuration + 20);
    });
  }
}

/* Draw ONE blue link arrow: parent call-step (right) → child header (left) */
function drawLinkArrow(link, faded) {
  if (!link) return;
  const from = getStepRowMidpoint(link.fromBox, link.fromStep, 'right');
  const to   = getBoxHeaderMidpoint(link.toBox, 'left');
  if (!from || !to) return;
  const cls = faded ? 'arrow-link arrow-link-faded' : 'arrow-link';

  const linkKey = `${link.fromBox}->${link.toBox}`;
  const shouldAnimate = !faded && !drawnLinks.has(linkKey);
  if (shouldAnimate) drawnLinks.add(linkKey);

  makePath(bezierPath(from.x, from.y, to.x, to.y), cls, 'mh-call', shouldAnimate);
}

/* Draw return arrow: child → parent, green dotted, animated once */
function drawReturnArrow(arrow) {
  if (!arrow || arrow.type !== 'ret') return;
  const fromEl = boxEls[arrow.fromBox];
  const toEl   = boxEls[arrow.toBox];
  if (!fromEl || !toEl) return;
  if (fromEl.style.display === 'none' || toEl.style.display === 'none') return;

  const from = getStepRowMidpoint(arrow.fromBox, arrow.fromStep, 'left');
  const to   = getStepRowMidpoint(arrow.toBox,   arrow.toStep,   'right');
  if (!from || !to) return;

  const dx   = Math.abs(from.x - to.x);
  const cp1x = from.x - dx * 0.4;
  const cp2x = to.x   + dx * 0.4;
  const d = `M ${from.x} ${from.y} C ${cp1x} ${from.y}, ${cp2x} ${to.y}, ${to.x} ${to.y}`;

  const retKey = `ret:${arrow.fromBox}->${arrow.toBox}`;
  const shouldAnimate = !drawnLinks.has(retKey);
  if (shouldAnimate) drawnLinks.add(retKey);

  makePath(d, 'arrow-ret', 'mh-ret', shouldAnimate);
}

/* Ancestor link chain: which box called which */
const PARENT_OF = { c1:'main', c2:'c1', c3:'c2', c4:'c2', c5:'c1' };
const CALL_STEP_OF = { c1:0, c2:5, c3:5, c4:6, c5:6 }; // step index in parent's BOX_DEFS

function getAncestorLinks(step) {
  // Walk up from activeBox through visible boxes, collect all parent→child links
  const links = [];
  const visible = new Set(step.boxes || []);
  let child = step.activeBox;
  while (child) {
    const parent = PARENT_OF[child];
    if (!parent || !visible.has(parent) || !visible.has(child)) break;
    links.push({ fromBox: parent, fromStep: CALL_STEP_OF[child], toBox: child });
    child = parent;
  }
  return links;
}

function redrawAllArrows(step, skipReturn) {
  clearArrows();
  requestAnimationFrame(() => {
    const allLinks = getAncestorLinks(step);
    allLinks.forEach((lk, i) => {
      const isImmediate = (i === 0);
      drawLinkArrow(lk, !isImmediate);
    });
    if (!skipReturn && step.arrow && step.arrow.type === 'ret') drawReturnArrow(step.arrow);
  });
}

/* ── Update UI chrome ── */
function updateChrome(stepNum) {
  const label = stepNum === 0 ? 'Ready' : (stepNum >= TOTAL_STEPS ? 'Done' : `Step ${stepNum}`);
  if (animStatus)      animStatus.textContent = label;
  if (headerStepNum)   headerStepNum.textContent  = stepNum;
  if (headerStepTotal) headerStepTotal.textContent = TOTAL_STEPS;
  if (stepPill)        stepPill.textContent = `${stepNum} / ${TOTAL_STEPS}`;

  btnPrev.disabled = stepNum <= 0;
  btnNext.disabled = stepNum >= TOTAL_STEPS;

  updateProgressDots(stepNum);
}

/* ── Done overlay ── */
function showDone() {
  if (animViewport.querySelector('.done-overlay')) return;
  const div = document.createElement('div');
  div.className = 'done-overlay';
  div.innerHTML =
    `<div class="done-icon">🌳</div>` +
    `<div class="done-title">Tree Created!</div>` +
    `<div class="done-sub">root → node(5) → left: node(2), right: NULL</div>`;
  animViewport.appendChild(div);
}

/* Guard rapid clicks during animation */
let _rendering = false;

/* ── Main render ── */
function renderStep(stepNum) {
  const donEl = animViewport.querySelector('.done-overlay');
  if (donEl && stepNum < TOTAL_STEPS) donEl.remove();

  if (stepNum === 0) {
    setCodeHighlight([]);
    Object.keys(BOX_DEFS).forEach(id => {
      const el = boxEls[id];
      if (el) { el.style.display = 'none'; el.style.opacity = ''; el.style.transform = ''; el.style.transition = ''; }
    });
    clearArrows();
    if (explText) explText.innerHTML = 'Click <strong>Next</strong> to begin the walkthrough.';
    updateChrome(0);
    _rendering = false;
    return;
  }

  const s    = STEPS[stepNum - 1];
  const prev = stepNum > 1 ? STEPS[stepNum - 2] : null;

  const prevVisible  = new Set(prev ? prev.boxes || [] : []);
  const nextVisible  = new Set(s.boxes || []);
  const disappearing = [...prevVisible].filter(id => !nextVisible.has(id));
  const appearing    = [...nextVisible].filter(id => !prevVisible.has(id));

  const isReturnStep = !!(s.arrow && s.arrow.type === 'ret');
  const FADE_DUR  = 260;
  const SCROLL_DUR= 480;
  const SETTLE    = 60;

  /* Phase 1 — fade out disappearing boxes */
  function phase1() {
    if (!disappearing.length) return phase2();
    disappearing.forEach(id => {
      const el = boxEls[id];
      if (!el || el.style.display === 'none') return;
      el.style.transition = `opacity ${FADE_DUR}ms ease, transform ${FADE_DUR}ms ease`;
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(-6px) scale(0.97)';
    });
    setTimeout(() => {
      disappearing.forEach(id => {
        const el = boxEls[id];
        if (!el) return;
        el.style.display = 'none'; el.style.opacity = ''; el.style.transform = ''; el.style.transition = '';
        el.classList.remove('active-box','dimmed','fading','box-fadein');
      });
      phase2();
    }, FADE_DUR);
  }

  /* Phase 2 — smooth scroll, NO green arrow yet */
  function phase2() {
    setCodeHighlight(s.codeLines || []);
    updateChrome(stepNum);
    if (explText) explText.innerHTML = s.expl;

    if (s.panTo) {
      smoothPanToBox(s.panTo, SCROLL_DUR, phase3);
    } else {
      phase3();
    }
  }

  /* Phase 3 — show boxes, draw all arrows including green (now scroll is done) */
  function phase3() {
    setTimeout(() => {
      setBoxVisibility(s);
      setBoxStepHighlight(s);
      // Draw everything — green return arrow animates NOW after scroll settled
      redrawAllArrows(s, false);
      _rendering = false;
      if (s.done) setTimeout(showDone, 200);
    }, appearing.length ? SETTLE : 0);
  }

  _rendering = true;
  phase1();
}

/* ── Controls ── */
btnNext.addEventListener('click', () => {
  if (_rendering) return;
  if (currentStep < TOTAL_STEPS) { currentStep++; renderStep(currentStep); }
});

btnPrev.addEventListener('click', () => {
  if (_rendering) return;
  if (currentStep > 0) { currentStep--; renderStep(currentStep); }
});

btnReset.addEventListener('click', () => {
  _rendering = false;
  currentStep = 0;
  drawnLinks.clear();
  animCanvas.style.transition = '';
  animCanvas.style.transform = 'translate(0, 0)';
  renderStep(0);
});

/* Redraw arrows on resize */
window.addEventListener('resize', () => {
  if (currentStep > 0) {
    const s = STEPS[currentStep - 1];
    if (s) redrawAllArrows(s);
  }
});

/* ── Shared canvas offset helpers ── */
function getCurrentOffsets() {
  const m = animCanvas.style.transform.match(/translate\(-?([\d.]+)px,\s*-?([\d.]+)px\)/);
  return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
}

function setOffsets(ox, oy) {
  const vpWidth  = animViewport.offsetWidth;
  const vpHeight = animViewport.offsetHeight;
  const cx = Math.max(0, Math.min(ox, 2400 - vpWidth));
  const cy = Math.max(0, Math.min(oy, Math.max(0, 1200 - vpHeight)));
  animCanvas.style.transform = `translate(-${cx}px, -${cy}px)`;
}

/* ── Mousewheel scroll (vertical) ── */
animViewport.addEventListener('wheel', e => {
  e.preventDefault();
  const off = getCurrentOffsets();
  setOffsets(off.x, off.y + e.deltaY * 0.8);
  if (currentStep > 0) {
    const s = STEPS[currentStep - 1];
    if (s) redrawAllArrows(s);
  }
}, { passive: false });

/* ── Drag to pan the animation canvas ── */
(function initDrag() {
  let dragging = false, startX = 0, startY = 0, startOffX = 0, startOffY = 0;

  animViewport.addEventListener('mousedown', e => {
    dragging = true; startX = e.clientX; startY = e.clientY;
    const off = getCurrentOffsets(); startOffX = off.x; startOffY = off.y;
    animViewport.classList.add('grabbing'); e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    setOffsets(startOffX + (startX - e.clientX), startOffY + (startY - e.clientY));
    if (currentStep > 0) { const s = STEPS[currentStep-1]; if (s) redrawAllArrows(s); }
  });
  window.addEventListener('mouseup', () => {
    if (!dragging) return; dragging = false; animViewport.classList.remove('grabbing');
  });
  animViewport.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    const off = getCurrentOffsets(); startOffX = off.x; startOffY = off.y;
  }, { passive: true });
  animViewport.addEventListener('touchmove', e => {
    setOffsets(startOffX + (startX - e.touches[0].clientX), startOffY + (startY - e.touches[0].clientY));
    if (currentStep > 0) { const s = STEPS[currentStep-1]; if (s) redrawAllArrows(s); }
  }, { passive: true });
})();

/* ── Inject CSS: fade-in for new boxes + dash-flow-ret for green return ── */
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes boxFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .call-box.box-fadein { animation: boxFadeIn 0.28s ease-out forwards; }
    @keyframes dash-flow-ret { to { stroke-dashoffset: -18; } }
  `;
  document.head.appendChild(style);
})();


/* ── Init ── */
buildCodePanel();
buildProgressDots();
buildAllBoxes();
renderStep(0);