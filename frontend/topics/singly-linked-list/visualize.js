/* ─── visualize.js ─────────────────────────────────────────────
   Step-by-step "Insert at Beginning" visualizer for iDS Studio Next.
   No external dependencies. No 'use strict' (avoids smart-quote issues).
──────────────────────────────────────────────────────────────── */

// ═══════════════════════════════════════════════════════════════
//  MODE
// ═══════════════════════════════════════════════════════════════
var mode = 'insert-beginning';

var MODE_LABELS = {
  'insert-beginning': 'Insert at Beginning',
  'insert-end':       'Insert at End',
  'insert-position':  'Insert at Position',
  'delete-beginning': 'Delete at Beginning',
  'delete-end':       'Delete at End',
  'delete-position':  'Delete at Position'
};

// ── Code HTML templates per mode ────────────────────────────────
var CODE_TEMPLATES = {
  'insert-beginning': [
    { line: 0, cls: 'viz-code-comment', html: '<span class="c-comment">// Node structure</span>' },
    { line: 0, html: '<span class="c-kw">struct</span> Node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> Node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">insertAtBeginning</span>(<span class="c-type">int</span> value) {' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> Node* newNode = (<span class="c-kw">struct</span> Node*)' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">malloc</span>(<span class="c-kw">sizeof</span>(<span class="c-kw">struct</span> Node));' },
    { line: 2, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newNode-&gt;data = value;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;head = tail = newNode; <span class="c-comment">// First node</span>' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;newNode-&gt;next = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '&nbsp;&nbsp;} <span class="c-kw">else</span> {' },
    { line: 3, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;newNode-&gt;next = head;' },
    { line: 4, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;head = newNode;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 5, html: '}' }
  ],
  'delete-beginning': [
    { line: 0, cls: 'viz-code-comment', html: '<span class="c-comment">// Node structure</span>' },
    { line: 0, html: '<span class="c-kw">struct</span> Node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> Node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">deleteAtBeginning</span>() {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head == <span class="c-kw">NULL</span>) <span class="c-kw">return</span>;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head == tail) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">free</span>(head); head = tail = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '&nbsp;&nbsp;} <span class="c-kw">else</span> {' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-kw">struct</span> Node* temp = head;' },
    { line: 2, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;head = head-&gt;next;' },
    { line: 3, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">free</span>(temp);' },
    { line: 4, html: '&nbsp;&nbsp;}' },
    { line: 4, html: '}' }
  ],
  'delete-end': [
    { line: 0, cls: 'viz-code-comment', html: '<span class="c-comment">// Node structure</span>' },
    { line: 0, html: '<span class="c-kw">struct</span> Node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> Node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">deleteAtEnd</span>() {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head == <span class="c-kw">NULL</span>) { <span class="c-fn">printf</span>(<span class="c-str">"empty\\n"</span>); <span class="c-kw">return</span>; }' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head-&gt;next == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">free</span>(head); head = tail = <span class="c-kw">NULL</span>; <span class="c-kw">return</span>;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 'de_init_temp', cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> Node* temp = head;' },
    { line: 'de_init_ptr',  cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> Node* ptr = <span class="c-kw">NULL</span>;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 'de_while',     cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">while</span> (temp-&gt;next != <span class="c-kw">NULL</span>) {' },
    { line: 'de_ptr_eq',    cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;ptr = temp;' },
    { line: 'de_temp_next', cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;temp = temp-&gt;next;' },
    { line: 'de_while_end', cls: 'viz-highlightable', html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 'de_free',      cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-fn">free</span>(temp);' },
    { line: 'de_null_link', cls: 'viz-highlightable', html: '&nbsp;&nbsp;ptr-&gt;next = <span class="c-kw">NULL</span>;' },
    { line: 'de_tail',      cls: 'viz-highlightable', html: '&nbsp;&nbsp;tail = ptr;' },
    { line: 0, html: '}' }
  ]
};

function renderCodePanel(m) {
  var container = document.getElementById('codeLines');
  if (!container) return;
  var tpl = CODE_TEMPLATES[m] || CODE_TEMPLATES['insert-beginning'];
  var html = '';
  var lineNum = 1;
  for (var i = 0; i < tpl.length; i++) {
    var t = tpl[i];
    var extra = t.cls ? ' ' + t.cls : '';
    html += '<div class="viz-code-line' + extra + '" data-line="' + t.line + '">';
    html += '<span class="lnum">' + lineNum + '</span>';
    html += '<span class="lcode">' + t.html + '</span>';
    html += '</div>';
    lineNum++;
  }
  container.innerHTML = html;
}

function switchMode(newMode) {
  if (newMode === mode) return;
  mode = newMode;

  // Update pill button states
  var pills = document.querySelectorAll('.viz-op-pill');
  for (var i = 0; i < pills.length; i++) {
    pills[i].classList.remove('viz-op-pill-active');
  }
  var active = document.querySelector('.viz-op-pill[data-mode="' + newMode + '"]');
  if (active) active.classList.add('viz-op-pill-active');

  // Update header badge text
  var badge = document.querySelector('.viz-operation-badge');
  if (badge) {
    badge.childNodes[badge.childNodes.length - 1].textContent = ' ' + (MODE_LABELS[newMode] || newMode);
  }

  // Stop playback
  stopPlay();

  // Reset animation state
  VIZ.currentStep = 0;
  VIZ.newValue    = 0;
  if (VIZ.el.vizValueInput) VIZ.el.vizValueInput.value = '';

  hideCurve();
  hideNewNode();
  hideTempPointer();
  if (typeof hidePtrPointer === 'function') hidePtrPointer();

  if (newMode === 'insert-beginning') {
    var overlay = document.getElementById('comingSoonOverlay');
    if (overlay) overlay.classList.remove('visible');
    var inputRow = document.getElementById('valueInputRow');
    if (inputRow) inputRow.style.display = '';
    var lbl = document.getElementById('vizValueLabel');
    if (lbl) lbl.textContent = 'Insert value';
    renderCodePanel('insert-beginning');
    VIZ.totalSteps = 5;
    if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;
    rebuildStepList(INSERT_BEGINNING_STEP_LABELS);
    rebuildDots(5);
    buildList(VIZ.initialList, false, 0);
    applyStep(0);

  } else if (newMode === 'delete-beginning') {
    var overlay = document.getElementById('comingSoonOverlay');
    if (overlay) overlay.classList.remove('visible');
    var inputRow = document.getElementById('valueInputRow');
    if (inputRow) inputRow.style.display = 'none';
    renderCodePanel('delete-beginning');
    VIZ.totalSteps = 4;
    if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;
    rebuildStepList(DELETE_BEGINNING_STEP_LABELS);
    rebuildDots(4);
    VIZ.deleteList = VIZ.initialList.slice();
    buildList(VIZ.deleteList, false, 0);
    applyStep(0);

  } else if (newMode === 'delete-end') {
    var overlay = document.getElementById('comingSoonOverlay');
    if (overlay) overlay.classList.remove('visible');
    var inputRow = document.getElementById('valueInputRow');
    if (inputRow) inputRow.style.display = 'none';
    renderCodePanel('delete-end');
    VIZ.totalSteps = 14;
    if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;
    rebuildStepList(DELETE_END_STEP_LABELS);
    rebuildDots(14);
    VIZ.deleteList = VIZ.initialList.slice();
    DEND_SEQ_STATE.seqIdx = 0;
    DEND_SEQ_STATE.tempIdx = 0;
    DEND_SEQ_STATE.ptrIdx = -1;
    buildList(VIZ.deleteList, false, 0);
    applyStep(0);

  } else {
    var overlay = document.getElementById('comingSoonOverlay');
    if (overlay) {
      var title = document.getElementById('comingSoonTitle');
      var text  = document.getElementById('comingSoonText');
      if (title) title.textContent = MODE_LABELS[newMode] + ' \u2014 Coming Soon';
      if (text)  text.innerHTML = 'This operation is being built.<br>Switch back to <strong>Insert at Beginning</strong> to explore the working animation.';
      overlay.classList.add('visible');
    }
    var inputRow = document.getElementById('valueInputRow');
    if (inputRow) inputRow.style.display = 'none';
    buildList(VIZ.initialList, false, 0);
    applyStep(0);
  }
}

var INSERT_BEGINNING_STEP_LABELS = [
  'Allocate memory (malloc)',
  'Assign value to node',
  'Link new node \u2192 old head',
  'Update HEAD pointer',
  'Final rearrangement'
];

var DELETE_BEGINNING_STEP_LABELS = [
  'Save head: temp = head',
  'Move head: head = head\u2192next',
  'Free temp node',
  'Final arrangement'
];

function rebuildStepList(labels) {
  var list = document.getElementById('stepList');
  if (!list) return;
  var html = '';
  for (var i = 0; i < labels.length; i++) {
    html += '<div class="viz-step-item viz-step-upcoming" data-step="' + (i + 1) + '">';
    html += '<div class="viz-step-dot"></div>';
    html += '<span>' + labels[i] + '</span>';
    html += '</div>';
  }
  list.innerHTML = html;
}

function rebuildDots(total) {
  var container = document.getElementById('progressDots');
  if (!container) return;
  var html = '<div class="viz-dot viz-dot-active" data-step="0"></div>';
  for (var i = 1; i <= total; i++) {
    html += '<div class="viz-dot" data-step="' + i + '"></div>';
  }
  container.innerHTML = html;
}


// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
var VIZ = {
  currentStep: 0,
  totalSteps: 5,
  isPlaying: false,
  playTimer: null,
  playDelay: 2000,
  initialList: [1, 2, 3, 4],
  newValue: 0,
  deleteList: [1, 2, 3, 4],
  el: {}
};

// ═══════════════════════════════════════════════════════════════
//  STEP DEFINITIONS  (all strings use straight ASCII quotes)
// ═══════════════════════════════════════════════════════════════
var STEPS = [
  {
    codeLine: null,
    animStatus: 'Ready',
    animStatusClass: '',
    explainStepNum: 'Initial State',
    explainTitle: 'Starting Point',
    explainText: 'We start with a linked list containing nodes <strong>1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL</strong>.<br><br>Our goal: insert a new node with value <strong>0</strong> at the very beginning.',
    whatBody: 'The HEAD pointer currently points to node 1. We call <code>insertAtBeginning(&amp;head, 0)</code>.',
    conceptText: '\uD83D\uDCA1 Insert at beginning is O(1) \u2014 no traversal needed!'
  },
  {
    codeLine: 1,
    animStatus: 'Allocating\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 5',
    explainTitle: 'Allocate Memory',
    explainText: '<code>malloc(sizeof(struct Node))</code> asks the OS for memory big enough to hold one node.<br><br>The OS picks a free spot on the <strong>heap</strong> and returns its address, stored in <strong>newNode</strong>.',
    whatBody: 'A new node box appears below the list. Memory is allocated but fields are not yet set \u2014 data is garbage.',
    conceptText: '\uD83E\uDDE0 malloc returns void*. We cast it to (struct Node*) so C knows the type.'
  },
  {
    codeLine: 2,
    animStatus: 'Assigning\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 5',
    explainTitle: 'Assign the Value',
    explainText: '<code>newNode-&gt;data = val;</code> writes our value (<strong>0</strong>) into the data field of the new node.',
    whatBody: 'The new node\'s data field now shows "0". The next pointer is still uninitialised.',
    conceptText: '\uD83D\uDCDD The -> operator dereferences the pointer and accesses the struct member in one step.'
  },
  {
    codeLine: 3,
    animStatus: 'Linking\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 5',
    explainTitle: 'Link to Old Head',
    explainText: '<code>newNode-&gt;next = *head;</code> makes the new node\'s next pointer point to the <strong>current head</strong> (node 1).<br><br>This step preserves the existing list.',
    whatBody: 'A curved arrow now connects the new node to the old first node. Chain: new \u2192 1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL.',
    conceptText: '\u26A0\uFE0F Do this BEFORE updating head \u2014 updating head first would lose the reference to the old list!'
  },
  {
    codeLine: 4,
    animStatus: 'Updating HEAD\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 4 of 5',
    explainTitle: 'Update HEAD Pointer',
    explainText: '<code>*head = newNode;</code> moves the HEAD pointer to our new node, making it the official beginning of the list.',
    whatBody: 'The HEAD label jumps to the new node (value 0). The insertion is logically complete.',
    conceptText: '\uD83C\uDFAF We use double pointer (**head) so changes to head are visible outside the function.'
  },
  {
    codeLine: 5,
    animStatus: 'Complete \u2713',
    animStatusClass: 'status-complete',
    explainStepNum: 'Step 5 of 5',
    explainTitle: 'Final Arrangement',
    explainText: 'The function returns. The linked list is now:<br><strong>0 \u2192 1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL</strong><br><br>Node 0 is the new head of the list.',
    whatBody: 'All nodes shift into a clean horizontal line. Insertion complete in O(1) constant time.',
    conceptText: '\u2705 Done! insertAtBeginning always takes the same time regardless of list size.'
  }
];

// ── Delete at Beginning step definitions ────────────────────────
var DELETE_STEPS = [
  {
    codeLine: null,
    animStatus: 'Ready',
    animStatusClass: '',
    explainStepNum: 'Initial State',
    explainTitle: 'Starting Point',
    explainText: 'We have a linked list: <strong>1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL</strong>.<br><br>Goal: delete the <strong>first node</strong> (value 1) from the beginning.',
    whatBody: 'HEAD points to node 1. We call <code>deleteAtBeginning(&amp;head)</code>.',
    conceptText: '\uD83D\uDCA1 Delete at beginning is O(1) \u2014 no traversal needed!'
  },
  {
    codeLine: 1,
    animStatus: 'Saving temp\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 4',
    explainTitle: 'Save Head in Temp',
    explainText: '<code>struct Node* temp = head;</code> saves the current head pointer so we can free it after moving HEAD forward.',
    whatBody: 'A <strong>temp</strong> label appears above node 1. We now hold a reference to it so it won\'t be lost.',
    conceptText: '\uD83D\uDCCC Without temp, we\'d lose the only reference to node 1 and cause a memory leak!'
  },
  {
    codeLine: 2,
    animStatus: 'Moving HEAD\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 4',
    explainTitle: 'Move HEAD Forward',
    explainText: '<code>head = head-&gt;next;</code> advances the HEAD pointer to the second node (value 2).',
    whatBody: 'HEAD jumps to node 2. Node 1 is now unreachable from the list \u2014 but temp still holds its address.',
    conceptText: '\u26A0\uFE0F Do this AFTER saving temp \u2014 otherwise you lose the reference to node 1 forever!'
  },
  {
    codeLine: 3,
    animStatus: 'Freeing memory\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 4',
    explainTitle: 'Free the Temp Node',
    explainText: '<code>free(temp);</code> releases the heap memory that node 1 was using back to the OS.',
    whatBody: 'Node 1 fades out and disappears. Its memory is returned. temp becomes a dangling pointer.',
    conceptText: '\uD83E\uDDE0 free() doesn\'t zero memory \u2014 it just marks it available. Never use temp after this!'
  },
  {
    codeLine: 4,
    animStatus: 'Complete \u2713',
    animStatusClass: 'status-complete',
    explainStepNum: 'Step 4 of 4',
    explainTitle: 'Final Arrangement',
    explainText: 'Deletion complete! The list is now:<br><strong>2 \u2192 3 \u2192 4 \u2192 NULL</strong><br><br>Node 2 is the new head.',
    whatBody: 'Remaining nodes shift left. HEAD points to node 2. List shortened by one node.',
    conceptText: '\u2705 Done! deleteAtBeginning always takes O(1) time regardless of list size.'
  }
];

// ── Delete-at-End micro-step sequence ───────────────────────────
// List: [1,2,3,4] → 3 loop iterations needed before temp reaches node 4
// Sequence: init → while_check_0 → ptr_move_0 → temp_move_0
//           → while_check_1 → ptr_move_1 → temp_move_1
//           → while_check_2 → ptr_move_2 → temp_move_2
//           → loop_end → free → relink → tail_update
var DEND_SEQ = [
  'init',
  'while_check_0',
  'ptr_move_0',
  'temp_move_0',
  'while_check_1',
  'ptr_move_1',
  'temp_move_1',
  'while_check_2',
  'ptr_move_2',
  'temp_move_2',
  'loop_end',
  'free_node',
  'relink',
  'tail_update'
];

var DEND_SEQ_STATE = {
  seqIdx: 0,
  tempIdx: 0,
  ptrIdx: -1
};

var DELETE_END_STEP_LABELS = [
  'Initialize temp = head, ptr = NULL',
  'Check while(temp->next != NULL)',
  'ptr = temp  [iteration 1]',
  'temp = temp->next  [iteration 1]',
  'Check while(temp->next != NULL)',
  'ptr = temp  [iteration 2]',
  'temp = temp->next  [iteration 2]',
  'Check while(temp->next != NULL)',
  'ptr = temp  [iteration 3]',
  'temp = temp->next  [iteration 3]',
  'Loop exits — temp at last node',
  'free(temp) — delete last node',
  'ptr->next = NULL',
  'tail = ptr — done!'
];

// ── Delete at End step definitions (one entry per micro-step) ───
var DELETE_END_STEPS = [
  // 0: initial state
  {
    codeLine: null,
    animStatus: 'Ready',
    animStatusClass: '',
    explainStepNum: 'Initial State',
    explainTitle: 'Starting Point',
    explainText: 'We have a linked list: <strong>1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL</strong>.<br><br>Goal: delete the <strong>last node</strong> (value 4) from the end.',
    whatBody: 'HEAD points to node 1. TAIL points to node 4. We call <code>deleteAtEnd()</code>.',
    conceptText: '\uD83D\uDCA1 Delete at end requires O(n) traversal to find the second-to-last node.'
  },
  // 1: init
  {
    codeLine: 'de_init_temp',
    animStatus: 'Initializing\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 13',
    explainTitle: 'Initialize Pointers',
    explainText: '<code>struct Node* temp = head;</code><br><code>struct Node* ptr = NULL;</code><br><br><strong>temp</strong> starts at node 1. <strong>ptr</strong> is NULL.',
    whatBody: '<strong>temp</strong> appears above node 1. <strong>ptr</strong> shown faded below (NULL).',
    conceptText: '\uD83D\uDCCC ptr trails one step behind temp so it lands on the second-to-last node.'
  },
  // 2: while_check_0
  {
    codeLine: 'de_while',
    animStatus: 'Checking loop\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 13',
    explainTitle: 'Check: temp\u2192next != NULL?',
    explainText: '<code>while (temp-&gt;next != NULL)</code><br><br>temp is at node <strong>1</strong>. Its next is <strong>0x102</strong> (not NULL). \u2714 Enter loop.',
    whatBody: 'The while condition is true. We enter iteration 1.',
    conceptText: '\u26A0\uFE0F We loop while temp has a next node — so temp will land on the LAST node when the loop exits.'
  },
  // 3: ptr_move_0
  {
    codeLine: 'de_ptr_eq',
    animStatus: 'ptr = temp\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 13',
    explainTitle: 'ptr = temp  [iter 1]',
    explainText: '<code>ptr = temp;</code><br><br>ptr now points to the same node as temp: node <strong>1</strong>.',
    whatBody: '<strong>ptr</strong> moves below node 1. The upward arrow (\u2191) connects ptr to the node.',
    conceptText: '\uD83D\uDC49 Only ptr moves this click. temp stays on node 1.'
  },
  // 4: temp_move_0
  {
    codeLine: 'de_temp_next',
    animStatus: 'temp advances\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 4 of 13',
    explainTitle: 'temp = temp\u2192next  [iter 1]',
    explainText: '<code>temp = temp-&gt;next;</code><br><br>temp jumps from node 1 to node <strong>2</strong>.',
    whatBody: '<strong>temp</strong> slides to node 2. ptr stays on node 1.',
    conceptText: '\uD83D\uDC49 Only temp moves this click. ptr holds position on node 1.'
  },
  // 5: while_check_1
  {
    codeLine: 'de_while',
    animStatus: 'Checking loop\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 5 of 13',
    explainTitle: 'Check: temp\u2192next != NULL?',
    explainText: '<code>while (temp-&gt;next != NULL)</code><br><br>temp is at node <strong>2</strong>. Its next is <strong>0x103</strong>. \u2714 Continue loop.',
    whatBody: 'Condition still true. Entering iteration 2.',
    conceptText: '\uD83D\uDD04 Each loop iteration: first ptr = temp, then temp = temp\u2192next.'
  },
  // 6: ptr_move_1
  {
    codeLine: 'de_ptr_eq',
    animStatus: 'ptr = temp\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 6 of 13',
    explainTitle: 'ptr = temp  [iter 2]',
    explainText: '<code>ptr = temp;</code><br><br>ptr now points to node <strong>2</strong>.',
    whatBody: '<strong>ptr</strong> slides to node 2. temp still on node 2.',
    conceptText: '\uD83D\uDC49 Only ptr moves this click.'
  },
  // 7: temp_move_1
  {
    codeLine: 'de_temp_next',
    animStatus: 'temp advances\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 7 of 13',
    explainTitle: 'temp = temp\u2192next  [iter 2]',
    explainText: '<code>temp = temp-&gt;next;</code><br><br>temp jumps from node 2 to node <strong>3</strong>.',
    whatBody: '<strong>temp</strong> moves to node 3. ptr stays on node 2.',
    conceptText: '\uD83D\uDC49 Only temp moves this click.'
  },
  // 8: while_check_2
  {
    codeLine: 'de_while',
    animStatus: 'Checking loop\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 8 of 13',
    explainTitle: 'Check: temp\u2192next != NULL?',
    explainText: '<code>while (temp-&gt;next != NULL)</code><br><br>temp is at node <strong>3</strong>. Its next is <strong>0x104</strong>. \u2714 Continue loop.',
    whatBody: 'Condition still true. Entering iteration 3.',
    conceptText: '\uD83D\uDD04 One more iteration left — temp is not yet at the last node.'
  },
  // 9: ptr_move_2
  {
    codeLine: 'de_ptr_eq',
    animStatus: 'ptr = temp\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 9 of 13',
    explainTitle: 'ptr = temp  [iter 3]',
    explainText: '<code>ptr = temp;</code><br><br>ptr now points to node <strong>3</strong>.',
    whatBody: '<strong>ptr</strong> moves to node 3. temp also on node 3.',
    conceptText: '\uD83D\uDC49 Only ptr moves this click.'
  },
  // 10: temp_move_2
  {
    codeLine: 'de_temp_next',
    animStatus: 'temp advances\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 10 of 13',
    explainTitle: 'temp = temp\u2192next  [iter 3]',
    explainText: '<code>temp = temp-&gt;next;</code><br><br>temp jumps from node 3 to node <strong>4</strong> (the last node).',
    whatBody: '<strong>temp</strong> lands on node 4 (last). ptr rests on node 3.',
    conceptText: '\u23F9\uFE0F temp\u2192next is now NULL. The loop will exit on the next check.'
  },
  // 11: loop_end
  {
    codeLine: 'de_while_end',
    animStatus: 'Loop exits\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 11 of 13',
    explainTitle: 'Loop Exits',
    explainText: '<code>temp-&gt;next == NULL</code> \u2714 Loop exits.<br><br><strong>temp</strong> = node 4 (last). <strong>ptr</strong> = node 3 (second-to-last).',
    whatBody: 'temp is highlighted on node 4. ptr rests on node 3. Perfect positions for deletion.',
    conceptText: '\uD83C\uDFAF ptr is now the future new tail once we free temp and update the link.'
  },
  // 12: free_node
  {
    codeLine: 'de_free',
    animStatus: 'Freeing node\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 12 of 13',
    explainTitle: 'free(temp)',
    explainText: '<code>free(temp);</code><br><br>Node 4\u2019s memory is released back to the OS.',
    whatBody: 'Node 4 fades and shrinks away. Memory returned. temp is now a dangling pointer.',
    conceptText: '\uD83E\uDDE0 free() marks memory available for reuse. Never dereference temp after this!'
  },
  // 13: relink
  {
    codeLine: 'de_null_link',
    animStatus: 'Updating link\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 13 of 13',
    explainTitle: 'ptr\u2192next = NULL',
    explainText: '<code>ptr-&gt;next = NULL;</code><br><br>Node 3\u2019s next field is set to NULL.',
    whatBody: 'Node 3\u2019s next field flashes and updates to NULL. List now: 1 \u2192 2 \u2192 3 \u2192 NULL.',
    conceptText: '\u26A0\uFE0F Without this step, node 3 would point to freed memory — a dangling pointer bug!'
  },
  // 14: tail_update
  {
    codeLine: 'de_tail',
    animStatus: 'Complete \u2713',
    animStatusClass: 'status-complete',
    explainStepNum: 'Done!',
    explainTitle: 'tail = ptr',
    explainText: '<code>tail = ptr;</code><br><br>TAIL moves from node 4 to node 3. Deletion complete!<br><strong>1 \u2192 2 \u2192 3 \u2192 NULL</strong>',
    whatBody: 'TAIL pointer slides to node 3. ptr and temp pointers are hidden. List is clean.',
    conceptText: '\u2705 deleteAtEnd takes O(n) time \u2014 traversal was needed to find the second-to-last node.'
  }
];

// ═══════════════════════════════════════════════════════════════
//  MEMORY ADDRESS CONSTANTS
// ═══════════════════════════════════════════════════════════════
// Stable fake hex addresses. Index 0-4 = nodes 1,2,3,4 in initial list.
// NEW_NODE_ADDR = the node being inserted (value 0).
var MEM_ADDRS    = ['0x101', '0x102', '0x103', '0x104', '0x105'];
var NEW_NODE_ADDR = '0x100';

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  cacheElements();
  renderCodePanel('insert-beginning');
  buildList(VIZ.initialList, false, 0);
  applyStep(0);
});

function cacheElements() {
  function q(id) { return document.getElementById(id); }
  VIZ.el = {
    listRow:         q('listRow'),
    newNodeWrap:     q('newNodeWrap'),
    newNodeEl:       q('newNodeEl'),
    newNodeData:     q('newNodeData'),
    newNodeLabel:    q('newNodeLabel'),
    headPointer:     q('headPointer'),
    headAddr:        q('headAddr'),
    tailPointer:     q('tailPointer'),
    tailAddr:        q('tailAddr'),
    curveSvg:        q('curveSvg'),
    curvePath:       q('curvePath'),
    animStatus:      q('animStatus'),
    btnPrev:         q('btnPrev'),
    btnNext:         q('btnNext'),
    btnPlay:         q('btnPlay'),
    btnReset:        q('btnReset'),
    playIcon:        q('playIcon'),
    pauseIcon:       q('pauseIcon'),
    playLabel:       q('playLabel'),
    headerStepNum:   q('headerStepNum'),
    headerStepTotal: q('headerStepTotal'),
    explainCard:     q('explainCard'),
    explainStepNum:  q('explainStepNum'),
    explainTitle:    q('explainTitle'),
    explainText:     q('explainText'),
    whatBody:        q('whatBody'),
    conceptText:     q('conceptText'),
    vizValueInput:   q('vizValueInput'),
    tempPointer:     q('tempPointer'),
    tempAddr:        q('tempAddr'),
    ptrPointer:      q('ptrPointer'),
    ptrAddr:         q('ptrAddr')
  };
  if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;
}

// ═══════════════════════════════════════════════════════════════
//  POINTER TRACKING SYSTEM
//  nodeList: [{ value, address }]  headIndex  tailIndex
// ═══════════════════════════════════════════════════════════════
var PTR = {
  nodeList:    [],      // current rendered nodes {value, address}
  headIndex:   0,       // index into nodeList for HEAD
  tailIndex:   0,       // index into nodeList for TAIL
  newNodeAddr: '0x100'  // address of the node being inserted
};

// Build nodeList from a values array using stable MEM_ADDRS mapping.
// Special case: if a value matches VIZ.newValue and we're building the
// final rearranged list, that node keeps its real address (0x100).
function buildNodeList(values) {
  PTR.nodeList = [];
  var newInserted = false;
  for (var i = 0; i < values.length; i++) {
    var isNewNode = (!newInserted && values[i] === VIZ.newValue && values.length === VIZ.initialList.length + 1);
    var addr;
    if (isNewNode) {
      addr = NEW_NODE_ADDR;   // '0x100'
      newInserted = true;
    } else {
      // Shift index back by 1 if new node was prepended
      var baseIdx = newInserted ? (i - 1) : i;
      addr = MEM_ADDRS[baseIdx] || ('0x' + (0x101 + baseIdx).toString(16));
    }
    PTR.nodeList.push({ value: values[i], address: addr });
  }
}

function buildList(values, withEnter, headIdx) {
  if (headIdx === undefined) headIdx = 0;
  buildNodeList(values);
  PTR.headIndex = headIdx < values.length ? headIdx : 0;
  PTR.tailIndex = values.length - 1;

  var row = VIZ.el.listRow;
  if (!row) return;
  row.innerHTML = '';

  for (var i = 0; i < PTR.nodeList.length; i++) {
    var nodeObj = PTR.nodeList[i];
    // Determine what "next" field should show
    var nextAddr;
    if (i < PTR.nodeList.length - 1) {
      nextAddr = PTR.nodeList[i + 1].address;
    } else {
      nextAddr = 'NULL';
    }

    var wrap = document.createElement('div');
    wrap.className = 'viz-node-wrap';

    var node = document.createElement('div');
    node.className = 'viz-node' + (withEnter ? ' viz-node-entering' : '');
    if (withEnter) node.style.animationDelay = (i * 65) + 'ms';
    node.dataset.index = i;

    node.innerHTML =
      '<div class="viz-node-data">' + nodeObj.value + '</div>' +
      '<div class="viz-node-next">' + nextAddr + '</div>';

    var addrEl = document.createElement('div');
    addrEl.className = 'viz-node-addr';
    addrEl.textContent = nodeObj.address;

    wrap.appendChild(node);
    wrap.appendChild(addrEl);
    row.appendChild(wrap);

    if (i < PTR.nodeList.length - 1) {
      var a = document.createElement('div');
      a.className = 'viz-arrow';
      a.textContent = '\u2192';
      row.appendChild(a);
    }
  }

  var fa = document.createElement('div');
  fa.className = 'viz-arrow';
  fa.textContent = '\u2192';
  row.appendChild(fa);

  var nullEl = document.createElement('div');
  nullEl.className = 'viz-null';
  nullEl.textContent = 'NULL';
  row.appendChild(nullEl);

  // Position both pointers after DOM paints
  requestAnimationFrame(function () {
    positionPointers();
  });
}

// ── Core positioning engine ─────────────────────────────────────
// Positions HEAD and TAIL tightly just above their respective nodes.
function positionPointers() {
  var canvas = document.getElementById('animCanvas');
  var row    = VIZ.el.listRow;
  var hp     = VIZ.el.headPointer;
  var tp     = VIZ.el.tailPointer;
  if (!canvas || !row || !hp || !tp) return;

  var wraps = row.querySelectorAll('.viz-node-wrap');
  if (!wraps || wraps.length === 0) return;

  var canvasRect = canvas.getBoundingClientRect();

  // HEAD — position tightly above node top
  var hIdx  = Math.min(PTR.headIndex, wraps.length - 1);
  var hWrap = wraps[hIdx];
  var hNode = hWrap.querySelector('.viz-node');
  var hRect = (hNode || hWrap).getBoundingClientRect();
  var hCx   = hRect.left + hRect.width / 2 - canvasRect.left;
  // top = node top relative to canvas, then subtract pointer height + 4px gap
  var hTopY = hRect.top - canvasRect.top - hp.getBoundingClientRect().height - 4;

  // TAIL — position tightly above node top
  var tIdx  = Math.min(PTR.tailIndex, wraps.length - 1);
  var tWrap = wraps[tIdx];
  var tNode = tWrap.querySelector('.viz-node');
  var tRect = (tNode || tWrap).getBoundingClientRect();
  var tCx   = tRect.left + tRect.width / 2 - canvasRect.left;
  var tTopY = tRect.top - canvasRect.top - tp.getBoundingClientRect().height - 4;

  if (hIdx === tIdx) {
    hp.style.top       = hTopY + 'px';
    hp.style.bottom    = 'auto';
    hp.style.left      = (hCx - 22) + 'px';
    hp.style.transform = 'translateX(-50%)';

    tp.style.top       = tTopY + 'px';
    tp.style.bottom    = 'auto';
    tp.style.left      = (tCx + 22) + 'px';
    tp.style.transform = 'translateX(-50%)';
  } else {
    hp.style.top       = hTopY + 'px';
    hp.style.bottom    = 'auto';
    hp.style.left      = hCx + 'px';
    hp.style.transform = 'translateX(-50%)';

    tp.style.top       = tTopY + 'px';
    tp.style.bottom    = 'auto';
    tp.style.left      = tCx + 'px';
    tp.style.transform = 'translateX(-50%)';
  }

  updatePointerAddrs();
}

// Set address text on HEAD and TAIL chips
function updatePointerAddrs() {
  var hAddr = VIZ.el.headAddr;
  var tAddr = VIZ.el.tailAddr;
  if (hAddr) {
    var hNode = PTR.nodeList[PTR.headIndex];
    hAddr.textContent = hNode ? hNode.address : '—';
  }
  if (tAddr) {
    var tNode = PTR.nodeList[PTR.tailIndex];
    tAddr.textContent = tNode ? tNode.address : '—';
  }
}

// Convenience: move HEAD pointer tightly above the floating new-node element
function positionHeadOnNewNode() {
  var canvas  = document.getElementById('animCanvas');
  var hp      = VIZ.el.headPointer;
  var nodeEl  = VIZ.el.newNodeEl;
  if (!canvas || !hp || !nodeEl) return;

  var canvasRect = canvas.getBoundingClientRect();
  var nodeRect   = nodeEl.getBoundingClientRect();
  var cx         = nodeRect.left + nodeRect.width / 2 - canvasRect.left;
  var topY       = nodeRect.top  - canvasRect.top - hp.getBoundingClientRect().height - 4;

  hp.style.top       = topY + 'px';
  hp.style.bottom    = 'auto';
  hp.style.left      = cx + 'px';
  hp.style.transform = 'translateX(-50%)';

  if (VIZ.el.headAddr) VIZ.el.headAddr.textContent = PTR.newNodeAddr;
}

// Legacy shim used by resetHeadStyle and other helpers
function positionHead(headIdx, total) {
  PTR.headIndex = headIdx < PTR.nodeList.length ? headIdx : 0;
  positionPointers();
}

// ═══════════════════════════════════════════════════════════════
//  STEP APPLICATION
// ═══════════════════════════════════════════════════════════════
function applyStep(idx) {
  VIZ.currentStep = idx;
  var stepArr = (mode === 'delete-beginning') ? DELETE_STEPS : (mode === 'delete-end') ? DELETE_END_STEPS : STEPS;
  var step = stepArr[idx];
  if (!step) return;

  if (VIZ.el.headerStepNum) VIZ.el.headerStepNum.textContent = idx;

  animateCardUpdate(function () {
    if (VIZ.el.explainStepNum) VIZ.el.explainStepNum.textContent = step.explainStepNum;
    if (VIZ.el.explainTitle)   VIZ.el.explainTitle.textContent   = step.explainTitle;
    if (VIZ.el.explainText)    VIZ.el.explainText.innerHTML      = step.explainText;
    if (VIZ.el.whatBody)       VIZ.el.whatBody.innerHTML         = step.whatBody;
    if (VIZ.el.conceptText)    VIZ.el.conceptText.textContent    = step.conceptText;
  });

  if (VIZ.el.animStatus) {
    VIZ.el.animStatus.textContent = step.animStatus;
    VIZ.el.animStatus.className   = 'viz-anim-status' +
      (step.animStatusClass ? ' ' + step.animStatusClass : '');
  }

  highlightCode(step.codeLine);
  updateStepList(idx);
  updateDots(idx);

  if (VIZ.el.btnPrev) VIZ.el.btnPrev.disabled = (idx === 0);
  if (VIZ.el.btnNext) VIZ.el.btnNext.disabled = (idx === VIZ.totalSteps);

  if (mode === 'delete-beginning') {
    runDeleteAnimation(idx);
  } else if (mode === 'delete-end') {
    runDeleteAtEndStep(idx);
  } else {
    runAnimation(idx);
  }
}

function animateCardUpdate(fn) {
  var card = VIZ.el.explainCard;
  if (!card) { fn(); return; }
  card.classList.remove('updating');
  void card.offsetWidth;
  fn();
  card.classList.add('updating');
}

// ═══════════════════════════════════════════════════════════════
//  CODE HIGHLIGHTING
// ═══════════════════════════════════════════════════════════════
function highlightCode(activeLine) {
  var all = document.querySelectorAll('.viz-code-line.viz-highlightable');
  for (var i = 0; i < all.length; i++) {
    all[i].classList.remove('viz-line-active', 'viz-line-dim');
  }

  if (activeLine === null || activeLine === undefined || activeLine === 0) {
    return;
  }

  // Dim all highlightable lines first, then brighten active
  for (var k = 0; k < all.length; k++) {
    all[k].classList.add('viz-line-dim');
  }

  var targets = document.querySelectorAll('.viz-code-line[data-line="' + activeLine + '"]');
  for (var j = 0; j < targets.length; j++) {
    targets[j].classList.remove('viz-line-dim');
    targets[j].classList.add('viz-line-active');
    if (targets[j].classList.contains('viz-highlightable')) {
      targets[j].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
}

// ═══════════════════════════════════════════════════════════════
//  STEP TRACKER
// ═══════════════════════════════════════════════════════════════
function updateStepList(cur) {
  var items = document.querySelectorAll('.viz-step-item');
  for (var i = 0; i < items.length; i++) {
    var s = parseInt(items[i].dataset.step, 10);
    items[i].classList.remove('viz-step-done', 'viz-step-active', 'viz-step-upcoming');
    if (s < cur)       items[i].classList.add('viz-step-done');
    else if (s === cur) items[i].classList.add('viz-step-active');
    else               items[i].classList.add('viz-step-upcoming');
  }
}

// ═══════════════════════════════════════════════════════════════
//  PROGRESS DOTS
// ═══════════════════════════════════════════════════════════════
function updateDots(cur) {
  var dots = document.querySelectorAll('.viz-dot');
  for (var i = 0; i < dots.length; i++) {
    var s = parseInt(dots[i].dataset.step, 10);
    dots[i].classList.remove('viz-dot-active', 'viz-dot-done');
    if (s === cur)      dots[i].classList.add('viz-dot-active');
    else if (s < cur)   dots[i].classList.add('viz-dot-done');
  }
}

// ═══════════════════════════════════════════════════════════════
//  ANIMATIONS
// ═══════════════════════════════════════════════════════════════
function runAnimation(step) {
  switch (step) {
    case 0: anim_initial();     break;
    case 1: anim_malloc();      break;
    case 2: anim_assignValue(); break;
    case 3: anim_linkNext();    break;
    case 4: anim_updateHead();  break;
    case 5: anim_rearrange();   break;
  }
}

function anim_initial() {
  buildList(VIZ.initialList, false, 0);
  hideNewNode();
  hideCurve();
  resetHeadStyle();
}

function anim_malloc() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent  = '?';
  VIZ.el.newNodeEl.className      = 'viz-node viz-node-new';
  VIZ.el.newNodeLabel.textContent = 'newNode';
  var nextField = document.getElementById('newNodeNextField');
  if (nextField) nextField.textContent = 'NULL';
  wrap.style.bottom    = '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.remove('visible');
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { wrap.classList.add('visible'); });
  });
}

function anim_assignValue() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  wrap.style.bottom    = '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  setTimeout(function () {
    VIZ.el.newNodeData.textContent = String(VIZ.newValue);
    VIZ.el.newNodeEl.className = 'viz-node viz-node-new viz-node-linked';
    VIZ.el.newNodeEl.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease';
    VIZ.el.newNodeEl.style.transform  = 'scale(1.12)';
    setTimeout(function () { VIZ.el.newNodeEl.style.transform = 'scale(1)'; }, 210);
  }, 80);
}

// Global store for the drawn curve geometry so step 4 can reuse it
var CURVE_GEOM = null;

function anim_linkNext() {
  buildList(VIZ.initialList, false, 0);
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  wrap.style.bottom    = '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-node-new viz-node-linked';

  var firstNodeAddr = PTR.nodeList.length > 0 ? PTR.nodeList[0].address : 'NULL';
  var nextField = document.getElementById('newNodeNextField');
  if (nextField) nextField.textContent = firstNodeAddr;

  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (!svg || !path) return;

  var oldDot = svg.querySelector('.viz-travel-dot');
  if (oldDot) oldDot.parentNode.removeChild(oldDot);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;
      var canvasRect = canvas.getBoundingClientRect();

      // Source: RIGHT side of newNode
      var newNodeEl = VIZ.el.newNodeEl;
      var newRect = newNodeEl ? newNodeEl.getBoundingClientRect() : null;
      var startX, startY;
      if (newRect) {
        startX = newRect.right - canvasRect.left;
        startY = newRect.top + newRect.height / 2 - canvasRect.top;
      } else {
        startX = canvasRect.width / 2 + 60;
        startY = canvasRect.height - 100;
      }

      // Target: LEFT side of node 1 — arrow enters horizontally from left (→)
      var listRow = VIZ.el.listRow;
      var firstWrap = listRow ? listRow.querySelector('.viz-node-wrap') : null;
      var firstNodeEl = firstWrap ? firstWrap.querySelector('.viz-node') : null;
      var endX, endY;
      if (firstNodeEl) {
        var fr = firstNodeEl.getBoundingClientRect();
        endX = fr.left - canvasRect.left;
        endY = fr.top + fr.height / 2 - canvasRect.top;
      } else {
        endX = canvasRect.width * 0.15;
        endY = canvasRect.height * 0.38;
      }

      // Single smooth cubic bezier - no joints, no sharp corners.
      // cp1 pulls right+slightly up from newNode exit.
      // cp2 pulls from left+below into node 1 left side horizontally.
      var cp1x = startX + 80;
      var cp1y = startY - 60;
      var cp2x = endX - 60;
      var cp2y = endY + 160;

      var d = 'M ' + startX + ' ' + startY
        + ' C ' + cp1x + ' ' + cp1y + ', ' + cp2x + ' ' + cp2y + ', ' + endX + ' ' + endY;

      path.setAttribute('d', d);
      CURVE_GEOM = { startX: startX, startY: startY, endX: endX, endY: endY };

      svg.classList.add('visible');

      var len;
      try { len = path.getTotalLength(); } catch (e) { len = 500; }
      if (!len || len < 1) len = 500;

      path.style.transition       = 'none';
      path.style.strokeDasharray  = len + 'px';
      path.style.strokeDashoffset = len + 'px';

      // Traveling dot
      var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '5');
      dot.setAttribute('fill', '#3b6cff');
      dot.classList.add('viz-travel-dot');
      dot.style.filter = 'drop-shadow(0 0 4px rgba(59,108,255,0.7))';
      svg.appendChild(dot);

      var duration  = 850;
      var startTime = null;

      function animateDot(ts) {
        if (!startTime) startTime = ts;
        var elapsed  = ts - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        try {
          var pt = path.getPointAtLength(eased * len);
          dot.setAttribute('cx', pt.x);
          dot.setAttribute('cy', pt.y);
        } catch (err) {}
        if (progress < 1) {
          requestAnimationFrame(animateDot);
        } else {
          setTimeout(function () {
            if (dot.parentNode) dot.parentNode.removeChild(dot);
          }, 150);
        }
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          path.style.transition       = 'stroke-dashoffset ' + (duration / 1000) + 's cubic-bezier(0.4,0,0.2,1)';
          path.style.strokeDashoffset = '0px';
          requestAnimationFrame(animateDot);
        });
      });
    });
  });
}

