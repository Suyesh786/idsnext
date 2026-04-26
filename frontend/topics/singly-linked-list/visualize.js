/* ─── visualize.js ─────────────────────────────────────────────
   Step-by-step "Insert at Beginning" visualizer for iDS Studio Next.
   No external dependencies. No 'use strict' (avoids smart-quote issues).
──────────────────────────────────────────────────────────────── */

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
var VIZ = {
  currentStep: 0,
  totalSteps: 5,
  isPlaying: false,
  playTimer: null,
  playDelay: 2000,
  initialList: [1, 2, 3, 4],
  newValue: 0,
  el: {}
};

// ═══════════════════════════════════════════════════════════════
//  STEP DEFINITIONS  (all strings use straight ASCII quotes)
// ═══════════════════════════════════════════════════════════════
var STEPS = [
  {
    codeLine: null,
    animStatus: 'Ready',
    animStatusClass: '',
    explainStepNum: 'Initial State',
    explainTitle: 'Starting Point',
    explainText: 'We start with a linked list containing nodes <strong>1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL</strong>.<br><br>Our goal: insert a new node with value <strong>0</strong> at the very beginning.',
    whatBody: 'The HEAD pointer currently points to node 1. We call <code>insertAtBeginning(&amp;head, 0)</code>.',
    conceptText: '\uD83D\uDCA1 Insert at beginning is O(1) \u2014 no traversal needed!'
  },
  {
    codeLine: 1,
    animStatus: 'Allocating\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 5',
    explainTitle: 'Allocate Memory',
    explainText: '<code>malloc(sizeof(struct Node))</code> asks the OS for memory big enough to hold one node.<br><br>The OS picks a free spot on the <strong>heap</strong> and returns its address, stored in <strong>newNode</strong>.',
    whatBody: 'A new node box appears below the list. Memory is allocated but fields are not yet set \u2014 data is garbage.',
    conceptText: '\uD83E\uDDE0 malloc returns void*. We cast it to (struct Node*) so C knows the type.'
  },
  {
    codeLine: 2,
    animStatus: 'Assigning\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 5',
    explainTitle: 'Assign the Value',
    explainText: '<code>newNode-&gt;data = val;</code> writes our value (<strong>0</strong>) into the data field of the new node.',
    whatBody: 'The new node\'s data field now shows "0". The next pointer is still uninitialised.',
    conceptText: '\uD83D\uDCDD The -> operator dereferences the pointer and accesses the struct member in one step.'
  },
  {
    codeLine: 3,
    animStatus: 'Linking\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 5',
    explainTitle: 'Link to Old Head',
    explainText: '<code>newNode-&gt;next = *head;</code> makes the new node\'s next pointer point to the <strong>current head</strong> (node 1).<br><br>This step preserves the existing list.',
    whatBody: 'A curved arrow now connects the new node to the old first node. Chain: new \u2192 1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL.',
    conceptText: '\u26A0\uFE0F Do this BEFORE updating head \u2014 updating head first would lose the reference to the old list!'
  },
  {
    codeLine: 4,
    animStatus: 'Updating HEAD\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 4 of 5',
    explainTitle: 'Update HEAD Pointer',
    explainText: '<code>*head = newNode;</code> moves the HEAD pointer to our new node, making it the official beginning of the list.',
    whatBody: 'The HEAD label jumps to the new node (value 0). The insertion is logically complete.',
    conceptText: '\uD83C\uDFAF We use double pointer (**head) so changes to head are visible outside the function.'
  },
  {
    codeLine: 5,
    animStatus: 'Complete \u2713',
    animStatusClass: 'status-complete',
    explainStepNum: 'Step 5 of 5',
    explainTitle: 'Final Arrangement',
    explainText: 'The function returns. The linked list is now:<br><strong>0 \u2192 1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL</strong><br><br>Node 0 is the new head of the list.',
    whatBody: 'All nodes shift into a clean horizontal line. Insertion complete in O(1) constant time.',
    conceptText: '\u2705 Done! insertAtBeginning always takes the same time regardless of list size.'
  }
];

