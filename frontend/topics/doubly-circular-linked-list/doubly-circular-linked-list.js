/* ─── doubly-circular-linked-list.js ────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("markCompleteBtn");
  if (btn) btn.addEventListener("click", markComplete);

  const token = localStorage.getItem("token");
  if (!token) { window.location.href = "../../login.html"; return; }

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user && user.name) {
    const sidebarName = document.getElementById("sidebarUserName");
    if (sidebarName) sidebarName.textContent = user.name;
    const avatar = document.getElementById("userAvatar");
    if (avatar) avatar.textContent = user.name.charAt(0).toUpperCase();
  }

  checkIfCompleted();
});

async function checkIfCompleted() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/me", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const user = await response.json();
    if (user.completedTopics && user.completedTopics.includes("doubly_circular_linked_list_unit2")) {
      setCompletedState();
    }
  } catch (err) {}
}

async function markComplete() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn || btn.disabled) return;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/complete-topic", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ topicId: "doubly_circular_linked_list_unit2" })
    });
    if (response.ok) { setCompletedState(); showXpPopup(); }
  } catch (err) {}
}

function setCompletedState() {
  const btn = document.getElementById("markCompleteBtn");
  if (!btn) return;
  btn.classList.add("completed");
  btn.disabled = true;
  btn.querySelector(".btn-label").textContent = "Completed ✓";
}

function showXpPopup() {
  const popup = document.getElementById("xpPopup");
  if (!popup) return;
  popup.classList.remove("hide");
  popup.classList.add("show");
  setTimeout(() => { popup.classList.remove("show"); popup.classList.add("hide"); }, 2600);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "../../login.html";
}

// Minimal sidebar helpers (safe no-ops if markup is missing).
window.toggleSidebar = window.toggleSidebar || function () {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  const overlay = document.getElementById("sidebarOverlay");
  const mainContent = document.querySelector(".main");

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    const isOpen = sidebar.classList.contains("sidebar-mobile-open");
    sidebar.classList.toggle("sidebar-mobile-open");
    if (overlay) overlay.classList.toggle("active");
    document.body.style.overflow = !isOpen ? "hidden" : "";
  } else {
    sidebar.classList.toggle("sidebar-collapsed");
    if (mainContent) mainContent.classList.toggle("main-expanded");
  }
};

window.closeSidebar = window.closeSidebar || function () {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  const overlay = document.getElementById("sidebarOverlay");
  sidebar.classList.remove("sidebar-mobile-open");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
};

function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (item) item.classList.toggle("open");
}

// Theory-only page: disable simulator/visualizer logic.
if (false) {
/* ══════════════════════════════════════════════════════════════
   DOUBLY CIRCULAR LINKED LIST SIMULATOR
══════════════════════════════════════════════════════════════ */

const MAX_LIST_SIZE = 8;
const VALUE_MIN     = -999;
const VALUE_MAX     = 999;

let nodes     = {};
let head      = null;
let tail      = null;
let size      = 0;
let opCount   = 0;
let animating = false;
let nodeIdSeq = 0;

function newId() { return "n" + (++nodeIdSeq); }

/* ─── Status ─────────────────────────────────────────────────── */
function setStatus(msg, type = "") {
  const bar = document.getElementById("simStatus");
  const txt = document.getElementById("simStatusText");
  if (!bar || !txt) return;
  bar.className = "sim-status";
  if (type) bar.classList.add(`status-${type}`);
  txt.textContent = msg;
}

/* ─── Stats panel ────────────────────────────────────────────── */
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

/* ─── Empty state ────────────────────────────────────────────── */
function updateEmptyState() {
  const empty = document.getElementById("simEmptyState");
  if (!empty) return;
  empty.style.display = size === 0 ? "flex" : "none";
}

