/* ─── doubly-visualize.js ───────────────────────────────────────
   Step-by-step "Insert at Beginning" visualizer for Doubly Linked List.
   Mirrors visualize.js structure exactly. Only insert-beginning active.
──────────────────────────────────────────────────────────────── */

var mode = 'insert-beginning';

var MODE_LABELS = {
  'insert-beginning': 'Insert at Beginning',
  'insert-end':       'Insert at End',
  'insert-middle':    'Insert at Middle',
  'delete-beginning': 'Delete at Beginning',
  'delete-end':       'Delete at End',
  'delete-middle':    'Delete at Middle'
};

// ═══════════════════════════════════════════════════════════════
//  CODE TEMPLATES
// ═══════════════════════════════════════════════════════════════
var CODE_TEMPLATES = {
  'insert-beginning': [
    { line: 0, cls: 'viz-code-comment', html: '<span class="c-comment">// DLL Node structure</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-kw">struct</span> node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* prev;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">insertatbeginning</span>(<span class="c-type">int</span> data) {' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* newnode = (<span class="c-kw">struct</span> node*)' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">malloc</span>(<span class="c-kw">sizeof</span>(<span class="c-kw">struct</span> node));' },
    { line: 2, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;data = data;' },
    { line: 3, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;prev = <span class="c-kw">NULL</span>;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 4, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;head = tail = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;next = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '&nbsp;&nbsp;} <span class="c-kw">else</span> {' },
    { line: 5, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;next = head;' },
    { line: 6, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;head-&gt;prev = newnode;' },
    { line: 7, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;head = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, html: '}' }
  ]
};

function renderCodePanel(m) {
  var container = document.getElementById('codeLines');
  if (!container) return;
  var tpl = CODE_TEMPLATES[m] || CODE_TEMPLATES['insert-beginning'];
  var html = '';
  var lineNum = 1;
  for (var i = 0; i < tpl.length; i++) {
    var t = tpl[i];
    var extra = t.cls ? ' ' + t.cls : '';
    html += '<div class="viz-code-line' + extra + '" data-line="' + t.line + '">';
    html += '<span class="lnum">' + lineNum + '</span>';
    html += '<span class="lcode">' + t.html + '</span>';
    html += '</div>';
    lineNum++;
  }
  container.innerHTML = html;
}

function switchMode(newMode) {
  if (newMode === mode) return;
  mode = newMode;

  // Update pill states
  var pills = document.querySelectorAll('.viz-op-pill');
  for (var i = 0; i < pills.length; i++) {
    pills[i].classList.remove('viz-op-pill-active');
  }
  var active = document.querySelector('.viz-op-pill[data-mode="' + newMode + '"]');
  if (active) active.classList.add('viz-op-pill-active');

  // Update header badge
  var badge = document.querySelector('.viz-operation-badge');
  if (badge) {
    badge.childNodes[badge.childNodes.length - 1].textContent = ' ' + (MODE_LABELS[newMode] || newMode);
  }

  stopPlay();
  VIZ.currentStep = 0;

  hideCurve();
  hideNewNode();

  if (newMode === 'insert-beginning') {
    var overlay = document.getElementById('comingSoonOverlay');
    if (overlay) overlay.classList.remove('visible');
    var inputRow = document.getElementById('valueInputRow');
    if (inputRow) inputRow.style.display = '';
    var lbl = document.getElementById('vizValueLabel');
    if (lbl) lbl.textContent = 'Insert value';
    renderCodePanel('insert-beginning');
    VIZ.totalSteps = 7;
    if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;
    rebuildStepList(INSERT_BEGINNING_STEP_LABELS);
    rebuildDots(7);
    buildList(VIZ.initialList, false, 0);
    applyStep(0);
  } else {
    var overlay2 = document.getElementById('comingSoonOverlay');
    if (overlay2) {
      var title = document.getElementById('comingSoonTitle');
      var text  = document.getElementById('comingSoonText');
      if (title) title.textContent = MODE_LABELS[newMode] + ' \u2014 Coming Soon';
      if (text)  text.innerHTML = 'This operation is being built.<br>Switch back to <strong>Insert at Beginning</strong> to explore the working animation.';
      overlay2.classList.add('visible');
    }
    var inputRow2 = document.getElementById('valueInputRow');
    if (inputRow2) inputRow2.style.display = 'none';
    buildList(VIZ.initialList, false, 0);
    applyStep(0);
  }

  var timeVal = document.getElementById('timeComplexityVal');
  if (timeVal) timeVal.textContent = 'O(1)';
}

// ═══════════════════════════════════════════════════════════════
//  STEP LABELS
// ═══════════════════════════════════════════════════════════════
var INSERT_BEGINNING_STEP_LABELS = [
  'Allocate memory (malloc)',
  'Assign data value',
  'Set prev = NULL',
  'Check if head == NULL',
  'newNode\u2192next = head',
  'head\u2192prev = newNode',
  'head = newNode (done!)'
];

// ═══════════════════════════════════════════════════════════════
//  STEP DEFINITIONS
// ═══════════════════════════════════════════════════════════════
var STEPS = [
  // 0: initial state
  {
    codeLine: null,
    animStatus: 'Ready',
    animStatusClass: '',
    explainStepNum: 'Initial State',
    explainTitle: 'Starting Point',
    explainText: 'We have a doubly linked list: <strong>1 \u21c4 2 \u21c4 3 \u21c4 4 \u21c4 NULL</strong>.<br><br>Each node has a <strong>prev</strong> pointer, a <strong>data</strong> field, and a <strong>next</strong> pointer. Goal: insert a new node at the very beginning.',
    whatBody: 'HEAD points to node 1 (prev=NULL). TAIL points to node 4 (next=NULL). We call <code>insertatbeginning(0)</code>.',
    conceptText: '\uD83D\uDCA1 DLL Insert at beginning is O(1) \u2014 no traversal needed, just pointer updates!'
  },
  // 1: malloc
  {
    codeLine: 1,
    animStatus: 'Allocating\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 7',
    explainTitle: 'Allocate Memory',
    explainText: '<code>malloc(sizeof(struct node))</code> reserves heap memory for a new DLL node.<br><br>The new node has three fields: <strong>prev</strong>, <strong>data</strong>, and <strong>next</strong>.',
    whatBody: 'A new DLL node appears below the list. Fields are uninitialized (\u2014). Memory address 0x100 assigned.',
    conceptText: '\uD83E\uDDE0 DLL nodes need more memory than SLL \u2014 they carry an extra prev pointer (8 bytes on 64-bit).'
  },
  // 2: assign data
  {
    codeLine: 2,
    animStatus: 'Assigning value\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 7',
    explainTitle: 'Assign Data Value',
    explainText: '<code>newnode-&gt;data = data;</code> writes the value into the data field of the new node.',
    whatBody: 'The new node\u2019s DATA field updates from <strong>?</strong> to the inserted value. prev and next still unset.',
    conceptText: '\uD83D\uDCDD Always set data first \u2014 pointer fields come next in a deliberate order.'
  },
  // 3: set prev = NULL
  {
    codeLine: 3,
    animStatus: 'Setting prev\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 7',
    explainTitle: 'Set prev = NULL',
    explainText: '<code>newnode-&gt;prev = NULL;</code> — since this node will become the first node, nothing comes before it.<br><br>Its prev pointer must always be NULL.',
    whatBody: 'The PREV field on the new node flashes and updates to <strong>NULL</strong>. This marks it as the future head.',
    conceptText: '\uD83D\uDCCC The first node\u2019s prev is always NULL in a doubly linked list \u2014 it\u2019s the left boundary.'
  },
  // 4: check if head == NULL
  {
    codeLine: 4,
    animStatus: 'Checking head\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 4 of 7',
    explainTitle: 'Check: head == NULL?',
    explainText: '<code>if (head == NULL)</code> — is the list empty?<br><br>Our list has 4 nodes, so <strong>head != NULL</strong>. We take the <code>else</code> branch.',
    whatBody: 'The list is not empty (head points to node 1). We jump to the else branch: link newNode into the list.',
    conceptText: '\uD83D\uDD17 If the list were empty we\u2019d also set tail = newnode. For non-empty, only head needs updating.'
  },
  // 5: newnode->next = head
  {
    codeLine: 5,
    animStatus: 'Linking next\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 5 of 7',
    explainTitle: 'newNode\u2192next = head',
    explainText: '<code>newnode-&gt;next = head;</code> — the new node\u2019s NEXT pointer now points to the current first node (node 1).<br><br>This stitches the new node into the chain.',
    whatBody: 'A curved blue arrow draws from newNode\u2019s NEXT field to node 1. Chain: newNode \u2192 1 \u21c4 2 \u21c4 3 \u21c4 4.',
    conceptText: '\u26A0\uFE0F Do this BEFORE moving head \u2014 after head = newNode, you\u2019d lose the reference to the old first node!'
  },
  // 6: head->prev = newnode (NEW STEP)
  {
    codeLine: 6,
    animStatus: 'Linking prev\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 6 of 7',
    explainTitle: 'head\u2192prev = newNode',
    explainText: '<code>head-&gt;prev = newnode;</code> — the old head (node 1) now points <strong>back</strong> to the new node.<br><br>This completes the <strong>bidirectional</strong> link between the two nodes.',
    whatBody: 'A curved amber arrow draws from node 1\u2019s PREV field back to newNode. The DLL is now properly doubly-linked.',
    conceptText: '\uD83D\uDD17 Without this step, the list breaks backward traversal! Both directions must be set for a true DLL.'
  },
  // 7: head = newnode
  {
    codeLine: 7,
    animStatus: 'Complete \u2713',
    animStatusClass: 'status-complete',
    explainStepNum: 'Step 7 of 7',
    explainTitle: 'head = newNode',
    explainText: '<code>head = newnode;</code> — HEAD now points to the newly inserted node.<br><br>List is now: <strong>0 \u21c4 1 \u21c4 2 \u21c4 3 \u21c4 4 \u21c4 NULL</strong>',
    whatBody: 'HEAD jumps to the new node. All nodes snap into a clean bidirectional row. Insertion complete in O(1).',
    conceptText: '\u2705 DLL insertion complete! Both newNode\u2192next and head\u2192prev are set \u2014 full bidirectional linkage achieved.'
  }
];

function rebuildStepList(labels) {
  var list = document.getElementById('stepList');
  if (!list) return;
  var html = '';
  for (var i = 0; i < labels.length; i++) {
    html += '<div class="viz-step-item viz-step-upcoming" data-step="' + (i + 1) + '">';
    html += '<div class="viz-step-dot"></div>';
    html += '<span>' + labels[i] + '</span>';
    html += '</div>';
  }
  list.innerHTML = html;
}

function rebuildDots(total) {
  var container = document.getElementById('progressDots');
  if (!container) return;
  var html = '<div class="viz-dot viz-dot-active" data-step="0"></div>';
  for (var i = 1; i <= total; i++) {
    html += '<div class="viz-dot" data-step="' + i + '"></div>';
  }
  container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
var VIZ = {
  currentStep: 0,
  totalSteps: 7,
  isPlaying: false,
  playTimer: null,
  playDelay: 2000,
  initialList: [1, 2, 3, 4],
  newValue: 0,
  el: {}
};

// ═══════════════════════════════════════════════════════════════
//  MEMORY ADDRESSES
// ═══════════════════════════════════════════════════════════════
var MEM_ADDRS     = ['0x101', '0x102', '0x103', '0x104', '0x105'];
var NEW_NODE_ADDR = '0x100';

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  cacheElements();
  renderCodePanel('insert-beginning');
  buildList(VIZ.initialList, false, 0);
  applyStep(0);
});

function cacheElements() {
  function q(id) { return document.getElementById(id); }
  VIZ.el = {
    listRow:         q('listRow'),
    newNodeWrap:     q('newNodeWrap'),
    newNodeEl:       q('newNodeEl'),
    newNodeData:     q('newNodeData'),
    newNodePrevField:q('newNodePrevField'),
    newNodeNextField:q('newNodeNextField'),
    newNodeLabel:    q('newNodeLabel'),
    headPointer:     q('headPointer'),
    headAddr:        q('headAddr'),
    tailPointer:     q('tailPointer'),
    tailAddr:        q('tailAddr'),
    curveSvg:        q('curveSvg'),
    curvePath:       q('curvePath'),
    curvePathPrev:   q('curvePathPrev'),
    animStatus:      q('animStatus'),
    btnPrev:         q('btnPrev'),
    btnNext:         q('btnNext'),
    btnPlay:         q('btnPlay'),
    btnReset:        q('btnReset'),
    playIcon:        q('playIcon'),
    pauseIcon:       q('pauseIcon'),
    playLabel:       q('playLabel'),
    headerStepNum:   q('headerStepNum'),
    headerStepTotal: q('headerStepTotal'),
    explainCard:     q('explainCard'),
    explainStepNum:  q('explainStepNum'),
    explainTitle:    q('explainTitle'),
    explainText:     q('explainText'),
    whatBody:        q('whatBody'),
    conceptText:     q('conceptText'),
    vizValueInput:   q('vizValueInput')
  };
  if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;

  // Listen for value input changes
  if (VIZ.el.vizValueInput) {
    VIZ.el.vizValueInput.addEventListener('input', function () {
      var v = parseInt(VIZ.el.vizValueInput.value);
      VIZ.newValue = isNaN(v) ? 0 : v;
    });
  }
}

// ═══════════════════════════════════════════════════════════════
//  POINTER TRACKING
// ═══════════════════════════════════════════════════════════════
var PTR = {
  nodeList:    [],
  headIndex:   0,
  tailIndex:   0,
  newNodeAddr: '0x100'
};

function buildNodeList(values) {
  PTR.nodeList = [];
  var initialList = VIZ.initialList;
  var addrByValue = {};
  for (var k = 0; k < initialList.length; k++) {
    var v = initialList[k];
    var a = MEM_ADDRS[k] || ('0x' + (0x101 + k).toString(16));
    if (!addrByValue[v]) addrByValue[v] = [];
    addrByValue[v].push(a);
  }
  var usageCount = {};
  var newInserted = false;
  for (var i = 0; i < values.length; i++) {
    var val = values[i];
    var isNewNode = (!newInserted && val === VIZ.newValue && values.length === VIZ.initialList.length + 1);
    var addr;
    if (isNewNode) {
      addr = NEW_NODE_ADDR;
      newInserted = true;
    } else {
      var idx = usageCount[val] || 0;
      if (addrByValue[val] && addrByValue[val][idx] !== undefined) {
        addr = addrByValue[val][idx];
      } else {
        var baseIdx = newInserted ? (i - 1) : i;
        addr = MEM_ADDRS[baseIdx] || ('0x' + (0x101 + baseIdx).toString(16));
      }
      usageCount[val] = idx + 1;
    }
    PTR.nodeList.push({ value: val, address: addr });
  }
}

// ── Build DLL node HTML: [PREV | DATA | NEXT] ──────────────────
function buildList(values, withEnter, headIdx) {
  if (headIdx === undefined) headIdx = 0;
  buildNodeList(values);
  PTR.headIndex = headIdx < values.length ? headIdx : 0;
  PTR.tailIndex = values.length - 1;

  var row = VIZ.el.listRow;
  if (!row) return;
  row.innerHTML = '';

  for (var i = 0; i < PTR.nodeList.length; i++) {
    var nodeObj = PTR.nodeList[i];

    var prevAddr = (i > 0) ? PTR.nodeList[i - 1].address : 'NULL';
    var nextAddr = (i < PTR.nodeList.length - 1) ? PTR.nodeList[i + 1].address : 'NULL';

    var wrap = document.createElement('div');
    wrap.className = 'viz-node-wrap';

    var node = document.createElement('div');
    node.className = 'viz-node viz-dll-node' + (withEnter ? ' viz-node-entering' : '');
    if (withEnter) node.style.animationDelay = (i * 65) + 'ms';
    node.dataset.index = i;

    node.innerHTML =
      '<div class="viz-node-prev">' + prevAddr + '</div>' +
      '<div class="viz-node-data">' + nodeObj.value + '</div>' +
      '<div class="viz-node-next">' + nextAddr + '</div>';

    var addrEl = document.createElement('div');
    addrEl.className = 'viz-node-addr';
    addrEl.textContent = nodeObj.address;

    wrap.appendChild(node);
    wrap.appendChild(addrEl);
    row.appendChild(wrap);

    if (i < PTR.nodeList.length - 1) {
      // Bidirectional arrows between nodes
      var a = document.createElement('div');
      a.className = 'viz-arrow';
      a.innerHTML = '<span class="viz-arrow-fwd">\u2192</span><span class="viz-arrow-bck">\u2190</span>';
      row.appendChild(a);
    }
  }

  // Final arrow + NULL
  var fa = document.createElement('div');
  fa.className = 'viz-arrow';
  fa.innerHTML = '<span class="viz-arrow-fwd">\u2192</span><span class="viz-arrow-bck" style="visibility:hidden">\u2190</span>';
  row.appendChild(fa);

  var nullEl = document.createElement('div');
  nullEl.className = 'viz-null';
  nullEl.textContent = 'NULL';
  row.appendChild(nullEl);

  requestAnimationFrame(function () {
    positionPointers();
  });
}

// ── Pointer positioning ─────────────────────────────────────────
function positionPointers() {
  var canvas = document.getElementById('animCanvas');
  var row    = VIZ.el.listRow;
  var hp     = VIZ.el.headPointer;
  var tp     = VIZ.el.tailPointer;
  if (!canvas || !row || !hp || !tp) return;

  var wraps = row.querySelectorAll('.viz-node-wrap');
  if (!wraps || wraps.length === 0) return;

  var canvasRect = canvas.getBoundingClientRect();

  var hIdx  = Math.min(PTR.headIndex, wraps.length - 1);
  var hWrap = wraps[hIdx];
  var hNode = hWrap.querySelector('.viz-node');
  var hRect = (hNode || hWrap).getBoundingClientRect();
  var hCx   = hRect.left + hRect.width / 2 - canvasRect.left;
  var hTopY = hRect.top - canvasRect.top - hp.getBoundingClientRect().height - 4;

  var tIdx  = Math.min(PTR.tailIndex, wraps.length - 1);
  var tWrap = wraps[tIdx];
  var tNode = tWrap.querySelector('.viz-node');
  var tRect = (tNode || tWrap).getBoundingClientRect();
  var tCx   = tRect.left + tRect.width / 2 - canvasRect.left;
  var tTopY = tRect.top - canvasRect.top - tp.getBoundingClientRect().height - 4;

  if (hIdx === tIdx) {
    hp.style.top       = hTopY + 'px';
    hp.style.bottom    = 'auto';
    hp.style.left      = (hCx - 22) + 'px';
    hp.style.transform = 'translateX(-50%)';
    tp.style.top       = tTopY + 'px';
    tp.style.bottom    = 'auto';
    tp.style.left      = (tCx + 22) + 'px';
    tp.style.transform = 'translateX(-50%)';
  } else {
    hp.style.top       = hTopY + 'px';
    hp.style.bottom    = 'auto';
    hp.style.left      = hCx + 'px';
    hp.style.transform = 'translateX(-50%)';
    tp.style.top       = tTopY + 'px';
    tp.style.bottom    = 'auto';
    tp.style.left      = tCx + 'px';
    tp.style.transform = 'translateX(-50%)';
  }

  updatePointerAddrs();
}

function updatePointerAddrs() {
  var hAddr = VIZ.el.headAddr;
  var tAddr = VIZ.el.tailAddr;
  if (hAddr) {
    var hNode = PTR.nodeList[PTR.headIndex];
    hAddr.textContent = hNode ? hNode.address : '\u2014';
  }
  if (tAddr) {
    var tNode = PTR.nodeList[PTR.tailIndex];
    tAddr.textContent = tNode ? tNode.address : '\u2014';
  }
}

function positionHeadOnNewNode() {
  var canvas = document.getElementById('animCanvas');
  var hp     = VIZ.el.headPointer;
  var nodeEl = VIZ.el.newNodeEl;
  if (!canvas || !hp || !nodeEl) return;

  var canvasRect = canvas.getBoundingClientRect();
  var nodeRect   = nodeEl.getBoundingClientRect();
  var cx         = nodeRect.left + nodeRect.width / 2 - canvasRect.left;
  var topY       = nodeRect.top  - canvasRect.top - hp.getBoundingClientRect().height - 4;

  hp.style.top       = topY + 'px';
  hp.style.bottom    = 'auto';
  hp.style.left      = cx + 'px';
  hp.style.transform = 'translateX(-50%)';

  if (VIZ.el.headAddr) VIZ.el.headAddr.textContent = PTR.newNodeAddr;
}

// ═══════════════════════════════════════════════════════════════
//  STEP APPLICATION
// ═══════════════════════════════════════════════════════════════
function applyStep(idx) {
  VIZ.currentStep = idx;
  var step = STEPS[idx];
  if (!step) return;

  if (VIZ.el.headerStepNum) VIZ.el.headerStepNum.textContent = idx;

  animateCardUpdate(function () {
    if (VIZ.el.explainStepNum) VIZ.el.explainStepNum.textContent = step.explainStepNum;
    if (VIZ.el.explainTitle)   VIZ.el.explainTitle.textContent   = step.explainTitle;
    if (VIZ.el.explainText)    VIZ.el.explainText.innerHTML      = step.explainText;
    if (VIZ.el.whatBody)       VIZ.el.whatBody.innerHTML         = step.whatBody;
    if (VIZ.el.conceptText)    VIZ.el.conceptText.textContent    = step.conceptText;
  });

  if (VIZ.el.animStatus) {
    VIZ.el.animStatus.textContent = step.animStatus;
    VIZ.el.animStatus.className   = 'viz-anim-status' +
      (step.animStatusClass ? ' ' + step.animStatusClass : '');
  }

  highlightCode(step.codeLine);
  updateStepList(idx);
  updateDots(idx);

  if (VIZ.el.btnPrev) VIZ.el.btnPrev.disabled = (idx === 0);
  if (VIZ.el.btnNext) VIZ.el.btnNext.disabled = (idx === VIZ.totalSteps);

  runAnimation(idx);
}

function animateCardUpdate(fn) {
  var card = VIZ.el.explainCard;
  if (!card) { fn(); return; }
  card.classList.remove('updating');
  void card.offsetWidth;
  fn();
  card.classList.add('updating');
}

// ═══════════════════════════════════════════════════════════════
//  CODE HIGHLIGHTING
// ═══════════════════════════════════════════════════════════════
function highlightCode(activeLine) {
  var all = document.querySelectorAll('.viz-code-line.viz-highlightable');
  for (var i = 0; i < all.length; i++) {
    all[i].classList.remove('viz-line-active', 'viz-line-dim');
  }
  if (activeLine === null || activeLine === undefined || activeLine === 0) return;

  for (var k = 0; k < all.length; k++) {
    all[k].classList.add('viz-line-dim');
  }
  var targets = document.querySelectorAll('.viz-code-line[data-line="' + activeLine + '"]');
  for (var j = 0; j < targets.length; j++) {
    targets[j].classList.remove('viz-line-dim');
    targets[j].classList.add('viz-line-active');
    if (targets[j].classList.contains('viz-highlightable')) {
      var codeBlock = targets[j].closest('.viz-code-block');
      if (codeBlock) {
        var lineTop = targets[j].offsetTop;
        var blockH  = codeBlock.clientHeight;
        codeBlock.scrollTop = lineTop - blockH / 2 + targets[j].clientHeight / 2;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════
//  STEP LIST & DOTS
// ═══════════════════════════════════════════════════════════════
function updateStepList(currentStep) {
  var items = document.querySelectorAll('.viz-step-item');
  for (var i = 0; i < items.length; i++) {
    var s = parseInt(items[i].dataset.step);
    items[i].classList.remove('viz-step-active', 'viz-step-done', 'viz-step-upcoming');
    if (s < currentStep) {
      items[i].classList.add('viz-step-done');
    } else if (s === currentStep) {
      items[i].classList.add('viz-step-active');
      // Scroll within explain panel only, not page viewport
      var explainBody = document.getElementById('explainBody');
      if (explainBody) {
        var itemTop = items[i].offsetTop;
        var bodyH   = explainBody.clientHeight;
        explainBody.scrollTop = itemTop - bodyH / 2 + items[i].clientHeight / 2;
      }
    } else {
      items[i].classList.add('viz-step-upcoming');
    }
  }
}

function updateDots(idx) {
  var dots = document.querySelectorAll('.viz-dot');
  for (var i = 0; i < dots.length; i++) {
    var s = parseInt(dots[i].dataset.step);
    dots[i].classList.remove('viz-dot-active', 'viz-dot-done');
    if (s < idx) {
      dots[i].classList.add('viz-dot-done');
    } else if (s === idx) {
      dots[i].classList.add('viz-dot-active');
    }
  }
}

// ═══════════════════════════════════════════════════════════════
//  ANIMATION HELPERS
// ═══════════════════════════════════════════════════════════════
function hideNewNode() {
  var wrap = VIZ.el.newNodeWrap;
  if (wrap) wrap.classList.remove('visible');
}

function hideCurve() {
  var svg = VIZ.el.curveSvg;
  if (svg) svg.classList.remove('visible');
  var path = VIZ.el.curvePath;
  if (path) { path.setAttribute('d', ''); path.style.strokeDashoffset = '1000px'; }
  var pathPrev = VIZ.el.curvePathPrev;
  if (pathPrev) { pathPrev.setAttribute('d', ''); pathPrev.style.strokeDashoffset = '1000px'; pathPrev.style.opacity = '0'; }
}

function resetHeadStyle() {
  PTR.headIndex = 0;
  positionPointers();
}

// ═══════════════════════════════════════════════════════════════
//  MAIN ANIMATION DISPATCHER
// ═══════════════════════════════════════════════════════════════
function runAnimation(step) {
  switch (step) {
    case 0: anim_initial();      break;
    case 1: anim_malloc();       break;
    case 2: anim_assignData();   break;
    case 3: anim_setPrevNull();  break;
    case 4: anim_checkNull();    break;
    case 5: anim_linkNext();     break;
    case 6: anim_linkPrev();     break;
    case 7: anim_rearrange();    break;
  }
}

// ── Step 0: Initial state ───────────────────────────────────────
function anim_initial() {
  buildList(VIZ.initialList, false, 0);
  hideNewNode();
  hideCurve();
  resetHeadStyle();
}

// ── Step 1: malloc — show new node with '?' fields ─────────────
function anim_malloc() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = '?';
  VIZ.el.newNodeEl.className     = 'viz-node viz-dll-node viz-node-new';
  VIZ.el.newNodeLabel.textContent = 'newNode';

  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.remove('visible');
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { wrap.classList.add('visible'); });
  });
}

// ── Step 2: assign data ─────────────────────────────────────────
function anim_assignData() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  setTimeout(function () {
    VIZ.el.newNodeData.textContent = String(VIZ.newValue);
    VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
    VIZ.el.newNodeEl.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)';
    VIZ.el.newNodeEl.style.transform  = 'scale(1.1)';
    setTimeout(function () { VIZ.el.newNodeEl.style.transform = 'scale(1)'; }, 200);
  }, 80);
}

