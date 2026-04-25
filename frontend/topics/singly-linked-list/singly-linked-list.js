/* ─── singly-linked-list.js ───────────────────────────────────────
   Handles:
   1. Auth check & user info population (same pattern as stack.js)
   2. Mark Complete button state change
   3. XP popup slide-in / fade-out
   4. Implementation Tab Switcher & Copy Code
   5. Singly Linked List Simulator
      - Internal: object-based linked list with head & tail pointers
      - UI: horizontal node chain with arrows, HEAD/TAIL labels
      - Operations: Insert Begin, Insert End, Delete, Traverse, Reset
      - Animations: scale-in, highlight, scale-out, traverse pulse
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
});

/* ─── Auth & Completion ──────────────────────────────────────── */
async function checkIfCompleted() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://idsnext-backend.onrender.com/api/users/me", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const user = await response.json();
    if (user.completedTopics && user.completedTopics.includes("singly_linked_list_unit2")) {
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
      body: JSON.stringify({ topicId: "singly_linked_list_unit2" })
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
  btn.innerHTML = `
    <svg class="btn-icon" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9
           10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clip-rule="evenodd"/>
    </svg>
    <span class="btn-label">Completed ✓</span>
  `;
}

/* ─── XP Popup ───────────────────────────────────────────────── */
function showXpPopup() {
  const popup = document.getElementById("xpPopup");
  if (!popup) return;
  popup.classList.remove("hide");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
    popup.classList.add("hide");
  }, 2600);
}

/* ─── Logout ─────────────────────────────────────────────────── */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}

/* ─── Implementation Tab Switcher ────────────────────────────── */
function switchTab(tab) {
  document.querySelectorAll(".impl-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".impl-panel").forEach(p => p.classList.remove("active"));

  const activeTab   = document.querySelector(`.impl-tab[onclick="switchTab('${tab}')"]`);
  const activePanel = document.getElementById(`tab-${tab}`);

  if (activeTab)   activeTab.classList.add("active");
  if (activePanel) activePanel.classList.add("active");
}

/* ─── Copy Code Button ───────────────────────────────────────── */
function copyCode(btn) {
  const pre = btn.closest(".code-block").querySelector(".code-content");
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = "Copied!";
    btn.classList.add("copied");
    setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 1800);
  }).catch(() => {
    btn.textContent = "Error";
    setTimeout(() => { btn.textContent = "Copy"; }, 1800);
  });
}


/* ══════════════════════════════════════════════════════════════
   SINGLY LINKED LIST SIMULATOR
══════════════════════════════════════════════════════════════ */

/* ─── Internal Data Structure ────────────────────────────────── *
 * We use an array of node objects to mirror a real linked list:
 *   nodes[i] = { id: unique_id, value: number, next: id | null }
 * head = id of first node (or null)
 * tail = id of last node  (or null)
 * The DOM always reflects this internal state.
 * ─────────────────────────────────────────────────────────────── */

const MAX_LIST_SIZE = 8;
const VALUE_MIN     = -999;
const VALUE_MAX     = 999;

let nodes   = {};   // id → { id, value, next }
let head    = null; // id of head node
let tail    = null; // id of tail node
let size    = 0;
let opCount = 0;
let animating = false;
let nodeIdSeq = 0;  // auto-increment for unique node ids

function newId() { return "n" + (++nodeIdSeq); }

/* ─── Status helpers ─────────────────────────────────────────── */
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

/* ─── Validate input ─────────────────────────────────────────── */
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

/* ══════════════════════════════════════════════════════════════
   DOM RENDERING — builds horizontal chain
══════════════════════════════════════════════════════════════ */

/**
 * Full re-render of the node chain.
 * Called after every operation that changes structure.
 * Animates only the node with newNodeId (scale-in) if provided.
 */