/* ─── Input validation ───────────────────────────────────────── */
function getInputValue() {
  const input = document.getElementById("simInput");
  if (!input) return null;
  const raw = input.value.trim();
  if (raw === "" || isNaN(Number(raw))) { setStatus("⚠ Enter a valid number.", "error"); return null; }
  const val = parseInt(raw, 10);
  if (val < VALUE_MIN || val > VALUE_MAX) { setStatus(`⚠ Value must be ${VALUE_MIN}–${VALUE_MAX}.`, "error"); return null; }
  return val;
}

/* ══════════════════════════════════════════════════════════════
   RENDER — SLL-style horizontal nodes
══════════════════════════════════════════════════════════════ */
function renderList(newNodeId = null, deleteNodeId = null) {
  const container = document.getElementById("dllSimContainer");
  if (!container) return;

  // Remove all non-empty-state children
  Array.from(container.children).forEach(child => {
    if (!child.classList.contains("sim-empty-state")) child.remove();
  });

  updateEmptyState();

  if (size === 0) {
    updatePointerLabels([], {});
    updateArc();
    return;
  }

  // Build ordered ID list
  const orderedIds = [];
  let cur = head;
  if (cur !== null) {
    do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head);
  }

  const domNodes = {};

  orderedIds.forEach((id, idx) => {
    const node = nodes[id];
    const isFirst = (id === head);
    const isLast  = (id === tail);

    // ── Node element ──────────────────────────────────────────
    const el = document.createElement("div");
    el.className = "sll-node-el dcll-node-el";
    el.dataset.id = id;

    if (id === newNodeId) {
      el.classList.add("node-new");
      setTimeout(() => el.classList.remove("node-new"), 500);
    }
    if (id === deleteNodeId) {
      el.classList.add("node-del");
    }

    // PREV cell
    const prevCell = document.createElement("div");
    prevCell.className = "dcll-ptr-cell dcll-prev-cell";
    const prevLabel = document.createElement("span");
    prevLabel.className = "dcll-ptr-label";
    prevLabel.textContent = "prev";
    const prevVal = document.createElement("span");
    prevVal.className = "dcll-ptr-val";
    if (isFirst) {
      prevVal.innerHTML = `<span class="dcll-circ-tag dcll-circ-tail">← TAIL</span>`;
    } else {
      prevVal.textContent = "← " + nodes[node.prev].value;
    }
    prevCell.appendChild(prevLabel);
    prevCell.appendChild(prevVal);

    // DATA cell
    const dataCell = document.createElement("div");
    dataCell.className = "sll-node-val";
    dataCell.textContent = node.value;

    // NEXT cell
    const nextCell = document.createElement("div");
    nextCell.className = "dcll-ptr-cell dcll-next-cell";
    const nextLabel = document.createElement("span");
    nextLabel.className = "dcll-ptr-label";
    nextLabel.textContent = "next";
    const nextVal = document.createElement("span");
    nextVal.className = "dcll-ptr-val";
    if (isLast) {
      nextVal.innerHTML = `<span class="dcll-circ-tag dcll-circ-head">HEAD →</span>`;
    } else {
      nextVal.textContent = nodes[node.next].value + " →";
    }
    nextCell.appendChild(nextLabel);
    nextCell.appendChild(nextVal);

    el.appendChild(prevCell);
    el.appendChild(dataCell);
    el.appendChild(nextCell);

    container.appendChild(el);
    domNodes[id] = el;

    // ── Double arrows between nodes ───────────────────────────
    if (!isLast) {
      const arrows = document.createElement("div");
      arrows.className = "dcll-between-arrows";
      arrows.innerHTML = `<span class="dcll-fwd-arrow">→</span><span class="dcll-bwd-arrow">←</span>`;
      container.appendChild(arrows);
    }
  });

  // Pointer tags + arcs after layout settles
  requestAnimationFrame(() => {
    updatePointerLabels(orderedIds, domNodes);
    updateArc();
  });
}

