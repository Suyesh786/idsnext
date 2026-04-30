/* ══════════════════════════════════════════════════════════════
   DOUBLY LINKED LIST SIMULATOR  —  dll-simulator.js
   ──────────────────────────────────────────────────────────────
   Architecture mirrors singly-linked-list.js exactly.
   KEY DIFFERENCE: every node carries BOTH prev AND next.
   All insert / delete operations maintain both links.
   Rendering shows NULL ← [prev|data|next] ↔ … ↔ NULL
   ──────────────────────────────────────────────────────────────
   Internal state
     dllNodes[id] = { id, value, prev: id|null, next: id|null }
     dllHead      = id of first node (its prev === null)
     dllTail      = id of last node  (its next === null)
   DOM ids use prefix "dll" to avoid collisions with SLL page.
══════════════════════════════════════════════════════════════ */

const DLL_MAX_SIZE  = 8;
const DLL_VAL_MIN   = -999;
const DLL_VAL_MAX   = 999;

let dllNodes     = {};    // id → { id, value, prev, next }
let dllHead      = null;
let dllTail      = null;
let dllSize      = 0;
let dllOpCount   = 0;
let dllAnimating = false;
let dllIdSeq     = 0;

function dllNewId() { return "d" + (++dllIdSeq); }

/* ─── Position input toggle ──────────────────────────────────── */
function dllEnablePosInput(enable) {
  const el = document.getElementById("dllPosInput");
  if (el) el.disabled = !enable;
}

function dllHandleInsertAtPosition() {
  const posInput = document.getElementById("dllPosInput");
  if (!posInput) return;
  if (posInput.disabled) {
    dllEnablePosInput(true);
    posInput.focus();
    dllSetStatus("Position input enabled — enter a position and click 'At Position' again.", "info");
    return;
  }
  dllInsertAtPosition();
}

/* ─── Status helpers ─────────────────────────────────────────── */
function dllSetStatus(msg, type = "") {
  const bar = document.getElementById("dllStatus");
  const txt = document.getElementById("dllStatusText");
  if (!bar || !txt) return;
  bar.className = "sim-status";
  if (type) bar.classList.add(`status-${type}`);
  txt.textContent = msg;
}

function dllUpdateStats() {
  const sizeEl = document.getElementById("dllStatSize");
  const headEl = document.getElementById("dllStatHead");
  const tailEl = document.getElementById("dllStatTail");
  const opsEl  = document.getElementById("dllStatOps");
  if (sizeEl) sizeEl.textContent = dllSize;
  if (headEl) headEl.textContent = dllHead !== null ? dllNodes[dllHead].value : "—";
  if (tailEl) tailEl.textContent = dllTail !== null ? dllNodes[dllTail].value : "—";
  if (opsEl)  opsEl.textContent  = dllOpCount;
}

function dllUpdateEmptyState() {
  const empty = document.getElementById("dllEmptyState");
  if (!empty) return;
  empty.style.display = dllSize === 0 ? "flex" : "none";
}

/* ─── Input validation ───────────────────────────────────────── */
function dllGetInputValue() {
  const input = document.getElementById("dllInput");
  if (!input) return null;
  const raw = input.value.trim();
  if (raw === "" || isNaN(Number(raw))) {
    dllSetStatus("⚠ Please enter a valid number.", "error");
    input.focus();
    return null;
  }
  const val = parseInt(raw, 10);
  if (val < DLL_VAL_MIN || val > DLL_VAL_MAX) {
    dllSetStatus(`⚠ Value out of range. Use ${DLL_VAL_MIN} to ${DLL_VAL_MAX}.`, "error");
    input.focus();
    return null;
  }
  return val;
}

function dllGetPositionValue() {
  const input = document.getElementById("dllPosInput");
  if (!input) return null;
  const raw = input.value.trim();
  if (raw === "" || isNaN(Number(raw))) {
    dllSetStatus("⚠ Please enter a valid position (0-based index).", "error");
    input.focus();
    return null;
  }
  const pos = parseInt(raw, 10);
  if (pos < 0) {
    dllSetStatus("⚠ Position must be 0 or greater.", "error");
    input.focus();
    return null;
  }
  if (pos > dllSize) {
    dllSetStatus(`⚠ Position ${pos} out of range. Valid: 0 to ${dllSize}.`, "error");
    input.focus();
    return null;
  }
  return pos;
}

