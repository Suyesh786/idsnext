/* ─── SCLL Simulator Engine ───────────────────────────────────── */
let scllList = []; 
let scllSimSteps = [];
let scllCurrentStep = -1;
let scllIsPlaying = false;
let scllPlayTimer = null;
let nodeIdCounter = 0;

function generateId() { return 'node_' + (++nodeIdCounter); }

function clearSimState() {
  clearInterval(scllPlayTimer);
  scllIsPlaying = false;
  document.getElementById("btnPlayStep").innerHTML = `<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg> Play`;
  scllSimSteps = [];
  scllCurrentStep = -1;
  updateSimControls();
}

function updateSimControls() {
  document.getElementById("btnPrevStep").disabled = scllCurrentStep <= 0;
  document.getElementById("btnNextStep").disabled = scllCurrentStep >= scllSimSteps.length - 1;
  document.getElementById("btnPlayStep").disabled = scllSimSteps.length === 0;
}

function scllReset() {
  clearSimState();
  scllList = [];
  document.getElementById("simInput").value = "";
  document.getElementById("simStatusText").textContent = "List reset. Ready.";
  document.getElementById("simCodeBlock").innerHTML = "// Waiting for operation...";
  document.getElementById("simExplanation").innerHTML = "Ready.";
  renderScllState({ nodes: [], ptrs: {}, code: "", hl: [], exp: "List cleared." });
}

function commitSteps(steps) {
  clearSimState();
  scllSimSteps = steps;
  scllCurrentStep = 0;
  updateSimControls();
  renderScllState(scllSimSteps[0]);
  simPlayPause();
}

function simPrevStep() {
  if (scllCurrentStep > 0) {
    scllCurrentStep--;
    renderScllState(scllSimSteps[scllCurrentStep]);
    updateSimControls();
  }
}

function simNextStep() {
  if (scllCurrentStep < scllSimSteps.length - 1) {
    scllCurrentStep++;
    renderScllState(scllSimSteps[scllCurrentStep]);
    updateSimControls();
  } else {
    if (scllIsPlaying) simPlayPause();
  }
}

function simPlayPause() {
  const btn = document.getElementById("btnPlayStep");
  if (scllIsPlaying) {
    clearInterval(scllPlayTimer);
    scllIsPlaying = false;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg> Play`;
  } else {
    if (scllCurrentStep >= scllSimSteps.length - 1) scllCurrentStep = 0;
    scllIsPlaying = true;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg> Pause`;
    if(scllCurrentStep === 0 && scllSimSteps.length > 1) simNextStep();
    scllPlayTimer = setInterval(simNextStep, 1000);
  }
}

function renderScllState(state) {
  if (!state) return;
  const container = document.getElementById("sllSimContainer");
  const ptrContainer = document.getElementById("sllPtrIndicators");
  
  document.getElementById("statSize").textContent = state.nodes.length;
  document.getElementById("statHead").textContent = state.nodes.length > 0 ? "0x100" : "NULL";
  document.getElementById("statTail").textContent = state.nodes.length > 0 ? "0x1" + (state.nodes.length-1).toString().padStart(2, "0") : "NULL";

  document.getElementById("simCodeBlock").innerHTML = generateCodeHTML(state.code, state.hl);
  document.getElementById("simExplanation").innerHTML = state.exp;

  if (state.nodes.length === 0) {
    container.innerHTML = `<div class="sim-empty-state"><p>List is empty</p></div>`;
    document.getElementById("scllArcPath").setAttribute("d", "");
    return;
  }

  let html = `<div style="display:flex; align-items:flex-end; justify-content:center; gap:0; padding-top: 50px;">`;
  state.nodes.forEach((n, i) => {
    let classes = "viz-node";
    if (n.state === "new") classes += " viz-node-new";
    if (n.state === "highlight") classes += " viz-node-highlight";
    
    let ptrsHere = "";
    if (state.ptrs.head === i) ptrsHere += `<div class="viz-head-pointer" style="position:absolute; top:-40px; left:50%; transform:translateX(-50%);"><div class="viz-ptr-label">HEAD</div><div class="viz-ptr-arrow">↓</div></div>`;
    if (state.ptrs.tail === i) ptrsHere += `<div class="viz-tail-pointer" style="position:absolute; top:-40px; left:50%; transform:translateX(-50%);"><div class="viz-ptr-label viz-ptr-label-tail">TAIL</div><div class="viz-ptr-arrow viz-ptr-arrow-tail" style="color:#16a34a;">↓</div></div>`;
    if (state.ptrs.temp === i) ptrsHere += `<div class="viz-head-pointer" style="position:absolute; top:-75px; left:50%; transform:translateX(-50%);"><div class="viz-ptr-label" style="background:#fef3c7; color:#d97706; border-color:#fde68a;">temp</div><div class="viz-ptr-arrow" style="color:#d97706;">↓</div></div>`;

    html += `
      <div class="viz-node-wrap" id="wrap_${n.id}" style="position:relative;">
        ${ptrsHere}
        <div class="${classes}" id="node_${n.id}" style="border: 2px solid #c0d4ff; border-radius: 10px; display:flex; background:#fff; overflow:hidden;">
          <div class="viz-node-data" style="padding:10px 14px; font-weight:bold; background:#f8fbff; font-family:monospace; font-size:15px;">${n.value}</div>
          <div class="viz-node-next" style="padding:0 7px; border-left:1px solid #e2e8f0; font-size:9px; color:#3b6cff; display:flex; align-items:center; font-family:monospace;">${i === state.nodes.length - 1 ? (state.tempTailNext || "HEAD") : "→"}</div>
        </div>
      </div>
    `;
    if (i < state.nodes.length - 1) {
      html += `<div class="viz-arrow" style="margin: 0 5px; color:#3b6cff; font-weight:bold; align-self:center;">→</div>`;
    }
  });
  html += `</div>`;
  container.innerHTML = html;

  updateScllArc(state);
}