function anim_updateHead() {
  // Keep the curve from step 3 — do NOT call hideCurve()
  buildList(VIZ.initialList, false, 99);  // 99 = out-of-range so TAIL renders but HEAD won't auto-place

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  wrap.style.bottom    = '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');
  VIZ.el.newNodeData.textContent  = String(VIZ.newValue);
  VIZ.el.newNodeEl.className      = 'viz-node viz-node-new viz-node-head';
  VIZ.el.newNodeLabel.textContent = 'newNode = HEAD';

  // Keep curve SVG visible (don't hide it)
  var svg = VIZ.el.curveSvg;
  if (svg) svg.classList.add('visible');

  // Place HEAD pointer just to the LEFT of node 1, pointing at it
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      var hp     = VIZ.el.headPointer;
      if (!canvas || !hp) return;

      var canvasRect = canvas.getBoundingClientRect();
      var listRow    = VIZ.el.listRow;
      var firstWrap  = listRow ? listRow.querySelector('.viz-node-wrap') : null;
      var firstNode  = firstWrap ? firstWrap.querySelector('.viz-node') : null;

      if (firstNode) {
        var fr   = firstNode.getBoundingClientRect();
        // Place HEAD to the LEFT of node 1 — arrow points rightward (→) into it
        var leftX = fr.left - canvasRect.left - 10;
        var topY  = fr.top  - canvasRect.top - hp.getBoundingClientRect().height - 4;
        hp.style.top       = topY + 'px';
        hp.style.bottom    = 'auto';
        hp.style.left      = leftX + 'px';
        hp.style.transform = 'translateX(-50%)';
      }
      if (VIZ.el.headAddr) VIZ.el.headAddr.textContent = NEW_NODE_ADDR;
    });
  });
}