// ── Step 3: set prev = NULL ─────────────────────────────────────
function anim_setPrevNull() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  // Flash prev field: ? → NULL
  var prevField = VIZ.el.newNodePrevField;
  if (prevField) {
    prevField.textContent = '?';
    setTimeout(function () {
      prevField.style.transition = 'background 0.25s ease, color 0.25s ease';
      prevField.style.background = 'rgba(245,158,11,0.25)';
      prevField.style.color      = '#d97706';
      prevField.textContent      = 'NULL';
      setTimeout(function () {
        prevField.style.background = '';
        prevField.style.color      = '';
      }, 700);
    }, 120);
  }
}

// ── Step 4: check if head == NULL ──────────────────────────────
function anim_checkNull() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = 'NULL';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  // Pulse the HEAD pointer to signal evaluation
  var hp = VIZ.el.headPointer;
  if (hp) {
    hp.style.transition = 'transform 0.15s ease';
    hp.style.transform  = 'translateX(-50%) scale(1.18)';
    setTimeout(function () { hp.style.transform = 'translateX(-50%) scale(1)'; }, 300);
  }
}

// Store curve geometry for step 6
var CURVE_GEOM = null;

// ── Step 5: newNode->next = head (draw curved arrow) ────────────
function anim_linkNext() {
  buildList(VIZ.initialList, false, 0);
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = 'NULL';

  // Update NEXT field on new node to show first node's address
  var firstNodeAddr = PTR.nodeList.length > 0 ? PTR.nodeList[0].address : 'NULL';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = firstNodeAddr;

  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (!svg || !path) return;

  var oldDot = svg.querySelector('.viz-travel-dot');
  if (oldDot) oldDot.parentNode.removeChild(oldDot);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;
      var canvasRect = canvas.getBoundingClientRect();

      // Source: RIGHT side of newNode — UPPER portion (above center)
      var newNodeEl = VIZ.el.newNodeEl;
      var newRect = newNodeEl ? newNodeEl.getBoundingClientRect() : null;
      var startX, startY;
      if (newRect) {
        startX = newRect.right - canvasRect.left;
        startY = newRect.top + newRect.height * 0.28 - canvasRect.top;
      } else {
        startX = canvasRect.width / 2 + 60;
        startY = canvasRect.height - 100;
      }

      // Target: LEFT side of node 1 — UPPER portion (above center)
      var listRow = VIZ.el.listRow;
      var firstWrap = listRow ? listRow.querySelector('.viz-node-wrap') : null;
      var firstNodeEl = firstWrap ? firstWrap.querySelector('.viz-node') : null;
      var endX, endY;
      if (firstNodeEl) {
        var fr = firstNodeEl.getBoundingClientRect();
        endX = fr.left - canvasRect.left;
        endY = fr.top + fr.height * 0.28 - canvasRect.top;
      } else {
        endX = canvasRect.width * 0.15;
        endY = canvasRect.height * 0.38;
      }

      var isMobile = window.innerWidth <= 768;

      // BLUE (NEXT): Outer Track
      var cp1x, cp1y, cp2x, cp2y;
      if (isMobile) {
        cp1x = startX + 60;  cp1y = startY - 60;  
        cp2x = endX - 70;    cp2y = endY + 100;   
      } else {
        cp1x = startX + 120; cp1y = startY - 100; 
        cp2x = endX - 150;   cp2y = endY + 150;   
      }

      var d = 'M ' + startX + ' ' + startY
        + ' C ' + cp1x + ' ' + cp1y + ', ' + cp2x + ' ' + cp2y + ', ' + endX + ' ' + endY;

      path.setAttribute('d', d);
      CURVE_GEOM = { startX: startX, startY: startY, endX: endX, endY: endY };

      svg.classList.add('visible');

      var len;
      try { len = path.getTotalLength(); } catch (e) { len = 500; }
      if (!len || len < 1) len = 500;

      path.style.transition       = 'none';
      path.style.strokeDasharray  = len + 'px';
      path.style.strokeDashoffset = len + 'px';

      // Traveling dot
      var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '5');
      dot.setAttribute('fill', '#3b6cff');
      dot.classList.add('viz-travel-dot');
      dot.style.filter = 'drop-shadow(0 0 4px rgba(59,108,255,0.7))';
      svg.appendChild(dot);

      var duration  = 850;
      var startTime = null;

      function animateDot(ts) {
        if (!startTime) startTime = ts;
        var elapsed  = ts - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        try {
          var pt = path.getPointAtLength(eased * len);
          dot.setAttribute('cx', pt.x);
          dot.setAttribute('cy', pt.y);
        } catch (err) {}
        if (progress < 1) {
          requestAnimationFrame(animateDot);
        } else {
          setTimeout(function () {
            if (dot.parentNode) dot.parentNode.removeChild(dot);
          }, 150);
        }
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          path.style.transition       = 'stroke-dashoffset ' + (duration / 1000) + 's cubic-bezier(0.4,0,0.2,1)';
          path.style.strokeDashoffset = '0px';
          requestAnimationFrame(animateDot);
        });
      });
    });
  });
}

