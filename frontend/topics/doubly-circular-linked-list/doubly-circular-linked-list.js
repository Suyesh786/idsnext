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

function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (item) item.classList.toggle("open");
}

/* ══════════════════════════════════════════════════════════════
   DOUBLY CIRCULAR LINKED LIST SIMULATOR
══════════════════════════════════════════════════════════════ */

const MAX_LIST_SIZE = 8;
const VALUE_MIN     = -999;
const VALUE_MAX     = 999;

let nodes   = {};   
let head    = null; 
let tail    = null; 
let size    = 0;
let opCount = 0;
let animating = false;
let nodeIdSeq = 0;

function newId() { return "n" + (++nodeIdSeq); }

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
  if (raw === "" || isNaN(Number(raw))) { setStatus("⚠ Enter a valid number.", "error"); return null; }
  return parseInt(raw, 10);
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
    do { orderedIds.push(cur); cur = nodes[cur].next; } while (cur !== head);
  }

  const domNodes = {};

  orderedIds.forEach((id, idx) => {
    const node = nodes[id];
    const isFirst = (id === head);
    const isLast  = (id === tail);

    const el = document.createElement("div");
    el.className = "dcll-node-horizontal sll-node-el"; 
    el.dataset.id = id;

    if (id === newNodeId) { el.classList.add("node-new"); setTimeout(() => el.classList.remove("node-new"), 500); }
    if (id === deleteNodeId) { el.classList.add("node-del"); }

    const prevDisplay = isFirst
      ? `<span style="color: #d97706; font-weight: bold; font-size:11px;">← TAIL</span>`
      : `<span style="color: #666; font-size:11px;">← ${nodes[node.prev] ? nodes[node.prev].value : ""}</span>`;

    const nextDisplay = isLast
      ? `<span style="color: #2e7d32; font-weight: bold; font-size:11px;">HEAD →</span>`
      : `<span style="color: #666; font-size:11px;">${nodes[node.next] ? nodes[node.next].value : ""} →</span>`;

    el.innerHTML = `
      <div class="dll-ptr-cell dll-prev-cell">
        <span style="font-size:10px; color:#a0aec0; margin-bottom:2px;">prev</span>
        ${prevDisplay}
      </div>
      <div class="sll-node-val">${node.value}</div>
      <div class="dll-ptr-cell dll-next-cell">
        <span style="font-size:10px; color:#a0aec0; margin-bottom:2px;">next</span>
        ${nextDisplay}
      </div>
    `;

    container.appendChild(el);
    domNodes[id] = el;

    if (!isLast) {
      const arrows = document.createElement("div");
      arrows.className = "dll-sim-arrows";
      arrows.innerHTML = `<span class="dll-fwd-sim-arrow">→</span><span class="dll-bwd-sim-arrow">←</span>`;
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
  if (!ptrContainer) return;
  ptrContainer.innerHTML = "";
  if (!orderedIds || orderedIds.length === 0) return;

  const headId = orderedIds[0];
  const tailId = orderedIds[orderedIds.length - 1];
  const ptrRect = ptrContainer.getBoundingClientRect();

  function makeTag(label, cls) {
    const tag = document.createElement("div");
    tag.className = `sll-ptr-tag ${cls}`;
    tag.innerHTML = `<span class="sll-ptr-tag-label">${label}</span><span class="sll-ptr-tag-arrow">↓</span>`;
    return tag;
  }

  const headEl = domNodes[headId];
  if (headEl) {
    const headRect = headEl.getBoundingClientRect();
    const headTag  = makeTag("HEAD", "ptr-head");
    const leftOffset = headRect.left - ptrRect.left + (headRect.width / 2);
    headTag.style.position = "absolute";
    headTag.style.left = (leftOffset - 20) + "px";
    headTag.style.bottom = "0";
    ptrContainer.appendChild(headTag);
  }

  const tailEl = domNodes[tailId];
  if (tailEl) {
    const tailRect = tailEl.getBoundingClientRect();
    const tailTag  = makeTag("TAIL", "ptr-tail");
    const leftOffset = tailRect.left - ptrRect.left + (tailRect.width / 2);
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
    const headEl = document.querySelector(`[data-id="${head}"]`);
    const tailEl = document.querySelector(`[data-id="${tail}"]`);
    if (!headEl || !tailEl) return;
    
    const svg = document.getElementById("dcllArcSvg");
    const svgRect = svg.getBoundingClientRect();
    const headRect = headEl.getBoundingClientRect();
    const tailRect = tailEl.getBoundingClientRect();
    
    // NEXT ARC (below nodes: Tail -> Head)
    const startXNext = tailRect.left + (tailRect.width * 0.8) - svgRect.left;
    const startYNext = tailRect.bottom - svgRect.top;
    const endXNext = headRect.left + (headRect.width * 0.8) - svgRect.left;
    const endYNext = headRect.bottom - svgRect.top;
    
    const curveDepthNext = 40 + (size * 5);
    const dNext = `M ${startXNext} ${startYNext} C ${startXNext} ${startYNext + curveDepthNext}, ${endXNext} ${endYNext + curveDepthNext}, ${endXNext} ${endYNext + 10}`;
    pathNext.setAttribute("d", dNext);

    // PREV ARC (above nodes: Head -> Tail)
    const startXPrev = headRect.left + (headRect.width * 0.2) - svgRect.left;
    const startYPrev = headRect.top - svgRect.top;
    const endXPrev = tailRect.left + (tailRect.width * 0.2) - svgRect.left;
    const endYPrev = tailRect.top - svgRect.top;
    
    const curveDepthPrev = 40 + (size * 5);
    const dPrev = `M ${startXPrev} ${startYPrev} C ${startXPrev} ${startYPrev - curveDepthPrev}, ${endXPrev} ${endYPrev - curveDepthPrev}, ${endXPrev} ${endYPrev - 10}`;
    pathPrev.setAttribute("d", dPrev);
  }, 50);
}

window.addEventListener('resize', updatedcllArc);

function dcllInsertBeginning() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus("⚠ List is full!", "error"); return; }

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
  
  size++; opCount++;
  document.getElementById("simInput").value = "";
  
  renderList(id);
  updateStats();
  setStatus(`✓ Inserted ${val} at beginning.`, "success");
  setTimeout(() => { animating = false; }, 500);
}

