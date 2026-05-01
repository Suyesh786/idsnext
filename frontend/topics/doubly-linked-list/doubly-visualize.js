/* ─── doubly-visualize.js ───────────────────────────────────────
   Step-by-step "Insert at Beginning" visualizer for Doubly Linked List.
   Mirrors visualize.js structure exactly. Only insert-beginning active.
──────────────────────────────────────────────────────────────── */

var mode = 'insert-beginning';

var MODE_LABELS = {
  'insert-beginning': 'Insert at Beginning',
  'insert-end':       'Insert at End',
  'insert-middle':    'Insert at Middle',
  'delete-beginning': 'Delete at Beginning',
  'delete-end':       'Delete at End',
  'delete-middle':    'Delete at Middle'
};

// ═══════════════════════════════════════════════════════════════
//  CODE TEMPLATES
// ═══════════════════════════════════════════════════════════════
var CODE_TEMPLATES = {
  'insert-end': [
    { line: 0, cls: 'viz-code-comment', html: '<span class="c-comment">// DLL Node structure</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-kw">struct</span> node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* prev;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">insertatend</span>(<span class="c-type">int</span> data) {' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* newnode = (<span class="c-kw">struct</span> node*)' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">malloc</span>(<span class="c-kw">sizeof</span>(<span class="c-kw">struct</span> node));' },
    { line: 2, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;data = data;' },
    { line: 3, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;next = <span class="c-kw">NULL</span>;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 4, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;head = tail = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;prev = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '&nbsp;&nbsp;} <span class="c-kw">else</span> {' },
    { line: 5, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;tail-&gt;next = newnode;' },
    { line: 6, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;prev = tail;' },
    { line: 7, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;tail = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, html: '}' }
  ],
  'insert-beginning': [
    { line: 0, cls: 'viz-code-comment', html: '<span class="c-comment">// DLL Node structure</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-kw">struct</span> node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* prev;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">insertatbeginning</span>(<span class="c-type">int</span> data) {' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* newnode = (<span class="c-kw">struct</span> node*)' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">malloc</span>(<span class="c-kw">sizeof</span>(<span class="c-kw">struct</span> node));' },
    { line: 2, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;data = data;' },
    { line: 3, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;prev = <span class="c-kw">NULL</span>;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 4, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;head = tail = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;next = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '&nbsp;&nbsp;} <span class="c-kw">else</span> {' },
    { line: 5, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;next = head;' },
    { line: 6, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;head-&gt;prev = newnode;' },
    { line: 7, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;head = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, html: '}' }
  ],
  'delete-beginning': [
    { line: 0, cls: 'viz-code-comment', html: '<span class="c-comment">// Delete at beginning of DLL</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-kw">struct</span> node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* prev;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">deleteAtBeginning</span>() {' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">printf</span>(<span class="c-str">"List is empty.\\n"</span>);' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-kw">return</span>;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 2, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">if</span> (head-&gt;next == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">free</span>(head);' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;head = tail = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-kw">return</span>;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 3, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* temp = head;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 4, cls: 'viz-highlightable', html: '&nbsp;&nbsp;head = head-&gt;next;' },
    { line: 5, cls: 'viz-highlightable', html: '&nbsp;&nbsp;head-&gt;prev = <span class="c-kw">NULL</span>;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 6, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-fn">free</span>(temp);' },
    { line: 0, html: '}' }
  ],
  'insert-middle': [
    { line: 0, cls: 'viz-code-comment', html: '<span class="c-comment">// Insert at middle of a DLL</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
    { line: 0, html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-kw">struct</span> node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* prev;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">insertAtMiddle</span>(<span class="c-type">int</span> data, <span class="c-type">int</span> pos) {' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* newnode = (<span class="c-kw">struct</span> node*)' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">malloc</span>(<span class="c-kw">sizeof</span>(<span class="c-kw">struct</span> node));' },
    { line: 2, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;data = data;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 3, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* temp = head;' },
    { line: 4, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">for</span> (<span class="c-type">int</span> i = 1; i &lt; pos - 1; i++) {' },
    { line: 5, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;temp = temp-&gt;next;' },
    { line: 6, cls: 'viz-highlightable', html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 7, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;next = temp-&gt;next;' },
    { line: 8, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;prev = temp;' },
    { line: 9, cls: 'viz-highlightable', html: '&nbsp;&nbsp;temp-&gt;next-&gt;prev = newnode;' },
    { line: 10, cls: 'viz-highlightable', html: '&nbsp;&nbsp;temp-&gt;next = newnode;' },
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

  // Update pill states
  var pills = document.querySelectorAll('.viz-op-pill');
  for (var i = 0; i < pills.length; i++) {
    pills[i].classList.remove('viz-op-pill-active');
  }
  var active = document.querySelector('.viz-op-pill[data-mode="' + newMode + '"]');
  if (active) active.classList.add('viz-op-pill-active');

  // Update header badge
  var badge = document.querySelector('.viz-operation-badge');
  if (badge) {
    badge.childNodes[badge.childNodes.length - 1].textContent = ' ' + (MODE_LABELS[newMode] || newMode);
  }

  stopPlay();
  VIZ.currentStep = 0;

  hideCurve();
  hideNewNode();

  // FIX #2: unified cleanup on mode switch — clean both pointer systems
  hideLoopBox();
  removeTempPointer();
  hideTempPointer();

  if (newMode === 'insert-beginning' || newMode === 'insert-end' || newMode === 'insert-middle' || newMode === 'delete-beginning') {
    var overlay = document.getElementById('comingSoonOverlay');
    if (overlay) overlay.classList.remove('visible');

    renderCodePanel(newMode);

    var labels;
    if (newMode === 'insert-middle') {
      VIZ.totalSteps = 11;
      labels = INSERT_MIDDLE_STEP_LABELS;
    } else if (newMode === 'delete-beginning') {
      VIZ.totalSteps = 6;
      labels = DELETE_BEGINNING_STEP_LABELS;
    } else {
      VIZ.totalSteps = 7;
      labels = (newMode === 'insert-end') ? INSERT_END_STEP_LABELS : INSERT_BEGINNING_STEP_LABELS;
    }

    // Show/hide input row depending on operation
    var inputRow = document.getElementById('valueInputRow');
    var confirmBtn = document.getElementById('vizConfirmBtn');
    var posWrap = document.getElementById('posInputWrap');
    if (newMode === 'delete-beginning') {
      if (inputRow) inputRow.style.display = 'none';
      if (confirmBtn) confirmBtn.style.display = 'none';
    } else {
      if (inputRow) inputRow.style.display = '';
      if (confirmBtn) confirmBtn.style.display = '';
      var lbl = document.getElementById('vizValueLabel');
      if (lbl) lbl.textContent = 'Insert value';
      if (posWrap) posWrap.style.display = (newMode === 'insert-middle') ? '' : 'none';
    }

    if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;
    rebuildStepList(labels);
    rebuildDots(VIZ.totalSteps);
    buildList(VIZ.initialList, false, 0);
    applyStep(0);
  } else {
    var overlay2 = document.getElementById('comingSoonOverlay');
    if (overlay2) {
      var title = document.getElementById('comingSoonTitle');
      var text  = document.getElementById('comingSoonText');
      if (title) title.textContent = MODE_LABELS[newMode] + ' \u2014 Coming Soon';
      if (text)  text.innerHTML = 'This operation is being built.<br>Switch back to <strong>Insert at Beginning</strong> to explore the working animation.';
      overlay2.classList.add('visible');
    }
    var inputRow2 = document.getElementById('valueInputRow');
    if (inputRow2) inputRow2.style.display = 'none';
    var confirmBtn2 = document.getElementById('vizConfirmBtn');
    if (confirmBtn2) confirmBtn2.style.display = 'none';
    buildList(VIZ.initialList, false, 0);
    applyStep(0);
  }

  var timeVal = document.getElementById('timeComplexityVal');
  if (timeVal) timeVal.textContent = 'O(1)';
}

// ═══════════════════════════════════════════════════════════════
//  STEP LABELS
// ═══════════════════════════════════════════════════════════════
var INSERT_BEGINNING_STEP_LABELS = [
  'Allocate memory (malloc)',
  'Assign data value',
  'Set prev = NULL',
  'Check if head == NULL',
  'newNode\u2192next = head',
  'head\u2192prev = newNode',
  'head = newNode (done!)'
];

var INSERT_END_STEP_LABELS = [
  'Allocate memory (malloc)',
  'Assign data value',
  'Set next = NULL',
  'Check if head == NULL',
  'tail\u2192next = newNode',
  'newNode\u2192prev = tail',
  'tail = newNode (done!)'
];

// FIX #5: 11 labels matching STEPS_MIDDLE indices 1..11
var INSERT_MIDDLE_STEP_LABELS = [
  'Allocate memory (malloc)',
  'Assign data value',
  'Initialize temp = head',
  'Loop condition (i=1 < pos-1)',
  'temp = temp\u2192next (i=2)',
  'Loop condition (i=2 < pos-1 is false)',
  'newNode\u2192next = temp\u2192next',
  'newNode\u2192prev = temp',
  'temp\u2192next\u2192prev = newNode',
  'temp\u2192next = newNode',
  'Node inserted! List updated'
];

var DELETE_BEGINNING_STEP_LABELS = [
  'Check: head == NULL?',
  'Check: only one node?',
  'temp = head',
  'head = head\u2192next',
  'head\u2192prev = NULL',
  'free(temp) \u2014 node removed!'
];

var STEPS_DELETE_BEG = [
  {
    codeLine: null, animStatus: 'Ready', animStatusClass: '',
    explainStepNum: 'Initial State', explainTitle: 'Starting Point',
    explainText: 'We have a doubly linked list: <strong>1 \u21c4 2 \u21c4 3 \u21c4 4 \u21c4 NULL</strong>.<br><br>Goal: delete the <strong>first node</strong> (node 1) from the beginning.',
    whatBody: 'HEAD points to node 1. TAIL points to node 4. We call <code>deleteAtBeginning()</code>.',
    conceptText: '\uD83D\uDCA1 Delete at beginning is O(1) \u2014 no traversal needed!'
  },
  {
    codeLine: 1, animStatus: 'Checking head\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 6', explainTitle: 'Check: head == NULL?',
    explainText: '<code>if (head == NULL)</code> \u2014 is the list empty?<br><br>Our list has 4 nodes, so <strong>head != NULL</strong>. We proceed.',
    whatBody: 'HEAD is not NULL \u2014 list has nodes. Skip the empty-list branch.',
    conceptText: '\uD83D\uDD17 Always guard against deleting from an empty list!'
  },
  {
    codeLine: 2, animStatus: 'Checking size\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 6', explainTitle: 'Check: only one node?',
    explainText: '<code>if (head-&gt;next == NULL)</code> \u2014 is there only one node?<br><br>Our list has 4 nodes, so <strong>head\u2192next != NULL</strong>. We take the multi-node path.',
    whatBody: 'head\u2192next points to node 2 \u2014 list has multiple nodes. Proceed to full delete.',
    conceptText: '\u26A0\uFE0F Single-node case needs special handling: both head and tail must become NULL.'
  },
  {
    codeLine: 3, animStatus: 'Saving temp\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 6', explainTitle: 'temp = head',
    explainText: '<code>struct node* temp = head;</code> \u2014 save a reference to the current head node so we can free it after relinking.<br><br>Without this, we\u2019d lose the pointer after moving head.',
    whatBody: 'A <strong>temp</strong> pointer (red) appears above node 1, pointing to the node we are about to remove.',
    conceptText: '\uD83D\uDCCC Always save the node to delete BEFORE moving head \u2014 otherwise you leak memory!'
  },
  {
    codeLine: 4, animStatus: 'Moving HEAD\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 4 of 6', explainTitle: 'head = head\u2192next',
    explainText: '<code>head = head-&gt;next;</code> \u2014 advance HEAD to the second node (node 2).<br><br>Node 2 will become the new first node of the list.',
    whatBody: 'HEAD pointer slides from node 1 to node 2. Node 2 is now the new head.',
    conceptText: '\u27A1\uFE0F HEAD pointer moves forward by one node.'
  },
  {
    codeLine: 5, animStatus: 'Clearing prev\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 5 of 6', explainTitle: 'head\u2192prev = NULL',
    explainText: '<code>head-&gt;prev = NULL;</code> \u2014 the new head (node 2) still has its PREV pointing back to node 1.<br><br>We must clear it to NULL \u2014 the first node must never have a backward link.',
    whatBody: 'The PREV field of node 2 flashes and updates to <strong>NULL</strong>. The backward link to node 1 is removed.',
    conceptText: '\uD83D\uDCCC First node\u2019s prev is always NULL \u2014 it\u2019s the left boundary of the list!'
  },
  {
    codeLine: 6, animStatus: 'Complete \u2713', animStatusClass: 'status-complete',
    explainStepNum: 'Step 6 of 6', explainTitle: 'free(temp) \u2014 done!',
    explainText: '<code>free(temp);</code> \u2014 release the memory of the old head node (node 1).<br><br>List is now: <strong>2 \u21c4 3 \u21c4 4 \u21c4 NULL</strong>',
    whatBody: 'Node 1 fades out and is removed. HEAD now points to node 2. Deletion complete in O(1).',
    conceptText: '\u2705 Delete at beginning complete! No traversal needed \u2014 just pointer updates and free().'
  }
];

var STEPS_MIDDLE = [
  {
    codeLine: null, animStatus: 'Ready', animStatusClass: '',
    explainStepNum: 'Initial State', explainTitle: 'Starting Point',
    explainText: 'Goal: insert a new node in the middle.', whatBody: '', conceptText: ''
  },
  {
    codeLine: 1, animStatus: 'Allocating\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 10', explainTitle: 'Allocate Memory',
    explainText: 'malloc for new node', whatBody: '', conceptText: ''
  },
  {
    codeLine: 2, animStatus: 'Assigning value\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 10', explainTitle: 'Assign Data Value',
    explainText: 'Assign data to new node', whatBody: '', conceptText: ''
  },
  {
    codeLine: 3, animStatus: 'Traversing\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 10', explainTitle: 'Initialize temp = head',
    explainText: 'We begin traversal by pointing a temporary pointer `temp` to `head`.', whatBody: '', conceptText: ''
  },
  {
    codeLine: 4, animStatus: 'Traversing\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 4 of 10', explainTitle: 'Check loop condition',
    explainText: 'We check if i < pos - 1. Here i=1 and pos={{POS}}. 1 < {{POS_MINUS_1}} is {{LOOP_TRUE}}.', whatBody: '', conceptText: ''
  },
  {
    codeLine: 5, animStatus: 'Traversing\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 5 of 10', explainTitle: 'temp = temp\u2192next',
    explainText: 'Since the condition is true, temp moves to the next node. i becomes 2.', whatBody: '', conceptText: ''
  },
  {
    codeLine: 4, animStatus: 'Traversing\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 6 of 10', explainTitle: 'Check loop condition',
    explainText: 'We check if i < pos - 1. Now i=2 and pos={{POS}}. 2 < {{POS_MINUS_1}} is {{LOOP_FALSE}}. The loop exits.', whatBody: '', conceptText: ''
  },
  {
    codeLine: 7, animStatus: 'Linking\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 7 of 10', explainTitle: 'newNode\u2192next = temp\u2192next',
    explainText: 'Set the new node\'s NEXT pointer to point to temp\'s current next node.', whatBody: '', conceptText: ''
  },
  {
    codeLine: 8, animStatus: 'Linking\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 8 of 10', explainTitle: 'newNode\u2192prev = temp',
    explainText: 'Set the new node\'s PREV pointer to point back to temp.', whatBody: '', conceptText: ''
  },
  {
    codeLine: 9, animStatus: 'Linking\u2026', animStatusClass: 'status-running',
    explainStepNum: 'Step 9 of 10', explainTitle: 'temp\u2192next\u2192prev = newNode',
    explainText: 'Update the node AFTER temp so its PREV pointer points to the new node.', whatBody: '', conceptText: ''
  },
  {
    codeLine: 10, animStatus: 'Complete \u2713', animStatusClass: 'status-complete',
    explainStepNum: 'Step 10 of 11', explainTitle: 'temp\u2192next = newNode',
    explainText: 'Finally, point temp\'s NEXT pointer to the new node.', whatBody: '', conceptText: ''
  },
  {
    codeLine: null, animStatus: 'Inserted! \u2713', animStatusClass: 'status-complete',
    explainStepNum: 'Step 11 of 11', explainTitle: 'Insertion Complete!',
    explainText: 'The new node is now part of the list at position {{POS}}. The list is fully doubly-linked again.', whatBody: '', conceptText: '\u2705 Insert at middle is O(n) — traversal needed to find position.'
  }
];

// ═══════════════════════════════════════════════════════════════
//  INSERT-END STEP DEFINITIONS
// ═══════════════════════════════════════════════════════════════
var STEPS_END = [
  // 0: initial state
  {
    codeLine: null,
    animStatus: 'Ready',
    animStatusClass: '',
    explainStepNum: 'Initial State',
    explainTitle: 'Starting Point',
    explainText: 'We have a doubly linked list: <strong>1 \u21c4 2 \u21c4 3 \u21c4 4 \u21c4 NULL</strong>.<br><br>Each node has <strong>prev</strong>, <strong>data</strong>, and <strong>next</strong> fields. Goal: insert a new node at the very end.',
    whatBody: 'HEAD points to node 1. TAIL points to node 4 (next=NULL). We call <code>insertatend(value)</code>.',
    conceptText: '\uD83D\uDCA1 Insert at end is O(1) because we keep a TAIL pointer \u2014 no traversal needed!'
  },
  // 1: malloc
  {
    codeLine: 1,
    animStatus: 'Allocating\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 7',
    explainTitle: 'Allocate Memory',
    explainText: '<code>malloc(sizeof(struct node))</code> reserves heap memory for a new DLL node.<br><br>The new node has three fields: <strong>prev</strong>, <strong>data</strong>, and <strong>next</strong>.',
    whatBody: 'A new DLL node appears to the right of the list. Fields are uninitialized (\u2014). Memory address 0x105 assigned.',
    conceptText: '\uD83E\uDDE0 DLL nodes carry an extra prev pointer (8 bytes on 64-bit) compared to SLL nodes.'
  },
  // 2: assign data
  {
    codeLine: 2,
    animStatus: 'Assigning value\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 7',
    explainTitle: 'Assign Data Value',
    explainText: '<code>newnode-&gt;data = data;</code> writes the value into the data field of the new node.',
    whatBody: 'The new node\u2019s DATA field updates from <strong>?</strong> to the inserted value. prev and next still unset.',
    conceptText: '\uD83D\uDCDD Always set data first \u2014 pointer fields come next in a deliberate order.'
  },
  // 3: set next = NULL
  {
    codeLine: 3,
    animStatus: 'Setting next\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 7',
    explainTitle: 'Set next = NULL',
    explainText: '<code>newnode-&gt;next = NULL;</code> — since this node will be the last node, nothing comes after it.<br><br>Its next pointer must always be NULL.',
    whatBody: 'The NEXT field on the new node flashes and updates to <strong>NULL</strong>. This marks it as the future tail.',
    conceptText: '\uD83D\uDCCC The last node\u2019s next is always NULL in a doubly linked list \u2014 it\u2019s the right boundary.'
  },
  // 4: check if head == NULL
  {
    codeLine: 4,
    animStatus: 'Checking head\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 4 of 7',
    explainTitle: 'Check: head == NULL?',
    explainText: '<code>if (head == NULL)</code> — is the list empty?<br><br>Our list has 4 nodes, so <strong>head != NULL</strong>. We take the <code>else</code> branch.',
    whatBody: 'The list is not empty (head points to node 1). We jump to the else branch: link newNode after tail.',
    conceptText: '\uD83D\uDD17 If the list were empty we\u2019d set head = tail = newnode. For non-empty, only tail needs updating.'
  },
  // 5: tail->next = newNode
  {
    codeLine: 5,
    animStatus: 'Linking next\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 5 of 7',
    explainTitle: 'tail\u2192next = newNode',
    explainText: '<code>tail-&gt;next = newnode;</code> — the current last node\u2019s NEXT pointer now points to the new node.<br><br>This stitches the new node onto the end of the chain.',
    whatBody: 'A curved blue arrow draws from node 4\u2019s NEXT field to newNode. Chain: 1 \u21c4 2 \u21c4 3 \u21c4 4 \u2192 newNode.',
    conceptText: '\u26A0\uFE0F Do this BEFORE moving tail \u2014 after tail = newNode, you\u2019d lose the reference to the old last node!'
  },
  // 6: newNode->prev = tail
  {
    codeLine: 6,
    animStatus: 'Linking prev\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 6 of 7',
    explainTitle: 'newNode\u2192prev = tail',
    explainText: '<code>newnode-&gt;prev = tail;</code> — the new node now points <strong>back</strong> to the old tail (node 4).<br><br>This completes the <strong>bidirectional</strong> link between the two nodes.',
    whatBody: 'A curved amber arrow draws from newNode\u2019s PREV field back to node 4. The DLL is now properly doubly-linked.',
    conceptText: '\uD83D\uDD17 Without this step, backward traversal breaks! Both directions must be set for a true DLL.'
  },
  // 7: tail = newNode
  {
    codeLine: 7,
    animStatus: 'Complete \u2713',
    animStatusClass: 'status-complete',
    explainStepNum: 'Step 7 of 7',
    explainTitle: 'tail = newNode',
    explainText: '<code>tail = newnode;</code> — TAIL now points to the newly inserted node.<br><br>List is now: <strong>1 \u21c4 2 \u21c4 3 \u21c4 4 \u21c4 newNode \u21c4 NULL</strong>',
    whatBody: 'TAIL jumps to the new node. All nodes snap into a clean bidirectional row. Insertion complete in O(1).',
    conceptText: '\u2705 DLL insertion complete! Both tail\u2192next and newNode\u2192prev are set \u2014 full bidirectional linkage achieved.'
  }
];


var STEPS = [
  // 0: initial state
  {
    codeLine: null,
    animStatus: 'Ready',
    animStatusClass: '',
    explainStepNum: 'Initial State',
    explainTitle: 'Starting Point',
    explainText: 'We have a doubly linked list: <strong>1 \u21c4 2 \u21c4 3 \u21c4 4 \u21c4 NULL</strong>.<br><br>Each node has a <strong>prev</strong> pointer, a <strong>data</strong> field, and a <strong>next</strong> pointer. Goal: insert a new node at the very beginning.',
    whatBody: 'HEAD points to node 1 (prev=NULL). TAIL points to node 4 (next=NULL). We call <code>insertatbeginning(0)</code>.',
    conceptText: '\uD83D\uDCA1 DLL Insert at beginning is O(1) \u2014 no traversal needed, just pointer updates!'
  },
  // 1: malloc
  {
    codeLine: 1,
    animStatus: 'Allocating\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 1 of 7',
    explainTitle: 'Allocate Memory',
    explainText: '<code>malloc(sizeof(struct node))</code> reserves heap memory for a new DLL node.<br><br>The new node has three fields: <strong>prev</strong>, <strong>data</strong>, and <strong>next</strong>.',
    whatBody: 'A new DLL node appears below the list. Fields are uninitialized (\u2014). Memory address 0x100 assigned.',
    conceptText: '\uD83E\uDDE0 DLL nodes need more memory than SLL \u2014 they carry an extra prev pointer (8 bytes on 64-bit).'
  },
  // 2: assign data
  {
    codeLine: 2,
    animStatus: 'Assigning value\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 2 of 7',
    explainTitle: 'Assign Data Value',
    explainText: '<code>newnode-&gt;data = data;</code> writes the value into the data field of the new node.',
    whatBody: 'The new node\u2019s DATA field updates from <strong>?</strong> to the inserted value. prev and next still unset.',
    conceptText: '\uD83D\uDCDD Always set data first \u2014 pointer fields come next in a deliberate order.'
  },
  // 3: set prev = NULL
  {
    codeLine: 3,
    animStatus: 'Setting prev\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 3 of 7',
    explainTitle: 'Set prev = NULL',
    explainText: '<code>newnode-&gt;prev = NULL;</code> — since this node will become the first node, nothing comes before it.<br><br>Its prev pointer must always be NULL.',
    whatBody: 'The PREV field on the new node flashes and updates to <strong>NULL</strong>. This marks it as the future head.',
    conceptText: '\uD83D\uDCCC The first node\u2019s prev is always NULL in a doubly linked list \u2014 it\u2019s the left boundary.'
  },
  // 4: check if head == NULL
  {
    codeLine: 4,
    animStatus: 'Checking head\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 4 of 7',
    explainTitle: 'Check: head == NULL?',
    explainText: '<code>if (head == NULL)</code> — is the list empty?<br><br>Our list has 4 nodes, so <strong>head != NULL</strong>. We take the <code>else</code> branch.',
    whatBody: 'The list is not empty (head points to node 1). We jump to the else branch: link newNode into the list.',
    conceptText: '\uD83D\uDD17 If the list were empty we\u2019d also set tail = newnode. For non-empty, only head needs updating.'
  },
  // 5: newnode->next = head
  {
    codeLine: 5,
    animStatus: 'Linking next\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 5 of 7',
    explainTitle: 'newNode\u2192next = head',
    explainText: '<code>newnode-&gt;next = head;</code> — the new node\u2019s NEXT pointer now points to the current first node (node 1).<br><br>This stitches the new node into the chain.',
    whatBody: 'A curved blue arrow draws from newNode\u2019s NEXT field to node 1. Chain: newNode \u2192 1 \u21c4 2 \u21c4 3 \u21c4 4.',
    conceptText: '\u26A0\uFE0F Do this BEFORE moving head \u2014 after head = newNode, you\u2019d lose the reference to the old first node!'
  },
  // 6: head->prev = newnode (NEW STEP)
  {
    codeLine: 6,
    animStatus: 'Linking prev\u2026',
    animStatusClass: 'status-running',
    explainStepNum: 'Step 6 of 7',
    explainTitle: 'head\u2192prev = newNode',
    explainText: '<code>head-&gt;prev = newnode;</code> — the old head (node 1) now points <strong>back</strong> to the new node.<br><br>This completes the <strong>bidirectional</strong> link between the two nodes.',
    whatBody: 'A curved amber arrow draws from node 1\u2019s PREV field back to newNode. The DLL is now properly doubly-linked.',
    conceptText: '\uD83D\uDD17 Without this step, the list breaks backward traversal! Both directions must be set for a true DLL.'
  },
  // 7: head = newnode
  {
    codeLine: 7,
    animStatus: 'Complete \u2713',
    animStatusClass: 'status-complete',
    explainStepNum: 'Step 7 of 7',
    explainTitle: 'head = newNode',
    explainText: '<code>head = newnode;</code> — HEAD now points to the newly inserted node.<br><br>List is now: <strong>0 \u21c4 1 \u21c4 2 \u21c4 3 \u21c4 4 \u21c4 NULL</strong>',
    whatBody: 'HEAD jumps to the new node. All nodes snap into a clean bidirectional row. Insertion complete in O(1).',
    conceptText: '\u2705 DLL insertion complete! Both newNode\u2192next and head\u2192prev are set \u2014 full bidirectional linkage achieved.'
  }
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
  totalSteps: 7,
  isPlaying: false,
  playTimer: null,
  playDelay: 2000,
  initialList: [1, 2, 3, 4],
  newValue: 0,
  insertPos: 3,
  el: {}
};

// ═══════════════════════════════════════════════════════════════
//  MEMORY ADDRESSES
// ═══════════════════════════════════════════════════════════════
var MEM_ADDRS     = ['0x101', '0x102', '0x103', '0x104', '0x105'];
var NEW_NODE_ADDR = '0x100';

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  cacheElements();
  renderCodePanel('insert-beginning');
  buildList(VIZ.initialList, false, 0);
  applyStep(0);
  if (window.innerWidth <= 768) { shrinkArrowheadsMobile(); }
});

function shrinkArrowheadsMobile() {
  var blue  = document.getElementById('arrowHead');
  var amber = document.getElementById('arrowHeadPrev');
  [blue, amber].forEach(function(m, i) {
    if (!m) return;
    m.setAttribute('markerWidth',  '7');
    m.setAttribute('markerHeight', '6');
    m.setAttribute('refX', '6.5');
    m.setAttribute('refY', '3');
    var p = m.querySelector('path');
    if (p) {
      p.setAttribute('d', 'M0,0 L0,6 L7,3 z');
      p.setAttribute('fill', i === 0 ? '#3b6cff' : '#f59e0b');
    }
  });
}

function cacheElements() {
  function q(id) { return document.getElementById(id); }
  VIZ.el = {
    listRow:         q('listRow'),
    newNodeWrap:     q('newNodeWrap'),
    newNodeEl:       q('newNodeEl'),
    newNodeData:     q('newNodeData'),
    newNodePrevField:q('newNodePrevField'),
    newNodeNextField:q('newNodeNextField'),
    newNodeLabel:    q('newNodeLabel'),
    headPointer:     q('headPointer'),
    headAddr:        q('headAddr'),
    tailPointer:     q('tailPointer'),
    tailAddr:        q('tailAddr'),
    curveSvg:        q('curveSvg'),
    curvePath:       q('curvePath'),
    curvePathPrev:   q('curvePathPrev'),
    tempPointer:     q('tempPointer'),
    tempAddr:        q('tempAddr'),
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
    vizPosInput:     q('vizPosInput'),
    posInputWrap:    q('posInputWrap'),
    newNodeAddr:     q('newNodeAddr'),
    vizConfirmBtn:   q('vizConfirmBtn')
  };
  if (VIZ.el.headerStepTotal) VIZ.el.headerStepTotal.textContent = VIZ.totalSteps;

  // Listen for value input changes
  if (VIZ.el.vizValueInput) {
    VIZ.el.vizValueInput.addEventListener('input', function () {
      var v = parseInt(VIZ.el.vizValueInput.value);
      VIZ.newValue = isNaN(v) ? 0 : v;
    });
    // Keyboard Enter → confirm
    VIZ.el.vizValueInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') vizConfirmValues();
    });
  }

  // Listen for position input changes
  if (VIZ.el.vizPosInput) {
    VIZ.el.vizPosInput.addEventListener('input', function () {
      var p = parseInt(VIZ.el.vizPosInput.value);
      // Store raw 0-based; vizConfirmValues will convert
      VIZ.insertPos = isNaN(p) || p < 0 ? 2 : p + 1;
    });
    // Keyboard Enter → confirm
    VIZ.el.vizPosInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') vizConfirmValues();
    });
  }
}

// ═══════════════════════════════════════════════════════════════
//  POINTER TRACKING
// ═══════════════════════════════════════════════════════════════
var PTR = {
  nodeList:    [],
  headIndex:   0,
  tailIndex:   0,
  newNodeAddr: '0x100'
};

function buildNodeList(values) {
  PTR.nodeList = [];
  var initialList = VIZ.initialList;
  var addrByValue = {};
  for (var k = 0; k < initialList.length; k++) {
    var v = initialList[k];
    var a = MEM_ADDRS[k] || ('0x' + (0x101 + k).toString(16));
    if (!addrByValue[v]) addrByValue[v] = [];
    addrByValue[v].push(a);
  }
  var usageCount = {};
  var newInserted = false;
  for (var i = 0; i < values.length; i++) {
    var val = values[i];
    var isNewNode;
    if (mode === 'insert-end') {
      isNewNode = (values.length === VIZ.initialList.length + 1 && i === values.length - 1);
    } else {
      isNewNode = (!newInserted && val === VIZ.newValue && values.length === VIZ.initialList.length + 1);
    }
    var addr;
    if (isNewNode) {
      addr = (mode === 'insert-end') ? END_NEW_NODE_ADDR : NEW_NODE_ADDR;
      newInserted = true;
    } else {
      var idx = usageCount[val] || 0;
      if (addrByValue[val] && addrByValue[val][idx] !== undefined) {
        addr = addrByValue[val][idx];
      } else {
        var baseIdx = newInserted ? (i - 1) : i;
        addr = MEM_ADDRS[baseIdx] || ('0x' + (0x101 + baseIdx).toString(16));
      }
      usageCount[val] = idx + 1;
    }
    PTR.nodeList.push({ value: val, address: addr });
  }
}

// ── Build DLL node HTML: [PREV | DATA | NEXT] ──────────────────
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

    var prevAddr = (i > 0) ? PTR.nodeList[i - 1].address : 'NULL';
    var nextAddr = (i < PTR.nodeList.length - 1) ? PTR.nodeList[i + 1].address : 'NULL';

    var wrap = document.createElement('div');
    wrap.className = 'viz-node-wrap';

    var node = document.createElement('div');
    node.className = 'viz-node viz-dll-node' + (withEnter ? ' viz-node-entering' : '');
    if (withEnter) node.style.animationDelay = (i * 65) + 'ms';
    node.dataset.index = i;

    node.innerHTML =
      '<div class="viz-node-prev">' + prevAddr + '</div>' +
      '<div class="viz-node-data">' + nodeObj.value + '</div>' +
      '<div class="viz-node-next">' + nextAddr + '</div>';

    var addrEl = document.createElement('div');
    addrEl.className = 'viz-node-addr';
    addrEl.textContent = nodeObj.address;

    var idxEl = document.createElement('div');
    idxEl.className = 'viz-node-index';
    idxEl.textContent = i;
    idxEl.style.cssText = [
      'text-align:center',
      'font-size:11px',
      'font-weight:500',
      'color:#94a3b8',
      'margin-top:6px',
      'letter-spacing:0.02em',
      'user-select:none'
    ].join(';');

    wrap.appendChild(node);
    wrap.appendChild(addrEl);
    wrap.appendChild(idxEl);
    row.appendChild(wrap);

    if (i < PTR.nodeList.length - 1) {
      // Bidirectional arrows between nodes
      var a = document.createElement('div');
      a.className = 'viz-arrow';
      a.innerHTML = '<span class="viz-arrow-fwd">\u2192</span><span class="viz-arrow-bck">\u2190</span>';
      row.appendChild(a);
    }
  }

  // Final arrow + NULL
  var fa = document.createElement('div');
  fa.className = 'viz-arrow';
  fa.innerHTML = '<span class="viz-arrow-fwd">\u2192</span><span class="viz-arrow-bck" style="visibility:hidden">\u2190</span>';
  row.appendChild(fa);

  var nullEl = document.createElement('div');
  nullEl.className = 'viz-null';
  nullEl.textContent = 'NULL';
  row.appendChild(nullEl);

  requestAnimationFrame(function () {
    positionPointers();
  });
}

// ── Pointer positioning ─────────────────────────────────────────
function positionPointers() {
  var canvas = document.getElementById('animCanvas');
  var row    = VIZ.el.listRow;
  var hp     = VIZ.el.headPointer;
  var tp     = VIZ.el.tailPointer;
  if (!canvas || !row || !hp || !tp) return;

  var wraps = row.querySelectorAll('.viz-node-wrap');
  if (!wraps || wraps.length === 0) return;

  var canvasRect = canvas.getBoundingClientRect();
  var scrollLeft = canvas.scrollLeft || 0;

  var hIdx  = Math.min(PTR.headIndex, wraps.length - 1);
  var hWrap = wraps[hIdx];
  var hNode = hWrap.querySelector('.viz-node');
  var hRect = (hNode || hWrap).getBoundingClientRect();
  var hCx   = hRect.left + hRect.width / 2 - canvasRect.left + scrollLeft;
  var hTopY = hRect.top - canvasRect.top - hp.getBoundingClientRect().height - 4;

  var tIdx  = Math.min(PTR.tailIndex, wraps.length - 1);
  var tWrap = wraps[tIdx];
  var tNode = tWrap.querySelector('.viz-node');
  var tRect = (tNode || tWrap).getBoundingClientRect();
  var tCx   = tRect.left + tRect.width / 2 - canvasRect.left + scrollLeft;
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

function updatePointerAddrs() {
  var hAddr = VIZ.el.headAddr;
  var tAddr = VIZ.el.tailAddr;
  if (hAddr) {
    var hNode = PTR.nodeList[PTR.headIndex];
    hAddr.textContent = hNode ? hNode.address : '\u2014';
  }
  if (tAddr) {
    var tNode = PTR.nodeList[PTR.tailIndex];
    tAddr.textContent = tNode ? tNode.address : '\u2014';
  }
}

function positionHeadOnNewNode() {
  var canvas = document.getElementById('animCanvas');
  var hp     = VIZ.el.headPointer;
  var nodeEl = VIZ.el.newNodeEl;
  if (!canvas || !hp || !nodeEl) return;

  var canvasRect = canvas.getBoundingClientRect();
  var scrollLeft = canvas.scrollLeft || 0;
  var nodeRect   = nodeEl.getBoundingClientRect();
  var cx         = nodeRect.left + nodeRect.width / 2 - canvasRect.left + scrollLeft;
  var topY       = nodeRect.top  - canvasRect.top - hp.getBoundingClientRect().height - 4;

  hp.style.top       = topY + 'px';
  hp.style.bottom    = 'auto';
  hp.style.left      = cx + 'px';
  hp.style.transform = 'translateX(-50%)';

  if (VIZ.el.headAddr) VIZ.el.headAddr.textContent = PTR.newNodeAddr;
}

// ═══════════════════════════════════════════════════════════════
//  STEP APPLICATION
// ═══════════════════════════════════════════════════════════════
function applyStep(idx) {
  VIZ.currentStep = idx;
  var stepArr = (mode === 'insert-end') ? STEPS_END : (mode === 'insert-middle') ? STEPS_MIDDLE : (mode === 'delete-beginning') ? STEPS_DELETE_BEG : STEPS;
  var step = stepArr[idx];
  if (!step) return;

  if (VIZ.el.headerStepNum) VIZ.el.headerStepNum.textContent = idx;

  animateCardUpdate(function () {
    var pos = VIZ.insertPos;
    var posM1 = pos - 1;
    function resolveTpl(s) {
      if (!s) return s;
      return s
        .replace(/\{\{POS\}\}/g, pos)
        .replace(/\{\{POS_MINUS_1\}\}/g, posM1)
        .replace(/\{\{LOOP_TRUE\}\}/g, (1 < posM1) ? 'True' : 'False')
        .replace(/\{\{LOOP_FALSE\}\}/g, (2 < posM1) ? 'True' : 'False');
    }
    if (VIZ.el.explainStepNum) VIZ.el.explainStepNum.textContent = step.explainStepNum;
    if (VIZ.el.explainTitle)   VIZ.el.explainTitle.textContent   = step.explainTitle;
    if (VIZ.el.explainText)    VIZ.el.explainText.innerHTML      = resolveTpl(step.explainText);
    if (VIZ.el.whatBody)       VIZ.el.whatBody.innerHTML         = resolveTpl(step.whatBody);
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

  runAnimation(idx);
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
  if (activeLine === null || activeLine === undefined || activeLine === 0) return;

  for (var k = 0; k < all.length; k++) {
    all[k].classList.add('viz-line-dim');
  }
  var targets = document.querySelectorAll('.viz-code-line[data-line="' + activeLine + '"]');
  var scrolled = false;
  for (var j = 0; j < targets.length; j++) {
    targets[j].classList.remove('viz-line-dim');
    targets[j].classList.add('viz-line-active');
    if (!scrolled && targets[j].classList.contains('viz-highlightable')) {
      var codeBlock = targets[j].closest('.viz-code-block');
      if (codeBlock) {
        // Align active line just under the "C Code" header
        const HEADER_OFFSET = 10;
        codeBlock.scrollTo({ 
          top: targets[j].offsetTop - HEADER_OFFSET, 
          behavior: 'smooth' 
        });
        scrolled = true;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════
//  STEP LIST & DOTS
// ═══════════════════════════════════════════════════════════════
function updateStepList(currentStep) {
  var items = document.querySelectorAll('.viz-step-item');
  for (var i = 0; i < items.length; i++) {
    var s = parseInt(items[i].dataset.step);
    items[i].classList.remove('viz-step-active', 'viz-step-done', 'viz-step-upcoming');
    if (s < currentStep) {
      items[i].classList.add('viz-step-done');
    } else if (s === currentStep) {
      items[i].classList.add('viz-step-active');
      // Scroll within explain panel only, not page viewport
      var explainBody = document.getElementById('explainBody');
      if (explainBody) {
        var itemTop = items[i].offsetTop;
        var bodyH   = explainBody.clientHeight;
        explainBody.scrollTop = itemTop - bodyH / 2 + items[i].clientHeight / 2;
      }
    } else {
      items[i].classList.add('viz-step-upcoming');
    }
  }
}

function updateDots(idx) {
  var dots = document.querySelectorAll('.viz-dot');
  for (var i = 0; i < dots.length; i++) {
    var s = parseInt(dots[i].dataset.step);
    dots[i].classList.remove('viz-dot-active', 'viz-dot-done');
    if (s < idx) {
      dots[i].classList.add('viz-dot-done');
    } else if (s === idx) {
      dots[i].classList.add('viz-dot-active');
    }
  }
}

// ═══════════════════════════════════════════════════════════════
//  ANIMATION HELPERS
// ═══════════════════════════════════════════════════════════════
function hideNewNode() {
  var wrap = VIZ.el.newNodeWrap;
  if (wrap) {
    wrap.classList.remove('visible');
    var nullWrap = wrap.querySelector('.viz-new-node-null-wrap');
    if (nullWrap) nullWrap.parentNode.removeChild(nullWrap);
  }
}

function hideCurve() {
  var svg = VIZ.el.curveSvg;
  if (svg) svg.classList.remove('visible');
  var path = VIZ.el.curvePath;
  if (path) { path.setAttribute('d', ''); path.style.strokeDashoffset = '1000px'; }
  var pathPrev = VIZ.el.curvePathPrev;
  if (pathPrev) { pathPrev.setAttribute('d', ''); pathPrev.style.strokeDashoffset = '1000px'; pathPrev.style.opacity = '0'; }

  // FIX #3: also wipe any dynamically appended mid-link paths
  if (svg) {
    var midLinks = svg.querySelectorAll('.viz-mid-link');
    for (var i = 0; i < midLinks.length; i++) {
      midLinks[i].parentNode.removeChild(midLinks[i]);
    }
  }
}

function resetHeadStyle() {
  PTR.headIndex = 0;
  positionPointers();
}

// ═══════════════════════════════════════════════════════════════
//  MAIN ANIMATION DISPATCHER
// ═══════════════════════════════════════════════════════════════
function runAnimation(step) {
  if (mode === 'delete-beginning') {
    switch (step) {
      case 0: animDelBeg_initial();     break;
      case 1: animDelBeg_checkEmpty();  break;
      case 2: animDelBeg_checkOne();    break;
      case 3: animDelBeg_setTemp();     break;
      case 4: animDelBeg_moveHead();    break;
      case 5: animDelBeg_clearPrev();   break;
      case 6: animDelBeg_free();        break;
    }
    return;
  }
  if (mode === 'insert-end') {
    switch (step) {
      case 0: animEnd_initial();      break;
      case 1: animEnd_malloc();       break;
      case 2: animEnd_assignData();   break;
      case 3: animEnd_setNextNull();  break;
      case 4: animEnd_checkNull();    break;
      case 5: animEnd_linkNext();     break;
      case 6: animEnd_linkPrev();     break;
      case 7: animEnd_rearrange();    break;
    }
    return;
  }
  if (mode === 'insert-middle') {
    switch (step) {
      case 0:  anim_initial();           break;
      case 1:  anim_malloc();            break;
      case 2:  anim_assignData();        break;
      case 3:  animMid_initTemp();       break;
      case 4:  animMid_loopCheckTrue();  break;
      case 5:  animMid_tempMove();       break;
      case 6:  animMid_loopCheckFalse(); break;
      case 7:  animMid_link1();          break;
      case 8:  animMid_link2();          break;
      case 9:  animMid_link3();          break;
      case 10: animMid_link4();          break;
      case 11: animMid_rearrange();      break;
    }
    return;
  }
  switch (step) {
    case 0: anim_initial();      break;
    case 1: anim_malloc();       break;
    case 2: anim_assignData();   break;
    case 3: anim_setPrevNull();  break;
    case 4: anim_checkNull();    break;
    case 5: anim_linkNext();     break;
    case 6: anim_linkPrev();     break;
    case 7: anim_rearrange();    break;
  }
}

// ── Step 0: Initial state ───────────────────────────────────────
function anim_initial() {
  buildList(VIZ.initialList, false, 0);
  hideNewNode();
  hideCurve();
  resetHeadStyle();
}

// ── Step 1: malloc — show new node with '?' fields ─────────────
function anim_malloc() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = '?';
  VIZ.el.newNodeEl.className     = 'viz-node viz-dll-node viz-node-new';
  VIZ.el.newNodeLabel.textContent = 'newNode';

  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  if (mode === 'insert-middle') {
    midPositionNewNode(wrap);
  } else {
    wrap.style.left      = '50%';
    wrap.style.transform = 'translateX(-50%)';
  }
  wrap.classList.remove('visible');
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { wrap.classList.add('visible'); });
  });
}

// ── Step 2: assign data ─────────────────────────────────────────
function anim_assignData() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  if (mode === 'insert-middle') {
    midPositionNewNode(wrap);
  } else {
    wrap.style.left      = '50%';
    wrap.style.transform = 'translateX(-50%)';
  }
  wrap.classList.add('visible');

  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  setTimeout(function () {
    VIZ.el.newNodeData.textContent = String(VIZ.newValue);
    VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
    VIZ.el.newNodeEl.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)';
    VIZ.el.newNodeEl.style.transform  = 'scale(1.1)';
    setTimeout(function () { VIZ.el.newNodeEl.style.transform = 'scale(1)'; }, 200);
  }, 80);
}

// ── Step 3: set prev = NULL ─────────────────────────────────────
function anim_setPrevNull() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  // Flash prev field: ? → NULL
  var prevField = VIZ.el.newNodePrevField;
  if (prevField) {
    prevField.textContent = '?';
    setTimeout(function () {
      prevField.style.transition = 'background 0.25s ease, color 0.25s ease';
      prevField.style.background = 'rgba(245,158,11,0.25)';
      prevField.style.color      = '#d97706';
      prevField.textContent      = 'NULL';
      setTimeout(function () {
        prevField.style.background = '';
        prevField.style.color      = '';
      }, 700);
    }, 120);
  }
}

// ── Step 4: check if head == NULL ──────────────────────────────
function anim_checkNull() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = 'NULL';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  // Pulse the HEAD pointer to signal evaluation
  var hp = VIZ.el.headPointer;
  if (hp) {
    hp.style.transition = 'transform 0.15s ease';
    hp.style.transform  = 'translateX(-50%) scale(1.18)';
    setTimeout(function () { hp.style.transform = 'translateX(-50%) scale(1)'; }, 300);
  }
}

// Store curve geometry for step 6
var CURVE_GEOM = null;

// ── Step 5: newNode->next = head (draw curved arrow) ────────────
function anim_linkNext() {
  buildList(VIZ.initialList, false, 0);
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = 'NULL';

  // Update NEXT field on new node to show first node's address
  var firstNodeAddr = PTR.nodeList.length > 0 ? PTR.nodeList[0].address : 'NULL';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = firstNodeAddr;

  function scrollToHead() {
    var container = document.querySelector('.viz-list-row');
    var headNode = document.querySelector('.viz-node-wrap');
    if (container && headNode) {
      var offset = headNode.offsetLeft - 40;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }
  scrollToHead();

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

      // Source: RIGHT side of newNode — UPPER portion (above center)
      var newNodeEl = VIZ.el.newNodeEl;
      var newRect = newNodeEl ? newNodeEl.getBoundingClientRect() : null;
      var startX, startY;
      if (newRect) {
        startX = newRect.right - canvasRect.left;
        startY = newRect.top + newRect.height * 0.28 - canvasRect.top;
      } else {
        startX = canvasRect.width / 2 + 60;
        startY = canvasRect.height - 100;
      }

      // Target: LEFT side of node 1 — UPPER portion (above center)
      var listRow = VIZ.el.listRow;
      var firstWrap = listRow ? listRow.querySelector('.viz-node-wrap') : null;
      var firstNodeEl = firstWrap ? firstWrap.querySelector('.viz-node') : null;
      var endX, endY;
      if (firstNodeEl) {
        var fr = firstNodeEl.getBoundingClientRect();
        endX = fr.left - canvasRect.left;
        endY = fr.top + fr.height * 0.28 - canvasRect.top;
      } else {
        endX = canvasRect.width * 0.15;
        endY = canvasRect.height * 0.38;
      }

      var isMobile = window.innerWidth <= 768;

      // BLUE (NEXT): Inner Track - STAYS COMPLETELY UNCHANGED
      var cp1x, cp1y, cp2x, cp2y;
      if (isMobile) {
        cp1x = startX + 60;  cp1y = startY - 60;  
        cp2x = endX - 70;    cp2y = endY + 100;   
      } else {
        cp1x = startX + 120; cp1y = startY - 100; 
        cp2x = endX - 150;   cp2y = endY + 150;   
      }

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

// ── Step 6: head->prev = newNode (draw amber reverse arrow) ────────
function anim_linkPrev() {
  buildList(VIZ.initialList, false, 0);
  resetHeadStyle();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.left      = '50%';
  wrap.style.transform = 'translateX(-50%)';
  wrap.classList.add('visible');

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = 'NULL';

  var firstNodeAddr = PTR.nodeList.length > 0 ? PTR.nodeList[0].address : 'NULL';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = firstNodeAddr;

  // Also update the PREV field of the first list node to show newNode's addr
  var listRow = VIZ.el.listRow;
  var firstWrap = listRow ? listRow.querySelector('.viz-node-wrap') : null;
  if (firstWrap) {
    var firstPrevEl = firstWrap.querySelector('.viz-node-prev');
    if (firstPrevEl) {
      firstPrevEl.style.transition = 'background 0.25s ease, color 0.25s ease';
      firstPrevEl.style.background = 'rgba(245,158,11,0.25)';
      firstPrevEl.style.color      = '#d97706';
      firstPrevEl.textContent      = '0x100'; // newNode addr
      setTimeout(function () {
        firstPrevEl.style.background = '';
        firstPrevEl.style.color      = '';
      }, 900);
    }
  }

  // Keep blue NEXT arrow visible from step 5 (re-draw it perfectly to match step 5)
  var svg      = VIZ.el.curveSvg;
  var pathNext = VIZ.el.curvePath;
  var pathPrev = VIZ.el.curvePathPrev;
  if (!svg || !pathNext || !pathPrev) return;

  var oldDot = svg.querySelector('.viz-travel-dot');
  if (oldDot) oldDot.parentNode.removeChild(oldDot);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;
      var canvasRect = canvas.getBoundingClientRect();

      var newNodeEl = VIZ.el.newNodeEl;
      var newRect   = newNodeEl ? newNodeEl.getBoundingClientRect() : null;

      // Blue: newNode RIGHT (upper) → Node1 LEFT (upper)
      var startX, startY;
      if (newRect) {
        startX = newRect.right - canvasRect.left;
        startY = newRect.top + newRect.height * 0.28 - canvasRect.top;
      } else {
        startX = canvasRect.width / 2 + 60;
        startY = canvasRect.height - 100;
      }

      var firstNodeEl2 = firstWrap ? firstWrap.querySelector('.viz-node') : null;
      var endX, endY;
      if (firstNodeEl2) {
        var fr = firstNodeEl2.getBoundingClientRect();
        endX = fr.left - canvasRect.left;
        endY = fr.top + fr.height * 0.28 - canvasRect.top;
      } else {
        endX = canvasRect.width * 0.15;
        endY = canvasRect.height * 0.38;
      }

      var isMobile2 = window.innerWidth <= 768;

      // ── BLUE (NEXT) static arrow: Matches Step 5 exactly (UNCHANGED) ──
      var bcp1x, bcp1y, bcp2x, bcp2y;
      if (isMobile2) {
        bcp1x = startX + 60;  bcp1y = startY - 60;
        bcp2x = endX - 70;    bcp2y = endY + 100;
      } else {
        bcp1x = startX + 120; bcp1y = startY - 100;
        bcp2x = endX - 150;   bcp2y = endY + 150;
      }

      var dNext = 'M ' + startX + ' ' + startY
        + ' C ' + bcp1x + ' ' + bcp1y + ', ' + bcp2x + ' ' + bcp2y + ', ' + endX + ' ' + endY;

      pathNext.setAttribute('d', dNext);
      var lenNext;
      try { lenNext = pathNext.getTotalLength(); } catch(e) { lenNext = 500; }
      if (!lenNext || lenNext < 1) lenNext = 500;
      pathNext.style.transition       = 'none';
      pathNext.style.strokeDasharray  = lenNext + 'px';
      pathNext.style.strokeDashoffset = '0px';
      svg.classList.add('visible');

      // ── AMBER (PREV): Perfectly mathematically parallel track with ZERO intersections. ──
      var revStartX, revStartY, revEndX, revEndY;
      if (firstNodeEl2) {
        var fr2 = firstNodeEl2.getBoundingClientRect();
        revStartX = fr2.left - canvasRect.left;
        revStartY = fr2.top + fr2.height * 0.72 - canvasRect.top; // Lower portion of Head
      } else {
        revStartX = canvasRect.width * 0.15;
        revStartY = canvasRect.height * 0.55;
      }
      if (newRect) {
        revEndX = newRect.right - canvasRect.left;
        revEndY = newRect.top + newRect.height * 0.72 - canvasRect.top; // Lower portion of newNode
      } else {
        revEndX = canvasRect.width / 2 + 60;
        revEndY = canvasRect.height - 80;
      }

      var rcp1x, rcp1y, rcp2x, rcp2y;
      if (isMobile2) {
        rcp1x = revStartX - 49;  rcp1y = revStartY + 70;   
        rcp2x = revEndX + 96;    rcp2y = revEndY - 96;     
      } else {
        rcp1x = revStartX - 105; rcp1y = revStartY + 105; 
        rcp2x = revEndX + 192;   rcp2y = revEndY - 160;   
      }

      var dPrev = 'M ' + revStartX + ' ' + revStartY
        + ' C ' + rcp1x + ' ' + rcp1y + ', ' + rcp2x + ' ' + rcp2y + ', ' + revEndX + ' ' + revEndY;

      pathPrev.setAttribute('d', dPrev);
      var lenPrev;
      try { lenPrev = pathPrev.getTotalLength(); } catch(e) { lenPrev = 500; }
      if (!lenPrev || lenPrev < 1) lenPrev = 500;

      pathPrev.style.transition       = 'none';
      pathPrev.style.strokeDasharray  = lenPrev + 'px';
      pathPrev.style.strokeDashoffset = lenPrev + 'px';
      pathPrev.style.opacity          = '1';

      // Traveling amber dot
      var dot2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot2.setAttribute('r', '5');
      dot2.setAttribute('fill', '#f59e0b');
      dot2.classList.add('viz-travel-dot');
      dot2.style.filter = 'drop-shadow(0 0 4px rgba(245,158,11,0.8))';
      svg.appendChild(dot2);

      var duration2  = 850;
      var startTime2 = null;

      function animateDot2(ts) {
        if (!startTime2) startTime2 = ts;
        var elapsed  = ts - startTime2;
        var progress = Math.min(elapsed / duration2, 1);
        var eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        try {
          var pt = pathPrev.getPointAtLength(eased * lenPrev);
          dot2.setAttribute('cx', pt.x);
          dot2.setAttribute('cy', pt.y);
        } catch (err) {}
        if (progress < 1) {
          requestAnimationFrame(animateDot2);
        } else {
          setTimeout(function () {
            if (dot2.parentNode) dot2.parentNode.removeChild(dot2);
          }, 150);
        }
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          pathPrev.style.transition       = 'stroke-dashoffset ' + (duration2 / 1000) + 's cubic-bezier(0.4,0,0.2,1)';
          pathPrev.style.strokeDashoffset = '0px';
          requestAnimationFrame(animateDot2);
        });
      });
    });
  });
}

// ── Step 7: head = newNode — rearrange all nodes ────────────────
function anim_rearrange() {
  // Retract curve
  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (svg && path) {
    var len;
    try { len = path.getTotalLength(); } catch (e) { len = 500; }
    if (!len || len < 1) len = 500;
    path.style.transition       = 'stroke-dashoffset 0.4s cubic-bezier(0.4,0,0.2,1)';
    path.style.strokeDashoffset = len + 'px';
    setTimeout(function () { svg.classList.remove('visible'); }, 420);
  }

  setTimeout(function () {
    hideNewNode();
    resetHeadStyle();
    CURVE_GEOM = null;
    var fullList = [VIZ.newValue].concat(VIZ.initialList);
    setTimeout(function () { buildList(fullList, true, 0); }, 80);
  }, 440);
}

// ═══════════════════════════════════════════════════════════════
//  INSERT-AT-END ANIMATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// New-node address for insert-end (appended after existing 4 nodes)
var END_NEW_NODE_ADDR = '0x105';

function endNewNodePosition() {
  // Place new node to the RIGHT side of the canvas (near tail)
  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  var isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // On mobile: position newNode directly below the tail node
    var canvas = document.getElementById('animCanvas');
    var listRow = VIZ.el.listRow;
    var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
    var tailWrap = wraps.length > 0 ? wraps[wraps.length - 1] : null;
    var tailNodeEl = tailWrap ? tailWrap.querySelector('.viz-node') : null;

    if (canvas && tailNodeEl) {
      var canvasRect = canvas.getBoundingClientRect();
      var tailRect   = tailNodeEl.getBoundingClientRect();
      // Centre of tail node relative to canvas (accounting for scroll)
      var tailCentreX = (tailRect.left + tailRect.right) / 2 - canvasRect.left + canvas.scrollLeft;
      wrap.style.bottom    = '14px';
      wrap.style.left      = tailCentreX + 'px';
      wrap.style.transform = 'translateX(-50%)';
    } else {
      wrap.style.bottom    = '14px';
      wrap.style.left      = '72%';
      wrap.style.transform = 'translateX(-50%)';
    }
  } else {
    wrap.style.bottom    = '68px';
    wrap.style.left      = '78%';
    wrap.style.transform = 'translateX(-50%)';
  }
}

function attachNewNodeNull(fade) {
  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  var nullWrap = wrap.querySelector('.viz-new-node-null-wrap');
  if (!nullWrap) {
    nullWrap = document.createElement('div');
    nullWrap.className = 'viz-new-node-null-wrap';
    nullWrap.style.cssText = 'position:absolute; left:100%; top:0; display:flex; align-items:flex-start; opacity:0; transition:opacity 0.3s ease';
    
    var fa = document.createElement('div');
    fa.className = 'viz-arrow';
    fa.style.marginTop = '9px';
    fa.innerHTML = '<span class="viz-arrow-fwd">\u2192</span><span class="viz-arrow-bck" style="visibility:hidden">\u2190</span>';
    
    var nu = document.createElement('div');
    nu.className = 'viz-null';
    nu.style.marginTop = '9px';
    nu.textContent = 'NULL';
    
    nullWrap.appendChild(fa);
    nullWrap.appendChild(nu);
    wrap.appendChild(nullWrap);
  }
  if (fade) {
    requestAnimationFrame(function() { requestAnimationFrame(function() { nullWrap.style.opacity = '1'; }); });
  } else {
    nullWrap.style.opacity = '1';
  }
}

function fadeOldTailNull(fade) {
  var listRow = VIZ.el.listRow;
  if (!listRow) return;
  var oldTailNull = listRow.querySelector('.viz-null');
  var listArrows = listRow.querySelectorAll('.viz-arrow');
  var oldTailArrow = listArrows.length > 0 ? listArrows[listArrows.length - 1] : null;
  
  if (oldTailArrow) {
    if (fade) oldTailArrow.style.transition = 'opacity 0.3s ease';
    oldTailArrow.style.opacity = '0';
  }
  if (oldTailNull) {
    if (fade) oldTailNull.style.transition = 'opacity 0.3s ease';
    oldTailNull.style.opacity = '0';
  }
}

function animEnd_initial() {
  buildList(VIZ.initialList, false, 0);
  hideNewNode();
  hideCurve();
  // Reset newNodeAddr label back to default for insert-end
  if (VIZ.el.newNodeAddr) VIZ.el.newNodeAddr.textContent = END_NEW_NODE_ADDR;
  scrollCanvasToEndZone();
}

// Scroll canvas so tail node + newNode spawn area are both fully visible (insert-end)
function scrollCanvasToEndZone() {
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      var listRow = VIZ.el.listRow;
      if (!canvas || !listRow) return;
      var wraps = listRow.querySelectorAll('.viz-node-wrap');
      var tailWrap = wraps.length > 0 ? wraps[wraps.length - 1] : null;
      var tailNodeEl = tailWrap ? tailWrap.querySelector('.viz-node') : null;
      if (!tailNodeEl) return;
      var canvasRect = canvas.getBoundingClientRect();
      var tailRect   = tailNodeEl.getBoundingClientRect();
      // Scroll just enough so tail is fully visible + 200px gap for newNode + padding
      var overhang = tailRect.right - canvasRect.right;
      var scrollTarget = canvas.scrollLeft + overhang + 220;
      if (scrollTarget > canvas.scrollLeft) {
        canvas.scrollTo({ left: scrollTarget, behavior: 'smooth' });
        setTimeout(function () { positionPointers(); }, 380);
      }
    });
  });
}

