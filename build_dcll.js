const fs = require('fs');
const path = require('path');

const srcScllDir = path.join('frontend', 'topics', 'singly-circular-linked-list');
const destDcllDir = path.join('frontend', 'topics', 'doubly-circular-linked-list');

// Ensure destination exists
if (!fs.existsSync(destDcllDir)) {
  fs.mkdirSync(destDcllDir, { recursive: true });
}

// 1. Generate HTML
let html = fs.readFileSync(path.join(srcScllDir, 'singly-circular-linked-list.html'), 'utf8');

// Global replaces
html = html.replace(/Singly Circular Linked List/g, 'Doubly Circular Linked List');
html = html.replace(/singly_circular_linked_list/g, 'doubly_circular_linked_list');
html = html.replace(/scll/g, 'dcll');
html = html.replace(/sll/g, 'dll');
html = html.replace(/Singly/g, 'Doubly');
html = html.replace(/singly-circular/g, 'doubly-circular');

// Inject the structure diagram with prev pointer
const oldSvg = html.substring(html.indexOf('<svg class="dcll-svg"'), html.indexOf('</svg>', html.indexOf('<svg class="dcll-svg"')) + 6);
const newSvg = `
        <svg class="dcll-svg" viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" id="circularDiagram">
          <!-- Node 1 -->
          <g class="svg-node" id="svgNode1">
            <rect x="30" y="70" width="160" height="60" rx="12" fill="#eef3ff" stroke="#4f8cff" stroke-width="2"/>
            <rect x="80" y="70" width="60" height="60" fill="#dce9ff" stroke="#4f8cff" stroke-width="2"/>
            
            <!-- prev cell -->
            <text x="55" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">prev</text>
            <text x="55" y="113" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">← tail</text>
            
            <!-- data cell -->
            <text x="110" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">data</text>
            <text x="110" y="113" text-anchor="middle" font-size="16" fill="#1a3bcc" font-weight="700">10</text>
            
            <!-- next cell -->
            <text x="165" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">next</text>
            <text x="165" y="113" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">→</text>
            
            <text x="110" y="60" text-anchor="middle" font-size="10" fill="#2e7d32" font-weight="700">HEAD</text>
            <line x1="110" y1="63" x2="110" y2="70" stroke="#2e7d32" stroke-width="1.5" stroke-dasharray="3,2"/>
          </g>

          <!-- Arrows 1 <-> 2 -->
          <line x1="190" y1="90" x2="240" y2="90" stroke="#4f8cff" stroke-width="2"/>
          <polygon points="240,85 250,90 240,95" fill="#4f8cff"/>
          <line x1="190" y1="110" x2="240" y2="110" stroke="#4f8cff" stroke-width="2"/>
          <polygon points="190,105 180,110 190,115" fill="#4f8cff"/>

          <!-- Node 2 -->
          <g class="svg-node" id="svgNode2">
            <rect x="250" y="70" width="160" height="60" rx="12" fill="#eef3ff" stroke="#4f8cff" stroke-width="2"/>
            <rect x="300" y="70" width="60" height="60" fill="#dce9ff" stroke="#4f8cff" stroke-width="2"/>
            <text x="275" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">prev</text>
            <text x="275" y="113" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">←</text>
            <text x="330" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">data</text>
            <text x="330" y="113" text-anchor="middle" font-size="16" fill="#1a3bcc" font-weight="700">20</text>
            <text x="385" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">next</text>
            <text x="385" y="113" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">→</text>
          </g>

          <!-- Arrows 2 <-> 3 -->
          <line x1="410" y1="90" x2="460" y2="90" stroke="#4f8cff" stroke-width="2"/>
          <polygon points="460,85 470,90 460,95" fill="#4f8cff"/>
          <line x1="410" y1="110" x2="460" y2="110" stroke="#4f8cff" stroke-width="2"/>
          <polygon points="410,105 400,110 410,115" fill="#4f8cff"/>

          <!-- Node 3 -->
          <g class="svg-node" id="svgNode3">
            <rect x="470" y="70" width="160" height="60" rx="12" fill="#eef3ff" stroke="#4f8cff" stroke-width="2"/>
            <rect x="520" y="70" width="60" height="60" fill="#dce9ff" stroke="#4f8cff" stroke-width="2"/>
            <text x="495" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">prev</text>
            <text x="495" y="113" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">←</text>
            <text x="550" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">data</text>
            <text x="550" y="113" text-anchor="middle" font-size="16" fill="#1a3bcc" font-weight="700">30</text>
            <text x="605" y="96" text-anchor="middle" font-size="10" fill="#4a65c8" font-weight="700">next</text>
            <text x="605" y="113" text-anchor="middle" font-size="11" fill="#3b6cff" font-weight="600">head →</text>
            
            <text x="550" y="60" text-anchor="middle" font-size="10" fill="#d97706" font-weight="700">TAIL</text>
            <line x1="550" y1="63" x2="550" y2="70" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,2"/>
          </g>

          <!-- Circular Bottom Arc (Next) -->
          <path d="M 550 130 C 550 200, 110 200, 110 135" fill="none" stroke="#4f8cff" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrowhead)"/>
          
          <!-- Circular Top Arc (Prev) -->
          <path d="M 110 70 C 110 0, 550 0, 550 65" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrowhead-prev)"/>
          
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4f8cff"/>
            </marker>
            <marker id="arrowhead-prev" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
`;
html = html.replace(oldSvg, newSvg);

