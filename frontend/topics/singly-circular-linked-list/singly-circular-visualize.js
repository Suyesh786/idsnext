/* ─── singly-circular-visualize.js ───────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const listRow        = document.getElementById("listRow");
  const headPointer    = document.getElementById("headPointer");
  const tailPointer    = document.getElementById("tailPointer");
  const newNodeWrap    = document.getElementById("newNodeWrap");
  const newNodeData    = document.getElementById("newNodeData");
  const newNodeAddr    = document.getElementById("newNodeAddr");

  const curveSvg          = document.getElementById("curveSvg");
  const curvePath         = document.getElementById("curvePath");
  const circularCurvePath = document.getElementById("circularCurvePath");

  const valueInput = document.getElementById("vizValueInput");
  const btnConfirm = document.getElementById("vizConfirmBtn");
  const btnNext    = document.getElementById("btnNext");
  const btnPrev    = document.getElementById("btnPrev");
  const btnReset   = document.getElementById("btnReset");

  let stepItems      = document.querySelectorAll(".viz-step-item");
  const progressDots = document.querySelectorAll(".viz-dot");

  // ── Mode ────────────────────────────────────────────────────────
  let mode = 'insert-beginning';

  const MODE_LABELS = {
    'insert-beginning': 'Insert at Beginning',
    'insert-end':       'Insert at End',
    'insert-middle':    'Insert at Middle',
  };

  // ── Step sidebar labels per mode ─────────────────────────────────
  const STEP_LABELS = {
    'insert-beginning': [
      'Create new node (malloc)',
      'newnode→data = data',
      'Check: head == NULL?',
      'newnode→next = head',
      'tail→next = newnode',
      'head = newnode',
      'Node inserted! List updated',
    ],
    'insert-end': [
      'Create new node (malloc)',
      'newnode→data = data',
      'Check: head == NULL?',
      'newnode→next = head',
      'tail→next = newnode',
      'tail = newnode',
      'Node inserted! List updated',
    ],
    'insert-middle': [
      'Create new node (malloc)',
      'newnode→data = data',
      'temp = head',
      'Loop: i < pos → TRUE',
      'temp = temp→next',
      'Loop: i < pos → FALSE (exit)',
      'newnode→next = temp→next',
      'temp→next = newnode',
      'Circular link stays intact',
      'Node inserted! List updated',
    ],
  };

  function rebuildStepList(m) {
    const stepList = document.getElementById('stepList');
    if (!stepList) return;
    const labels = STEP_LABELS[m] || [];
    stepList.innerHTML = labels.map((label, i) =>
      `<div class="viz-step-item viz-step-upcoming" data-step="${i + 1}">` +
        `<div class="viz-step-dot"></div>` +
        `<span>${label}</span>` +
      `</div>`
    ).join('');
    stepItems = document.querySelectorAll('.viz-step-item');
  }

  // Op pill switcher
  document.querySelectorAll('.viz-op-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const newMode = pill.dataset.mode;
      if (!newMode || newMode === mode) return;
      mode = newMode;
      document.querySelectorAll('.viz-op-pill').forEach(p => p.classList.remove('viz-op-pill-active'));
      pill.classList.add('viz-op-pill-active');
      const badge = document.querySelector('.viz-operation-badge');
      if (badge) {
        const last = badge.lastChild;
        if (last && last.nodeType === 3) last.textContent = ' ' + (MODE_LABELS[mode] || mode);
      }
      // Show/hide position input row for insert-middle
      const posRow = document.getElementById('posInputRow');
      if (posRow) posRow.style.display = (mode === 'insert-middle') ? '' : 'none';
      totalSteps = (mode === 'insert-middle') ? 10 : 7;
      STEP_TO_LINE = (mode === 'insert-middle')
        // steps: 0=init, 1=malloc, 2=data, 3=temp=head, 4=loopTRUE(for line), 5=tempMove(body line), 6=loopFALSE(for line), 7=link1, 8=link2, 9=circCheck, 10=done
        ? [null, 1, 2, 3, 4, 5, 4, 6, 7, null, null]
        : [null, 1, 2, 3, 4, 5, 6, null];
      switchCodeBlocks(mode);
      rebuildStepList(mode);
      hideLoopBox();
      removeTempPointer();
      MID_PLAN = [];
      resetAll();
    });
  });

  // ── State ────────────────────────────────────────────────────────
  let currentStep = 0;
  let totalSteps  = 7;        // overridden per mode
  let nodes = [];
  let insertValue = 10;
  let insertPos   = 2;        // 1-based: position AFTER which we insert (insert-middle)

  const NEW_NODE_ADDR_BEG = '0x100';
  const NEW_NODE_ADDR_END = '0x105';
  const NEW_NODE_ADDR_MID = '0x105';

  // Step → data-line mapping (overridden per mode in updateUI)
  let STEP_TO_LINE = [null, 1, 2, 3, 4, 5, 6, null];

  // ── Condition box ────────────────────────────────────────────────
  const conditionBox = document.getElementById("conditionBox");
  Object.assign(conditionBox.style, {
    display:       'none',
    position:      'absolute',
    left:          '50%',
    top:           '16px',
    bottom:        'auto',
    transform:     'translateX(-50%)',
    margin:        '0',
    padding:       '10px 22px',
    background:    '#fff5f5',
    border:        '2px solid #ef4444',
    borderRadius:  '10px',
    fontFamily:    "'JetBrains Mono', monospace",
    fontSize:      '13px',
    fontWeight:    '600',
    color:         '#b91c1c',
    letterSpacing: '0.01em',
    whiteSpace:    'nowrap',
    zIndex:        '50',
    transition:    'opacity 0.3s ease',
    opacity:       '0',
  });

  function showConditionBox() {
    conditionBox.innerHTML = 'head == NULL &nbsp;&rarr;&nbsp; &times; FALSE &mdash; list has nodes';
    conditionBox.style.display = 'block';
    conditionBox.style.background = '#fff5f5';
    conditionBox.style.border     = '2px solid #ef4444';
    conditionBox.style.color      = '#b91c1c';
    requestAnimationFrame(() => requestAnimationFrame(() => { conditionBox.style.opacity = '1'; }));
  }
  function hideConditionBox() {
    conditionBox.style.opacity = '0';
    setTimeout(() => { conditionBox.style.display = 'none'; }, 300);
  }

  // ── Code block visibility (show only active mode's code) ─────────
  function switchCodeBlocks(activeMode) {
    // Expects HTML code containers to have data-code-mode="insert-beginning" / "insert-end"
    const codeBlocks = document.querySelectorAll('.viz-code-block[data-code-mode]');
    if (codeBlocks.length > 0) {
      codeBlocks.forEach(block => {
        block.style.display = block.dataset.codeMode === activeMode ? '' : 'none';
      });
    }
  }

  // ── Code highlighting ─────────────────────────────────────────────
  function highlightCode(activeLine) {
    const all = document.querySelectorAll('.viz-code-line.viz-highlightable');
    all.forEach(el => el.classList.remove('viz-line-active', 'viz-line-dim'));
    if (activeLine === null || activeLine === undefined) return;
    all.forEach(el => el.classList.add('viz-line-dim'));
    const targets = document.querySelectorAll('.viz-code-line[data-line="' + activeLine + '"]');
    let scrolled = false;
    targets.forEach(el => {
      el.classList.remove('viz-line-dim');
      el.classList.add('viz-line-active');
      if (!scrolled && el.classList.contains('viz-highlightable')) {
        const codeBlock = el.closest('.viz-code-block');
        if (codeBlock) { codeBlock.scrollTo({ top: el.offsetTop - 10, behavior: 'smooth' }); scrolled = true; }
      }
    });
  }

  // ── Build initial 4-node list ─────────────────────────────────────
  function initNodes() {
    listRow.innerHTML = "";
    // Shift list right in END mode so tail stays visible without scrolling
    listRow.style.paddingLeft = (mode === 'insert-end') ? '0px' : '0px';
    listRow.style.marginLeft = (mode === 'insert-end') ? '-140px' : '0px';
    nodes = [
      { id: 1, data: 1, addr: "0x101", el: null },
      { id: 2, data: 2, addr: "0x102", el: null },
      { id: 3, data: 3, addr: "0x103", el: null },
      { id: 4, data: 4, addr: "0x104", el: null }
    ];
    nodes.forEach((n, i) => {
      const wrap = document.createElement("div");
      wrap.className = "viz-node-wrap";
      wrap.id = "node-" + n.id;
      wrap.innerHTML =
        '<div class="viz-node viz-sll-node">' +
          '<div class="viz-node-data">' + n.data + '</div>' +
          '<div class="viz-node-next">0x' + (i < 3 ? (102 + i) : 101) + '</div>' +
        '</div>' +
        '<div class="viz-node-addr">' + n.addr + '</div>' +
        '<div class="viz-node-index" style="text-align:center;font-size:11px;font-weight:500;color:#94a3b8;margin-top:4px;letter-spacing:0.02em;user-select:none">' + i + '</div>';
      listRow.appendChild(wrap);
      if (i < 3) {
        const arrow = document.createElement("div");
        arrow.className = "viz-arrow";
        arrow.innerHTML = '<span class="viz-arrow-fwd">\u2192</span>';
        listRow.appendChild(arrow);
      }
      n.el = wrap.querySelector('.viz-node');
    });
    positionInitialPointers();
  }

  function positionInitialPointers() {
    void listRow.offsetWidth;
    const n1Rect        = nodes[0].el.getBoundingClientRect();
    const n4Rect        = nodes[3].el.getBoundingClientRect();
    const containerRect = listRow.parentElement.getBoundingClientRect();

    headPointer.style.left  = (n1Rect.left - containerRect.left + n1Rect.width / 2) + "px";
    headPointer.style.top   = (n1Rect.top  - containerRect.top  - 45) + "px";
    tailPointer.style.right = 'auto';
    tailPointer.style.left  = (n4Rect.left - containerRect.left + n4Rect.width / 2) + "px";
    tailPointer.style.top   = (n4Rect.top  - containerRect.top  - 45) + "px";

    curveSvg.classList.add('visible');
    drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
  }

  // ── Arc helpers ───────────────────────────────────────────────────

// Circular back-link going BELOW the row (tail → head style)
function drawCircularArc(startEl, endEl, pathEl) {
    if (!startEl || !endEl) return;
    const sRect  = startEl.getBoundingClientRect();
    const eRect  = endEl.getBoundingClientRect();
    const cRect  = curveSvg.getBoundingClientRect();
    
    // Origin: Right-center edge of the tail node
    const startX = sRect.right - cRect.left;
    const startY = sRect.top   - cRect.top  + sRect.height / 2;
    
    // Approach target: Left edge of the head node
    const endX   = eRect.left  - cRect.left - 10;
    const endY   = eRect.top   - cRect.top  + eRect.height / 2;
    
    // FIX: The drop depth must be below BOTH nodes so the path doesn't zigzag 
    // when connecting to a node that is positioned lower on the screen.
    const midY   = Math.max(startY, endY) + sRect.height + 25;
    
    // Radius for the rounded corners
    const r = 20;

    // Explicit edges to maintain perfect symmetry for all 4 turnings
    const rightEdge = startX + r * 2;
    const leftEdge  = endX - r * 2;

    // Circuit-board path: Push right, drop down, run left beneath, hook up, push right.
    const d = `
      M ${startX} ${startY}
      L ${rightEdge - r} ${startY}
      Q ${rightEdge} ${startY}, ${rightEdge} ${startY + r}
      L ${rightEdge} ${midY - r}
      Q ${rightEdge} ${midY}, ${rightEdge - r} ${midY}
      L ${leftEdge + r} ${midY}
      Q ${leftEdge} ${midY}, ${leftEdge} ${midY - r}
      L ${leftEdge} ${endY + r}
      Q ${leftEdge} ${endY}, ${leftEdge + r} ${endY}
      L ${endX} ${endY}
    `;

    pathEl.setAttribute("d", d.replace(/\s+/g, " ").trim());
    pathEl.setAttribute("stroke", "#3b6cff");
    pathEl.setAttribute("marker-end", "url(#arrowHeadSmallBlue)"); 
    pathEl.style.opacity = '0.8';
  }

  // BEG mode step 4: newNode (bottom-left area) → head bottom (swoop below)
  function drawForwardArc(startEl, endEl, pathEl) {
    if (!startEl || !endEl) return;
    const sRect  = startEl.getBoundingClientRect();
    const eRect  = endEl.getBoundingClientRect();
    const cRect  = curveSvg.getBoundingClientRect();
    const startX = sRect.right - cRect.left;
    const startY = sRect.top   - cRect.top  + sRect.height / 2;
    const endX   = eRect.left  - cRect.left + eRect.width  / 2;
    const endY   = eRect.bottom - cRect.top + 6;
    const d = `M ${startX} ${startY} C ${startX + 45} ${startY}, ${endX} ${endY + 45}, ${endX} ${endY}`;
    pathEl.setAttribute("d", d);
    pathEl.setAttribute("stroke", "#3b6cff");
    pathEl.setAttribute("marker-end", "url(#arrowHead)");
  }

  // END mode step 4: newNode (right of tail) → head top (arc ABOVE the list)
function drawEndForwardArc(newEl, headEl, pathEl) {
  if (!newEl || !headEl) return;
  const sRect  = newEl.getBoundingClientRect();
  const eRect  = headEl.getBoundingClientRect();
  const cRect  = curveSvg.getBoundingClientRect();

  // Origin: Right-center edge of the newNode
  const startX = sRect.right - cRect.left;
  const startY = sRect.top   - cRect.top  + sRect.height / 2;

  // Approach target: Left edge of the head node, elevated ABOVE the center
  const endX   = eRect.left  - cRect.left - 10;
  const endY   = eRect.top   - cRect.top  + (eRect.height * 0.25);

  // Peak altitude for the perfectly horizontal traverse
  const peakY  = eRect.top - cRect.top - 55;

  // Tighter right boundary to prevent screen overflow (only 35px out)
  const rightEdge = startX + 35;
  
  // Overshoot left boundary to mirror the bottom pointer's symmetry
  const leftEdge  = endX - 45;
  
  // Radius for the rounded corners
  const r = 20;

  // Geometric path: Lines (L) for straight edges, Quadratic Bezier (Q) for rounded 90-degree corners
  const d = `
    M ${startX} ${startY}
    L ${rightEdge - r} ${startY}
    Q ${rightEdge} ${startY}, ${rightEdge} ${startY - r}
    L ${rightEdge} ${peakY + r}
    Q ${rightEdge} ${peakY}, ${rightEdge - r} ${peakY}
    L ${leftEdge + r} ${peakY}
    Q ${leftEdge} ${peakY}, ${leftEdge} ${peakY + r}
    L ${leftEdge} ${endY - r}
    Q ${leftEdge} ${endY}, ${leftEdge + r} ${endY}
    L ${endX} ${endY}
  `;

  // Remove the extra whitespace from the template literal for standard SVG syntax
  pathEl.setAttribute("d", d.replace(/\s+/g, " ").trim());
  pathEl.setAttribute("stroke", "#10b981"); // Emerald green
  pathEl.setAttribute("marker-end", "url(#arrowHeadGreen)");
}

  // END mode step 5: tail (node4) → newNode (straight connect right-to-left)
// END mode step 5: tail (node4) → newNode (straight connect right-to-left)
  function drawTailToNewArc(tailEl, newEl, pathEl) {
    if (!tailEl || !newEl) return;
    const sRect  = tailEl.getBoundingClientRect();
    const eRect  = newEl.getBoundingClientRect();
    const cRect  = curveSvg.getBoundingClientRect();
    
    // Origin: Right-center edge of the tail node
    const startX = sRect.right - cRect.left;
    const startY = sRect.top   - cRect.top  + sRect.height / 2;
    
    // Target: Left-center edge of the new node
    // Changed to -10 so the line stops earlier and makes room for the smaller arrow to sit flush
    const endX   = eRect.left  - cRect.left - 10;
    const endY   = eRect.top   - cRect.top  + eRect.height / 2;

    // Midpoint for the vertical drop to prevent control points from crossing
    const midX   = startX + (endX - startX) / 2;
    const r      = 10; // Radius for the smooth corners

    // Circuit-board path: Right -> Curve Down -> Drop -> Curve Right -> Right
    const d = `
      M ${startX} ${startY}
      L ${midX - r} ${startY}
      Q ${midX} ${startY}, ${midX} ${startY + r}
      L ${midX} ${endY - r}
      Q ${midX} ${endY}, ${midX + r} ${endY}
      L ${endX} ${endY}
    `;

    pathEl.setAttribute("d", d.replace(/\s+/g, " ").trim());
    pathEl.setAttribute("stroke", "#3b6cff");
    // Updated to use the new small blue marker!
    pathEl.setAttribute("marker-end", "url(#arrowHeadSmallBlue)");
  }

  // ── Animated draw-on + traveling dot ─────────────────────────────
  function animatePath(pathEl, svgEl, color, onComplete) {
    pathEl.style.opacity = '1';
    let len;
    try { len = pathEl.getTotalLength(); } catch(e) { len = 400; }
    if (!len || len < 1) len = 400;

    pathEl.style.transition       = 'none';
    pathEl.style.strokeDasharray  = len + 'px';
    pathEl.style.strokeDashoffset = len + 'px';

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', '5');
    dot.setAttribute('fill', color);
    dot.classList.add('viz-travel-dot');
    dot.style.filter = 'drop-shadow(0 0 5px ' +
      (color === '#3b6cff' ? 'rgba(59,108,255,0.75)' : 'rgba(22,163,74,0.75)') + ')';
    svgEl.appendChild(dot);

    const duration = 850;
    let startTime  = null;

    function animateDot(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      try {
        const pt = pathEl.getPointAtLength(eased * len);
        dot.setAttribute('cx', pt.x);
        dot.setAttribute('cy', pt.y);
      } catch(e) {}
      if (progress < 1) {
        requestAnimationFrame(animateDot);
      } else {
        setTimeout(() => {
          if (dot.parentNode) dot.parentNode.removeChild(dot);
          if (onComplete) onComplete();
        }, 150);
      }
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pathEl.style.transition       = `stroke-dashoffset ${duration / 1000}s cubic-bezier(0.4,0,0.2,1)`;
        pathEl.style.strokeDashoffset = '0px';
        requestAnimationFrame(animateDot);
      });
    });
  }

  function showPathInstant(pathEl) {
    pathEl.style.transition       = 'none';
    pathEl.style.strokeDasharray  = '';
    pathEl.style.strokeDashoffset = '';
    pathEl.style.opacity          = '1';
  }

  function hidePath(pathEl) {
    pathEl.style.strokeDasharray  = '';
    pathEl.style.strokeDashoffset = '';
    pathEl.style.opacity          = '0';
  }

  // ── Position newNode near tail (END mode) ─────────────────────────
  function positionNewNodeNearTail() {
    const canvas  = listRow.parentElement;
    const n4Rect  = nodes[3].el.getBoundingClientRect();
    const cr      = canvas.getBoundingClientRect();
    // Mirror BEG mode: left = n1.left - 40, bottom = 120px
    // END: right of tail + same gap, same bottom anchor
    newNodeWrap.style.left      = (n4Rect.right - cr.left + 40) + 'px';
    newNodeWrap.style.top       = '';
    newNodeWrap.style.bottom    = '120px';
    newNodeWrap.style.transform = 'none';
  }

  function scrollToTail() {
    const canvas = listRow.parentElement;
    if (canvas) setTimeout(() => canvas.scrollTo({ left: canvas.scrollWidth, behavior: 'smooth' }), 100);
  }

  function scrollToHead() {
    const canvas = listRow.parentElement;
    if (canvas) setTimeout(() => canvas.scrollTo({ left: 0, behavior: 'smooth' }), 100);
  }

  // ── Restore tail pointer to node 4 ───────────────────────────────
  function restoreTailToNode4() {
    const n4Rect = nodes[3].el.getBoundingClientRect();
    const cr     = listRow.parentElement.getBoundingClientRect();
    tailPointer.style.right = 'auto';
    tailPointer.style.left  = (n4Rect.left - cr.left + n4Rect.width / 2) + 'px';
    tailPointer.style.top   = (n4Rect.top  - cr.top  - 45) + 'px';
  }

  // ── Build final list DOM ──────────────────────────────────────────
  function buildFinalList(finalNodes) {
    const renderedEls = [];
    finalNodes.forEach((n, i) => {
      const wrap = document.createElement("div");
      wrap.className = "viz-node-wrap";
      wrap.innerHTML =
        '<div class="viz-node viz-sll-node viz-node-entering">' +
          '<div class="viz-node-data">' + n.data     + '</div>' +
          '<div class="viz-node-next">' + n.nextAddr  + '</div>' +
        '</div>' +
        '<div class="viz-node-addr">' + n.addr + '</div>' +
        '<div class="viz-node-index" style="text-align:center;font-size:11px;font-weight:500;color:#94a3b8;margin-top:4px;letter-spacing:0.02em;user-select:none">' + i + '</div>';
      const nodeEl = wrap.querySelector('.viz-node');
      nodeEl.style.animationDelay = (i * 60) + 'ms';
      listRow.appendChild(wrap);
      if (i < finalNodes.length - 1) {
        const arrow = document.createElement("div");
        arrow.className = "viz-arrow";
        arrow.innerHTML = '<span class="viz-arrow-fwd">\u2192</span>';
        listRow.appendChild(arrow);
      }
      renderedEls.push(nodeEl);
    });
    return renderedEls;
  }

  // ════════════════════════════════════════════════════════════════
  //  STEP EXPLANATION DATA
  // ════════════════════════════════════════════════════════════════
  const STEPS_BEG = [
    {
      explainStepNum: 'Initial State',
      explainTitle:   'Starting Point',
      explainText:    'We have a circular singly linked list: <strong>1 → 2 → 3 → 4 → (back to 1)</strong>.<br><br>Each node has a <strong>data</strong> field and a <strong>next</strong> pointer. TAIL\'s next wraps back to HEAD. Goal: insert a new node at the very beginning.',
      whatBody:       'HEAD points to node 1. TAIL (node 4) next points back to node 1 — forming the circle. We call <code>insertAtBeginning(value)</code>.',
      conceptText:    '💡 Circular SLL: no NULL at tail — tail→next always points back to head!'
    },
    {
      explainStepNum: 'Step 1 of 7',
      explainTitle:   'Allocate Memory',
      explainText:    '<code>malloc(sizeof(struct node))</code> reserves heap memory for a new node.<br><br>The new node has two fields: <strong>data</strong> and <strong>next</strong>.',
      whatBody:       'A new node appears below the list near HEAD. Fields are uninitialized (?). Memory address 0x100 assigned.',
      conceptText:    '🧠 malloc gives us a raw chunk of memory — we must initialize all fields ourselves.'
    },
    {
      explainStepNum: 'Step 2 of 7',
      explainTitle:   'Assign Data Value',
      explainText:    '<code>newnode→data = data;</code> writes the value into the data field of the new node.',
      whatBody:       'The new node\'s DATA field updates from <strong>?</strong> to the inserted value. next still unset.',
      conceptText:    '📝 Always set data first — pointer fields come next in a deliberate order.'
    },
    {
      explainStepNum: 'Step 3 of 7',
      explainTitle:   'Check: head == NULL?',
      explainText:    '<code>if (head == NULL)</code> — is the list empty?<br><br>Our list has 4 nodes, so <strong>head != NULL</strong>. We take the else branch.',
      whatBody:       'The condition box shows: head == NULL → FALSE — list has nodes. We proceed to the else branch.',
      conceptText:    '🔗 If list were empty, we\'d set head = tail = newnode and newnode→next = newnode (self-loop).'
    },
    {
      explainStepNum: 'Step 4 of 7',
      explainTitle:   'newNode→next = head',
      explainText:    '<code>newnode→next = head;</code> — the new node\'s NEXT pointer now points to the current head (node 1).<br><br>This stitches the new node into the chain at the front.',
      whatBody:       'A blue arc draws from newNode down to node 1 (head). newNode→next field updates to 0x101.',
      conceptText:    '⚠️ Do this BEFORE moving head — after head = newNode, you\'d lose the reference to the old first node!'
    },
    {
      explainStepNum: 'Step 5 of 7',
      explainTitle:   'tail→next = newNode',
      explainText:    '<code>tail→next = newnode;</code> — the tail\'s NEXT pointer (which was pointing to old head) now points to the new node.<br><br>This keeps the circular link intact — the circle now runs through newNode.',
      whatBody:       'The circular arc redraws from node 4 (tail) to newNode. Node 4\'s next field updates to 0x100.',
      conceptText:    '🔄 Critical for circular list! Tail must always point to the new head — otherwise circle breaks.'
    },
    {
      explainStepNum: 'Step 6 of 7',
      explainTitle:   'head = newNode',
      explainText:    '<code>head = newnode;</code> — HEAD now points to the newly inserted node.<br><br>newNode is now the first node in the circular list.',
      whatBody:       'HEAD pointer slides from node 1 to newNode. The circular chain is: newNode → 1 → 2 → 3 → 4 → newNode.',
      conceptText:    '➡️ HEAD always points to the first node. Moving it last ensures the chain was already wired up first.'
    },
    {
      explainStepNum: 'Step 7 of 7',
      explainTitle:   'Insertion Complete!',
      explainText:    'Node successfully inserted at the beginning.<br><br>List is now: <strong>newNode → 1 → 2 → 3 → 4 → (back to newNode)</strong>',
      whatBody:       'The new node snaps into the list at position 1. All nodes animate in. Circular link redrawn from tail to new head.',
      conceptText:    '✅ Insert at beginning is O(1) — just pointer updates, no traversal needed!'
    }
  ];

  const STEPS_END = [
    {
      explainStepNum: 'Initial State',
      explainTitle:   'Starting Point',
      explainText:    'We have a circular singly linked list: <strong>1 → 2 → 3 → 4 → (back to 1)</strong>.<br><br>Each node has a <strong>data</strong> field and a <strong>next</strong> pointer. Goal: insert a new node at the very end.',
      whatBody:       'HEAD points to node 1. TAIL (node 4) next points back to node 1. We call <code>insertAtEnd(value)</code>.',
      conceptText:    '💡 Circular SLL: tail→next always wraps to head — inserting at end means rewiring this circular link!'
    },
    {
      explainStepNum: 'Step 1 of 7',
      explainTitle:   'Allocate Memory',
      explainText:    '<code>malloc(sizeof(struct node))</code> reserves heap memory for a new node.<br><br>The new node has two fields: <strong>data</strong> and <strong>next</strong>.',
      whatBody:       'A new node appears to the right of the tail. Fields are uninitialized (?). Memory address 0x105 assigned.',
      conceptText:    '🧠 malloc gives us a raw chunk of memory — we must initialize all fields ourselves.'
    },
    {
      explainStepNum: 'Step 2 of 7',
      explainTitle:   'Assign Data Value',
      explainText:    '<code>newnode→data = data;</code> writes the value into the data field of the new node.',
      whatBody:       'The new node\'s DATA field updates from <strong>?</strong> to the inserted value. next still unset.',
      conceptText:    '📝 Always set data first — pointer fields come next in a deliberate order.'
    },
    {
      explainStepNum: 'Step 3 of 7',
      explainTitle:   'Check: head == NULL?',
      explainText:    '<code>if (head == NULL)</code> — is the list empty?<br><br>Our list has 4 nodes, so <strong>head != NULL</strong>. We take the else branch.',
      whatBody:       'The condition box shows: head == NULL → FALSE — list has nodes. We proceed to the else branch.',
      conceptText:    '🔗 If list were empty, we\'d set head = tail = newnode and newnode→next = newnode (self-loop).'
    },
    {
      explainStepNum: 'Step 4 of 7',
      explainTitle:   'newNode→next = head',
      explainText:    '<code>newnode→next = head;</code> — the new node\'s NEXT pointer points to the current head (node 1).<br><br>Since it will become the new tail, it must circle back to head.',
      whatBody:       'A green arc draws from newNode up and over to node 1 (head). newNode→next field updates to 0x101.',
      conceptText:    '🔄 New tail must point to head to maintain the circular property — set this BEFORE moving tail!'
    },
    {
      explainStepNum: 'Step 5 of 7',
      explainTitle:   'tail→next = newNode',
      explainText:    '<code>tail→next = newnode;</code> — the old tail (node 4) now points forward to newNode instead of wrapping to head.<br><br>This inserts newNode at the end of the chain.',
      whatBody:       'A blue arc animates from node 4 (old tail) to newNode. Node 4\'s next field updates to 0x105.',
      conceptText:    '⚠️ Wire tail→next to newNode AFTER setting newNode→next to head — order matters!'
    },
    {
      explainStepNum: 'Step 6 of 7',
      explainTitle:   'tail = newNode',
      explainText:    '<code>tail = newnode;</code> — TAIL now points to the newly inserted node.<br><br>newNode is now the last node in the circular list.',
      whatBody:       'TAIL pointer slides from node 4 to newNode. The circular chain is: 1 → 2 → 3 → 4 → newNode → (back to 1).',
      conceptText:    '➡️ Always update tail last — the previous steps already wired up all the pointers correctly.'
    },
    {
      explainStepNum: 'Step 7 of 7',
      explainTitle:   'Insertion Complete!',
      explainText:    'Node successfully inserted at the end.<br><br>List is now: <strong>1 → 2 → 3 → 4 → newNode → (back to 1)</strong>',
      whatBody:       'The new node snaps into the list at the last position. All nodes animate in. Circular link redrawn from new tail to head.',
      conceptText:    '✅ Insert at end is O(1) with a tail pointer — just pointer updates, no traversal needed!'
    }
  ];

  // ════════════════════════════════════════════════════════════════
  //  STEPS_MID — placeholder array; actual content built dynamically
  //  by getMidStepData() / updateUI_mid(). This prevents a
  //  ReferenceError in updateUI()'s generic step-data lookup.
  // ════════════════════════════════════════════════════════════════
  const STEPS_MID = [];   // updateUI_mid overrides the panel directly

  // ════════════════════════════════════════════════════════════════
  //  MASTER UPDATE — dispatches to mode-specific handler
  // ════════════════════════════════════════════════════════════════
  function updateUI() {
    // Ensure mid plan exists before any mid-mode rendering
    if (mode === 'insert-middle' && !MID_PLAN.length) buildMidPlan();

    document.getElementById("headerStepNum").innerText = currentStep;

    stepItems.forEach((item, i) => {
      item.classList.remove('viz-step-done', 'viz-step-active', 'viz-step-upcoming');
      if      (i + 1 < currentStep)  item.classList.add('viz-step-done');
      else if (i + 1 === currentStep) item.classList.add('viz-step-active');
      else                            item.classList.add('viz-step-upcoming');
    });

    progressDots.forEach((dot, i) => {
      dot.classList.remove('viz-dot-active', 'viz-dot-done');
      if      (i === currentStep) dot.classList.add('viz-dot-active');
      else if (i < currentStep)   dot.classList.add('viz-dot-done');
    });

    highlightCode(STEP_TO_LINE[currentStep]);

    // ── Update explanation card ──────────────────────────────────
    const stepData = mode === 'insert-middle'
      ? getMidStepData(currentStep)
      : (mode === 'insert-end' ? STEPS_END : STEPS_BEG)[currentStep];
    if (stepData) {
      const elStepNum   = document.getElementById('explainStepNum');
      const elTitle     = document.getElementById('explainTitle');
      const elText      = document.getElementById('explainText');
      const elWhat      = document.getElementById('whatBody');
      const elConcept   = document.getElementById('conceptText');
      const elCard      = document.getElementById('explainCard');
      if (elCard) { elCard.classList.remove('updating'); void elCard.offsetWidth; elCard.classList.add('updating'); }
      if (elStepNum) elStepNum.textContent  = stepData.explainStepNum;
      if (elTitle)   elTitle.textContent    = stepData.explainTitle;
      // For middle mode, template resolution happens inside updateUI_mid; set raw here as fallback
      if (elText)    elText.innerHTML       = stepData.explainText;
      if (elWhat)    elWhat.innerHTML       = stepData.whatBody;
      if (elConcept) elConcept.textContent  = stepData.conceptText;
    }

    btnPrev.disabled = (currentStep === 0) || (currentStep === totalSteps);
    btnNext.disabled = (currentStep === totalSteps);

    if (mode === 'insert-end')    updateUI_end();
    else if (mode === 'insert-middle') updateUI_mid();
    else                          updateUI_beg();
  }

  // ════════════════════════════════════════════════════════════════
  //  INSERT AT BEGINNING
  // ════════════════════════════════════════════════════════════════
  function updateUI_beg() {
    const NEW_ADDR  = NEW_NODE_ADDR_BEG;
    const newNodeEl = newNodeWrap.querySelector('.viz-node');

    if (currentStep === 0) {
      newNodeWrap.classList.remove('visible');
      hidePath(curvePath);
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");
      hideConditionBox();
      const n4n = nodes[3].el.querySelector('.viz-node-next');
      if (n4n) n4n.innerText = "0x101";
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 1) {
      newNodeData.innerText = "?";
      newNodeAddr.innerText = NEW_ADDR;
      document.getElementById("newNodeNextField").innerText = "?";
      const n1r = nodes[0].el.getBoundingClientRect();
      const cr  = listRow.parentElement.getBoundingClientRect();
      newNodeWrap.style.left      = (n1r.left - cr.left - 40) + "px";
      newNodeWrap.style.top       = '';
      newNodeWrap.style.bottom    = "120px";
      newNodeWrap.style.transform = '';
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      hideConditionBox();
      const n4n1 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n1) n4n1.innerText = "0x101";
      headPointer.style.left = (n1r.left - cr.left + n1r.width / 2) + "px";
      headPointer.style.top  = (n1r.top  - cr.top  - 45) + "px";
      restoreTailToNode4();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 2) {
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "?";
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      hideConditionBox();
      const n4n2 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n2) n4n2.innerText = "0x101";
      const n1r2 = nodes[0].el.getBoundingClientRect();
      const cr2  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r2.left - cr2.left + n1r2.width / 2) + "px";
      headPointer.style.top  = (n1r2.top  - cr2.top  - 45) + "px";
      restoreTailToNode4();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 3) {
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "?";
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      showConditionBox();
      const n4n3 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n3) n4n3.innerText = "0x101";
      const n1r3 = nodes[0].el.getBoundingClientRect();
      const cr3  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r3.left - cr3.left + n1r3.width / 2) + "px";
      headPointer.style.top  = (n1r3.top  - cr3.top  - 45) + "px";
      restoreTailToNode4();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 4) {
      // newNode->next = head — animated blue arc
      hideConditionBox();
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "0x101";
      const n4n4 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n4) n4n4.innerText = "0x101";
      const n1r4 = nodes[0].el.getBoundingClientRect();
      const cr4  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r4.left - cr4.left + n1r4.width / 2) + "px";
      headPointer.style.top  = (n1r4.top  - cr4.top  - 45) + "px";
      restoreTailToNode4();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      hidePath(curvePath);
      drawForwardArc(newNodeEl, nodes[0].el, curvePath);
      animatePath(curvePath, curveSvg, '#3b6cff');

    } else if (currentStep === 5) {
      // tail->next = newNode — animate circular arc to newNode
      hideConditionBox();
      const n4n5 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n5) n4n5.innerText = NEW_ADDR;
      document.getElementById("newNodeNextField").innerText = "0x101";
      const n1r5 = nodes[0].el.getBoundingClientRect();
      const cr5  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r5.left - cr5.left + n1r5.width / 2) + "px";
      headPointer.style.top  = (n1r5.top  - cr5.top  - 45) + "px";
      restoreTailToNode4();
      // Forward arc static
      drawForwardArc(newNodeEl, nodes[0].el, curvePath);
      showPathInstant(curvePath);
      // Animate new circular arc tail → newNode
      drawCircularArc(nodes[3].el, newNodeEl, circularCurvePath);
      circularCurvePath.style.strokeDasharray  = '';
      circularCurvePath.style.strokeDashoffset = '';
      animatePath(circularCurvePath, curveSvg, '#3b6cff');

    } else if (currentStep === 6) {
      // head = newNode — move head pointer
      hideConditionBox();
      const cr6     = listRow.parentElement.getBoundingClientRect();
      const newR6   = newNodeEl.getBoundingClientRect();
      headPointer.style.left = (newR6.left - cr6.left + newR6.width / 2) + "px";
      headPointer.style.top  = (newR6.top  - cr6.top  - 45) + "px";
      const n4n6 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n6) n4n6.innerText = NEW_ADDR;
      document.getElementById("newNodeNextField").innerText = "0x101";
      restoreTailToNode4();
      drawForwardArc(newNodeEl, nodes[0].el, curvePath);
      showPathInstant(curvePath);
      drawCircularArc(nodes[3].el, newNodeEl, circularCurvePath);
      circularCurvePath.style.strokeDasharray  = '';
      circularCurvePath.style.strokeDashoffset = '';

    } else if (currentStep === 7) {
      // Final — prepend new node
      hideConditionBox();
      hidePath(curvePath);
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");
      listRow.innerHTML = "";
      const finalNodes = [
        { data: insertValue, addr: NEW_ADDR,  nextAddr: "0x101" },
        { data: 1,           addr: "0x101",   nextAddr: "0x102" },
        { data: 2,           addr: "0x102",   nextAddr: "0x103" },
        { data: 3,           addr: "0x103",   nextAddr: "0x104" },
        { data: 4,           addr: "0x104",   nextAddr: NEW_ADDR }
      ];
      const els = buildFinalList(finalNodes);
      newNodeWrap.classList.remove('visible');
      void listRow.offsetWidth;
      const cr7 = listRow.parentElement.getBoundingClientRect();
      const fR  = els[0].getBoundingClientRect();
      const lR  = els[els.length - 1].getBoundingClientRect();
      headPointer.style.left  = (fR.left - cr7.left + fR.width  / 2) + "px";
      headPointer.style.top   = (fR.top  - cr7.top  - 45) + "px";
      tailPointer.style.right = 'auto';
      tailPointer.style.left  = (lR.left - cr7.left + lR.width  / 2) + "px";
      tailPointer.style.top   = (lR.top  - cr7.top  - 45) + "px";
      drawCircularArc(els[els.length - 1], els[0], circularCurvePath);
    }
  }

  // ════════════════════════════════════════════════════════════════
  //  INSERT AT END
  // ════════════════════════════════════════════════════════════════
  function updateUI_end() {
    const NEW_ADDR  = NEW_NODE_ADDR_END;
    const newNodeEl = newNodeWrap.querySelector('.viz-node');

    if (currentStep === 0) {
      listRow.style.marginLeft = '';
      newNodeWrap.classList.remove('visible');
      hidePath(curvePath);
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");
      hideConditionBox();
      const n4n = nodes[3].el.querySelector('.viz-node-next');
      if (n4n) n4n.innerText = "0x101";
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 1) {
      // malloc — new node appears NEAR TAIL, auto-scroll right
      newNodeData.innerText = "?";
      newNodeAddr.innerText = NEW_ADDR;
      document.getElementById("newNodeNextField").innerText = "?";
      positionNewNodeNearTail();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      hideConditionBox();
      const n4n1 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n1) n4n1.innerText = "0x101";
      const n1r1 = nodes[0].el.getBoundingClientRect();
      const cr1  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r1.left - cr1.left + n1r1.width / 2) + "px";
      headPointer.style.top  = (n1r1.top  - cr1.top  - 45) + "px";
      restoreTailToNode4();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      scrollToTail();

    } else if (currentStep === 2) {
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "?";
      positionNewNodeNearTail();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      hideConditionBox();
      const n4n2 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n2) n4n2.innerText = "0x101";
      const n1r2 = nodes[0].el.getBoundingClientRect();
      const cr2  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r2.left - cr2.left + n1r2.width / 2) + "px";
      headPointer.style.top  = (n1r2.top  - cr2.top  - 45) + "px";
      restoreTailToNode4();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 3) {
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "?";
      positionNewNodeNearTail();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      showConditionBox();
      const n4n3 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n3) n4n3.innerText = "0x101";
      const n1r3 = nodes[0].el.getBoundingClientRect();
      const cr3  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r3.left - cr3.left + n1r3.width / 2) + "px";
      headPointer.style.top  = (n1r3.top  - cr3.top  - 45) + "px";
      restoreTailToNode4();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 4) {
      // newNode->next = head — animated arc ABOVE list
      hideConditionBox();
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "0x101";
      positionNewNodeNearTail();
      newNodeWrap.classList.add('visible');
      const n4n4 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n4) n4n4.innerText = "0x101";
      const n1r4 = nodes[0].el.getBoundingClientRect();
      const cr4  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r4.left - cr4.left + n1r4.width / 2) + "px";
      headPointer.style.top  = (n1r4.top  - cr4.top  - 45) + "px";
      restoreTailToNode4();
      // Old circular arc (tail→head) stays static
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      showPathInstant(circularCurvePath);
      // Animate: newNode → head (above)
      hidePath(curvePath);
      drawEndForwardArc(newNodeEl, nodes[0].el, curvePath);
      animatePath(curvePath, curveSvg, '#10b981');

    } else if (currentStep === 5) {
      // tail->next = newNode — fade old circular arc, animate tail→newNode
      hideConditionBox();
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "0x101";
      positionNewNodeNearTail();
      newNodeWrap.classList.add('visible');
      const n4n5 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n5) n4n5.innerText = NEW_ADDR;
      const n1r5 = nodes[0].el.getBoundingClientRect();
      const cr5  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r5.left - cr5.left + n1r5.width / 2) + "px";
      headPointer.style.top  = (n1r5.top  - cr5.top  - 45) + "px";
      restoreTailToNode4();
      // Forward arc (newNode→head) stays static
      drawEndForwardArc(newNodeEl, nodes[0].el, curvePath);
      showPathInstant(curvePath);
      // Animate: tail (node4) → newNode
      drawTailToNewArc(nodes[3].el, newNodeEl, circularCurvePath);
      circularCurvePath.style.strokeDasharray  = '';
      circularCurvePath.style.strokeDashoffset = '';
      animatePath(circularCurvePath, curveSvg, '#3b6cff');

    } else if (currentStep === 6) {
      // tail = newNode — move TAIL pointer to newNode
      hideConditionBox();
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "0x101";
      positionNewNodeNearTail();
      newNodeWrap.classList.add('visible');
      const n4n6 = nodes[3].el.querySelector('.viz-node-next');
      if (n4n6) n4n6.innerText = NEW_ADDR;
      const n1r6 = nodes[0].el.getBoundingClientRect();
      const cr6  = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1r6.left - cr6.left + n1r6.width / 2) + "px";
      headPointer.style.top  = (n1r6.top  - cr6.top  - 45) + "px";
      // Move TAIL → newNode
      const newR6 = newNodeEl.getBoundingClientRect();
      tailPointer.style.right = 'auto';
      tailPointer.style.left  = (newR6.left - cr6.left + newR6.width / 2) + "px";
      tailPointer.style.top   = (newR6.top  - cr6.top  - 45) + "px";
      // Both arcs static
      drawEndForwardArc(newNodeEl, nodes[0].el, curvePath);
      showPathInstant(curvePath);
      drawTailToNewArc(nodes[3].el, newNodeEl, circularCurvePath);
      circularCurvePath.style.strokeDasharray  = '';
      circularCurvePath.style.strokeDashoffset = '';

    } else if (currentStep === 7) {
      // Final — append new node to list
      hideConditionBox();
      hidePath(curvePath);
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");
      listRow.innerHTML = "";
      listRow.style.marginLeft = '-60px'; // shift left so full 5-node list is visible
      const finalNodes = [
        { data: 1,           addr: "0x101", nextAddr: "0x102" },
        { data: 2,           addr: "0x102", nextAddr: "0x103" },
        { data: 3,           addr: "0x103", nextAddr: "0x104" },
        { data: 4,           addr: "0x104", nextAddr: NEW_ADDR },
        { data: insertValue, addr: NEW_ADDR, nextAddr: "0x101" }
      ];
      const els = buildFinalList(finalNodes);
      newNodeWrap.classList.remove('visible');
      void listRow.offsetWidth;
      const cr7 = listRow.parentElement.getBoundingClientRect();
      const fR  = els[0].getBoundingClientRect();
      const lR  = els[els.length - 1].getBoundingClientRect();
      headPointer.style.left  = (fR.left - cr7.left + fR.width  / 2) + "px";
      headPointer.style.top   = (fR.top  - cr7.top  - 45) + "px";
      tailPointer.style.right = 'auto';
      tailPointer.style.left  = (lR.left - cr7.left + lR.width  / 2) + "px";
      tailPointer.style.top   = (lR.top  - cr7.top  - 45) + "px";
      drawCircularArc(els[els.length - 1], els[0], circularCurvePath);
      scrollToHead();
    }
  }

  // ── Reset ─────────────────────────────────────────────────────────
  function resetAll() {
    currentStep = 0;
    hideLoopBox();
    removeTempPointer();
    initNodes();
    updateUI();
  }

  // ── Confirm / Enter ───────────────────────────────────────────────
  function confirmAndStart() {
    const val = parseInt(valueInput.value);
    if (!isNaN(val)) insertValue = val;

    if (mode === 'insert-middle') {
      const posInput = document.getElementById('vizPosInput');
      if (posInput && posInput.value !== '') {
        const p = parseInt(posInput.value);
        // p is 0-based index shown to user; valid range 1..2 for 4-node list
        if (isNaN(p) || p < 1 || p > nodes.length - 1) {
          showToast('⚠️ Enter index 1 to ' + (nodes.length - 1) + ' for middle insertion');
          return;
        }
        insertPos = p; // 0-based index of node AFTER which we insert
      }
      buildMidPlan(); // rebuild dynamic step plan for this insertPos
    }

    currentStep = 0;
    initNodes();
    updateUI();
    currentStep = 1;
    updateUI();
  }

  btnConfirm.addEventListener("click", confirmAndStart);
  valueInput.addEventListener("keydown", e => { if (e.key === "Enter") confirmAndStart(); });
  btnNext.addEventListener("click",  () => { if (currentStep < totalSteps) { currentStep++; updateUI(); } });
  btnPrev.addEventListener("click",  () => { if (currentStep > 0)          { currentStep--; updateUI(); } });
  btnReset.addEventListener("click", () => { hideLoopBox(); removeTempPointer(); resetAll(); });

  document.addEventListener("keydown", e => {
    if      (e.key === "ArrowRight" && currentStep < totalSteps) { currentStep++; updateUI(); }
    else if (e.key === "ArrowLeft"  && currentStep > 0)          { currentStep--; updateUI(); }
  });

  // ── Init ──────────────────────────────────────────────────────────
  switchCodeBlocks(mode);
  rebuildStepList(mode);
  initNodes();
  updateUI();

  // ════════════════════════════════════════════════════════════════
  //  TOAST HELPER
  // ════════════════════════════════════════════════════════════════
  function showToast(msg) {
    let t = document.getElementById('vizToast');
    if (t) t.parentNode.removeChild(t);
    t = document.createElement('div');
    t.id = 'vizToast';
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#1e293b;color:#fff;font-family:var(--font,"DM Sans",sans-serif);font-size:13px;font-weight:600;padding:10px 20px;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.25);z-index:9999;opacity:0;transition:opacity 0.2s ease;pointer-events:none;white-space:nowrap';
    document.body.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => { t.style.opacity = '1'; }));
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 220); }, 2800);
  }

  // ════════════════════════════════════════════════════════════════
  //  LOOP BOX — shows i < pos condition during middle traversal
  // ════════════════════════════════════════════════════════════════
  function updateLoopBox(i, pos) {
    const box = document.getElementById('loopCheckBox') || document.getElementById('conditionBox');
    if (!box) return;
    const isTrue = (i < pos);
    box.classList.remove('loop-true', 'loop-false');
    box.style.opacity = '0';
    // Position: top of canvas, horizontally centred
    box.style.position  = 'absolute';
    box.style.top       = '16px';
    box.style.bottom    = 'auto';
    box.style.left      = '50%';
    box.style.transform = 'translateX(-50%)';
    box.style.display = 'block';
    void box.offsetWidth;
    box.innerHTML =
      'i=' + i + ' &lt; pos=' + pos +
      ' &nbsp;&rarr;&nbsp; ' +
      '<span style="font-weight:700">' + (isTrue ? '✓ TRUE — loop runs' : '✗ FALSE — exit loop') + '</span>';
    box.style.background   = isTrue ? '#f0fdf4' : '#fff5f5';
    box.style.border       = '2px solid ' + (isTrue ? '#16a34a' : '#ef4444');
    box.style.color        = isTrue ? '#15803d' : '#b91c1c';
    box.classList.add(isTrue ? 'loop-true' : 'loop-false');
    requestAnimationFrame(() => requestAnimationFrame(() => { box.style.opacity = '1'; }));
  }

  function hideLoopBox() {
    const box = document.getElementById('loopCheckBox') || document.getElementById('conditionBox');
    if (!box) return;
    box.style.opacity = '0';
    setTimeout(() => {
      box.style.display = 'none';
      box.classList.remove('loop-true', 'loop-false');
    }, 300);
  }

  // ════════════════════════════════════════════════════════════════
  //  TEMP POINTER — slides between nodes during traversal
  // ════════════════════════════════════════════════════════════════
  let TEMP_PTR_EL = null;

  function createTempPointer() {
    if (!TEMP_PTR_EL) {
      TEMP_PTR_EL = document.createElement('div');
      TEMP_PTR_EL.id = 'tempPointerDynamic';
      TEMP_PTR_EL.style.cssText = 'position:absolute;display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:none;z-index:90;transition:left 0.45s cubic-bezier(0.4,0,0.2,1),top 0.45s cubic-bezier(0.4,0,0.2,1),opacity 0.35s ease;opacity:0';
      TEMP_PTR_EL.innerHTML =
        '<div style="background:#fff0f0;color:#ef4444;font-size:10px;font-weight:700;padding:2px 8px;border-radius:5px;border:1.5px solid #ef4444;letter-spacing:0.04em;line-height:1.4">temp</div>' +
        '<div id="tempAddrDynamic" style="font-size:9px;color:#ef4444;font-weight:600;margin-top:1px">0x...</div>' +
        '<div style="font-size:12px;color:#ef4444;line-height:1;margin-top:1px">↓</div>';
      const canvas = listRow.parentElement;
      if (canvas) canvas.appendChild(TEMP_PTR_EL);
    }
    return TEMP_PTR_EL;
  }

  function removeTempPointer() {
    if (TEMP_PTR_EL) {
      TEMP_PTR_EL.style.opacity = '0';
      setTimeout(() => {
        if (TEMP_PTR_EL && TEMP_PTR_EL.parentNode) TEMP_PTR_EL.parentNode.removeChild(TEMP_PTR_EL);
        TEMP_PTR_EL = null;
      }, 300);
    }
  }

  function placeTempPointerOnNode(nodeIndex) {
    const el     = createTempPointer();
    const canvas = listRow.parentElement;
    if (!canvas) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const wraps = listRow.querySelectorAll('.viz-node-wrap');
        const wrap  = wraps[nodeIndex];
        if (!wrap) return;
        const canvasRect = canvas.getBoundingClientRect();
        const nodeRect   = wrap.querySelector('.viz-node').getBoundingClientRect();
        const cx   = nodeRect.left + nodeRect.width / 2 - canvasRect.left + (canvas.scrollLeft || 0);
        const topY = nodeRect.top - canvasRect.top - 52;
        if (el.style.opacity === '0' || el.style.opacity === '') {
          el.style.transition = 'none';
          el.style.left = (cx - 20) + 'px';
          el.style.top  = topY + 'px';
          void el.offsetWidth;
          el.style.transition = 'left 0.45s cubic-bezier(0.4,0,0.2,1),top 0.45s cubic-bezier(0.4,0,0.2,1),opacity 0.35s ease';
          requestAnimationFrame(() => { el.style.opacity = '1'; });
        } else {
          el.style.left = (cx - 20) + 'px';
          el.style.top  = topY + 'px';
        }
        const addrEl = document.getElementById('tempAddrDynamic');
        if (addrEl) addrEl.textContent = nodes[nodeIndex] ? nodes[nodeIndex].addr : '0x...';
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  //  MID-MODE: position newNode in gap between temp and next node
  // ════════════════════════════════════════════════════════════════
  function midPositionNewNode() {
    const canvas = listRow.parentElement;
    if (!canvas) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const wraps    = listRow.querySelectorAll('.viz-node-wrap');
        const tempWrap = wraps[insertPos - 1]; // node before insertion point (0-based: insertPos-1)
        const nextWrap = wraps[insertPos];     // node after insertion point
        if (!tempWrap || !nextWrap) {
          newNodeWrap.style.left      = '50%';
          newNodeWrap.style.transform = 'translateX(-50%)';
          return;
        }
        const canvasRect  = canvas.getBoundingClientRect();
        const scrollLeft  = canvas.scrollLeft || 0;
        const tempRect    = tempWrap.querySelector('.viz-node').getBoundingClientRect();
        const nextRect    = nextWrap.querySelector('.viz-node').getBoundingClientRect();
        const tempCX = tempRect.left + tempRect.width / 2 - canvasRect.left + scrollLeft;
        const nextCX = nextRect.left + nextRect.width / 2 - canvasRect.left + scrollLeft;
        const gapCX  = (tempCX + nextCX) / 2 + 20; // slight rightward bias
        newNodeWrap.style.left      = gapCX + 'px';
        newNodeWrap.style.transform = 'translateX(-50%)';
        newNodeWrap.style.bottom    = '110px';
        newNodeWrap.style.top       = '';
      });
    });
  }

  // Animate a mid-link SVG path with traveling dot
  function animateMidPath(svg, path, color, onComplete) {
    let len;
    try { len = path.getTotalLength(); } catch(e) { len = 500; }
    if (!len || len < 1) len = 500;
    path.style.transition       = 'none';
    path.style.strokeDasharray  = len + 'px';
    path.style.strokeDashoffset = len + 'px';
    path.style.opacity          = '1';
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', '5');
    dot.setAttribute('fill', color);
    dot.classList.add('viz-travel-dot');
    dot.style.filter = 'drop-shadow(0 0 5px ' + (color === '#10b981' ? 'rgba(16,185,129,0.75)' : 'rgba(59,108,255,0.75)') + ')';
    svg.appendChild(dot);
    const duration = 850;
    let startTime  = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      const prog  = Math.min((ts - startTime) / duration, 1);
      const eased = prog < 0.5 ? 2*prog*prog : 1 - Math.pow(-2*prog+2,2)/2;
      try { const pt = path.getPointAtLength(eased * len); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); } catch(e) {}
      if (prog < 1) { requestAnimationFrame(step); }
      else { setTimeout(() => { if (dot.parentNode) dot.parentNode.removeChild(dot); if (onComplete) onComplete(); }, 150); }
    }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      path.style.transition       = `stroke-dashoffset ${duration/1000}s cubic-bezier(0.4,0,0.2,1)`;
      path.style.strokeDashoffset = '0px';
      requestAnimationFrame(step);
    }));
  }

  // Draw a mid-link SVG path and return it (static or animated)
  function drawMidLink(svg, sx, sy, ex, ey, color, animated, onComplete) {
    // ensure arrowhead marker exists
    let defs = svg.querySelector('defs');
    if (!defs) { defs = document.createElementNS('http://www.w3.org/2000/svg','defs'); svg.prepend(defs); }
    const markerId = 'midArrow_' + color.replace('#','');
    if (!document.getElementById(markerId)) {
      const marker = document.createElementNS('http://www.w3.org/2000/svg','marker');
      marker.setAttribute('id', markerId);
      marker.setAttribute('viewBox','0 0 10 10');
      marker.setAttribute('markerWidth','5');
      marker.setAttribute('markerHeight','5');
      marker.setAttribute('refX','8');
      marker.setAttribute('refY','5');
      marker.setAttribute('orient','auto');
      const mPath = document.createElementNS('http://www.w3.org/2000/svg','path');
      mPath.setAttribute('d','M 0 0 L 10 5 L 0 10 z');
      mPath.setAttribute('fill', color);
      marker.appendChild(mPath);
      defs.appendChild(marker);
    }

    // Dynamically adjust the Y control points based on vertical direction 
    // to prevent tangling and create a beautiful swoop for both lines.
    const isGoingDown = sy < ey;
    const cp1x = sx + 30;
    const cp1y = isGoingDown ? sy + 50 : sy - 50; 
    const cp2x = ex - 40;
    const cp2y = isGoingDown ? ey - 50 : ey + 50;
    
    const d = `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('class','viz-mid-link');
    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width','2.5');
    path.setAttribute('fill','none');
    path.setAttribute('marker-end', 'url(#' + markerId + ')');
    svg.appendChild(path);
    
    if (animated) {
      animateMidPath(svg, path, color, onComplete);
    } else {
      path.style.opacity = '1';
      path.style.strokeDasharray  = '';
      path.style.strokeDashoffset = '';
    }
    return path;
  }

  function clearMidLinks() {
    const old = curveSvg.querySelectorAll('.viz-mid-link');
    old.forEach(el => el.parentNode.removeChild(el));
  }

  // ════════════════════════════════════════════════════════════════
  //  INSERT AT MIDDLE — dynamic step plan
  //
  //  Step plan is built fresh each time insertPos changes.
  //  Each step is an object: { type, codeLine, i (for loop steps) }
  //
  //  Types:
  //   'init'       — step 0: initial state
  //   'malloc'     — step 1
  //   'data'       — step 2
  //   'tempHead'   — step 3: temp = head
  //   'loopTrue'   — loop condition TRUE  (highlight for-line, show TRUE box)
  //   'tempMove'   — loop body            (highlight body-line, move temp 1 node)
  //   'loopFalse'  — loop condition FALSE (highlight for-line, show FALSE box)
  //   'link1'      — newnode->next = temp->next
  //   'link2'      — temp->next = newnode
  //   'circCheck'  — circular link still intact
  //   'done'       — final snap
  // ════════════════════════════════════════════════════════════════

  let MID_PLAN = [];  // built by buildMidPlan()

  function buildMidPlan() {
    // code-line numbers (data-line attr in HTML)
    const LINE_MALLOC  = 1;
    const LINE_DATA    = 2;
    const LINE_TEMP    = 3;
    const LINE_FOR     = 4;
    const LINE_BODY    = 5;
    const LINE_LINK1   = 6;
    const LINE_LINK2   = 7;

    const plan = [];
    plan.push({ type: 'init',      codeLine: null });
    plan.push({ type: 'malloc',    codeLine: LINE_MALLOC });
    plan.push({ type: 'data',      codeLine: LINE_DATA });
    plan.push({ type: 'tempHead',  codeLine: LINE_TEMP });

    // Dynamic loop iterations: i goes from 1 to insertPos-1 (inclusive)
    // Each iteration = loopTrue step + tempMove step
    for (let i = 1; i < insertPos; i++) {
      plan.push({ type: 'loopTrue', codeLine: LINE_FOR,  i: i });
      plan.push({ type: 'tempMove', codeLine: LINE_BODY, i: i, nodeIndex: i }); // after move, temp is at node index i
    }
    // Final loop check: FALSE
    plan.push({ type: 'loopFalse', codeLine: LINE_FOR, i: insertPos });

    plan.push({ type: 'link1',     codeLine: LINE_LINK1 });
    plan.push({ type: 'link2',     codeLine: LINE_LINK2 });
    plan.push({ type: 'done',      codeLine: null });

    MID_PLAN = plan;
    totalSteps = plan.length - 1;  // step 0..totalSteps

    // Build STEP_TO_LINE from plan
    STEP_TO_LINE = plan.map(s => s.codeLine !== undefined ? s.codeLine : null);
  }

  // Build explanation text for current step from plan
  function getMidStepData(stepIndex) {
    const step = MID_PLAN[stepIndex];
    if (!step) return null;
    const total = MID_PLAN.length - 1;
    const num   = stepIndex;

    switch (step.type) {
      case 'init':
        return {
          explainStepNum: 'Initial State',
          explainTitle:   'Starting Point',
          explainText:    'We have a circular singly linked list: <strong>1 → 2 → 3 → 4 → (back to 1)</strong>.<br><br>Goal: insert a new node at position <strong>' + insertPos + '</strong>.',
          whatBody:       'HEAD points to node 1 (index 0). TAIL (node 4) next wraps back to head. We call <code>insertAtMiddle(data, pos)</code>.',
          conceptText:    '💡 Insert at middle is O(n) — we must traverse to find the node at pos-1.'
        };
      case 'malloc':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'Allocate Memory',
          explainText:    '<code>malloc(sizeof(struct node))</code> reserves heap memory for a new node.',
          whatBody:       'A new node appears in the gap area. Fields are uninitialized (?). Memory address 0x105 assigned.',
          conceptText:    '🧠 malloc gives raw memory — every field must be initialized explicitly.'
        };
      case 'data':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'Assign Data Value',
          explainText:    '<code>newnode→data = data;</code> writes the value into the data field.',
          whatBody:       'The new node\'s DATA field updates from <strong>?</strong> to the inserted value.',
          conceptText:    '📝 Set data before touching pointers — cleaner and safer.'
        };
      case 'tempHead':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'temp = head',
          explainText:    '<code>struct node* temp = head;</code> — start traversal from the head.<br><br>temp will walk forward to position <strong>' + (insertPos - 1) + '</strong>.',
          whatBody:       'A <strong>temp</strong> pointer (red) appears above node 1 (index 0, head).',
          conceptText:    '📌 temp starts at head. It will move ' + insertPos + ' step(s) forward.'
        };
      case 'loopTrue':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'Loop: i=' + step.i + ' < pos=' + insertPos + ' → TRUE',
          explainText:    '<code>for (int i = 1; i &lt; pos; i++)</code><br><br>i=' + step.i + ', pos=' + insertPos + '. <strong>' + step.i + ' &lt; ' + insertPos + ' is TRUE</strong> — loop body runs.',
          whatBody:       'Loop condition checked: TRUE. temp will advance to the next node.',
          conceptText:    '🔄 Each TRUE iteration moves temp one node closer to the insertion point.'
        };
      case 'tempMove':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'temp = temp→next',
          explainText:    '<code>temp = temp→next;</code> — loop body executes. temp moves forward one node.',
          whatBody:       'temp slides from index ' + (step.nodeIndex - 1) + ' → index ' + step.nodeIndex + '. i will increment to ' + (step.i + 1) + '.',
          conceptText:    '➡️ temp moves one step forward. i increments.'
        };
      case 'loopFalse':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'Loop: i=' + step.i + ' < pos=' + insertPos + ' → FALSE',
          explainText:    '<code>for (int i = 1; i &lt; pos; i++)</code><br><br>i=' + step.i + ', pos=' + insertPos + '. <strong>' + step.i + ' &lt; ' + insertPos + ' is FALSE</strong> — loop exits.',
          whatBody:       'Loop condition re-checked: FALSE. Loop exits. temp is now at index ' + (insertPos - 1) + ' — the node BEFORE the insertion point.',
          conceptText:    '🎯 temp reached position pos-1. Ready to insert after this node.'
        };
      case 'link1':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'newNode→next = temp→next',
          explainText:    '<code>newnode→next = temp→next;</code> — new node\'s NEXT points to the node AFTER temp.',
          whatBody:       'A blue arc animates from newNode to the successor node. newNode→next field updates.',
          conceptText:    '⚠️ Do this FIRST — once temp→next changes, you\'d lose the reference to the successor!'
        };
      case 'link2':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'temp→next = newNode',
          explainText:    '<code>temp→next = newnode;</code> — temp\'s NEXT now points to the new node.',
          whatBody:       'A blue arc animates from temp to newNode. temp\'s next field updates.',
          conceptText:    '✅ Both pointer assignments done. newNode is now fully linked into the circular list.'
        };
      case 'done':
        return {
          explainStepNum: 'Step ' + num + ' of ' + total,
          explainTitle:   'Insertion Complete!',
          explainText:    'Node successfully inserted at index <strong>' + insertPos + '</strong>.<br><br>List now has 5 nodes, fully circular.',
          whatBody:       'The new node snaps into the list. All nodes animate in. Circular arc redrawn.',
          conceptText:    '✅ Insert at middle complete! O(n) traversal + O(1) pointer rewiring.'
        };
      default: return null;
    }
  }

  // ════════════════════════════════════════════════════════════════
  //  INSERT AT MIDDLE — step animator (dynamic)
  // ════════════════════════════════════════════════════════════════
  function updateUI_mid() {
    // Rebuild plan if not built yet or if plan length doesn't match
    if (!MID_PLAN.length) buildMidPlan();

    const NEW_ADDR  = NEW_NODE_ADDR_MID;
    const newNodeEl = newNodeWrap.querySelector('.viz-node');
    const step      = MID_PLAN[currentStep];
    if (!step) return;

    // Note: explanation panel is updated by updateUI() via getMidStepData().

    // Shared helpers for this function
    function baseSetup(showLoopBox) {
      newNodeData.innerText = (currentStep >= 2) ? insertValue : '?';
      document.getElementById('newNodeNextField').innerText = '?';
      midPositionNewNode();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      if (!showLoopBox) hideLoopBox();
    }

    if (step.type === 'init') {
      newNodeWrap.classList.remove('visible');
      hidePath(curvePath);
      clearMidLinks();
      hideLoopBox();
      removeTempPointer();
      hideConditionBox();
      const n4n = nodes[3].el.querySelector('.viz-node-next');
      if (n4n) n4n.innerText = '0x101';
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (step.type === 'malloc') {
      clearMidLinks();
      hideLoopBox();
      removeTempPointer();
      newNodeData.innerText = '?';
      newNodeAddr.innerText = NEW_ADDR;
      document.getElementById('newNodeNextField').innerText = '?';
      midPositionNewNode();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (step.type === 'data') {
      clearMidLinks();
      hideLoopBox();
      removeTempPointer();
      newNodeData.innerText = insertValue;
      document.getElementById('newNodeNextField').innerText = '?';
      midPositionNewNode();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (step.type === 'tempHead') {
      clearMidLinks();
      hideLoopBox();
      baseSetup(false);
      placeTempPointerOnNode(0);

    } else if (step.type === 'loopTrue') {
      // Highlight for-line, show TRUE box, temp stays at current position
      // Figure out where temp currently is: it's been moved (step.i - 1) times from head
      const tempNodeIdx = step.i - 1;
      // Use baseSetup but keep loop box — so call it with showLoopBox=true,
      // but baseSetup only hides when arg is false; we call without hiding then show.
      newNodeData.innerText = (currentStep >= 2) ? insertValue : '?';
      document.getElementById('newNodeNextField').innerText = '?';
      midPositionNewNode();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      placeTempPointerOnNode(tempNodeIdx);
      updateLoopBox(step.i, insertPos);

    } else if (step.type === 'tempMove') {
      // Highlight body-line, fade loop box out, move temp ONE node forward
      clearMidLinks();
      hideLoopBox();
      newNodeData.innerText = (currentStep >= 2) ? insertValue : '?';
      document.getElementById('newNodeNextField').innerText = '?';
      midPositionNewNode();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      placeTempPointerOnNode(step.nodeIndex);

    } else if (step.type === 'loopFalse') {
      // Highlight for-line, show FALSE box, temp stays at insertPos-1
      clearMidLinks();
      newNodeData.innerText = (currentStep >= 2) ? insertValue : '?';
      document.getElementById('newNodeNextField').innerText = '?';
      midPositionNewNode();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      placeTempPointerOnNode(insertPos - 1);
      updateLoopBox(insertPos, insertPos);

    } else if (step.type === 'link1') {
      clearMidLinks();
      hideLoopBox();
      // Restore the DOM arrow between temp-node and successor (in case coming back from link2)
      const allListChildrenL1 = Array.from(listRow.children);
      const oldArrowIdxL1 = (insertPos - 1) * 2 + 1;
      const oldArrowElL1  = allListChildrenL1[oldArrowIdxL1];
      if (oldArrowElL1 && oldArrowElL1.classList.contains('viz-arrow')) {
        oldArrowElL1.style.transition = 'opacity 0.35s ease';
        oldArrowElL1.style.opacity    = '1';
      }
      newNodeData.innerText = insertValue;
      const successorAddr = nodes[insertPos] ? nodes[insertPos].addr : '0x101';
      document.getElementById('newNodeNextField').innerText = successorAddr;
      midPositionNewNode();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      placeTempPointerOnNode(insertPos - 1);
      curveSvg.classList.add('visible');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const canvas     = listRow.parentElement;
        const canvasRect = canvas.getBoundingClientRect();
        const scrollLeft = canvas.scrollLeft || 0;
        const wraps      = listRow.querySelectorAll('.viz-node-wrap');
        const newRect    = newNodeEl.getBoundingClientRect();
        const succWrap   = wraps[insertPos];
        if (!succWrap) return;
        const succRect = succWrap.querySelector('.viz-node').getBoundingClientRect();
        const sx = newRect.right - canvasRect.left + scrollLeft;
        const sy = newRect.top + newRect.height * 0.3 - canvasRect.top;
        const ex = succRect.left - canvasRect.left + scrollLeft;
        const ey = succRect.top + succRect.height * 0.3 - canvasRect.top;
        drawMidLink(curveSvg, sx, sy, ex, ey, '#10b981', true, null);
      }));

    } else if (step.type === 'link2') {
      hideLoopBox();
      newNodeData.innerText = insertValue;
      const successorAddr = nodes[insertPos] ? nodes[insertPos].addr : '0x101';
      document.getElementById('newNodeNextField').innerText = successorAddr;
      midPositionNewNode();
      newNodeWrap.classList.add('visible');
      hidePath(curvePath);
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      placeTempPointerOnNode(insertPos - 1);
      curveSvg.classList.add('visible');

      // Fade out the old DOM arrow between temp-node and its successor
      const allListChildren = Array.from(listRow.children);
      // arrows are between node-wraps; arrow after node at index (insertPos-1) is at child index (insertPos-1)*2+1
      const oldArrowIdx = (insertPos - 1) * 2 + 1;
      const oldArrowEl  = allListChildren[oldArrowIdx];
      if (oldArrowEl && oldArrowEl.classList.contains('viz-arrow')) {
        oldArrowEl.style.transition = 'opacity 0.35s ease';
        oldArrowEl.style.opacity    = '0';
      }

      requestAnimationFrame(() => requestAnimationFrame(() => {
        clearMidLinks();
        const canvas     = listRow.parentElement;
        const canvasRect = canvas.getBoundingClientRect();
        const scrollLeft = canvas.scrollLeft || 0;
        const wraps      = listRow.querySelectorAll('.viz-node-wrap');
        const newRect    = newNodeEl.getBoundingClientRect();
        const succWrap   = wraps[insertPos];
        const tempWrap   = wraps[insertPos - 1];
        if (!succWrap || !tempWrap) return;
        const succRect = succWrap.querySelector('.viz-node').getBoundingClientRect();
        const tempRect = tempWrap.querySelector('.viz-node').getBoundingClientRect();
        // newNode→succ (static, already set in link1)
        const sx1 = newRect.right - canvasRect.left + scrollLeft;
        const sy1 = newRect.top + newRect.height * 0.3 - canvasRect.top;
        const ex1 = succRect.left - canvasRect.left + scrollLeft;
        const ey1 = succRect.top + succRect.height * 0.3 - canvasRect.top;
        drawMidLink(curveSvg, sx1, sy1, ex1, ey1, '#10b981', false, null);
        // temp→newNode (animated)
        const sx2 = tempRect.right - canvasRect.left + scrollLeft;
        const sy2 = tempRect.top + tempRect.height * 0.5 - canvasRect.top;
        const ex2 = newRect.left - canvasRect.left + scrollLeft;
        const ey2 = newRect.top + newRect.height * 0.5 - canvasRect.top;
        drawMidLink(curveSvg, sx2, sy2, ex2, ey2, '#10b981', true, () => {
          const tempNextEl = tempWrap.querySelector('.viz-node-next');
          if (tempNextEl) tempNextEl.textContent = NEW_ADDR;
        });
      }));

    } else if (step.type === 'done') {
      clearMidLinks();
      hideLoopBox();
      removeTempPointer();
      hidePath(curvePath);
      newNodeWrap.classList.remove('visible');
      listRow.innerHTML = '';
      const finalNodes = [];
      for (let i = 0; i < nodes.length; i++) {
        finalNodes.push({ data: nodes[i].data, addr: nodes[i].addr, nextAddr: i < nodes.length - 1 ? nodes[i+1].addr : '0x101' });
        if (i === insertPos - 1) {
          finalNodes.push({ data: insertValue, addr: NEW_NODE_ADDR_MID, nextAddr: nodes[insertPos] ? nodes[insertPos].addr : '0x101' });
        }
      }
      if (finalNodes.length > 0) finalNodes[finalNodes.length - 1].nextAddr = finalNodes[0].addr;
      const els = buildFinalList(finalNodes);
      void listRow.offsetWidth;
      const cr = listRow.parentElement.getBoundingClientRect();
      const fR = els[0].getBoundingClientRect();
      const lR = els[els.length - 1].getBoundingClientRect();
      headPointer.style.left  = (fR.left - cr.left + fR.width / 2) + 'px';
      headPointer.style.top   = (fR.top  - cr.top  - 45) + 'px';
      tailPointer.style.right = 'auto';
      tailPointer.style.left  = (lR.left - cr.left + lR.width / 2) + 'px';
      tailPointer.style.top   = (lR.top  - cr.top  - 45) + 'px';
      drawCircularArc(els[els.length - 1], els[0], circularCurvePath);
    }
  }

});