/* ══════════════════════════════════════════════════════════════
   DOM RENDERING — builds horizontal bidirectional chain
   ──────────────────────────────────────────────────────────────
   Layout per node:
     NULL← | [prev | data | next] | ↔ | [prev | data | next] | →NULL
   Left NULL shown before head, right NULL shown after tail.
   Between nodes: a bidirectional ↔ arrow connector.
══════════════════════════════════════════════════════════════ */
function dllRenderList(newNodeId = null) {
  const container = document.getElementById("dllSimContainer");
  if (!container) return;

  // Clear all except empty-state placeholder
  Array.from(container.children).forEach(child => {
    if (!child.classList.contains("sim-empty-state")) child.remove();
  });

  dllUpdateEmptyState();
  if (dllSize === 0) {
    dllUpdatePointerLabels([], {});
    return;
  }

  // Walk head → tail
  const orderedIds = [];
  let cur = dllHead;
  while (cur !== null) {
    orderedIds.push(cur);
    cur = dllNodes[cur].next;
  }

  const domNodes = {}; // id → node DOM element

  // ── NULL cap on left (prev of head)
  const leftNull = document.createElement("div");
  leftNull.className = "dll-null-cap dll-null-left";
  leftNull.textContent = "NULL";
  container.appendChild(leftNull);

  // ── Left arrow pointing right from NULL to head
  const leftArrow = document.createElement("div");
  leftArrow.className = "dll-connector dll-connector-first";
  leftArrow.innerHTML = `<span class="dll-arrow-next">→</span>`;
  container.appendChild(leftArrow);

  orderedIds.forEach((id, idx) => {
    const node   = dllNodes[id];
    const isLast = (id === dllTail);
    const isFirst = (id === dllHead);

    // ── Node element: [prev | value | next]
    const el = document.createElement("div");
    el.className = "sll-node-el dll-node-el";
    el.dataset.id = id;

    if (id === newNodeId) {
      el.classList.add("node-new");
      setTimeout(() => el.classList.remove("node-new"), 500);
    }

    // prev pointer display
    const prevPtrDisplay = isFirst
      ? `<span class="dll-ptr-null">NULL</span>`
      : `<span class="dll-ptr-val dll-prev-color">← ${dllNodes[node.prev].value}</span>`;

    // next pointer display
    const nextPtrDisplay = isLast
      ? `<span class="dll-ptr-null">NULL</span>`
      : `<span class="dll-ptr-val">→ ${dllNodes[node.next].value}</span>`;

    el.innerHTML = `
      <div class="dll-node-prev-cell">
        <span class="dll-ptr-label">prev</span>
        ${prevPtrDisplay}
      </div>
      <div class="dll-node-val-cell">
        <span class="dll-node-val">${node.value}</span>
      </div>
      <div class="dll-node-next-cell">
        <span class="dll-ptr-label">next</span>
        ${nextPtrDisplay}
      </div>
    `;

    container.appendChild(el);
    domNodes[id] = el;

    if (!isLast) {
      // ── Bidirectional ↔ connector between nodes
      const conn = document.createElement("div");
      conn.className = "dll-connector";
      if (id === newNodeId) conn.classList.add("arrow-new");
      conn.innerHTML = `
        <span class="dll-arrow-next">→</span>
        <span class="dll-arrow-prev">←</span>
      `;
      container.appendChild(conn);
    }
  });

  // ── Right arrow + NULL cap after tail
  const rightArrow = document.createElement("div");
  rightArrow.className = "dll-connector dll-connector-last";
  rightArrow.innerHTML = `<span class="dll-arrow-next">→</span>`;
  container.appendChild(rightArrow);

  const rightNull = document.createElement("div");
  rightNull.className = "dll-null-cap dll-null-right";
  rightNull.textContent = "NULL";
  container.appendChild(rightNull);

  // HEAD / TAIL floating labels
  requestAnimationFrame(() => {
    dllUpdatePointerLabels(orderedIds, domNodes);
  });
}