// Mobile-only: scroll animCanvas to reveal newNode after layout settles
function scrollCanvasToNewNodeMobile() {
  if (window.innerWidth > 768) return;
  setTimeout(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      var newNodeEl = VIZ.el.newNodeEl;
      if (canvas && newNodeEl) {
        var canvasRect = canvas.getBoundingClientRect();
        var nodeRect   = newNodeEl.getBoundingClientRect();
        var scrollTarget = canvas.scrollLeft + (nodeRect.right - canvasRect.right) + 40;
        if (scrollTarget > canvas.scrollLeft) {
          canvas.scrollTo({ left: scrollTarget, behavior: 'smooth' });
          // Reposition HEAD/TAIL pointers after scroll settles
          setTimeout(function () { positionPointers(); }, 350);
        }
      }
    });
  }, 60);
}

function animEnd_malloc() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = '?';
  VIZ.el.newNodeEl.className     = 'viz-node viz-dll-node viz-node-new';
  VIZ.el.newNodeLabel.textContent = 'newNode';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';
  if (VIZ.el.newNodeAddr)      VIZ.el.newNodeAddr.textContent      = END_NEW_NODE_ADDR;

  endNewNodePosition();
  wrap.classList.remove('visible');
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      wrap.classList.add('visible');
      scrollToRightEnd();
      scrollCanvasToNewNodeMobile();
    });
  });
}

