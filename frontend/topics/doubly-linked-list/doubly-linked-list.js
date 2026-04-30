/* ─── doubly-linked-list.js ────────────────────────────────────────
   Handles:
   1. Auth check & user info population (same pattern as singly-linked-list.js)
   2. Mark Complete button state change
   3. XP popup slide-in / fade-out
   4. Implementation Tab Switcher & Copy Code
   5. Doubly Linked List Simulator
      - Internal: object-based doubly linked list with head & tail pointers
      - UI: horizontal node chain with bidirectional arrows (→ above, ← below)
      - Node structure: { id, value, prev, next }
      - Operations: Insert Begin, Insert End, Insert at Position,
                    Delete Begin, Delete End, Delete by Value,
                    Traverse, Reset
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
    if (user.completedTopics && user.completedTopics.includes("doubly_linked_list_unit2")) {
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
      body: JSON.stringify({ topicId: "doubly_linked_list_unit2" })
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
   DOUBLY LINKED LIST SIMULATOR
══════════════════════════════════════════════════════════════ */

/* ─── Internal Data Structure ────────────────────────────────── *
 * nodes[id] = { id, value, prev: id|null, next: id|null }
 * head = id of first node (or null)
 * tail = id of last node  (or null)
 * Every operation MUST update BOTH prev and next pointers.
 * ─────────────────────────────────────────────────────────────── */

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

/* ─── Position input toggle ──────────────────────────────────── */
function enablePositionInput(enable) {
  const posInput = document.getElementById("simPosInput");
  if (!posInput) return;
  posInput.disabled = !enable;
}

function handleInsertAtPosition() {
  const posInput = document.getElementById("simPosInput");
  if (!posInput) return;

  if (posInput.disabled) {
    enablePositionInput(true);
    posInput.focus();
    setStatus("Position input enabled — enter a position and click 'At Position' again.", "info");
    return;
  }

  dllInsertAtPosition();
}

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

/* ─── Validate value input ───────────────────────────────────── */
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

/* ─── Validate position input ────────────────────────────────── */
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

/* ══════════════════════════════════════════════════════════════
   DOM RENDERING — builds horizontal DLL chain
   Each node: [ val | prev | next ] with ← → arrows between nodes
══════════════════════════════════════════════════════════════ */

/**
 * Full re-render of the DLL node chain.
 * Each node shows data + two pointer cells (prev / next).
 * Between each pair of nodes: double-stacked arrows (→ on top, ← below).
 * NULL terminators on both ends show bidirectionality.
 */
function renderList(newNodeId = null) {
  const container = document.getElementById("sllSimContainer");
  if (!container) return;

  // Remove all existing node elements (keep empty-state div)
  Array.from(container.children).forEach(child => {
    if (!child.classList.contains("sim-empty-state")) child.remove();
  });

  updateEmptyState();
  if (size === 0) {
    updatePointerLabels([]);
    return;
  }

  // Walk the linked list head → tail
  const orderedIds = [];
  let cur = head;
  while (cur !== null) {
    orderedIds.push(cur);
    cur = nodes[cur].next;
  }

  const domNodes = {}; // id → DOM element

  // Left NULL terminator (HEAD's prev side)
  const leftNull = document.createElement("div");
  leftNull.className = "dll-null-term";
  leftNull.innerHTML = `<span class="dll-null-dir">←</span><span>NULL</span>`;
  if (newNodeId === orderedIds[0]) leftNull.classList.add("arrow-new");
  container.appendChild(leftNull);

  orderedIds.forEach((id, idx) => {
    const node = nodes[id];
    const isFirst = (id === head);
    const isLast  = (id === tail);

    // ── Left backward arrow (← from this node toward prev)
    // Already rendered as NULL terminator for the head, and as part
    // of double-arrow for subsequent nodes — skip individual left arrows here.

    // ── Node element
    const el = document.createElement("div");
    el.className = "sll-node-el";
    el.dataset.id = id;

    if (id === newNodeId) {
      el.classList.add("node-new");
      setTimeout(() => el.classList.remove("node-new"), 500);
    }

    // Prev pointer display
    const prevDisplay = isFirst
      ? `<span class="dll-ptr-null">NULL</span>`
      : `<span class="dll-ptr-cell-val">${nodes[node.prev] ? "←" + nodes[node.prev].value : "—"}</span>`;

    // Next pointer display
    const nextDisplay = isLast
      ? `<span class="dll-ptr-null">NULL</span>`
      : `<span class="dll-ptr-cell-val">${nodes[node.next] ? "→" + nodes[node.next].value : "—"}</span>`;

    el.innerHTML = `
      <div class="sll-node-val">${node.value}</div>
      <div class="dll-ptr-row">
        <div class="dll-ptr-cell dll-prev-cell">
          <span class="dll-ptr-cell-label">prev</span>
          ${prevDisplay}
        </div>
        <div class="dll-ptr-cell dll-next-cell">
          <span class="dll-ptr-cell-label">next</span>
          ${nextDisplay}
        </div>
      </div>
    `;

    container.appendChild(el);
    domNodes[id] = el;

    // ── Double arrows between nodes (→ forward, ← backward)
    if (!isLast) {
      const arrows = document.createElement("div");
      arrows.className = "dll-sim-arrows";
      if (id === newNodeId || orderedIds[idx + 1] === newNodeId) {
        arrows.classList.add("arrow-new");
      }
      arrows.innerHTML = `
        <span class="dll-fwd-sim-arrow">→</span>
        <span class="dll-bwd-sim-arrow">←</span>
      `;
      container.appendChild(arrows);
    }
  });

  // Right NULL terminator (TAIL's next side)
  const rightNull = document.createElement("div");
  rightNull.className = "dll-null-term";
  rightNull.innerHTML = `<span>NULL</span><span class="dll-null-dir">→</span>`;
  container.appendChild(rightNull);

  // Render HEAD / TAIL pointer labels after DOM is painted
  requestAnimationFrame(() => {
    updatePointerLabels(orderedIds, domNodes);
  });
}