/* ─── HEAD / TAIL floating pointer tags ──────────────────────── */
function dllUpdatePointerLabels(orderedIds, domNodes) {
  const ptrContainer = document.getElementById("dllPtrIndicators");
  const simContainer = document.getElementById("dllSimContainer");
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

  const headEl = domNodes[headId];
  if (headEl) {
    const r   = headEl.getBoundingClientRect();
    const tag = makeTag("HEAD", "ptr-head");
    tag.style.position = "absolute";
    tag.style.left = (r.left - ptrRect.left + r.width / 2 - 20) + "px";
    tag.style.bottom = "0";
    ptrContainer.appendChild(tag);
  }

  const tailEl = domNodes[tailId];
  if (tailEl) {
    const r   = tailEl.getBoundingClientRect();
    const tag = makeTag("TAIL", "ptr-tail");
    tag.style.position = "absolute";
    tag.style.left = headId === tailId
      ? (r.left - ptrRect.left + r.width / 2 + 30) + "px"
      : (r.left - ptrRect.left + r.width / 2 - 20) + "px";
    tag.style.bottom = "0";
    ptrContainer.appendChild(tag);
  }
}

/* ══════════════════════════════════════════════════════════════
   INSERT AT BEGINNING — O(1)
   Pointer changes: newNode.next = head; head.prev = newNode; head = newNode
══════════════════════════════════════════════════════════════ */
function dllInsertBeginning() {
  if (dllAnimating) return;

  const val = dllGetInputValue();
  if (val === null) return;

  if (dllSize >= DLL_MAX_SIZE) {
    dllSetStatus(`⚠ List is full! Maximum size is ${DLL_MAX_SIZE}.`, "error");
    return;
  }

  dllAnimating = true;
  const id = dllNewId();

  // Wire prev/next
  dllNodes[id] = { id, value: val, prev: null, next: dllHead };

  if (dllHead === null) {
    dllHead = id;
    dllTail = id;
  } else {
    dllNodes[dllHead].prev = id;   // ← key DLL step: old head's prev → new node
    dllHead = id;
  }
  dllSize++;
  dllOpCount++;

  document.getElementById("dllInput").value = "";
  document.getElementById("dllInput").focus();

  dllRenderList(id);
  dllUpdateStats();
  dllSetStatus(`✓ Inserted ${val} at beginning. newNode→next = old head; old head→prev = newNode.`, "success");

  setTimeout(() => { dllAnimating = false; }, 500);
}

/* ══════════════════════════════════════════════════════════════
   INSERT AT END — O(1) with tail pointer
   Pointer changes: tail.next = newNode; newNode.prev = tail; tail = newNode
══════════════════════════════════════════════════════════════ */
function dllInsertEnd() {
  if (dllAnimating) return;

  const val = dllGetInputValue();
  if (val === null) return;

  if (dllSize >= DLL_MAX_SIZE) {
    dllSetStatus(`⚠ List is full! Maximum size is ${DLL_MAX_SIZE}.`, "error");
    return;
  }

  dllAnimating = true;
  const id = dllNewId();

  dllNodes[id] = { id, value: val, prev: dllTail, next: null };

  if (dllTail === null) {
    dllHead = id;
    dllTail = id;
  } else {
    // Flash old tail to show connection
    const oldTailEl = document.querySelector(`[data-id="${dllTail}"]`);
    if (oldTailEl) {
      oldTailEl.classList.add("node-highlight");
      setTimeout(() => oldTailEl.classList.remove("node-highlight"), 260);
    }
    dllNodes[dllTail].next = id;  // ← old tail's next → new node
    dllTail = id;
  }
  dllSize++;
  dllOpCount++;

  document.getElementById("dllInput").value = "";
  document.getElementById("dllInput").focus();

  setTimeout(() => {
    dllRenderList(id);
    dllUpdateStats();
    dllSetStatus(`✓ Inserted ${val} at end. old tail→next = newNode; newNode→prev = old tail. O(1).`, "success");
    setTimeout(() => { dllAnimating = false; }, 500);
  }, 280);
}