// ── Step 6: head->prev = newNode (draw amber reverse arrow) ────────
function anim_linkPrev() {
  buildList(VIZ.initialList, false, 0);
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = 'NULL';

  var firstNodeAddr = PTR.nodeList.length > 0 ? PTR.nodeList[0].address : 'NULL';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = firstNodeAddr;

  // Also update the PREV field of the first list node to show newNode's addr
  var listRow = VIZ.el.listRow;
  var firstWrap = listRow ? listRow.querySelector('.viz-node-wrap') : null;
  if (firstWrap) {
    var firstPrevEl = firstWrap.querySelector('.viz-node-prev');
    if (firstPrevEl) {
      firstPrevEl.style.transition = 'background 0.25s ease, color 0.25s ease';
      firstPrevEl.style.background = 'rgba(245,158,11,0.25)';
      firstPrevEl.style.color      = '#d97706';
      firstPrevEl.textContent      = '0x100'; // newNode addr
      setTimeout(function () {
        firstPrevEl.style.background = '';
        firstPrevEl.style.color      = '';
      }, 900);
    }
  }

  // Keep blue NEXT arrow visible from step 5 (re-draw it perfectly to match step 5)
  var svg      = VIZ.el.curveSvg;
  var pathNext = VIZ.el.curvePath;
  var pathPrev = VIZ.el.curvePathPrev;
  if (!svg || !pathNext || !pathPrev) return;

  var oldDot = svg.querySelector('.viz-travel-dot');
  if (oldDot) oldDot.parentNode.removeChild(oldDot);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;
      var canvasRect = canvas.getBoundingClientRect();

      var newNodeEl = VIZ.el.newNodeEl;
      var newRect   = newNodeEl ? newNodeEl.getBoundingClientRect() : null;

      // Blue: newNode RIGHT (upper) → Node1 LEFT (upper)
      var startX, startY;
      if (newRect) {
        startX = newRect.right - canvasRect.left;
        startY = newRect.top + newRect.height * 0.28 - canvasRect.top;
      } else {
        startX = canvasRect.width / 2 + 60;
        startY = canvasRect.height - 100;
      }

      var firstNodeEl2 = firstWrap ? firstWrap.querySelector('.viz-node') : null;
      var endX, endY;
      if (firstNodeEl2) {
        var fr = firstNodeEl2.getBoundingClientRect();
        endX = fr.left - canvasRect.left;
        endY = fr.top + fr.height * 0.28 - canvasRect.top;
      } else {
        endX = canvasRect.width * 0.15;
        endY = canvasRect.height * 0.38;
      }

      var isMobile2 = window.innerWidth <= 768;

      // ── BLUE (NEXT) static arrow: Matches Step 5 exactly ──
      var bcp1x, bcp1y, bcp2x, bcp2y;
      if (isMobile2) {
        bcp1x = startX + 60;  bcp1y = startY - 60;
        bcp2x = endX - 70;    bcp2y = endY + 100;
      } else {
        bcp1x = startX + 120; bcp1y = startY - 100;
        bcp2x = endX - 150;   bcp2y = endY + 150;
      }

      var dNext = 'M ' + startX + ' ' + startY
        + ' C ' + bcp1x + ' ' + bcp1y + ', ' + bcp2x + ' ' + bcp2y + ', ' + endX + ' ' + endY;

      pathNext.setAttribute('d', dNext);
      var lenNext;
      try { lenNext = pathNext.getTotalLength(); } catch(e) { lenNext = 500; }
      if (!lenNext || lenNext < 1) lenNext = 500;
      pathNext.style.transition       = 'none';
      pathNext.style.strokeDasharray  = lenNext + 'px';
      pathNext.style.strokeDashoffset = '0px';
      svg.classList.add('visible');

      // ── AMBER (PREV): Tucked inside the blue curves to absolutely prevent crossing ──
      var revStartX, revStartY, revEndX, revEndY;
      if (firstNodeEl2) {
        var fr2 = firstNodeEl2.getBoundingClientRect();
        revStartX = fr2.left - canvasRect.left;
        revStartY = fr2.top + fr2.height * 0.72 - canvasRect.top; 
      } else {
        revStartX = canvasRect.width * 0.15;
        revStartY = canvasRect.height * 0.55;
      }
      if (newRect) {
        revEndX = newRect.right - canvasRect.left;
        revEndY = newRect.top + newRect.height * 0.72 - canvasRect.top; 
      } else {
        revEndX = canvasRect.width / 2 + 60;
        revEndY = canvasRect.height - 80;
      }

      var rcp1x, rcp1y, rcp2x, rcp2y;
      if (isMobile2) {
        rcp1x = revStartX - 45; rcp1y = revStartY + 45;   // Smaller offset, stays inside blue
        rcp2x = revEndX + 35;   rcp2y = revEndY - 30;     // Smaller offset, stays inside blue
      } else {
        rcp1x = revStartX - 90; rcp1y = revStartY + 80;   // Pulled tight to stay inside the blue -150/+150 turn
        rcp2x = revEndX + 70;   rcp2y = revEndY - 50;     // Pulled tight to stay inside the blue +120/-100 turn
      }

      var dPrev = 'M ' + revStartX + ' ' + revStartY
        + ' C ' + rcp1x + ' ' + rcp1y + ', ' + rcp2x + ' ' + rcp2y + ', ' + revEndX + ' ' + revEndY;

      pathPrev.setAttribute('d', dPrev);
      var lenPrev;
      try { lenPrev = pathPrev.getTotalLength(); } catch(e) { lenPrev = 500; }
      if (!lenPrev || lenPrev < 1) lenPrev = 500;

      pathPrev.style.transition       = 'none';
      pathPrev.style.strokeDasharray  = lenPrev + 'px';
      pathPrev.style.strokeDashoffset = lenPrev + 'px';
      pathPrev.style.opacity          = '1';

      // Traveling amber dot
      var dot2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot2.setAttribute('r', '5');
      dot2.setAttribute('fill', '#f59e0b');
      dot2.classList.add('viz-travel-dot');
      dot2.style.filter = 'drop-shadow(0 0 4px rgba(245,158,11,0.8))';
      svg.appendChild(dot2);

      var duration2  = 850;
      var startTime2 = null;

      function animateDot2(ts) {
        if (!startTime2) startTime2 = ts;
        var elapsed  = ts - startTime2;
        var progress = Math.min(elapsed / duration2, 1);
        var eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        try {
          var pt = pathPrev.getPointAtLength(eased * lenPrev);
          dot2.setAttribute('cx', pt.x);
          dot2.setAttribute('cy', pt.y);
        } catch (err) {}
        if (progress < 1) {
          requestAnimationFrame(animateDot2);
        } else {
          setTimeout(function () {
            if (dot2.parentNode) dot2.parentNode.removeChild(dot2);
          }, 150);
        }
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          pathPrev.style.transition       = 'stroke-dashoffset ' + (duration2 / 1000) + 's cubic-bezier(0.4,0,0.2,1)';
          pathPrev.style.strokeDashoffset = '0px';
          requestAnimationFrame(animateDot2);
        });
      });
    });
  });
}

