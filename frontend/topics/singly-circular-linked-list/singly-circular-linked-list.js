/* ─── singly-circular-linked-list.js ──────────────────────────────
   Handles:
   1. Auth check & user info population
   2. Mark Complete button state (matches SLL pattern)
   3. XP popup slide-in / fade-out
   4. Accordion toggle for operations sections
   5. Traversal animation on the step-by-step diagram
   6. SVG node hover highlights
──────────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("markCompleteBtn");
  if (btn) btn.addEventListener("click", markComplete);

  // ── Auth guard ─────────────────────────────────────────────────
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../../login.html";
    return;
  }

  // ── Populate user info ──────────────────────────────────────────
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user && user.name) {
    const sidebarName = document.getElementById("sidebarUserName");
    if (sidebarName) sidebarName.textContent = user.name;
    const avatar = document.getElementById("userAvatar");
    if (avatar) avatar.textContent = user.name.charAt(0).toUpperCase();
  }

  checkIfCompleted();
  initSvgNodeHovers();
});

/* ─── Auth & Completion ──────────────────────────────────────── */
async function checkIfCompleted() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/me", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const user = await response.json();
    if (user.completedTopics && user.completedTopics.includes("singly_circular_linked_list_unit2")) {
      setCompletedState();
    }
  } catch (err) {
    console.error("Completion check failed:", err);
  }
}

async function markComplete() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn || btn.disabled) return;

  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/complete-topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ topicId: "singly_circular_linked_list_unit2" })
    });
    const data = await response.json();
    if (response.ok) {
      setCompletedState();
      showXpPopup();
    } else {
      console.error("Server rejected completion:", data);
    }
  } catch (err) {
    console.error("Completion error:", err);
  }
}

function setCompletedState() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn) return;
  btn.classList.add("completed");
  btn.disabled = true;
  btn.querySelector(".btn-label").textContent = "Completed ✓";
}

/* ─── XP Popup ───────────────────────────────────────────────── */
function showXpPopup() {
  const popup = document.getElementById("xpPopup");
  if (!popup) return;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3200);
}

/* ─── Logout ─────────────────────────────────────────────────── */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "../../login.html";
}

/* ─── Accordion Toggle ───────────────────────────────────────── */
function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (!item) return;
  item.classList.toggle("open");
}

/* ─── Traversal Animation ────────────────────────────────────── */
let travAnimRunning = false;

function animateTraversal() {
  if (travAnimRunning) return;
  travAnimRunning = true;

  const btn = document.getElementById("animTravBtn");
  if (btn) btn.disabled = true;

  const nodeIds = ["ts1", "ts2", "ts3", "ts4"];
  const nodes = nodeIds.map(id => document.getElementById(id));
  const nodeEls = nodes.map(n => n ? n.querySelector(".ts-node") : null);

  // reset all
  nodeEls.forEach(n => {
    if (n) {
      n.classList.remove("ts-active", "ts-visited");
    }
  });

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  async function run() {
    for (let i = 0; i < nodeEls.length; i++) {
      const el = nodeEls[i];
      if (!el) continue;

      // activate current
      el.classList.add("ts-active");
      await delay(600);

      // mark visited (except last which stays red/different)
      el.classList.remove("ts-active");
      if (i < nodeEls.length - 1) {
        el.classList.add("ts-visited");
      }
      // brief pause between
      await delay(150);
    }

    // animate the circular arrow element
    const circArrow = document.querySelector(".ts-circ");
    if (circArrow) {
      circArrow.style.transition = "all 0.3s ease";
      circArrow.style.background = "#fef3c7";
      circArrow.style.borderColor = "#f59e0b";
      circArrow.style.color = "#b45309";
      await delay(600);
      circArrow.style.background = "";
      circArrow.style.borderColor = "";
      circArrow.style.color = "";
    }

    // reset after a pause
    await delay(800);
    nodeEls.forEach(n => {
      if (n) n.classList.remove("ts-active", "ts-visited");
    });

    travAnimRunning = false;
    if (btn) btn.disabled = false;
  }

  run();
}