function renderList(newNodeId = null, deleteNodeId = null) {
  const container = document.getElementById("sllSimContainer");
  if (!container) return;

  // Remove all existing node elements & arrows (keep empty-state)
  Array.from(container.children).forEach(child => {
    if (!child.classList.contains("sim-empty-state")) child.remove();
  });

  updateEmptyState();
  if (size === 0) {
    updatePointerLabels([]);
    return;
  }

  // Walk the internal linked list head → tail
  const orderedIds = [];
  let cur = head;
  while (cur !== null) {
    orderedIds.push(cur);
    cur = nodes[cur].next;
  }

  // Build DOM elements
  const domNodes = {}; // id → DOM element (the .sll-node-el div)

  orderedIds.forEach((id, idx) => {
    const node = nodes[id];
    const isLast = (id === tail);

    // ── Node element
    const el = document.createElement("div");
    el.className = "sll-node-el";
    el.dataset.id = id;

    // Animate new node
    if (id === newNodeId) {
      el.classList.add("node-new");
      // Remove class after animation
      setTimeout(() => {
        el.classList.remove("node-new");
      }, 500);
    }

    // Animate deleted node (pre-removal highlight — handled separately)
    if (id === deleteNodeId) {
      el.classList.add("node-del");
    }

    // Pointer value in next cell
    const nextPtrDisplay = isLast
      ? `<span class="sll-node-ptr-null">NULL</span>`
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

    // ── Arrow after node (except last)
    if (!isLast) {
      const arrow = document.createElement("div");
      arrow.className = "sll-sim-arrow";
      if (id === newNodeId) arrow.classList.add("arrow-new");
      arrow.textContent = "→";
      container.appendChild(arrow);
    } else {
      // NULL terminator after last node
      const nullEl = document.createElement("div");
      nullEl.className = "sll-null-term";
      nullEl.textContent = "NULL";
      container.appendChild(nullEl);
    }
  });

  // Render HEAD / TAIL pointer labels after DOM is painted
  requestAnimationFrame(() => {
    updatePointerLabels(orderedIds, domNodes);
  });
}

/**
 * Updates floating HEAD and TAIL labels above the container.
 * Uses the bounding rect of the actual node elements.
 */
function updatePointerLabels(orderedIds, domNodes) {
  const ptrContainer = document.getElementById("sllPtrIndicators");
  const simContainer = document.getElementById("sllSimContainer");
  if (!ptrContainer || !simContainer) return;

  // Clear existing tags
  ptrContainer.innerHTML = "";

  if (!orderedIds || orderedIds.length === 0) return;

  const headId = orderedIds[0];
  const tailId = orderedIds[orderedIds.length - 1];

  // We need the node DOM elements to compute horizontal positions
  if (!domNodes) return;

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

  // HEAD tag
  const headEl = domNodes[headId];
  if (headEl) {
    const headRect = headEl.getBoundingClientRect();
    const headTag  = makeTag("HEAD", "ptr-head");
    // Position relative to ptrContainer
    const leftOffset = headRect.left - ptrRect.left + headRect.width / 2;
    headTag.style.position = "absolute";
    headTag.style.left = (leftOffset - 20) + "px"; // approx center
    headTag.style.bottom = "0";
    ptrContainer.appendChild(headTag);
  }

  // TAIL tag (only if different from head, or always show both)
  const tailEl = domNodes[tailId];
  if (tailEl) {
    const tailRect = tailEl.getBoundingClientRect();
    const tailTag  = makeTag("TAIL", "ptr-tail");
    const leftOffset = tailRect.left - ptrRect.left + tailRect.width / 2;
    tailTag.style.position = "absolute";

    if (headId === tailId) {
      // Single node — stack tags
      tailTag.style.left = (leftOffset + 30) + "px";
    } else {
      tailTag.style.left = (leftOffset - 20) + "px";
    }

    tailTag.style.bottom = "0";
    ptrContainer.appendChild(tailTag);
  }
}

/* ══════════════════════════════════════════════════════════════
   INSERT AT BEGINNING — O(1)
══════════════════════════════════════════════════════════════ */
function sllInsertBeginning() {
  if (animating) return;

  const val = getInputValue();
  if (val === null) return;

  if (size >= MAX_LIST_SIZE) {
    setStatus(`⚠ List is full! Maximum size is ${MAX_LIST_SIZE}.`, "error");
    return;
  }

  animating = true;
  const id = newId();

  // Internal: create node, point its next to current head
  nodes[id] = { id, value: val, next: head };

  if (head === null) {
    // Empty list: both head and tail point to new node
    head = id;
    tail = id;
  } else {
    head = id;
  }
  size++;
  opCount++;

  document.getElementById("simInput").value = "";
  document.getElementById("simInput").focus();

  renderList(id);
  updateStats();
  setStatus(`✓ Inserted ${val} at the beginning.`, "success");

  setTimeout(() => { animating = false; }, 500);
}

/* ══════════════════════════════════════════════════════════════
   INSERT AT END — O(1) with tail pointer
══════════════════════════════════════════════════════════════ */
function sllInsertEnd() {
  if (animating) return;

  const val = getInputValue();
  if (val === null) return;

  if (size >= MAX_LIST_SIZE) {
    setStatus(`⚠ List is full! Maximum size is ${MAX_LIST_SIZE}.`, "error");
    return;
  }

  animating = true;
  const id = newId();

  // Internal: create node
  nodes[id] = { id, value: val, next: null };

  if (tail === null) {
    // Empty list
    head = id;
    tail = id;
  } else {
    // Highlight current tail briefly
    const tailEl = document.querySelector(`[data-id="${tail}"]`);
    if (tailEl) {
      tailEl.classList.add("node-highlight");
      setTimeout(() => tailEl.classList.remove("node-highlight"), 250);
    }
    // Link current tail to new node
    nodes[tail].next = id;
    tail = id;
  }
  size++;
  opCount++;

  document.getElementById("simInput").value = "";
  document.getElementById("simInput").focus();

  // Small delay so tail highlight is visible before re-render
  setTimeout(() => {
    renderList(id);
    updateStats();
    setStatus(`✓ Inserted ${val} at the end (tail pointer — O(1)).`, "success");
    setTimeout(() => { animating = false; }, 500);
  }, 280);
}