// Replace Simulator SVG to have two arcs
const oldSimSvg = html.substring(html.indexOf('<svg id="dcllArcSvg"'), html.indexOf('</svg>', html.indexOf('<svg id="dcllArcSvg"')) + 6);
const newSimSvg = `
          <!-- SVG for Circular Arcs -->
          <svg id="dcllArcSvg" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; overflow: visible;">
             <path id="dcllArcPathNext" fill="none" stroke="#4f8cff" stroke-width="2.5" stroke-dasharray="4,4" marker-end="url(#arrowheadNext)"/>
             <path id="dcllArcPathPrev" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,4" marker-end="url(#arrowheadPrev)"/>
             <defs>
               <marker id="arrowheadNext" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                 <polygon points="0 0, 10 3.5, 0 7" fill="#4f8cff"/>
               </marker>
               <marker id="arrowheadPrev" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                 <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b"/>
               </marker>
             </defs>
          </svg>
`;
html = html.replace(oldSimSvg, newSimSvg);

fs.writeFileSync(path.join(destDcllDir, 'doubly-circular-linked-list.html'), html);

// 2. Generate CSS
let css = fs.readFileSync(path.join(srcScllDir, 'singly-circular-linked-list.css'), 'utf8');
css = css.replace(/scll/g, 'dcll');
css = css.replace(/sll/g, 'dll');

// Append DLL specific pointer styles from doubly-linked-list.css
const dllCss = fs.readFileSync(path.join('frontend', 'topics', 'doubly-linked-list', 'doubly-linked-list.css'), 'utf8');
const ptrStyleStart = dllCss.indexOf('.dll-ptr-row');
if (ptrStyleStart !== -1) {
  const ptrStyleEnd = dllCss.indexOf('/* ─── DLL Sim Arrows (→ ←) ─── */');
  const arrowStyleEnd = dllCss.indexOf('.arrow-new');
  css += '\\n\\n/* DLL Ported Styles */\\n' + dllCss.substring(ptrStyleStart, arrowStyleEnd + 100);
}

fs.writeFileSync(path.join(destDcllDir, 'doubly-circular-linked-list.css'), css);

// 3. Generate JS
// Using doubly-linked-list.js as the core for node rendering and modifying for circularity
let jsBase = fs.readFileSync(path.join('frontend', 'topics', 'doubly-linked-list', 'doubly-linked-list.js'), 'utf8');
let scllJs = fs.readFileSync(path.join(srcScllDir, 'singly-circular-linked-list.js'), 'utf8');

// The JS must have the exact structure. We will take scll JS layout (for auth, tabs, XP, complete)
// and inject a modified DLL engine

