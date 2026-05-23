/* ════════════════════════════════════════════════════════════
   Tree Traversal Visualize — IDS Studio Next
   Inorder / Preorder / Postorder step-by-step visualizer
   ════════════════════════════════════════════════════════════ */

/* ── Tree structure: A(root), B(A.left), C(A.right), D(B.right), E(C.left), F(C.right) ── */

/* SVG layout positions (viewBox 0 0 400 220) */
const NODE_POS = {
  A: { x: 200, y: 40  },
  B: { x: 110, y: 110 },
  C: { x: 290, y: 110 },
  D: { x: 155, y: 180 }, // B's right child
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
    visitOrder: ['B','D','A','E','C','F'],
    totalSteps: 35,
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
    totalSteps: 35,
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
    totalSteps: 35,
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
   INORDER STEPS — visit order: B D A E C F
   Tree: B.left=NULL, B.right=D (D is right child of B)
══════════════════════════════════════════════════════════════ */
const INORDER_STEPS = [
  /* 1 */ { codeLines:[21], currentNode:null, visitedNodes:[], traversedEdges:[], callStack:["main() root"], action:"Program starts. <strong>main()</strong> about to call inorder(root).", stepLabel:1 },
  /* 2 */ { codeLines:[10], currentNode:"A", visitedNodes:[], traversedEdges:[], callStack:["main() root","inorder(A)"], action:"main() calls <strong>inorder(A)</strong>. root ≠ NULL.", stepLabel:2 },
  /* 3 */ { codeLines:[13], currentNode:"A", visitedNodes:[], traversedEdges:[], callStack:["main() root","inorder(A)"], action:"<strong>inorder(A)</strong> goes LEFT. Calling <strong>inorder(B)</strong>.", stepLabel:3 },
  /* 4 */ { codeLines:[10], currentNode:"B", visitedNodes:[], traversedEdges:[["A","B"]], callStack:["main() root","inorder(A)","inorder(B)"], action:"<strong>inorder(A)</strong> calls <strong>inorder(B)</strong>. root ≠ NULL.", stepLabel:4 },
  /* 5 */ { codeLines:[13], currentNode:"B", visitedNodes:[], traversedEdges:[["A","B"]], callStack:["main() root","inorder(A)","inorder(B)"], action:"<strong>inorder(B)</strong> checks LEFT. B.left = NULL ✓ — no recursive call.", stepLabel:5 },
  /* 6 */ { codeLines:[14], currentNode:"B", visitedNodes:["B"], traversedEdges:[["A","B"]], callStack:["main() root","inorder(A)","inorder(B)"], action:"<strong>Visit B</strong> — printf fires. Output: B", stepLabel:6 },
  /* 7 */ { codeLines:[15], currentNode:"B", visitedNodes:["B"], traversedEdges:[["A","B"]], callStack:["main() root","inorder(A)","inorder(B)"], action:"<strong>inorder(B)</strong> goes RIGHT. B.right = D. Calling <strong>inorder(D)</strong>.", stepLabel:7 },
  /* 8 */ { codeLines:[10], currentNode:"D", visitedNodes:["B"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)","inorder(B)","inorder(D)"], action:"<strong>inorder(B)</strong> calls <strong>inorder(D)</strong>. root ≠ NULL.", stepLabel:8 },
  /* 9 */ { codeLines:[13], currentNode:"D", visitedNodes:["B"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)","inorder(B)","inorder(D)"], action:"<strong>inorder(D)</strong> checks LEFT. D.left = NULL ✓ — no recursive call.", stepLabel:9 },
  /* 10 */ { codeLines:[14], currentNode:"D", visitedNodes:["B","D"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)","inorder(B)","inorder(D)"], action:"<strong>Visit D</strong> — printf fires. Output: B D", stepLabel:10 },
  /* 11 */ { codeLines:[15], currentNode:"D", visitedNodes:["B","D"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)","inorder(B)","inorder(D)"], action:"<strong>inorder(D)</strong> checks RIGHT. D.right = NULL ✓ — no recursive call.", stepLabel:11 },
  /* 12 */ { codeLines:[16], currentNode:"D", visitedNodes:["B","D"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)","inorder(B)","inorder(D)"], action:"<strong>inorder(D)</strong> complete. Returning to <strong>inorder(B)</strong>.", stepLabel:12 },
  /* 13 */ { codeLines:[16], currentNode:"B", visitedNodes:["B","D"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)","inorder(B)"], action:"<strong>inorder(D)</strong> returned. <strong>inorder(B)</strong> complete. Returning to <strong>inorder(A)</strong>.", stepLabel:13 },
  /* 14 */ { codeLines:[14], currentNode:"A", visitedNodes:["B","D"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)"], action:"<strong>inorder(B)</strong> returned. <strong>inorder(A)</strong> resumes — next: visit(root).", stepLabel:14 },
  /* 15 */ { codeLines:[14], currentNode:"A", visitedNodes:["B","D","A"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)"], action:"<strong>Visit A</strong> — printf fires. Output: B D A", stepLabel:15 },
  /* 16 */ { codeLines:[15], currentNode:"A", visitedNodes:["B","D","A"], traversedEdges:[["A","B"],["B","D"]], callStack:["main() root","inorder(A)"], action:"<strong>inorder(A)</strong> goes RIGHT. Calling <strong>inorder(C)</strong>.", stepLabel:16 },
  /* 17 */ { codeLines:[10], currentNode:"C", visitedNodes:["B","D","A"], traversedEdges:[["A","B"],["B","D"],["A","C"]], callStack:["main() root","inorder(A)","inorder(C)"], action:"<strong>inorder(A)</strong> calls <strong>inorder(C)</strong>. root ≠ NULL.", stepLabel:17 },
  /* 18 */ { codeLines:[13], currentNode:"C", visitedNodes:["B","D","A"], traversedEdges:[["A","B"],["B","D"],["A","C"]], callStack:["main() root","inorder(A)","inorder(C)"], action:"<strong>inorder(C)</strong> goes LEFT. Calling <strong>inorder(E)</strong>.", stepLabel:18 },
  /* 19 */ { codeLines:[10], currentNode:"E", visitedNodes:["B","D","A"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(E)"], action:"<strong>inorder(C)</strong> calls <strong>inorder(E)</strong>. root ≠ NULL.", stepLabel:19 },
  /* 20 */ { codeLines:[13], currentNode:"E", visitedNodes:["B","D","A"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(E)"], action:"<strong>inorder(E)</strong> checks LEFT. E.left = NULL ✓ — no recursive call.", stepLabel:20 },
  /* 21 */ { codeLines:[14], currentNode:"E", visitedNodes:["B","D","A","E"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(E)"], action:"<strong>Visit E</strong> — printf fires. Output: B D A E", stepLabel:21 },
  /* 22 */ { codeLines:[15], currentNode:"E", visitedNodes:["B","D","A","E"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(E)"], action:"<strong>inorder(E)</strong> checks RIGHT. E.right = NULL ✓ — no recursive call.", stepLabel:22 },
  /* 23 */ { codeLines:[16], currentNode:"E", visitedNodes:["B","D","A","E"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(E)"], action:"<strong>inorder(E)</strong> complete. Returning to <strong>inorder(C)</strong>.", stepLabel:23 },
  /* 24 */ { codeLines:[14], currentNode:"C", visitedNodes:["B","D","A","E"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"]], callStack:["main() root","inorder(A)","inorder(C)"], action:"<strong>inorder(E)</strong> returned. <strong>inorder(C)</strong> resumes — next: visit(root).", stepLabel:24 },
  /* 25 */ { codeLines:[14], currentNode:"C", visitedNodes:["B","D","A","E","C"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"]], callStack:["main() root","inorder(A)","inorder(C)"], action:"<strong>Visit C</strong> — printf fires. Output: B D A E C", stepLabel:25 },
  /* 26 */ { codeLines:[15], currentNode:"C", visitedNodes:["B","D","A","E","C"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"]], callStack:["main() root","inorder(A)","inorder(C)"], action:"<strong>inorder(C)</strong> goes RIGHT. Calling <strong>inorder(F)</strong>.", stepLabel:26 },
  /* 27 */ { codeLines:[10], currentNode:"F", visitedNodes:["B","D","A","E","C"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(F)"], action:"<strong>inorder(C)</strong> calls <strong>inorder(F)</strong>. root ≠ NULL.", stepLabel:27 },
  /* 28 */ { codeLines:[13], currentNode:"F", visitedNodes:["B","D","A","E","C"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(F)"], action:"<strong>inorder(F)</strong> checks LEFT. F.left = NULL ✓ — no recursive call.", stepLabel:28 },
  /* 29 */ { codeLines:[14], currentNode:"F", visitedNodes:["B","D","A","E","C","F"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(F)"], action:"<strong>Visit F</strong> — printf fires. Output: B D A E C F", stepLabel:29 },
  /* 30 */ { codeLines:[15], currentNode:"F", visitedNodes:["B","D","A","E","C","F"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(F)"], action:"<strong>inorder(F)</strong> checks RIGHT. F.right = NULL ✓ — no recursive call.", stepLabel:30 },
  /* 31 */ { codeLines:[16], currentNode:"F", visitedNodes:["B","D","A","E","C","F"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root","inorder(A)","inorder(C)","inorder(F)"], action:"<strong>inorder(F)</strong> complete. Returning to <strong>inorder(C)</strong>.", stepLabel:31 },
  /* 32 */ { codeLines:[16], currentNode:"C", visitedNodes:["B","D","A","E","C","F"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root","inorder(A)","inorder(C)"], action:"<strong>inorder(F)</strong> returned. <strong>inorder(C)</strong> complete. Returning to <strong>inorder(A)</strong>.", stepLabel:32 },
  /* 33 */ { codeLines:[16], currentNode:"A", visitedNodes:["B","D","A","E","C","F"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root","inorder(A)"], action:"<strong>inorder(C)</strong> returned. <strong>inorder(A)</strong> complete. Returning to <strong>main()</strong>.", stepLabel:33 },
  /* 34 */ { codeLines:[22], currentNode:null, visitedNodes:["B","D","A","E","C","F"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root"], action:"<strong>inorder(A)</strong> returned to <strong>main()</strong>. Stack fully unwound. Returning 0.", stepLabel:34 },
  /* 35 */ { codeLines:[22], currentNode:null, visitedNodes:["B","D","A","E","C","F"], traversedEdges:[["A","B"],["B","D"],["A","C"],["C","E"],["C","F"]], callStack:["main() root"], action:"<strong>Inorder traversal complete!</strong> Output: B → D → A → E → C → F", stepLabel:35, done:true }
];

/* ══════════════════════════════════════════════════════════════
   PREORDER STEPS — 35 steps synced 1:1 with PREORDER_ANIM_STEPS
   visit order: A B D C E F
══════════════════════════════════════════════════════════════ */
const PREORDER_STEPS = [
  /* 1 — program start */
  { codeLines:[21], currentNode:null, visitedNodes:[], traversedEdges:[], callStack:['main() root'], action:'Program starts. <strong>main()</strong> about to call preorder(root).', stepLabel:1 },
  /* 2 — preorder(A) called */
  { codeLines:[10], currentNode:'A', visitedNodes:[], traversedEdges:[], callStack:['main() root','preorder(A)'], action:'main() calls <strong>preorder(A)</strong>. root ≠ NULL.', stepLabel:2 },
  /* 3 — Visit A immediately (Root first) */
  { codeLines:[13], currentNode:'A', visitedNodes:['A'], traversedEdges:[], callStack:['main() root','preorder(A)'], action:'<strong>Visit A</strong> — printf fires first (Root). Output: A', stepLabel:3 },
  /* 4 — preorder(A) goes LEFT */
  { codeLines:[14], currentNode:'A', visitedNodes:['A'], traversedEdges:[], callStack:['main() root','preorder(A)'], action:'<strong>preorder(A)</strong> goes LEFT. Calling <strong>preorder(B)</strong>.', stepLabel:4 },
  /* 5 — preorder(B) called */
  { codeLines:[10], currentNode:'B', visitedNodes:['A'], traversedEdges:[['A','B']], callStack:['main() root','preorder(A)','preorder(B)'], action:'<strong>preorder(A)</strong> calls <strong>preorder(B)</strong>. root ≠ NULL.', stepLabel:5 },
  /* 6 — Visit B immediately */
  { codeLines:[13], currentNode:'B', visitedNodes:['A','B'], traversedEdges:[['A','B']], callStack:['main() root','preorder(A)','preorder(B)'], action:'<strong>Visit B</strong> — printf fires. Output: A B', stepLabel:6 },
  /* 7 — preorder(B): B.left=NULL inline */
  { codeLines:[14], currentNode:'B', visitedNodes:['A','B'], traversedEdges:[['A','B']], callStack:['main() root','preorder(A)','preorder(B)'], action:'<strong>preorder(B)</strong> checks LEFT. B.left = NULL ✓ — no recursive call.', stepLabel:7 },
  /* 8 — preorder(B) goes RIGHT */
  { codeLines:[15], currentNode:'B', visitedNodes:['A','B'], traversedEdges:[['A','B']], callStack:['main() root','preorder(A)','preorder(B)'], action:'<strong>preorder(B)</strong> goes RIGHT. B.right = D. Calling <strong>preorder(D)</strong>.', stepLabel:8 },
  /* 9 — preorder(D) called */
  { codeLines:[10], currentNode:'D', visitedNodes:['A','B'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','preorder(A)','preorder(B)','preorder(D)'], action:'<strong>preorder(B)</strong> calls <strong>preorder(D)</strong>. root ≠ NULL.', stepLabel:9 },
  /* 10 — Visit D immediately */
  { codeLines:[13], currentNode:'D', visitedNodes:['A','B','D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','preorder(A)','preorder(B)','preorder(D)'], action:'<strong>Visit D</strong> — printf fires. Output: A B D', stepLabel:10 },
  /* 11 — preorder(D): D.left=NULL inline */
  { codeLines:[14], currentNode:'D', visitedNodes:['A','B','D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','preorder(A)','preorder(B)','preorder(D)'], action:'<strong>preorder(D)</strong> checks LEFT. D.left = NULL ✓ — no recursive call.', stepLabel:11 },
  /* 12 — preorder(D): D.right=NULL inline */
  { codeLines:[15], currentNode:'D', visitedNodes:['A','B','D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','preorder(A)','preorder(B)','preorder(D)'], action:'<strong>preorder(D)</strong> checks RIGHT. D.right = NULL ✓ — no recursive call.', stepLabel:12 },
  /* 13 — preorder(D) return line */
  { codeLines:[16], currentNode:'D', visitedNodes:['A','B','D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','preorder(A)','preorder(B)','preorder(D)'], action:'<strong>preorder(D)</strong> complete. Returning to <strong>preorder(B)</strong>.', stepLabel:13 },
  /* 14 — preorder(D) returns to preorder(B); B complete, return */
  { codeLines:[16], currentNode:'B', visitedNodes:['A','B','D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','preorder(A)','preorder(B)'], action:'<strong>preorder(D)</strong> returned. <strong>preorder(B)</strong> complete. Returning to <strong>preorder(A)</strong>.', stepLabel:14 },
  /* 15 — preorder(B) returns to preorder(A); A resumes at right */
  { codeLines:[15], currentNode:'A', visitedNodes:['A','B','D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','preorder(A)'], action:'<strong>preorder(B)</strong> returned. <strong>preorder(A)</strong> resumes — next: go RIGHT.', stepLabel:15 },
  /* 16 — preorder(A) goes RIGHT */
  { codeLines:[15], currentNode:'A', visitedNodes:['A','B','D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','preorder(A)'], action:'<strong>preorder(A)</strong> goes RIGHT. Calling <strong>preorder(C)</strong>.', stepLabel:16 },
  /* 17 — preorder(C) called */
  { codeLines:[10], currentNode:'C', visitedNodes:['A','B','D'], traversedEdges:[['A','B'],['B','D'],['A','C']], callStack:['main() root','preorder(A)','preorder(C)'], action:'<strong>preorder(A)</strong> calls <strong>preorder(C)</strong>. root ≠ NULL.', stepLabel:17 },
  /* 18 — Visit C immediately */
  { codeLines:[13], currentNode:'C', visitedNodes:['A','B','D','C'], traversedEdges:[['A','B'],['B','D'],['A','C']], callStack:['main() root','preorder(A)','preorder(C)'], action:'<strong>Visit C</strong> — printf fires. Output: A B D C', stepLabel:18 },
  /* 19 — preorder(C) goes LEFT */
  { codeLines:[14], currentNode:'C', visitedNodes:['A','B','D','C'], traversedEdges:[['A','B'],['B','D'],['A','C']], callStack:['main() root','preorder(A)','preorder(C)'], action:'<strong>preorder(C)</strong> goes LEFT. Calling <strong>preorder(E)</strong>.', stepLabel:19 },
  /* 20 — preorder(E) called */
  { codeLines:[10], currentNode:'E', visitedNodes:['A','B','D','C'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','preorder(A)','preorder(C)','preorder(E)'], action:'<strong>preorder(C)</strong> calls <strong>preorder(E)</strong>. root ≠ NULL.', stepLabel:20 },
  /* 21 — Visit E immediately */
  { codeLines:[13], currentNode:'E', visitedNodes:['A','B','D','C','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','preorder(A)','preorder(C)','preorder(E)'], action:'<strong>Visit E</strong> — printf fires. Output: A B D C E', stepLabel:21 },
  /* 22 — preorder(E): E.left=NULL inline */
  { codeLines:[14], currentNode:'E', visitedNodes:['A','B','D','C','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','preorder(A)','preorder(C)','preorder(E)'], action:'<strong>preorder(E)</strong> checks LEFT. E.left = NULL ✓ — no recursive call.', stepLabel:22 },
  /* 23 — preorder(E): E.right=NULL inline */
  { codeLines:[15], currentNode:'E', visitedNodes:['A','B','D','C','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','preorder(A)','preorder(C)','preorder(E)'], action:'<strong>preorder(E)</strong> checks RIGHT. E.right = NULL ✓ — no recursive call.', stepLabel:23 },
  /* 24 — preorder(E) return line */
  { codeLines:[16], currentNode:'E', visitedNodes:['A','B','D','C','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','preorder(A)','preorder(C)','preorder(E)'], action:'<strong>preorder(E)</strong> complete. Returning to <strong>preorder(C)</strong>.', stepLabel:24 },
  /* 25 — preorder(E) returns to preorder(C); C resumes at right */
  { codeLines:[15], currentNode:'C', visitedNodes:['A','B','D','C','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','preorder(A)','preorder(C)'], action:'<strong>preorder(E)</strong> returned. <strong>preorder(C)</strong> resumes — next: go RIGHT.', stepLabel:25 },
  /* 26 — preorder(C) goes RIGHT */
  { codeLines:[15], currentNode:'C', visitedNodes:['A','B','D','C','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','preorder(A)','preorder(C)'], action:'<strong>preorder(C)</strong> goes RIGHT. Calling <strong>preorder(F)</strong>.', stepLabel:26 },
  /* 27 — preorder(F) called */
  { codeLines:[10], currentNode:'F', visitedNodes:['A','B','D','C','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','preorder(A)','preorder(C)','preorder(F)'], action:'<strong>preorder(C)</strong> calls <strong>preorder(F)</strong>. root ≠ NULL.', stepLabel:27 },
  /* 28 — Visit F immediately */
  { codeLines:[13], currentNode:'F', visitedNodes:['A','B','D','C','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','preorder(A)','preorder(C)','preorder(F)'], action:'<strong>Visit F</strong> — printf fires. Output: A B D C E F', stepLabel:28 },
  /* 29 — preorder(F): F.left=NULL inline */
  { codeLines:[14], currentNode:'F', visitedNodes:['A','B','D','C','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','preorder(A)','preorder(C)','preorder(F)'], action:'<strong>preorder(F)</strong> checks LEFT. F.left = NULL ✓ — no recursive call.', stepLabel:29 },
  /* 30 — preorder(F): F.right=NULL inline */
  { codeLines:[15], currentNode:'F', visitedNodes:['A','B','D','C','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','preorder(A)','preorder(C)','preorder(F)'], action:'<strong>preorder(F)</strong> checks RIGHT. F.right = NULL ✓ — no recursive call.', stepLabel:30 },
  /* 31 — preorder(F) return line */
  { codeLines:[16], currentNode:'F', visitedNodes:['A','B','D','C','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','preorder(A)','preorder(C)','preorder(F)'], action:'<strong>preorder(F)</strong> complete. Returning to <strong>preorder(C)</strong>.', stepLabel:31 },
  /* 32 — preorder(F) returns to preorder(C); C complete, return */
  { codeLines:[16], currentNode:'C', visitedNodes:['A','B','D','C','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','preorder(A)','preorder(C)'], action:'<strong>preorder(F)</strong> returned. <strong>preorder(C)</strong> complete. Returning to <strong>preorder(A)</strong>.', stepLabel:32 },
  /* 33 — preorder(C) returns to preorder(A); A complete, return */
  { codeLines:[16], currentNode:'A', visitedNodes:['A','B','D','C','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','preorder(A)'], action:'<strong>preorder(C)</strong> returned. <strong>preorder(A)</strong> complete. Returning to <strong>main()</strong>.', stepLabel:33 },
  /* 34 — preorder(A) returns to main */
  { codeLines:[22], currentNode:null, visitedNodes:['A','B','D','C','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root'], action:'<strong>preorder(A)</strong> returned to <strong>main()</strong>. Stack fully unwound. Returning 0.', stepLabel:34 },
  /* 35 — done */
  { codeLines:[22], currentNode:null, visitedNodes:['A','B','D','C','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root'], action:'<strong>Preorder traversal complete!</strong> Output: A → B → D → C → E → F', stepLabel:35, done:true }
];

/* ══════════════════════════════════════════════════════════════
   POSTORDER STEPS — 35 steps, visit order: D B E F C A
   Tree: A(root), B(A.left), C(A.right), D(B.right), E(C.left), F(C.right)
   B.left=NULL, D has no children, E has no children, F has no children
══════════════════════════════════════════════════════════════ */
const POSTORDER_STEPS = [
  /* 1 */ { codeLines:[21], currentNode:null, visitedNodes:[], traversedEdges:[], callStack:['main() root'], action:'Program starts. <strong>main()</strong> about to call postorder(root).', stepLabel:1 },
  /* 2 */ { codeLines:[10], currentNode:'A', visitedNodes:[], traversedEdges:[], callStack:['main() root','postorder(A)'], action:'main() calls <strong>postorder(A)</strong>. root ≠ NULL.', stepLabel:2 },
  /* 3 */ { codeLines:[13], currentNode:'A', visitedNodes:[], traversedEdges:[], callStack:['main() root','postorder(A)'], action:'<strong>postorder(A)</strong> goes LEFT. Calling <strong>postorder(B)</strong>.', stepLabel:3 },
  /* 4 */ { codeLines:[10], currentNode:'B', visitedNodes:[], traversedEdges:[['A','B']], callStack:['main() root','postorder(A)','postorder(B)'], action:'<strong>postorder(A)</strong> calls <strong>postorder(B)</strong>. root ≠ NULL.', stepLabel:4 },
  /* 5 */ { codeLines:[13], currentNode:'B', visitedNodes:[], traversedEdges:[['A','B']], callStack:['main() root','postorder(A)','postorder(B)'], action:'<strong>postorder(B)</strong> checks LEFT. B.left = NULL ✓ — no recursive call.', stepLabel:5 },
  /* 6 */ { codeLines:[14], currentNode:'B', visitedNodes:[], traversedEdges:[['A','B']], callStack:['main() root','postorder(A)','postorder(B)'], action:'<strong>postorder(B)</strong> goes RIGHT. B.right = D. Calling <strong>postorder(D)</strong>.', stepLabel:6 },
  /* 7 */ { codeLines:[10], currentNode:'D', visitedNodes:[], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)','postorder(B)','postorder(D)'], action:'<strong>postorder(B)</strong> calls <strong>postorder(D)</strong>. root ≠ NULL.', stepLabel:7 },
  /* 8 */ { codeLines:[13], currentNode:'D', visitedNodes:[], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)','postorder(B)','postorder(D)'], action:'<strong>postorder(D)</strong> checks LEFT. D.left = NULL ✓ — no recursive call.', stepLabel:8 },
  /* 9 */ { codeLines:[14], currentNode:'D', visitedNodes:[], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)','postorder(B)','postorder(D)'], action:'<strong>postorder(D)</strong> checks RIGHT. D.right = NULL ✓ — no recursive call.', stepLabel:9 },
  /* 10 */ { codeLines:[15], currentNode:'D', visitedNodes:['D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)','postorder(B)','postorder(D)'], action:'<strong>Visit D</strong> — printf fires. Output: D', stepLabel:10 },
  /* 11 */ { codeLines:[16], currentNode:'D', visitedNodes:['D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)','postorder(B)','postorder(D)'], action:'<strong>postorder(D)</strong> complete. Returning to <strong>postorder(B)</strong>.', stepLabel:11 },
  /* 12 */ { codeLines:[16], currentNode:'B', visitedNodes:['D'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)','postorder(B)'], action:'<strong>postorder(D)</strong> returned. <strong>postorder(B)</strong> resumes — next: visit(root).', stepLabel:12 },
  /* 13 */ { codeLines:[15], currentNode:'B', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)','postorder(B)'], action:'<strong>Visit B</strong> — printf fires. Output: D B', stepLabel:13 },
  /* 14 */ { codeLines:[16], currentNode:'B', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)','postorder(B)'], action:'<strong>postorder(B)</strong> complete. Returning to <strong>postorder(A)</strong>.', stepLabel:14 },
  /* 15 */ { codeLines:[14], currentNode:'A', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)'], action:'<strong>postorder(B)</strong> returned. <strong>postorder(A)</strong> resumes — next: go RIGHT.', stepLabel:15 },
  /* 16 */ { codeLines:[14], currentNode:'A', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D']], callStack:['main() root','postorder(A)'], action:'<strong>postorder(A)</strong> goes RIGHT. Calling <strong>postorder(C)</strong>.', stepLabel:16 },
  /* 17 */ { codeLines:[10], currentNode:'C', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D'],['A','C']], callStack:['main() root','postorder(A)','postorder(C)'], action:'<strong>postorder(A)</strong> calls <strong>postorder(C)</strong>. root ≠ NULL.', stepLabel:17 },
  /* 18 */ { codeLines:[13], currentNode:'C', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D'],['A','C']], callStack:['main() root','postorder(A)','postorder(C)'], action:'<strong>postorder(C)</strong> goes LEFT. Calling <strong>postorder(E)</strong>.', stepLabel:18 },
  /* 19 */ { codeLines:[10], currentNode:'E', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','postorder(A)','postorder(C)','postorder(E)'], action:'<strong>postorder(C)</strong> calls <strong>postorder(E)</strong>. root ≠ NULL.', stepLabel:19 },
  /* 20 */ { codeLines:[13], currentNode:'E', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','postorder(A)','postorder(C)','postorder(E)'], action:'<strong>postorder(E)</strong> checks LEFT. E.left = NULL ✓ — no recursive call.', stepLabel:20 },
  /* 21 */ { codeLines:[14], currentNode:'E', visitedNodes:['D','B'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','postorder(A)','postorder(C)','postorder(E)'], action:'<strong>postorder(E)</strong> checks RIGHT. E.right = NULL ✓ — no recursive call.', stepLabel:21 },
  /* 22 */ { codeLines:[15], currentNode:'E', visitedNodes:['D','B','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','postorder(A)','postorder(C)','postorder(E)'], action:'<strong>Visit E</strong> — printf fires. Output: D B E', stepLabel:22 },
  /* 23 */ { codeLines:[16], currentNode:'E', visitedNodes:['D','B','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','postorder(A)','postorder(C)','postorder(E)'], action:'<strong>postorder(E)</strong> complete. Returning to <strong>postorder(C)</strong>.', stepLabel:23 },
  /* 24 */ { codeLines:[14], currentNode:'C', visitedNodes:['D','B','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','postorder(A)','postorder(C)'], action:'<strong>postorder(E)</strong> returned. <strong>postorder(C)</strong> resumes — next: go RIGHT.', stepLabel:24 },
  /* 25 */ { codeLines:[14], currentNode:'C', visitedNodes:['D','B','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E']], callStack:['main() root','postorder(A)','postorder(C)'], action:'<strong>postorder(C)</strong> goes RIGHT. Calling <strong>postorder(F)</strong>.', stepLabel:25 },
  /* 26 */ { codeLines:[10], currentNode:'F', visitedNodes:['D','B','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','postorder(A)','postorder(C)','postorder(F)'], action:'<strong>postorder(C)</strong> calls <strong>postorder(F)</strong>. root ≠ NULL.', stepLabel:26 },
  /* 27 */ { codeLines:[13], currentNode:'F', visitedNodes:['D','B','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','postorder(A)','postorder(C)','postorder(F)'], action:'<strong>postorder(F)</strong> checks LEFT. F.left = NULL ✓ — no recursive call.', stepLabel:27 },
  /* 28 */ { codeLines:[14], currentNode:'F', visitedNodes:['D','B','E'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','postorder(A)','postorder(C)','postorder(F)'], action:'<strong>postorder(F)</strong> checks RIGHT. F.right = NULL ✓ — no recursive call.', stepLabel:28 },
  /* 29 */ { codeLines:[15], currentNode:'F', visitedNodes:['D','B','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','postorder(A)','postorder(C)','postorder(F)'], action:'<strong>Visit F</strong> — printf fires. Output: D B E F', stepLabel:29 },
  /* 30 */ { codeLines:[16], currentNode:'F', visitedNodes:['D','B','E','F'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','postorder(A)','postorder(C)','postorder(F)'], action:'<strong>postorder(F)</strong> complete. Returning to <strong>postorder(C)</strong>.', stepLabel:30 },
  /* 31 */ { codeLines:[15], currentNode:'C', visitedNodes:['D','B','E','F','C'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','postorder(A)','postorder(C)'], action:'<strong>postorder(F)</strong> returned. <strong>postorder(C)</strong> resumes — now: visit(root). <strong>Visit C</strong> — printf fires. Output: D B E F C', stepLabel:31 },
  /* 32 */ { codeLines:[16], currentNode:'C', visitedNodes:['D','B','E','F','C'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','postorder(A)','postorder(C)'], action:'<strong>postorder(C)</strong> complete. Returning to <strong>postorder(A)</strong>.', stepLabel:32 },
  /* 33 */ { codeLines:[15], currentNode:'A', visitedNodes:['D','B','E','F','C','A'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root','postorder(A)'], action:'<strong>postorder(C)</strong> returned. <strong>postorder(A)</strong> resumes — now: visit(root). <strong>Visit A</strong> — printf fires. Output: D B E F C A', stepLabel:33 },
  /* 34 */ { codeLines:[16], currentNode:null, visitedNodes:['D','B','E','F','C','A'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root'], action:'<strong>postorder(A)</strong> returned to <strong>main()</strong>. Stack fully unwound. Returning 0.', stepLabel:34 },
  /* 35 */ { codeLines:[22], currentNode:null, visitedNodes:['D','B','E','F','C','A'], traversedEdges:[['A','B'],['B','D'],['A','C'],['C','E'],['C','F']], callStack:['main() root'], action:'<strong>Postorder traversal complete!</strong> Output: D → B → E → F → C → A', stepLabel:35, done:true }
];

/* ══════════════════════════════════════════════════════════════
   PREORDER BOX DEFS — visit: A B D C E F
   Frame step layout (mirrors inorder exactly):
     0: if(root == NULL)
     1: visit(root) → X      ← printf line (code line 13)
     2: preorder(root->left)  ← code line 14
     3: preorder(root->right) ← code line 15
     4: return
   B has NO left child (NULL), only right child D.
══════════════════════════════════════════════════════════════ */
const PREORDER_BOX_DEFS = {
  pmain: {
    id: "pmain",
    label: "main()",
    isMain: true,
    steps: [
      { id: "pm1", text: "preorder(root)" },
      { id: "pm2", text: "return 0" }
    ]
  },
  pa1: {
    id: "pa1",
    label: "preorder(A)",
    badge: "root=A",
    steps: [
      { id: "pa1s1", text: "if(root == NULL)" },
      { id: "pa1s2", text: "visit(root) → A" },
      { id: "pa1s3", text: "preorder(root->left)  // → B" },
      { id: "pa1s4", text: "preorder(root->right) // → C" },
      { id: "pa1s5", text: "return" }
    ]
  },
  pa2: {
    id: "pa2",
    label: "preorder(B)",
    badge: "root=B",
    steps: [
      { id: "pa2s1", text: "if(root == NULL)" },
      { id: "pa2s2", text: "visit(root) → B" },
      { id: "pa2s3", text: "preorder(root->left)  // NULL ✓" },
      { id: "pa2s4", text: "preorder(root->right) // → D" },
      { id: "pa2s5", text: "return" }
    ]
  },
  pa4: {
    id: "pa4",
    label: "preorder(D)",
    badge: "root=D",
    steps: [
      { id: "pa4s1", text: "if(root == NULL)" },
      { id: "pa4s2", text: "visit(root) → D" },
      { id: "pa4s3", text: "preorder(root->left)  // NULL ✓" },
      { id: "pa4s4", text: "preorder(root->right) // NULL ✓" },
      { id: "pa4s5", text: "return" }
    ]
  },
  pa7: {
    id: "pa7",
    label: "preorder(C)",
    badge: "root=C",
    steps: [
      { id: "pa7s1", text: "if(root == NULL)" },
      { id: "pa7s2", text: "visit(root) → C" },
      { id: "pa7s3", text: "preorder(root->left)  // → E" },
      { id: "pa7s4", text: "preorder(root->right) // → F" },
      { id: "pa7s5", text: "return" }
    ]
  },
  pa8: {
    id: "pa8",
    label: "preorder(E)",
    badge: "root=E",
    steps: [
      { id: "pa8s1", text: "if(root == NULL)" },
      { id: "pa8s2", text: "visit(root) → E" },
      { id: "pa8s3", text: "preorder(root->left)  // NULL ✓" },
      { id: "pa8s4", text: "preorder(root->right) // NULL ✓" },
      { id: "pa8s5", text: "return" }
    ]
  },
  pa11: {
    id: "pa11",
    label: "preorder(F)",
    badge: "root=F",
    steps: [
      { id: "pa11s1", text: "if(root == NULL)" },
      { id: "pa11s2", text: "visit(root) → F" },
      { id: "pa11s3", text: "preorder(root->left)  // NULL ✓" },
      { id: "pa11s4", text: "preorder(root->right) // NULL ✓" },
      { id: "pa11s5", text: "return" }
    ]
  }
};

const ALL_PREORDER_BOX_IDS = Object.keys(PREORDER_BOX_DEFS);

/* Depth for diagonal layout */
const PREORDER_BOX_DEPTH = {
  pmain: 0,
  pa1:   1,
  pa2:   2,
  pa4:   3,
  pa7:   2,
  pa8:   3,
  pa11:  3
};

const PREORDER_BOX_PARENT_OF = {
  pa1:  "pmain",
  pa2:  "pa1",
  pa4:  "pa2",
  pa7:  "pa1",
  pa8:  "pa7",
  pa11: "pa7"
};

/* Which step-row in parent triggers the call to this child */
const PREORDER_CALL_STEP_OF = {
  pa1:  0,  /* pmain step 0 → preorder(A) */
  pa2:  2,  /* pa1  step 2 (left)  → preorder(B) */
  pa4:  3,  /* pa2  step 3 (right) → preorder(D) */
  pa7:  3,  /* pa1  step 3 (right) → preorder(C) */
  pa8:  2,  /* pa7  step 2 (left)  → preorder(E) */
  pa11: 3   /* pa7  step 3 (right) → preorder(F) */
};

/* ══════════════════════════════════════════════════════════════
   POSTORDER BOX DEFS — visit: D B E F C A
   Frame step layout:
     0: if(root == NULL)
     1: postorder(root->left)
     2: postorder(root->right)
     3: visit(root) → X      ← printf line (code line 15)
     4: return
   B.left=NULL (inline), B.right=D
══════════════════════════════════════════════════════════════ */
const POSTORDER_BOX_DEFS = {
  qmain: {
    id: "qmain",
    label: "main()",
    isMain: true,
    steps: [
      { id: "qm1", text: "postorder(root)" },
      { id: "qm2", text: "return 0" }
    ]
  },
  qa1: {
    id: "qa1",
    label: "postorder(A)",
    badge: "root=A",
    steps: [
      { id: "qa1s1", text: "if(root == NULL)" },
      { id: "qa1s2", text: "postorder(root->left)  // → B" },
      { id: "qa1s3", text: "postorder(root->right) // → C" },
      { id: "qa1s4", text: "visit(root) → A" },
      { id: "qa1s5", text: "return" }
    ]
  },
  qa2: {
    id: "qa2",
    label: "postorder(B)",
    badge: "root=B",
    steps: [
      { id: "qa2s1", text: "if(root == NULL)" },
      { id: "qa2s2", text: "postorder(root->left)  // NULL ✓" },
      { id: "qa2s3", text: "postorder(root->right) // → D" },
      { id: "qa2s4", text: "visit(root) → B" },
      { id: "qa2s5", text: "return" }
    ]
  },
  qa4: {
    id: "qa4",
    label: "postorder(D)",
    badge: "root=D",
    steps: [
      { id: "qa4s1", text: "if(root == NULL)" },
      { id: "qa4s2", text: "postorder(root->left)  // NULL ✓" },
      { id: "qa4s3", text: "postorder(root->right) // NULL ✓" },
      { id: "qa4s4", text: "visit(root) → D" },
      { id: "qa4s5", text: "return" }
    ]
  },
  qa7: {
    id: "qa7",
    label: "postorder(C)",
    badge: "root=C",
    steps: [
      { id: "qa7s1", text: "if(root == NULL)" },
      { id: "qa7s2", text: "postorder(root->left)  // → E" },
      { id: "qa7s3", text: "postorder(root->right) // → F" },
      { id: "qa7s4", text: "visit(root) → C" },
      { id: "qa7s5", text: "return" }
    ]
  },
  qa8: {
    id: "qa8",
    label: "postorder(E)",
    badge: "root=E",
    steps: [
      { id: "qa8s1", text: "if(root == NULL)" },
      { id: "qa8s2", text: "postorder(root->left)  // NULL ✓" },
      { id: "qa8s3", text: "postorder(root->right) // NULL ✓" },
      { id: "qa8s4", text: "visit(root) → E" },
      { id: "qa8s5", text: "return" }
    ]
  },
  qa11: {
    id: "qa11",
    label: "postorder(F)",
    badge: "root=F",
    steps: [
      { id: "qa11s1", text: "if(root == NULL)" },
      { id: "qa11s2", text: "postorder(root->left)  // NULL ✓" },
      { id: "qa11s3", text: "postorder(root->right) // NULL ✓" },
      { id: "qa11s4", text: "visit(root) → F" },
      { id: "qa11s5", text: "return" }
    ]
  }
};

const ALL_POSTORDER_BOX_IDS = Object.keys(POSTORDER_BOX_DEFS);

const POSTORDER_BOX_DEPTH = {
  qmain: 0,
  qa1:   1,
  qa2:   2,
  qa4:   3,
  qa7:   2,
  qa8:   3,
  qa11:  3
};

const POSTORDER_BOX_PARENT_OF = {
  qa1:  "qmain",
  qa2:  "qa1",
  qa4:  "qa2",
  qa7:  "qa1",
  qa8:  "qa7",
  qa11: "qa7"
};

const POSTORDER_CALL_STEP_OF = {
  qa1:  0,  /* qmain step 0 → postorder(A) */
  qa2:  1,  /* qa1  step 1 (left)  → postorder(B) */
  qa4:  2,  /* qa2  step 2 (right) → postorder(D) */
  qa7:  2,  /* qa1  step 2 (right) → postorder(C) */
  qa8:  1,  /* qa7  step 1 (left)  → postorder(E) */
  qa11: 2   /* qa7  step 2 (right) → postorder(F) */
};

/* ── 35-step POSTORDER_ANIM_STEPS
   activeStep indices map to POSTORDER_BOX_DEFS steps:
     0 = if(root==NULL)
     1 = postorder(left)
     2 = postorder(right)
     3 = visit(root)       ← printf / visit line
     4 = return
*/
const POSTORDER_ANIM_STEPS = [
  /* 1 — program start */
  { boxes:["qmain"], activeBox:"qmain", activeStep:0, dimmed:[], hidden:["qa1","qa2","qa4","qa7","qa8","qa11"], arrow:null, linkArrow:null, panTo:"qmain", expl:"Program starts." },
  /* 2 — postorder(A) called */
  { boxes:["qmain","qa1"], activeBox:"qa1", activeStep:0, dimmed:["qmain"], hidden:["qa2","qa4","qa7","qa8","qa11"], arrow:{type:"call",fromBox:"qmain",fromStep:0,toBox:"qa1",toStep:0}, linkArrow:{fromBox:"qmain",fromStep:0,toBox:"qa1"}, panTo:"qa1", expl:"postorder(A) called. root ≠ NULL." },
  /* 3 — postorder(A) goes LEFT */
  { boxes:["qmain","qa1"], activeBox:"qa1", activeStep:1, dimmed:["qmain"], hidden:["qa2","qa4","qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qmain",fromStep:0,toBox:"qa1"}, panTo:"qa1", expl:"A.left = B. postorder(A) goes LEFT." },
  /* 4 — postorder(B) called */
  { boxes:["qmain","qa1","qa2"], activeBox:"qa2", activeStep:0, dimmed:["qmain","qa1"], hidden:["qa4","qa7","qa8","qa11"], arrow:{type:"call",fromBox:"qa1",fromStep:1,toBox:"qa2",toStep:0}, linkArrow:{fromBox:"qa1",fromStep:1,toBox:"qa2"}, panTo:"qa2", expl:"postorder(B) called. root ≠ NULL." },
  /* 5 — postorder(B): B.left=NULL inline */
  { boxes:["qmain","qa1","qa2"], activeBox:"qa2", activeStep:1, dimmed:["qmain","qa1"], hidden:["qa4","qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa1",fromStep:1,toBox:"qa2"}, panTo:"qa2", expl:"B.left = NULL ✓ — null check inline, no recursive call." },
  /* 6 — postorder(B) goes RIGHT → D */
  { boxes:["qmain","qa1","qa2"], activeBox:"qa2", activeStep:2, dimmed:["qmain","qa1"], hidden:["qa4","qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa1",fromStep:1,toBox:"qa2"}, panTo:"qa2", expl:"B.right = D. postorder(B) goes RIGHT." },
  /* 7 — postorder(D) called */
  { boxes:["qmain","qa1","qa2","qa4"], activeBox:"qa4", activeStep:0, dimmed:["qmain","qa1","qa2"], hidden:["qa7","qa8","qa11"], arrow:{type:"call",fromBox:"qa2",fromStep:2,toBox:"qa4",toStep:0}, linkArrow:{fromBox:"qa2",fromStep:2,toBox:"qa4"}, panTo:"qa4", expl:"postorder(D) called. root ≠ NULL." },
  /* 8 — postorder(D): D.left=NULL inline */
  { boxes:["qmain","qa1","qa2","qa4"], activeBox:"qa4", activeStep:1, dimmed:["qmain","qa1","qa2"], hidden:["qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa2",fromStep:2,toBox:"qa4"}, panTo:"qa4", expl:"D.left = NULL ✓ — null check inline." },
  /* 9 — postorder(D): D.right=NULL inline */
  { boxes:["qmain","qa1","qa2","qa4"], activeBox:"qa4", activeStep:2, dimmed:["qmain","qa1","qa2"], hidden:["qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa2",fromStep:2,toBox:"qa4"}, panTo:"qa4", expl:"D.right = NULL ✓ — null check inline." },
  /* 10 — Visit D */
  { boxes:["qmain","qa1","qa2","qa4"], activeBox:"qa4", activeStep:3, dimmed:["qmain","qa1","qa2"], hidden:["qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa2",fromStep:2,toBox:"qa4"}, panTo:"qa4", expl:"Visit D — printf fires. Output: D" },
  /* 11 — postorder(D) return line */
  { boxes:["qmain","qa1","qa2","qa4"], activeBox:"qa4", activeStep:4, dimmed:["qmain","qa1","qa2"], hidden:["qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa2",fromStep:2,toBox:"qa4"}, panTo:"qa4", expl:"postorder(D) complete. return." },
  /* 12 — postorder(D) returns to postorder(B); B resumes at visit */
  { boxes:["qmain","qa1","qa2"], activeBox:"qa2", activeStep:3, dimmed:["qmain","qa1"], hidden:["qa4","qa7","qa8","qa11"], arrow:{type:"ret",fromBox:"qa4",fromStep:4,toBox:"qa2",toStep:3}, linkArrow:{fromBox:"qa1",fromStep:1,toBox:"qa2"}, panTo:"qa2", expl:"postorder(D) returned. postorder(B) resumes — next: visit(root)." },
  /* 13 — Visit B */
  { boxes:["qmain","qa1","qa2"], activeBox:"qa2", activeStep:3, dimmed:["qmain","qa1"], hidden:["qa4","qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa1",fromStep:1,toBox:"qa2"}, panTo:"qa2", expl:"Visit B — printf fires. Output: D B" },
  /* 14 — postorder(B) return line */
  { boxes:["qmain","qa1","qa2"], activeBox:"qa2", activeStep:4, dimmed:["qmain","qa1"], hidden:["qa4","qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa1",fromStep:1,toBox:"qa2"}, panTo:"qa2", expl:"postorder(B) complete. return." },
  /* 15 — postorder(B) returns to postorder(A); A resumes at right */
  { boxes:["qmain","qa1"], activeBox:"qa1", activeStep:2, dimmed:["qmain"], hidden:["qa2","qa4","qa7","qa8","qa11"], arrow:{type:"ret",fromBox:"qa2",fromStep:4,toBox:"qa1",toStep:2}, linkArrow:{fromBox:"qmain",fromStep:0,toBox:"qa1"}, panTo:"qa1", expl:"postorder(B) returned. postorder(A) resumes — next: go RIGHT." },
  /* 16 — postorder(A) goes RIGHT → C */
  { boxes:["qmain","qa1"], activeBox:"qa1", activeStep:2, dimmed:["qmain"], hidden:["qa2","qa4","qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qmain",fromStep:0,toBox:"qa1"}, panTo:"qa1", expl:"A.right = C. postorder(A) goes RIGHT." },
  /* 17 — postorder(C) called */
  { boxes:["qmain","qa1","qa7"], activeBox:"qa7", activeStep:0, dimmed:["qmain","qa1"], hidden:["qa2","qa4","qa8","qa11"], arrow:{type:"call",fromBox:"qa1",fromStep:2,toBox:"qa7",toStep:0}, linkArrow:{fromBox:"qa1",fromStep:2,toBox:"qa7"}, panTo:"qa7", expl:"postorder(C) called. root ≠ NULL." },
  /* 18 — postorder(C) goes LEFT */
  { boxes:["qmain","qa1","qa7"], activeBox:"qa7", activeStep:1, dimmed:["qmain","qa1"], hidden:["qa2","qa4","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa1",fromStep:2,toBox:"qa7"}, panTo:"qa7", expl:"C.left = E. postorder(C) goes LEFT." },
  /* 19 — postorder(E) called */
  { boxes:["qmain","qa1","qa7","qa8"], activeBox:"qa8", activeStep:0, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa11"], arrow:{type:"call",fromBox:"qa7",fromStep:1,toBox:"qa8",toStep:0}, linkArrow:{fromBox:"qa7",fromStep:1,toBox:"qa8"}, panTo:"qa8", expl:"postorder(E) called. root ≠ NULL." },
  /* 20 — postorder(E): E.left=NULL inline */
  { boxes:["qmain","qa1","qa7","qa8"], activeBox:"qa8", activeStep:1, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa11"], arrow:null, linkArrow:{fromBox:"qa7",fromStep:1,toBox:"qa8"}, panTo:"qa8", expl:"E.left = NULL ✓ — null check inline." },
  /* 21 — postorder(E): E.right=NULL inline */
  { boxes:["qmain","qa1","qa7","qa8"], activeBox:"qa8", activeStep:2, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa11"], arrow:null, linkArrow:{fromBox:"qa7",fromStep:1,toBox:"qa8"}, panTo:"qa8", expl:"E.right = NULL ✓ — null check inline." },
  /* 22 — Visit E */
  { boxes:["qmain","qa1","qa7","qa8"], activeBox:"qa8", activeStep:3, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa11"], arrow:null, linkArrow:{fromBox:"qa7",fromStep:1,toBox:"qa8"}, panTo:"qa8", expl:"Visit E — printf fires. Output: D B E" },
  /* 23 — postorder(E) return line */
  { boxes:["qmain","qa1","qa7","qa8"], activeBox:"qa8", activeStep:4, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa11"], arrow:null, linkArrow:{fromBox:"qa7",fromStep:1,toBox:"qa8"}, panTo:"qa8", expl:"postorder(E) complete. return." },
  /* 24 — postorder(E) returns to postorder(C); C resumes at right */
  { boxes:["qmain","qa1","qa7"], activeBox:"qa7", activeStep:2, dimmed:["qmain","qa1"], hidden:["qa2","qa4","qa8","qa11"], arrow:{type:"ret",fromBox:"qa8",fromStep:4,toBox:"qa7",toStep:2}, linkArrow:{fromBox:"qa1",fromStep:2,toBox:"qa7"}, panTo:"qa7", expl:"postorder(E) returned. postorder(C) resumes — next: go RIGHT." },
  /* 25 — postorder(C) goes RIGHT → F */
  { boxes:["qmain","qa1","qa7"], activeBox:"qa7", activeStep:2, dimmed:["qmain","qa1"], hidden:["qa2","qa4","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa1",fromStep:2,toBox:"qa7"}, panTo:"qa7", expl:"C.right = F. postorder(C) goes RIGHT." },
  /* 26 — postorder(F) called */
  { boxes:["qmain","qa1","qa7","qa11"], activeBox:"qa11", activeStep:0, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa8"], arrow:{type:"call",fromBox:"qa7",fromStep:2,toBox:"qa11",toStep:0}, linkArrow:{fromBox:"qa7",fromStep:2,toBox:"qa11"}, panTo:"qa11", expl:"postorder(F) called. root ≠ NULL." },
  /* 27 — postorder(F): F.left=NULL inline */
  { boxes:["qmain","qa1","qa7","qa11"], activeBox:"qa11", activeStep:1, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa8"], arrow:null, linkArrow:{fromBox:"qa7",fromStep:2,toBox:"qa11"}, panTo:"qa11", expl:"F.left = NULL ✓ — null check inline." },
  /* 28 — postorder(F): F.right=NULL inline */
  { boxes:["qmain","qa1","qa7","qa11"], activeBox:"qa11", activeStep:2, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa8"], arrow:null, linkArrow:{fromBox:"qa7",fromStep:2,toBox:"qa11"}, panTo:"qa11", expl:"F.right = NULL ✓ — null check inline." },
  /* 29 — Visit F */
  { boxes:["qmain","qa1","qa7","qa11"], activeBox:"qa11", activeStep:3, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa8"], arrow:null, linkArrow:{fromBox:"qa7",fromStep:2,toBox:"qa11"}, panTo:"qa11", expl:"Visit F — printf fires. Output: D B E F" },
  /* 30 — postorder(F) return line */
  { boxes:["qmain","qa1","qa7","qa11"], activeBox:"qa11", activeStep:4, dimmed:["qmain","qa1","qa7"], hidden:["qa2","qa4","qa8"], arrow:null, linkArrow:{fromBox:"qa7",fromStep:2,toBox:"qa11"}, panTo:"qa11", expl:"postorder(F) complete. return." },
  /* 31 — postorder(F) returns to postorder(C); C resumes at visit */
  { boxes:["qmain","qa1","qa7"], activeBox:"qa7", activeStep:3, dimmed:["qmain","qa1"], hidden:["qa2","qa4","qa8","qa11"], arrow:{type:"ret",fromBox:"qa11",fromStep:4,toBox:"qa7",toStep:3}, linkArrow:{fromBox:"qa1",fromStep:2,toBox:"qa7"}, panTo:"qa7", expl:"postorder(F) returned. postorder(C) resumes — next: visit(root)." },
  /* 32 — postorder(C) visit + return line */
  { boxes:["qmain","qa1","qa7"], activeBox:"qa7", activeStep:4, dimmed:["qmain","qa1"], hidden:["qa2","qa4","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qa1",fromStep:2,toBox:"qa7"}, panTo:"qa7", expl:"Visit C — printf fires. Output: D B E F C. postorder(C) complete. return." },
  /* 33 — postorder(C) returns to postorder(A); A resumes at visit */
  { boxes:["qmain","qa1"], activeBox:"qa1", activeStep:3, dimmed:["qmain"], hidden:["qa2","qa4","qa7","qa8","qa11"], arrow:{type:"ret",fromBox:"qa7",fromStep:4,toBox:"qa1",toStep:3}, linkArrow:{fromBox:"qmain",fromStep:0,toBox:"qa1"}, panTo:"qa1", expl:"postorder(C) returned. postorder(A) resumes — next: visit(root)." },
  /* 34 — postorder(A) visit + return line */
  { boxes:["qmain","qa1"], activeBox:"qa1", activeStep:4, dimmed:["qmain"], hidden:["qa2","qa4","qa7","qa8","qa11"], arrow:null, linkArrow:{fromBox:"qmain",fromStep:0,toBox:"qa1"}, panTo:"qa1", expl:"Visit A — printf fires. Output: D B E F C A. postorder(A) complete. return." },
  /* 35 — postorder(A) returns to main + done */
  { boxes:["qmain"], activeBox:"qmain", activeStep:1, dimmed:[], hidden:["qa1","qa2","qa4","qa7","qa8","qa11"], arrow:{type:"ret",fromBox:"qa1",fromStep:4,toBox:"qmain",toStep:1}, linkArrow:null, panTo:"qmain", expl:"Postorder traversal complete! Output: D → B → E → F → C → A", done:true }
];

/* ── 35-step PREORDER_ANIM_STEPS (mirrors INORDER_ANIM_STEPS structure exactly) ──
   activeStep indices map to PREORDER_BOX_DEFS steps:
     0 = if(root==NULL)
     1 = visit(root)       ← printf / visit line
     2 = preorder(left)
     3 = preorder(right)
     4 = return
*/
const PREORDER_ANIM_STEPS = [
  /* 1 — program start */
  { boxes:["pmain"], activeBox:"pmain", activeStep:0, dimmed:[], hidden:["pa1","pa2","pa4","pa7","pa8","pa11"], arrow:null, linkArrow:null, panTo:"pmain", expl:"Program starts." },
  /* 2 — preorder(A) called */
  { boxes:["pmain","pa1"], activeBox:"pa1", activeStep:0, dimmed:["pmain"], hidden:["pa2","pa4","pa7","pa8","pa11"], arrow:{type:"call",fromBox:"pmain",fromStep:0,toBox:"pa1",toStep:0}, linkArrow:{fromBox:"pmain",fromStep:0,toBox:"pa1"}, panTo:"pa1", expl:"preorder(A) called. root ≠ NULL." },
  /* 3 — Visit A immediately (Root first!) */
  { boxes:["pmain","pa1"], activeBox:"pa1", activeStep:1, dimmed:["pmain"], hidden:["pa2","pa4","pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pmain",fromStep:0,toBox:"pa1"}, panTo:"pa1", expl:"Visit A — printf fires first (Root). Output: A" },
  /* 4 — preorder(A) goes LEFT */
  { boxes:["pmain","pa1"], activeBox:"pa1", activeStep:2, dimmed:["pmain"], hidden:["pa2","pa4","pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pmain",fromStep:0,toBox:"pa1"}, panTo:"pa1", expl:"A.left = B. preorder(A) goes LEFT." },
  /* 5 — preorder(B) called */
  { boxes:["pmain","pa1","pa2"], activeBox:"pa2", activeStep:0, dimmed:["pmain","pa1"], hidden:["pa4","pa7","pa8","pa11"], arrow:{type:"call",fromBox:"pa1",fromStep:2,toBox:"pa2",toStep:0}, linkArrow:{fromBox:"pa1",fromStep:2,toBox:"pa2"}, panTo:"pa2", expl:"preorder(B) called. root ≠ NULL." },
  /* 6 — Visit B immediately */
  { boxes:["pmain","pa1","pa2"], activeBox:"pa2", activeStep:1, dimmed:["pmain","pa1"], hidden:["pa4","pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa1",fromStep:2,toBox:"pa2"}, panTo:"pa2", expl:"Visit B — printf fires. Output: A B" },
  /* 7 — preorder(B): B.left=NULL inline */
  { boxes:["pmain","pa1","pa2"], activeBox:"pa2", activeStep:2, dimmed:["pmain","pa1"], hidden:["pa4","pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa1",fromStep:2,toBox:"pa2"}, panTo:"pa2", expl:"B.left = NULL ✓ — null check inline, no recursive call." },
  /* 8 — preorder(B) goes RIGHT → D */
  { boxes:["pmain","pa1","pa2"], activeBox:"pa2", activeStep:3, dimmed:["pmain","pa1"], hidden:["pa4","pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa1",fromStep:2,toBox:"pa2"}, panTo:"pa2", expl:"B.right = D. preorder(B) goes RIGHT." },
  /* 9 — preorder(D) called */
  { boxes:["pmain","pa1","pa2","pa4"], activeBox:"pa4", activeStep:0, dimmed:["pmain","pa1","pa2"], hidden:["pa7","pa8","pa11"], arrow:{type:"call",fromBox:"pa2",fromStep:3,toBox:"pa4",toStep:0}, linkArrow:{fromBox:"pa2",fromStep:3,toBox:"pa4"}, panTo:"pa4", expl:"preorder(D) called. root ≠ NULL." },
  /* 10 — Visit D immediately */
  { boxes:["pmain","pa1","pa2","pa4"], activeBox:"pa4", activeStep:1, dimmed:["pmain","pa1","pa2"], hidden:["pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa2",fromStep:3,toBox:"pa4"}, panTo:"pa4", expl:"Visit D — printf fires. Output: A B D" },
  /* 11 — preorder(D): D.left=NULL inline */
  { boxes:["pmain","pa1","pa2","pa4"], activeBox:"pa4", activeStep:2, dimmed:["pmain","pa1","pa2"], hidden:["pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa2",fromStep:3,toBox:"pa4"}, panTo:"pa4", expl:"D.left = NULL ✓ — null check inline." },
  /* 12 — preorder(D): D.right=NULL inline */
  { boxes:["pmain","pa1","pa2","pa4"], activeBox:"pa4", activeStep:3, dimmed:["pmain","pa1","pa2"], hidden:["pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa2",fromStep:3,toBox:"pa4"}, panTo:"pa4", expl:"D.right = NULL ✓ — null check inline." },
  /* 13 — preorder(D) return line */
  { boxes:["pmain","pa1","pa2","pa4"], activeBox:"pa4", activeStep:4, dimmed:["pmain","pa1","pa2"], hidden:["pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa2",fromStep:3,toBox:"pa4"}, panTo:"pa4", expl:"preorder(D) complete. return." },
  /* 14 — preorder(D) returns to preorder(B); B complete, return */
  { boxes:["pmain","pa1","pa2"], activeBox:"pa2", activeStep:4, dimmed:["pmain","pa1"], hidden:["pa4","pa7","pa8","pa11"], arrow:{type:"ret",fromBox:"pa4",fromStep:4,toBox:"pa2",toStep:3}, linkArrow:{fromBox:"pa1",fromStep:2,toBox:"pa2"}, panTo:"pa2", expl:"preorder(D) returned. preorder(B) complete. return." },
  /* 15 — preorder(B) returns to preorder(A); A resumes at right */
  { boxes:["pmain","pa1"], activeBox:"pa1", activeStep:3, dimmed:["pmain"], hidden:["pa2","pa4","pa7","pa8","pa11"], arrow:{type:"ret",fromBox:"pa2",fromStep:4,toBox:"pa1",toStep:3}, linkArrow:{fromBox:"pmain",fromStep:0,toBox:"pa1"}, panTo:"pa1", expl:"preorder(B) returned. preorder(A) resumes — next: go RIGHT." },
  /* 16 — preorder(A) goes RIGHT → C */
  { boxes:["pmain","pa1"], activeBox:"pa1", activeStep:3, dimmed:["pmain"], hidden:["pa2","pa4","pa7","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pmain",fromStep:0,toBox:"pa1"}, panTo:"pa1", expl:"A.right = C. preorder(A) goes RIGHT." },
  /* 17 — preorder(C) called */
  { boxes:["pmain","pa1","pa7"], activeBox:"pa7", activeStep:0, dimmed:["pmain","pa1"], hidden:["pa2","pa4","pa8","pa11"], arrow:{type:"call",fromBox:"pa1",fromStep:3,toBox:"pa7",toStep:0}, linkArrow:{fromBox:"pa1",fromStep:3,toBox:"pa7"}, panTo:"pa7", expl:"preorder(C) called. root ≠ NULL." },
  /* 18 — Visit C immediately */
  { boxes:["pmain","pa1","pa7"], activeBox:"pa7", activeStep:1, dimmed:["pmain","pa1"], hidden:["pa2","pa4","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa1",fromStep:3,toBox:"pa7"}, panTo:"pa7", expl:"Visit C — printf fires. Output: A B D C" },
  /* 19 — preorder(C) goes LEFT */
  { boxes:["pmain","pa1","pa7"], activeBox:"pa7", activeStep:2, dimmed:["pmain","pa1"], hidden:["pa2","pa4","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa1",fromStep:3,toBox:"pa7"}, panTo:"pa7", expl:"C.left = E. preorder(C) goes LEFT." },
  /* 20 — preorder(E) called */
  { boxes:["pmain","pa1","pa7","pa8"], activeBox:"pa8", activeStep:0, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa11"], arrow:{type:"call",fromBox:"pa7",fromStep:2,toBox:"pa8",toStep:0}, linkArrow:{fromBox:"pa7",fromStep:2,toBox:"pa8"}, panTo:"pa8", expl:"preorder(E) called. root ≠ NULL." },
  /* 21 — Visit E immediately */
  { boxes:["pmain","pa1","pa7","pa8"], activeBox:"pa8", activeStep:1, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa11"], arrow:null, linkArrow:{fromBox:"pa7",fromStep:2,toBox:"pa8"}, panTo:"pa8", expl:"Visit E — printf fires. Output: A B D C E" },
  /* 22 — preorder(E): E.left=NULL inline */
  { boxes:["pmain","pa1","pa7","pa8"], activeBox:"pa8", activeStep:2, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa11"], arrow:null, linkArrow:{fromBox:"pa7",fromStep:2,toBox:"pa8"}, panTo:"pa8", expl:"E.left = NULL ✓ — null check inline." },
  /* 23 — preorder(E): E.right=NULL inline */
  { boxes:["pmain","pa1","pa7","pa8"], activeBox:"pa8", activeStep:3, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa11"], arrow:null, linkArrow:{fromBox:"pa7",fromStep:2,toBox:"pa8"}, panTo:"pa8", expl:"E.right = NULL ✓ — null check inline." },
  /* 24 — preorder(E) return line */
  { boxes:["pmain","pa1","pa7","pa8"], activeBox:"pa8", activeStep:4, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa11"], arrow:null, linkArrow:{fromBox:"pa7",fromStep:2,toBox:"pa8"}, panTo:"pa8", expl:"preorder(E) complete. return." },
  /* 25 — preorder(E) returns to preorder(C); C resumes at right */
  { boxes:["pmain","pa1","pa7"], activeBox:"pa7", activeStep:3, dimmed:["pmain","pa1"], hidden:["pa2","pa4","pa8","pa11"], arrow:{type:"ret",fromBox:"pa8",fromStep:4,toBox:"pa7",toStep:2}, linkArrow:{fromBox:"pa1",fromStep:3,toBox:"pa7"}, panTo:"pa7", expl:"preorder(E) returned. preorder(C) resumes — next: go RIGHT." },
  /* 26 — preorder(C) goes RIGHT → F */
  { boxes:["pmain","pa1","pa7"], activeBox:"pa7", activeStep:3, dimmed:["pmain","pa1"], hidden:["pa2","pa4","pa8","pa11"], arrow:null, linkArrow:{fromBox:"pa1",fromStep:3,toBox:"pa7"}, panTo:"pa7", expl:"C.right = F. preorder(C) goes RIGHT." },
  /* 27 — preorder(F) called */
  { boxes:["pmain","pa1","pa7","pa11"], activeBox:"pa11", activeStep:0, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa8"], arrow:{type:"call",fromBox:"pa7",fromStep:3,toBox:"pa11",toStep:0}, linkArrow:{fromBox:"pa7",fromStep:3,toBox:"pa11"}, panTo:"pa11", expl:"preorder(F) called. root ≠ NULL." },
  /* 28 — Visit F immediately */
  { boxes:["pmain","pa1","pa7","pa11"], activeBox:"pa11", activeStep:1, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa8"], arrow:null, linkArrow:{fromBox:"pa7",fromStep:3,toBox:"pa11"}, panTo:"pa11", expl:"Visit F — printf fires. Output: A B D C E F" },
  /* 29 — preorder(F): F.left=NULL inline */
  { boxes:["pmain","pa1","pa7","pa11"], activeBox:"pa11", activeStep:2, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa8"], arrow:null, linkArrow:{fromBox:"pa7",fromStep:3,toBox:"pa11"}, panTo:"pa11", expl:"F.left = NULL ✓ — null check inline." },
  /* 30 — preorder(F): F.right=NULL inline */
  { boxes:["pmain","pa1","pa7","pa11"], activeBox:"pa11", activeStep:3, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa8"], arrow:null, linkArrow:{fromBox:"pa7",fromStep:3,toBox:"pa11"}, panTo:"pa11", expl:"F.right = NULL ✓ — null check inline." },
  /* 31 — preorder(F) return line */
  { boxes:["pmain","pa1","pa7","pa11"], activeBox:"pa11", activeStep:4, dimmed:["pmain","pa1","pa7"], hidden:["pa2","pa4","pa8"], arrow:null, linkArrow:{fromBox:"pa7",fromStep:3,toBox:"pa11"}, panTo:"pa11", expl:"preorder(F) complete. return." },
  /* 32 — preorder(F) returns to preorder(C); C complete, return */
  { boxes:["pmain","pa1","pa7"], activeBox:"pa7", activeStep:4, dimmed:["pmain","pa1"], hidden:["pa2","pa4","pa8","pa11"], arrow:{type:"ret",fromBox:"pa11",fromStep:4,toBox:"pa7",toStep:4}, linkArrow:{fromBox:"pa1",fromStep:3,toBox:"pa7"}, panTo:"pa7", expl:"preorder(F) returned. preorder(C) complete. return." },
  /* 33 — preorder(C) returns to preorder(A); A complete, return */
  { boxes:["pmain","pa1"], activeBox:"pa1", activeStep:4, dimmed:["pmain"], hidden:["pa2","pa4","pa7","pa8","pa11"], arrow:{type:"ret",fromBox:"pa7",fromStep:4,toBox:"pa1",toStep:4}, linkArrow:{fromBox:"pmain",fromStep:0,toBox:"pa1"}, panTo:"pa1", expl:"preorder(C) returned. preorder(A) complete. return." },
  /* 34 — preorder(A) returns to main */
  { boxes:["pmain"], activeBox:"pmain", activeStep:1, dimmed:[], hidden:["pa1","pa2","pa4","pa7","pa8","pa11"], arrow:{type:"ret",fromBox:"pa1",fromStep:4,toBox:"pmain",toStep:1}, linkArrow:null, panTo:"pmain", expl:"preorder(A) returned to main(). Stack fully unwound." },
  /* 35 — done */
  { boxes:["pmain"], activeBox:"pmain", activeStep:1, dimmed:[], hidden:["pa1","pa2","pa4","pa7","pa8","pa11"], arrow:null, linkArrow:null, panTo:"pmain", expl:"Preorder traversal complete! Output: A → B → D → C → E → F", done:true }
];

/* ══════════════════════════════════════════════════════════════
/* ══════════════════════════════════════════════════════════════
   INORDER ANIMATION STEPS — no NULL frames, B.right=D, 32 steps
   visit order: B → D → A → E → C → F
══════════════════════════════════════════════════════════════ */

/* BOX_DEFS for inorder call frames — NULL checks inline, no separate NULL boxes */
const BOX_DEFS = {
  main: {
    id: "main",
    label: "main()",
    isMain: true,
    steps: [
      { id: "m1", text: "inorder(root)" },
      { id: "m2", text: "return 0" }
    ]
  },
  a1: {
    id: "a1",
    label: "inorder(A)",
    badge: "root=A",
    steps: [
      { id: "a1s1", text: "if(root == NULL)" },
      { id: "a1s2", text: "inorder(root->left)  // → B" },
      { id: "a1s3", text: "visit(root) → A" },
      { id: "a1s4", text: "inorder(root->right) // → C" },
      { id: "a1s5", text: "return" }
    ]
  },
  a2: {
    id: "a2",
    label: "inorder(B)",
    badge: "root=B",
    steps: [
      { id: "a2s1", text: "if(root == NULL)" },
      { id: "a2s2", text: "inorder(root->left)  // NULL ✓" },
      { id: "a2s3", text: "visit(root) → B" },
      { id: "a2s4", text: "inorder(root->right) // → D" },
      { id: "a2s5", text: "return" }
    ]
  },
  a4: {
    id: "a4",
    label: "inorder(D)",
    badge: "root=D",
    steps: [
      { id: "a4s1", text: "if(root == NULL)" },
      { id: "a4s2", text: "inorder(root->left)  // NULL ✓" },
      { id: "a4s3", text: "visit(root) → D" },
      { id: "a4s4", text: "inorder(root->right) // NULL ✓" },
      { id: "a4s5", text: "return" }
    ]
  },
  a7: {
    id: "a7",
    label: "inorder(C)",
    badge: "root=C",
    steps: [
      { id: "a7s1", text: "if(root == NULL)" },
      { id: "a7s2", text: "inorder(root->left)  // → E" },
      { id: "a7s3", text: "visit(root) → C" },
      { id: "a7s4", text: "inorder(root->right) // → F" },
      { id: "a7s5", text: "return" }
    ]
  },
  a8: {
    id: "a8",
    label: "inorder(E)",
    badge: "root=E",
    steps: [
      { id: "a8s1", text: "if(root == NULL)" },
      { id: "a8s2", text: "inorder(root->left)  // NULL ✓" },
      { id: "a8s3", text: "visit(root) → E" },
      { id: "a8s4", text: "inorder(root->right) // NULL ✓" },
      { id: "a8s5", text: "return" }
    ]
  },
  a11: {
    id: "a11",
    label: "inorder(F)",
    badge: "root=F",
    steps: [
      { id: "a11s1", text: "if(root == NULL)" },
      { id: "a11s2", text: "inorder(root->left)  // NULL ✓" },
      { id: "a11s3", text: "visit(root) → F" },
      { id: "a11s4", text: "inorder(root->right) // NULL ✓" },
      { id: "a11s5", text: "return" }
    ]
  }
};

const ALL_ANIM_BOX_IDS = Object.keys(BOX_DEFS);
/* Combined list used only for hide/show when switching traversals */
const ALL_BOX_IDS_COMBINED = [...Object.keys(BOX_DEFS)]; /* preorder boxes added after DOM ready */
const INORDER_ANIM_STEPS = [
  /* step 1 — program start */
  { boxes:["main"], activeBox:"main", activeStep:0, dimmed:[], hidden:["a1","a2","a4","a7","a8","a11"], arrow:null, linkArrow:null, panTo:"main", expl:"Program starts." },
  /* step 2 — inorder(A) called */
  { boxes:["main","a1"], activeBox:"a1", activeStep:0, dimmed:["main"], hidden:["a2","a4","a7","a8","a11"], arrow:{type:"call",fromBox:"main",fromStep:0,toBox:"a1",toStep:0}, linkArrow:{fromBox:"main",fromStep:0,toBox:"a1"}, panTo:"a1", expl:"inorder(A) called. root ≠ NULL." },
  /* step 3 — inorder(A) goes LEFT → calls inorder(B) */
  { boxes:["main","a1"], activeBox:"a1", activeStep:1, dimmed:["main"], hidden:["a2","a4","a7","a8","a11"], arrow:null, linkArrow:{fromBox:"main",fromStep:0,toBox:"a1"}, panTo:"a1", expl:"inorder(A) goes LEFT." },
  /* step 4 — inorder(B) called */
  { boxes:["main","a1","a2"], activeBox:"a2", activeStep:0, dimmed:["main","a1"], hidden:["a4","a7","a8","a11"], arrow:{type:"call",fromBox:"a1",fromStep:1,toBox:"a2",toStep:0}, linkArrow:{fromBox:"a1",fromStep:1,toBox:"a2"}, panTo:"a2", expl:"inorder(B) called. root ≠ NULL." },
  /* step 5 — inorder(B): B.left=NULL, inline null check, no new frame */
  { boxes:["main","a1","a2"], activeBox:"a2", activeStep:1, dimmed:["main","a1"], hidden:["a4","a7","a8","a11"], arrow:null, linkArrow:{fromBox:"a1",fromStep:1,toBox:"a2"}, panTo:"a2", expl:"B.left = NULL ✓ — null check inline, no recursive call." },
  /* step 6 — Visit B */
  { boxes:["main","a1","a2"], activeBox:"a2", activeStep:2, dimmed:["main","a1"], hidden:["a4","a7","a8","a11"], arrow:null, linkArrow:{fromBox:"a1",fromStep:1,toBox:"a2"}, panTo:"a2", expl:"Visit B — printf fires. Output: B" },
  /* step 7 — inorder(B) goes RIGHT → calls inorder(D) */
  { boxes:["main","a1","a2"], activeBox:"a2", activeStep:3, dimmed:["main","a1"], hidden:["a4","a7","a8","a11"], arrow:null, linkArrow:{fromBox:"a1",fromStep:1,toBox:"a2"}, panTo:"a2", expl:"B.right = D. inorder(B) goes RIGHT." },
  /* step 8 — inorder(D) called */
  { boxes:["main","a1","a2","a4"], activeBox:"a4", activeStep:0, dimmed:["main","a1","a2"], hidden:["a7","a8","a11"], arrow:{type:"call",fromBox:"a2",fromStep:3,toBox:"a4",toStep:0}, linkArrow:{fromBox:"a2",fromStep:3,toBox:"a4"}, panTo:"a4", expl:"inorder(D) called. root ≠ NULL." },
  /* step 9 — inorder(D): D.left=NULL inline */
  { boxes:["main","a1","a2","a4"], activeBox:"a4", activeStep:1, dimmed:["main","a1","a2"], hidden:["a7","a8","a11"], arrow:null, linkArrow:{fromBox:"a2",fromStep:3,toBox:"a4"}, panTo:"a4", expl:"D.left = NULL ✓ — null check inline." },
  /* step 10 — Visit D */
  { boxes:["main","a1","a2","a4"], activeBox:"a4", activeStep:2, dimmed:["main","a1","a2"], hidden:["a7","a8","a11"], arrow:null, linkArrow:{fromBox:"a2",fromStep:3,toBox:"a4"}, panTo:"a4", expl:"Visit D — printf fires. Output: B D" },
  /* step 11 — inorder(D): D.right=NULL inline */
  { boxes:["main","a1","a2","a4"], activeBox:"a4", activeStep:3, dimmed:["main","a1","a2"], hidden:["a7","a8","a11"], arrow:null, linkArrow:{fromBox:"a2",fromStep:3,toBox:"a4"}, panTo:"a4", expl:"D.right = NULL ✓ — null check inline." },
  /* step 12 — inorder(D) return */
  { boxes:["main","a1","a2","a4"], activeBox:"a4", activeStep:4, dimmed:["main","a1","a2"], hidden:["a7","a8","a11"], arrow:null, linkArrow:{fromBox:"a2",fromStep:3,toBox:"a4"}, panTo:"a4", expl:"inorder(D) complete. return." },
  /* step 13 — inorder(D) returns to inorder(B), B complete, return */
  { boxes:["main","a1","a2"], activeBox:"a2", activeStep:4, dimmed:["main","a1"], hidden:["a4","a7","a8","a11"], arrow:{type:"ret",fromBox:"a4",fromStep:4,toBox:"a2",toStep:3}, linkArrow:{fromBox:"a1",fromStep:1,toBox:"a2"}, panTo:"a2", expl:"inorder(D) returned. inorder(B) complete. return." },
  /* step 14 — inorder(B) returns to inorder(A), resumes at visit(root) */
  { boxes:["main","a1"], activeBox:"a1", activeStep:2, dimmed:["main"], hidden:["a2","a4","a7","a8","a11"], arrow:{type:"ret",fromBox:"a2",fromStep:4,toBox:"a1",toStep:2}, linkArrow:{fromBox:"main",fromStep:0,toBox:"a1"}, panTo:"a1", expl:"inorder(B) returned. inorder(A) resumes — next: visit(root)." },
  /* step 15 — Visit A */
  { boxes:["main","a1"], activeBox:"a1", activeStep:2, dimmed:["main"], hidden:["a2","a4","a7","a8","a11"], arrow:null, linkArrow:{fromBox:"main",fromStep:0,toBox:"a1"}, panTo:"a1", expl:"Visit A — printf fires. Output: B D A" },
  /* step 16 — inorder(A) goes RIGHT */
  { boxes:["main","a1"], activeBox:"a1", activeStep:3, dimmed:["main"], hidden:["a2","a4","a7","a8","a11"], arrow:null, linkArrow:{fromBox:"main",fromStep:0,toBox:"a1"}, panTo:"a1", expl:"A.right = C. inorder(A) goes RIGHT." },
  /* step 17 — inorder(C) called */
  { boxes:["main","a1","a7"], activeBox:"a7", activeStep:0, dimmed:["main","a1"], hidden:["a2","a4","a8","a11"], arrow:{type:"call",fromBox:"a1",fromStep:3,toBox:"a7",toStep:0}, linkArrow:{fromBox:"a1",fromStep:3,toBox:"a7"}, panTo:"a7", expl:"inorder(C) called. root ≠ NULL." },
  /* step 18 — inorder(C) goes LEFT */
  { boxes:["main","a1","a7"], activeBox:"a7", activeStep:1, dimmed:["main","a1"], hidden:["a2","a4","a8","a11"], arrow:null, linkArrow:{fromBox:"a1",fromStep:3,toBox:"a7"}, panTo:"a7", expl:"C.left = E. inorder(C) goes LEFT." },
  /* step 19 — inorder(E) called */
  { boxes:["main","a1","a7","a8"], activeBox:"a8", activeStep:0, dimmed:["main","a1","a7"], hidden:["a2","a4","a11"], arrow:{type:"call",fromBox:"a7",fromStep:1,toBox:"a8",toStep:0}, linkArrow:{fromBox:"a7",fromStep:1,toBox:"a8"}, panTo:"a8", expl:"inorder(E) called. root ≠ NULL." },
  /* step 20 — inorder(E): E.left=NULL inline */
  { boxes:["main","a1","a7","a8"], activeBox:"a8", activeStep:1, dimmed:["main","a1","a7"], hidden:["a2","a4","a11"], arrow:null, linkArrow:{fromBox:"a7",fromStep:1,toBox:"a8"}, panTo:"a8", expl:"E.left = NULL ✓ — null check inline." },
  /* step 21 — Visit E */
  { boxes:["main","a1","a7","a8"], activeBox:"a8", activeStep:2, dimmed:["main","a1","a7"], hidden:["a2","a4","a11"], arrow:null, linkArrow:{fromBox:"a7",fromStep:1,toBox:"a8"}, panTo:"a8", expl:"Visit E — printf fires. Output: B D A E" },
  /* step 22 — inorder(E): E.right=NULL inline */
  { boxes:["main","a1","a7","a8"], activeBox:"a8", activeStep:3, dimmed:["main","a1","a7"], hidden:["a2","a4","a11"], arrow:null, linkArrow:{fromBox:"a7",fromStep:1,toBox:"a8"}, panTo:"a8", expl:"E.right = NULL ✓ — null check inline." },
  /* step 23 — inorder(E) return */
  { boxes:["main","a1","a7","a8"], activeBox:"a8", activeStep:4, dimmed:["main","a1","a7"], hidden:["a2","a4","a11"], arrow:null, linkArrow:{fromBox:"a7",fromStep:1,toBox:"a8"}, panTo:"a8", expl:"inorder(E) complete. return." },
  /* step 24 — inorder(E) returns to inorder(C), resumes at visit(root) */
  { boxes:["main","a1","a7"], activeBox:"a7", activeStep:2, dimmed:["main","a1"], hidden:["a2","a4","a8","a11"], arrow:{type:"ret",fromBox:"a8",fromStep:4,toBox:"a7",toStep:2}, linkArrow:{fromBox:"a1",fromStep:3,toBox:"a7"}, panTo:"a7", expl:"inorder(E) returned. inorder(C) resumes — next: visit(root)." },
  /* step 25 — Visit C */
  { boxes:["main","a1","a7"], activeBox:"a7", activeStep:2, dimmed:["main","a1"], hidden:["a2","a4","a8","a11"], arrow:null, linkArrow:{fromBox:"a1",fromStep:3,toBox:"a7"}, panTo:"a7", expl:"Visit C — printf fires. Output: B D A E C" },
  /* step 26 — inorder(C) goes RIGHT */
  { boxes:["main","a1","a7"], activeBox:"a7", activeStep:3, dimmed:["main","a1"], hidden:["a2","a4","a8","a11"], arrow:null, linkArrow:{fromBox:"a1",fromStep:3,toBox:"a7"}, panTo:"a7", expl:"C.right = F. inorder(C) goes RIGHT." },
  /* step 27 — inorder(F) called */
  { boxes:["main","a1","a7","a11"], activeBox:"a11", activeStep:0, dimmed:["main","a1","a7"], hidden:["a2","a4","a8"], arrow:{type:"call",fromBox:"a7",fromStep:3,toBox:"a11",toStep:0}, linkArrow:{fromBox:"a7",fromStep:3,toBox:"a11"}, panTo:"a11", expl:"inorder(F) called. root ≠ NULL." },
  /* step 28 — inorder(F): F.left=NULL inline */
  { boxes:["main","a1","a7","a11"], activeBox:"a11", activeStep:1, dimmed:["main","a1","a7"], hidden:["a2","a4","a8"], arrow:null, linkArrow:{fromBox:"a7",fromStep:3,toBox:"a11"}, panTo:"a11", expl:"F.left = NULL ✓ — null check inline." },
  /* step 29 — Visit F */
  { boxes:["main","a1","a7","a11"], activeBox:"a11", activeStep:2, dimmed:["main","a1","a7"], hidden:["a2","a4","a8"], arrow:null, linkArrow:{fromBox:"a7",fromStep:3,toBox:"a11"}, panTo:"a11", expl:"Visit F — printf fires. Output: B D A E C F" },
  /* step 30 — inorder(F): F.right=NULL inline */
  { boxes:["main","a1","a7","a11"], activeBox:"a11", activeStep:3, dimmed:["main","a1","a7"], hidden:["a2","a4","a8"], arrow:null, linkArrow:{fromBox:"a7",fromStep:3,toBox:"a11"}, panTo:"a11", expl:"F.right = NULL ✓ — null check inline." },
  /* step 31 — inorder(F) return, unwind chain */
  { boxes:["main","a1","a7","a11"], activeBox:"a11", activeStep:4, dimmed:["main","a1","a7"], hidden:["a2","a4","a8"], arrow:null, linkArrow:{fromBox:"a7",fromStep:3,toBox:"a11"}, panTo:"a11", expl:"inorder(F) complete. return." },
  /* step 32 — inorder(F) returns to inorder(C) */
  { boxes:["main","a1","a7"], activeBox:"a7", activeStep:4, dimmed:["main","a1"], hidden:["a2","a4","a8","a11"], arrow:{type:"ret",fromBox:"a11",fromStep:4,toBox:"a7",toStep:4}, linkArrow:{fromBox:"a1",fromStep:3,toBox:"a7"}, panTo:"a7", expl:"inorder(F) returned. inorder(C) complete. return." },
  /* step 33 — inorder(C) returns to inorder(A) */
  { boxes:["main","a1"], activeBox:"a1", activeStep:4, dimmed:["main"], hidden:["a2","a4","a7","a8","a11"], arrow:{type:"ret",fromBox:"a7",fromStep:4,toBox:"a1",toStep:4}, linkArrow:{fromBox:"main",fromStep:0,toBox:"a1"}, panTo:"a1", expl:"inorder(C) returned. inorder(A) complete. return." },
  /* step 34 — inorder(A) returns to main */
  { boxes:["main"], activeBox:"main", activeStep:1, dimmed:[], hidden:["a1","a2","a4","a7","a8","a11"], arrow:{type:"ret",fromBox:"a1",fromStep:4,toBox:"main",toStep:1}, linkArrow:null, panTo:"main", expl:"inorder(A) returned to main(). Stack fully unwound." },
  /* step 35 — done */
  { boxes:["main"], activeBox:"main", activeStep:1, dimmed:[], hidden:["a1","a2","a4","a7","a8","a11"], arrow:null, linkArrow:null, panTo:"main", expl:"Inorder traversal complete! Output: B → D → A → E → C → F", done:true }
];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
let currentType  = 'inorder';
let currentStep  = 0;
let steps        = INORDER_STEPS;
let config       = TRAVERSAL_CONFIGS['inorder'];
let lastEffectiveAnimStep = null; /* tracks merged anim step for scroll redraws */

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

    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    glow.setAttribute('id', `glow-${id}`);
    glow.setAttribute('cx', pos.x);
    glow.setAttribute('cy', pos.y);
    glow.setAttribute('r', 22);
    glow.setAttribute('class', 'tree-node-glow');
    glow.setAttribute('fill', 'none');
    glow.setAttribute('pointer-events', 'none');

    g.appendChild(glow);
    g.appendChild(circle);
    g.appendChild(text);
    elTreeNodes.appendChild(g);
  });
}

/* ══════════════════════════════════════════════════════════════
   ANIMATION PANEL — DIAGONAL CASCADE (mirrors binary-trees)
   Each child box is offset right + below its parent.
   left = CANVAS_LEFT_PAD + depth * BOX_GAP_H
   top  = parentTop + parentHeight + BOX_GAP_V
══════════════════════════════════════════════════════════════ */

const BOX_WIDTH      = 240;
const BOX_GAP_H      = 60;   /* horizontal indent per depth level */
const BOX_GAP_V      = 32;   /* vertical gap between parent bottom and child top */
const CANVAS_LEFT_PAD = 40;

/* Depth in call chain — determines left offset */
const BOX_DEPTH = {
  main: 0,
  a1: 1,   /* inorder(A) */
  a2: 2,   /* inorder(B) */
  a4: 3,   /* inorder(D) — right child of B */
  a7: 2,   /* inorder(C) */
  a8: 3,   /* inorder(E) */
  a11: 3   /* inorder(F) */
};

/* Parent map for computing top position */
const BOX_PARENT_OF = {
  a1: "main",
  a2: "a1",
  a4: "a2",   /* D is right child of B */
  a7: "a1",
  a8: "a7",
  a11: "a7"
};

/* Estimated box height: header ~40px + steps*28px + padding 16px */
function estimatedBoxHeight(id) {
  const def = BOX_DEFS[id] || PREORDER_BOX_DEFS[id] || POSTORDER_BOX_DEFS[id];
  if (!def) return 60;
  return 40 + def.steps.length * 28 + 16;
}

/* Left position: diagonal cascade — depth*BOX_GAP_H from left pad */
function computeBoxLeft(id) {
  if (PREORDER_BOX_DEPTH[id] !== undefined) return CANVAS_LEFT_PAD + PREORDER_BOX_DEPTH[id] * BOX_GAP_H;
  if (POSTORDER_BOX_DEPTH[id] !== undefined) return CANVAS_LEFT_PAD + POSTORDER_BOX_DEPTH[id] * BOX_GAP_H;
  return CANVAS_LEFT_PAD + BOX_DEPTH[id] * BOX_GAP_H;
}

/* Top position: parent's top + parent's height + gap */
function computeBoxTop(id) {
  const parentId = PREORDER_BOX_PARENT_OF[id] || POSTORDER_BOX_PARENT_OF[id] || BOX_PARENT_OF[id];
  if (!parentId) return 40; /* main starts at top */
  const parentTop = computeBoxTop(parentId);
  const parentH   = estimatedBoxHeight(parentId);
  return parentTop + parentH + BOX_GAP_V;
}

const boxEls = {};
let drawnLinks = new Set();

function buildBox(id) {
  const def = BOX_DEFS[id] || PREORDER_BOX_DEFS[id] || POSTORDER_BOX_DEFS[id];
  if (!def) return;
  const el = document.createElement('div');
  el.className = 'call-box';
  el.id = 'box-' + id;
  el.style.left = computeBoxLeft(id) + 'px';
  el.style.top  = computeBoxTop(id) + 'px';
  el.style.display = 'none';

  const nameClass = def.isMain ? 'is-main' : '';
  const badgeCls  = def.isNull ? 'null-badge' : (def.isMain ? 'main-badge' : '');

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
  if (!animCanvas) return;
  /* Canvas must be absolute-positioned wide canvas like binary-trees */
  animCanvas.style.position = 'absolute';
  animCanvas.style.top = '0';
  animCanvas.style.left = '0';
  animCanvas.style.width = '3000px';
  ALL_ANIM_BOX_IDS.forEach(buildBox);
  ALL_PREORDER_BOX_IDS.forEach(buildBox);
  ALL_POSTORDER_BOX_IDS.forEach(buildBox);
  updateCanvasHeight();
}

function updateCanvasHeight() {
  if (!animCanvas) return;
  let maxBottom = 40;
  [...ALL_ANIM_BOX_IDS, ...ALL_PREORDER_BOX_IDS, ...ALL_POSTORDER_BOX_IDS].forEach(id => {
    const t = computeBoxTop(id);
    const h = estimatedBoxHeight(id);
    if (t + h > maxBottom) maxBottom = t + h;
  });
  animCanvas.style.height = Math.max(1200, maxBottom + 120) + 'px';
  animCanvas.style.minHeight = '';
}

/* In diagonal layout, positions are fixed — no resize repositioning needed */
function repositionBoxes() {
  /* No-op: left is depth-based, not viewport-width-based */
}

/* ── Visibility + highlight ── */
function setBoxVisibility(as, boxIdList) {
  const dimmedIds = as.dimmed || [];
  const hiddenIds = as.hidden || [];

  boxIdList.forEach(id => {
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
      /* Subtle dimming only — older frames stay nearly fully visible */
      el.classList.remove('dimmed');
      el.style.opacity = (isDimmed && !isActive) ? '0.82' : '';
      el.style.filter  = '';
      if (wasHidden) {
        el.classList.remove('box-fadein');
        void el.offsetWidth;
        el.classList.add('box-fadein');
      }
    }
  });
}

function setBoxStepHighlight(as, boxIdList) {
  boxIdList.forEach(id => {
    const def = BOX_DEFS[id] || PREORDER_BOX_DEFS[id] || POSTORDER_BOX_DEFS[id];
    if (!def) return;
    def.steps.forEach((_, i) => {
      const el = document.getElementById(`bstep-${id}-${i}`);
      if (!el) return;
      el.classList.toggle('active-step', id === as.activeBox && i === as.activeStep);
    });
  });
}

/* ── 2D pan — matches binary-trees: translate(-x, -y) ── */
function getCurrentOffsets() {
  const m = animCanvas.style.transform.match(/translate\(-?([\d.]+)px,\s*-?([\d.]+)px\)/);
  return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
}

function setOffsets(ox, oy) {
  const vpWidth  = animViewport ? animViewport.offsetWidth  : 400;
  const vpHeight = animViewport ? animViewport.offsetHeight : 400;
  const cx = Math.max(0, Math.min(ox, 2400 - vpWidth));
  const cy = Math.max(-vpHeight, Math.min(oy, Math.max(0, 1200 - vpHeight)));
  animCanvas.style.transform = `translate(-${cx}px, -${cy}px)`;
}

function computePanTarget(id) {
  if (!id || !animViewport) return null;
  const vpWidth  = animViewport.offsetWidth;
  const vpHeight = animViewport.offsetHeight;
  const boxX     = computeBoxLeft(id);

  const targetX  = boxX - vpWidth / 2 + BOX_WIDTH / 2;
  const maxOffX  = 2400 - vpWidth;
  const clampedX = Math.max(0, Math.min(targetX, maxOffX));

  const isMobile = window.innerWidth <= 768;
  let scrollY;
  if (isMobile) {
    const activeTop = computeBoxTop(id);
    const parentId  = BOX_PARENT_OF[id];
    if (parentId) {
      const parentTop  = computeBoxTop(parentId);
      const activeH    = estimatedBoxHeight(id);
      const childBottom = activeTop + activeH;
      const showFrom   = activeTop - 16;
      const peekScroll = Math.max(0, parentTop - 8);
      const childOffBottom = childBottom - (peekScroll + vpHeight);
      scrollY = childOffBottom > 0 ? showFrom : peekScroll;
    } else {
      scrollY = Math.max(0, activeTop - 16);
    }
  } else {
    const parentId = PREORDER_BOX_PARENT_OF[id] || POSTORDER_BOX_PARENT_OF[id] || BOX_PARENT_OF[id];
    const activeTop = computeBoxTop(id);
    if (parentId) {
      const parentTop = computeBoxTop(parentId);
      /* Show parent partially (~60px above child), never scroll past parent top */
      const peekAbove = Math.max(parentTop, activeTop - 80);
      scrollY = Math.max(0, peekAbove - 16);
    } else {
      scrollY = Math.max(0, activeTop - 24);
    }
  }

  const maxOffY  = Math.max(0, 1200 - vpHeight);
  const clampedY = Math.min(scrollY, maxOffY);

  return { x: clampedX, y: clampedY };
}

function panToBox(id) {
  const t = computePanTarget(id);
  if (!t) return;
  animCanvas.style.transform = `translate(-${t.x}px, -${t.y}px)`;
}

function smoothPanToBox(id, callback) {
  if (!id || !animViewport) { if (callback) callback(); return; }
  const t = computePanTarget(id);
  if (!t) { if (callback) callback(); return; }
  const DURATION = 480;
  animCanvas.style.transition = `transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  animCanvas.style.transform  = `translate(-${t.x}px, -${t.y}px)`;
  setTimeout(() => {
    if (animCanvas) animCanvas.style.transition = '';
    if (callback) callback();
  }, DURATION + 20);
}

/* ── Arrow drawing (horizontal bezier: right→left for call, left→right for return) ── */
function clearArrows() {
  arrowsSvg.querySelectorAll('path, line, polyline').forEach(el => el.remove());
}

/* Get midpoint of a step row — side: 'right' | 'left' | 'top' | 'bottom' */
function getStepRowMidpoint(boxId, stepIdx, side) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;
  const stepsEl  = el.querySelector('.box-steps');
  const stepEls  = stepsEl ? stepsEl.querySelectorAll('.box-step') : [];
  const target   = stepEls[stepIdx];
  const vpRect   = animViewport.getBoundingClientRect();

  if (!target) {
    const hdr = el.querySelector('.box-header');
    if (!hdr) return null;
    const r = hdr.getBoundingClientRect();
    return {
      x: side === 'right' ? r.right - vpRect.left : r.left - vpRect.left,
      y: r.top - vpRect.top + r.height / 2
    };
  }
  const r = target.getBoundingClientRect();
  return {
    x: side === 'right' ? r.right - vpRect.left : r.left - vpRect.left,
    y: r.top - vpRect.top + r.height / 2
  };
}

function getBoxHeaderMidpoint(boxId, side) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;
  const hdr = el.querySelector('.box-header');
  if (!hdr) return null;
  const vpRect = animViewport.getBoundingClientRect();
  const r = hdr.getBoundingClientRect();
  return {
    x: side === 'right' ? r.right - vpRect.left : r.left - vpRect.left,
    y: r.top - vpRect.top + r.height / 2
  };
}

/* Horizontal bezier: left-to-right */
function bezierPath(x1, y1, x2, y2) {
  const dx   = Math.abs(x2 - x1);
  const cp1x = x1 + dx * 0.4;
  const cp2x = x2 - dx * 0.4;
  return `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
}

function makePath(d, cls, markerId, animate) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', cls);
  if (markerId) path.setAttribute('marker-end', `url(#${markerId})`);
  arrowsSvg.appendChild(path);

  if (animate) {
    const isRet  = cls.includes('arrow-ret');
    const isLink = cls.includes('arrow-link') && !cls.includes('faded');
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
        if (isRet)  path.style.animation = 'dash-flow-ret 0.65s linear infinite';
        if (isLink) path.style.animation = 'dash-flow 0.7s linear infinite';
      }, drawDuration + 20);
    });
  }
}

/* Draw persistent blue link arrow: parent step-row right → child header left */
function drawLinkArrow(link, faded) {
  if (!link) return;
  const from = getStepRowMidpoint(link.fromBox, link.fromStep, 'right');
  const to   = getBoxHeaderMidpoint(link.toBox, 'left');
  if (!from || !to) return;
  const cls = faded ? 'arrow-link arrow-link-faded' : 'arrow-link';
  const linkKey = `${link.fromBox}->${link.toBox}`;
  const shouldAnimate = !faded && !drawnLinks.has(linkKey);
  if (shouldAnimate) drawnLinks.add(linkKey);
  makePath(bezierPath(from.x, from.y, to.x, to.y), cls, 'mh-call', shouldAnimate);
}

/* Draw return arrow: child left → parent step-row right (going left) */
function drawReturnArrow(arrow) {
  if (!arrow || arrow.type !== 'ret') return;
  const fromEl = boxEls[arrow.fromBox];
  const toEl   = boxEls[arrow.toBox];
  if (!fromEl || !toEl) return;
  if (fromEl.style.display === 'none' || toEl.style.display === 'none') return;

  const from = getStepRowMidpoint(arrow.fromBox, arrow.fromStep, 'left');
  const to   = getStepRowMidpoint(arrow.toBox,   arrow.toStep,   'right');
  if (!from || !to) return;

  const dx   = Math.abs(from.x - to.x);
  const cp1x = from.x - dx * 0.4;
  const cp2x = to.x   + dx * 0.4;
  const d = `M ${from.x} ${from.y} C ${cp1x} ${from.y}, ${cp2x} ${to.y}, ${to.x} ${to.y}`;

  const retKey = `ret:${arrow.fromBox}->${arrow.toBox}`;
  const shouldAnimate = !drawnLinks.has(retKey);
  if (shouldAnimate) drawnLinks.add(retKey);
  makePath(d, 'arrow-ret', 'mh-ret', shouldAnimate);
}

/* Ancestor link chain */
const PARENT_OF_ANIM = BOX_PARENT_OF;
const CALL_STEP_OF = {
  a1: 0,   /* main step 0 → inorder(A) */
  a2: 1,   /* a1 step 1 (left) → inorder(B) */
  a4: 3,   /* a2 step 3 (right) → inorder(D); D is B's right child */
  a7: 3,   /* a1 step 3 (right) → inorder(C) */
  a8: 1,   /* a7 step 1 (left) → inorder(E) */
  a11: 3   /* a7 step 3 (right) → inorder(F) */
};

function getAncestorLinks(as) {
  const isPreorder  = currentType === 'preorder';
  const isPostorder = currentType === 'postorder';
  const parentMap   = isPreorder ? PREORDER_BOX_PARENT_OF : (isPostorder ? POSTORDER_BOX_PARENT_OF : PARENT_OF_ANIM);
  const callStepMap = isPreorder ? PREORDER_CALL_STEP_OF  : (isPostorder ? POSTORDER_CALL_STEP_OF  : CALL_STEP_OF);
  const links = [];
  const visible = new Set(as.boxes || []);
  let child = as.activeBox;
  while (child) {
    const parent = parentMap[child];
    if (!parent || !visible.has(parent) || !visible.has(child)) break;
    /* Use linkArrow fromStep if this is the immediate parent relationship */
    const lk = as.linkArrow;
    if (lk && lk.toBox === child && lk.fromBox === parent) {
      links.push({ fromBox: parent, fromStep: lk.fromStep, toBox: child });
    } else {
      const step = callStepMap[child] !== undefined ? callStepMap[child] : 0;
      links.push({ fromBox: parent, fromStep: step, toBox: child });
    }
    child = parent;
  }
  return links;
}

function redrawAllArrows(as, skipReturn) {
  clearArrows();
  requestAnimationFrame(() => {
    const allLinks = getAncestorLinks(as);
    allLinks.forEach((lk, i) => {
      drawLinkArrow(lk, i !== 0 /* faded for grandparent+ */);
    });
    if (!skipReturn && as.arrow && as.arrow.type === 'ret') drawReturnArrow(as.arrow);
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

/* ── Update progress dots (for inorder and preorder) ── */
function buildAnimProgressDots() {
  const dotsEl = document.getElementById('progressDots');
  if (!dotsEl) return;
  if (currentType === 'inorder') {
    dotsEl.innerHTML = INORDER_ANIM_STEPS.map((_, i) =>
      `<div class="viz-dot" id="adot-${i}"></div>`
    ).join('');
  } else if (currentType === 'preorder') {
    dotsEl.innerHTML = PREORDER_ANIM_STEPS.map((_, i) =>
      `<div class="viz-dot" id="adot-${i}"></div>`
    ).join('');
  } else if (currentType === 'postorder') {
    dotsEl.innerHTML = POSTORDER_ANIM_STEPS.map((_, i) =>
      `<div class="viz-dot" id="adot-${i}"></div>`
    ).join('');
  } else {
    dotsEl.innerHTML = '';
  }
}

function updateAnimDots(idx, animSteps) {
  animSteps.forEach((_, i) => {
    const d = document.getElementById('adot-' + i);
    if (!d) return;
    d.className = 'viz-dot' +
      (i === idx ? ' viz-dot-active' : '') +
      (i < idx   ? ' viz-dot-done'   : '');
  });
}

/* ── renderAnimStep — drives center panel from INORDER_ANIM_STEPS, PREORDER_ANIM_STEPS, or POSTORDER_ANIM_STEPS ── */
function renderAnimStep(idx) {
  const isInorder   = currentType === 'inorder';
  const isPreorder  = currentType === 'preorder';
  const isPostorder = currentType === 'postorder';

  if (!isInorder && !isPreorder && !isPostorder) {
    [...ALL_ANIM_BOX_IDS, ...ALL_PREORDER_BOX_IDS, ...ALL_POSTORDER_BOX_IDS].forEach(id => {
      const el = boxEls[id];
      if (el) { el.style.display = 'none'; el.classList.remove('active-box','dimmed','box-fadein'); }
    });
    clearArrows();
    return;
  }

  const animSteps  = isPreorder ? PREORDER_ANIM_STEPS : (isPostorder ? POSTORDER_ANIM_STEPS : INORDER_ANIM_STEPS);
  const boxIdList  = isPreorder ? ALL_PREORDER_BOX_IDS : (isPostorder ? ALL_POSTORDER_BOX_IDS : ALL_ANIM_BOX_IDS);
  const otherIds   = [
    ...(isInorder  ? [] : ALL_ANIM_BOX_IDS),
    ...(isPreorder ? [] : ALL_PREORDER_BOX_IDS),
    ...(isPostorder? [] : ALL_POSTORDER_BOX_IDS)
  ];
  const doneOutput = isPreorder ? 'A → B → D → C → E → F' : (isPostorder ? 'D → B → E → F → C → A' : 'B → D → A → E → C → F');

  /* Hide boxes from other traversals */
  otherIds.forEach(id => {
    const el = boxEls[id];
    if (el) { el.style.display = 'none'; el.classList.remove('active-box','dimmed','box-fadein'); }
  });

  const as = animSteps[idx];
  if (!as) return;

  const prev         = idx > 0 ? animSteps[idx - 1] : null;
  const prevVis      = new Set(prev ? (prev.boxes || []) : []);
  const nextVis      = new Set(as.boxes || []);
  const disappearing = [...prevVis].filter(id => !nextVis.has(id));
  const SETTLE       = 60;

  /* ── Determine green return arrow for return-line steps ── */
  const isReturnLine = (as.activeStep === 4);
  const nextAs = animSteps[idx + 1];
  const retArrow = (isReturnLine && nextAs && nextAs.arrow && nextAs.arrow.type === 'ret')
    ? nextAs.arrow
    : null;

  if (isReturnLine && retArrow) {
    drawnLinks.delete(`ret:${retArrow.fromBox}->${retArrow.toBox}`);
  }

  /* ── Eager call arrow ── */
  const isCallLine = (as.activeStep === 1 || as.activeStep === 2 || as.activeStep === 3);
  const eagerCall = (isCallLine && nextAs && nextAs.arrow && nextAs.arrow.type === 'call')
    ? nextAs.arrow
    : null;

  if (eagerCall) {
    drawnLinks.delete(`${eagerCall.fromBox}->${eagerCall.toBox}`);
  }

  function phaseStandard() {
    fadeOutBoxes(disappearing, () => {
      const panTarget = eagerCall ? nextAs.panTo : as.panTo;
      smoothPanToBox(panTarget, () => {
        setTimeout(() => {
          if (eagerCall) {
            const mergedAs = Object.assign({}, as, {
              boxes: nextAs.boxes,
              hidden: nextAs.hidden,
              dimmed: as.dimmed,
              /* set activeBox to child so getAncestorLinks walks full chain */
              activeBox: eagerCall.toBox,
              linkArrow: { fromBox: eagerCall.fromBox, fromStep: eagerCall.fromStep, toBox: eagerCall.toBox }
            });
            lastEffectiveAnimStep = mergedAs;
            setBoxVisibility(mergedAs, boxIdList);
            setBoxStepHighlight(as, boxIdList);
            clearArrows();
            requestAnimationFrame(() => {
              const allLinks = getAncestorLinks(mergedAs);
              allLinks.forEach((lk, i) => drawLinkArrow(lk, i !== 0));
              /* Animate the eager call arrow (outermost = index 0, already drawn above) */
            });
          } else {
            lastEffectiveAnimStep = as;
            setBoxVisibility(as, boxIdList);
            setBoxStepHighlight(as, boxIdList);
            if (isReturnLine && retArrow) {
              clearArrows();
              requestAnimationFrame(() => {
                const allLinks = getAncestorLinks(as);
                allLinks.forEach((lk, i) => drawLinkArrow(lk, i !== 0));
                drawReturnArrow(retArrow);
              });
            } else {
              redrawAllArrows(as, false);
            }
          }
          updateAnimDots(idx, animSteps);
          if (elAnimStatus) {
            const stepNum = idx + 1;
            elAnimStatus.textContent = stepNum >= animSteps.length ? 'Done' : `Step ${stepNum}`;
          }
          if (as.done) showDoneOverlay(doneOutput);
        }, nextVis.size > prevVis.size ? SETTLE : 0);
      });
    });
  }

  phaseStandard();
}

function showDoneOverlay(outputStr) {
  if (!animViewport) return;
  if (animViewport.querySelector('.done-overlay')) return;
  const out = outputStr || 'B → D → A → E → C → F';
  const div = document.createElement('div');
  div.className = 'done-overlay';
  div.innerHTML =
    `<div class="done-icon">🌿</div>` +
    `<div class="done-title">Traversal Done!</div>` +
    `<div class="done-sub">Output: ${out}</div>`;
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

  /* SVG tree: visit glow — orange node + green glow ring at printf moment */
  const isInorderVisitStep = currentType === 'inorder'
    && s.codeLines.length === 1 && s.codeLines[0] === 14
    && s.currentNode !== null
    && s.visitedNodes.includes(s.currentNode)
    && s.visitedNodes[s.visitedNodes.length - 1] === s.currentNode;

  const isPreorderVisitStep = currentType === 'preorder'
    && s.codeLines.length === 1 && s.codeLines[0] === 13
    && s.currentNode !== null
    && s.visitedNodes.includes(s.currentNode)
    && s.visitedNodes[s.visitedNodes.length - 1] === s.currentNode;

  const isPostorderVisitStep = currentType === 'postorder'
    && s.codeLines.length === 1 && s.codeLines[0] === 15
    && s.currentNode !== null
    && s.visitedNodes.includes(s.currentNode)
    && s.visitedNodes[s.visitedNodes.length - 1] === s.currentNode;

  const isVisitStep = isInorderVisitStep || isPreorderVisitStep || isPostorderVisitStep;

  Object.keys(NODE_POS).forEach(id => {
    const glowEl = document.getElementById(`glow-${id}`);
    if (!glowEl) return;
    glowEl.classList.remove('visit-glow');
    if (isVisitStep && id === s.currentNode) {
      glowEl.classList.add('visit-glow');
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
  lastEffectiveAnimStep = null;

  /* Reset anim canvas */
  if (animCanvas) {
    animCanvas.style.transition = '';
    animCanvas.style.transform  = 'translate(0px, 0px)';
  }
  [...ALL_ANIM_BOX_IDS, ...ALL_PREORDER_BOX_IDS, ...ALL_POSTORDER_BOX_IDS].forEach(id => {
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
  lastEffectiveAnimStep = null;
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

/* ── Drag-to-pan: both axes ── */
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
    setOffsets(startOffX + (startX - e.clientX), startOffY + (startY - e.clientY));
    const animSteps = currentType === 'preorder' ? PREORDER_ANIM_STEPS : (currentType === 'postorder' ? POSTORDER_ANIM_STEPS : INORDER_ANIM_STEPS);
    const effectiveAs = lastEffectiveAnimStep || animSteps[currentStep];
    if ((currentType === 'inorder' || currentType === 'preorder' || currentType === 'postorder') && effectiveAs) {
      redrawAllArrows(effectiveAs);
    }
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    animViewport.classList.remove('grabbing');
  });

  /* Touch drag with inertia */
  let touchStartX = 0, touchStartY = 0, touchOffX = 0, touchOffY = 0;
  let lastTouchX = 0, lastTouchY = 0, lastTouchTime = 0;
  let velX = 0, velY = 0;
  let inertiaRaf = null;

  function cancelInertia() {
    if (inertiaRaf) { cancelAnimationFrame(inertiaRaf); inertiaRaf = null; }
  }

  function runInertia() {
    const FRICTION = 0.88;
    if (Math.abs(velX) < 0.3 && Math.abs(velY) < 0.3) { inertiaRaf = null; return; }
    const off = getCurrentOffsets();
    setOffsets(off.x + velX, off.y + velY);
    velX *= FRICTION; velY *= FRICTION;
    const animSteps2 = currentType === 'preorder' ? PREORDER_ANIM_STEPS : (currentType === 'postorder' ? POSTORDER_ANIM_STEPS : INORDER_ANIM_STEPS);
    const effectiveAs2 = lastEffectiveAnimStep || animSteps2[currentStep];
    if ((currentType === 'inorder' || currentType === 'preorder' || currentType === 'postorder') && effectiveAs2) {
      redrawAllArrows(effectiveAs2);
    }
    inertiaRaf = requestAnimationFrame(runInertia);
  }

  animViewport.addEventListener('touchstart', e => {
    cancelInertia();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    lastTouchX  = touchStartX;
    lastTouchY  = touchStartY;
    lastTouchTime = Date.now();
    velX = 0; velY = 0;
    const off = getCurrentOffsets();
    touchOffX = off.x; touchOffY = off.y;
  }, { passive: true });

  animViewport.addEventListener('touchmove', e => {
    const tx  = e.touches[0].clientX;
    const ty  = e.touches[0].clientY;
    const now = Date.now();
    const dt  = Math.max(1, now - lastTouchTime);
    velX = (lastTouchX - tx) / dt * 16;
    velY = (lastTouchY - ty) / dt * 16;
    lastTouchX = tx; lastTouchY = ty; lastTouchTime = now;
    setOffsets(touchOffX + (touchStartX - tx), touchOffY + (touchStartY - ty));
    const animSteps3 = currentType === 'preorder' ? PREORDER_ANIM_STEPS : (currentType === 'postorder' ? POSTORDER_ANIM_STEPS : INORDER_ANIM_STEPS);
    const effectiveAs3 = lastEffectiveAnimStep || animSteps3[currentStep];
    if ((currentType === 'inorder' || currentType === 'preorder' || currentType === 'postorder') && effectiveAs3) {
      redrawAllArrows(effectiveAs3);
    }
  }, { passive: true });

  animViewport.addEventListener('touchend', () => {
    if (Math.abs(velX) > 1 || Math.abs(velY) > 1) {
      inertiaRaf = requestAnimationFrame(runInertia);
    }
  }, { passive: true });

  /* Mousewheel scroll (vertical + horizontal) */
  animViewport.addEventListener('wheel', e => {
    e.preventDefault();
    cancelInertia();
    const off = getCurrentOffsets();
    if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      setOffsets(off.x + (e.deltaX || e.deltaY) * 0.8, off.y);
    } else {
      setOffsets(off.x, off.y + e.deltaY * 0.8);
    }
    const animSteps4 = currentType === 'preorder' ? PREORDER_ANIM_STEPS : (currentType === 'postorder' ? POSTORDER_ANIM_STEPS : INORDER_ANIM_STEPS);
    const effectiveAs4 = lastEffectiveAnimStep || animSteps4[currentStep];
    if ((currentType === 'inorder' || currentType === 'preorder' || currentType === 'postorder') && effectiveAs4) {
      redrawAllArrows(effectiveAs4);
    }
  }, { passive: false });
})();

/* Resize: redraw arrows */
window.addEventListener('resize', () => {
  const animSteps5 = currentType === 'preorder' ? PREORDER_ANIM_STEPS : (currentType === 'postorder' ? POSTORDER_ANIM_STEPS : INORDER_ANIM_STEPS);
  const effectiveAs5 = lastEffectiveAnimStep || animSteps5[currentStep];
  if ((currentType === 'inorder' || currentType === 'preorder' || currentType === 'postorder') && effectiveAs5) {
    redrawAllArrows(effectiveAs5);
  }
});

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
buildAllBoxes();
buildCodePanel();
buildAnimProgressDots();
buildTreeSVG();
renderStep(0);