function anim_rearrange() {
  // Retract the curve by animating dashoffset back to full length
  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (svg && path) {
    var len;
    try { len = path.getTotalLength(); } catch (e) { len = 500; }
    if (!len || len < 1) len = 500;
    path.style.transition       = 'stroke-dashoffset 0.4s cubic-bezier(0.4,0,0.2,1)';
    path.style.strokeDashoffset = len + 'px';
    setTimeout(function () {
      svg.classList.remove('visible');
    }, 420);
  }

  // After retract completes, hide new node and build final list
  setTimeout(function () {
    hideNewNode();
    resetHeadStyle();
    CURVE_GEOM = null;
    var fullList = [VIZ.newValue].concat(VIZ.initialList);
    setTimeout(function () { buildList(fullList, true, 0); }, 80);
  }, 440);
}

// ═══════════════════════════════════════════════════════════════
//  DELETE AT BEGINNING ANIMATIONS
// ═══════════════════════════════════════════════════════════════
function runDeleteAnimation(step) {
  switch (step) {
    case 0: danim_initial();       break;
    case 1: danim_saveTemp();      break;
    case 2: danim_moveHead();      break;
    case 3: danim_freeTemp();      break;
    case 4: danim_finalArrange();  break;
  }
}

function danim_initial() {
  VIZ.deleteList = VIZ.initialList.slice();
  hideTempPointer();
  hideCurve();
  hideNewNode();
  buildList(VIZ.deleteList, false, 0);
}

