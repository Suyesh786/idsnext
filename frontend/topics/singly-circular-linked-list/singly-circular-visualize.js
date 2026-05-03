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

  const stepItems    = document.querySelectorAll(".viz-step-item");
  const progressDots = document.querySelectorAll(".viz-dot");

  // ── Mode ────────────────────────────────────────────────────────
  let mode = 'insert-beginning';

  const MODE_LABELS = {
    'insert-beginning': 'Insert at Beginning',
    'insert-end':       'Insert at End',
  };

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
      switchCodeBlocks(mode);
      resetAll();
    });
  });

  // ── State ────────────────────────────────────────────────────────
  let currentStep = 0;
  const totalSteps = 7;
  let nodes = [];
  let insertValue = 10;

  const NEW_NODE_ADDR_BEG = '0x100';
  const NEW_NODE_ADDR_END = '0x105';

  // Step → data-line for both modes (same line numbers in their code blocks)
  const STEP_TO_LINE = [null, 1, 2, 3, 4, 5, 6, null];

  // ── Condition box ────────────────────────────────────────────────
  const conditionBox = document.getElementById("conditionBox");
  Object.assign(conditionBox.style, {
    display:       'none',
    position:      'absolute',
    left:          '50%',
    top:           '18px',
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
    transition:    'opacity 0.25s ease',
  });

  function showConditionBox() {
    conditionBox.innerHTML = 'head == NULL &nbsp;&rarr;&nbsp; &times; FALSE &mdash; list has nodes';
    conditionBox.style.display = 'block';
    conditionBox.style.opacity = '1';
  }
  function hideConditionBox() { conditionBox.style.display = 'none'; }

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
        '<div class="viz-node-addr">' + n.addr + '</div>';
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
        '<div class="viz-node-addr">' + n.addr + '</div>';
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
  //  MASTER UPDATE — dispatches to mode-specific handler
  // ════════════════════════════════════════════════════════════════
  function updateUI() {
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

    btnPrev.disabled = (currentStep === 0) || (currentStep === totalSteps);
    btnNext.disabled = (currentStep === totalSteps);

    if (mode === 'insert-end') updateUI_end();
    else                       updateUI_beg();
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
    initNodes();
    updateUI();
  }

  // ── Confirm / Enter ───────────────────────────────────────────────
  function confirmAndStart() {
    const val = parseInt(valueInput.value);
    if (!isNaN(val)) insertValue = val;
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
  btnReset.addEventListener("click", resetAll);

  document.addEventListener("keydown", e => {
    if      (e.key === "ArrowRight" && currentStep < totalSteps) { currentStep++; updateUI(); }
    else if (e.key === "ArrowLeft"  && currentStep > 0)          { currentStep--; updateUI(); }
  });

  // ── Init ──────────────────────────────────────────────────────────
  switchCodeBlocks(mode);
  initNodes();
  updateUI();
});