function scrollToRightEnd() {
  const container = document.querySelector('.viz-scroll-container') 
                   || document.getElementById('animCanvas')?.parentElement;

  if (!container) return;

  container.scrollTo({
    left: container.scrollWidth,
    behavior: 'smooth'
  });
}

function animEnd_assignData() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  endNewNodePosition();
  wrap.classList.add('visible');
  scrollCanvasToNewNodeMobile();
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  setTimeout(function () {
    VIZ.el.newNodeData.textContent = String(VIZ.newValue);
    VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
    VIZ.el.newNodeEl.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)';
    VIZ.el.newNodeEl.style.transform  = 'scale(1.1)';
    setTimeout(function () { VIZ.el.newNodeEl.style.transform = 'scale(1)'; }, 200);
  }, 80);
}

function animEnd_setNextNull() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';

  endNewNodePosition();
  wrap.classList.add('visible');
  scrollCanvasToNewNodeMobile();

  var nextField = VIZ.el.newNodeNextField;
  if (nextField) {
    nextField.textContent = '?';
    setTimeout(function () {
      nextField.style.transition = 'background 0.25s ease, color 0.25s ease';
      nextField.style.background = 'rgba(59,108,255,0.18)';
      nextField.style.color      = '#3b6cff';
      nextField.textContent      = 'NULL';
      setTimeout(function () {
        nextField.style.background = '';
        nextField.style.color      = '';
      }, 700);
      attachNewNodeNull(true);
    }, 120);
  }
}