function danim_saveTemp() {
  VIZ.deleteList = VIZ.initialList.slice();
  hideCurve();
  hideNewNode();
  buildList(VIZ.deleteList, false, 0);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      // Highlight first node with glow
      var row = VIZ.el.listRow;
      if (!row) return;
      var firstWrap = row.querySelector('.viz-node-wrap');
      var firstNode = firstWrap ? firstWrap.querySelector('.viz-node') : null;
      if (firstNode) {
        firstNode.classList.add('viz-node-temp-highlight');
      }

      // Position temp pointer above first node
      showTempPointerOnNode(0);
    });
  });
}

function danim_moveHead() {
  VIZ.deleteList = VIZ.initialList.slice();
  buildList(VIZ.deleteList, false, 0);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      // Keep temp label on node 0
      var row = VIZ.el.listRow;
      if (!row) return;
      var wraps = row.querySelectorAll('.viz-node-wrap');
      var firstNode = wraps[0] ? wraps[0].querySelector('.viz-node') : null;
      if (firstNode) firstNode.classList.add('viz-node-temp-highlight');
      showTempPointerOnNode(0);

      // Move HEAD pointer to node 1 (index 1)
      if (PTR.nodeList.length > 1) {
        PTR.headIndex = 1;
      }
      // Animate head move
      setTimeout(function () {
        positionPointers();
        if (VIZ.el.headAddr && PTR.nodeList[1]) {
          VIZ.el.headAddr.textContent = PTR.nodeList[1].address;
        }
      }, 60);
    });
  });
}