/* ══════════════════════════════════════════════════════════════
   INSERT AT POSITION — O(n) traversal, O(1) wiring
   Pointer changes (4 links total):
     newNode.next = curr.next
     newNode.prev = curr
     curr.next.prev = newNode   (if curr.next exists)
     curr.next = newNode
══════════════════════════════════════════════════════════════ */
function dllInsertAtPosition() {
  if (dllAnimating) return;

  const val = dllGetInputValue();
  if (val === null) return;

  const pos = dllGetPositionValue();
  if (pos === null) return;

  if (dllSize >= DLL_MAX_SIZE) {
    dllSetStatus(`⚠ List is full! Maximum size is ${DLL_MAX_SIZE}.`, "error");
    return;
  }

  if (pos === 0) { dllInsertBeginning(); return; }
  if (pos === dllSize) { dllInsertEnd(); return; }

  dllAnimating = true;

  const orderedIds = [];
  let cur = dllHead;
  while (cur !== null) { orderedIds.push(cur); cur = dllNodes[cur].next; }

  let step = 0;

  function traverseToPos() {
    if (step >= pos) {
      // Clear traversal highlights
      orderedIds.forEach(id => {
        const el = document.querySelector(`[data-id="${id}"]`);
        if (el) el.classList.remove("node-position-highlight", "node-insert-target");
      });

      const prevId  = orderedIds[pos - 1];
      const nextId  = dllNodes[prevId].next;  // could be null if pos==size, handled above
      const newId   = dllNewId();

      // Wire all 4 pointers
      dllNodes[newId]  = { id: newId, value: val, prev: prevId, next: nextId };
      dllNodes[prevId].next = newId;
      if (nextId !== null) {
        dllNodes[nextId].prev = newId;  // ← key DLL step: successor's prev
      } else {
        dllTail = newId;
      }

      dllSize++;
      dllOpCount++;

      document.getElementById("dllInput").value   = "";
      document.getElementById("dllPosInput").value = "";

      setTimeout(() => {
        dllRenderList(newId);
        dllUpdateStats();
        dllSetStatus(
          `✓ Inserted ${val} at position ${pos}. 4 pointers updated: newNode.prev/next + neighbors.prev/next.`,
          "success"
        );
        setTimeout(() => { dllAnimating = false; }, 500);
      }, 120);
      return;
    }

    const el = document.querySelector(`[data-id="${orderedIds[step]}"]`);
    if (el) {
      el.classList.add("node-position-highlight");
      if (step === pos - 1) setTimeout(() => el.classList.add("node-insert-target"), 150);
    }
    dllSetStatus(`Traversing… index ${step} (value: ${dllNodes[orderedIds[step]].value})`, "info");
    step++;
    setTimeout(traverseToPos, 350);
  }

  dllSetStatus(`Traversing to position ${pos}…`, "info");
  traverseToPos();
}

/* ══════════════════════════════════════════════════════════════
   DELETE AT BEGINNING — O(1)
   Pointer changes: head = head.next; new head.prev = NULL
══════════════════════════════════════════════════════════════ */
function dllDeleteBeginning() {
  if (dllAnimating) return;
  if (dllSize === 0) { dllSetStatus("⚠ List is empty — nothing to delete.", "error"); return; }

  dllAnimating = true;

  const targetId = dllHead;
  const headEl   = document.querySelector(`[data-id="${targetId}"]`);

  if (headEl) headEl.classList.add("node-highlight");
  dllSetStatus(`Highlighting head node (value: ${dllNodes[targetId].value})…`, "info");

  setTimeout(() => {
    if (headEl) { headEl.classList.remove("node-highlight"); headEl.classList.add("node-del"); }

    setTimeout(() => {
      const deletedVal = dllNodes[targetId].value;
      const newHead    = dllNodes[targetId].next;

      dllHead = newHead;
      if (newHead !== null) {
        dllNodes[newHead].prev = null;  // ← key DLL step: new head's prev = NULL
      } else {
        dllTail = null;  // list became empty
      }

      delete dllNodes[targetId];
      dllSize--;
      dllOpCount++;

      dllRenderList();
      dllUpdateStats();
      dllSetStatus(`✓ Deleted head (value: ${deletedVal}). New head→prev set to NULL.`, "success");
      dllAnimating = false;
    }, 420);
  }, 320);
}