// ── Step 7: head = newNode — rearrange all nodes ────────────────
function anim_rearrange() {
  // Retract curve
  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (svg && path) {
    var len;
    try { len = path.getTotalLength(); } catch (e) { len = 500; }
    if (!len || len < 1) len = 500;
    path.style.transition       = 'stroke-dashoffset 0.4s cubic-bezier(0.4,0,0.2,1)';
    path.style.strokeDashoffset = len + 'px';
    setTimeout(function () { svg.classList.remove('visible'); }, 420);
  }

  setTimeout(function () {
    hideNewNode();
    resetHeadStyle();
    CURVE_GEOM = null;
    var fullList = [VIZ.newValue].concat(VIZ.initialList);
    setTimeout(function () { buildList(fullList, true, 0); }, 80);
  }, 440);
}

// ═══════════════════════════════════════════════════════════════
//  PLAYBACK
// ═══════════════════════════════════════════════════════════════
function vizNext() {
  if (VIZ.currentStep < VIZ.totalSteps) {
    // Sync newValue from input before step 2 shows it
    var inputEl = VIZ.el.vizValueInput;
    if (inputEl && inputEl.value !== '') {
      var v = parseInt(inputEl.value);
      if (!isNaN(v)) VIZ.newValue = v;
    }
    applyStep(VIZ.currentStep + 1);
  } else {
    stopPlay();
  }
}