function danim_freeTemp() {
  VIZ.deleteList = VIZ.initialList.slice();
  buildList(VIZ.deleteList, false, 0);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var row = VIZ.el.listRow;
      if (!row) return;
      var wraps = row.querySelectorAll('.viz-node-wrap');

      // Move HEAD to node index 1 immediately (no animation, static state for this step)
      PTR.headIndex = 1;
      positionPointers();

      // Keep temp on node 0 briefly then fade it out along with node 0
      var firstNode = wraps[0] ? wraps[0].querySelector('.viz-node') : null;
      if (firstNode) firstNode.classList.add('viz-node-temp-highlight');
      showTempPointerOnNode(0);

      setTimeout(function () {
        // Fade out temp pointer
        hideTempPointer();

        // Fade + shrink node 0 wrap
        var firstWrap = wraps[0];
        if (firstWrap) {
          firstWrap.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1), max-width 0.45s ease';
          firstWrap.style.opacity    = '0';
          firstWrap.style.transform  = 'scale(0.6)';
          firstWrap.style.maxWidth   = firstWrap.offsetWidth + 'px';
          // Also fade the arrow after this wrap
          var nextSib = firstWrap.nextSibling;
          if (nextSib && nextSib.classList && nextSib.classList.contains('viz-arrow')) {
            nextSib.style.transition = 'opacity 0.35s ease';
            nextSib.style.opacity    = '0';
          }
          setTimeout(function () {
            firstWrap.style.maxWidth  = '0px';
            firstWrap.style.overflow  = 'hidden';
          }, 100);
        }
      }, 350);
    });
  });
}