/* ══════════════════════════════════════════════════════════════
   DELETE AT END — O(1) with tail pointer  ← DLL advantage!
   In SLL this is O(n); in DLL tail.prev gives new tail instantly.
   Pointer changes: tail = tail.prev; new tail.next = NULL
══════════════════════════════════════════════════════════════ */
function dllDeleteEnd() {
  if (dllAnimating) return;
  if (dllSize === 0) { dllSetStatus("⚠ List is empty — nothing to delete.", "error"); return; }

  dllAnimating = true;

  if (dllSize === 1) {
    const targetId = dllHead;
    const el = document.querySelector(`[data-id="${targetId}"]`);
    if (el) el.classList.add("node-highlight");
    dllSetStatus(`Highlighting only node (value: ${dllNodes[targetId].value})…`, "info");

    setTimeout(() => {
      if (el) { el.classList.remove("node-highlight"); el.classList.add("node-del"); }
      setTimeout(() => {
        const deletedVal = dllNodes[targetId].value;
        dllHead = null; dllTail = null;
        delete dllNodes[targetId];
        dllSize--;
        dllOpCount++;
        dllRenderList();
        dllUpdateStats();
        dllSetStatus(`✓ Deleted tail (value: ${deletedVal}). List is now empty.`, "success");
        dllAnimating = false;
      }, 420);
    }, 320);
    return;
  }

  // DLL advantage: tail.prev gives us the new tail directly — no traversal!
  const targetId  = dllTail;
  const newTailId = dllNodes[dllTail].prev;  // ← O(1) because DLL

  const tailEl = document.querySelector(`[data-id="${targetId}"]`);
  if (tailEl) tailEl.classList.add("node-highlight");
  dllSetStatus(
    `Found tail via tail pointer (value: ${dllNodes[targetId].value}). DLL: O(1) delete — no traversal needed!`,
    "info"
  );

  setTimeout(() => {
    if (tailEl) { tailEl.classList.remove("node-highlight"); tailEl.classList.add("node-del"); }

    setTimeout(() => {
      const deletedVal = dllNodes[targetId].value;
      dllNodes[newTailId].next = null;  // ← new tail's next = NULL
      dllTail = newTailId;
      delete dllNodes[targetId];
      dllSize--;
      dllOpCount++;

      dllRenderList();
      dllUpdateStats();
      dllSetStatus(
        `✓ Deleted tail (value: ${deletedVal}). Used tail→prev to find new tail. O(1) — DLL advantage!`,
        "success"
      );
      dllAnimating = false;
    }, 420);
  }, 340);
}