/* ── HEAD / TAIL animated pointer tags above nodes ─────────── */
function updatePointerLabels(orderedIds, domNodes) {
  const ptrContainer = document.getElementById("dllPtrIndicators");
  if (!ptrContainer) return;
  ptrContainer.innerHTML = "";
  if (!orderedIds || orderedIds.length === 0) return;

  const headId = orderedIds[0];
  const tailId = orderedIds[orderedIds.length - 1];
  const ptrRect = ptrContainer.getBoundingClientRect();

  function makeTag(label, cls) {
    const tag = document.createElement("div");
    tag.className = `dcll-ptr-tag ${cls}`;
    const lbl = document.createElement("span");
    lbl.className = "dcll-ptr-tag-label";
    lbl.textContent = label;
    const arr = document.createElement("span");
    arr.className = "dcll-ptr-tag-arrow";
    arr.textContent = "↓";
    tag.appendChild(lbl);
    tag.appendChild(arr);
    return tag;
  }

  const headEl = domNodes[headId];
  if (headEl) {
    const headRect = headEl.getBoundingClientRect();
    const headTag  = makeTag("HEAD", "ptr-head");
    headTag.style.left = (headRect.left - ptrRect.left + headRect.width / 2 - 20) + "px";
    headTag.style.bottom = "0";
    ptrContainer.appendChild(headTag);
  }

  const tailEl = domNodes[tailId];
  if (tailEl) {
    const tailRect = tailEl.getBoundingClientRect();
    const tailTag  = makeTag("TAIL", "ptr-tail");
    const sameNode = (headId === tailId);
    tailTag.style.left = (tailRect.left - ptrRect.left + tailRect.width / 2 + (sameNode ? 30 : -20)) + "px";
    tailTag.style.bottom = "0";
    ptrContainer.appendChild(tailTag);
  }
}

/* ══════════════════════════════════════════════════════════════
   ARC SVG — Next arc BELOW (tail→head), Prev arc ABOVE (head→tail)
   Matches the Visual Structure diagram in Section 03
══════════════════════════════════════════════════════════════ */
function updateArc() {
  const pathNext = document.getElementById("dcllArcPathNext");
  const pathPrev = document.getElementById("dcllArcPathPrev");
  if (!pathNext || !pathPrev) return;

  if (size <= 1) {
    pathNext.setAttribute("d", "");
    pathPrev.setAttribute("d", "");
    return;
  }

  setTimeout(() => {
    const svg    = document.getElementById("dcllArcSvg");
    const headEl = document.querySelector(`[data-id="${head}"]`);
    const tailEl = document.querySelector(`[data-id="${tail}"]`);
    if (!svg || !headEl || !tailEl) return;

    const svgRect  = svg.getBoundingClientRect();
    const headRect = headEl.getBoundingClientRect();
    const tailRect = tailEl.getBoundingClientRect();

    // NEXT ARC — below container: starts at tail-right-bottom, curves down, arrives at head-left-bottom
    const nextStartX = tailRect.right  - svgRect.left - 14;
    const nextStartY = tailRect.bottom - svgRect.top;
    const nextEndX   = headRect.left   - svgRect.left + 14;
    const nextEndY   = headRect.bottom - svgRect.top;
    const nextDepth  = 48 + size * 4;
    const dNext = `M ${nextStartX} ${nextStartY}
                   C ${nextStartX} ${nextStartY + nextDepth},
                     ${nextEndX} ${nextEndY + nextDepth},
                     ${nextEndX} ${nextEndY + 8}`;
    pathNext.setAttribute("d", dNext);

    // PREV ARC — above container: starts at head-left-top, curves up, arrives at tail-right-top
    const prevStartX = headRect.left  - svgRect.left + 14;
    const prevStartY = headRect.top   - svgRect.top;
    const prevEndX   = tailRect.right - svgRect.left - 14;
    const prevEndY   = tailRect.top   - svgRect.top;
    const prevDepth  = 48 + size * 4;
    const dPrev = `M ${prevStartX} ${prevStartY}
                   C ${prevStartX} ${prevStartY - prevDepth},
                     ${prevEndX} ${prevEndY - prevDepth},
                     ${prevEndX} ${prevEndY - 8}`;
    pathPrev.setAttribute("d", dPrev);
  }, 60);
}