function danim_finalArrange() {
  hideTempPointer();
  hideCurve();
  hideNewNode();
  // Build the list with node 1 removed
  var newList = VIZ.initialList.slice(1);
  VIZ.deleteList = newList;
  PTR.headIndex  = 0;
  PTR.tailIndex  = newList.length - 1;
  if (newList.length === 0) {
    // Empty list edge case
    var row = VIZ.el.listRow;
    if (row) {
      row.innerHTML = '<div class="viz-null viz-null-empty">NULL (empty list)</div>';
    }
    var hp = VIZ.el.headPointer;
    var tp = VIZ.el.tailPointer;
    if (hp) { hp.style.opacity = '0'; }
    if (tp) { tp.style.opacity = '0'; }
    var ha = VIZ.el.headAddr;
    var ta = VIZ.el.tailAddr;
    if (ha) ha.textContent = 'NULL';
    if (ta) ta.textContent = 'NULL';
  } else {
    var hp = VIZ.el.headPointer;
    var tp = VIZ.el.tailPointer;
    if (hp) hp.style.opacity = '1';
    if (tp) tp.style.opacity = '1';
    setTimeout(function () { buildList(newList, true, 0); }, 60);
  }
}

// ── Temp pointer helpers ─────────────────────────────────────────
function showTempPointerOnNode(nodeIndex) {
  var tp = VIZ.el.tempPointer;
  if (!tp) return;
  tp.style.display = 'flex';
  tp.style.opacity = '0';
  tp.style.transition = 'left 0.32s cubic-bezier(0.4,0,0.2,1), top 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease';

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas  = document.getElementById('animCanvas');
      var row     = VIZ.el.listRow;
      if (!canvas || !row) return;
      var wraps   = row.querySelectorAll('.viz-node-wrap');
      var wrap    = wraps[nodeIndex];
      if (!wrap) return;
      var node    = wrap.querySelector('.viz-node');
      if (!node) return;
      var cr = canvas.getBoundingClientRect();
      var nr = node.getBoundingClientRect();
      var cx = nr.left + nr.width / 2 - cr.left;
      // Position temp BELOW head: offset down by pointer height + node height + gap
      var tpH = tp.getBoundingClientRect().height || 48;
      var topY = nr.top - cr.top - tpH - 4;
      // Offset slightly right to not collide with HEAD
      var offsetX = 22;
      tp.style.left      = (cx + offsetX) + 'px';
      tp.style.top       = topY + 'px';
      tp.style.bottom    = 'auto';
      tp.style.transform = 'translateX(-50%)';
      tp.style.opacity   = '1';
      if (VIZ.el.tempAddr && PTR.nodeList[nodeIndex]) {
        VIZ.el.tempAddr.textContent = PTR.nodeList[nodeIndex].address;
      }
    });
  });
}

function hideTempPointer() {
  var tp = VIZ.el.tempPointer;
  if (!tp) return;
  tp.style.transition = 'opacity 0.25s ease';
  tp.style.opacity    = '0';
  setTimeout(function () { tp.style.display = 'none'; }, 260);
}