function generateCodeHTML(codeStr, highlightLines) {
  if (!codeStr) return "";
  const lines = codeStr.split('\n');
  let res = "";
  lines.forEach((l, i) => {
    const isHl = highlightLines.includes(i + 1);
    res += `<div style="${isHl ? 'background:rgba(59,108,255,0.15); border-left:3px solid #3b6cff; font-weight:bold; color:#fff;' : 'padding-left:3px;'} padding: 2px 4px;">${l.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
  });
  return res;
}

function updateScllArc(state) {
  const path = document.getElementById("scllArcPath");
  if (!state.showArc || state.nodes.length === 0) {
    path.setAttribute("d", "");
    return;
  }
  setTimeout(() => {
    const nodes = document.querySelectorAll(".viz-node-wrap");
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    
    const svg = document.getElementById("scllArcSvg");
    const svgRect = svg.getBoundingClientRect();
    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();
    
    const startX = lastRect.right - svgRect.left - 10;
    const startY = lastRect.bottom - svgRect.top;
    
    const endX = firstRect.left - svgRect.left + 10;
    const endY = firstRect.top - svgRect.top;
    
    const cp1X = startX + 25;
    const cp1Y = startY + 45;
    const cp2X = endX - 25;
    const cp2Y = endY + 25;
    
    const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
    path.setAttribute("d", d);
  }, 50);
}

window.addEventListener('resize', () => {
  if (scllCurrentStep >= 0 && scllSimSteps[scllCurrentStep]) {
    updateScllArc(scllSimSteps[scllCurrentStep]);
  }
});

// -- OPERATIONS --

const C_CODE_INSERT_END = `void insertEnd(int value) {
  struct Node* n = malloc(sizeof(struct Node));
  n->data = value;
  if (head == NULL) {
    head = n;
    n->next = head;
    return;
  }
  struct Node* temp = head;
  while (temp->next != head) {
    temp = temp->next;
  }
  temp->next = n;
  n->next = head;
}`;

function scllInsertEnd() {
  const val = parseInt(document.getElementById("simInput").value);
  if (isNaN(val)) return;
  document.getElementById("simInput").value = "";
  let steps = [];
  const nNode = { id: generateId(), value: val, state: "new" };
  
  if (scllList.length === 0) {
    steps.push({ code: C_CODE_INSERT_END, hl: [2, 3], exp: `Created new node with value ${val}.`, nodes: [{...nNode}], ptrs: {}, showArc: false, tempTailNext: "NULL" });
    steps.push({ code: C_CODE_INSERT_END, hl: [5], exp: `HEAD points to the new node.`, nodes: [{...nNode}], ptrs: { head: 0, tail: 0 }, showArc: false, tempTailNext: "NULL" });
    steps.push({ code: C_CODE_INSERT_END, hl: [6], exp: `Set node->next to HEAD (circular link).`, nodes: [{...nNode, state:"normal"}], ptrs: { head: 0, tail: 0 }, showArc: true, tempTailNext: "HEAD" });
    commitSteps(steps); scllList.push(nNode);
  } else {
    steps.push({ code: C_CODE_INSERT_END, hl: [2, 3], exp: `Created node with value ${val}.`, nodes: [...scllList.map(n=>({...n, state:"normal"})), {...nNode}], ptrs: { head: 0, tail: scllList.length-1 }, showArc: true, tempTailNext: "HEAD" });
    let t = 0;
    while(t < scllList.length - 1) {
       steps.push({ code: C_CODE_INSERT_END, hl: [9, 10, 11], exp: `Traversing... temp is at node ${scllList[t].value}.`, nodes: [...scllList.map((n,idx)=>({...n, state:idx===t?"highlight":"normal"})), {...nNode}], ptrs: { head: 0, tail: scllList.length-1, temp: t }, showArc: true, tempTailNext: "HEAD" });
       t++;
    }
    steps.push({ code: C_CODE_INSERT_END, hl: [9, 10, 11], exp: `temp reached the last node.`, nodes: [...scllList.map((n,idx)=>({...n, state:idx===t?"highlight":"normal"})), {...nNode}], ptrs: { head: 0, tail: scllList.length-1, temp: t }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_INSERT_END, hl: [13], exp: `temp->next points to the new node.`, nodes: [...scllList.map(n=>({...n, state:"normal"})), {...nNode, state:"highlight"}], ptrs: { head: 0, tail: scllList.length-1, temp: t }, showArc: false, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_INSERT_END, hl: [14], exp: `new node->next points to HEAD.`, nodes: [...scllList.map(n=>({...n, state:"normal"})), {...nNode, state:"normal"}], ptrs: { head: 0, tail: scllList.length }, showArc: true, tempTailNext: "HEAD" });
    commitSteps(steps); scllList.push(nNode);
  }
}

const C_CODE_INSERT_BEGIN = `void insertBegin(int value) {
  struct Node* n = malloc(sizeof(struct Node));
  n->data = value;
  if (head == NULL) {
    head = n;
    n->next = head;
    return;
  }
  struct Node* temp = head;
  while (temp->next != head) {
    temp = temp->next;
  }
  n->next = head;
  temp->next = n;
  head = n;
}`;

function scllInsertBeginning() {
  const val = parseInt(document.getElementById("simInput").value);
  if (isNaN(val)) return;
  document.getElementById("simInput").value = "";
  let steps = [];
  const nNode = { id: generateId(), value: val, state: "new" };
  
  if (scllList.length === 0) {
    steps.push({ code: C_CODE_INSERT_BEGIN, hl: [2, 3], exp: `Created new node with value ${val}.`, nodes: [{...nNode}], ptrs: {}, showArc: false, tempTailNext: "NULL" });
    steps.push({ code: C_CODE_INSERT_BEGIN, hl: [5], exp: `HEAD points to the new node.`, nodes: [{...nNode}], ptrs: { head: 0, tail: 0 }, showArc: false, tempTailNext: "NULL" });
    steps.push({ code: C_CODE_INSERT_BEGIN, hl: [6], exp: `Set node->next to HEAD.`, nodes: [{...nNode, state:"normal"}], ptrs: { head: 0, tail: 0 }, showArc: true, tempTailNext: "HEAD" });
    commitSteps(steps); scllList.push(nNode);
  } else {
    steps.push({ code: C_CODE_INSERT_BEGIN, hl: [2, 3], exp: `Created node with value ${val}.`, nodes: [{...nNode}, ...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 1, tail: scllList.length }, showArc: true, tempTailNext: "HEAD" });
    let t = 1;
    while(t < scllList.length) {
       steps.push({ code: C_CODE_INSERT_BEGIN, hl: [9, 10, 11], exp: `Traversing... temp is at node ${scllList[t-1].value}.`, nodes: [{...nNode}, ...scllList.map((n,idx)=>({...n, state:idx===(t-1)?"highlight":"normal"}))], ptrs: { head: 1, tail: scllList.length, temp: t }, showArc: true, tempTailNext: "HEAD" });
       t++;
    }
    steps.push({ code: C_CODE_INSERT_BEGIN, hl: [13], exp: `new node->next points to old HEAD.`, nodes: [{...nNode, state:"highlight"}, ...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 1, tail: scllList.length, temp: scllList.length }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_INSERT_BEGIN, hl: [14], exp: `temp->next points to the new node.`, nodes: [{...nNode, state:"normal"}, ...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 1, tail: scllList.length, temp: scllList.length }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_INSERT_BEGIN, hl: [15], exp: `HEAD updated to the new node.`, nodes: [{...nNode, state:"normal"}, ...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 0, tail: scllList.length }, showArc: true, tempTailNext: "HEAD" });
    commitSteps(steps); scllList.unshift(nNode);
  }
}

const C_CODE_DEL_BEGIN = `void deleteBegin() {
  if (head == NULL) return;
  if (head->next == head) {
    free(head);
    head = NULL;
    return;
  }
  struct Node* temp = head;
  struct Node* last = head;
  while (last->next != head) {
    last = last->next;
  }
  head = head->next;
  last->next = head;
  free(temp);
}`;

function scllDeleteBeginning() {
  if (scllList.length === 0) return;
  let steps = [];
  
  if (scllList.length === 1) {
    steps.push({ code: C_CODE_DEL_BEGIN, hl: [3, 4], exp: `Only one node. Freeing it.`, nodes: [{...scllList[0], state:"highlight"}], ptrs: { head: 0 }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_DEL_BEGIN, hl: [5], exp: `Set HEAD to NULL. List is empty.`, nodes: [], ptrs: {}, showArc: false, tempTailNext: "NULL" });
    commitSteps(steps); scllList = [];
  } else {
    steps.push({ code: C_CODE_DEL_BEGIN, hl: [8, 9], exp: `temp and last point to HEAD.`, nodes: [...scllList.map((n,i)=>({...n, state:i===0?"highlight":"normal"}))], ptrs: { head: 0, temp: 0 }, showArc: true, tempTailNext: "HEAD" });
    let t = 0;
    while(t < scllList.length - 1) {
       steps.push({ code: C_CODE_DEL_BEGIN, hl: [10, 11], exp: `Traversing... last is at node ${scllList[t].value}.`, nodes: [...scllList.map((n,i)=>({...n, state:i===t?"highlight":"normal"}))], ptrs: { head: 0, temp: t }, showArc: true, tempTailNext: "HEAD" });
       t++;
    }
    steps.push({ code: C_CODE_DEL_BEGIN, hl: [10, 11], exp: `last reached the end.`, nodes: [...scllList.map((n,i)=>({...n, state:i===t?"highlight":"normal"}))], ptrs: { head: 0, temp: t }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_DEL_BEGIN, hl: [13], exp: `Move HEAD to next node.`, nodes: [...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 1, temp: t }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_DEL_BEGIN, hl: [14], exp: `Update last->next to new HEAD.`, nodes: [...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 1 }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_DEL_BEGIN, hl: [15], exp: `Free old head.`, nodes: [...scllList.slice(1).map(n=>({...n, state:"normal"}))], ptrs: { head: 0 }, showArc: true, tempTailNext: "HEAD" });
    commitSteps(steps); scllList.shift();
  }
}

const C_CODE_DEL_END = `void deleteEnd() {
  if (head == NULL) return;
  if (head->next == head) {
    free(head);
    head = NULL;
    return;
  }
  struct Node* temp = head;
  struct Node* prev = NULL;
  while (temp->next != head) {
    prev = temp;
    temp = temp->next;
  }
  prev->next = head;
  free(temp);
}`;

function scllDeleteEnd() {
  if (scllList.length === 0) return;
  let steps = [];
  if (scllList.length === 1) {
    steps.push({ code: C_CODE_DEL_END, hl: [3, 4], exp: `Only one node. Freeing it.`, nodes: [{...scllList[0], state:"highlight"}], ptrs: { head: 0 }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_DEL_END, hl: [5], exp: `Set HEAD to NULL. List is empty.`, nodes: [], ptrs: {}, showArc: false, tempTailNext: "NULL" });
    commitSteps(steps); scllList = [];
  } else {
    steps.push({ code: C_CODE_DEL_END, hl: [8, 9], exp: `Setup temp and prev.`, nodes: [...scllList.map((n,i)=>({...n, state:i===0?"highlight":"normal"}))], ptrs: { head: 0, temp: 0 }, showArc: true, tempTailNext: "HEAD" });
    let t = 0;
    while(t < scllList.length - 1) {
       steps.push({ code: C_CODE_DEL_END, hl: [10, 11, 12], exp: `Traversing... temp is at node ${scllList[t].value}.`, nodes: [...scllList.map((n,i)=>({...n, state:i===t?"highlight":"normal"}))], ptrs: { head: 0, temp: t }, showArc: true, tempTailNext: "HEAD" });
       t++;
    }
    steps.push({ code: C_CODE_DEL_END, hl: [10, 11, 12], exp: `temp is at last node, prev is at second to last.`, nodes: [...scllList.map((n,i)=>({...n, state:i===t?"highlight":"normal"}))], ptrs: { head: 0, temp: t }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_DEL_END, hl: [14], exp: `Update prev->next to point to HEAD.`, nodes: [...scllList.map((n,i)=>({...n, state:i===(t-1)?"highlight":"normal"}))], ptrs: { head: 0, temp: t }, showArc: false, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_DEL_END, hl: [15], exp: `Free last node.`, nodes: [...scllList.slice(0, t).map(n=>({...n, state:"normal"}))], ptrs: { head: 0 }, showArc: true, tempTailNext: "HEAD" });
    commitSteps(steps); scllList.pop();
  }
}

const C_CODE_TRAVERSE = `void display() {
  if (head == NULL) return;
  struct Node* temp = head;
  do {
    printf("%d ", temp->data);
    temp = temp->next;
  } while (temp != head);
}`;

function scllTraverse() {
  if (scllList.length === 0) return;
  let steps = [];
  steps.push({ code: C_CODE_TRAVERSE, hl: [3], exp: `Start temp at HEAD.`, nodes: [...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 0, temp: 0 }, showArc: true, tempTailNext: "HEAD" });
  for (let i = 0; i < scllList.length; i++) {
    steps.push({ code: C_CODE_TRAVERSE, hl: [4, 5], exp: `Print node value: ${scllList[i].value}.`, nodes: [...scllList.map((n,idx)=>({...n, state:idx===i?"highlight":"normal"}))], ptrs: { head: 0, temp: i }, showArc: true, tempTailNext: "HEAD" });
    steps.push({ code: C_CODE_TRAVERSE, hl: [6], exp: `Move temp to next node.`, nodes: [...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 0, temp: (i+1)%scllList.length }, showArc: true, tempTailNext: "HEAD" });
  }
  steps.push({ code: C_CODE_TRAVERSE, hl: [7], exp: `temp is back to HEAD. Stop traversal.`, nodes: [...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 0 }, showArc: true, tempTailNext: "HEAD" });
  commitSteps(steps);
}

const C_CODE_SEARCH = `int search(int target) {
  if (head == NULL) return 0;
  struct Node* temp = head;
  do {
    if (temp->data == target) return 1;
    temp = temp->next;
  } while (temp != head);
  return 0;
}`;

function scllSearch() {
  if (scllList.length === 0) return;
  const target = parseInt(document.getElementById("simInput").value);
  if (isNaN(target)) return;
  document.getElementById("simInput").value = "";
  
  let steps = [];
  steps.push({ code: C_CODE_SEARCH, hl: [3], exp: `Start temp at HEAD to search for ${target}.`, nodes: [...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 0, temp: 0 }, showArc: true, tempTailNext: "HEAD" });
  
  for (let i = 0; i < scllList.length; i++) {
    steps.push({ code: C_CODE_SEARCH, hl: [5], exp: `Checking if ${scllList[i].value} == ${target}.`, nodes: [...scllList.map((n,idx)=>({...n, state:idx===i?"highlight":"normal"}))], ptrs: { head: 0, temp: i }, showArc: true, tempTailNext: "HEAD" });
    if (scllList[i].value === target) {
      steps.push({ code: C_CODE_SEARCH, hl: [5], exp: `Target ${target} found at position ${i}!`, nodes: [...scllList.map((n,idx)=>({...n, state:idx===i?"highlight":"normal"}))], ptrs: { head: 0, temp: i }, showArc: true, tempTailNext: "HEAD" });
      commitSteps(steps);
      return;
    }
    steps.push({ code: C_CODE_SEARCH, hl: [6], exp: `Not found. Move temp to next node.`, nodes: [...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 0, temp: (i+1)%scllList.length }, showArc: true, tempTailNext: "HEAD" });
  }
  steps.push({ code: C_CODE_SEARCH, hl: [8], exp: `Target ${target} not found in the list.`, nodes: [...scllList.map(n=>({...n, state:"normal"}))], ptrs: { head: 0 }, showArc: true, tempTailNext: "HEAD" });
  commitSteps(steps);
}