function animEnd_checkNull() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = 'NULL';

  endNewNodePosition();
  wrap.classList.add('visible');
  scrollCanvasToNewNodeMobile();
  attachNewNodeNull(false);

  // Pulse TAIL pointer
  var tp = VIZ.el.tailPointer;
  if (tp) {
    tp.style.transition = 'transform 0.15s ease';
    tp.style.transform  = 'translateX(-50%) scale(1.18)';
    setTimeout(function () { tp.style.transform = 'translateX(-50%) scale(1)'; }, 300);
  }
}

// Geometry for end curves
var END_CURVE_GEOM = null;

// Step 5: tail->next = newNode (blue arrow from tail's NEXT to newNode)
function animEnd_linkNext() {
  buildList(VIZ.initialList, false, 0);

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  endNewNodePosition();
  wrap.classList.add('visible');
  scrollCanvasToNewNodeMobile();
  attachNewNodeNull(false);
  fadeOldTailNull(true);

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = 'NULL';

  // Update tail node's next field
  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  var tailWrap = wraps.length > 0 ? wraps[wraps.length - 1] : null;
  if (tailWrap) {
    var tailNextEl = tailWrap.querySelector('.viz-node-next');
    if (tailNextEl) {
      tailNextEl.style.transition = 'background 0.25s ease, color 0.25s ease';
      tailNextEl.style.background = 'rgba(59,108,255,0.18)';
      tailNextEl.style.color      = '#3b6cff';
      tailNextEl.textContent      = END_NEW_NODE_ADDR;
      setTimeout(function () {
        tailNextEl.style.background = '';
        tailNextEl.style.color      = '';
      }, 900);
    }
  }

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
      var scrollLeft = canvas.scrollLeft || 0;
      var newNodeEl  = VIZ.el.newNodeEl;
      var newRect    = newNodeEl ? newNodeEl.getBoundingClientRect() : null;

      // Source: RIGHT side of tail node (upper portion)
      var tailNodeEl = tailWrap ? tailWrap.querySelector('.viz-node') : null;
      var startX, startY;
      if (tailNodeEl) {
        var tr = tailNodeEl.getBoundingClientRect();
        startX = tr.right  - canvasRect.left + scrollLeft;
        startY = tr.top + tr.height * 0.28 - canvasRect.top;
      } else {
        startX = canvasRect.width * 0.75;
        startY = canvasRect.height * 0.38;
      }

      // Target: LEFT side of newNode (upper portion)
      var endX, endY;
      if (newRect) {
        endX = newRect.left  - canvasRect.left + scrollLeft;
        endY = newRect.top + newRect.height * 0.28 - canvasRect.top;
      } else {
        endX = canvasRect.width * 0.85;
        endY = canvasRect.height - 100;
      }

      var isMobile = window.innerWidth <= 768;

      // Blue bezier: arc UP from tail-right to newNode-left
      var cp1x, cp1y, cp2x, cp2y;
      if (isMobile) {
        cp1x = startX + 100; cp1y = startY + 50;
        cp2x = endX - 80;    cp2y = endY - 50;
      } else {
        cp1x = startX + 200; cp1y = startY + 80;
        cp2x = endX - 160;   cp2y = endY - 80;
      }

      var d = 'M ' + startX + ' ' + startY
        + ' C ' + cp1x + ' ' + cp1y + ', ' + cp2x + ' ' + cp2y + ', ' + endX + ' ' + endY;

      path.setAttribute('d', d);
      END_CURVE_GEOM = { startX: startX, startY: startY, endX: endX, endY: endY, cp1x: cp1x, cp1y: cp1y, cp2x: cp2x, cp2y: cp2y };

      svg.classList.add('visible');

      var len;
      try { len = path.getTotalLength(); } catch (e) { len = 500; }
      if (!len || len < 1) len = 500;

      path.style.transition       = 'none';
      path.style.strokeDasharray  = len + 'px';
      path.style.strokeDashoffset = len + 'px';

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
        var eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        try {
          var pt = path.getPointAtLength(eased * len);
          dot.setAttribute('cx', pt.x);
          dot.setAttribute('cy', pt.y);
        } catch (err) {}
        if (progress < 1) {
          requestAnimationFrame(animateDot);
        } else {
          setTimeout(function () { if (dot.parentNode) dot.parentNode.removeChild(dot); }, 150);
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

// Step 6: newNode->prev = tail (ORANGE — parallel above blue, inside on second turn)
function animEnd_linkPrev() {
  buildList(VIZ.initialList, false, 0);

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;

  endNewNodePosition();
  wrap.classList.add('visible');
  scrollCanvasToNewNodeMobile();
  attachNewNodeNull(false);
  fadeOldTailNull(false);

  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = 'NULL';

  var listRow = VIZ.el.listRow;
  var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
  var tailWrap = wraps.length > 0 ? wraps[wraps.length - 1] : null;

  if (tailWrap) {
    var tailNextEl = tailWrap.querySelector('.viz-node-next');
    if (tailNextEl) tailNextEl.textContent = END_NEW_NODE_ADDR;
  }

  var tailAddr = PTR.nodeList.length > 0 ? PTR.nodeList[PTR.nodeList.length - 1].address : 'NULL';
  var prevField = VIZ.el.newNodePrevField;

  if (prevField) {
    prevField.textContent = '?';
    setTimeout(function () {
      prevField.style.transition = 'background 0.25s ease, color 0.25s ease';
      prevField.style.background = 'rgba(245,158,11,0.25)';
      prevField.style.color = '#d97706';
      prevField.textContent = tailAddr;
      setTimeout(function () {
        prevField.style.background = '';
        prevField.style.color = '';
      }, 900);
    }, 120);
  }

  var svg = VIZ.el.curveSvg;
  var pathPrev = VIZ.el.curvePathPrev;
  if (!svg || !pathPrev) return;

  var oldDot = svg.querySelector('.viz-travel-dot');
  if (oldDot) oldDot.parentNode.removeChild(oldDot);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {

      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;

      var canvasRect = canvas.getBoundingClientRect();
      var scrollLeft = canvas.scrollLeft || 0;
      var newRect = VIZ.el.newNodeEl.getBoundingClientRect();
      var tailNodeEl = tailWrap ? tailWrap.querySelector('.viz-node') : null;
      var tr = tailNodeEl.getBoundingClientRect();

      // START: left side of newNode, below centre
      var startX = newRect.left  - canvasRect.left + scrollLeft;
      var startY = newRect.top   + newRect.height * 0.72 - canvasRect.top;

      // END: right side of tail, below centre
      var endX = tr.right - canvasRect.left + scrollLeft;
      var endY = tr.top   + tr.height * 0.72 - canvasRect.top;

      // Mirror blue S-shape reversed + above (mobile/desktop)
      var isMobile = window.innerWidth <= 768;
      var cp1x, cp1y, cp2x, cp2y;
      if (isMobile) {
        cp1x = startX - 112; cp1y = startY - 105;
        cp2x = endX   + 108; cp2y = endY   + 10;
      } else {
        cp1x = startX - 195; cp1y = startY - 120;
        cp2x = endX   + 185; cp2y = endY   + 40;
      }

      var d = 'M ' + startX + ' ' + startY +
              ' C ' + cp1x + ' ' + cp1y + ', ' +
              cp2x + ' ' + cp2y + ', ' +
              endX + ' ' + endY;

      pathPrev.setAttribute('d', d);

      var len;
      try { len = pathPrev.getTotalLength(); } catch (e) { len = 500; }

      pathPrev.style.transition = 'none';
      pathPrev.style.strokeDasharray = len + 'px';
      pathPrev.style.strokeDashoffset = len + 'px';
      pathPrev.style.opacity = '1';

      var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '5');
      dot.setAttribute('fill', '#f59e0b');
      dot.classList.add('viz-travel-dot');
      svg.appendChild(dot);

      var duration = 850;
      var startTime = null;

      function animate(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        try {
          var pt = pathPrev.getPointAtLength(eased * len);
          dot.setAttribute('cx', pt.x);
          dot.setAttribute('cy', pt.y);
        } catch (e) {}
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(function () {
            if (dot.parentNode) dot.parentNode.removeChild(dot);
          }, 150);
        }
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          pathPrev.style.transition =
            'stroke-dashoffset ' + (duration / 1000) + 's cubic-bezier(0.4,0,0.2,1)';
          pathPrev.style.strokeDashoffset = '0px';
          requestAnimationFrame(animate);
        });
      });

    });
  });
}