function dcllInsertEnd() {
  if (animating) return;
  const val = getInputValue();
  if (val === null) return;
  if (size >= MAX_LIST_SIZE) { setStatus("⚠ List is full!", "error"); return; }

  animating = true;
  const id = newId();

  if (size === 0) {
    nodes[id] = { id, value: val, prev: id, next: id };
    head = id;
    tail = id;
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
  setStatus(`✓ Inserted ${val} at end.`, "success");
  setTimeout(() => { animating = false; }, 500);
}

function dcllDeleteBeginning() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }
  animating = true;
  
  const targetId = head;
  const headEl = document.querySelector(`[data-id="${targetId}"]`);
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
      renderList(); updateStats();
      setStatus(`✓ Deleted head node (${deletedVal}).`, "success");
      animating = false;
    }, 420);
  }, 320);
}

function dcllDeleteEnd() {
  if (animating) return;
  if (size === 0) { setStatus("⚠ List is empty.", "error"); return; }
  animating = true;

  const targetId = tail;
  const tailEl = document.querySelector(`[data-id="${targetId}"]`);
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
      renderList(); updateStats();
      setStatus(`✓ Deleted tail node (${deletedVal}).`, "success");
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
        setStatus("✓ Traversal complete.", "success");
        opCount++; updateStats();
        animating = false;
      }, 600);
      return;
    }
    const el = document.querySelector(`[data-id="${orderedIds[step]}"]`);
    if (el) el.classList.add("node-traverse");
    setStatus(`Visiting node ${step}: value ${nodes[orderedIds[step]].value}`, "info");
    step++;
    setTimeout(visitNext, 500);
  }
  visitNext();
}

function dcllReset() {
  if (animating) return;
  nodes = {}; head = null; tail = null; size = 0; opCount = 0; nodeIdSeq = 0;
  document.getElementById("simInput").value = "";
  renderList(); updateStats();
  setStatus("List reset.", "info");
}