// ═══════════════════════════════════════════════════════════════
//  MEMORY ADDRESS CONSTANTS
// ═══════════════════════════════════════════════════════════════
// Stable fake hex addresses. Index 0-4 = nodes 1,2,3,4 in initial list.
// NEW_NODE_ADDR = the node being inserted (value 0).
var MEM_ADDRS    = ['0x101', '0x102', '0x103', '0x104', '0x105'];
var NEW_NODE_ADDR = '0x100';

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  cacheElements();
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
    newNodeLabel:    q('newNodeLabel'),
    headPointer:     q('headPointer'),
    headAddr:        q('headAddr'),
    tailPointer:     q('tailPointer'),
    tailAddr:        q('tailAddr'),
    curveSvg:        q('curveSvg'),
    curvePath:       q('curvePath'),
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
    conceptText:     q('conceptText')
  };
  if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;
}

// ═══════════════════════════════════════════════════════════════
//  POINTER TRACKING SYSTEM
//  nodeList: [{ value, address }]  headIndex  tailIndex
// ═══════════════════════════════════════════════════════════════
var PTR = {
  nodeList:    [],      // current rendered nodes {value, address}
  headIndex:   0,       // index into nodeList for HEAD
  tailIndex:   0,       // index into nodeList for TAIL
  newNodeAddr: '0x100'  // address of the node being inserted
};

// Build nodeList from a values array using stable MEM_ADDRS mapping.
// Special case: if a value matches VIZ.newValue and we're building the
// final rearranged list, that node keeps its real address (0x100).
function buildNodeList(values) {
  PTR.nodeList = [];
  var newInserted = false;
  for (var i = 0; i < values.length; i++) {
    var isNewNode = (!newInserted && values[i] === VIZ.newValue && values.length === VIZ.initialList.length + 1);
    var addr;
    if (isNewNode) {
      addr = NEW_NODE_ADDR;   // '0x100'
      newInserted = true;
    } else {
      // Shift index back by 1 if new node was prepended
      var baseIdx = newInserted ? (i - 1) : i;
      addr = MEM_ADDRS[baseIdx] || ('0x' + (0x101 + baseIdx).toString(16));
    }
    PTR.nodeList.push({ value: values[i], address: addr });
  }
}

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
    // Determine what "next" field should show
    var nextAddr;
    if (i < PTR.nodeList.length - 1) {
      nextAddr = PTR.nodeList[i + 1].address;
    } else {
      nextAddr = 'NULL';
    }

    var wrap = document.createElement('div');
    wrap.className = 'viz-node-wrap';

    var node = document.createElement('div');
    node.className = 'viz-node' + (withEnter ? ' viz-node-entering' : '');
    if (withEnter) node.style.animationDelay = (i * 65) + 'ms';
    node.dataset.index = i;

    node.innerHTML =
      '<div class="viz-node-data">' + nodeObj.value + '</div>' +
      '<div class="viz-node-next">' + nextAddr + '</div>';

    var addrEl = document.createElement('div');
    addrEl.className = 'viz-node-addr';
    addrEl.textContent = nodeObj.address;

    wrap.appendChild(node);
    wrap.appendChild(addrEl);
    row.appendChild(wrap);

    if (i < PTR.nodeList.length - 1) {
      var a = document.createElement('div');
      a.className = 'viz-arrow';
      a.textContent = '\u2192';
      row.appendChild(a);
    }
  }

  var fa = document.createElement('div');
  fa.className = 'viz-arrow';
  fa.textContent = '\u2192';
  row.appendChild(fa);

  var nullEl = document.createElement('div');
  nullEl.className = 'viz-null';
  nullEl.textContent = 'NULL';
  row.appendChild(nullEl);

  // Position both pointers after DOM paints
  requestAnimationFrame(function () {
    positionPointers();
  });
}