// Step 7: tail = newNode — rearrange all nodes
function animEnd_rearrange() {
  var svg  = VIZ.el.curveSvg;
  var path = VIZ.el.curvePath;
  if (svg && path) {
    var len;
    try { len = path.getTotalLength(); } catch (e) { len = 500; }
    if (!len || len < 1) len = 500;
    path.style.transition       = 'stroke-dashoffset 0.4s cubic-bezier(0.4,0,0.2,1)';
    path.style.strokeDashoffset = len + 'px';
    setTimeout(function () { svg.classList.remove('visible'); }, 420);
  }

  setTimeout(function () {
    hideNewNode();
    END_CURVE_GEOM = null;
    var fullList = VIZ.initialList.concat([VIZ.newValue]);
    // Tail will be the last index = fullList.length - 1
    setTimeout(function () { buildList(fullList, true, 0); }, 80);
  }, 440);
}


function showToast(msg) {
  var existing = document.getElementById('vizToast');
  if (existing) existing.parentNode.removeChild(existing);
  var toast = document.createElement('div');
  toast.id = 'vizToast';
  toast.textContent = msg;
  toast.style.cssText = [
    'position:fixed', 'bottom:32px', 'left:50%',
    'transform:translateX(-50%)',
    'background:#1e293b', 'color:#fff',
    'font-family:var(--font,"DM Sans",sans-serif)',
    'font-size:13px', 'font-weight:600',
    'padding:10px 20px', 'border-radius:10px',
    'box-shadow:0 4px 20px rgba(0,0,0,0.25)',
    'z-index:9999', 'opacity:0',
    'transition:opacity 0.2s ease',
    'pointer-events:none', 'white-space:nowrap'
  ].join(';');
  document.body.appendChild(toast);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { toast.style.opacity = '1'; });
  });
  setTimeout(function () {
    toast.style.opacity = '0';
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 220);
  }, 2800);
}