// Show temp ABOVE node (used in both delete-beginning and delete-end)
function showTempBelowNode(nodeIndex) {
  var tp = VIZ.el.tempPointer;
  if (!tp) return;
  tp.style.display = 'flex';
  tp.style.transition = 'left 0.32s cubic-bezier(0.4,0,0.2,1), top 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease';

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      var row    = VIZ.el.listRow;
      if (!canvas || !row) return;
      var wraps  = row.querySelectorAll('.viz-node-wrap');
      var wrap   = wraps[nodeIndex];
      if (!wrap) return;
      var node   = wrap.querySelector('.viz-node');
      if (!node) return;
      var cr = canvas.getBoundingClientRect();
      var nr = node.getBoundingClientRect();
      var cx = nr.left + nr.width / 2 - cr.left;
      var tpH = tp.getBoundingClientRect().height || 48;
      var topY = nr.top - cr.top - tpH - 4;
      tp.style.left      = cx + 'px';
      tp.style.top       = topY + 'px';
      tp.style.bottom    = 'auto';
      tp.style.transform = 'translateX(-50%)';
      tp.style.opacity   = '1';
      if (VIZ.el.tempAddr && PTR.nodeList[nodeIndex]) {
        VIZ.el.tempAddr.textContent = PTR.nodeList[nodeIndex].address;
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════
function hideNewNode() {
  if (VIZ.el.newNodeWrap) VIZ.el.newNodeWrap.classList.remove('visible');
}

function hideCurve() {
  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (!svg || !path) return;
  svg.classList.remove('visible');
  path.style.transition       = 'none';
  path.style.strokeDasharray  = '1000px';
  path.style.strokeDashoffset = '1000px';
}

function resetHeadStyle() {
  var hp = VIZ.el.headPointer;
  if (hp) {
    hp.style.transition = 'left 0.38s cubic-bezier(0.4,0,0.2,1), top 0.38s cubic-bezier(0.4,0,0.2,1)';
    hp.style.bottom     = 'auto';
    var arr = hp.querySelector('.viz-ptr-arrow');
    if (arr) arr.textContent = '\u2193';
  }
  var tp = VIZ.el.tailPointer;
  if (tp) {
    tp.style.transition = 'left 0.38s cubic-bezier(0.4,0,0.2,1), top 0.38s cubic-bezier(0.4,0,0.2,1)';
    tp.style.bottom     = 'auto';
  }
  PTR.headIndex = 0;
  PTR.tailIndex = VIZ.initialList.length - 1;
  requestAnimationFrame(function () {
    positionPointers();
  });
}

// ═══════════════════════════════════════════════════════════════
//  CONTROLS  (onclick targets in HTML)
// ═══════════════════════════════════════════════════════════════
function readInputValue() {
  if (mode !== 'insert-beginning') return;
  var input = VIZ.el.vizValueInput;
  var raw = input ? input.value.trim() : '';
  var val = (raw === '' || isNaN(Number(raw))) ? 0 : Number(raw);
  VIZ.newValue = val;
  // Refresh dynamic text in STEPS that reference the value
  STEPS[0].explainText = 'We start with a linked list containing nodes <strong>1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL</strong>.<br><br>Our goal: insert a new node with value <strong>' + val + '</strong> at the very beginning.';
  STEPS[0].whatBody    = 'The HEAD pointer currently points to node 1. We call <code>insertAtBeginning(&amp;head, ' + val + ')</code>.';
  STEPS[2].explainText = '<code>newNode-&gt;data = val;</code> writes our value (<strong>' + val + '</strong>) into the data field of the new node.';
  STEPS[2].whatBody    = 'The new node\'s data field now shows "' + val + '". The next pointer is still uninitialised.';
  STEPS[5].explainText = 'The function returns. The linked list is now:<br><strong>' + val + ' \u2192 1 \u2192 2 \u2192 3 \u2192 4 \u2192 NULL</strong><br><br>Node ' + val + ' is the new head of the list.';
}

function vizNext() {
  if (VIZ.currentStep >= VIZ.totalSteps) return;
  if (VIZ.currentStep === 0) readInputValue();
  applyStep(VIZ.currentStep + 1);
}

function vizPrev() {
  if (VIZ.currentStep <= 0) return;
  if (mode === 'delete-end') {
    // Restore DEND_SEQ_STATE for the previous step
    var prevIdx = VIZ.currentStep - 2; // seqIdx = step - 1
    dend_restoreStateForSeq(prevIdx);
  }
  applyStep(VIZ.currentStep - 1);
}

// Restore DEND_SEQ_STATE.tempIdx and ptrIdx for a given sequence index
function dend_restoreStateForSeq(seqIdx) {
  // State mapping: seqIdx → [tempIdx, ptrIdx] AFTER this step executes
  var states = [
    [0, -1],  // 0: init
    [0, -1],  // 1: while_check_0  (no movement)
    [0,  0],  // 2: ptr_move_0     (ptr moved to 0)
    [1,  0],  // 3: temp_move_0    (temp moved to 1)
    [1,  0],  // 4: while_check_1
    [1,  1],  // 5: ptr_move_1
    [2,  1],  // 6: temp_move_1
    [2,  1],  // 7: while_check_2
    [2,  2],  // 8: ptr_move_2
    [3,  2],  // 9: temp_move_2
    [3,  2],  // 10: loop_end
    [3,  2],  // 11: free_node
    [3,  2],  // 12: relink
    [3,  2]   // 13: tail_update
  ];
  if (seqIdx < 0) {
    DEND_SEQ_STATE.tempIdx = 0;
    DEND_SEQ_STATE.ptrIdx  = -1;
  } else {
    var s = states[seqIdx] || [0, -1];
    DEND_SEQ_STATE.tempIdx = s[0];
    DEND_SEQ_STATE.ptrIdx  = s[1];
  }
  DEND_SEQ_STATE.seqIdx = seqIdx;
}

function vizReset() {
  stopPlay();
  hideTempPointer();
  hidePtrPointer();
  hideCurve();
  hideNewNode();
  var hp = VIZ.el.headPointer;
  var tp2 = VIZ.el.tailPointer;
  if (hp) hp.style.opacity = '1';
  if (tp2) tp2.style.opacity = '1';
  if (mode === 'delete-beginning' || mode === 'delete-end') {
    VIZ.deleteList = VIZ.initialList.slice();
    buildList(VIZ.deleteList, false, 0);
  }
  if (mode === 'delete-end') {
    DEND_SEQ_STATE.seqIdx = 0;
    DEND_SEQ_STATE.tempIdx = 0;
    DEND_SEQ_STATE.ptrIdx = -1;
    if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  }
  applyStep(0);
}

function vizTogglePlay() {
  if (VIZ.isPlaying) stopPlay(); else startPlay();
}

function startPlay() {
  if (VIZ.currentStep >= VIZ.totalSteps) applyStep(0);
  readInputValue();
  VIZ.isPlaying = true;
  if (VIZ.el.btnPlay)    VIZ.el.btnPlay.classList.add('playing');
  if (VIZ.el.playIcon)   VIZ.el.playIcon.style.display  = 'none';
  if (VIZ.el.pauseIcon)  VIZ.el.pauseIcon.style.display = '';
  if (VIZ.el.playLabel)  VIZ.el.playLabel.textContent   = 'Pause';

  function tick() {
    if (!VIZ.isPlaying) return;
    if (VIZ.currentStep >= VIZ.totalSteps) { stopPlay(); return; }
    vizNext();
    VIZ.playTimer = setTimeout(tick, VIZ.playDelay);
  }
  VIZ.playTimer = setTimeout(tick, VIZ.playDelay);
}

function stopPlay() {
  VIZ.isPlaying = false;
  clearTimeout(VIZ.playTimer);
  if (VIZ.el.btnPlay)    VIZ.el.btnPlay.classList.remove('playing');
  if (VIZ.el.playIcon)   VIZ.el.playIcon.style.display  = '';
  if (VIZ.el.pauseIcon)  VIZ.el.pauseIcon.style.display = 'none';
  if (VIZ.el.playLabel)  VIZ.el.playLabel.textContent   = 'Play';
}

// ═══════════════════════════════════════════════════════════════
//  DELETE AT END ANIMATIONS — micro-step engine
// ═══════════════════════════════════════════════════════════════
function runDeleteAtEndStep(step) {
  // step 0 = initial state; steps 1-14 map to DEND_SEQ indices 0-13
  if (step === 0) {
    dend_initial();
    return;
  }
  var seqIdx = step - 1;  // 0-based into DEND_SEQ
  var seqKey = DEND_SEQ[seqIdx];
  if (!seqKey) return;

  DEND_SEQ_STATE.seqIdx = seqIdx;
  dend_runSeqStep(seqKey);
}

function dend_runSeqStep(key) {
  switch (key) {
    case 'init':         dend_initPtrs();         break;
    case 'while_check_0':
    case 'while_check_1':
    case 'while_check_2': dend_whileCheck();      break;
    case 'ptr_move_0':   dend_ptrMove(0);         break;
    case 'ptr_move_1':   dend_ptrMove(1);         break;
    case 'ptr_move_2':   dend_ptrMove(2);         break;
    case 'temp_move_0':  dend_tempMove(1);        break;
    case 'temp_move_1':  dend_tempMove(2);        break;
    case 'temp_move_2':  dend_tempMove(3);        break;
    case 'loop_end':     dend_loopEnd();          break;
    case 'free_node':    dend_freeNode();         break;
    case 'relink':       dend_updateLink();       break;
    case 'tail_update':  dend_updateTail();       break;
  }
}

function hidePtrPointer() {
  var pp = VIZ.el.ptrPointer;
  if (!pp) return;
  pp.style.transition = 'opacity 0.25s ease';
  pp.style.opacity    = '0';
  setTimeout(function () { pp.style.display = 'none'; }, 260);
}

// Position ptr BELOW node with upward arrow
function showPtrBelowNode(nodeIndex) {
  var pp = VIZ.el.ptrPointer;
  if (!pp) return;

  // Ensure upward arrow on the ptr element
  var arrowEl = pp.querySelector('.viz-ptr-arrow-ptr');
  if (arrowEl) arrowEl.textContent = '\u2191';

  pp.style.display = 'flex';
  pp.style.transition = 'left 0.32s cubic-bezier(0.4,0,0.2,1), top 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease';

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      var row    = VIZ.el.listRow;
      if (!canvas || !row) return;
      var wraps  = row.querySelectorAll('.viz-node-wrap');
      var wrap   = wraps[nodeIndex];
      if (!wrap) return;
      var node   = wrap.querySelector('.viz-node');
      if (!node) return;
      var cr = canvas.getBoundingClientRect();
      var nr = node.getBoundingClientRect();
      var cx = nr.left + nr.width / 2 - cr.left;
      // Ptr sits BELOW node: node bottom + gap
      var addrEl = wrap.querySelector('.viz-node-addr');
      var addrBottom = addrEl ? addrEl.getBoundingClientRect().bottom - cr.top : nr.bottom - cr.top;
      var topY = addrBottom + 10;
      pp.style.left      = cx + 'px';
      pp.style.top       = topY + 'px';
      pp.style.bottom    = 'auto';
      pp.style.transform = 'translateX(-50%)';
      pp.style.opacity   = '1';
      if (VIZ.el.ptrAddr && PTR.nodeList[nodeIndex]) {
        VIZ.el.ptrAddr.textContent = PTR.nodeList[nodeIndex].address;
      }
    });
  });
}

