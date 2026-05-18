/* ════════════════════════════════════════════════════════════
   Tree Traversal Visualize — IDS Studio Next
   Inorder / Preorder / Postorder step-by-step visualizer
   ════════════════════════════════════════════════════════════ */

/* ── Tree structure: A(root), B(A.left), C(A.right), D(B.left), E(C.left), F(C.right) ── */

/* SVG layout positions (viewBox 0 0 400 220) */
const NODE_POS = {
  A: { x: 200, y: 40  },
  B: { x: 110, y: 110 },
  C: { x: 290, y: 110 },
  D: { x:  65, y: 180 },
  E: { x: 245, y: 180 },
  F: { x: 335, y: 180 },
};

/* Edges: [parent, child] */
const EDGES = [
  ['A','B'], ['A','C'], ['B','D'], ['C','E'], ['C','F']
];

/* ── Traversal configs ── */
const TRAVERSAL_CONFIGS = {
  inorder: {
    label: 'inorder() Traversal',
    ruleName: 'Inorder Traversal',
    ruleHtml: '<span>Left</span><span class="viz-arrow-sep">→</span><span>Root</span><span class="viz-arrow-sep">→</span><span>Right</span>',
    statusRule: ['Left','→','Root','→','Right'],
    statusType: 'Inorder',
    hint: 'Inorder means: first go to the left subtree, then visit the root, then go to the right subtree.',
    visitOrder: ['D','B','A','E','C','F'],
    totalSteps: 27,
    codeLang: 'inorder',
  },
  preorder: {
    label: 'preorder() Traversal',
    ruleName: 'Preorder Traversal',
    ruleHtml: '<span>Root</span><span class="viz-arrow-sep">→</span><span>Left</span><span class="viz-arrow-sep">→</span><span>Right</span>',
    statusRule: ['Root','→','Left','→','Right'],
    statusType: 'Preorder',
    hint: 'Preorder means: first visit the root, then go to the left subtree, then the right subtree.',
    visitOrder: ['A','B','D','C','E','F'],
    totalSteps: 14,
    codeLang: 'preorder',
  },
  postorder: {
    label: 'postorder() Traversal',
    ruleName: 'Postorder Traversal',
    ruleHtml: '<span>Left</span><span class="viz-arrow-sep">→</span><span>Right</span><span class="viz-arrow-sep">→</span><span>Root</span>',
    statusRule: ['Left','→','Right','→','Root'],
    statusType: 'Postorder',
    hint: 'Postorder means: first go to the left subtree, then the right subtree, then visit the root.',
    visitOrder: ['D','B','E','F','C','A'],
    totalSteps: 13,
    codeLang: 'postorder',
  },
};