function vizConfirmValues() {
  // Read value
  var inputEl = VIZ.el.vizValueInput;
  if (inputEl && inputEl.value !== '') {
    var v = parseInt(inputEl.value);
    if (!isNaN(v)) VIZ.newValue = v;
  }

  // For insert-middle: validate position (0-indexed)
  if (mode === 'insert-middle') {
    var posEl = VIZ.el.vizPosInput;
    var p = posEl && posEl.value !== '' ? parseInt(posEl.value) : VIZ.insertPos;

    var listLen = VIZ.initialList.length; // 4 nodes
    // Valid 0-based middle range: index 1 .. listLen-2
    // (index 0 = beginning, index listLen-1 = end, index listLen = after end)

    if (isNaN(p) || p < 0) {
      showToast('\u26a0\ufe0f Enter a valid index (1 to ' + (listLen - 1) + ')');
      return;
    }
    if (p === 0) {
      showToast('\u{1F449} Index 0 = Insert at Beginning — use that operation instead!');
      return;
    }
    if (p >= listLen) {
      showToast('\u{1F449} Index ' + p + ' = Insert at End — use that operation instead!');
      return;
    }
    // Convert 0-based index to internal 1-based pos used by animation logic
    VIZ.insertPos = p + 1;
  }

  // Full reset then jump to step 1
  stopPlay();
  hideCurve();
  hideNewNode();
  hideLoopBox();
  removeTempPointer();
  hideTempPointer();
  buildList(VIZ.initialList, false, 0);
  VIZ.currentStep = 0;
  applyStep(1);

  // For insert-end: scroll to show tail + newNode zone after layout settles
  if (mode === 'insert-end') {
    setTimeout(scrollCanvasToEndZone, 80);
  }
}

function vizNext() {
  if (VIZ.currentStep < VIZ.totalSteps) {
    // Sync newValue from input before step 2 shows it
var inputEl = VIZ.el.vizValueInput;
    if (inputEl && inputEl.value !== '') {
      var v = parseInt(inputEl.value);
      if (!isNaN(v)) VIZ.newValue = v;
    }
    if (mode === 'insert-middle' && VIZ.el.vizPosInput && VIZ.el.vizPosInput.value !== '') {
      var p = parseInt(VIZ.el.vizPosInput.value);
      // p is 0-based index; convert to internal 1-based pos
      if (!isNaN(p) && p >= 0) VIZ.insertPos = p + 1;
    }
    applyStep(VIZ.currentStep + 1);
  } else {
    stopPlay();
  }
}

function vizPrev() {
  if (VIZ.currentStep > 0) {
    applyStep(VIZ.currentStep - 1);
  }
}

function vizReset() {
  if (VIZ.el.tempPointer) {
    VIZ.el.tempPointer.style.display = 'none';
    VIZ.el.tempPointer.style.opacity = '0';
  }
  stopPlay();
  VIZ.currentStep = 0;
  VIZ.newValue    = 0;
  if (VIZ.el.vizValueInput) VIZ.el.vizValueInput.value = '';
  if (VIZ.el.vizPosInput) VIZ.el.vizPosInput.value = '';
  hideCurve();
  hideLoopBox();
  removeTempPointer();  // FIX #2: cleans dynamic TEMP_PTR_EL
  hideTempPointer();    // FIX #2: cleans cached VIZ.el.tempPointer
  hideNewNode();
  buildList(VIZ.initialList, false, 0);
  applyStep(0);
}

function vizTogglePlay() {
  if (VIZ.isPlaying) {
    stopPlay();
  } else {
    startPlay();
  }
}

function startPlay() {
  if (VIZ.currentStep >= VIZ.totalSteps) vizReset();
  VIZ.isPlaying = true;
  var btn = VIZ.el.btnPlay;
  if (btn) btn.classList.add('playing');
  if (VIZ.el.playIcon)  VIZ.el.playIcon.style.display  = 'none';
  if (VIZ.el.pauseIcon) VIZ.el.pauseIcon.style.display = '';
  if (VIZ.el.playLabel) VIZ.el.playLabel.textContent = 'Pause';
  scheduleNext();
}

function stopPlay() {
  VIZ.isPlaying = false;
  clearTimeout(VIZ.playTimer);
  var btn = VIZ.el.btnPlay;
  if (btn) btn.classList.remove('playing');
  if (VIZ.el.playIcon)  VIZ.el.playIcon.style.display  = '';
  if (VIZ.el.pauseIcon) VIZ.el.pauseIcon.style.display = 'none';
  if (VIZ.el.playLabel) VIZ.el.playLabel.textContent = 'Play';
}

function scheduleNext() {
  if (!VIZ.isPlaying) return;
  VIZ.playTimer = setTimeout(function () {
    if (!VIZ.isPlaying) return;
    if (VIZ.currentStep < VIZ.totalSteps) {
      vizNext();
      scheduleNext();
    } else {
      stopPlay();
    }
  }, VIZ.playDelay);
}

// ═══════════════════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', function (e) {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  switch (e.key) {
    case 'ArrowRight': case 'ArrowDown':  e.preventDefault(); vizNext();        break;
    case 'ArrowLeft':  case 'ArrowUp':    e.preventDefault(); vizPrev();        break;
    case ' ':                             e.preventDefault(); vizTogglePlay();  break;
    case 'r': case 'R':                                       vizReset();       break;
  }
});

// ═══════════════════════════════════════════════════════════════
//  LOOP BOX — updateLoopBox / hideLoopBox
// ═══════════════════════════════════════════════════════════════
function updateLoopBox(i, pos) {
  var box = document.getElementById('loopCheckBox');
  if (!box) return;
  var isTrue = (i < pos - 1);
  box.classList.remove('loop-true', 'loop-false', 'state-change');
  void box.offsetWidth; // force reflow for animation
  box.innerHTML =
    'i=' + i + ' &lt; pos-1=' + (pos - 1) +
    ' &nbsp;\u2192&nbsp; ' +
    '<span style="font-weight:700">' + (isTrue ? '\u2713 TRUE (loop)' : '\u2717 FALSE (exit)') + '</span>';
  box.classList.add('active', isTrue ? 'loop-true' : 'loop-false', 'state-change');
}

function hideLoopBox() {
  var box = document.getElementById('loopCheckBox');
  if (!box) return;
  box.classList.remove('active', 'loop-true', 'loop-false');
}

// ═══════════════════════════════════════════════════════════════
//  TEMP POINTER — create/move/remove animated label
//  FIX #1: unified into one system using TEMP_PTR_EL (dynamic)
//  The cached VIZ.el.tempPointer is the HTML-resident element;
//  middle-mode now uses placeTempPointerOnNode consistently.
// ═══════════════════════════════════════════════════════════════
var TEMP_PTR_EL = null;

function createTempPointer() {
  if (!TEMP_PTR_EL) {
    TEMP_PTR_EL = document.createElement('div');
    TEMP_PTR_EL.id = 'tempPointerDynamic';
    TEMP_PTR_EL.style.cssText = [
      'position:absolute',
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'gap:2px',
      'pointer-events:none',
      'z-index:90',
      'transition:left 0.45s cubic-bezier(0.4,0,0.2,1), top 0.45s cubic-bezier(0.4,0,0.2,1)',
      'opacity:0'
    ].join(';');
    TEMP_PTR_EL.innerHTML =
      '<div class="viz-ptr-label viz-ptr-label-temp">temp</div>' +
      '<div class="viz-ptr-addr viz-ptr-addr-temp" id="tempAddrDynamic">0x...</div>' +
      '<div class="viz-ptr-arrow viz-ptr-arrow-temp">\u2193</div>';
    var canvas = document.getElementById('animCanvas');
    if (canvas) canvas.appendChild(TEMP_PTR_EL);
  }
  return TEMP_PTR_EL;
}

function removeTempPointer() {
  if (TEMP_PTR_EL) {
    TEMP_PTR_EL.style.opacity = '0';
    setTimeout(function () {
      if (TEMP_PTR_EL && TEMP_PTR_EL.parentNode) {
        TEMP_PTR_EL.parentNode.removeChild(TEMP_PTR_EL);
      }
      TEMP_PTR_EL = null;
    }, 300);
  }
}

// FIX #1 & #4: placeTempPointerOnNode — authoritative fn for all modes.
// Uses rAF double-pump so DOM is painted before measuring rects.
function placeTempPointerOnNode(nodeIndex) {
  var el = createTempPointer();
  var canvas = document.getElementById('animCanvas');
  var listRow = VIZ.el.listRow;
  if (!canvas || !listRow) return;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var wraps = listRow.querySelectorAll('.viz-node-wrap');
      var wrap = wraps[nodeIndex];
      if (!wrap) return;

      var canvasRect = canvas.getBoundingClientRect();
      var wrapRect = wrap.querySelector('.viz-node').getBoundingClientRect();

      var cx = wrapRect.left + wrapRect.width / 2 - canvasRect.left + (canvas.scrollLeft || 0);
      var topY = wrapRect.top - canvasRect.top - (VIZ.el.headPointer ? VIZ.el.headPointer.getBoundingClientRect().height + 4 : 42);

      // First placement: no transition
      if (el.style.opacity === '0') {
        el.style.transition = 'none';
        el.style.left = (cx - 20) + 'px';
        el.style.top  = topY + 'px';
        void el.offsetWidth;
        el.style.transition = 'left 0.45s cubic-bezier(0.4,0,0.2,1), top 0.45s cubic-bezier(0.4,0,0.2,1)';
        el.style.opacity = '1';
      } else {
        // Animated move
        el.style.left = (cx - 20) + 'px';
        el.style.top  = topY + 'px';
      }

      var addrEl = el.querySelector('#tempAddrDynamic');
      if (addrEl && PTR.nodeList[nodeIndex]) {
        addrEl.textContent = PTR.nodeList[nodeIndex].address;
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
//  INSERT-AT-MIDDLE ANIMATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// Places newNodeWrap dynamically between temp node (insertPos-2) and next node (insertPos-1)
// Matches the slight rightward bias that looks good at position=2.
// Also auto-scrolls canvas right when insertPos is near the tail.
function midPositionNewNode(wrap) {
  if (!wrap) return;
  var isMobile = window.innerWidth <= 768;
  wrap.style.bottom = isMobile ? '14px' : '68px';
  wrap.style.transform = '';

  var canvas = document.getElementById('animCanvas');
  var listRow = VIZ.el.listRow;
  if (!canvas || !listRow) {
    // Fallback
    wrap.style.left = '50%';
    wrap.style.transform = 'translateX(-50%)';
    return;
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var wraps = listRow.querySelectorAll('.viz-node-wrap');
      var tempWrap = wraps[VIZ.insertPos - 2]; // node BEFORE insertion point
      var nextWrap = wraps[VIZ.insertPos - 1]; // node AFTER insertion point
      if (!tempWrap || !nextWrap) {
        wrap.style.left = '50%';
        wrap.style.transform = 'translateX(-50%)';
        return;
      }

      var canvasRect = canvas.getBoundingClientRect();
      var scrollLeft = canvas.scrollLeft || 0;

      var tempNode = tempWrap.querySelector('.viz-node');
      var nextNode = nextWrap.querySelector('.viz-node');
      var tempRect = tempNode.getBoundingClientRect();
      var nextRect = nextNode.getBoundingClientRect();

      // Centre of gap between the two nodes
      var tempCentreX = tempRect.left + tempRect.width / 2 - canvasRect.left + scrollLeft;
      var nextCentreX = nextRect.left + nextRect.width / 2 - canvasRect.left + scrollLeft;
      var gapCentreX  = (tempCentreX + nextCentreX) / 2;

      // Same rightward bias as position=2 naturally has (~30px toward next node)
      var BIAS = 30;
      var targetX = gapCentreX + BIAS;

      wrap.style.left      = targetX + 'px';
      wrap.style.transform = 'translateX(-50%)';

      // Auto-scroll canvas right if insertion is near tail (insertPos >= 3)
      if (VIZ.insertPos >= 3) {
        var newWrapEl = wrap.querySelector('.viz-node');
        if (newWrapEl) {
          var newRect2 = newWrapEl.getBoundingClientRect();
          var canvasRight = canvasRect.right;
          if (newRect2.right + 80 > canvasRight) {
            canvas.scrollTo({ left: canvas.scrollLeft + (newRect2.right + 80 - canvasRight), behavior: 'smooth' });
            setTimeout(function () { positionPointers(); }, 350);
          }
        }
      }
    });
  });
}

function animMid_initTemp() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  hideLoopBox();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';

  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  midPositionNewNode(wrap);
  wrap.classList.add('visible');

  // FIX #4: place temp pointer after rAF so DOM is painted (handled inside placeTempPointerOnNode)
  placeTempPointerOnNode(0);
}

function animMid_loopCheckTrue() {
  animMid_initTemp();
  updateLoopBox(1, VIZ.insertPos);
}

function animMid_tempMove() {
  // FIX #4: rebuild list first, then move pointer inside rAF via placeTempPointerOnNode
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  hideLoopBox();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';
  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  midPositionNewNode(wrap);
  wrap.classList.add('visible');

  updateLoopBox(1, VIZ.insertPos);
  placeTempPointerOnNode(VIZ.insertPos - 2);
}

function animMid_loopCheckFalse() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();

  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';
  var isMobile = window.innerWidth <= 768; wrap.style.bottom = isMobile ? '14px' : '68px';
  midPositionNewNode(wrap);
  wrap.classList.add('visible');

  placeTempPointerOnNode(VIZ.insertPos - 2);
  updateLoopBox(2, VIZ.insertPos);
}