/**
 * Updates floating HEAD and TAIL labels above the container.
 * Identical logic to SLL version — works for DLL too.
 */
function updatePointerLabels(orderedIds, domNodes) {
  const ptrContainer = document.getElementById("sllPtrIndicators");
  const simContainer = document.getElementById("sllSimContainer");
  if (!ptrContainer || !simContainer) return;

  ptrContainer.innerHTML = "";

  if (!orderedIds || orderedIds.length === 0) return;

  const headId = orderedIds[0];
  const tailId = orderedIds[orderedIds.length - 1];

  if (!domNodes) return;

  const ptrRect = ptrContainer.getBoundingClientRect();

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
    const leftOffset = headRect.left - ptrRect.left + headRect.width / 2;
    headTag.style.position = "absolute";
    headTag.style.left = (leftOffset - 20) + "px";
    headTag.style.bottom = "0";
    ptrContainer.appendChild(headTag);
  }

  // TAIL tag
  const tailEl = domNodes[tailId];
  if (tailEl) {
    const tailRect = tailEl.getBoundingClientRect();
    const tailTag  = makeTag("TAIL", "ptr-tail");
    const leftOffset = tailRect.left - ptrRect.left + tailRect.width / 2;
    tailTag.style.position = "absolute";

    if (headId === tailId) {
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
   Pointer updates:
     newNode.prev = null
     newNode.next = head
     head.prev    = newNode   (if list was non-empty)
     head         = newNode
══════════════════════════════════════════════════════════════ */
function dllInsertBeginning() {
  if (animating) return;

  const val = getInputValue();
  if (val === null) return;

  if (size >= MAX_LIST_SIZE) {
    setStatus(`⚠ List is full! Maximum size is ${MAX_LIST_SIZE}.`, "error");
    return;
  }

  animating = true;
  const id = newId();

  // ── Update internal DLL state ──────────────────────────────────
  nodes[id] = { id, value: val, prev: null, next: head };

  if (head !== null) {
    // Step: head.prev = newNode
    nodes[head].prev = id;
  } else {
    // List was empty — newNode is also tail
    tail = id;
  }
  head = id;
  size++;
  opCount++;

  document.getElementById("simInput").value = "";
  document.getElementById("simInput").focus();

  renderList(id);
  updateStats();
  setStatus(`✓ Inserted ${val} at beginning. head.prev set to NULL; old head.prev updated.`, "success");

  setTimeout(() => { animating = false; }, 500);
}

/* ══════════════════════════════════════════════════════════════
   INSERT AT END — O(1) with tail pointer
   Pointer updates:
     newNode.prev = tail
     newNode.next = null
     tail.next    = newNode   (if list was non-empty)
     tail         = newNode
══════════════════════════════════════════════════════════════ */
function dllInsertEnd() {
  if (animating) return;

  const val = getInputValue();
  if (val === null) return;

  if (size >= MAX_LIST_SIZE) {
    setStatus(`⚠ List is full! Maximum size is ${MAX_LIST_SIZE}.`, "error");
    return;
  }

  animating = true;
  const id = newId();

  nodes[id] = { id, value: val, prev: tail, next: null };

  if (tail !== null) {
    // Highlight old tail to show pointer update
    const tailEl = document.querySelector(`[data-id="${tail}"]`);
    if (tailEl) {
      tailEl.classList.add("node-highlight");
      setTimeout(() => tailEl.classList.remove("node-highlight"), 250);
    }
    // Step: tail.next = newNode
    nodes[tail].next = id;
  } else {
    // List was empty — newNode is also head
    head = id;
  }
  tail = id;
  size++;
  opCount++;

  document.getElementById("simInput").value = "";
  document.getElementById("simInput").focus();

  setTimeout(() => {
    renderList(id);
    updateStats();
    setStatus(`✓ Inserted ${val} at end. tail.next → newNode; newNode.prev → old tail (O(1)).`, "success");
    setTimeout(() => { animating = false; }, 500);
  }, 280);
}

/* ══════════════════════════════════════════════════════════════
   INSERT AT POSITION — O(n) traversal, 0-based index
   Middle insert pointer updates (4 steps):
     newNode.next        = prevNode.next    (step 1)
     newNode.prev        = prevNode         (step 2)
     prevNode.next.prev  = newNode          (step 3)
     prevNode.next       = newNode          (step 4)
══════════════════════════════════════════════════════════════ */
function dllInsertAtPosition() {
  if (animating) return;

  const val = getInputValue();
  if (val === null) return;

  const pos = getPositionValue();
  if (pos === null) return;

  if (size >= MAX_LIST_SIZE) {
    setStatus(`⚠ List is full! Maximum size is ${MAX_LIST_SIZE}.`, "error");
    return;
  }

  // Delegate to beginning/end for O(1) paths
  if (pos === 0) { dllInsertBeginning(); return; }
  if (pos === size) { dllInsertEnd(); return; }

  animating = true;

  // Collect ordered IDs for traversal animation
  const orderedIds = [];
  let cur = head;
  while (cur !== null) {
    orderedIds.push(cur);
    cur = nodes[cur].next;
  }

  let step = 0;

  function traverseToPos() {
    if (step >= pos) {
      // ── Done traversing — clear highlights ──────────────────────
      orderedIds.forEach(id => {
        const el = document.querySelector(`[data-id="${id}"]`);
        if (el) el.classList.remove("node-position-highlight");
      });

      // ── Perform DLL insertion with all 4 pointer updates ────────
      const prevId = orderedIds[pos - 1];
      const nextId = nodes[prevId].next;  // This will NOT be null (handled above)

      const newNodeId = newId();

      // Step 1: newNode.next = prevNode.next
      // Step 2: newNode.prev = prevNode
      nodes[newNodeId] = { id: newNodeId, value: val, prev: prevId, next: nextId };

      // Step 3: nextNode.prev = newNode
      nodes[nextId].prev = newNodeId;

      // Step 4: prevNode.next = newNode
      nodes[prevId].next = newNodeId;

      size++;
      opCount++;

      document.getElementById("simInput").value = "";
      document.getElementById("simPosInput").value = "";

      setTimeout(() => {
        renderList(newNodeId);
        updateStats();
        setStatus(
          `✓ Inserted ${val} at position ${pos}. 4 pointer updates: newNode.next, newNode.prev, next.prev, prev.next.`,
          "success"
        );
        setTimeout(() => { animating = false; }, 500);
      }, 120);
      return;
    }

    // Highlight current node during traversal
    const el = document.querySelector(`[data-id="${orderedIds[step]}"]`);
    if (el) {
      el.classList.add("node-position-highlight");
      if (step === pos - 1) {
        setTimeout(() => el.classList.add("node-insert-target"), 150);
      }
    }
    setStatus(`Traversing… at index ${step} (value: ${nodes[orderedIds[step]].value})`, "info");

    step++;
    setTimeout(traverseToPos, 350);
  }

  setStatus(`Traversing to position ${pos}…`, "info");
  traverseToPos();
}

/* ══════════════════════════════════════════════════════════════
   DELETE BY VALUE — O(n) search, O(1) unlink
   Uses node.prev directly — no predecessor traversal needed.
   Pointer updates:
     If node has prev:  node.prev.next = node.next
     Else:              head = node.next
     If node has next:  node.next.prev = node.prev
     Else:              tail = node.prev
══════════════════════════════════════════════════════════════ */
function dllDelete() {
  if (animating) return;

  const val = getInputValue();
  if (val === null) return;

  if (size === 0) {
    setStatus("⚠ List is empty — nothing to delete.", "error");
    return;
  }

  // Find target node
  const orderedIds = [];
  let cur = head;
  while (cur !== null) {
    orderedIds.push(cur);
    cur = nodes[cur].next;
  }

  let targetId = null;
  let foundAt  = -1;
  for (let i = 0; i < orderedIds.length; i++) {
    if (nodes[orderedIds[i]].value === val) {
      targetId = orderedIds[i];
      foundAt = i;
      break;
    }
  }

  if (targetId === null) {
    setStatus(`⚠ Value ${val} not found in the list.`, "error");
    return;
  }

  animating = true;

  let step = 0;

  function traverseToTarget() {
    if (step > foundAt) {
      // ── Clear traversal highlights ───────────────────────────────
      orderedIds.forEach(id => {
        const el = document.querySelector(`[data-id="${id}"]`);
        if (el) el.classList.remove("node-position-highlight");
      });

      const targetEl = document.querySelector(`[data-id="${targetId}"]`);
      if (targetEl) {
        targetEl.classList.remove("node-position-highlight");
        targetEl.classList.add("node-highlight");
      }

      setTimeout(() => {
        if (targetEl) {
          targetEl.classList.remove("node-highlight");
          targetEl.classList.add("node-del");
        }

        setTimeout(() => {
          // ── DLL unlink: use node.prev directly ──────────────────
          const prevId = nodes[targetId].prev;
          const nextId = nodes[targetId].next;

          if (prevId !== null) {
            nodes[prevId].next = nextId;
          } else {
            // Target was head
            head = nextId;
          }

          if (nextId !== null) {
            nodes[nextId].prev = prevId;
          } else {
            // Target was tail
            tail = prevId;
          }

          delete nodes[targetId];
          size--;
          opCount++;

          document.getElementById("simInput").value = "";

          renderList();
          updateStats();
          setStatus(
            `✓ Deleted value ${val} (index ${foundAt}). prev.next and next.prev both updated.`,
            "success"
          );
          animating = false;
        }, 420);
      }, 300);
      return;
    }

    const el = document.querySelector(`[data-id="${orderedIds[step]}"]`);
    if (el) {
      if (step > 0) {
        const prevEl = document.querySelector(`[data-id="${orderedIds[step - 1]}"]`);
        if (prevEl) prevEl.classList.remove("node-position-highlight");
      }
      el.classList.add("node-position-highlight");
    }

    const isTarget = orderedIds[step] === targetId;
    setStatus(
      isTarget
        ? `✓ Found value ${val} at index ${step}!`
        : `Searching… index ${step}: ${nodes[orderedIds[step]].value} ≠ ${val}`,
      isTarget ? "success" : "info"
    );

    step++;
    setTimeout(traverseToTarget, 330);
  }

  setStatus(`Searching for value ${val}…`, "info");
  traverseToTarget();
}

/* ══════════════════════════════════════════════════════════════
   DELETE AT BEGINNING — O(1)
   Pointer updates:
     head = head.next
     if new head exists: head.prev = null
     else: tail = null
══════════════════════════════════════════════════════════════ */
function dllDeleteBeginning() {
  if (animating) return;

  if (size === 0) {
    setStatus("⚠ List is empty — nothing to delete.", "error");
    return;
  }

  animating = true;

  const targetId = head;
  const headEl = document.querySelector(`[data-id="${targetId}"]`);

  // Step 1: highlight
  if (headEl) headEl.classList.add("node-highlight");
  setStatus(`Highlighting head node (value: ${nodes[targetId].value})…`, "info");

  setTimeout(() => {
    // Step 2: animate deletion
    if (headEl) {
      headEl.classList.remove("node-highlight");
      headEl.classList.add("node-del");
    }

    setTimeout(() => {
      // Step 3: update DLL state
      const deletedVal = nodes[targetId].value;
      const newHead = nodes[targetId].next;

      head = newHead;
      if (head !== null) {
        // Step: new head.prev = null
        nodes[head].prev = null;
      } else {
        // List is now empty
        tail = null;
      }

      delete nodes[targetId];
      size--;
      opCount++;

      renderList();
      updateStats();
      setStatus(`✓ Deleted head (value: ${deletedVal}). New head.prev set to NULL.`, "success");
      animating = false;
    }, 420);
  }, 320);
}

/* ══════════════════════════════════════════════════════════════
   DELETE AT END — O(1) with tail pointer and prev pointer!
   (In SLL this was O(n). In DLL it's O(1) — key advantage.)
   Pointer updates:
     tail = tail.prev
     if new tail exists: tail.next = null
     else: head = null
══════════════════════════════════════════════════════════════ */
function dllDeleteEnd() {
  if (animating) return;

  if (size === 0) {
    setStatus("⚠ List is empty — nothing to delete.", "error");
    return;
  }

  animating = true;

  const targetId = tail;
  const tailEl = document.querySelector(`[data-id="${targetId}"]`);

  // Step 1: highlight tail directly (no traversal needed — O(1)!)
  if (tailEl) tailEl.classList.add("node-highlight");
  setStatus(
    `Highlighting tail node (value: ${nodes[targetId].value})… O(1) — no traversal needed!`,
    "info"
  );

  setTimeout(() => {
    // Step 2: animate deletion
    if (tailEl) {
      tailEl.classList.remove("node-highlight");
      tailEl.classList.add("node-del");
    }

    setTimeout(() => {
      // Step 3: update DLL state
      const deletedVal = nodes[targetId].value;
      const newTail = nodes[targetId].prev;

      tail = newTail;
      if (tail !== null) {
        // Step: new tail.next = null
        nodes[tail].next = null;
      } else {
        // List is now empty
        head = null;
      }

      delete nodes[targetId];
      size--;
      opCount++;

      renderList();
      updateStats();
      setStatus(
        `✓ Deleted tail (value: ${deletedVal}). Used prev pointer — O(1). New tail.next = NULL.`,
        "success"
      );
      animating = false;
    }, 420);
  }, 320);
}

/* ══════════════════════════════════════════════════════════════
   TRAVERSE — highlight nodes one by one (forward: head → tail)
══════════════════════════════════════════════════════════════ */
function dllTraverse() {
  if (animating) return;

  if (size === 0) {
    setStatus("⚠ List is empty — nothing to traverse.", "error");
    return;
  }

  animating = true;

  const orderedIds = [];
  let cur = head;
  while (cur !== null) {
    orderedIds.push(cur);
    cur = nodes[cur].next;
  }

  const domEls = orderedIds.map(id => document.querySelector(`[data-id="${id}"]`));
  const values = orderedIds.map(id => nodes[id].value);

  let i = 0;

  function highlightNext() {
    if (i > 0 && domEls[i - 1]) {
      domEls[i - 1].classList.remove("node-traversed");
    }
    if (i >= domEls.length) {
      setStatus(
        `Forward traversal complete: NULL ← [ ${values.join(" ⇆ ")} ] → NULL`,
        "info"
      );
      animating = false;
      return;
    }
    const el = domEls[i];
    if (el) el.classList.add("node-traversed");
    setStatus(
      `Visiting node ${i + 1}/${orderedIds.length}: value = ${values[i]}  (following next→)`,
      "info"
    );
    i++;
    setTimeout(highlightNext, 320);
  }

  highlightNext();
}

/* ══════════════════════════════════════════════════════════════
   RESET — clear entire list
══════════════════════════════════════════════════════════════ */
function dllReset() {
  if (animating) return;
  if (size === 0) {
    setStatus("List is already empty.", "");
    return;
  }

  animating = true;

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
    nodes     = {};
    head      = null;
    tail      = null;
    size      = 0;
    opCount   = 0;
    nodeIdSeq = 0;

    enablePositionInput(false);
    const posInput = document.getElementById("simPosInput");
    if (posInput) posInput.value = "";

    renderList();
    updateStats();
    setStatus("List reset. Ready for a new sequence.", "info");
    animating = false;
  }, 260);
}

/* ─── End of DLL Simulator ───────────────────────────────────── */