const engineCode = `
/* ══════════════════════════════════════════════════════════════
   DOUBLY CIRCULAR LINKED LIST SIMULATOR
══════════════════════════════════════════════════════════════ */

const MAX_LIST_SIZE = 8;
const VALUE_MIN     = -999;
const VALUE_MAX     = 999;

let nodes   = {};   // id → { id, value, prev, next }
let head    = null; // id of head node
let tail    = null; // id of tail node
let size    = 0;
let opCount = 0;
let animating = false;
let nodeIdSeq = 0;

function newId() { return "n" + (++nodeIdSeq); }

function enablePositionInput(enable) {
  const posInput = document.getElementById("simPosInput");
  if (!posInput) return;
  posInput.disabled = !enable;
}

function handledcllInsertAtPosition() {
  const posInput = document.getElementById("simPosInput");
  if (!posInput) return;
  if (posInput.disabled) {
    enablePositionInput(true);
    posInput.focus();
    setStatus("Position input enabled — enter a position and click 'At Position' again.", "info");
    return;
  }
  dcllInsertAtPosition();
}

function setStatus(msg, type = "") {
  const bar = document.getElementById("simStatus");
  const txt = document.getElementById("simStatusText");
  if (!bar || !txt) return;
  bar.className = "sim-status";
  if (type) bar.classList.add(\`status-\${type}\`);
  txt.textContent = msg;
}

function updateStats() {
  const sizeEl = document.getElementById("statSize");
  const headEl = document.getElementById("statHead");
  const tailEl = document.getElementById("statTail");
  const opsEl  = document.getElementById("statOps");
  if (sizeEl) sizeEl.textContent = size;
  if (headEl) headEl.textContent = head !== null ? nodes[head].value : "—";
  if (tailEl) tailEl.textContent = tail !== null ? nodes[tail].value : "—";
  if (opsEl)  opsEl.textContent  = opCount;
}

function updateEmptyState() {
  const empty = document.getElementById("simEmptyState");
  if (!empty) return;
  empty.style.display = size === 0 ? "flex" : "none";
}

function getInputValue() {
  const input = document.getElementById("simInput");
  if (!input) return null;
  const raw = input.value.trim();
  if (raw === "" || isNaN(Number(raw))) {
    setStatus("⚠ Please enter a valid number.", "error");
    input.focus();
    return null;
  }
  const val = parseInt(raw, 10);
  if (val < VALUE_MIN || val > VALUE_MAX) {
    setStatus(\`⚠ Value out of range. Use \${VALUE_MIN} to \${VALUE_MAX}.\`, "error");
    input.focus();
    return null;
  }
  return val;
}

function getPositionValue() {
  const input = document.getElementById("simPosInput");
  if (!input) return null;
  const raw = input.value.trim();
  if (raw === "" || isNaN(Number(raw))) {
    setStatus("⚠ Please enter a valid position (0-based index).", "error");
    input.focus();
    return null;
  }
  const pos = parseInt(raw, 10);
  if (pos < 0) {
    setStatus("⚠ Position must be 0 or greater.", "error");
    input.focus();
    return null;
  }
  if (pos > size) {
    setStatus(\`⚠ Position \${pos} is out of range. Valid range: 0 to \${size}.\`, "error");
    input.focus();
    return null;
  }
  return pos;
}

function renderList(newNodeId = null, deleteNodeId = null) {
  const container = document.getElementById("dllSimContainer");
  if (!container) return;

  Array.from(container.children).forEach(child => {
    if (!child.classList.contains("sim-empty-state")) child.remove();
  });

  updateEmptyState();
  if (size === 0) {
    updatePointerLabels([]);
    updatedcllArc();
    return;
  }

  const orderedIds = [];
  let cur = head;
  if (cur !== null) {
    do {
      orderedIds.push(cur);
      cur = nodes[cur].next;
    } while (cur !== null && cur !== head);
  }

  const domNodes = {};

  orderedIds.forEach((id, idx) => {
    const node = nodes[id];
    const isFirst = (id === head);
    const isLast  = (id === tail);

    const el = document.createElement("div");
    el.className = "dll-node-el sll-node-el"; // Reuse styles
    el.dataset.id = id;

    if (id === newNodeId) {
      el.classList.add("node-new");
      setTimeout(() => el.classList.remove("node-new"), 500);
    }
    if (id === deleteNodeId) {
      el.classList.add("node-del");
    }

    const prevDisplay = isFirst
      ? \`<span class="dll-ptr-cell-val" style="color: #f59e0b; font-weight: bold;">TAIL</span>\`
      : \`<span class="dll-ptr-cell-val">\${nodes[node.prev] ? "← " + nodes[node.prev].value : "—"}</span>\`;

    const nextDisplay = isLast
      ? \`<span class="dll-ptr-cell-val" style="color: #16a34a; font-weight: bold;">HEAD</span>\`
      : \`<span class="dll-ptr-cell-val">\${nodes[node.next] ? "→ " + nodes[node.next].value : "—"}</span>\`;

    el.innerHTML = \`
      <div class="sll-node-val">\${node.value}</div>
      <div class="dll-ptr-row" style="display:flex; border-top:1px solid #c2d6ff;">
        <div class="dll-ptr-cell dll-prev-cell" style="flex:1; border-right:1px solid #c2d6ff; padding:4px; text-align:center;">
          <span class="dll-ptr-cell-label" style="display:block; font-size:10px;">prev</span>
          \${prevDisplay}
        </div>
        <div class="dll-ptr-cell dll-next-cell" style="flex:1; padding:4px; text-align:center;">
          <span class="dll-ptr-cell-label" style="display:block; font-size:10px;">next</span>
          \${nextDisplay}
        </div>
      </div>
    \`;

    container.appendChild(el);
    domNodes[id] = el;

    if (!isLast) {
      const arrows = document.createElement("div");
      arrows.className = "dll-sim-arrows";
      if (id === newNodeId || orderedIds[idx+1] === newNodeId) arrows.classList.add("arrow-new");
      arrows.innerHTML = \`<span class="dll-fwd-sim-arrow" style="display:block; margin-bottom:-4px;">→</span><span class="dll-bwd-sim-arrow" style="display:block;">←</span>\`;
      container.appendChild(arrows);
    }
  });

  requestAnimationFrame(() => {
    updatePointerLabels(orderedIds, domNodes);
    updatedcllArc();
  });
}

function updatePointerLabels(orderedIds, domNodes) {
  const ptrContainer = document.getElementById("dllPtrIndicators");
  const simContainer = document.getElementById("dllSimContainer");
  if (!ptrContainer || !simContainer) return;
  ptrContainer.innerHTML = "";
  if (!orderedIds || orderedIds.length === 0 || !domNodes) return;

  const headId = orderedIds[0];
  const tailId = orderedIds[orderedIds.length - 1];

  const ptrRect       = ptrContainer.getBoundingClientRect();

  function makeTag(label, cls) {
    const tag = document.createElement("div");
    tag.className = \`sll-ptr-tag \${cls}\`;
    tag.innerHTML = \`
      <span class="sll-ptr-tag-label">\${label}</span>
      <span class="sll-ptr-tag-arrow">↓</span>
    \`;
    return tag;
  }

  const headEl = domNodes[headId];
  if (headEl) {
    const headRect = headEl.getBoundingClientRect();
    const headTag  = makeTag("HEAD", "ptr-head");
    const leftOffset = headRect.left - ptrRect.left + headRect.width / 2;
    headTag.style.position = "absolute";
    headTag.style.left = (leftOffset - 20) + "px";
    headTag.style.bottom = "0";
    ptrContainer.appendChild(headTag);
  }

  const tailEl = domNodes[tailId];
  if (tailEl) {
    const tailRect = tailEl.getBoundingClientRect();
    const tailTag  = makeTag("TAIL", "ptr-tail");
    const leftOffset = tailRect.left - ptrRect.left + tailRect.width / 2;
    tailTag.style.position = "absolute";
    tailTag.style.left = (headId === tailId ? leftOffset + 30 : leftOffset - 20) + "px";
    tailTag.style.bottom = "0";
    ptrContainer.appendChild(tailTag);
  }
}

function updatedcllArc() {
  const pathNext = document.getElementById("dcllArcPathNext");
  const pathPrev = document.getElementById("dcllArcPathPrev");
  if (!pathNext || !pathPrev) return;
  if (size <= 1) {
    pathNext.setAttribute("d", "");
    pathPrev.setAttribute("d", "");
    return;
  }
  
  setTimeout(() => {
    const headEl = document.querySelector(\`[data-id="\${head}"]\`);
    const tailEl = document.querySelector(\`[data-id="\${tail}"]\`);
    if (!headEl || !tailEl) return;
    
    const svg = document.getElementById("dcllArcSvg");
    if (!svg) return;
    
    const svgRect = svg.getBoundingClientRect();
    const headRect = headEl.getBoundingClientRect();
    const tailRect = tailEl.getBoundingClientRect();
    
    // NEXT ARC (below nodes)
    const startXNext = tailRect.left + (tailRect.width * 0.75) - svgRect.left;
    const startYNext = tailRect.bottom - svgRect.top;
    
    const endXNext = headRect.left + (headRect.width * 0.75) - svgRect.left;
    const endYNext = headRect.bottom - svgRect.top;
    
    const curveDepth = 40 + (size * 5);
    const cp1XNext = startXNext;
    const cp1YNext = startYNext + curveDepth;
    const cp2XNext = endXNext;
    const cp2YNext = endYNext + curveDepth;
    
    const dNext = \`M \${startXNext} \${startYNext} C \${cp1XNext} \${cp1YNext}, \${cp2XNext} \${cp2YNext}, \${endXNext} \${endYNext + 10}\`;
    pathNext.setAttribute("d", dNext);

    // PREV ARC (above nodes)
    const startXPrev = headRect.left + (headRect.width * 0.25) - svgRect.left;
    const startYPrev = headRect.top - svgRect.top;
    
    const endXPrev = tailRect.left + (tailRect.width * 0.25) - svgRect.left;
    const endYPrev = tailRect.top - svgRect.top;
    
    const cp1XPrev = startXPrev;
    const cp1YPrev = startYPrev - curveDepth;
    const cp2XPrev = endXPrev;
    const cp2YPrev = endYPrev - curveDepth;
    
    const dPrev = \`M \${startXPrev} \${startYPrev} C \${cp1XPrev} \${cp1YPrev}, \${cp2XPrev} \${cp2YPrev}, \${endXPrev} \${endYPrev - 10}\`;
    pathPrev.setAttribute("d", dPrev);
  }, 50);
}

window.addEventListener('resize', updatedcllArc);

function dcllInsertBeginning() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus(\`⚠ List is full! Maximum size is \${MAX_LIST_SIZE}.\`, "error"); return; }

  animating = true;
  const id = newId();
  
  if (size === 0) {
    nodes[id] = { id, value: val, prev: id, next: id };
    head = id;
    tail = id;
  } else {
    nodes[id] = { id, value: val, prev: tail, next: head };
    nodes[head].prev = id;
    nodes[tail].next = id;
    head = id;
  }
  
  size++;
  opCount++;

  document.getElementById("simInput").value = "";
  document.getElementById("simInput").focus();

  renderList(id);
  updateStats();
  setStatus(\`✓ Inserted \${val} at beginning.\`, "success");

  setTimeout(() => { animating = false; }, 500);
}

function dcllInsertEnd() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus(\`⚠ List is full! Maximum size is \${MAX_LIST_SIZE}.\`, "error"); return; }

  animating = true;
  const id = newId();

  if (size === 0) {
    nodes[id] = { id, value: val, prev: id, next: id };
    head = id;
    tail = id;
  } else {
    nodes[id] = { id, value: val, prev: tail, next: head };
    const tailEl = document.querySelector(\`[data-id="\${tail}"]\`);
    if (tailEl) {
      tailEl.classList.add("node-highlight");
      setTimeout(() => tailEl.classList.remove("node-highlight"), 250);
    }
    nodes[tail].next = id;
    nodes[head].prev = id;
    tail = id;
  }
  
  size++;
  opCount++;

  document.getElementById("simInput").value = "";
  document.getElementById("simInput").focus();

  setTimeout(() => {
    renderList(id);
    updateStats();
    setStatus(\`✓ Inserted \${val} at end.\`, "success");
    setTimeout(() => { animating = false; }, 500);
  }, 280);
}

function dcllInsertAtPosition() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  const pos = getPositionValue();
  if (pos === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus(\`⚠ List is full! Maximum size is \${MAX_LIST_SIZE}.\`, "error"); return; }

  if (pos === 0) { dcllInsertBeginning(); return; }
  if (pos === size) { dcllInsertEnd(); return; }

  animating = true;
  const orderedIds = [];
  let cur = head;
  do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head && cur !== null);

  let step = 0;
  function traverseToPos() {
    if (step >= pos) {
      orderedIds.forEach(id => {
        const el = document.querySelector(\`[data-id="\${id}"]\`);
        if (el) el.classList.remove("node-position-highlight");
      });

      const nextId = orderedIds[pos];
      const prevId = nodes[nextId].prev;

      const newNodeId = newId();
      nodes[newNodeId] = { id: newNodeId, value: val, prev: prevId, next: nextId };
      nodes[prevId].next = newNodeId;
      nodes[nextId].prev = newNodeId;

      size++;
      opCount++;
      document.getElementById("simInput").value = "";
      document.getElementById("simPosInput").value = "";

      setTimeout(() => {
        renderList(newNodeId);
        updateStats();
        setStatus(\`✓ Inserted \${val} at position \${pos}.\`, "success");
        setTimeout(() => { animating = false; }, 500);
      }, 120);
      return;
    }
    const el = document.querySelector(\`[data-id="\${orderedIds[step]}"]\`);
    if (el) {
      el.classList.add("node-position-highlight");
      if (step === pos - 1) setTimeout(() => el.classList.add("node-insert-target"), 150);
    }
    setStatus(\`Traversing… at index \${step}\`, "info");
    step++;
    setTimeout(traverseToPos, 350);
  }
  setStatus(\`Traversing to position \${pos}…\`, "info");
  traverseToPos();
}

function dcllDelete() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }

  const orderedIds = [];
  let cur = head;
  do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head && cur !== null);

  let targetId = null;
  let foundAt = -1;
  for (let i = 0; i < orderedIds.length; i++) {
    if (nodes[orderedIds[i]].value === val) {
      targetId = orderedIds[i];
      foundAt = i;
      break;
    }
  }

  if (targetId === null) { setStatus(\`⚠ Value \${val} not found.\`, "error"); return; }

  animating = true;
  let step = 0;
  function traverseToTarget() {
    if (step > foundAt) {
      orderedIds.forEach(id => {
        const el = document.querySelector(\`[data-id="\${id}"]\`);
        if (el) el.classList.remove("node-position-highlight");
      });
      const targetEl = document.querySelector(\`[data-id="\${targetId}"]\`);
      if (targetEl) {
        targetEl.classList.remove("node-position-highlight");
        targetEl.classList.add("node-highlight");
      }
      setTimeout(() => {
        if (targetEl) { targetEl.classList.remove("node-highlight"); targetEl.classList.add("node-del"); }
        setTimeout(() => {
          if (size === 1) {
            head = null; tail = null;
          } else {
            const prevId = nodes[targetId].prev;
            const nextId = nodes[targetId].next;
            nodes[prevId].next = nextId;
            nodes[nextId].prev = prevId;
            if (targetId === head) head = nextId;
            if (targetId === tail) tail = prevId;
          }
          delete nodes[targetId];
          size--;
          opCount++;
          document.getElementById("simInput").value = "";
          renderList();
          updateStats();
          setStatus(\`✓ Deleted node with value \${val}.\`, "success");
          animating = false;
        }, 420);
      }, 300);
      return;
    }
    const el = document.querySelector(\`[data-id="\${orderedIds[step]}"]\`);
    if (el) el.classList.add("node-position-highlight");
    const isTarget = orderedIds[step] === targetId;
    setStatus(isTarget ? \`✓ Found value \${val}!\` : \`Searching…\`, isTarget ? "success" : "info");
    step++;
    setTimeout(traverseToTarget, 330);
  }
  setStatus(\`Searching for value \${val}…\`, "info");
  traverseToTarget();
}

function dcllDeleteBeginning() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }

  animating = true;
  const targetId = head;
  const headEl = document.querySelector(\`[data-id="\${targetId}"]\`);

  if (headEl) headEl.classList.add("node-highlight");
  setStatus(\`Highlighting head node…\`, "info");

  setTimeout(() => {
    if (headEl) { headEl.classList.remove("node-highlight"); headEl.classList.add("node-del"); }
    setTimeout(() => {
      const deletedVal = nodes[targetId].value;
      if (size === 1) {
        head = null; tail = null;
      } else {
        head = nodes[targetId].next;
        nodes[head].prev = tail;
        nodes[tail].next = head;
      }
      delete nodes[targetId];
      size--;
      opCount++;
      renderList();
      updateStats();
      setStatus(\`✓ Deleted head node (value: \${deletedVal}).\`, "success");
      animating = false;
    }, 420);
  }, 320);
}

function dcllDeleteEnd() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }
  animating = true;

  const targetId = tail;
  const tailEl = document.querySelector(\`[data-id="\${targetId}"]\`);
  if (tailEl) tailEl.classList.add("node-highlight");
  setStatus(\`Highlighting tail node…\`, "info");
  
  setTimeout(() => {
    if (tailEl) { tailEl.classList.remove("node-highlight"); tailEl.classList.add("node-del"); }
    setTimeout(() => {
      const deletedVal = nodes[targetId].value;
      if (size === 1) {
         head = null; tail = null;
      } else {
         tail = nodes[targetId].prev;
         nodes[tail].next = head;
         nodes[head].prev = tail;
      }
      delete nodes[targetId];
      size--; opCount++;
      renderList(); updateStats();
      setStatus(\`✓ Deleted tail node (value: \${deletedVal}).\`, "success");
      animating = false;
    }, 420);
  }, 320);
}

function dcllTraverse() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }

  animating = true;
  const orderedIds = [];
  let cur = head;
  do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head);

  let step = 0;
  function visitNext() {
    if (step > 0) {
      const prevEl = document.querySelector(\`[data-id="\${orderedIds[step - 1]}"]\`);
      if (prevEl) {
        prevEl.classList.remove("node-traverse");
        prevEl.classList.add("node-visited");
      }
    }
    if (step >= orderedIds.length) {
      const circArrow = document.querySelector("#dcllArcPathNext");
      if(circArrow) {
         circArrow.style.stroke = "#d97706";
         setTimeout(() => { circArrow.style.stroke = "#4f8cff"; }, 500);
      }
      setTimeout(() => {
        orderedIds.forEach(id => {
          const el = document.querySelector(\`[data-id="\${id}"]\`);
          if (el) el.classList.remove("node-visited");
        });
        setStatus("✓ Traversal complete.", "success");
        opCount++; updateStats();
        animating = false;
      }, 600);
      return;
    }
    const el = document.querySelector(\`[data-id="\${orderedIds[step]}"]\`);
    if (el) el.classList.add("node-traverse");
    setStatus(\`Visiting node \${step}: value \${nodes[orderedIds[step]].value}\`, "info");
    step++;
    setTimeout(visitNext, 500);
  }
  setStatus("Starting traversal…", "info");
  visitNext();
}

function dcllReset() {
  if (animating) return;
  nodes = {}; head = null; tail = null; size = 0;
  opCount = 0; nodeIdSeq = 0;
  document.getElementById("simInput").value = "";
  document.getElementById("simPosInput").value = "";
  renderList(); updateStats();
  setStatus("List reset.", "info");
}
`;

const insertIndex = scllJs.indexOf('/* ══════════════════════════════════════════════════════════════\\n   SINGLY CIRCULAR LINKED LIST SIMULATOR');
let newJs = scllJs;
if (insertIndex !== -1) {
  newJs = scllJs.substring(0, insertIndex) + engineCode;
}
newJs = newJs.replace(/scll/g, 'dcll');
newJs = newJs.replace(/sll/g, 'dll');
newJs = newJs.replace(/doubly_circular_linked_list_unit2/g, 'doubly_circular_linked_list_unit2'); // keep the same

fs.writeFileSync(path.join(destDcllDir, 'doubly-circular-linked-list.js'), newJs);

console.log('Successfully created DCLL');