/* ── Code lines per traversal ── */
const CODE = {
  inorder: [
    { n:1,  html:'<span class="c-kw">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
    { n:2,  html:'<span class="c-kw">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
    { n:3,  html:'' },
    { n:4,  html:'<span class="c-kw">struct</span> <span class="c-type">node</span>{' },
    { n:5,  html:'  <span class="c-kw">int</span> data;' },
    { n:6,  html:'  <span class="c-kw">struct</span> <span class="c-type">node</span> *left, *right;' },
    { n:7,  html:'};' },
    { n:8,  html:'' },
    { n:9,  html:'<span class="c-kw">void</span> <span class="c-fn">inorder</span>(<span class="c-kw">struct</span> <span class="c-type">node</span>* root){' },
    { n:10, html:'  <span class="c-kw">if</span>(root == <span class="c-num">NULL</span>)' },
    { n:11, html:'    <span class="c-kw">return</span>;' },
    { n:12, html:'' },
    { n:13, html:'  <span class="c-fn">inorder</span>(root-&gt;left);  <span class="c-comment">// Left</span>' },
    { n:14, html:'  <span class="c-fn">printf</span>(<span class="c-str">"%d "</span>, root-&gt;data); <span class="c-comment">// Root</span>' },
    { n:15, html:'  <span class="c-fn">inorder</span>(root-&gt;right); <span class="c-comment">// Right</span>' },
    { n:16, html:'}' },
    { n:17, html:'' },
    { n:18, html:'<span class="c-kw">int</span> <span class="c-fn">main</span>(){' },
    { n:19, html:'  <span class="c-kw">struct</span> <span class="c-type">node</span>* root = <span class="c-num">NULL</span>;' },
    { n:20, html:'  <span class="c-comment">// assume tree is already created</span>' },
    { n:21, html:'  <span class="c-fn">inorder</span>(root);' },
    { n:22, html:'  <span class="c-kw">return</span> <span class="c-num">0</span>;' },
    { n:23, html:'}' },
  ],
  preorder: [
    { n:1,  html:'<span class="c-kw">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
    { n:2,  html:'<span class="c-kw">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
    { n:3,  html:'' },
    { n:4,  html:'<span class="c-kw">struct</span> <span class="c-type">node</span>{' },
    { n:5,  html:'  <span class="c-kw">int</span> data;' },
    { n:6,  html:'  <span class="c-kw">struct</span> <span class="c-type">node</span> *left, *right;' },
    { n:7,  html:'};' },
    { n:8,  html:'' },
    { n:9,  html:'<span class="c-kw">void</span> <span class="c-fn">preorder</span>(<span class="c-kw">struct</span> <span class="c-type">node</span>* root){' },
    { n:10, html:'  <span class="c-kw">if</span>(root == <span class="c-num">NULL</span>)' },
    { n:11, html:'    <span class="c-kw">return</span>;' },
    { n:12, html:'' },
    { n:13, html:'  <span class="c-fn">printf</span>(<span class="c-str">"%d "</span>, root-&gt;data); <span class="c-comment">// Root</span>' },
    { n:14, html:'  <span class="c-fn">preorder</span>(root-&gt;left);  <span class="c-comment">// Left</span>' },
    { n:15, html:'  <span class="c-fn">preorder</span>(root-&gt;right); <span class="c-comment">// Right</span>' },
    { n:16, html:'}' },
    { n:17, html:'' },
    { n:18, html:'<span class="c-kw">int</span> <span class="c-fn">main</span>(){' },
    { n:19, html:'  <span class="c-kw">struct</span> <span class="c-type">node</span>* root = <span class="c-num">NULL</span>;' },
    { n:20, html:'  <span class="c-comment">// assume tree is already created</span>' },
    { n:21, html:'  <span class="c-fn">preorder</span>(root);' },
    { n:22, html:'  <span class="c-kw">return</span> <span class="c-num">0</span>;' },
    { n:23, html:'}' },
  ],
  postorder: [
    { n:1,  html:'<span class="c-kw">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
    { n:2,  html:'<span class="c-kw">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
    { n:3,  html:'' },
    { n:4,  html:'<span class="c-kw">struct</span> <span class="c-type">node</span>{' },
    { n:5,  html:'  <span class="c-kw">int</span> data;' },
    { n:6,  html:'  <span class="c-kw">struct</span> <span class="c-type">node</span> *left, *right;' },
    { n:7,  html:'};' },
    { n:8,  html:'' },
    { n:9,  html:'<span class="c-kw">void</span> <span class="c-fn">postorder</span>(<span class="c-kw">struct</span> <span class="c-type">node</span>* root){' },
    { n:10, html:'  <span class="c-kw">if</span>(root == <span class="c-num">NULL</span>)' },
    { n:11, html:'    <span class="c-kw">return</span>;' },
    { n:12, html:'' },
    { n:13, html:'  <span class="c-fn">postorder</span>(root-&gt;left);  <span class="c-comment">// Left</span>' },
    { n:14, html:'  <span class="c-fn">postorder</span>(root-&gt;right); <span class="c-comment">// Right</span>' },
    { n:15, html:'  <span class="c-fn">printf</span>(<span class="c-str">"%d "</span>, root-&gt;data); <span class="c-comment">// Root</span>' },
    { n:16, html:'}' },
    { n:17, html:'' },
    { n:18, html:'<span class="c-kw">int</span> <span class="c-fn">main</span>(){' },
    { n:19, html:'  <span class="c-kw">struct</span> <span class="c-type">node</span>* root = <span class="c-num">NULL</span>;' },
    { n:20, html:'  <span class="c-comment">// assume tree is already created</span>' },
    { n:21, html:'  <span class="c-fn">postorder</span>(root);' },
    { n:22, html:'  <span class="c-kw">return</span> <span class="c-num">0</span>;' },
    { n:23, html:'}' },
  ],
};

function buildSteps(type) {
  if (type === 'inorder') return INORDER_STEPS;
  if (type === 'preorder') return PREORDER_STEPS;
  return POSTORDER_STEPS;
}

/* ══════════════════════════════════════════════════════════════
   INORDER STEPS — visit order: D B A E C F
══════════════════════════════════════════════════════════════ */
const INORDER_STEPS = [

  /* ── Step 1: main() calls inorder(A) ── */
  {
    codeLines:[21], currentNode:null, visitedNodes:[],
    traversedEdges:[],
    callStack:['main() root'],
    action:'Program starts. <strong>main()</strong> calls <strong>inorder(root)</strong> where root = A.',
    stepLabel:1
  },

  /* ── Step 2: inorder(A) — check base case ── */
  {
    codeLines:[10], currentNode:'A', visitedNodes:[],
    traversedEdges:[],
    callStack:['main() root','inorder(A)'],
    action:'<strong>inorder(A)</strong> called. Check: is root == NULL? No — A exists. Continue.',
    stepLabel:2
  },

  /* ── Step 3: inorder(A) calls left → inorder(B) ── */
  {
    codeLines:[13], currentNode:'B', visitedNodes:[],
    traversedEdges:[['A','B']],
    callStack:['main() root','inorder(A)','inorder(B)'],
    action:'<strong>inorder(A)</strong> goes LEFT — calling <strong>inorder(B)</strong>.',
    stepLabel:3
  },

  /* ── Step 4: inorder(B) — check base case ── */
  {
    codeLines:[10], currentNode:'B', visitedNodes:[],
    traversedEdges:[['A','B']],
    callStack:['main() root','inorder(A)','inorder(B)'],
    action:'<strong>inorder(B)</strong> called. Check: is root == NULL? No — B exists. Continue.',
    stepLabel:4
  },

  /* ── Step 5: inorder(B) calls left → inorder(D) ── */
  {
    codeLines:[13], currentNode:'D', visitedNodes:[],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','inorder(A)','inorder(B)','inorder(D)'],
    action:'<strong>inorder(B)</strong> goes LEFT — calling <strong>inorder(D)</strong>.',
    stepLabel:5
  },

  /* ── Step 6: inorder(D) — check base case ── */
  {
    codeLines:[10], currentNode:'D', visitedNodes:[],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','inorder(A)','inorder(B)','inorder(D)'],
    action:'<strong>inorder(D)</strong> called. Check: is root == NULL? No — D exists. Continue.',
    stepLabel:6
  },

  /* ── Step 7: inorder(D) calls D.left → NULL ── */
  {
    codeLines:[13], currentNode:'D', visitedNodes:[],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','inorder(A)','inorder(B)','inorder(D)'],
    action:'<strong>inorder(D)</strong> calls left → NULL. Base case hit — return immediately.',
    stepLabel:7
  },

  /* ── Step 8: visit D ── */
  {
    codeLines:[14], currentNode:'D', visitedNodes:['D'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','inorder(A)','inorder(B)','inorder(D)'],
    action:'<strong>Visit D</strong> — printf fires. D added to output.',
    stepLabel:8
  },

  /* ── Step 9: inorder(D) calls D.right → NULL ── */
  {
    codeLines:[15], currentNode:'D', visitedNodes:['D'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','inorder(A)','inorder(B)','inorder(D)'],
    action:'<strong>inorder(D)</strong> calls right → NULL. Base case hit — return.',
    stepLabel:9
  },

  /* ── Step 10: inorder(D) returns to B ── */
  {
    codeLines:[13], currentNode:'B', visitedNodes:['D'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','inorder(A)','inorder(B)'],
    action:'<strong>inorder(D)</strong> returns. Back to <strong>inorder(B)</strong>. Now visit B.',
    stepLabel:10
  },

  /* ── Step 11: visit B ── */
  {
    codeLines:[14], currentNode:'B', visitedNodes:['D','B'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','inorder(A)','inorder(B)'],
    action:'<strong>Visit B</strong> — printf fires. B added to output.',
    stepLabel:11
  },

  /* ── Step 12: inorder(B) calls B.right → NULL ── */
  {
    codeLines:[15], currentNode:'B', visitedNodes:['D','B'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','inorder(A)','inorder(B)'],
    action:'<strong>inorder(B)</strong> calls right → NULL. Base case — return.',
    stepLabel:12
  },

  /* ── Step 13: inorder(B) returns to A ── */
  {
    codeLines:[13], currentNode:'A', visitedNodes:['D','B'],
    traversedEdges:[['A','B']],
    callStack:['main() root','inorder(A)'],
    action:'<strong>inorder(B)</strong> returns. Back to <strong>inorder(A)</strong>. Now visit A.',
    stepLabel:13
  },

  /* ── Step 14: visit A ── */
  {
    codeLines:[14], currentNode:'A', visitedNodes:['D','B','A'],
    traversedEdges:[['A','B']],
    callStack:['main() root','inorder(A)'],
    action:'<strong>Visit A</strong> — printf fires. A added to output.',
    stepLabel:14
  },

  /* ── Step 15: inorder(A) calls right → inorder(C) ── */
  {
    codeLines:[15], currentNode:'C', visitedNodes:['D','B','A'],
    traversedEdges:[['A','B'],['A','C']],
    callStack:['main() root','inorder(A)','inorder(C)'],
    action:'<strong>inorder(A)</strong> goes RIGHT — calling <strong>inorder(C)</strong>.',
    stepLabel:15
  },

  /* ── Step 16: inorder(C) — check base case ── */
  {
    codeLines:[10], currentNode:'C', visitedNodes:['D','B','A'],
    traversedEdges:[['A','B'],['A','C']],
    callStack:['main() root','inorder(A)','inorder(C)'],
    action:'<strong>inorder(C)</strong> called. Check: is root == NULL? No — C exists. Continue.',
    stepLabel:16
  },

  /* ── Step 17: inorder(C) calls left → inorder(E) ── */
  {
    codeLines:[13], currentNode:'E', visitedNodes:['D','B','A'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','inorder(A)','inorder(C)','inorder(E)'],
    action:'<strong>inorder(C)</strong> goes LEFT — calling <strong>inorder(E)</strong>.',
    stepLabel:17
  },

  /* ── Step 18: inorder(E) calls E.left → NULL ── */
  {
    codeLines:[13], currentNode:'E', visitedNodes:['D','B','A'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','inorder(A)','inorder(C)','inorder(E)'],
    action:'<strong>inorder(E)</strong> calls left → NULL. Base case — return immediately.',
    stepLabel:18
  },

  /* ── Step 19: visit E ── */
  {
    codeLines:[14], currentNode:'E', visitedNodes:['D','B','A','E'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','inorder(A)','inorder(C)','inorder(E)'],
    action:'<strong>Visit E</strong> — printf fires. E added to output.',
    stepLabel:19
  },

  /* ── Step 20: inorder(E) calls E.right → NULL ── */
  {
    codeLines:[15], currentNode:'E', visitedNodes:['D','B','A','E'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','inorder(A)','inorder(C)','inorder(E)'],
    action:'<strong>inorder(E)</strong> calls right → NULL. Base case — return.',
    stepLabel:20
  },

  /* ── Step 21: inorder(E) returns to C ── */
  {
    codeLines:[13], currentNode:'C', visitedNodes:['D','B','A','E'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','inorder(A)','inorder(C)'],
    action:'<strong>inorder(E)</strong> returns. Back to <strong>inorder(C)</strong>. Now visit C.',
    stepLabel:21
  },

  /* ── Step 22: visit C ── */
  {
    codeLines:[14], currentNode:'C', visitedNodes:['D','B','A','E','C'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','inorder(A)','inorder(C)'],
    action:'<strong>Visit C</strong> — printf fires. C added to output.',
    stepLabel:22
  },

  /* ── Step 23: inorder(C) calls right → inorder(F) ── */
  {
    codeLines:[15], currentNode:'F', visitedNodes:['D','B','A','E','C'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F']],
    callStack:['main() root','inorder(A)','inorder(C)','inorder(F)'],
    action:'<strong>inorder(C)</strong> goes RIGHT — calling <strong>inorder(F)</strong>.',
    stepLabel:23
  },

  /* ── Step 24: inorder(F) calls F.left → NULL ── */
  {
    codeLines:[13], currentNode:'F', visitedNodes:['D','B','A','E','C'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F']],
    callStack:['main() root','inorder(A)','inorder(C)','inorder(F)'],
    action:'<strong>inorder(F)</strong> calls left → NULL. Base case — return immediately.',
    stepLabel:24
  },

  /* ── Step 25: visit F ── */
  {
    codeLines:[14], currentNode:'F', visitedNodes:['D','B','A','E','C','F'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F']],
    callStack:['main() root','inorder(A)','inorder(C)','inorder(F)'],
    action:'<strong>Visit F</strong> — printf fires. F added to output.',
    stepLabel:25
  },

  /* ── Step 26: inorder(F) calls F.right → NULL ── */
  {
    codeLines:[15], currentNode:'F', visitedNodes:['D','B','A','E','C','F'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F']],
    callStack:['main() root','inorder(A)','inorder(C)','inorder(F)'],
    action:'<strong>inorder(F)</strong> calls right → NULL. Base case — return.',
    stepLabel:26
  },

  /* ── Step 27: all done ── */
  {
    codeLines:[21], currentNode:null, visitedNodes:['D','B','A','E','C','F'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F'],['B','D']],
    callStack:['main() root'],
    action:'<strong>inorder(F)</strong> returns. All frames unwind. <strong>Inorder traversal complete!</strong> Output: D B A E C F.',
    stepLabel:27, done:true
  },
];

/* ══════════════════════════════════════════════════════════════
   PREORDER STEPS — visit order: A B D C E F
══════════════════════════════════════════════════════════════ */
const PREORDER_STEPS = [
  {
    codeLines:[21], currentNode:null, visitedNodes:[],
    traversedEdges:[],
    callStack:['main() root'],
    action:'Program starts. <strong>main()</strong> calls <strong>preorder(root)</strong> where root = A.',
    stepLabel:1
  },
  {
    codeLines:[10], currentNode:'A', visitedNodes:[],
    traversedEdges:[],
    callStack:['main() root','preorder(A)'],
    action:'<strong>preorder(A)</strong> called. root ≠ NULL. Continue.',
    stepLabel:2
  },
  {
    codeLines:[13], currentNode:'A', visitedNodes:['A'],
    traversedEdges:[],
    callStack:['main() root','preorder(A)'],
    action:'<strong>Visit A</strong> — printf fires first (Root). A added to output.',
    stepLabel:3
  },
  {
    codeLines:[14], currentNode:'B', visitedNodes:['A'],
    traversedEdges:[['A','B']],
    callStack:['main() root','preorder(A)','preorder(B)'],
    action:'<strong>preorder(A)</strong> goes LEFT — calling <strong>preorder(B)</strong>.',
    stepLabel:4
  },
  {
    codeLines:[13], currentNode:'B', visitedNodes:['A','B'],
    traversedEdges:[['A','B']],
    callStack:['main() root','preorder(A)','preorder(B)'],
    action:'<strong>Visit B</strong> — printf fires. B added to output.',
    stepLabel:5
  },
  {
    codeLines:[14], currentNode:'D', visitedNodes:['A','B'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','preorder(A)','preorder(B)','preorder(D)'],
    action:'<strong>preorder(B)</strong> goes LEFT — calling <strong>preorder(D)</strong>.',
    stepLabel:6
  },
  {
    codeLines:[13], currentNode:'D', visitedNodes:['A','B','D'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','preorder(A)','preorder(B)','preorder(D)'],
    action:'<strong>Visit D</strong> — printf fires. D has no children. Returns to B.',
    stepLabel:7
  },
  {
    codeLines:[15], currentNode:'B', visitedNodes:['A','B','D'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','preorder(A)','preorder(B)'],
    action:'<strong>preorder(B)</strong> goes RIGHT → NULL. Returns to A.',
    stepLabel:8
  },
  {
    codeLines:[15], currentNode:'C', visitedNodes:['A','B','D'],
    traversedEdges:[['A','B'],['A','C']],
    callStack:['main() root','preorder(A)','preorder(C)'],
    action:'<strong>preorder(A)</strong> goes RIGHT — calling <strong>preorder(C)</strong>.',
    stepLabel:9
  },
  {
    codeLines:[13], currentNode:'C', visitedNodes:['A','B','D','C'],
    traversedEdges:[['A','B'],['A','C']],
    callStack:['main() root','preorder(A)','preorder(C)'],
    action:'<strong>Visit C</strong> — printf fires. C added to output.',
    stepLabel:10
  },
  {
    codeLines:[14], currentNode:'E', visitedNodes:['A','B','D','C'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','preorder(A)','preorder(C)','preorder(E)'],
    action:'<strong>preorder(C)</strong> goes LEFT — calling <strong>preorder(E)</strong>.',
    stepLabel:11
  },
  {
    codeLines:[13], currentNode:'E', visitedNodes:['A','B','D','C','E'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','preorder(A)','preorder(C)'],
    action:'<strong>Visit E</strong> — E has no children. Returns to C.',
    stepLabel:12
  },
  {
    codeLines:[15], currentNode:'F', visitedNodes:['A','B','D','C','E'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F']],
    callStack:['main() root','preorder(A)','preorder(C)','preorder(F)'],
    action:'<strong>preorder(C)</strong> goes RIGHT — calling <strong>preorder(F)</strong>.',
    stepLabel:13
  },
  {
    codeLines:[21], currentNode:null, visitedNodes:['A','B','D','C','E','F'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F']],
    callStack:['main() root'],
    action:'<strong>preorder(C)</strong> goes right to F, visits F, then all frames unwind. <strong>Preorder complete!</strong> Output: A B D C E F.',
    stepLabel:14, done:true
  },
];

/* ══════════════════════════════════════════════════════════════
   POSTORDER STEPS — visit order: D B E F C A
══════════════════════════════════════════════════════════════ */
const POSTORDER_STEPS = [
  {
    codeLines:[21], currentNode:null, visitedNodes:[],
    traversedEdges:[],
    callStack:['main() root'],
    action:'Program starts. <strong>main()</strong> calls <strong>postorder(root)</strong> where root = A.',
    stepLabel:1
  },
  {
    codeLines:[10], currentNode:'A', visitedNodes:[],
    traversedEdges:[],
    callStack:['main() root','postorder(A)'],
    action:'<strong>postorder(A)</strong> called. root ≠ NULL. Go left first.',
    stepLabel:2
  },
  {
    codeLines:[13], currentNode:'B', visitedNodes:[],
    traversedEdges:[['A','B']],
    callStack:['main() root','postorder(A)','postorder(B)'],
    action:'<strong>postorder(A)</strong> goes LEFT — calling <strong>postorder(B)</strong>.',
    stepLabel:3
  },
  {
    codeLines:[13], currentNode:'D', visitedNodes:[],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','postorder(A)','postorder(B)','postorder(D)'],
    action:'<strong>postorder(B)</strong> goes LEFT — calling <strong>postorder(D)</strong>.',
    stepLabel:4
  },
  {
    codeLines:[15], currentNode:'D', visitedNodes:['D'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','postorder(A)','postorder(B)','postorder(D)'],
    action:'D has no children. <strong>Visit D</strong> — printf fires. D returns to B.',
    stepLabel:5
  },
  {
    codeLines:[14], currentNode:'B', visitedNodes:['D'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','postorder(A)','postorder(B)'],
    action:'<strong>postorder(B)</strong> — left done. Right is NULL. Now visit B.',
    stepLabel:6
  },
  {
    codeLines:[15], currentNode:'B', visitedNodes:['D','B'],
    traversedEdges:[['A','B'],['B','D']],
    callStack:['main() root','postorder(A)','postorder(B)'],
    action:'<strong>Visit B</strong> — printf fires. B returns to A.',
    stepLabel:7
  },
  {
    codeLines:[14], currentNode:'C', visitedNodes:['D','B'],
    traversedEdges:[['A','B'],['A','C']],
    callStack:['main() root','postorder(A)','postorder(C)'],
    action:'<strong>postorder(A)</strong> goes RIGHT — calling <strong>postorder(C)</strong>.',
    stepLabel:8
  },
  {
    codeLines:[13], currentNode:'E', visitedNodes:['D','B'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','postorder(A)','postorder(C)','postorder(E)'],
    action:'<strong>postorder(C)</strong> goes LEFT — calling <strong>postorder(E)</strong>.',
    stepLabel:9
  },
  {
    codeLines:[15], currentNode:'E', visitedNodes:['D','B','E'],
    traversedEdges:[['A','B'],['A','C'],['C','E']],
    callStack:['main() root','postorder(A)','postorder(C)'],
    action:'E has no children. <strong>Visit E</strong> — printf fires. E returns to C.',
    stepLabel:10
  },
  {
    codeLines:[14], currentNode:'F', visitedNodes:['D','B','E'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F']],
    callStack:['main() root','postorder(A)','postorder(C)','postorder(F)'],
    action:'<strong>postorder(C)</strong> goes RIGHT — calling <strong>postorder(F)</strong>.',
    stepLabel:11
  },
  {
    codeLines:[15], currentNode:'F', visitedNodes:['D','B','E','F'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F']],
    callStack:['main() root','postorder(A)','postorder(C)'],
    action:'F has no children. <strong>Visit F</strong> — printf fires. F returns to C.',
    stepLabel:12
  },
  {
    codeLines:[21], currentNode:null, visitedNodes:['D','B','E','F','C','A'],
    traversedEdges:[['A','B'],['A','C'],['C','E'],['C','F'],['B','D']],
    callStack:['main() root'],
    action:'<strong>postorder(C)</strong> returns. Back to A. Both subtrees done. <strong>Visit A</strong> — A added. <strong>Postorder traversal complete!</strong> Output: D B E F C A.',
    stepLabel:13, done:true
  },
];

/* ══════════════════════════════════════════════════════════════
   INORDER ANIMATION STEPS (27 steps, parallel to INORDER_STEPS)
══════════════════════════════════════════════════════════════ */

/* BOX_DEFS for inorder call frames */
const BOX_DEFS = {
  main: {
    id: 'main', label: 'int main', isMain: true, badge: '',
    steps: [
      { id:'m1', text:'inorder(root)  // root = A' }
    ]
  },
  iA: {
    id: 'iA', label: 'inorder(A)', badge: 'root=A',
    steps: [
      { id:'iAs1', text:'if(root == NULL) → NO' },
      { id:'iAs2', text:'inorder(root->left)  // go to B' },
      { id:'iAs3', text:'printf → visit A' },
      { id:'iAs4', text:'inorder(root->right)  // go to C' },
    ]
  },
  iB: {
    id: 'iB', label: 'inorder(B)', badge: 'root=B',
    steps: [
      { id:'iBs1', text:'if(root == NULL) → NO' },
      { id:'iBs2', text:'inorder(root->left)  // go to D' },
      { id:'iBs3', text:'printf → visit B' },
      { id:'iBs4', text:'inorder(root->right)  // NULL → return' },
    ]
  },
  iD: {
    id: 'iD', label: 'inorder(D)', badge: 'root=D',
    steps: [
      { id:'iDs1', text:'if(root == NULL) → NO' },
      { id:'iDs2', text:'inorder(root->left)  // NULL → return' },
      { id:'iDs3', text:'printf → visit D' },
      { id:'iDs4', text:'inorder(root->right)  // NULL → return' },
    ]
  },
  iC: {
    id: 'iC', label: 'inorder(C)', badge: 'root=C',
    steps: [
      { id:'iCs1', text:'if(root == NULL) → NO' },
      { id:'iCs2', text:'inorder(root->left)  // go to E' },
      { id:'iCs3', text:'printf → visit C' },
      { id:'iCs4', text:'inorder(root->right)  // go to F' },
    ]
  },
  iE: {
    id: 'iE', label: 'inorder(E)', badge: 'root=E',
    steps: [
      { id:'iEs1', text:'if(root == NULL) → NO' },
      { id:'iEs2', text:'inorder(root->left)  // NULL → return' },
      { id:'iEs3', text:'printf → visit E' },
      { id:'iEs4', text:'inorder(root->right)  // NULL → return' },
    ]
  },
  iF: {
    id: 'iF', label: 'inorder(F)', badge: 'root=F',
    steps: [
      { id:'iFs1', text:'if(root == NULL) → NO' },
      { id:'iFs2', text:'inorder(root->left)  // NULL → return' },
      { id:'iFs3', text:'printf → visit F' },
      { id:'iFs4', text:'inorder(root->right)  // NULL → return' },
    ]
  },
};

const ALL_ANIM_BOX_IDS = ['main','iA','iB','iD','iC','iE','iF'];

const INORDER_ANIM_STEPS = [
  /* 1 */ {
    boxes:['main'], activeBox:'main', activeStep:0,
    dimmed:[], hidden:['iA','iB','iD','iC','iE','iF'],
    arrow:null, linkArrow:null, panTo:'main',
    expl:'main() calls inorder(root) where root = A.'
  },
  /* 2 */ {
    boxes:['main','iA'], activeBox:'iA', activeStep:0,
    dimmed:['main'], hidden:['iB','iD','iC','iE','iF'],
    arrow:{ type:'call', fromBox:'main', fromStep:0, toBox:'iA', toStep:0 },
    linkArrow:{ fromBox:'main', fromStep:0, toBox:'iA' },
    panTo:'iA',
    expl:'inorder(A) called. root ≠ NULL, continue.'
  },
  /* 3 */ {
    boxes:['main','iA'], activeBox:'iA', activeStep:0,
    dimmed:['main'], hidden:['iB','iD','iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'main', fromStep:0, toBox:'iA' },
    panTo:'iA',
    expl:'root == NULL? NO. Proceed to go left.'
  },
  /* 4 */ {
    boxes:['main','iA','iB'], activeBox:'iB', activeStep:0,
    dimmed:['main','iA'], hidden:['iD','iC','iE','iF'],
    arrow:{ type:'call', fromBox:'iA', fromStep:1, toBox:'iB', toStep:0 },
    linkArrow:{ fromBox:'iA', fromStep:1, toBox:'iB' },
    panTo:'iB',
    expl:'inorder(A) goes LEFT — calls inorder(B).'
  },
  /* 5 */ {
    boxes:['main','iA','iB'], activeBox:'iB', activeStep:0,
    dimmed:['main','iA'], hidden:['iD','iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iA', fromStep:1, toBox:'iB' },
    panTo:'iB',
    expl:'inorder(B): root == NULL? NO. Go left.'
  },
  /* 6 */ {
    boxes:['main','iA','iB','iD'], activeBox:'iD', activeStep:0,
    dimmed:['main','iA','iB'], hidden:['iC','iE','iF'],
    arrow:{ type:'call', fromBox:'iB', fromStep:1, toBox:'iD', toStep:0 },
    linkArrow:{ fromBox:'iB', fromStep:1, toBox:'iD' },
    panTo:'iD',
    expl:'inorder(B) goes LEFT — calls inorder(D).'
  },
  /* 7 */ {
    boxes:['main','iA','iB','iD'], activeBox:'iD', activeStep:0,
    dimmed:['main','iA','iB'], hidden:['iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iB', fromStep:1, toBox:'iD' },
    panTo:'iD',
    expl:'inorder(D): root == NULL? NO. Go left.'
  },
  /* 8 */ {
    boxes:['main','iA','iB','iD'], activeBox:'iD', activeStep:1,
    dimmed:['main','iA','iB'], hidden:['iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iB', fromStep:1, toBox:'iD' },
    panTo:'iD',
    expl:'inorder(D.left) = NULL → base case, return immediately.'
  },
  /* 9 */ {
    boxes:['main','iA','iB','iD'], activeBox:'iD', activeStep:2,
    dimmed:['main','iA','iB'], hidden:['iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iB', fromStep:1, toBox:'iD' },
    panTo:'iD',
    expl:'Visit D — printf fires. D added to output.'
  },
  /* 10 */ {
    boxes:['main','iA','iB','iD'], activeBox:'iD', activeStep:3,
    dimmed:['main','iA','iB'], hidden:['iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iB', fromStep:1, toBox:'iD' },
    panTo:'iD',
    expl:'inorder(D.right) = NULL → return. inorder(D) complete.'
  },
  /* 11 */ {
    boxes:['main','iA','iB'], activeBox:'iB', activeStep:2,
    dimmed:['main','iA'], hidden:['iD','iC','iE','iF'],
    arrow:{ type:'ret', fromBox:'iD', fromStep:3, toBox:'iB', toStep:2 },
    linkArrow:{ fromBox:'iA', fromStep:1, toBox:'iB' },
    panTo:'iB',
    expl:'inorder(D) returns. Back to inorder(B). Now visit B.'
  },
  /* 12 */ {
    boxes:['main','iA','iB'], activeBox:'iB', activeStep:2,
    dimmed:['main','iA'], hidden:['iD','iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iA', fromStep:1, toBox:'iB' },
    panTo:'iB',
    expl:'Visit B — printf fires. B added to output.'
  },
  /* 13 */ {
    boxes:['main','iA','iB'], activeBox:'iB', activeStep:3,
    dimmed:['main','iA'], hidden:['iD','iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iA', fromStep:1, toBox:'iB' },
    panTo:'iB',
    expl:'inorder(B.right) = NULL → return. inorder(B) complete.'
  },
  /* 14 */ {
    boxes:['main','iA'], activeBox:'iA', activeStep:2,
    dimmed:['main'], hidden:['iB','iD','iC','iE','iF'],
    arrow:{ type:'ret', fromBox:'iB', fromStep:3, toBox:'iA', toStep:2 },
    linkArrow:{ fromBox:'main', fromStep:0, toBox:'iA' },
    panTo:'iA',
    expl:'inorder(B) returns. Back to inorder(A). Now visit A.'
  },
  /* 15 */ {
    boxes:['main','iA'], activeBox:'iA', activeStep:2,
    dimmed:['main'], hidden:['iB','iD','iC','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'main', fromStep:0, toBox:'iA' },
    panTo:'iA',
    expl:'Visit A — printf fires. A added to output.'
  },
  /* 16 */ {
    boxes:['main','iA','iC'], activeBox:'iC', activeStep:0,
    dimmed:['main','iA'], hidden:['iB','iD','iE','iF'],
    arrow:{ type:'call', fromBox:'iA', fromStep:3, toBox:'iC', toStep:0 },
    linkArrow:{ fromBox:'iA', fromStep:3, toBox:'iC' },
    panTo:'iC',
    expl:'inorder(A) goes RIGHT — calls inorder(C).'
  },
  /* 17 */ {
    boxes:['main','iA','iC'], activeBox:'iC', activeStep:0,
    dimmed:['main','iA'], hidden:['iB','iD','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iA', fromStep:3, toBox:'iC' },
    panTo:'iC',
    expl:'inorder(C): root == NULL? NO. Go left.'
  },
  /* 18 */ {
    boxes:['main','iA','iC','iE'], activeBox:'iE', activeStep:0,
    dimmed:['main','iA','iC'], hidden:['iB','iD','iF'],
    arrow:{ type:'call', fromBox:'iC', fromStep:1, toBox:'iE', toStep:0 },
    linkArrow:{ fromBox:'iC', fromStep:1, toBox:'iE' },
    panTo:'iE',
    expl:'inorder(C) goes LEFT — calls inorder(E).'
  },
  /* 19 */ {
    boxes:['main','iA','iC','iE'], activeBox:'iE', activeStep:1,
    dimmed:['main','iA','iC'], hidden:['iB','iD','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iC', fromStep:1, toBox:'iE' },
    panTo:'iE',
    expl:'inorder(E.left) = NULL → return immediately.'
  },
  /* 20 */ {
    boxes:['main','iA','iC','iE'], activeBox:'iE', activeStep:2,
    dimmed:['main','iA','iC'], hidden:['iB','iD','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iC', fromStep:1, toBox:'iE' },
    panTo:'iE',
    expl:'Visit E — printf fires. E added to output.'
  },
  /* 21 */ {
    boxes:['main','iA','iC','iE'], activeBox:'iE', activeStep:3,
    dimmed:['main','iA','iC'], hidden:['iB','iD','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iC', fromStep:1, toBox:'iE' },
    panTo:'iE',
    expl:'inorder(E.right) = NULL → return. inorder(E) complete.'
  },
  /* 22 */ {
    boxes:['main','iA','iC'], activeBox:'iC', activeStep:2,
    dimmed:['main','iA'], hidden:['iB','iD','iE','iF'],
    arrow:{ type:'ret', fromBox:'iE', fromStep:3, toBox:'iC', toStep:2 },
    linkArrow:{ fromBox:'iA', fromStep:3, toBox:'iC' },
    panTo:'iC',
    expl:'inorder(E) returns. Back to inorder(C). Now visit C.'
  },
  /* 23 */ {
    boxes:['main','iA','iC'], activeBox:'iC', activeStep:2,
    dimmed:['main','iA'], hidden:['iB','iD','iE','iF'],
    arrow:null,
    linkArrow:{ fromBox:'iA', fromStep:3, toBox:'iC' },
    panTo:'iC',
    expl:'Visit C — printf fires. C added to output.'
  },
  /* 24 */ {
    boxes:['main','iA','iC','iF'], activeBox:'iF', activeStep:0,
    dimmed:['main','iA','iC'], hidden:['iB','iD','iE'],
    arrow:{ type:'call', fromBox:'iC', fromStep:3, toBox:'iF', toStep:0 },
    linkArrow:{ fromBox:'iC', fromStep:3, toBox:'iF' },
    panTo:'iF',
    expl:'inorder(C) goes RIGHT — calls inorder(F).'
  },
  /* 25 */ {
    boxes:['main','iA','iC','iF'], activeBox:'iF', activeStep:1,
    dimmed:['main','iA','iC'], hidden:['iB','iD','iE'],
    arrow:null,
    linkArrow:{ fromBox:'iC', fromStep:3, toBox:'iF' },
    panTo:'iF',
    expl:'inorder(F.left) = NULL → return immediately.'
  },
  /* 26 */ {
    boxes:['main','iA','iC','iF'], activeBox:'iF', activeStep:2,
    dimmed:['main','iA','iC'], hidden:['iB','iD','iE'],
    arrow:null,
    linkArrow:{ fromBox:'iC', fromStep:3, toBox:'iF' },
    panTo:'iF',
    expl:'Visit F — printf fires. F added to output.'
  },
  /* 27 */ {
    boxes:['main'], activeBox:'main', activeStep:0,
    dimmed:[], hidden:['iA','iB','iC','iD','iE','iF'],
    arrow:{ type:'ret', fromBox:'iF', fromStep:3, toBox:'iC', toStep:3 },
    linkArrow:null,
    panTo:'main',
    expl:'inorder(F) complete. All frames return. Inorder traversal done! Output: D B A E C F.',
    done:true
  },
];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
let currentType  = 'inorder';
let currentStep  = 0;
let steps        = INORDER_STEPS;
let config       = TRAVERSAL_CONFIGS['inorder'];

/* ══════════════════════════════════════════════════════════════
   DOM REFS
══════════════════════════════════════════════════════════════ */
const elCodeLines      = document.getElementById('codeLines');
const elCurrentAction  = document.getElementById('currentAction');
const elStatusType     = document.getElementById('statusType');
const elStatusRule     = document.getElementById('statusRule');
const elStatusVisiting = document.getElementById('statusVisiting');
const elHeaderStepNum  = document.getElementById('headerStepNum');
const elHeaderStepTot  = document.getElementById('headerStepTotal');
const elVisitedChips   = document.getElementById('visitedChips');
const elRemainingChips = document.getElementById('remainingChips');
const elCallStack      = document.getElementById('callStack');
const elHintText       = document.getElementById('hintText');
const elOutputChips    = document.getElementById('outputChips');
const elCurrentLabel   = document.getElementById('currentLabel');
const elRuleName       = document.getElementById('ruleName');
const elRulePill       = document.getElementById('rulePill');
const elLegendBtn      = document.getElementById('legendBtn');
const elLegendPanel    = document.getElementById('legendPanel');
const elTreeEdges      = document.getElementById('treeEdges');
const elTreeNodes      = document.getElementById('treeNodes');
const elStepPill       = document.getElementById('stepPill');
const elAnimStatus     = document.getElementById('animStatus');

const animCanvas   = document.getElementById('animCanvas');
const animViewport = document.getElementById('animViewport');
const arrowsSvg    = document.getElementById('arrowsSvg');

const btnReset     = document.getElementById('btnReset');
const btnPrev      = document.getElementById('btnPrev');
const btnNext      = document.getElementById('btnNext');

/* ══════════════════════════════════════════════════════════════
   BUILD CODE PANEL
══════════════════════════════════════════════════════════════ */
function buildCodePanel() {
  elCodeLines.innerHTML = '';
  const lines = CODE[currentType];
  lines.forEach(line => {
    const row = document.createElement('div');
    row.className = 'viz-code-line';
    row.id = 'ln-' + line.n;
    row.innerHTML = `<span class="lnum">${line.n}</span><span class="lcode">${line.html}</span>`;
    elCodeLines.appendChild(row);
  });
}

/* ══════════════════════════════════════════════════════════════
   BUILD SVG TREE
══════════════════════════════════════════════════════════════ */
function buildTreeSVG() {
  /* Edges */
  elTreeEdges.innerHTML = '';
  EDGES.forEach(([p, c]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('id', `edge-${p}-${c}`);
    line.setAttribute('class', 'tree-edge pending');
    line.setAttribute('x1', NODE_POS[p].x);
    line.setAttribute('y1', NODE_POS[p].y);
    line.setAttribute('x2', NODE_POS[c].x);
    line.setAttribute('y2', NODE_POS[c].y);
    elTreeEdges.appendChild(line);
  });

  /* Nodes */
  elTreeNodes.innerHTML = '';
  Object.entries(NODE_POS).forEach(([id, pos]) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', `node-${id}`);
    g.setAttribute('class', 'tree-circle-node');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('id', `circle-${id}`);
    circle.setAttribute('cx', pos.x);
    circle.setAttribute('cy', pos.y);
    circle.setAttribute('r', 22);
    circle.setAttribute('class', 'tree-node-circle');
    circle.setAttribute('fill', '#ffffff');
    circle.setAttribute('stroke', '#e2e8f0');
    circle.setAttribute('stroke-width', '2');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('id', `label-${id}`);
    text.setAttribute('x', pos.x);
    text.setAttribute('y', pos.y);
    text.setAttribute('class', 'tree-node-label');
    text.setAttribute('fill', '#0f172a');
    text.textContent = id;

    g.appendChild(circle);
    g.appendChild(text);
    elTreeNodes.appendChild(g);
  });
}

/* ══════════════════════════════════════════════════════════════
   ANIMATION PANEL — VERTICAL CALL STACK
   Boxes stack downward: main at top, children below.
   Layout: depth-based top, centered left.
══════════════════════════════════════════════════════════════ */

const BOX_WIDTH   = 236;
const BOX_GAP_V   = 32;    /* vertical gap between parent and child */
const CANVAS_TOP_PAD = 24;

/* Depth in call chain — determines vertical position */
const BOX_DEPTH = { main:0, iA:1, iB:2, iD:3, iC:2, iE:3, iF:3 };

/* Parent map for computing top position */
const BOX_PARENT_OF = { iA:'main', iB:'iA', iD:'iB', iC:'iA', iE:'iC', iF:'iC' };

/* Estimated box height: header ~36px + steps*28px + padding 12px */
function estimatedBoxHeight(id) {
  const def = BOX_DEFS[id];
  if (!def) return 60;
  return 36 + def.steps.length * 28 + 12;
}

/* Compute top of box based on parent chain */
function computeBoxTop(id) {
  const parentId = BOX_PARENT_OF[id];
  if (!parentId) return CANVAS_TOP_PAD; /* main at top */
  const parentTop = computeBoxTop(parentId);
  const parentH   = estimatedBoxHeight(parentId);
  return parentTop + parentH + BOX_GAP_V;
}

/* Centered left in viewport */
function computeBoxLeft() {
  if (!animViewport) return 20;
  const vpW = animViewport.offsetWidth;
  return Math.max(20, (vpW / 2) - (BOX_WIDTH / 2));
}

const boxEls = {};
let drawnLinks = new Set();

function buildBox(id) {
  const def = BOX_DEFS[id];
  if (!def) return;
  const el = document.createElement('div');
  el.className = 'call-box';
  el.id = 'box-' + id;
  /* Position set by JS — top based on depth chain, left centered */
  el.style.top  = computeBoxTop(id) + 'px';
  el.style.left = computeBoxLeft() + 'px';
  el.style.width = BOX_WIDTH + 'px';
  el.style.display = 'none';

  const nameClass = def.isMain ? 'is-main' : '';
  const badgeCls  = def.isMain ? 'main-badge' : '';

  el.innerHTML =
    `<div class="box-header">` +
      `<span class="box-fn-name ${nameClass}">${def.label}</span>` +
      (def.badge ? `<span class="box-badge ${badgeCls}">${def.badge}</span>` : '') +
    `</div>` +
    `<div class="box-steps" id="bsteps-${id}">` +
      def.steps.map((s, i) =>
        `<div class="box-step" id="bstep-${id}-${i}">` +
          `<span class="step-num">${i+1}</span>` +
          `<span>${s.text}</span>` +
        `</div>`
      ).join('') +
    `</div>`;

  animCanvas.appendChild(el);
  boxEls[id] = el;
}

function buildAllBoxes() {
  ALL_ANIM_BOX_IDS.forEach(buildBox);
  /* Set canvas min-height to fit all boxes */
  updateCanvasHeight();
}

function updateCanvasHeight() {
  if (!animCanvas) return;
  const maxDepth = Math.max(...ALL_ANIM_BOX_IDS.map(id => BOX_DEPTH[id]));
  /* Estimate total height needed */
  let maxBottom = CANVAS_TOP_PAD;
  ALL_ANIM_BOX_IDS.forEach(id => {
    const t = computeBoxTop(id);
    const h = estimatedBoxHeight(id);
    if (t + h > maxBottom) maxBottom = t + h;
  });
  animCanvas.style.minHeight = (maxBottom + 80) + 'px';
}

/* Reposition boxes on resize (left changes when viewport width changes) */
function repositionBoxes() {
  const left = computeBoxLeft() + 'px';
  ALL_ANIM_BOX_IDS.forEach(id => {
    const el = boxEls[id];
    if (el) el.style.left = left;
  });
}

/* ── Visibility + highlight ── */
function setBoxVisibility(as) {
  const dimmedIds = as.dimmed || [];
  const hiddenIds = as.hidden || [];

  ALL_ANIM_BOX_IDS.forEach(id => {
    const el = boxEls[id];
    if (!el) return;
    if (hiddenIds.includes(id)) {
      el.style.display = 'none';
      el.classList.remove('active-box','dimmed','box-fadein');
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
    } else {
      const wasHidden = el.style.display === 'none';
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
      const isActive = id === as.activeBox;
      const isDimmed = dimmedIds.includes(id);
      el.classList.toggle('active-box', isActive);
      el.classList.toggle('dimmed', isDimmed && !isActive);
      if (wasHidden) {
        el.classList.remove('box-fadein');
        void el.offsetWidth;
        el.classList.add('box-fadein');
      }
    }
  });
}

function setBoxStepHighlight(as) {
  ALL_ANIM_BOX_IDS.forEach(id => {
    const def = BOX_DEFS[id];
    if (!def) return;
    def.steps.forEach((_, i) => {
      const el = document.getElementById(`bstep-${id}-${i}`);
      if (!el) return;
      el.classList.toggle('active-step', id === as.activeBox && i === as.activeStep);
    });
  });
}

/* ── Vertical pan ── */
/* Compute current offsets from canvas transform */
function getCurrentOffsets() {
  const m = animCanvas.style.transform.match(/translate\(\s*(-?[\d.]+)px\s*,\s*(-?[\d.]+)px\s*\)/);
  if (m) return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
  /* Try translateY-only form */
  const my = animCanvas.style.transform.match(/translateY\(\s*(-?[\d.]+)px\s*\)/);
  if (my) return { x: 0, y: parseFloat(my[1]) };
  return { x: 0, y: 0 };
}

function setOffsets(ox, oy) {
  const vpH = animViewport ? animViewport.offsetHeight : 400;
  const canvasH = animCanvas ? (parseInt(animCanvas.style.minHeight) || 1200) : 1200;
  /* Clamp: don't drag canvas too far up or down */
  const minY = -(canvasH - vpH * 0.5);
  const cy = Math.max(minY, Math.min(40, oy));
  animCanvas.style.transform = `translate(0px, ${cy}px)`;
}

function computePanTarget(id) {
  if (!id || !animViewport) return null;
  const vpH    = animViewport.offsetHeight;
  const boxTop = computeBoxTop(id);
  const boxH   = estimatedBoxHeight(id);

  /* Scroll so active box + its parent (if any) are visible.
     Target: parent top near viewport top (24px pad), child fully visible. */
  const parentId = BOX_PARENT_OF[id];
  let targetY;
  if (parentId) {
    const parentTop = computeBoxTop(parentId);
    /* Show parent at top with 16px pad, child should be visible */
    const idealY = -(parentTop - 16);
    /* Verify child fits; if not, scroll to show child */
    const childBottom = boxTop + boxH;
    const childBottomInView = -(idealY) + childBottom;
    if (childBottomInView > vpH - 16) {
      /* Child cut off — scroll to show child with some top context */
      targetY = -(boxTop - 64);
    } else {
      targetY = idealY;
    }
  } else {
    targetY = -(boxTop - 24);
  }
  /* Clamp */
  const canvasH = parseInt(animCanvas.style.minHeight) || 1200;
  const minY = -(canvasH - vpH * 0.5);
  return Math.max(minY, Math.min(40, targetY));
}

function panToBox(id) {
  if (!id || !animViewport) return;
  const targetY = computePanTarget(id);
  if (targetY === null) return;
  animCanvas.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
  animCanvas.style.transform  = `translate(0px, ${targetY}px)`;
  setTimeout(() => { if (animCanvas) animCanvas.style.transition = ''; }, 470);
}

function smoothPanToBox(id, callback) {
  if (!id || !animViewport) { if (callback) callback(); return; }
  const targetY = computePanTarget(id);
  if (targetY === null) { if (callback) callback(); return; }
  const DURATION = 450;
  animCanvas.style.transition = `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1)`;
  animCanvas.style.transform  = `translate(0px, ${targetY}px)`;
  setTimeout(() => {
    if (animCanvas) animCanvas.style.transition = '';
    if (callback) callback();
  }, DURATION + 20);
}

/* ── Arrow drawing (vertical bezier: top→bottom for call, bottom→top for return) ── */
function clearArrows() {
  arrowsSvg.querySelectorAll('path, line').forEach(el => el.remove());
}

/* Get midpoint of a step row — 'top' for top edge, 'bottom' for bottom edge, 'left'/'right' for sides */
function getStepRowMidpoint(boxId, stepIdx, side) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;
  const stepsEl = el.querySelector('.box-steps');
  const stepEls = stepsEl ? stepsEl.querySelectorAll('.box-step') : [];
  const target  = stepEls[stepIdx];
  const vpRect  = animViewport.getBoundingClientRect();

  if (!target) {
    /* Fallback: use box header */
    return getBoxHeaderMidpoint(boxId, side);
  }
  const r = target.getBoundingClientRect();
  switch (side) {
    case 'top':    return { x: r.left - vpRect.left + r.width / 2,  y: r.top  - vpRect.top };
    case 'bottom': return { x: r.left - vpRect.left + r.width / 2,  y: r.bottom - vpRect.top };
    case 'right':  return { x: r.right - vpRect.left,               y: r.top  - vpRect.top + r.height / 2 };
    case 'left':   return { x: r.left  - vpRect.left,               y: r.top  - vpRect.top + r.height / 2 };
    default:       return { x: r.left  - vpRect.left + r.width / 2, y: r.top  - vpRect.top + r.height / 2 };
  }
}

function getBoxHeaderMidpoint(boxId, side) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;
  const hdr = el.querySelector('.box-header');
  if (!hdr) return null;
  const vpRect = animViewport.getBoundingClientRect();
  const r = hdr.getBoundingClientRect();
  switch (side) {
    case 'top':    return { x: r.left - vpRect.left + r.width / 2, y: r.top    - vpRect.top };
    case 'bottom': return { x: r.left - vpRect.left + r.width / 2, y: r.bottom - vpRect.top };
    case 'right':  return { x: r.right - vpRect.left,              y: r.top    - vpRect.top + r.height / 2 };
    case 'left':   return { x: r.left  - vpRect.left,              y: r.top    - vpRect.top + r.height / 2 };
    default:       return { x: r.left  - vpRect.left + r.width / 2,y: r.top    - vpRect.top + r.height / 2 };
  }
}

function getBoxBottom(boxId) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;
  const vpRect = animViewport.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - vpRect.left + r.width / 2, y: r.bottom - vpRect.top };
}

function getBoxTop(boxId) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;
  const vpRect = animViewport.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - vpRect.left + r.width / 2, y: r.top - vpRect.top };
}

/* Vertical bezier: top→bottom */
function vertBezierPath(x1, y1, x2, y2) {
  const dy   = Math.abs(y2 - y1);
  const cp1y = y1 + dy * 0.45;
  const cp2y = y2 - dy * 0.45;
  return `M ${x1} ${y1} C ${x1} ${cp1y}, ${x2} ${cp2y}, ${x2} ${y2}`;
}

function makePath(d, cls, markerId, animate) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', cls);
  if (markerId) path.setAttribute('marker-end', `url(#${markerId})`);
  arrowsSvg.appendChild(path);

  if (animate) {
    const drawDuration = 520;
    requestAnimationFrame(() => {
      const len = path.getTotalLength();
      path.style.strokeDasharray  = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.transition = 'none';
      void path.getBoundingClientRect();
      path.style.transition = `stroke-dashoffset ${drawDuration}ms cubic-bezier(0.4,0,0.2,1)`;
      path.style.strokeDashoffset = '0';
      setTimeout(() => {
        if (!path.isConnected) return;
        path.style.transition = '';
        path.style.strokeDasharray  = '';
        path.style.strokeDashoffset = '';
        const isRet  = cls.includes('arrow-ret');
        const isLink = cls.includes('arrow-link') && !cls.includes('faded');
        if (isRet)  path.style.animation = 'dash-flow-ret 0.65s linear infinite';
        if (isLink) path.style.animation = 'dash-flow 0.7s linear infinite';
      }, drawDuration + 20);
    });
  }
}

/* Link arrow: parent step-row bottom-center → child box top-center (vertical) */
function drawLinkArrow(link, faded) {
  if (!link) return;
  /* fromPoint: bottom of the calling step row in parent */
  const from = getStepRowMidpoint(link.fromBox, link.fromStep, 'bottom');
  /* toPoint: top of child box header */
  const to   = getBoxTop(link.toBox);
  if (!from || !to) return;

  /* Offset slightly so call and return arrows don't exactly overlap */
  const fx = from.x - 8;
  const tx = to.x   - 8;

  const cls = faded ? 'arrow-link arrow-link-faded' : 'arrow-link';
  const linkKey = `${link.fromBox}->${link.toBox}`;
  const shouldAnimate = !faded && !drawnLinks.has(linkKey);
  if (shouldAnimate) drawnLinks.add(linkKey);
  makePath(vertBezierPath(fx, from.y, tx, to.y), cls, 'mh-call', shouldAnimate);
}

/* Return arrow: child top-center → parent step-row bottom-center (going UP) */
function drawReturnArrow(arrow) {
  if (!arrow || arrow.type !== 'ret') return;
  const fromEl = boxEls[arrow.fromBox];
  const toEl   = boxEls[arrow.toBox];
  if (!fromEl || !toEl) return;
  if (fromEl.style.display === 'none' || toEl.style.display === 'none') return;

  /* From: top of child box (returning upward) */
  const from = getBoxTop(arrow.fromBox);
  /* To: bottom of destination step row in parent */
  const to   = getStepRowMidpoint(arrow.toBox, arrow.toStep, 'bottom');
  if (!from || !to) return;

  /* Offset to avoid overlapping link arrow */
  const fx = from.x + 8;
  const tx = to.x   + 8;

  const d = vertBezierPath(fx, from.y, tx, to.y);
  const retKey = `ret:${arrow.fromBox}->${arrow.toBox}`;
  const shouldAnimate = !drawnLinks.has(retKey);
  if (shouldAnimate) drawnLinks.add(retKey);
  makePath(d, 'arrow-ret', 'mh-ret', shouldAnimate);
}

function redrawAllArrows(as) {
  clearArrows();
  requestAnimationFrame(() => {
    if (as.linkArrow) drawLinkArrow(as.linkArrow, false);
    if (as.arrow && as.arrow.type === 'ret') drawReturnArrow(as.arrow);
  });
}

/* ── Fade out boxes disappearing from prev → next step ── */
function fadeOutBoxes(ids, callback) {
  if (!ids.length) { callback(); return; }
  const FADE = 260;
  ids.forEach(id => {
    const el = boxEls[id];
    if (!el || el.style.display === 'none') return;
    el.style.transition = `opacity ${FADE}ms ease, transform ${FADE}ms ease`;
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(-8px) scale(0.97)';
  });
  setTimeout(() => {
    ids.forEach(id => {
      const el = boxEls[id];
      if (!el) return;
      el.style.display    = 'none';
      el.style.opacity    = '';
      el.style.transform  = '';
      el.style.transition = '';
      el.classList.remove('active-box','dimmed','box-fadein');
    });
    callback();
  }, FADE);
}

/* ── Update progress dots (only for inorder — 27 steps) ── */
function buildAnimProgressDots() {
  const dotsEl = document.getElementById('progressDots');
  if (!dotsEl) return;
  if (currentType !== 'inorder') { dotsEl.innerHTML = ''; return; }
  dotsEl.innerHTML = INORDER_ANIM_STEPS.map((_, i) =>
    `<div class="viz-dot" id="adot-${i}"></div>`
  ).join('');
}

function updateAnimDots(idx) {
  INORDER_ANIM_STEPS.forEach((_, i) => {
    const d = document.getElementById('adot-' + i);
    if (!d) return;
    d.className = 'viz-dot' +
      (i === idx ? ' viz-dot-active' : '') +
      (i < idx   ? ' viz-dot-done'   : '');
  });
}

/* ── renderAnimStep — drives center panel from INORDER_ANIM_STEPS ── */
function renderAnimStep(idx) {
  if (currentType !== 'inorder') {
    /* Non-inorder: hide all anim boxes, clear arrows */
    ALL_ANIM_BOX_IDS.forEach(id => {
      const el = boxEls[id];
      if (el) { el.style.display = 'none'; el.classList.remove('active-box','dimmed','box-fadein'); }
    });
    clearArrows();
    if (elAnimStatus) elAnimStatus.textContent = 'Inorder only';
    return;
  }

  const as = INORDER_ANIM_STEPS[idx];
  if (!as) return;

  /* Compute disappearing boxes vs prev step */
  const prev   = idx > 0 ? INORDER_ANIM_STEPS[idx - 1] : null;
  const prevVis = new Set(prev ? (prev.boxes || []) : []);
  const nextVis = new Set(as.boxes || []);
  const disappearing = [...prevVis].filter(id => !nextVis.has(id));

  /* Phase 1: fade out gone boxes */
  fadeOutBoxes(disappearing, () => {
    /* Phase 2: smooth vertical pan to active box */
    smoothPanToBox(as.panTo, () => {
      /* Phase 3: show boxes + arrows (after scroll settles) */
      setTimeout(() => {
        setBoxVisibility(as);
        setBoxStepHighlight(as);
        redrawAllArrows(as);
        updateAnimDots(idx);

        if (elAnimStatus) {
          const stepNum = idx + 1;
          elAnimStatus.textContent = stepNum >= INORDER_ANIM_STEPS.length ? 'Done' : `Step ${stepNum}`;
        }

        if (as.done) showDoneOverlay();
      }, 60);
    });
  });
}

function showDoneOverlay() {
  if (!animViewport) return;
  if (animViewport.querySelector('.done-overlay')) return;
  const div = document.createElement('div');
  div.className = 'done-overlay';
  div.innerHTML =
    `<div class="done-icon">🌿</div>` +
    `<div class="done-title">Traversal Done!</div>` +
    `<div class="done-sub">Output: D → B → A → E → C → F</div>`;
  animViewport.appendChild(div);
}

/* ══════════════════════════════════════════════════════════════
   RENDER STEP  (right panel + code + anim panel)
══════════════════════════════════════════════════════════════ */
function renderStep(idx) {
  /* Remove done overlay when going back */
  if (animViewport) {
    const done = animViewport.querySelector('.done-overlay');
    if (done && !steps[idx].done) done.remove();
  }

  const s = steps[idx];
  if (!s) return;

  /* Header */
  elHeaderStepNum.textContent = s.stepLabel;
  elHeaderStepTot.textContent = steps.length;

  /* Step pill */
  elStepPill.textContent = (idx + 1) + ' / ' + steps.length;

  /* Code highlight */
  document.querySelectorAll('.viz-code-line').forEach(el => el.classList.remove('viz-line-active'));
  s.codeLines.forEach(n => {
    const el = document.getElementById('ln-' + n);
    if (el) {
      el.classList.add('viz-line-active');
      el.scrollIntoView({ block:'nearest', behavior:'smooth' });
    }
  });

  /* Status bar */
  elStatusType.textContent = config.statusType;

  /* Currently visiting */
  if (s.currentNode) {
    elStatusVisiting.textContent = s.currentNode;
    elStatusVisiting.className = 'viz-status-visiting';
  } else {
    elStatusVisiting.textContent = '—';
    elStatusVisiting.className = 'viz-status-visiting none';
  }

  /* Current action */
  elCurrentAction.innerHTML = s.action;

  /* SVG tree: node colors */
  Object.keys(NODE_POS).forEach(id => {
    const circle = document.getElementById(`circle-${id}`);
    const label  = document.getElementById(`label-${id}`);
    if (!circle || !label) return;

    if (id === s.currentNode) {
      circle.setAttribute('fill', '#f59e0b');
      circle.setAttribute('stroke', '#d97706');
      label.setAttribute('fill', '#ffffff');
    } else if (s.visitedNodes.includes(id)) {
      circle.setAttribute('fill', '#10b981');
      circle.setAttribute('stroke', '#059669');
      label.setAttribute('fill', '#ffffff');
    } else {
      circle.setAttribute('fill', '#ffffff');
      circle.setAttribute('stroke', '#e2e8f0');
      label.setAttribute('fill', '#0f172a');
    }
  });

  /* SVG tree: edge states */
  EDGES.forEach(([p, c]) => {
    const el = document.getElementById(`edge-${p}-${c}`);
    if (!el) return;
    const isTraversed = s.traversedEdges.some(([ep,ec]) => ep===p && ec===c);
    el.setAttribute('class', isTraversed ? 'tree-edge traversed' : 'tree-edge pending');
  });

  /* "Current" floating label */
  if (s.currentNode && NODE_POS[s.currentNode]) {
    const pos = NODE_POS[s.currentNode];
    const svg = document.getElementById('treeSvg');
    const vp  = document.getElementById('treeViewport');
    if (svg && vp) {
      const svgRect = svg.getBoundingClientRect();
      const vpRect  = vp.getBoundingClientRect();
      const vb      = svg.viewBox.baseVal;
      const scaleX  = svgRect.width  / vb.width;
      const scaleY  = svgRect.height / vb.height;
      const px = (svgRect.left - vpRect.left) + pos.x * scaleX + 26;
      const py = (svgRect.top  - vpRect.top)  + pos.y * scaleY - 40;
      elCurrentLabel.style.left = px + 'px';
      elCurrentLabel.style.top  = py + 'px';
      elCurrentLabel.style.display = 'flex';
    }
  } else {
    elCurrentLabel.style.display = 'none';
  }

  /* Visited / remaining chips */
  const visitOrder = config.visitOrder;
  elVisitedChips.innerHTML = s.visitedNodes.length === 0
    ? '<span class="viz-empty-chips">None yet</span>'
    : s.visitedNodes.map(n =>
        `<span class="viz-node-chip viz-chip-visited">${n}</span>`
      ).join('');

  const remaining = visitOrder.filter(n => !s.visitedNodes.includes(n));
  elRemainingChips.innerHTML = remaining.length === 0
    ? '<span class="viz-empty-chips">All done! 🎉</span>'
    : remaining.map(n =>
        `<span class="viz-node-chip viz-chip-remaining">${n}</span>`
      ).join('');

  /* Call stack */
  elCallStack.innerHTML = s.callStack.map((frame, i) => {
    const isTop  = i === s.callStack.length - 1;
    const isMain = frame.startsWith('main');
    const cls = isMain ? 'viz-stack-main' : (isTop ? 'viz-stack-active' : 'viz-stack-waiting');
    return `<div class="viz-stack-frame ${cls}">${frame}</div>`;
  }).join('');

  /* Traversal output chips */
  buildOutputChips(s, visitOrder);

  /* Buttons */
  btnPrev.disabled = (idx === 0);
  btnNext.disabled = (idx === steps.length - 1);

  /* ── ANIM PANEL ── */
  renderAnimStep(idx);
}

/* Build output chip row */
function buildOutputChips(s, visitOrder) {
  elOutputChips.innerHTML = '';
  visitOrder.forEach((node, i) => {
    if (i > 0) {
      const arrow = document.createElement('span');
      arrow.className = 'viz-output-arrow';
      arrow.textContent = '→';
      elOutputChips.appendChild(arrow);
    }
    const chip = document.createElement('span');
    chip.className = 'viz-output-chip';
    chip.textContent = node;
    if (s.visitedNodes.includes(node)) {
      chip.classList.add(node === s.currentNode && s.visitedNodes[s.visitedNodes.length-1]===node ? 'current' : 'visited');
    } else if (node === s.currentNode) {
      chip.classList.add('current');
    } else {
      chip.classList.add('pending');
    }
    elOutputChips.appendChild(chip);
  });
}

/* ═══════════════════════════════════════════════════════════
   TRAVERSAL TYPE SWITCH
═══════════════════════════════════════════════════════════ */
function switchTraversal(type) {
  currentType = type;
  config = TRAVERSAL_CONFIGS[type];
  steps  = buildSteps(type);
  currentStep = 0;
  drawnLinks.clear();

  /* Reset anim canvas */
  if (animCanvas) {
    animCanvas.style.transition = '';
    animCanvas.style.transform  = 'translate(0px, 0px)';
  }
  ALL_ANIM_BOX_IDS.forEach(id => {
    const el = boxEls[id];
    if (el) {
      el.style.display = 'none';
      el.classList.remove('active-box','dimmed','box-fadein');
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
    }
  });
  clearArrows();

  /* Remove done overlay if any */
  if (animViewport) {
    const done = animViewport.querySelector('.done-overlay');
    if (done) done.remove();
  }

  /* Update UI labels */
  elRuleName.textContent = config.ruleName;
  elRulePill.innerHTML = config.ruleHtml;
  elStatusRule.innerHTML = config.ruleHtml;
  elHintText.textContent = config.hint;
  elHeaderStepTot.textContent = steps.length;

  /* Update active tab */
  document.querySelectorAll('.viz-tab-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.type === type);
  });

  buildCodePanel();
  buildAnimProgressDots();
  buildTreeSVG();
  renderStep(0);
}

/* ═══════════════════════════════════════════════════════════
   EVENTS
═══════════════════════════════════════════════════════════ */
btnNext.addEventListener('click', () => {
  if (currentStep < steps.length - 1) { currentStep++; renderStep(currentStep); }
});
btnPrev.addEventListener('click', () => {
  if (currentStep > 0) { currentStep--; renderStep(currentStep); }
});
btnReset.addEventListener('click', () => {
  currentStep = 0;
  drawnLinks.clear();
  if (animCanvas) {
    animCanvas.style.transition = '';
    animCanvas.style.transform  = 'translate(0px, 0px)';
  }
  if (animViewport) {
    const done = animViewport.querySelector('.done-overlay');
    if (done) done.remove();
  }
  renderStep(0);
});

/* Tab buttons */
document.querySelectorAll('.viz-tab-btn').forEach(el => {
  el.addEventListener('click', () => {
    switchTraversal(el.dataset.type);
  });
});

/* Legend */
elLegendBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const shown = elLegendPanel.style.display !== 'none';
  elLegendPanel.style.display = shown ? 'none' : 'block';
});
document.addEventListener('click', () => {
  elLegendPanel.style.display = 'none';
});

/* Keyboard */
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    if (currentStep < steps.length - 1) { currentStep++; renderStep(currentStep); }
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    if (currentStep > 0) { currentStep--; renderStep(currentStep); }
  }
});

/* ── Drag-to-pan: vertical primary (both axes) ── */
(function initDrag() {
  if (!animViewport) return;

  /* Mouse drag */
  let dragging = false, startX = 0, startY = 0, startOffX = 0, startOffY = 0;

  animViewport.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    const off = getCurrentOffsets();
    startOffX = off.x; startOffY = off.y;
    animViewport.classList.add('grabbing');
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dy = e.clientY - startY;
    const newY = startOffY + dy;
    setOffsets(0, newY);
    /* Redraw arrows while dragging */
    if (currentType === 'inorder' && INORDER_ANIM_STEPS[currentStep]) {
      redrawAllArrows(INORDER_ANIM_STEPS[currentStep]);
    }
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    animViewport.classList.remove('grabbing');
  });

  /* Touch drag with inertia */
  let touchStartY = 0, touchOffY = 0;
  let lastTouchY = 0, lastTouchTime = 0;
  let velY = 0;
  let inertiaRaf = null;

  function cancelInertia() {
    if (inertiaRaf) { cancelAnimationFrame(inertiaRaf); inertiaRaf = null; }
  }

  function runInertia() {
    const FRICTION = 0.88;
    if (Math.abs(velY) < 0.3) { inertiaRaf = null; return; }
    const off = getCurrentOffsets();
    setOffsets(0, off.y + velY);
    velY *= FRICTION;
    if (currentType === 'inorder' && INORDER_ANIM_STEPS[currentStep]) {
      redrawAllArrows(INORDER_ANIM_STEPS[currentStep]);
    }
    inertiaRaf = requestAnimationFrame(runInertia);
  }

  animViewport.addEventListener('touchstart', e => {
    cancelInertia();
    touchStartY = e.touches[0].clientY;
    lastTouchY  = touchStartY;
    lastTouchTime = Date.now();
    velY = 0;
    const off = getCurrentOffsets(); touchOffY = off.y;
  }, { passive: true });

  animViewport.addEventListener('touchmove', e => {
    const ty  = e.touches[0].clientY;
    const now = Date.now();
    const dt  = Math.max(1, now - lastTouchTime);
    velY = (ty - lastTouchY) / dt * 16;
    lastTouchY = ty; lastTouchTime = now;
    const newY = touchOffY + (ty - touchStartY);
    setOffsets(0, newY);
    if (currentType === 'inorder' && INORDER_ANIM_STEPS[currentStep]) {
      redrawAllArrows(INORDER_ANIM_STEPS[currentStep]);
    }
  }, { passive: true });

  animViewport.addEventListener('touchend', () => {
    if (Math.abs(velY) > 1) {
      inertiaRaf = requestAnimationFrame(runInertia);
    }
  }, { passive: true });

  /* Mousewheel scroll (vertical) */
  animViewport.addEventListener('wheel', e => {
    e.preventDefault();
    cancelInertia();
    const off = getCurrentOffsets();
    setOffsets(0, off.y - e.deltaY * 0.8);
    if (currentType === 'inorder' && INORDER_ANIM_STEPS[currentStep]) {
      redrawAllArrows(INORDER_ANIM_STEPS[currentStep]);
    }
  }, { passive: false });
})();

/* Resize: reposition boxes + redraw arrows */
window.addEventListener('resize', () => {
  repositionBoxes();
  updateCanvasHeight();
  if (currentType === 'inorder' && INORDER_ANIM_STEPS[currentStep]) {
    redrawAllArrows(INORDER_ANIM_STEPS[currentStep]);
  }
});

/* ── Inject CSS: vertical fade-in for new boxes ── */
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes boxFadeInV {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .call-box.box-fadein { animation: boxFadeInV 0.28s ease-out forwards; }
    @keyframes dash-flow-ret { to { stroke-dashoffset: -18; } }
  `;
  document.head.appendChild(style);
})();

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
buildAllBoxes();
buildCodePanel();
buildAnimProgressDots();
buildTreeSVG();
renderStep(0);