// ── Core positioning engine ─────────────────────────────────────
// Positions HEAD and TAIL tightly just above their respective nodes.
function positionPointers() {
  var canvas = document.getElementById('animCanvas');
  var row    = VIZ.el.listRow;
  var hp     = VIZ.el.headPointer;
  var tp     = VIZ.el.tailPointer;
  if (!canvas || !row || !hp || !tp) return;

  var wraps = row.querySelectorAll('.viz-node-wrap');
  if (!wraps || wraps.length === 0) return;

  var canvasRect = canvas.getBoundingClientRect();

  // HEAD — position tightly above node top
  var hIdx  = Math.min(PTR.headIndex, wraps.length - 1);
  var hWrap = wraps[hIdx];
  var hNode = hWrap.querySelector('.viz-node');
  var hRect = (hNode || hWrap).getBoundingClientRect();
  var hCx   = hRect.left + hRect.width / 2 - canvasRect.left;
  // top = node top relative to canvas, then subtract pointer height + 4px gap
  var hTopY = hRect.top - canvasRect.top - hp.getBoundingClientRect().height - 4;

  // TAIL — position tightly above node top
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

// Set address text on HEAD and TAIL chips
function updatePointerAddrs() {
  var hAddr = VIZ.el.headAddr;
  var tAddr = VIZ.el.tailAddr;
  if (hAddr) {
    var hNode = PTR.nodeList[PTR.headIndex];
    hAddr.textContent = hNode ? hNode.address : '—';
  }
  if (tAddr) {
    var tNode = PTR.nodeList[PTR.tailIndex];
    tAddr.textContent = tNode ? tNode.address : '—';
  }
}

// Convenience: move HEAD pointer tightly above the floating new-node element
function positionHeadOnNewNode() {
  var canvas  = document.getElementById('animCanvas');
  var hp      = VIZ.el.headPointer;
  var nodeEl  = VIZ.el.newNodeEl;
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

// Legacy shim used by resetHeadStyle and other helpers
function positionHead(headIdx, total) {
  PTR.headIndex = headIdx < PTR.nodeList.length ? headIdx : 0;
  positionPointers();
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
  for (var i = 0; i < all.length; i++) all[i].classList.remove('viz-line-active');

  if (activeLine === null || activeLine === undefined) return;

  var targets = document.querySelectorAll('.viz-code-line[data-line="' + activeLine + '"]');
  for (var j = 0; j < targets.length; j++) {
    targets[j].classList.add('viz-line-active');
    if (targets[j].classList.contains('viz-highlightable')) {
      targets[j].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
}

// ═══════════════════════════════════════════════════════════════
//  STEP TRACKER
// ═══════════════════════════════════════════════════════════════
function updateStepList(cur) {
  var items = document.querySelectorAll('.viz-step-item');
  for (var i = 0; i < items.length; i++) {
    var s = parseInt(items[i].dataset.step, 10);
    items[i].classList.remove('viz-step-done', 'viz-step-active', 'viz-step-upcoming');
    if (s < cur)       items[i].classList.add('viz-step-done');
    else if (s === cur) items[i].classList.add('viz-step-active');
    else               items[i].classList.add('viz-step-upcoming');
  }
}

// ═══════════════════════════════════════════════════════════════
//  PROGRESS DOTS
// ═══════════════════════════════════════════════════════════════
function updateDots(cur) {
  var dots = document.querySelectorAll('.viz-dot');
  for (var i = 0; i < dots.length; i++) {
    var s = parseInt(dots[i].dataset.step, 10);
    dots[i].classList.remove('viz-dot-active', 'viz-dot-done');
    if (s === cur)      dots[i].classList.add('viz-dot-active');
    else if (s < cur)   dots[i].classList.add('viz-dot-done');
  }
}

// ═══════════════════════════════════════════════════════════════
//  ANIMATIONS
// ═══════════════════════════════════════════════════════════════
function runAnimation(step) {
  switch (step) {
    case 0: anim_initial();     break;
    case 1: anim_malloc();      break;
    case 2: anim_assignValue(); break;
    case 3: anim_linkNext();    break;
    case 4: anim_updateHead();  break;
    case 5: anim_rearrange();   break;
  }
}

function anim_initial() {
  buildList(VIZ.initialList, false, 0);
  hideNewNode();
  hideCurve();
  resetHeadStyle();
}

function anim_malloc() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent  = '?';
  VIZ.el.newNodeEl.className      = 'viz-node viz-node-new';
  VIZ.el.newNodeLabel.textContent = 'newNode';
  var nextField = document.getElementById('newNodeNextField');
  if (nextField) nextField.textContent = 'NULL';
  wrap.style.bottom    = '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.remove('visible');
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { wrap.classList.add('visible'); });
  });
}