function vizPrev() {
  if (VIZ.currentStep > 0) {
    applyStep(VIZ.currentStep - 1);
  }
}

function vizReset() {
  stopPlay();
  VIZ.currentStep = 0;
  VIZ.newValue    = 0;
  if (VIZ.el.vizValueInput) VIZ.el.vizValueInput.value = '';
  hideCurve();
  hideNewNode();
  buildList(VIZ.initialList, false, 0);
  applyStep(0);
}

function vizTogglePlay() {
  if (VIZ.isPlaying) {
    stopPlay();
  } else {
    startPlay();
  }
}

function startPlay() {
  if (VIZ.currentStep >= VIZ.totalSteps) vizReset();
  VIZ.isPlaying = true;
  var btn = VIZ.el.btnPlay;
  if (btn) btn.classList.add('playing');
  if (VIZ.el.playIcon)  VIZ.el.playIcon.style.display  = 'none';
  if (VIZ.el.pauseIcon) VIZ.el.pauseIcon.style.display = '';
  if (VIZ.el.playLabel) VIZ.el.playLabel.textContent = 'Pause';
  scheduleNext();
}

function stopPlay() {
  VIZ.isPlaying = false;
  clearTimeout(VIZ.playTimer);
  var btn = VIZ.el.btnPlay;
  if (btn) btn.classList.remove('playing');
  if (VIZ.el.playIcon)  VIZ.el.playIcon.style.display  = '';
  if (VIZ.el.pauseIcon) VIZ.el.pauseIcon.style.display = 'none';
  if (VIZ.el.playLabel) VIZ.el.playLabel.textContent = 'Play';
}

function scheduleNext() {
  if (!VIZ.isPlaying) return;
  VIZ.playTimer = setTimeout(function () {
    if (!VIZ.isPlaying) return;
    if (VIZ.currentStep < VIZ.totalSteps) {
      vizNext();
      scheduleNext();
    } else {
      stopPlay();
    }
  }, VIZ.playDelay);
}

// ═══════════════════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', function (e) {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  switch (e.key) {
    case 'ArrowRight': case 'ArrowDown':  e.preventDefault(); vizNext();        break;
    case 'ArrowLeft':  case 'ArrowUp':    e.preventDefault(); vizPrev();        break;
    case ' ':                             e.preventDefault(); vizTogglePlay();  break;
    case 'r': case 'R':                                       vizReset();       break;
  }
});