// ptr = NULL faded (below node 0 area)
function showPtrNull() {
  var pp = VIZ.el.ptrPointer;
  if (!pp) return;
  var lbl = pp.querySelector('.viz-ptr-label-ptr');
  if (lbl) lbl.textContent = 'ptr';
  var arrowEl = pp.querySelector('.viz-ptr-arrow-ptr');
  if (arrowEl) arrowEl.textContent = '\u2191';
  var addr = VIZ.el.ptrAddr;
  if (addr) addr.textContent = 'NULL';

  pp.style.display   = 'flex';
  pp.style.transition = 'opacity 0.25s ease';
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      var row    = VIZ.el.listRow;
      if (!canvas || !row) return;
      var wrap   = row.querySelector('.viz-node-wrap');
      if (!wrap) return;
      var node   = wrap.querySelector('.viz-node');
      if (!node) return;
      var cr = canvas.getBoundingClientRect();
      var nr = node.getBoundingClientRect();
      var addrEl = wrap.querySelector('.viz-node-addr');
      var addrBottom = addrEl ? addrEl.getBoundingClientRect().bottom - cr.top : nr.bottom - cr.top;
      var cx = nr.left + nr.width / 2 - cr.left;
      pp.style.left      = (cx - 40) + 'px';
      pp.style.top       = (addrBottom + 10) + 'px';
      pp.style.bottom    = 'auto';
      pp.style.transform = 'translateX(-50%)';
      pp.style.opacity   = '0.35';
    });
  });
}

// Keep showPtrPointerOnNode as alias for backward compat with delete-beginning
function showPtrPointerOnNode(nodeIndex, label) {
  showPtrBelowNode(nodeIndex);
  if (label) {
    var pp = VIZ.el.ptrPointer;
    if (pp) {
      var lbl = pp.querySelector('.viz-ptr-label-ptr');
      if (lbl) lbl.textContent = label;
    }
  }
}

// Highlight nodes by index
function dend_highlightNodes(tempIdx, ptrIdx) {
  var row = VIZ.el.listRow;
  if (!row) return;
  var wraps = row.querySelectorAll('.viz-node-wrap');
  for (var i = 0; i < wraps.length; i++) {
    var n = wraps[i].querySelector('.viz-node');
    if (n) n.classList.remove('viz-node-temp-highlight', 'viz-node-ptr-highlight');
  }
  if (ptrIdx >= 0 && wraps[ptrIdx]) {
    var pn = wraps[ptrIdx].querySelector('.viz-node');
    if (pn) pn.classList.add('viz-node-ptr-highlight');
  }
  if (tempIdx >= 0 && wraps[tempIdx]) {
    var tn = wraps[tempIdx].querySelector('.viz-node');
    if (tn) tn.classList.add('viz-node-temp-highlight');
  }
}

function dend_initial() {
  VIZ.deleteList = VIZ.initialList.slice();
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  hideTempPointer();
  hidePtrPointer();
  hideCurve();
  hideNewNode();
  DEND_SEQ_STATE.tempIdx = 0;
  DEND_SEQ_STATE.ptrIdx  = -1;
  PTR.headIndex = 0;
  PTR.tailIndex = VIZ.initialList.length - 1;
  buildList(VIZ.deleteList, false, 0);
}

function dend_initPtrs() {
  VIZ.deleteList = VIZ.initialList.slice();
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  hideCurve();
  hideNewNode();
  DEND_SEQ_STATE.tempIdx = 0;
  DEND_SEQ_STATE.ptrIdx  = -1;
  buildList(VIZ.deleteList, false, 0);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      dend_highlightNodes(0, -1);
      showTempBelowNode(0);   // temp ABOVE node 0 (showTempBelowNode is actually above)
      showPtrNull();
    });
  });
}

function dend_whileCheck() {
  VIZ.deleteList = VIZ.initialList.slice();
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  buildList(VIZ.deleteList, false, 0);

  var ti = DEND_SEQ_STATE.tempIdx;
  var pi = DEND_SEQ_STATE.ptrIdx;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      dend_highlightNodes(ti, pi);
      showTempBelowNode(ti);
      if (pi >= 0) {
        showPtrBelowNode(pi);
      } else {
        showPtrNull();
      }
    });
  });
}

function dend_ptrMove(newPtrIdx) {
  VIZ.deleteList = VIZ.initialList.slice();
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  buildList(VIZ.deleteList, false, 0);

  DEND_SEQ_STATE.ptrIdx = newPtrIdx;
  var ti = DEND_SEQ_STATE.tempIdx;
  var pi = DEND_SEQ_STATE.ptrIdx;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      dend_highlightNodes(ti, pi);
      showTempBelowNode(ti);
      showPtrBelowNode(pi);
    });
  });
}

function dend_tempMove(newTempIdx) {
  VIZ.deleteList = VIZ.initialList.slice();
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  buildList(VIZ.deleteList, false, 0);

  DEND_SEQ_STATE.tempIdx = newTempIdx;
  var ti = DEND_SEQ_STATE.tempIdx;
  var pi = DEND_SEQ_STATE.ptrIdx;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      dend_highlightNodes(ti, pi);
      showTempBelowNode(ti);
      if (pi >= 0) {
        showPtrBelowNode(pi);
      } else {
        showPtrNull();
      }
    });
  });
}

function dend_loopEnd() {
  VIZ.deleteList = VIZ.initialList.slice();
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  buildList(VIZ.deleteList, false, 0);

  var lastIdx = VIZ.deleteList.length - 1;
  var prevIdx = lastIdx - 1;
  DEND_SEQ_STATE.tempIdx = lastIdx;
  DEND_SEQ_STATE.ptrIdx  = prevIdx;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      dend_highlightNodes(lastIdx, prevIdx);
      showTempBelowNode(lastIdx);
      showPtrBelowNode(prevIdx);
    });
  });
}

function dend_freeNode() {
  VIZ.deleteList = VIZ.initialList.slice();
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  buildList(VIZ.deleteList, false, 0);

  var lastIdx = VIZ.deleteList.length - 1;
  var prevIdx = lastIdx - 1;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var row = VIZ.el.listRow;
      if (!row) return;
      var wraps = row.querySelectorAll('.viz-node-wrap');

      showTempBelowNode(lastIdx);
      showPtrBelowNode(prevIdx);
      dend_highlightNodes(lastIdx, prevIdx);

      var lastWrap = wraps[lastIdx];
      var lastNode = lastWrap ? lastWrap.querySelector('.viz-node') : null;
      if (lastNode) lastNode.classList.add('viz-node-temp-highlight');

      setTimeout(function () {
        hideTempPointer();

        if (lastWrap) {
          lastWrap.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1), max-width 0.45s ease';
          lastWrap.style.opacity    = '0';
          lastWrap.style.transform  = 'scale(0.6)';
          lastWrap.style.maxWidth   = lastWrap.offsetWidth + 'px';

          var prevSib = lastWrap.previousSibling;
          if (prevSib && prevSib.classList && prevSib.classList.contains('viz-arrow')) {
            prevSib.style.transition = 'opacity 0.35s ease';
            prevSib.style.opacity    = '0';
          }
          setTimeout(function () {
            lastWrap.style.maxWidth = '0px';
            lastWrap.style.overflow = 'hidden';
          }, 100);
        }
      }, 350);
    });
  });
}

function dend_updateLink() {
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  var truncList = VIZ.deleteList.slice(0, VIZ.deleteList.length - 1);
  buildList(truncList, false, 0);

  var lastIdx = truncList.length - 1;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var row = VIZ.el.listRow;
      if (!row) return;
      var wraps = row.querySelectorAll('.viz-node-wrap');

      showPtrBelowNode(lastIdx);
      hideTempPointer();

      if (wraps[lastIdx]) {
        var pn = wraps[lastIdx].querySelector('.viz-node');
        if (pn) pn.classList.add('viz-node-ptr-highlight');
        var nextField = pn ? pn.querySelector('.viz-node-next') : null;
        if (nextField) {
          nextField.style.transition = 'background 0.3s ease, color 0.3s ease';
          nextField.style.background = 'rgba(255,130,0,0.18)';
          nextField.style.color      = '#f97316';
          nextField.textContent      = 'NULL';
          setTimeout(function () {
            nextField.style.background = '';
            nextField.style.color      = '';
          }, 900);
        }
      }
    });
  });
}

function dend_updateTail() {
  if (DEND_TRAV.timer) { clearTimeout(DEND_TRAV.timer); DEND_TRAV.timer = null; }
  var truncList = VIZ.deleteList.slice(0, VIZ.deleteList.length - 1);
  buildList(truncList, true, 0);

  PTR.tailIndex = truncList.length - 1;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      positionPointers();
      hidePtrPointer();
      hideTempPointer();
    });
  });
}

// Keep legacy DEND_TRAV for timer management
var DEND_TRAV = { tempIdx: 0, ptrIdx: -1, timer: null };

// ═══════════════════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', function (e) {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  switch (e.key) {
    case 'ArrowRight': case 'ArrowDown':  e.preventDefault(); vizNext();         break;
    case 'ArrowLeft':  case 'ArrowUp':    e.preventDefault(); vizPrev();         break;
    case ' ':                             e.preventDefault(); vizTogglePlay();   break;
    case 'r': case 'R':                                       vizReset();        break;
  }
});