function anim_assignValue() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  wrap.style.bottom    = '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  setTimeout(function () {
    VIZ.el.newNodeData.textContent = String(VIZ.newValue);
    VIZ.el.newNodeEl.className = 'viz-node viz-node-new viz-node-linked';
    VIZ.el.newNodeEl.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease';
    VIZ.el.newNodeEl.style.transform  = 'scale(1.12)';
    setTimeout(function () { VIZ.el.newNodeEl.style.transform = 'scale(1)'; }, 210);
  }, 80);
}

// Global store for the drawn curve geometry so step 4 can reuse it
var CURVE_GEOM = null;

function anim_linkNext() {
  buildList(VIZ.initialList, false, 0);
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  wrap.style.bottom    = '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-node-new viz-node-linked';

  var firstNodeAddr = PTR.nodeList.length > 0 ? PTR.nodeList[0].address : 'NULL';
  var nextField = document.getElementById('newNodeNextField');
  if (nextField) nextField.textContent = firstNodeAddr;

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

      // Source: RIGHT side of newNode
      var newNodeEl = VIZ.el.newNodeEl;
      var newRect = newNodeEl ? newNodeEl.getBoundingClientRect() : null;
      var startX, startY;
      if (newRect) {
        startX = newRect.right - canvasRect.left;
        startY = newRect.top + newRect.height / 2 - canvasRect.top;
      } else {
        startX = canvasRect.width / 2 + 60;
        startY = canvasRect.height - 100;
      }

      // Target: LEFT side of node 1 — arrow enters horizontally from left (→)
      var listRow = VIZ.el.listRow;
      var firstWrap = listRow ? listRow.querySelector('.viz-node-wrap') : null;
      var firstNodeEl = firstWrap ? firstWrap.querySelector('.viz-node') : null;
      var endX, endY;
      if (firstNodeEl) {
        var fr = firstNodeEl.getBoundingClientRect();
        endX = fr.left - canvasRect.left;
        endY = fr.top + fr.height / 2 - canvasRect.top;
      } else {
        endX = canvasRect.width * 0.15;
        endY = canvasRect.height * 0.38;
      }

      // Single smooth cubic bezier - no joints, no sharp corners.
      // cp1 pulls right+slightly up from newNode exit.
      // cp2 pulls from left+below into node 1 left side horizontally.
      var cp1x = startX + 80;
      var cp1y = startY - 60;
      var cp2x = endX - 60;
      var cp2y = endY + 160;

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

function anim_updateHead() {
  // Keep the curve from step 3 — do NOT call hideCurve()
  buildList(VIZ.initialList, false, 99);  // 99 = out-of-range so TAIL renders but HEAD won't auto-place

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  wrap.style.bottom    = '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');
  VIZ.el.newNodeData.textContent  = String(VIZ.newValue);
  VIZ.el.newNodeEl.className      = 'viz-node viz-node-new viz-node-head';
  VIZ.el.newNodeLabel.textContent = 'newNode = HEAD';

  // Keep curve SVG visible (don't hide it)
  var svg = VIZ.el.curveSvg;
  if (svg) svg.classList.add('visible');

  // Place HEAD pointer just to the LEFT of node 1, pointing at it
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      var hp     = VIZ.el.headPointer;
      if (!canvas || !hp) return;

      var canvasRect = canvas.getBoundingClientRect();
      var listRow    = VIZ.el.listRow;
      var firstWrap  = listRow ? listRow.querySelector('.viz-node-wrap') : null;
      var firstNode  = firstWrap ? firstWrap.querySelector('.viz-node') : null;

      if (firstNode) {
        var fr   = firstNode.getBoundingClientRect();
        // Place HEAD to the LEFT of node 1 — arrow points rightward (→) into it
        var leftX = fr.left - canvasRect.left - 10;
        var topY  = fr.top  - canvasRect.top - hp.getBoundingClientRect().height - 4;
        hp.style.top       = topY + 'px';
        hp.style.bottom    = 'auto';
        hp.style.left      = leftX + 'px';
        hp.style.transform = 'translateX(-50%)';
      }
      if (VIZ.el.headAddr) VIZ.el.headAddr.textContent = NEW_NODE_ADDR;
    });
  });
}