// Shared helper: animate a mid-link path with traveling dot (same style as insert-beginning)
function animateMidPath(svg, path, color, onComplete) {
  var len;
  try { len = path.getTotalLength(); } catch(e) { len = 600; }
  if (!len || len < 1) len = 600;

  path.style.transition       = 'none';
  path.style.strokeDasharray  = len + 'px';
  path.style.strokeDashoffset = len + 'px';

  var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('r', '5');
  dot.setAttribute('fill', color);
  dot.classList.add('viz-travel-dot');
  var shadowColor = color === '#3b6cff' ? 'rgba(59,108,255,0.75)' : 'rgba(245,158,11,0.75)';
  dot.style.filter = 'drop-shadow(0 0 5px ' + shadowColor + ')';
  svg.appendChild(dot);

  var duration  = 850;
  var startTime = null;

  function animateDot(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    try {
      var pt = path.getPointAtLength(eased * len);
      dot.setAttribute('cx', pt.x);
      dot.setAttribute('cy', pt.y);
    } catch(e) {}
    if (progress < 1) {
      requestAnimationFrame(animateDot);
    } else {
      setTimeout(function () {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
        if (onComplete) onComplete();
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
}

// Shared state setup for all link steps (no chain calls, no hideCurve)
function midLinkSetup() {
  buildList(VIZ.initialList, false, 0);
  hideLoopBox();
  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  var isMobile = window.innerWidth <= 768;
  wrap.style.bottom = isMobile ? '14px' : '68px';
  midPositionNewNode(wrap);
  wrap.classList.add('visible');
  placeTempPointerOnNode(VIZ.insertPos - 2);

  // Restore field values from previous steps
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent =
    PTR.nodeList[VIZ.insertPos - 1] ? PTR.nodeList[VIZ.insertPos - 1].address : '?';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent =
    PTR.nodeList[VIZ.insertPos - 2] ? PTR.nodeList[VIZ.insertPos - 2].address : '?';
}

function fadeOutMidLink(arrowIndex, isForward, instant) {
  var listRow = VIZ.el.listRow;
  if (!listRow) return;
  var arrows = listRow.querySelectorAll('.viz-arrow');
  if (arrowIndex >= 0 && arrowIndex < arrows.length) {
    var arrowEl = arrows[arrowIndex];
    var targetSpan = arrowEl.querySelector(isForward ? '.viz-arrow-fwd' : '.viz-arrow-bck');
    if (targetSpan) {
      if (!instant) {
        targetSpan.style.transition = 'opacity 0.3s ease';
      } else {
        targetSpan.style.transition = 'none';
      }
      targetSpan.style.opacity = '0';
      if (instant) targetSpan.style.visibility = 'hidden';
      else {
        setTimeout(function() {
          targetSpan.style.visibility = 'hidden';
        }, 300);
      }
    }
  }
}

function animMid_link1() {
  buildList(VIZ.initialList, false, 0);
  hideLoopBox();
  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent = '?';
  var isMobile = window.innerWidth <= 768;
  wrap.style.bottom = isMobile ? '14px' : '68px';
  midPositionNewNode(wrap);
  wrap.classList.add('visible');
  placeTempPointerOnNode(VIZ.insertPos - 2);

  // Clear any existing mid-link paths from previous visits to this step
  var svg = VIZ.el.curveSvg;
  if (!svg) return;
  var old = svg.querySelectorAll('.viz-mid-link');
  for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
  svg.classList.add('visible');

  var arrowHead = document.getElementById('arrowHead');
  if (arrowHead) {
    arrowHead.setAttribute('viewBox', '0 0 10 10');
    arrowHead.setAttribute('markerWidth', '5');
    arrowHead.setAttribute('markerHeight', '5');
    arrowHead.setAttribute('refX', '8');
    arrowHead.setAttribute('refY', '5');
    var p = arrowHead.querySelector('path');
    if (p) p.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;
      var canvasRect = canvas.getBoundingClientRect();
      var scrollLeft = canvas.scrollLeft || 0;
      var listRow = VIZ.el.listRow;
      var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
      var nextNodeWrap = wraps[VIZ.insertPos - 1];
      if (!VIZ.el.newNodeEl || !nextNodeWrap) return;

      const newRect  = VIZ.el.newNodeEl.getBoundingClientRect();
      const nextNodeEl = nextNodeWrap.querySelector('.viz-node');
      const nextRect = nextNodeEl.getBoundingClientRect();

      const startX = newRect.right - canvasRect.left + scrollLeft;
      const startY = newRect.top + (newRect.height * 0.20) - canvasRect.top;
      const endX   = nextRect.left - canvasRect.left + scrollLeft;
      const endY   = nextRect.top + (nextRect.height * 0.20) - canvasRect.top;
      const cp1x = startX + 30; const cp1y = startY - 50;
      const cp2x = endX - 60;   const cp2y = endY + 50;
      const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'viz-mid-link');
      path.setAttribute('d', d);
      path.setAttribute('stroke', '#3b6cff');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', 'url(#arrowHead)');
      svg.appendChild(path);

      animateMidPath(svg, path, '#3b6cff', function () {
        if (VIZ.el.newNodeNextField)
          VIZ.el.newNodeNextField.textContent = PTR.nodeList[VIZ.insertPos - 1] ? PTR.nodeList[VIZ.insertPos - 1].address : '0x103';
      });
    });
  });
}

function animMid_link2() {
  // Restore state: list + newNode + keep link1 path, add link2 path only
  buildList(VIZ.initialList, false, 0);
  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent = '?';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent =
    PTR.nodeList[VIZ.insertPos - 1] ? PTR.nodeList[VIZ.insertPos - 1].address : '?';
  var isMobile = window.innerWidth <= 768;
  wrap.style.bottom = isMobile ? '14px' : '68px';
  midPositionNewNode(wrap);
  wrap.classList.add('visible');
  placeTempPointerOnNode(VIZ.insertPos - 2);

  var svg = VIZ.el.curveSvg;
  if (!svg) return;

  // Remove all mid-link paths and redraw link1 as static + animate link2
  var old = svg.querySelectorAll('.viz-mid-link');
  for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
  svg.classList.add('visible');

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;
      var canvasRect = canvas.getBoundingClientRect();
      var scrollLeft = canvas.scrollLeft || 0;
      var listRow = VIZ.el.listRow;
      var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
      var nextNodeWrap = wraps[VIZ.insertPos - 1];
      var tempWrap     = wraps[VIZ.insertPos - 2];
      if (!VIZ.el.newNodeEl || !nextNodeWrap || !tempWrap) return;

      const newRect    = VIZ.el.newNodeEl.getBoundingClientRect();
      const nextNodeEl = nextNodeWrap.querySelector('.viz-node');
      const nextRect   = nextNodeEl.getBoundingClientRect();
      const tempNodeEl = tempWrap.querySelector('.viz-node');
      const tempRect   = tempNodeEl.getBoundingClientRect();

      // --- Draw link1 static (already completed) ---
      var arrowHead = document.getElementById('arrowHead');
      if (arrowHead) {
        arrowHead.setAttribute('viewBox','0 0 10 10'); arrowHead.setAttribute('markerWidth','5');
        arrowHead.setAttribute('markerHeight','5'); arrowHead.setAttribute('refX','8'); arrowHead.setAttribute('refY','5');
        var ap = arrowHead.querySelector('path'); if (ap) ap.setAttribute('d','M 0 0 L 10 5 L 0 10 z');
      }
      (function() {
        const sx = newRect.right - canvasRect.left + scrollLeft;
        const sy = newRect.top + (newRect.height * 0.20) - canvasRect.top;
        const ex = nextRect.left - canvasRect.left + scrollLeft;
        const ey = nextRect.top + (nextRect.height * 0.20) - canvasRect.top;
        var p1 = document.createElementNS('http://www.w3.org/2000/svg','path');
        p1.setAttribute('class','viz-mid-link');
        p1.setAttribute('d',`M ${sx} ${sy} C ${sx+30} ${sy-50}, ${ex-60} ${ey+50}, ${ex} ${ey}`);
        p1.setAttribute('stroke','#3b6cff'); p1.setAttribute('stroke-width','2');
        p1.setAttribute('fill','none'); p1.setAttribute('marker-end','url(#arrowHead)');
        svg.appendChild(p1);
      })();

      // --- Animate link2 ---
      var arrowHeadPrev = document.getElementById('arrowHeadPrev');
      if (arrowHeadPrev) {
        arrowHeadPrev.setAttribute('viewBox','0 0 10 10'); arrowHeadPrev.setAttribute('markerWidth','5');
        arrowHeadPrev.setAttribute('markerHeight','5'); arrowHeadPrev.setAttribute('refX','8'); arrowHeadPrev.setAttribute('refY','5');
        var ap2 = arrowHeadPrev.querySelector('path'); if (ap2) ap2.setAttribute('d','M 0 0 L 10 5 L 0 10 z');
      }
      const sx2 = newRect.left - canvasRect.left + scrollLeft;
      const sy2 = newRect.top + (newRect.height * 0.80) - canvasRect.top;
      const ex2 = tempRect.right - canvasRect.left + scrollLeft;
      const ey2 = tempRect.top + (tempRect.height * 0.80) - canvasRect.top;
      var p2 = document.createElementNS('http://www.w3.org/2000/svg','path');
      p2.setAttribute('class','viz-mid-link');
      p2.setAttribute('d',`M ${sx2} ${sy2} C ${sx2-80} ${sy2-50}, ${ex2+30} ${ey2+50}, ${ex2} ${ey2}`);
      p2.setAttribute('stroke','#f59e0b'); p2.setAttribute('stroke-width','2');
      p2.setAttribute('fill','none'); p2.setAttribute('marker-end','url(#arrowHeadPrev)');
      svg.appendChild(p2);

      animateMidPath(svg, p2, '#f59e0b', function () {
        if (VIZ.el.newNodePrevField)
          VIZ.el.newNodePrevField.textContent = PTR.nodeList[VIZ.insertPos - 2] ? PTR.nodeList[VIZ.insertPos - 2].address : '0x102';
      });
    });
  });
}

function animMid_link3() {
  buildList(VIZ.initialList, false, 0);
  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent =
    PTR.nodeList[VIZ.insertPos - 1] ? PTR.nodeList[VIZ.insertPos - 1].address : '?';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent =
    PTR.nodeList[VIZ.insertPos - 2] ? PTR.nodeList[VIZ.insertPos - 2].address : '?';
  var isMobile = window.innerWidth <= 768;
  wrap.style.bottom = isMobile ? '14px' : '68px';
  midPositionNewNode(wrap);
  wrap.classList.add('visible');
  placeTempPointerOnNode(VIZ.insertPos - 2);

  fadeOutMidLink(VIZ.insertPos - 2, false, false); // fade out BACKWARD link

  var svg = VIZ.el.curveSvg;
  if (!svg) return;
  var old = svg.querySelectorAll('.viz-mid-link');
  for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
  svg.classList.add('visible');

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;
      var canvasRect = canvas.getBoundingClientRect();
      var scrollLeft = canvas.scrollLeft || 0;
      var listRow = VIZ.el.listRow;
      var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
      var nextNodeWrap = wraps[VIZ.insertPos - 1];
      var tempWrap     = wraps[VIZ.insertPos - 2];
      if (!VIZ.el.newNodeEl || !nextNodeWrap || !tempWrap) return;

      const newRect    = VIZ.el.newNodeEl.getBoundingClientRect();
      const nextNodeEl = nextNodeWrap.querySelector('.viz-node');
      const nextRect   = nextNodeEl.getBoundingClientRect();
      const tempNodeEl = tempWrap.querySelector('.viz-node');
      const tempRect   = tempNodeEl.getBoundingClientRect();

      // Static link1 (blue)
      var arrowHead = document.getElementById('arrowHead');
      if (arrowHead) {
        arrowHead.setAttribute('viewBox','0 0 10 10'); arrowHead.setAttribute('markerWidth','5');
        arrowHead.setAttribute('markerHeight','5'); arrowHead.setAttribute('refX','8'); arrowHead.setAttribute('refY','5');
        var ap = arrowHead.querySelector('path'); if (ap) ap.setAttribute('d','M 0 0 L 10 5 L 0 10 z');
      }
      (function() {
        const sx = newRect.right - canvasRect.left + scrollLeft;
        const sy = newRect.top + (newRect.height * 0.20) - canvasRect.top;
        const ex = nextRect.left - canvasRect.left + scrollLeft;
        const ey = nextRect.top + (nextRect.height * 0.20) - canvasRect.top;
        var p1 = document.createElementNS('http://www.w3.org/2000/svg','path');
        p1.setAttribute('class','viz-mid-link');
        p1.setAttribute('d',`M ${sx} ${sy} C ${sx+30} ${sy-50}, ${ex-60} ${ey+50}, ${ex} ${ey}`);
        p1.setAttribute('stroke','#3b6cff'); p1.setAttribute('stroke-width','2');
        p1.setAttribute('fill','none'); p1.setAttribute('marker-end','url(#arrowHead)');
        svg.appendChild(p1);
      })();

      // Static link2 (amber)
      var arrowHeadPrev = document.getElementById('arrowHeadPrev');
      if (arrowHeadPrev) {
        arrowHeadPrev.setAttribute('viewBox','0 0 10 10'); arrowHeadPrev.setAttribute('markerWidth','5');
        arrowHeadPrev.setAttribute('markerHeight','5'); arrowHeadPrev.setAttribute('refX','8'); arrowHeadPrev.setAttribute('refY','5');
        var ap2 = arrowHeadPrev.querySelector('path'); if (ap2) ap2.setAttribute('d','M 0 0 L 10 5 L 0 10 z');
      }
      (function() {
        const sx = newRect.left - canvasRect.left + scrollLeft;
        const sy = newRect.top + (newRect.height * 0.80) - canvasRect.top;
        const ex = tempRect.right - canvasRect.left + scrollLeft;
        const ey = tempRect.top + (tempRect.height * 0.80) - canvasRect.top;
        var p2 = document.createElementNS('http://www.w3.org/2000/svg','path');
        p2.setAttribute('class','viz-mid-link');
        p2.setAttribute('d',`M ${sx} ${sy} C ${sx-80} ${sy-50}, ${ex+30} ${ey+50}, ${ex} ${ey}`);
        p2.setAttribute('stroke','#f59e0b'); p2.setAttribute('stroke-width','2');
        p2.setAttribute('fill','none'); p2.setAttribute('marker-end','url(#arrowHeadPrev)');
        svg.appendChild(p2);
      })();

      // Animate link3 (amber, nextNode -> newNode)
      const sx3 = nextRect.left - canvasRect.left + scrollLeft;
      const sy3 = nextRect.top + (nextRect.height * 0.80) - canvasRect.top;
      const ex3 = newRect.right - canvasRect.left + scrollLeft;
      const ey3 = newRect.top + (newRect.height * 0.80) - canvasRect.top;
      var p3 = document.createElementNS('http://www.w3.org/2000/svg','path');
      p3.setAttribute('class','viz-mid-link');
      p3.setAttribute('d',`M ${sx3} ${sy3} C ${sx3-10} ${sy3+30}, ${ex3+70} ${ey3-50}, ${ex3} ${ey3}`);
      p3.setAttribute('stroke','#f59e0b'); p3.setAttribute('stroke-width','2');
      p3.setAttribute('fill','none'); p3.setAttribute('marker-end','url(#arrowHeadPrev)');
      svg.appendChild(p3);

      animateMidPath(svg, p3, '#f59e0b', function () {
        var prevField = nextNodeEl.querySelector('.viz-node-prev');
        if (prevField) prevField.textContent = NEW_NODE_ADDR;
      });
    });
  });
}