/* ══════════════════════════════════════════════════════════════
   DELETE BY VALUE — O(n)
══════════════════════════════════════════════════════════════ */
function sllDelete() {
  if (animating) return;

  const val = getInputValue();
  if (val === null) return;

  if (size === 0) {
    setStatus("⚠ List is empty — nothing to delete.", "error");
    return;
  }

  // Find the node with this value
  let targetId  = null;
  let prevId    = null;
  let cur       = head;
  while (cur !== null) {
    if (nodes[cur].value === val) {
      targetId = cur;
      break;
    }
    prevId = cur;
    cur = nodes[cur].next;
  }

  if (targetId === null) {
    setStatus(`⚠ Value ${val} not found in the list.`, "error");
    return;
  }

  animating = true;

  // Step 1: Highlight the target node
  const targetEl = document.querySelector(`[data-id="${targetId}"]`);
  if (targetEl) targetEl.classList.add("node-highlight");

  setTimeout(() => {
    // Step 2: Animate deletion
    if (targetEl) {
      targetEl.classList.remove("node-highlight");
      targetEl.classList.add("node-del");
    }

    setTimeout(() => {
      // Step 3: Update internal structure
      if (prevId === null) {
        // Deleting head
        head = nodes[targetId].next;
        if (head === null) tail = null; // list became empty
      } else {
        nodes[prevId].next = nodes[targetId].next;
        if (targetId === tail) {
          tail = prevId; // deleted tail — update tail pointer
        }
      }

      delete nodes[targetId];
      size--;
      opCount++;

      document.getElementById("simInput").value = "";
      document.getElementById("simInput").focus();

      renderList();
      updateStats();
      setStatus(`✓ Deleted node with value ${val}.`, "success");
      animating = false;
    }, 420);
  }, 300);
}

/* ══════════════════════════════════════════════════════════════
   TRAVERSE — highlight nodes one by one
══════════════════════════════════════════════════════════════ */
function sllTraverse() {
  if (animating) return;

  if (size === 0) {
    setStatus("⚠ List is empty — nothing to traverse.", "error");
    return;
  }

  animating = true;

  // Walk the internal list to get ordered IDs
  const orderedIds = [];
  let cur = head;
  while (cur !== null) {
    orderedIds.push(cur);
    cur = nodes[cur].next;
  }

  // Collect DOM elements
  const domEls = orderedIds.map(id => document.querySelector(`[data-id="${id}"]`));

  let i = 0;
  const values = orderedIds.map(id => nodes[id].value);

  function highlightNext() {
    if (i > 0 && domEls[i - 1]) {
      domEls[i - 1].classList.remove("node-traversed");
    }
    if (i >= domEls.length) {
      setStatus(`Traversal complete: [ ${values.join(" → ")} ] → NULL`, "info");
      animating = false;
      return;
    }
    const el = domEls[i];
    if (el) {
      el.classList.add("node-traversed");
    }
    setStatus(`Visiting node ${i + 1}/${orderedIds.length}: value = ${values[i]}`, "info");
    i++;
    setTimeout(highlightNext, 320);
  }

  highlightNext();
}

/* ══════════════════════════════════════════════════════════════
   RESET — clear entire list
══════════════════════════════════════════════════════════════ */
function sllReset() {
  if (animating) return;
  if (size === 0) {
    setStatus("List is already empty.", "");
    return;
  }

  animating = true;

  // Fade out all node elements quickly
  const container = document.getElementById("sllSimContainer");
  if (container) {
    Array.from(container.children).forEach(child => {
      if (!child.classList.contains("sim-empty-state")) {
        child.style.transition = "opacity 0.22s ease, transform 0.22s ease";
        child.style.opacity = "0";
        child.style.transform = "scale(0.8)";
      }
    });
  }

  setTimeout(() => {
    // Reset internal state
    nodes   = {};
    head    = null;
    tail    = null;
    size    = 0;
    opCount = 0;
    nodeIdSeq = 0;

    renderList();
    updateStats();
    setStatus("List reset. Ready for a new sequence.", "info");
    animating = false;
  }, 260);
}