function anim_rearrange() {
  // Retract the curve by animating dashoffset back to full length
  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (svg && path) {
    var len;
    try { len = path.getTotalLength(); } catch (e) { len = 500; }
    if (!len || len < 1) len = 500;
    path.style.transition       = 'stroke-dashoffset 0.4s cubic-bezier(0.4,0,0.2,1)';
    path.style.strokeDashoffset = len + 'px';
    setTimeout(function () {
      svg.classList.remove('visible');
    }, 420);
  }

  // After retract completes, hide new node and build final list
  setTimeout(function () {
    hideNewNode();
    resetHeadStyle();
    CURVE_GEOM = null;
    var fullList = [VIZ.newValue].concat(VIZ.initialList);
    setTimeout(function () { buildList(fullList, true, 0); }, 80);
  }, 440);
}

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════
function hideNewNode() {
  if (VIZ.el.newNodeWrap) VIZ.el.newNodeWrap.classList.remove('visible');
}

function hideCurve() {
  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (!svg || !path) return;
  svg.classList.remove('visible');
  path.style.transition       = 'none';
  path.style.strokeDasharray  = '1000px';
  path.style.strokeDashoffset = '1000px';
}

function resetHeadStyle() {
  var hp = VIZ.el.headPointer;
  if (hp) {
    hp.style.transition = 'left 0.38s cubic-bezier(0.4,0,0.2,1), top 0.38s cubic-bezier(0.4,0,0.2,1)';
    hp.style.bottom     = 'auto';
    var arr = hp.querySelector('.viz-ptr-arrow');
    if (arr) arr.textContent = '\u2193';
  }
  var tp = VIZ.el.tailPointer;
  if (tp) {
    tp.style.transition = 'left 0.38s cubic-bezier(0.4,0,0.2,1), top 0.38s cubic-bezier(0.4,0,0.2,1)';
    tp.style.bottom     = 'auto';
  }
  PTR.headIndex = 0;
  PTR.tailIndex = VIZ.initialList.length - 1;
  requestAnimationFrame(function () {
    positionPointers();
  });
}

// ═══════════════════════════════════════════════════════════════
//  CONTROLS  (onclick targets in HTML)
// ═══════════════════════════════════════════════════════════════
function vizNext() {
  if (VIZ.currentStep >= VIZ.totalSteps) return;
  applyStep(VIZ.currentStep + 1);
}

function vizPrev() {
  if (VIZ.currentStep <= 0) return;
  applyStep(VIZ.currentStep - 1);
}

function vizReset() {
  stopPlay();
  applyStep(0);
}

function vizTogglePlay() {
  if (VIZ.isPlaying) stopPlay(); else startPlay();
}

function startPlay() {
  if (VIZ.currentStep >= VIZ.totalSteps) applyStep(0);
  VIZ.isPlaying = true;
  if (VIZ.el.btnPlay)    VIZ.el.btnPlay.classList.add('playing');
  if (VIZ.el.playIcon)   VIZ.el.playIcon.style.display  = 'none';
  if (VIZ.el.pauseIcon)  VIZ.el.pauseIcon.style.display = '';
  if (VIZ.el.playLabel)  VIZ.el.playLabel.textContent   = 'Pause';

  function tick() {
    if (!VIZ.isPlaying) return;
    if (VIZ.currentStep >= VIZ.totalSteps) { stopPlay(); return; }
    vizNext();
    VIZ.playTimer = setTimeout(tick, VIZ.playDelay);
  }
  VIZ.playTimer = setTimeout(tick, VIZ.playDelay);
}

function stopPlay() {
  VIZ.isPlaying = false;
  clearTimeout(VIZ.playTimer);
  if (VIZ.el.btnPlay)    VIZ.el.btnPlay.classList.remove('playing');
  if (VIZ.el.playIcon)   VIZ.el.playIcon.style.display  = '';
  if (VIZ.el.pauseIcon)  VIZ.el.pauseIcon.style.display = 'none';
  if (VIZ.el.playLabel)  VIZ.el.playLabel.textContent   = 'Play';
}

// ═══════════════════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', function (e) {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  switch (e.key) {
    case 'ArrowRight': case 'ArrowDown':  e.preventDefault(); vizNext();         break;
    case 'ArrowLeft':  case 'ArrowUp':    e.preventDefault(); vizPrev();         break;
    case ' ':                             e.preventDefault(); vizTogglePlay();   break;
    case 'r': case 'R':                                       vizReset();        break;
  }
});