window.addEventListener("resize", updateArc);

/* ══════════════════════════════════════════════════════════════
   OPERATIONS
══════════════════════════════════════════════════════════════ */

function dcllInsertBeginning() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus("⚠ List is full (max 8 nodes).", "error"); return; }

  animating = true;
  const id = newId();

  if (size === 0) {
    nodes[id] = { id, value: val, prev: id, next: id };
    head = id; tail = id;
  } else {
    nodes[id] = { id, value: val, prev: tail, next: head };
    nodes[head].prev = id;
    nodes[tail].next = id;
    head = id;
  }

  size++; opCount++;
  document.getElementById("simInput").value = "";
  renderList(id);
  updateStats();
  setStatus(`✓ Inserted ${val} at beginning. New head = ${val}.`, "success");
  setTimeout(() => { animating = false; }, 500);
}

function dcllInsertEnd() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus("⚠ List is full (max 8 nodes).", "error"); return; }

  animating = true;
  const id = newId();

  if (size === 0) {
    nodes[id] = { id, value: val, prev: id, next: id };
    head = id; tail = id;
  } else {
    nodes[id] = { id, value: val, prev: tail, next: head };
    nodes[tail].next = id;
    nodes[head].prev = id;
    tail = id;
  }

  size++; opCount++;
  document.getElementById("simInput").value = "";
  renderList(id);
  updateStats();
  setStatus(`✓ Inserted ${val} at end. New tail = ${val}.`, "success");
  setTimeout(() => { animating = false; }, 500);
}

function dcllDeleteBeginning() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }
  animating = true;

  const targetId = head;
  const headEl   = document.querySelector(`[data-id="${targetId}"]`);
  if (headEl) headEl.classList.add("node-highlight");

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
      size--; opCount++;
      renderList();
      updateStats();
      setStatus(`✓ Deleted head node (${deletedVal}). Head updated.`, "success");
      animating = false;
    }, 420);
  }, 320);
}

function dcllDeleteEnd() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }
  animating = true;

  const targetId = tail;
  const tailEl   = document.querySelector(`[data-id="${targetId}"]`);
  if (tailEl) tailEl.classList.add("node-highlight");

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
      renderList();
      updateStats();
      setStatus(`✓ Deleted tail node (${deletedVal}). Tail updated.`, "success");
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
      const prevEl = document.querySelector(`[data-id="${orderedIds[step - 1]}"]`);
      if (prevEl) { prevEl.classList.remove("node-traverse"); prevEl.classList.add("node-visited"); }
    }
    if (step >= orderedIds.length) {
      setTimeout(() => {
        orderedIds.forEach(id => {
          const el = document.querySelector(`[data-id="${id}"]`);
          if (el) el.classList.remove("node-visited");
        });
        setStatus("✓ Traversal complete — visited all " + size + " nodes.", "success");
        opCount++; updateStats();
        animating = false;
      }, 600);
      return;
    }
    const el = document.querySelector(`[data-id="${orderedIds[step]}"]`);
    if (el) el.classList.add("node-traverse");
    setStatus(`Visiting node ${step + 1}/${size}: value = ${nodes[orderedIds[step]].value}`, "info");
    step++;
    setTimeout(visitNext, 500);
  }
  visitNext();
}

function dcllReset() {
  if (animating) return;
  nodes = {}; head = null; tail = null; size = 0; opCount = 0; nodeIdSeq = 0;
  document.getElementById("simInput").value = "";
  renderList();
  updateStats();
  setStatus("List reset. Ready for a new sequence.", "info");
}

} // end disabled simulator block