/* ─── singly-circular-visualize.js ───────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const listRow = document.getElementById("listRow");
  const headPointer = document.getElementById("headPointer");
  const tailPointer = document.getElementById("tailPointer");
  const newNodeWrap = document.getElementById("newNodeWrap");
  const newNodeData = document.getElementById("newNodeData");
  const newNodeAddr = document.getElementById("newNodeAddr");
  
  const curveSvg = document.getElementById("curveSvg");
  const curvePath = document.getElementById("curvePath");
  const circularCurvePath = document.getElementById("circularCurvePath");

  const valueInput = document.getElementById("vizValueInput");
  const btnConfirm = document.getElementById("vizConfirmBtn");
  const btnNext = document.getElementById("btnNext");
  const btnPrev = document.getElementById("btnPrev");
  const btnReset = document.getElementById("btnReset");
  
  const stepItems = document.querySelectorAll(".viz-step-item");
  const progressDots = document.querySelectorAll(".viz-dot");

  // State
  let currentStep = 0;
  const totalSteps = 7; // 7 steps: last step = final merged list
  let nodes = [];
  let insertValue = 10;

  // Step → data-line mapping (matches data-line attrs in HTML)
  // Step 1: malloc              → data-line="1"  (lines 11-12)
  // Step 2: newnode->data=data  → data-line="2"  (line 13)
  // Step 3: if (head == NULL)   → data-line="3"  (line 14)
  // Step 4: newnode->next=head  → data-line="4"  (line 19)
  // Step 5: tail->next=newnode  → data-line="5"  (line 20)
  // Step 6: head = newnode      → data-line="6"  (line 21)
  const STEP_TO_LINE = [null, 1, 2, 3, 4, 5, 6, null]; // step 7 = final state, no highlight

  // ── Condition box setup ─────────────────────────────────────────
  // conditionBox stays position:absolute inside animCanvas — never move it into DOM flow
  // (moving it to static position pushes the canvas content down causing overlap)
  const conditionBox = document.getElementById("conditionBox");
  Object.assign(conditionBox.style, {
    display: 'none',
    position: 'absolute',
    left: '50%',
    top: '18px',
    transform: 'translateX(-50%)',
    margin: '0',
    padding: '10px 22px',
    background: '#fff5f5',
    border: '2px solid #ef4444',
    borderRadius: '10px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    fontWeight: '600',
    color: '#b91c1c',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
    zIndex: '50',
    transition: 'opacity 0.25s ease',
  });

  function showConditionBox() {
    conditionBox.innerHTML = 'head == NULL &nbsp;&rarr;&nbsp; &times; FALSE &mdash; list has nodes';
    conditionBox.style.display = 'block';
    conditionBox.style.opacity = '1';
  }

  function hideConditionBox() {
    conditionBox.style.display = 'none';
  }

  // ── Code highlighting ───────────────────────────────────────────
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
        if (codeBlock) {
          codeBlock.scrollTo({ top: el.offsetTop - 10, behavior: 'smooth' });
          scrolled = true;
        }
      }
    });
  }

  function initNodes() {
    listRow.innerHTML = "";
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
        arrow.innerHTML = '<span class="viz-arrow-fwd">→</span>';
        listRow.appendChild(arrow);
      }
      n.el = wrap.querySelector('.viz-node');
    });

    positionInitialPointers();
  }

  function positionInitialPointers() {
    void listRow.offsetWidth;
    const n1Rect = nodes[0].el.getBoundingClientRect();
    const containerRect = listRow.parentElement.getBoundingClientRect();

    // HEAD pointer → center of node 1
    headPointer.style.left = (n1Rect.left - containerRect.left + n1Rect.width / 2) + "px";
    headPointer.style.top  = (n1Rect.top - containerRect.top - 45) + "px";

    // TAIL pointer → center of node 4
    // Must set right='auto' to override CSS default right:20% which causes offset
    const n4Rect = nodes[3].el.getBoundingClientRect();
    tailPointer.style.right = 'auto';
    tailPointer.style.left = (n4Rect.left - containerRect.left + n4Rect.width / 2) + "px";
    tailPointer.style.top  = (n4Rect.top - containerRect.top - 45) + "px";

    curveSvg.classList.add('visible');
    drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
  }

  function drawCircularArc(startEl, endEl, pathEl) {
    if (!startEl || !endEl) return;
    const sRect = startEl.getBoundingClientRect();
    const eRect = endEl.getBoundingClientRect();
    const cRect = curveSvg.getBoundingClientRect();
    const startX = sRect.right - cRect.left;
    const startY = sRect.top - cRect.top + sRect.height / 2;
    const endX = eRect.left - cRect.left - 5;
    const endY = eRect.top - cRect.top + eRect.height / 2;
    const sweep = 70;
    const midY = startY + sRect.height + 15;
    const d =
      "M " + startX + " " + startY +
      " C " + (startX + sweep) + " " + startY + "," +
              (startX + sweep) + " " + midY + "," +
              startX + " " + midY +
      " L " + endX + " " + midY +
      " C " + (endX - sweep) + " " + midY + "," +
              (endX - sweep) + " " + endY + "," +
              endX + " " + endY;
    pathEl.setAttribute("d", d);
    pathEl.style.opacity = 0.8;
  }

function drawForwardArc(startEl, endEl, pathEl) {
    if(!startEl || !endEl) return;
    const sRect = startEl.getBoundingClientRect();
    const eRect = endEl.getBoundingClientRect();
    const cRect = curveSvg.getBoundingClientRect();

    // Start: right-center of newNode
    const startX = sRect.right - cRect.left;
    const startY = sRect.top - cRect.top + sRect.height / 2;

    // End: bottom-center of HEAD node
    const endX = eRect.left - cRect.left + eRect.width / 2;
    const endY = eRect.bottom - cRect.top + 6; 

    // C-Swoop control points
    const cp1x = startX + 45;
    const cp1y = startY;
    const cp2x = endX;
    const cp2y = endY + 45;

    const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    
    pathEl.setAttribute("d", d);
    pathEl.setAttribute("stroke", "#16a34a");
    pathEl.setAttribute("marker-end", "url(#arrowHeadGreen)");
    // opacity left for caller (animatePath handles it)
  }

  // ── Smooth draw-on animation (from doubly-visualize reference) ─
  // Animates pathEl drawing itself + a glowing traveling dot along the path.
  // color: stroke hex. onComplete: optional callback when done.
  function animatePath(pathEl, svgEl, color, onComplete) {
    pathEl.style.opacity = '1';

    let len;
    try { len = pathEl.getTotalLength(); } catch(e) { len = 400; }
    if (!len || len < 1) len = 400;

    // Set up dash-draw starting position (fully hidden)
    pathEl.style.transition      = 'none';
    pathEl.style.strokeDasharray  = len + 'px';
    pathEl.style.strokeDashoffset = len + 'px';

    // Traveling glow dot
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', '5');
    dot.setAttribute('fill', color);
    dot.classList.add('viz-travel-dot');
    const shadowColor = color === '#16a34a'
      ? 'rgba(22,163,74,0.75)'
      : color === '#3b6cff'
        ? 'rgba(59,108,255,0.75)'
        : 'rgba(245,158,11,0.75)';
    dot.style.filter = 'drop-shadow(0 0 5px ' + shadowColor + ')';
    svgEl.appendChild(dot);

    const duration = 850;
    let startTime = null;

    function animateDot(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // easeInOut
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

    // Double-rAF ensures transition is registered after 'none' reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pathEl.style.transition      = `stroke-dashoffset ${duration / 1000}s cubic-bezier(0.4,0,0.2,1)`;
        pathEl.style.strokeDashoffset = '0px';
        requestAnimationFrame(animateDot);
      });
    });
  }

  function updateUI() {
    document.getElementById("headerStepNum").innerText = currentStep;

    stepItems.forEach((item, i) => {
      item.classList.remove('viz-step-done', 'viz-step-active', 'viz-step-upcoming');
      if (i + 1 < currentStep)        item.classList.add('viz-step-done');
      else if (i + 1 === currentStep) item.classList.add('viz-step-active');
      else                            item.classList.add('viz-step-upcoming');
    });

    progressDots.forEach((dot, i) => {
      dot.classList.remove('viz-dot-active', 'viz-dot-done');
      if (i === currentStep)     dot.classList.add('viz-dot-active');
      else if (i < currentStep)  dot.classList.add('viz-dot-done');
    });

    highlightCode(STEP_TO_LINE[currentStep]);

    btnPrev.disabled = (currentStep === 0) || (currentStep === totalSteps);
    btnNext.disabled = currentStep === totalSteps;

    // ── Step logic (fully idempotent — safe for Prev) ─────────────
    if (currentStep === 0) {
      // Initial state — full reset
      newNodeWrap.classList.remove('visible');
      curvePath.style.opacity = 0;
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");
      hideConditionBox();
      // Restore node 4's next field (may have been mutated in step 5)
      const n4next = nodes[3].el.querySelector('.viz-node-next');
      if (n4next) n4next.innerText = "0x101";
      positionInitialPointers();
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 1) {
      // malloc — ? fields, node 4 next restored, head pointer back to node 1
      newNodeData.innerText = "?";
      newNodeAddr.innerText = "0x100";
      document.getElementById("newNodeNextField").innerText = "?";
      const n1Rect1 = nodes[0].el.getBoundingClientRect();
      const cr1 = listRow.parentElement.getBoundingClientRect();
      newNodeWrap.style.left = (n1Rect1.left - cr1.left - 40) + "px";
      newNodeWrap.style.bottom = "120px";
      newNodeWrap.classList.add('visible');
      curvePath.style.opacity = 0;
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");
      hideConditionBox();
      // Restore node 4 next (may have been mutated coming back from step 5)
      const n4next1 = nodes[3].el.querySelector('.viz-node-next');
      if (n4next1) n4next1.innerText = "0x101";
      // Restore head pointer to node 1
      headPointer.style.left = (n1Rect1.left - cr1.left + n1Rect1.width / 2) + "px";
      headPointer.style.top  = (n1Rect1.top - cr1.top - 45) + "px";
      // Restore circular arc: tail → head (node4 → node1)
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 2) {
      // newNode->data = data — value fills in
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "?";
      newNodeWrap.classList.add('visible');
      curvePath.style.opacity = 0;
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");
      hideConditionBox();
      // Restore node 4 next
      const n4next2 = nodes[3].el.querySelector('.viz-node-next');
      if (n4next2) n4next2.innerText = "0x101";
      // Restore head pointer to node 1
      const n1Rect2 = nodes[0].el.getBoundingClientRect();
      const cr2 = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1Rect2.left - cr2.left + n1Rect2.width / 2) + "px";
      headPointer.style.top  = (n1Rect2.top - cr2.top - 45) + "px";
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 3) {
      // if (head == NULL) → FALSE
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "?";
      newNodeWrap.classList.add('visible');
      curvePath.style.opacity = 0;
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");
      showConditionBox();
      // Restore node 4 next
      const n4next3 = nodes[3].el.querySelector('.viz-node-next');
      if (n4next3) n4next3.innerText = "0x101";
      // Restore head pointer to node 1
      const n1Rect3 = nodes[0].el.getBoundingClientRect();
      const cr3 = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1Rect3.left - cr3.left + n1Rect3.width / 2) + "px";
      headPointer.style.top  = (n1Rect3.top - cr3.top - 45) + "px";
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);

    } else if (currentStep === 4) {
      // newNode->next = head — green arc from newNode to node 1
      hideConditionBox();
      newNodeData.innerText = insertValue;
      document.getElementById("newNodeNextField").innerText = "0x101";
      // Restore node 4 next (coming back from step 5)
      const n4next4 = nodes[3].el.querySelector('.viz-node-next');
      if (n4next4) n4next4.innerText = "0x101";
      // Restore head pointer to node 1
      const n1Rect4 = nodes[0].el.getBoundingClientRect();
      const cr4 = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1Rect4.left - cr4.left + n1Rect4.width / 2) + "px";
      headPointer.style.top  = (n1Rect4.top - cr4.top - 45) + "px";
      drawCircularArc(nodes[3].el, nodes[0].el, circularCurvePath);
      // Prepare path geometry but animate the draw-on
      curvePath.style.opacity = '0';
      curvePath.style.strokeDasharray  = '';
      curvePath.style.strokeDashoffset = '';
      drawForwardArc(newNodeWrap.querySelector('.viz-node'), nodes[0].el, curvePath);
      animatePath(curvePath, curveSvg, '#16a34a');

    } else if (currentStep === 5) {
      // tail->next = newNode — update node4 next field, redraw circular arc to newNode
      hideConditionBox();
      const n4next5 = nodes[3].el.querySelector('.viz-node-next');
      if (n4next5) n4next5.innerText = "0x100";
      // Keep forward arc (newNode → node1) visible
      document.getElementById("newNodeNextField").innerText = "0x101";
      // Restore head pointer to node 1 (not yet moved)
      const n1Rect5 = nodes[0].el.getBoundingClientRect();
      const cr5 = listRow.parentElement.getBoundingClientRect();
      headPointer.style.left = (n1Rect5.left - cr5.left + n1Rect5.width / 2) + "px";
      headPointer.style.top  = (n1Rect5.top - cr5.top - 45) + "px";
      drawForwardArc(newNodeWrap.querySelector('.viz-node'), nodes[0].el, curvePath);
      // curvePath already drawn from step 4 — make it instantly visible (static)
      curvePath.style.strokeDasharray  = '';
      curvePath.style.strokeDashoffset = '';
      curvePath.style.opacity = '1';
      // Animate the circular arc redrawing to newNode
      circularCurvePath.style.strokeDasharray  = '';
      circularCurvePath.style.strokeDashoffset = '';
      drawCircularArc(nodes[3].el, newNodeWrap.querySelector('.viz-node'), circularCurvePath);
      const circColor5 = circularCurvePath.getAttribute('stroke') || '#3b6cff';
      animatePath(circularCurvePath, curveSvg, circColor5);

    } else if (currentStep === 6) {
      // head = newNode — move head pointer to newNode
      hideConditionBox();
      const cr6 = listRow.parentElement.getBoundingClientRect();
      const newRect6 = newNodeWrap.querySelector('.viz-node').getBoundingClientRect();
      headPointer.style.left = (newRect6.left - cr6.left + newRect6.width / 2) + "px";
      headPointer.style.top  = (newRect6.top - cr6.top - 45) + "px";
      // Keep node4 next updated
      const n4next6 = nodes[3].el.querySelector('.viz-node-next');
      if (n4next6) n4next6.innerText = "0x100";
      document.getElementById("newNodeNextField").innerText = "0x101";
      drawForwardArc(newNodeWrap.querySelector('.viz-node'), nodes[0].el, curvePath);
      curvePath.style.strokeDasharray  = '';
      curvePath.style.strokeDashoffset = '';
      curvePath.style.opacity = '1';
      drawCircularArc(nodes[3].el, newNodeWrap.querySelector('.viz-node'), circularCurvePath);
      circularCurvePath.style.strokeDasharray  = '';
      circularCurvePath.style.strokeDashoffset = '';

    } else if (currentStep === 7) {
      // FINAL STATE — rebuild listRow with newNode prepended as normal blue node
      hideConditionBox();
      curvePath.style.opacity = 0;
      curvePath.setAttribute("stroke", "#3b6cff");
      curvePath.setAttribute("marker-end", "url(#arrowHead)");

      // Rebuild list: [newNode(insertValue,0x100), 1,2,3,4]
      listRow.innerHTML = "";
      const finalNodes = [
        { data: insertValue, addr: "0x100", nextAddr: "0x101" },
        { data: 1,           addr: "0x101", nextAddr: "0x102" },
        { data: 2,           addr: "0x102", nextAddr: "0x103" },
        { data: 3,           addr: "0x103", nextAddr: "0x104" },
        { data: 4,           addr: "0x104", nextAddr: "0x100" }
      ];
      let renderedEls = [];
      finalNodes.forEach((n, i) => {
        const wrap = document.createElement("div");
        wrap.className = "viz-node-wrap";
        wrap.innerHTML =
          '<div class="viz-node viz-sll-node">' +
            '<div class="viz-node-data">' + n.data + '</div>' +
            '<div class="viz-node-next">' + n.nextAddr + '</div>' +
          '</div>' +
          '<div class="viz-node-addr">' + n.addr + '</div>';
        listRow.appendChild(wrap);
        if (i < finalNodes.length - 1) {
          const arrow = document.createElement("div");
          arrow.className = "viz-arrow";
          arrow.innerHTML = '<span class="viz-arrow-fwd">→</span>';
          listRow.appendChild(arrow);
        }
        renderedEls.push(wrap.querySelector('.viz-node'));
      });

      // Hide floating newNode
      newNodeWrap.classList.remove('visible');

      // Reposition head → new first node, tail → last node
      void listRow.offsetWidth;
      const cr7 = listRow.parentElement.getBoundingClientRect();
      const firstEl = renderedEls[0];
      const lastEl  = renderedEls[renderedEls.length - 1];
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect  = lastEl.getBoundingClientRect();

      headPointer.style.left = (firstRect.left - cr7.left + firstRect.width / 2) + "px";
      headPointer.style.top  = (firstRect.top  - cr7.top  - 45) + "px";
      tailPointer.style.right = 'auto';
      tailPointer.style.left = (lastRect.left - cr7.left + lastRect.width / 2) + "px";
      tailPointer.style.top  = (lastRect.top  - cr7.top  - 45) + "px";

      // Redraw circular arc: last node → first node
      drawCircularArc(lastEl, firstEl, circularCurvePath);
    }
  }

  // ── Confirm / Enter → reset + jump to step 1 ───────────────────
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
  valueInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") confirmAndStart();
  });

  btnNext.addEventListener("click", () => {
    if (currentStep < totalSteps) { currentStep++; updateUI(); }
  });

  btnPrev.addEventListener("click", () => {
    if (currentStep > 0) { currentStep--; updateUI(); }
  });

  btnReset.addEventListener("click", () => {
    currentStep = 0;
    initNodes();
    updateUI();
  });

  // FIX: Right arrow key → triggers Next; Left arrow key → triggers Prev
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      if (currentStep < totalSteps) { currentStep++; updateUI(); }
    } else if (e.key === "ArrowLeft") {
      if (currentStep > 0) { currentStep--; updateUI(); }
    }
  });

  // Init
  initNodes();
  updateUI();
});