/* ══════════════════════════════════════════════════════════════
   DELETE BY VALUE — O(n) search, O(1) unlink
   DLL advantage: once found, no need to track predecessor —
   target.prev is already available.
   Pointer changes:
     target.prev.next = target.next   (if prev exists)
     target.next.prev = target.prev   (if next exists)
══════════════════════════════════════════════════════════════ */
function dllDeleteByValue() {
  if (dllAnimating) return;

  const val = dllGetInputValue();
  if (val === null) return;

  if (dllSize === 0) { dllSetStatus("⚠ List is empty — nothing to delete.", "error"); return; }

  // Find target
  const orderedIds = [];
  let cur = dllHead;
  while (cur !== null) { orderedIds.push(cur); cur = dllNodes[cur].next; }

  let targetId = null;
  let foundAt  = -1;
  for (let i = 0; i < orderedIds.length; i++) {
    if (dllNodes[orderedIds[i]].value === val) {
      targetId = orderedIds[i];
      foundAt  = i;
      break;
    }
  }

  if (targetId === null) {
    dllSetStatus(`⚠ Value ${val} not found in the list.`, "error");
    return;
  }

  dllAnimating = true;
  let step = 0;

  function traverseToTarget() {
    if (step > foundAt) {
      // Clear highlights
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
        if (targetEl) { targetEl.classList.remove("node-highlight"); targetEl.classList.add("node-del"); }

        setTimeout(() => {
          const prevId = dllNodes[targetId].prev;
          const nextId = dllNodes[targetId].next;

          // Relink prev side
          if (prevId !== null) {
            dllNodes[prevId].next = nextId;
          } else {
            dllHead = nextId;  // deleted head
          }

          // Relink next side — DLL advantage: we already have nextId
          if (nextId !== null) {
            dllNodes[nextId].prev = prevId;  // ← key DLL step: no separate prev tracking needed
          } else {
            dllTail = prevId;  // deleted tail
          }

          delete dllNodes[targetId];
          dllSize--;
          dllOpCount++;

          document.getElementById("dllInput").value = "";

          dllRenderList();
          dllUpdateStats();
          dllSetStatus(
            `✓ Deleted value ${val} (index ${foundAt}). Used target→prev directly — no separate predecessor search.`,
            "success"
          );
          dllAnimating = false;
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
    dllSetStatus(
      isTarget
        ? `✓ Found value ${val} at index ${step}!`
        : `Searching… index ${step}: ${dllNodes[orderedIds[step]].value} ≠ ${val}`,
      isTarget ? "success" : "info"
    );

    step++;
    setTimeout(traverseToTarget, 330);
  }

  dllSetStatus(`Searching for value ${val}…`, "info");
  traverseToTarget();
}

/* ══════════════════════════════════════════════════════════════
   TRAVERSE — highlight nodes one by one (forward, head → tail)
══════════════════════════════════════════════════════════════ */
function dllTraverse() {
  if (dllAnimating) return;
  if (dllSize === 0) { dllSetStatus("⚠ List is empty — nothing to traverse.", "error"); return; }

  dllAnimating = true;

  const orderedIds = [];
  let cur = dllHead;
  while (cur !== null) { orderedIds.push(cur); cur = dllNodes[cur].next; }

  const domEls = orderedIds.map(id => document.querySelector(`[data-id="${id}"]`));
  const values = orderedIds.map(id => dllNodes[id].value);
  let i = 0;

  function highlightNext() {
    if (i > 0 && domEls[i - 1]) domEls[i - 1].classList.remove("node-traversed");
    if (i >= domEls.length) {
      dllSetStatus(`Traversal complete (forward): NULL ← [ ${values.join(" ↔ ")} ] → NULL`, "info");
      dllAnimating = false;
      return;
    }
    if (domEls[i]) domEls[i].classList.add("node-traversed");
    dllSetStatus(
      `Visiting node ${i + 1}/${orderedIds.length}: value = ${values[i]}  (following next →)`,
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
  if (dllAnimating) return;
  if (dllSize === 0) { dllSetStatus("List is already empty.", ""); return; }

  dllAnimating = true;

  const container = document.getElementById("dllSimContainer");
  if (container) {
    Array.from(container.children).forEach(child => {
      if (!child.classList.contains("sim-empty-state")) {
        child.style.transition = "opacity 0.22s ease, transform 0.22s ease";
        child.style.opacity    = "0";
        child.style.transform  = "scale(0.8)";
      }
    });
  }

  setTimeout(() => {
    dllNodes   = {};
    dllHead    = null;
    dllTail    = null;
    dllSize    = 0;
    dllOpCount = 0;
    dllIdSeq   = 0;

    dllEnablePosInput(false);
    const posInput = document.getElementById("dllPosInput");
    if (posInput) posInput.value = "";

    dllRenderList();
    dllUpdateStats();
    dllSetStatus("List reset. Ready for a new sequence.", "info");
    dllAnimating = false;
  }, 260);
}

/* ─── End of DLL Simulator ───────────────────────────────────── */