/* ─── SVG Node Hover Highlights ─────────────────────────────── */
function initSvgNodeHovers() {
  const svgNodes = document.querySelectorAll(".svg-node");
  svgNodes.forEach(node => {
    node.addEventListener("mouseenter", () => {
      node.classList.add("node-active");
    });
    node.addEventListener("mouseleave", () => {
      node.classList.remove("node-active");
    });
  });
}

/* ─── Circular Arc Animation (optional subtle pulse) ─────────── */
(function startArcPulse() {
  const arc = document.getElementById("circularArc");
  if (!arc) return;

  let opacity = 1;
  let dir = -1;

  setInterval(() => {
    opacity += dir * 0.015;
    if (opacity <= 0.45) dir = 1;
    if (opacity >= 1.0) dir = -1;
    arc.style.opacity = opacity;
  }, 50);
})();

/* ══════════════════════════════════════════════════════════════
   SINGLY CIRCULAR LINKED LIST SIMULATOR
══════════════════════════════════════════════════════════════ */

const MAX_LIST_SIZE = 8;
const VALUE_MIN     = -999;
const VALUE_MAX     = 999;

let nodes   = {};   // id → { id, value, next }
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

function handleScllInsertAtPosition() {
  const posInput = document.getElementById("simPosInput");
  if (!posInput) return;
  if (posInput.disabled) {
    enablePositionInput(true);
    posInput.focus();
    setStatus("Position input enabled — enter a position and click 'At Position' again.", "info");
    return;
  }
  scllInsertAtPosition();
}

function setStatus(msg, type = "") {
  const bar = document.getElementById("simStatus");
  const txt = document.getElementById("simStatusText");
  if (!bar || !txt) return;
  bar.className = "sim-status";
  if (type) bar.classList.add(`status-${type}`);
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
    setStatus(`⚠ Value out of range. Use ${VALUE_MIN} to ${VALUE_MAX}.`, "error");
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
    setStatus(`⚠ Position ${pos} is out of range. Valid range: 0 to ${size}.`, "error");
    input.focus();
    return null;
  }
  return pos;
}

function renderList(newNodeId = null, deleteNodeId = null) {
  const container = document.getElementById("sllSimContainer");
  if (!container) return;

  Array.from(container.children).forEach(child => {
    if (!child.classList.contains("sim-empty-state")) child.remove();
  });

  updateEmptyState();
  if (size === 0) {
    updatePointerLabels([]);
    updateScllArc();
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
    const isLast = (id === tail);

    const el = document.createElement("div");
    el.className = "sll-node-el";
    el.dataset.id = id;

    if (id === newNodeId) {
      el.classList.add("node-new");
      setTimeout(() => el.classList.remove("node-new"), 500);
    }
    if (id === deleteNodeId) {
      el.classList.add("node-del");
    }

    const nextPtrDisplay = isLast
      ? `<span class="sll-node-ptr-val" style="color: #16a34a; font-weight: bold;">HEAD</span>`
      : `<span class="sll-node-ptr-val">${nodes[node.next] ? "→ " + nodes[node.next].value : "—"}</span>`;

    el.innerHTML = `
      <div class="sll-node-val">${node.value}</div>
      <div class="sll-node-ptr">
        <span class="sll-node-ptr-label">next</span>
        ${nextPtrDisplay}
      </div>
    `;

    container.appendChild(el);
    domNodes[id] = el;

    if (!isLast) {
      const arrow = document.createElement("div");
      arrow.className = "sll-sim-arrow";
      if (id === newNodeId) arrow.classList.add("arrow-new");
      arrow.textContent = "→";
      container.appendChild(arrow);
    }
  });

  requestAnimationFrame(() => {
    updatePointerLabels(orderedIds, domNodes);
    updateScllArc(orderedIds, domNodes);
  });
}