function animMid_link4() {
  buildList(VIZ.initialList, false, 0);
  var wrap = VIZ.el.newNodeWrap;
  if (!wrap) return;
  VIZ.el.newNodeData.textContent = String(VIZ.newValue);
  VIZ.el.newNodeEl.className = 'viz-node viz-dll-node viz-node-new viz-node-linked';
  if (VIZ.el.newNodeNextField) VIZ.el.newNodeNextField.textContent =
    PTR.nodeList[VIZ.insertPos - 1] ? PTR.nodeList[VIZ.insertPos - 1].address : '?';
  if (VIZ.el.newNodePrevField) VIZ.el.newNodePrevField.textContent =
    PTR.nodeList[VIZ.insertPos - 2] ? PTR.nodeList[VIZ.insertPos - 2].address : '?';
  var isMobile = window.innerWidth <= 768;
  wrap.style.bottom = isMobile ? '14px' : '68px';
  midPositionNewNode(wrap);
  wrap.classList.add('visible');
  placeTempPointerOnNode(VIZ.insertPos - 2);

  fadeOutMidLink(VIZ.insertPos - 2, false, true);  // instantly hide backward link
  fadeOutMidLink(VIZ.insertPos - 2, true, false);  // fade out FORWARD link

  var svg = VIZ.el.curveSvg;
  if (!svg) return;
  var old = svg.querySelectorAll('.viz-mid-link');
  for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
  svg.classList.add('visible');

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var canvas = document.getElementById('animCanvas');
      if (!canvas) return;
      var canvasRect = canvas.getBoundingClientRect();
      var scrollLeft = canvas.scrollLeft || 0;
      var listRow = VIZ.el.listRow;
      var wraps = listRow ? listRow.querySelectorAll('.viz-node-wrap') : [];
      var nextNodeWrap = wraps[VIZ.insertPos - 1];
      var tempWrap     = wraps[VIZ.insertPos - 2];
      if (!VIZ.el.newNodeEl || !nextNodeWrap || !tempWrap) return;

      const newRect    = VIZ.el.newNodeEl.getBoundingClientRect();
      const nextNodeEl = nextNodeWrap.querySelector('.viz-node');
      const nextRect   = nextNodeEl.getBoundingClientRect();
      const tempNodeEl = tempWrap.querySelector('.viz-node');
      const tempRect   = tempNodeEl.getBoundingClientRect();

      // Arrowheads
      var arrowHead = document.getElementById('arrowHead');
      if (arrowHead) {
        arrowHead.setAttribute('viewBox','0 0 10 10'); arrowHead.setAttribute('markerWidth','5');
        arrowHead.setAttribute('markerHeight','5'); arrowHead.setAttribute('refX','8'); arrowHead.setAttribute('refY','5');
        var ap = arrowHead.querySelector('path'); if (ap) ap.setAttribute('d','M 0 0 L 10 5 L 0 10 z');
      }
      var arrowHeadPrev = document.getElementById('arrowHeadPrev');
      if (arrowHeadPrev) {
        arrowHeadPrev.setAttribute('viewBox','0 0 10 10'); arrowHeadPrev.setAttribute('markerWidth','5');
        arrowHeadPrev.setAttribute('markerHeight','5'); arrowHeadPrev.setAttribute('refX','8'); arrowHeadPrev.setAttribute('refY','5');
        var ap2 = arrowHeadPrev.querySelector('path'); if (ap2) ap2.setAttribute('d','M 0 0 L 10 5 L 0 10 z');
      }

      // Static link1 (blue)
      (function() {
        const sx = newRect.right - canvasRect.left + scrollLeft;
        const sy = newRect.top + (newRect.height * 0.20) - canvasRect.top;
        const ex = nextRect.left - canvasRect.left + scrollLeft;
        const ey = nextRect.top + (nextRect.height * 0.20) - canvasRect.top;
        var p1 = document.createElementNS('http://www.w3.org/2000/svg','path');
        p1.setAttribute('class','viz-mid-link');
        p1.setAttribute('d',`M ${sx} ${sy} C ${sx+30} ${sy-50}, ${ex-60} ${ey+50}, ${ex} ${ey}`);
        p1.setAttribute('stroke','#3b6cff'); p1.setAttribute('stroke-width','2');
        p1.setAttribute('fill','none'); p1.setAttribute('marker-end','url(#arrowHead)');
        svg.appendChild(p1);
      })();

      // Static link2 (amber)
      (function() {
        const sx = newRect.left - canvasRect.left + scrollLeft;
        const sy = newRect.top + (newRect.height * 0.80) - canvasRect.top;
        const ex = tempRect.right - canvasRect.left + scrollLeft;
        const ey = tempRect.top + (tempRect.height * 0.80) - canvasRect.top;
        var p2 = document.createElementNS('http://www.w3.org/2000/svg','path');
        p2.setAttribute('class','viz-mid-link');
        p2.setAttribute('d',`M ${sx} ${sy} C ${sx-80} ${sy-50}, ${ex+30} ${ey+50}, ${ex} ${ey}`);
        p2.setAttribute('stroke','#f59e0b'); p2.setAttribute('stroke-width','2');
        p2.setAttribute('fill','none'); p2.setAttribute('marker-end','url(#arrowHeadPrev)');
        svg.appendChild(p2);
      })();

      // Static link3 (amber)
      (function() {
        const sx = nextRect.left - canvasRect.left + scrollLeft;
        const sy = nextRect.top + (nextRect.height * 0.80) - canvasRect.top;
        const ex = newRect.right - canvasRect.left + scrollLeft;
        const ey = newRect.top + (newRect.height * 0.80) - canvasRect.top;
        var p3 = document.createElementNS('http://www.w3.org/2000/svg','path');
        p3.setAttribute('class','viz-mid-link');
        p3.setAttribute('d',`M ${sx} ${sy} C ${sx-10} ${sy+30}, ${ex+70} ${ey-50}, ${ex} ${ey}`);
        p3.setAttribute('stroke','#f59e0b'); p3.setAttribute('stroke-width','2');
        p3.setAttribute('fill','none'); p3.setAttribute('marker-end','url(#arrowHeadPrev)');
        // Also restore prev field on next node
        var prevField = nextNodeEl.querySelector('.viz-node-prev');
        if (prevField) prevField.textContent = NEW_NODE_ADDR;
        svg.appendChild(p3);
      })();

      // Animate link4 (blue, temp -> newNode)
      const sx4 = tempRect.right - canvasRect.left + scrollLeft;
      const sy4 = tempRect.top + (tempRect.height * 0.20) - canvasRect.top;
      const ex4 = newRect.left - canvasRect.left + scrollLeft;
      const ey4 = newRect.top + (newRect.height * 0.20) - canvasRect.top;
      var p4 = document.createElementNS('http://www.w3.org/2000/svg','path');
      p4.setAttribute('class','viz-mid-link');
      p4.setAttribute('d',`M ${sx4} ${sy4} C ${sx4+60} ${sy4+50}, ${ex4-50} ${ey4-50}, ${ex4} ${ey4}`);
      p4.setAttribute('stroke','#3b6cff'); p4.setAttribute('stroke-width','2');
      p4.setAttribute('fill','none'); p4.setAttribute('marker-end','url(#arrowHead)');
      svg.appendChild(p4);

      animateMidPath(svg, p4, '#3b6cff', function () {
        var nextField = tempNodeEl.querySelector('.viz-node-next');
        if (nextField) nextField.textContent = NEW_NODE_ADDR;
      });
    });
  });
}

// ── Step 11: node snaps into list — final rearrange ────────────
function animMid_rearrange() {
  // Don't chain link4 — just clean up and rebuild
  setTimeout(function () {
    hideCurve();
    removeTempPointer();
    hideTempPointer();
    hideLoopBox();
    hideNewNode();

    // Build final list with new node inserted at VIZ.insertPos
    var pos = VIZ.insertPos;
    var finalList = VIZ.initialList.slice(0, pos - 1)
      .concat([VIZ.newValue])
      .concat(VIZ.initialList.slice(pos - 1));

    setTimeout(function () {
      buildList(finalList, true, 0);
    }, 80);
  }, 700);
}
// ═══════════════════════════════════════════════════════════════
//  DELETE-AT-BEGINNING ANIMATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// Helper: list without first node
function delBegFinalList() { return VIZ.initialList.slice(1); }

function animDelBeg_initial() {
  buildList(VIZ.initialList, false, 0);
  hideNewNode();
  hideCurve();
  removeTempPointer();
  hideTempPointer();
  hideLoopBox();
}

function animDelBeg_checkEmpty() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  removeTempPointer();
  hideTempPointer();
  // Pulse HEAD to show we're evaluating it
  var hp = VIZ.el.headPointer;
  if (hp) {
    hp.style.transition = 'transform 0.15s ease';
    hp.style.transform  = 'translateX(-50%) scale(1.2)';
    setTimeout(function () { hp.style.transform = 'translateX(-50%) scale(1)'; }, 300);
  }
  // Show condition box
  var box = document.getElementById('loopCheckBox');
  if (box) {
    box.classList.remove('loop-true','loop-false','state-change');
    void box.offsetWidth;
    box.innerHTML = 'head == NULL &nbsp;\u2192&nbsp; <span style="font-weight:700">\u2717 FALSE \u2014 list has nodes</span>';
    box.classList.add('active','loop-false','state-change');
  }
}

function animDelBeg_checkOne() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  removeTempPointer();
  hideTempPointer();
  // Show condition box
  var box = document.getElementById('loopCheckBox');
  if (box) {
    box.classList.remove('loop-true','loop-false','state-change');
    void box.offsetWidth;
    box.innerHTML = 'head\u2192next == NULL &nbsp;\u2192&nbsp; <span style="font-weight:700">\u2717 FALSE \u2014 multiple nodes</span>';
    box.classList.add('active','loop-false','state-change');
  }
}

function animDelBeg_setTemp() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  hideLoopBox();
  // Place temp on node 0 (the head node)
  placeTempPointerOnNode(0);
  // Also highlight head node 0 as "to be deleted"
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var wraps = VIZ.el.listRow ? VIZ.el.listRow.querySelectorAll('.viz-node-wrap') : [];
      if (wraps[0]) {
        var nodeEl = wraps[0].querySelector('.viz-node');
        if (nodeEl) {
          nodeEl.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
          nodeEl.style.boxShadow = '0 0 0 2px #ef4444, 0 4px 16px rgba(239,68,68,0.3)';
          nodeEl.style.borderColor = '#ef4444';
        }
      }
    });
  });
}

// Smoothly slides the HEAD pointer to a given node index, matching the
// same cubic-bezier transition used by placeTempPointerOnNode for temp.
function animateHeadToNode(nodeIndex) {
  var canvas = document.getElementById('animCanvas');
  var row    = VIZ.el.listRow;
  var hp     = VIZ.el.headPointer;
  if (!canvas || !row || !hp) return;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var wraps = row.querySelectorAll('.viz-node-wrap');
      var wrap  = wraps[nodeIndex];
      if (!wrap) return;

      var canvasRect = canvas.getBoundingClientRect();
      var scrollLeft = canvas.scrollLeft || 0;
      var hNode      = wrap.querySelector('.viz-node');
      var hRect      = (hNode || wrap).getBoundingClientRect();
      var hCx        = hRect.left + hRect.width / 2 - canvasRect.left + scrollLeft;
      var hTopY      = hRect.top  - canvasRect.top  - hp.getBoundingClientRect().height - 4;

      // Enable smooth slide (same easing as temp pointer)
      hp.style.transition = 'left 0.45s cubic-bezier(0.4,0,0.2,1), top 0.45s cubic-bezier(0.4,0,0.2,1)';
      hp.style.top        = hTopY + 'px';
      hp.style.left       = hCx   + 'px';
      hp.style.transform  = 'translateX(-50%)';

      PTR.headIndex = nodeIndex;
      if (VIZ.el.headAddr) VIZ.el.headAddr.textContent = PTR.nodeList[nodeIndex] ? PTR.nodeList[nodeIndex].address : '\u2014';

      // Remove transition after animation so positionPointers() stays instant elsewhere
      setTimeout(function () { hp.style.transition = ''; }, 500);
    });
  });
}

function animDelBeg_moveHead() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  hideLoopBox();
  // Keep temp on node 0
  placeTempPointerOnNode(0);
  // Highlight node 0 as pending deletion
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var wraps = VIZ.el.listRow ? VIZ.el.listRow.querySelectorAll('.viz-node-wrap') : [];
      if (wraps[0]) {
        var nodeEl = wraps[0].querySelector('.viz-node');
        if (nodeEl) {
          nodeEl.style.boxShadow = '0 0 0 2px #ef4444, 0 4px 16px rgba(239,68,68,0.3)';
          nodeEl.style.borderColor = '#ef4444';
        }
      }
      // Smoothly slide HEAD pointer from node 0 → node 1
      animateHeadToNode(1);
    });
  });
}

function animDelBeg_clearPrev() {
  buildList(VIZ.initialList, false, 0);
  hideCurve();
  hideLoopBox();
  // Keep temp on node 0
  placeTempPointerOnNode(0);
  // Keep node 0 highlighted red
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var wraps = VIZ.el.listRow ? VIZ.el.listRow.querySelectorAll('.viz-node-wrap') : [];
      if (wraps[0]) {
        var nodeEl = wraps[0].querySelector('.viz-node');
        if (nodeEl) {
          nodeEl.style.boxShadow = '0 0 0 2px #ef4444, 0 4px 16px rgba(239,68,68,0.3)';
          nodeEl.style.borderColor = '#ef4444';
        }
      }
      // HEAD already at node 1 — keep it there (no animation needed, just ensure position)
      animateHeadToNode(1);
      // Fade out the ← backward arrow between node 0 and node 1
      var listRow = VIZ.el.listRow;
      if (listRow) {
        var arrows = listRow.querySelectorAll('.viz-arrow');
        var firstArrow = arrows[0];
        if (firstArrow) {
          var bckSpan = firstArrow.querySelector('.viz-arrow-bck');
          if (bckSpan) {
            bckSpan.style.transition = 'opacity 0.4s ease';
            bckSpan.style.opacity = '0';
          }
        }
      }
      // Flash node 1 PREV field: existing addr → NULL
      if (wraps[1]) {
        var prevEl = wraps[1].querySelector('.viz-node-prev');
        if (prevEl) {
          setTimeout(function () {
            prevEl.style.transition = 'background 0.25s ease, color 0.25s ease';
            prevEl.style.background = 'rgba(245,158,11,0.25)';
            prevEl.style.color      = '#d97706';
            prevEl.textContent      = 'NULL';
            setTimeout(function () {
              prevEl.style.background = '';
              prevEl.style.color      = '';
            }, 800);
          }, 150);
        }
      }
    });
  });
}

function animDelBeg_free() {
  hideCurve();
  hideLoopBox();
  removeTempPointer();
  hideTempPointer();
  // Build final list (without node 0) with enter animation
  var finalList = delBegFinalList();
  setTimeout(function () {
    buildList(finalList, true, 0);
  }, 80);
}

// FIX #1: showTempPointerOnNode renamed/replaced by placeTempPointerOnNode above.
// hideTempPointer kept for cached el cleanup on reset/switchMode.
function hideTempPointer() {
  var tp = VIZ.el.tempPointer;
  if (!tp) return;
  tp.style.transition = 'opacity 0.25s ease';
  tp.style.opacity    = '0';
  setTimeout(function () { tp.style.display = 'none'; }, 260);
}