function updatePointerLabels(orderedIds, domNodes) {
  const ptrContainer = document.getElementById("sllPtrIndicators");
  const simContainer = document.getElementById("sllSimContainer");
  if (!ptrContainer || !simContainer) return;
  ptrContainer.innerHTML = "";
  if (!orderedIds || orderedIds.length === 0 || !domNodes) return;

  const headId = orderedIds[0];
  const tailId = orderedIds[orderedIds.length - 1];

  const containerRect = simContainer.getBoundingClientRect();
  const ptrRect       = ptrContainer.getBoundingClientRect();

  function makeTag(label, cls) {
    const tag = document.createElement("div");
    tag.className = `sll-ptr-tag ${cls}`;
    tag.innerHTML = `
      <span class="sll-ptr-tag-label">${label}</span>
      <span class="sll-ptr-tag-arrow">↓</span>
    `;
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

function updateScllArc() {
  const path = document.getElementById("scllArcPath");
  if (!path) return;
  if (size === 0) {
    path.setAttribute("d", "");
    return;
  }
  
  setTimeout(() => {
    const headEl = document.querySelector(\`[data-id="\${head}"]\`);
    const tailEl = document.querySelector(\`[data-id="\${tail}"]\`);
    if (!headEl || !tailEl) return;
    
    const svg = document.getElementById("scllArcSvg");
    if (!svg) return;
    
    const svgRect = svg.getBoundingClientRect();
    const headRect = headEl.getBoundingClientRect();
    const tailRect = tailEl.getBoundingClientRect();
    
    // Connect bottom center of tail to bottom center of head (curves below)
    const startX = tailRect.left + (tailRect.width / 2) - svgRect.left;
    const startY = tailRect.bottom - svgRect.top;
    
    const endX = headRect.left + (headRect.width / 2) - svgRect.left;
    const endY = headRect.bottom - svgRect.top;
    
    // Control points to draw the curve below the nodes
    const curveDepth = 40 + (size * 5); // deeper curve for longer lists
    const cp1X = startX;
    const cp1Y = startY + curveDepth;
    const cp2X = endX;
    const cp2Y = endY + curveDepth;
    
    const d = \`M \${startX} \${startY} C \${cp1X} \${cp1Y}, \${cp2X} \${cp2Y}, \${endX} \${endY + 10}\`;
    path.setAttribute("d", d);
  }, 50);
}

window.addEventListener('resize', updateScllArc);

function scllInsertBeginning() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus(\`⚠ List is full! Maximum size is \${MAX_LIST_SIZE}.\`, "error"); return; }

  animating = true;
  const id = newId();
  nodes[id] = { id, value: val, next: head };

  if (size === 0) {
    head = id;
    tail = id;
    nodes[id].next = head; // Circular link
  } else {
    head = id;
    nodes[tail].next = head; // Update tail's next to new head
  }
  size++;
  opCount++;

  document.getElementById("simInput").value = "";
  document.getElementById("simInput").focus();

  renderList(id);
  updateStats();
  setStatus(\`✓ Inserted \${val} at the beginning.\`, "success");

  setTimeout(() => { animating = false; }, 500);
}

function scllInsertEnd() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus(\`⚠ List is full! Maximum size is \${MAX_LIST_SIZE}.\`, "error"); return; }

  animating = true;
  const id = newId();
  nodes[id] = { id, value: val, next: head }; // Points to head

  if (size === 0) {
    head = id;
    tail = id;
    nodes[id].next = head;
  } else {
    const tailEl = document.querySelector(\`[data-id="\${tail}"]\`);
    if (tailEl) {
      tailEl.classList.add("node-highlight");
      setTimeout(() => tailEl.classList.remove("node-highlight"), 250);
    }
    nodes[tail].next = id;
    tail = id;
  }
  size++;
  opCount++;

  document.getElementById("simInput").value = "";
  document.getElementById("simInput").focus();

  setTimeout(() => {
    renderList(id);
    updateStats();
    setStatus(\`✓ Inserted \${val} at the end (tail pointer — O(1)).\`, "success");
    setTimeout(() => { animating = false; }, 500);
  }, 280);
}

function scllInsertAtPosition() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  const pos = getPositionValue();
  if (pos === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus(\`⚠ List is full! Maximum size is \${MAX_LIST_SIZE}.\`, "error"); return; }

  if (pos === 0) { scllInsertBeginning(); return; }
  if (pos === size) { scllInsertEnd(); return; }

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

      const prevId = orderedIds[pos - 1];
      const nextId = nodes[prevId].next;

      const newNodeId = newId();
      nodes[newNodeId] = { id: newNodeId, value: val, next: nextId };
      nodes[prevId].next = newNodeId;

      if (nextId === head && pos === size) tail = newNodeId;

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

function scllDelete() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }

  const orderedIds = [];
  let cur = head;
  do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head && cur !== null);

  let targetId = null;
  let prevId = null;
  let foundAt = -1;
  for (let i = 0; i < orderedIds.length; i++) {
    if (nodes[orderedIds[i]].value === val) {
      targetId = orderedIds[i];
      prevId = i > 0 ? orderedIds[i - 1] : tail; // For circular, prev of head is tail
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
            nodes[prevId].next = nodes[targetId].next;
            if (targetId === head) head = nodes[targetId].next;
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

function scllDeleteBeginning() {
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

function scllDeleteEnd() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }
  animating = true;

  if (size === 1) {
    const targetId = head;
    const el = document.querySelector(\`[data-id="\${targetId}"]\`);
    if (el) el.classList.add("node-highlight");
    setStatus(\`Highlighting tail node…\`, "info");
    setTimeout(() => {
      if (el) { el.classList.remove("node-highlight"); el.classList.add("node-del"); }
      setTimeout(() => {
        const deletedVal = nodes[targetId].value;
        head = null; tail = null;
        delete nodes[targetId];
        size--; opCount++;
        renderList(); updateStats();
        setStatus(\`✓ Deleted tail node (value: \${deletedVal}). List empty.\`, "success");
        animating = false;
      }, 420);
    }, 320);
    return;
  }

  const orderedIds = [];
  let cur = head;
  do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head);

  const targetId = orderedIds[orderedIds.length - 1];
  const newTailId = orderedIds[orderedIds.length - 2];

  let step = 0;
  function traverseToPenultimate() {
    if (step >= orderedIds.length - 1) {
      orderedIds.forEach(id => {
        const el = document.querySelector(\`[data-id="\${id}"]\`);
        if (el) el.classList.remove("node-position-highlight");
      });
      const el = document.querySelector(\`[data-id="\${targetId}"]\`);
      if (el) el.classList.add("node-highlight");
      setTimeout(() => {
        if (el) { el.classList.remove("node-highlight"); el.classList.add("node-del"); }
        setTimeout(() => {
          const deletedVal = nodes[targetId].value;
          tail = newTailId;
          nodes[tail].next = head;
          delete nodes[targetId];
          size--; opCount++;
          renderList(); updateStats();
          setStatus(\`✓ Deleted tail node (value: \${deletedVal}).\`, "success");
          animating = false;
        }, 420);
      }, 300);
      return;
    }
    const el = document.querySelector(\`[data-id="\${orderedIds[step]}"]\`);
    if (el) el.classList.add("node-position-highlight");
    setStatus(\`Traversing… index \${step}\`, "info");
    step++;
    setTimeout(traverseToPenultimate, 300);
  }
  setStatus(\`Traversing to find new tail…\`, "info");
  traverseToPenultimate();
}

function scllTraverse() {
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
      const circArrow = document.querySelector("#scllArcPath");
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

function scllReset() {
  if (animating) return;
  nodes = {}; head = null; tail = null; size = 0;
  opCount = 0; nodeIdSeq = 0;
  document.getElementById("simInput").value = "";
  document.getElementById("simPosInput").value = "";
  renderList(); updateStats();
  setStatus("List reset.", "info");
}
