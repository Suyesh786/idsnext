/* ════════════════════════════════════════════════
   Tree Representation Visualize Code — IDS Studio Next
   build() from array — Step-by-step call stack visualizer
   ════════════════════════════════════════════════ */

/* ── Code lines with syntax highlighting ── */
const CODE_LINES = [
  { n:1,  html: '<span class="c-kw">#include</span><span class="c-str">&lt;stdio.h&gt;</span>' },
  { n:2,  html: '<span class="c-kw">#include</span><span class="c-str">&lt;stdlib.h&gt;</span>' },
  { n:3,  html: '<span class="c-kw">struct</span> <span class="c-type">node</span>{' },
  { n:4,  html: '  <span class="c-kw">int</span> data;' },
  { n:5,  html: '  <span class="c-kw">struct</span> <span class="c-type">node</span>* left, *right;' },
  { n:6,  html: '};' },
  { n:7,  html: '<span class="c-kw">struct</span> <span class="c-type">node</span>* <span class="c-fn">build</span>(<span class="c-kw">int</span> arr[],<span class="c-kw">int</span> i,<span class="c-kw">int</span> n){' },
  { n:8,  html: '  <span class="c-kw">if</span>(i &gt;= n){' },
  { n:9,  html: '    <span class="c-kw">return</span> <span class="c-num">NULL</span>;' },
  { n:10, html: '  }' },
  { n:11, html: '  <span class="c-kw">struct</span> <span class="c-type">node</span>* root =' },
  { n:12, html: '      <span class="c-fn">malloc</span>(<span class="c-kw">sizeof</span>(<span class="c-kw">struct</span> <span class="c-type">node</span>));' },
  { n:13, html: '  root-&gt;data = arr[i];' },
  { n:14, html: '  root-&gt;left = <span class="c-fn">build</span>(arr, <span class="c-num">2</span>*i+<span class="c-num">1</span>, n);' },
  { n:15, html: '  root-&gt;right = <span class="c-fn">build</span>(arr, <span class="c-num">2</span>*i+<span class="c-num">2</span>, n);' },
  { n:16, html: '  <span class="c-kw">return</span> root;' },
  { n:17, html: '}' },
  { n:18, html: '<span class="c-kw">int</span> <span class="c-fn">main</span>(){' },
  { n:19, html: '  <span class="c-kw">int</span> arr[] = {<span class="c-num">1</span>, <span class="c-num">2</span>, <span class="c-num">3</span>};' },
  { n:20, html: '  <span class="c-kw">int</span> n = <span class="c-num">3</span>;' },
  { n:21, html: '  <span class="c-kw">struct</span> <span class="c-type">node</span>* root = <span class="c-fn">build</span>(arr, <span class="c-num">0</span>, n);' },
  { n:22, html: '}' },
];

/* ── Box definitions ── */
const BOX_DEFS = {
  main: {
    id: 'main', label: 'int main', isMain: true, badge: '',
    steps: [
      { id:'ms1', text:'int arr[] = {1,2,3}' },
      { id:'ms2', text:'int n = 3' },
      { id:'ms3', text:'root = build(arr, 0, n)' },
    ]
  },
  b0: {
    id: 'b0', label: 'build()', badge: 'i=0, arr[0]=1',
    steps: [
      { id:'b0s1', text:'i=0, n=3' },
      { id:'b0s2', text:'i >= n ? NO' },
      { id:'b0s3', text:'malloc → root (0x100)' },
      { id:'b0s4', text:'root->data = arr[0] = 1' },
      { id:'b0s5', text:'root->left = build(arr,1,3)' },
      { id:'b0s6', text:'root->right = build(arr,2,3)' },
      { id:'b0s7', text:'return root (0x100)' },
    ]
  },
  b1: {
    id: 'b1', label: 'build()', badge: 'i=1, arr[1]=2',
    steps: [
      { id:'b1s1', text:'i=1, n=3' },
      { id:'b1s2', text:'i >= n ? NO' },
      { id:'b1s3', text:'malloc → root (0x200)' },
      { id:'b1s4', text:'root->data = arr[1] = 2' },
      { id:'b1s5', text:'root->left = build(arr,3,3)' },
      { id:'b1s6', text:'root->right = build(arr,4,3)' },
      { id:'b1s7', text:'return root (0x200)' },
    ]
  },
  b2: {
    id: 'b2', label: 'build()', badge: 'i=2, arr[2]=3',
    steps: [
      { id:'b2s1', text:'i=2, n=3' },
      { id:'b2s2', text:'i >= n ? NO' },
      { id:'b2s3', text:'malloc → root (0x300)' },
      { id:'b2s4', text:'root->data = arr[2] = 3' },
      { id:'b2s5', text:'root->left = build(arr,5,3)' },
      { id:'b2s6', text:'root->right = build(arr,6,3)' },
      { id:'b2s7', text:'return root (0x300)' },
    ]
  },
  b3: {
    id: 'b3', label: 'build()', badge: 'i=3 ≥ n', isNull: true,
    steps: [
      { id:'b3s1', text:'i=3, n=3' },
      { id:'b3s2', text:'i >= n ? YES' },
      { id:'b3s3', text:'return NULL' },
    ]
  },
  b4: {
    id: 'b4', label: 'build()', badge: 'i=4 ≥ n', isNull: true,
    steps: [
      { id:'b4s1', text:'i=4, n=3' },
      { id:'b4s2', text:'i >= n ? YES' },
      { id:'b4s3', text:'return NULL' },
    ]
  },
  b5: {
    id: 'b5', label: 'build()', badge: 'i=5 ≥ n', isNull: true,
    steps: [
      { id:'b5s1', text:'i=5, n=3' },
      { id:'b5s2', text:'i >= n ? YES' },
      { id:'b5s3', text:'return NULL' },
    ]
  },
  b6: {
    id: 'b6', label: 'build()', badge: 'i=6 ≥ n', isNull: true,
    steps: [
      { id:'b6s1', text:'i=6, n=3' },
      { id:'b6s2', text:'i >= n ? YES' },
      { id:'b6s3', text:'return NULL' },
    ]
  },
};

/* ── Full step sequence ── */
const STEPS = [

  /* 1 */ {
    codeLines: [18],
    boxes: ['main'],
    activeBox: 'main', activeStep: 0,
    dimmed: [], hidden: ['b0','b1','b2','b3','b4','b5','b6'],
    arrow: null, linkArrow: null,
    panTo: 'main',
    expl: 'Program starts. main() declares the array arr={1,2,3} and sets n=3.'
  },

  /* 2 */ {
    codeLines: [19],
    boxes: ['main'],
    activeBox: 'main', activeStep: 1,
    dimmed: [], hidden: ['b0','b1','b2','b3','b4','b5','b6'],
    arrow: null, linkArrow: null,
    panTo: 'main',
    expl: 'int arr[] = {1,2,3} — the array we will convert into a binary tree.'
  },

  /* 3 */ {
    codeLines: [20],
    boxes: ['main'],
    activeBox: 'main', activeStep: 2,
    dimmed: [], hidden: ['b0','b1','b2','b3','b4','b5','b6'],
    arrow: null, linkArrow: null,
    panTo: 'main',
    expl: 'n=3 — the size of the array. build() will stop when index i >= n.'
  },

  /* 4 */ {
    codeLines: [21],
    boxes: ['main','b0'],
    activeBox: 'b0', activeStep: 0,
    dimmed: ['main'], hidden: ['b1','b2','b3','b4','b5','b6'],
    arrow: { type:'call', fromBox:'main', fromStep:2, toBox:'b0', toStep:0 },
    linkArrow: { fromBox:'main', fromStep:2, toBox:'b0' },
    panTo: 'b0',
    expl: 'main() calls build(arr, 0, 3). i=0, so we check if 0 >= 3.'
  },

  /* 5 */ {
    codeLines: [8],
    boxes: ['main','b0'],
    activeBox: 'b0', activeStep: 1,
    dimmed: ['main'], hidden: ['b1','b2','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'main', fromStep:2, toBox:'b0' },
    panTo: 'b0',
    expl: 'i=0 >= n=3 ? NO. We proceed to create a node for arr[0]=1.'
  },

  /* 6 */ {
    codeLines: [11,12],
    boxes: ['main','b0'],
    activeBox: 'b0', activeStep: 2,
    dimmed: ['main'], hidden: ['b1','b2','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'main', fromStep:2, toBox:'b0' },
    panTo: 'b0',
    treeAction: { type:'malloc', node:'n1' },
    expl: 'malloc creates a new node at address 0x100. This will become the root.'
  },

  /* 7 */ {
    codeLines: [13],
    boxes: ['main','b0'],
    activeBox: 'b0', activeStep: 3,
    dimmed: ['main'], hidden: ['b1','b2','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'main', fromStep:2, toBox:'b0' },
    panTo: 'b0',
    treeAction: { type:'setData', node:'n1', value:'1' },
    expl: 'root->data = arr[0] = 1. Node 1 is the root of our tree.'
  },

  /* 8 */ {
    codeLines: [14],
    boxes: ['main','b0','b1'],
    activeBox: 'b1', activeStep: 0,
    dimmed: ['main','b0'], hidden: ['b2','b3','b4','b5','b6'],
    arrow: { type:'call', fromBox:'b0', fromStep:4, toBox:'b1', toStep:0 },
    linkArrow: { fromBox:'b0', fromStep:4, toBox:'b1' },
    panTo: 'b1',
    expl: 'build(arr, 2*0+1=1, 3) called for LEFT child of node 1. i=1.'
  },

  /* 9 */ {
    codeLines: [8],
    boxes: ['main','b0','b1'],
    activeBox: 'b1', activeStep: 1,
    dimmed: ['main','b0'], hidden: ['b2','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'b0', fromStep:4, toBox:'b1' },
    panTo: 'b1',
    expl: 'i=1 >= n=3 ? NO. Proceed to create node for arr[1]=2.'
  },

  /* 10 */ {
    codeLines: [11,12],
    boxes: ['main','b0','b1'],
    activeBox: 'b1', activeStep: 2,
    dimmed: ['main','b0'], hidden: ['b2','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'b0', fromStep:4, toBox:'b1' },
    panTo: 'b1',
    treeAction: { type:'malloc', node:'n2' },
    expl: 'malloc creates node at 0x200. This will be left child of node 1.'
  },

  /* 11 */ {
    codeLines: [13],
    boxes: ['main','b0','b1'],
    activeBox: 'b1', activeStep: 3,
    dimmed: ['main','b0'], hidden: ['b2','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'b0', fromStep:4, toBox:'b1' },
    panTo: 'b1',
    treeAction: { type:'setData', node:'n2', value:'2' },
    expl: 'root->data = arr[1] = 2. Node 2 has its data set.'
  },

  /* 12 */ {
    codeLines: [14],
    boxes: ['main','b0','b1','b3'],
    activeBox: 'b3', activeStep: 0,
    dimmed: ['main','b0','b1'], hidden: ['b2','b4','b5','b6'],
    arrow: { type:'call', fromBox:'b1', fromStep:4, toBox:'b3', toStep:0 },
    linkArrow: { fromBox:'b1', fromStep:4, toBox:'b3' },
    panTo: 'b3',
    expl: 'build(arr, 2*1+1=3, 3) called for LEFT child of node 2. i=3.'
  },

  /* 13 */ {
    codeLines: [8],
    boxes: ['main','b0','b1','b3'],
    activeBox: 'b3', activeStep: 1,
    dimmed: ['main','b0','b1'], hidden: ['b2','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'b1', fromStep:4, toBox:'b3' },
    panTo: 'b3',
    expl: 'i=3 >= n=3 ? YES! Base case hit. Return NULL — no node here.'
  },

  /* 14 */ {
    codeLines: [9],
    boxes: ['main','b0','b1','b3'],
    activeBox: 'b3', activeStep: 2,
    dimmed: ['main','b0','b1'], hidden: ['b2','b4','b5','b6'],
    arrow: { type:'ret', fromBox:'b3', fromStep:2, toBox:'b1', toStep:4 },
    linkArrow: { fromBox:'b1', fromStep:4, toBox:'b3' },
    panTo: 'b3',
    treeAction: { type:'setLeft', node:'n2', value:'NULL' },
    expl: 'Returning NULL. Left child of node 2 is NULL (index 3 is out of bounds).'
  },

  /* 15 */ {
    codeLines: [15],
    boxes: ['main','b0','b1','b4'],
    activeBox: 'b4', activeStep: 0,
    dimmed: ['main','b0','b1'], hidden: ['b2','b3','b5','b6'],
    arrow: { type:'call', fromBox:'b1', fromStep:5, toBox:'b4', toStep:0 },
    linkArrow: { fromBox:'b1', fromStep:5, toBox:'b4' },
    panTo: 'b4',
    expl: 'b3 fades out. build(arr, 2*1+2=4, 3) called for RIGHT child of node 2. i=4.'
  },

  /* 16 */ {
    codeLines: [8],
    boxes: ['main','b0','b1','b4'],
    activeBox: 'b4', activeStep: 1,
    dimmed: ['main','b0','b1'], hidden: ['b2','b3','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'b1', fromStep:5, toBox:'b4' },
    panTo: 'b4',
    expl: 'i=4 >= n=3 ? YES! Return NULL. Right child of node 2 is NULL.'
  },

  /* 17 */ {
    codeLines: [9],
    boxes: ['main','b0','b1','b4'],
    activeBox: 'b4', activeStep: 2,
    dimmed: ['main','b0','b1'], hidden: ['b2','b3','b5','b6'],
    arrow: { type:'ret', fromBox:'b4', fromStep:2, toBox:'b1', toStep:5 },
    linkArrow: { fromBox:'b1', fromStep:5, toBox:'b4' },
    panTo: 'b4',
    treeAction: { type:'setRight', node:'n2', value:'NULL' },
    expl: 'Returning NULL. Right child of node 2 is NULL. Both children of node 2 done.'
  },

  /* 18 */ {
    codeLines: [16],
    boxes: ['main','b0','b1'],
    activeBox: 'b1', activeStep: 6,
    dimmed: ['main','b0'], hidden: ['b2','b3','b4','b5','b6'],
    arrow: { type:'ret', fromBox:'b1', fromStep:6, toBox:'b0', toStep:4 },
    linkArrow: { fromBox:'b0', fromStep:4, toBox:'b1' },
    panTo: 'b1',
    treeAction: { type:'setLeft', node:'n1', value:'0x200' },
    expl: 'Node 2 complete. Returning 0x200 to b0. root->left of node 1 is now node 2.'
  },

  /* 19 */ {
    codeLines: [15],
    boxes: ['main','b0','b2'],
    activeBox: 'b2', activeStep: 0,
    dimmed: ['main','b0'], hidden: ['b1','b3','b4','b5','b6'],
    arrow: { type:'call', fromBox:'b0', fromStep:5, toBox:'b2', toStep:0 },
    linkArrow: { fromBox:'b0', fromStep:5, toBox:'b2' },
    panTo: 'b2',
    expl: 'b1 fades. build(arr, 2*0+2=2, 3) called for RIGHT child of node 1. i=2.'
  },

  /* 20 */ {
    codeLines: [8],
    boxes: ['main','b0','b2'],
    activeBox: 'b2', activeStep: 1,
    dimmed: ['main','b0'], hidden: ['b1','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'b0', fromStep:5, toBox:'b2' },
    panTo: 'b2',
    expl: 'i=2 >= n=3 ? NO. Proceed to create node for arr[2]=3.'
  },

  /* 21 */ {
    codeLines: [11,12],
    boxes: ['main','b0','b2'],
    activeBox: 'b2', activeStep: 2,
    dimmed: ['main','b0'], hidden: ['b1','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'b0', fromStep:5, toBox:'b2' },
    panTo: 'b2',
    treeAction: { type:'malloc', node:'n3' },
    expl: 'malloc creates node at 0x300. This will be right child of node 1.'
  },

  /* 22 */ {
    codeLines: [13],
    boxes: ['main','b0','b2'],
    activeBox: 'b2', activeStep: 3,
    dimmed: ['main','b0'], hidden: ['b1','b3','b4','b5','b6'],
    arrow: null,
    linkArrow: { fromBox:'b0', fromStep:5, toBox:'b2' },
    panTo: 'b2',
    treeAction: { type:'setData', node:'n3', value:'3' },
    expl: 'root->data = arr[2] = 3. Node 3 has its data set.'
  },

  /* 23 */ {
    codeLines: [14],
    boxes: ['main','b0','b2','b5'],
    activeBox: 'b5', activeStep: 0,
    dimmed: ['main','b0','b2'], hidden: ['b1','b3','b4','b6'],
    arrow: { type:'call', fromBox:'b2', fromStep:4, toBox:'b5', toStep:0 },
    linkArrow: { fromBox:'b2', fromStep:4, toBox:'b5' },
    panTo: 'b5',
    expl: 'build(arr, 2*2+1=5, 3) for LEFT child of node 3. i=5 >= n=3 → NULL.'
  },

  /* 24 */ {
    codeLines: [8],
    boxes: ['main','b0','b2','b5'],
    activeBox: 'b5', activeStep: 1,
    dimmed: ['main','b0','b2'], hidden: ['b1','b3','b4','b6'],
    arrow: null,
    linkArrow: { fromBox:'b2', fromStep:4, toBox:'b5' },
    panTo: 'b5',
    expl: 'i=5 >= n=3 ? YES. Return NULL.'
  },

  /* 25 */ {
    codeLines: [9],
    boxes: ['main','b0','b2','b5'],
    activeBox: 'b5', activeStep: 2,
    dimmed: ['main','b0','b2'], hidden: ['b1','b3','b4','b6'],
    arrow: { type:'ret', fromBox:'b5', fromStep:2, toBox:'b2', toStep:4 },
    linkArrow: { fromBox:'b2', fromStep:4, toBox:'b5' },
    panTo: 'b5',
    treeAction: { type:'setLeft', node:'n3', value:'NULL' },
    expl: 'Returning NULL. Left child of node 3 is NULL.'
  },

  /* 26 */ {
    codeLines: [15],
    boxes: ['main','b0','b2','b6'],
    activeBox: 'b6', activeStep: 0,
    dimmed: ['main','b0','b2'], hidden: ['b1','b3','b4','b5'],
    arrow: { type:'call', fromBox:'b2', fromStep:5, toBox:'b6', toStep:0 },
    linkArrow: { fromBox:'b2', fromStep:5, toBox:'b6' },
    panTo: 'b6',
    expl: 'b5 fades. build(arr, 2*2+2=6, 3) for RIGHT child of node 3. i=6 >= 3 → NULL.'
  },

  /* 27 */ {
    codeLines: [8],
    boxes: ['main','b0','b2','b6'],
    activeBox: 'b6', activeStep: 1,
    dimmed: ['main','b0','b2'], hidden: ['b1','b3','b4','b5'],
    arrow: null,
    linkArrow: { fromBox:'b2', fromStep:5, toBox:'b6' },
    panTo: 'b6',
    expl: 'i=6 >= n=3 ? YES. Return NULL.'
  },

  /* 28 */ {
    codeLines: [9],
    boxes: ['main','b0','b2','b6'],
    activeBox: 'b6', activeStep: 2,
    dimmed: ['main','b0','b2'], hidden: ['b1','b3','b4','b5'],
    arrow: { type:'ret', fromBox:'b6', fromStep:2, toBox:'b2', toStep:5 },
    linkArrow: { fromBox:'b2', fromStep:5, toBox:'b6' },
    panTo: 'b6',
    treeAction: { type:'setRight', node:'n3', value:'NULL' },
    expl: 'Returning NULL. Right child of node 3 is NULL. Both children of node 3 done.'
  },

  /* 29 */ {
    codeLines: [16],
    boxes: ['main','b0','b2'],
    activeBox: 'b2', activeStep: 6,
    dimmed: ['main','b0'], hidden: ['b1','b3','b4','b5','b6'],
    arrow: { type:'ret', fromBox:'b2', fromStep:6, toBox:'b0', toStep:5 },
    linkArrow: { fromBox:'b0', fromStep:5, toBox:'b2' },
    panTo: 'b2',
    treeAction: { type:'setRight', node:'n1', value:'0x300' },
    expl: 'Node 3 complete. Returning 0x300 to b0. root->right of node 1 is now node 3.'
  },

  /* 30 */ {
    codeLines: [16],
    boxes: ['main','b0'],
    activeBox: 'b0', activeStep: 6,
    dimmed: ['main'], hidden: ['b1','b2','b3','b4','b5','b6'],
    arrow: { type:'ret', fromBox:'b0', fromStep:6, toBox:'main', toStep:2 },
    linkArrow: { fromBox:'main', fromStep:2, toBox:'b0' },
    panTo: 'b0',
    expl: 'All children built. Returning root node 0x100 (value=1) back to main().'
  },

  /* 31 */ {
    codeLines: [21],
    boxes: ['main'],
    activeBox: 'main', activeStep: 2,
    dimmed: [], hidden: ['b0','b1','b2','b3','b4','b5','b6'],
    arrow: null, linkArrow: null,
    panTo: 'main',
    treeAction: { type:'setRoot', node:'n1', value:'0x100' },
    expl: 'root now points to 0x100 (node 1). Full binary tree built from array!'
  },

  /* 32 */ {
    codeLines: [],
    boxes: [],
    activeBox: null, activeStep: -1,
    dimmed: [], hidden: ['main','b0','b1','b2','b3','b4','b5','b6'],
    arrow: null, linkArrow: null,
    panTo: null,
    done: true,
    expl: 'Done! arr[0]=1 is root, arr[1]=2 is left child, arr[2]=3 is right child. Array representation → linked tree.'
  },
];

const TOTAL_STEPS = STEPS.length; // 32

/* ── Layout ── */
const BOX_WIDTH      = 240;
const BOX_GAP_H      = 60;
const BOX_GAP_V      = 32;
const CANVAS_LEFT_PAD = 40;

/* Depth in call chain */
const BOX_DEPTH = { main:0, b0:1, b1:2, b2:2, b3:3, b4:3, b5:3, b6:3 };

/* Parent map for vertical positioning */
const BOX_PARENT = { b0:'main', b1:'b0', b2:'b0', b3:'b1', b4:'b1', b5:'b2', b6:'b2' };

function boxLeft(id) {
  return CANVAS_LEFT_PAD + BOX_DEPTH[id] * BOX_GAP_H;
}

function estimatedBoxHeight(id) {
  const def = BOX_DEFS[id];
  if (!def) return 60;
  return 40 + def.steps.length * 28 + 16;
}

function computeBoxTop(id) {
  const parentId = BOX_PARENT[id];
  if (!parentId) return 40;
  const parentTop = computeBoxTop(parentId);
  const parentH   = estimatedBoxHeight(parentId);
  return parentTop + parentH + BOX_GAP_V;
}

/* ── State ── */
let currentStep = 0;

/* ── DOM refs ── */
const codeLines   = document.getElementById('codeLines');
const animCanvas  = document.getElementById('animCanvas');
const animViewport= document.getElementById('animViewport');
const arrowsSvg   = document.getElementById('arrowsSvg');
const explText    = document.getElementById('explText');
const animStatus  = document.getElementById('animStatus');
const headerStepNum   = document.getElementById('headerStepNum');
const headerStepTotal = document.getElementById('headerStepTotal');
const stepPill    = document.getElementById('stepPill');
const progressDots= document.getElementById('progressDots');
const btnPrev     = document.getElementById('btnPrev');
const btnNext     = document.getElementById('btnNext');
const btnReset    = document.getElementById('btnReset');

/* ── Build code panel ── */
function buildCodePanel() {
  if (!codeLines) return;
  codeLines.innerHTML = CODE_LINES.map(l =>
    `<div class="viz-code-line" id="cl${l.n}" data-line="${l.n}">` +
      `<span class="lnum">${l.n}</span>` +
      `<span class="lcode">${l.html}</span>` +
    `</div>`
  ).join('');
}

/* ── Build progress dots ── */
function buildProgressDots() {
  if (!progressDots) return;
  progressDots.innerHTML = Array.from({ length: TOTAL_STEPS }, (_, i) =>
    `<div class="viz-dot" id="dot-${i+1}"></div>`
  ).join('');
}

function updateProgressDots(stepNum) {
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const d = document.getElementById('dot-' + i);
    if (!d) continue;
    d.classList.remove('viz-dot-active', 'viz-dot-done');
    if (i === stepNum) d.classList.add('viz-dot-active');
    else if (i < stepNum) d.classList.add('viz-dot-done');
  }
}

/* ── Build call boxes ── */
const boxEls = {};
let _prevVisibleBoxes = new Set();

function buildBox(id) {
  const def = BOX_DEFS[id];
  const el = document.createElement('div');
  el.className = 'call-box';
  el.id = 'box-' + id;
  el.style.left = boxLeft(id) + 'px';
  el.style.top  = computeBoxTop(id) + 'px';
  el.style.display = 'none';

  const badgeClass = def.isMain ? 'main-badge' : (def.isNull ? 'null-badge' : '');
  const nameClass  = def.isMain ? 'is-main' : '';

  el.innerHTML =
    `<div class="box-header">` +
      `<span class="box-fn-name ${nameClass}">${def.label}</span>` +
      (def.badge ? `<span class="box-badge ${badgeClass}">${def.badge}</span>` : '') +
    `</div>` +
    `<div class="box-steps" id="steps-${id}">` +
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
  Object.keys(BOX_DEFS).forEach(buildBox);
}

/* ── Helpers ── */
function setCodeHighlight(lines) {
  document.querySelectorAll('.viz-code-line').forEach(el => {
    const active = lines.includes(+el.dataset.line);
    el.classList.toggle('viz-line-active', active);
  });
  if (lines.length) {
    const first = document.getElementById('cl' + lines[0]);
    if (first) first.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

function setBoxVisibility(step) {
  const dimmedIds = step.dimmed || [];
  const hiddenIds = step.hidden || [];

  Object.keys(BOX_DEFS).forEach(id => {
    const el = boxEls[id];
    if (!el) return;
    if (hiddenIds.includes(id)) {
      el.style.display = 'none';
      el.classList.remove('active-box','dimmed','fading','box-fadein');
    } else {
      const wasHidden = el.style.display === 'none';
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      const isActive = id === step.activeBox;
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

function setBoxStepHighlight(step) {
  Object.keys(BOX_DEFS).forEach(id => {
    BOX_DEFS[id].steps.forEach((_, i) => {
      const el = document.getElementById(`bstep-${id}-${i}`);
      if (!el) return;
      el.classList.toggle('active-step', id === step.activeBox && i === step.activeStep);
    });
  });
}

/* ── Pan canvas ── */
function computePanTarget(id) {
  if (!id) return null;
  const vpWidth  = animViewport.offsetWidth;
  const vpHeight = animViewport.offsetHeight;
  const boxX     = boxLeft(id);

  const targetX  = boxX - vpWidth / 2 + BOX_WIDTH / 2;
  const maxOffX  = 2400 - vpWidth;
  const clampedX = Math.max(0, Math.min(targetX, maxOffX));

  const parentId = BOX_PARENT[id];
  const scrollY  = parentId
    ? Math.max(0, computeBoxTop(parentId) - 24)
    : Math.max(0, computeBoxTop(id) - 24);
  const maxOffY  = Math.max(0, 1200 - vpHeight);
  const clampedY = Math.min(scrollY, maxOffY);

  return { x: clampedX, y: clampedY };
}

function panToBox(id) {
  const t = computePanTarget(id);
  if (!t) return;
  animCanvas.style.transform = `translate(-${t.x}px, -${t.y}px)`;
}

function smoothPanToBox(id, duration, callback) {
  const t = computePanTarget(id);
  if (!t) { if (callback) callback(); return; }

  animCanvas.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  animCanvas.style.transform  = `translate(-${t.x}px, -${t.y}px)`;

  const interval = setInterval(() => {
    if (currentStep > 0) {
      const s = STEPS[currentStep - 1];
      if (s) redrawAllArrows(s, true);
    }
  }, 60);

  setTimeout(() => {
    clearInterval(interval);
    animCanvas.style.transition = '';
    if (callback) callback();
  }, duration + 20);
}

/* ── Arrow drawing ── */
function clearArrows() {
  arrowsSvg.querySelectorAll('path, line, polyline').forEach(el => el.remove());
}

function getStepRowMidpoint(boxId, stepIdx, side) {
  const el = boxEls[boxId];
  if (!el || el.style.display === 'none') return null;

  const vpRect     = animViewport.getBoundingClientRect();
  const stepsEl    = el.querySelector('.box-steps');
  const stepEls    = stepsEl ? stepsEl.querySelectorAll('.box-step') : [];
  const targetStep = stepEls[stepIdx];

  if (!targetStep) {
    const hdr = el.querySelector('.box-header');
    if (!hdr) return null;
    const r = hdr.getBoundingClientRect();
    return {
      x: side === 'right' ? r.right - vpRect.left : r.left - vpRect.left,
      y: r.top - vpRect.top + r.height / 2
    };
  }

  const r = targetStep.getBoundingClientRect();
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
    y: r.top  - vpRect.top  + r.height / 2
  };
}

function bezierPath(x1, y1, x2, y2) {
  const dx   = Math.abs(x2 - x1);
  const cp1x = x1 + dx * 0.4;
  const cp2x = x2 - dx * 0.4;
  return `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
}

const drawnLinks = new Set();

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
const PARENT_OF    = { b0:'main', b1:'b0', b2:'b0', b3:'b1', b4:'b1', b5:'b2', b6:'b2' };
const CALL_STEP_OF = { b0:2, b1:4, b2:5, b3:4, b4:5, b5:4, b6:5 };

function getAncestorLinks(step) {
  const links = [];
  const visible = new Set(step.boxes || []);
  let child = step.activeBox;
  while (child) {
    const parent = PARENT_OF[child];
    if (!parent || !visible.has(parent) || !visible.has(child)) break;
    links.push({ fromBox: parent, fromStep: CALL_STEP_OF[child], toBox: child });
    child = parent;
  }
  return links;
}

function redrawAllArrows(step, skipReturn) {
  clearArrows();
  requestAnimationFrame(() => {
    const allLinks = getAncestorLinks(step);
    allLinks.forEach((lk, i) => {
      const isImmediate = (i === 0);
      drawLinkArrow(lk, !isImmediate);
    });
    if (!skipReturn && step.arrow && step.arrow.type === 'ret') drawReturnArrow(step.arrow);
  });
}

/* ── Update UI chrome ── */
function updateChrome(stepNum) {
  const label = stepNum === 0 ? 'Ready' : (stepNum >= TOTAL_STEPS ? 'Done' : `Step ${stepNum}`);
  if (animStatus)      animStatus.textContent = label;
  if (headerStepNum)   headerStepNum.textContent  = stepNum;
  if (headerStepTotal) headerStepTotal.textContent = TOTAL_STEPS;
  if (stepPill)        stepPill.textContent = `${stepNum} / ${TOTAL_STEPS}`;

  btnPrev.disabled = stepNum <= 0;
  btnNext.disabled = stepNum >= TOTAL_STEPS;

  updateProgressDots(stepNum);
}

/* ── Done overlay ── */
function showDone() {
  if (animViewport.querySelector('.done-overlay')) return;
  const div = document.createElement('div');
  div.className = 'done-overlay';
  div.innerHTML =
    `<div class="done-icon">🌳</div>` +
    `<div class="done-title">Tree Built from Array!</div>` +
    `<div class="done-sub">arr[0]=1 (root) → arr[1]=2 (left), arr[2]=3 (right)</div>`;
  animViewport.appendChild(div);
}

let _rendering = false;

/* ── Main render ── */
function renderStep(stepNum) {
  const donEl = animViewport.querySelector('.done-overlay');
  if (donEl && stepNum < TOTAL_STEPS) donEl.remove();

  if (stepNum === 0) {
    setCodeHighlight([]);
    Object.keys(BOX_DEFS).forEach(id => {
      const el = boxEls[id];
      if (el) { el.style.display = 'none'; el.style.opacity = ''; el.style.transform = ''; el.style.transition = ''; }
    });
    clearArrows();
    if (explText) explText.innerHTML = 'Click <strong>Next</strong> to begin the walkthrough.';
    updateChrome(0);
    resetTree();
    _rendering = false;
    return;
  }

  const s    = STEPS[stepNum - 1];
  const prev = stepNum > 1 ? STEPS[stepNum - 2] : null;

  const prevVisible  = new Set(prev ? prev.boxes || [] : []);
  const nextVisible  = new Set(s.boxes || []);
  const disappearing = [...prevVisible].filter(id => !nextVisible.has(id));
  const appearing    = [...nextVisible].filter(id => !prevVisible.has(id));

  const isReturnStep = !!(s.arrow && s.arrow.type === 'ret');
  const FADE_DUR  = 260;
  const SCROLL_DUR= 480;
  const SETTLE    = 60;

  function phase1() {
    if (!disappearing.length) return phase2();
    disappearing.forEach(id => {
      const el = boxEls[id];
      if (!el || el.style.display === 'none') return;
      el.style.transition = `opacity ${FADE_DUR}ms ease, transform ${FADE_DUR}ms ease`;
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(-6px) scale(0.97)';
    });
    setTimeout(() => {
      disappearing.forEach(id => {
        const el = boxEls[id];
        if (!el) return;
        el.style.display = 'none'; el.style.opacity = ''; el.style.transform = ''; el.style.transition = '';
        el.classList.remove('active-box','dimmed','fading','box-fadein');
      });
      phase2();
    }, FADE_DUR);
  }

  function phase2() {
    setCodeHighlight(s.codeLines || []);
    updateChrome(stepNum);
    if (explText) explText.innerHTML = s.expl;

    if (s.panTo) {
      smoothPanToBox(s.panTo, SCROLL_DUR, phase3);
    } else {
      phase3();
    }
  }

  function phase3() {
    setTimeout(() => {
      setBoxVisibility(s);
      setBoxStepHighlight(s);
      redrawAllArrows(s, false);
      renderTree(s);
      _rendering = false;
      if (s.done) setTimeout(showDone, 200);
    }, appearing.length ? SETTLE : 0);
  }

  _rendering = true;
  phase1();
}

/* ── Controls ── */
btnNext.addEventListener('click', () => {
  if (_rendering) return;
  if (currentStep < TOTAL_STEPS) { currentStep++; renderStep(currentStep); }
});

btnPrev.addEventListener('click', () => {
  if (_rendering) return;
  if (currentStep > 0) { currentStep--; renderStep(currentStep); }
});

/* Keyboard arrow navigation */
window.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowRight' && !_rendering && currentStep < TOTAL_STEPS) {
    currentStep++; renderStep(currentStep);
  } else if (e.key === 'ArrowLeft' && !_rendering && currentStep > 0) {
    currentStep--; renderStep(currentStep);
  }
});

btnReset.addEventListener('click', () => {
  _rendering = false;
  currentStep = 0;
  drawnLinks.clear();
  animCanvas.style.transition = '';
  animCanvas.style.transform = 'translate(0, 0)';
  renderStep(0);
});

window.addEventListener('resize', () => {
  if (currentStep > 0) {
    const s = STEPS[currentStep - 1];
    if (s) redrawAllArrows(s);
  }
});

function getCurrentOffsets() {
  const m = animCanvas.style.transform.match(/translate\(-?([\d.]+)px,\s*-?([\d.]+)px\)/);
  return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
}

function setOffsets(ox, oy) {
  const vpWidth  = animViewport.offsetWidth;
  const vpHeight = animViewport.offsetHeight;
  const cx = Math.max(0, Math.min(ox, 2400 - vpWidth));
  const cy = Math.max(0, Math.min(oy, Math.max(0, 1200 - vpHeight)));
  animCanvas.style.transform = `translate(-${cx}px, -${cy}px)`;
}

animViewport.addEventListener('wheel', e => {
  e.preventDefault();
  const off = getCurrentOffsets();
  setOffsets(off.x, off.y + e.deltaY * 0.8);
  if (currentStep > 0) {
    const s = STEPS[currentStep - 1];
    if (s) redrawAllArrows(s);
  }
}, { passive: false });

(function initDrag() {
  let dragging = false, startX = 0, startY = 0, startOffX = 0, startOffY = 0;

  animViewport.addEventListener('mousedown', e => {
    dragging = true; startX = e.clientX; startY = e.clientY;
    const off = getCurrentOffsets(); startOffX = off.x; startOffY = off.y;
    animViewport.classList.add('grabbing'); e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    setOffsets(startOffX + (startX - e.clientX), startOffY + (startY - e.clientY));
    if (currentStep > 0) { const s = STEPS[currentStep-1]; if (s) redrawAllArrows(s); }
  });
  window.addEventListener('mouseup', () => {
    if (!dragging) return; dragging = false; animViewport.classList.remove('grabbing');
  });
  animViewport.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    const off = getCurrentOffsets(); startOffX = off.x; startOffY = off.y;
  }, { passive: true });
  animViewport.addEventListener('touchmove', e => {
    setOffsets(startOffX + (startX - e.touches[0].clientX), startOffY + (startY - e.touches[0].clientY));
    if (currentStep > 0) { const s = STEPS[currentStep-1]; if (s) redrawAllArrows(s); }
  }, { passive: true });
})();

(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes boxFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .call-box.box-fadein { animation: boxFadeIn 0.28s ease-out forwards; }
    @keyframes dash-flow-ret { to { stroke-dashoffset: -18; } }
  `;
  document.head.appendChild(style);
})();


/* ════════════════════════════════════════════════
   TREE PANEL — 3 nodes: n1 (root), n2 (left), n3 (right)
   ════════════════════════════════════════════════ */

const treeState = {
  n1: { state: 'none', data: '?', left: '?', right: '?', addr: '0x100', hasRoot: false },
  n2: { state: 'none', data: '?', left: '?', right: '?', addr: '0x200', hasRoot: false },
  n3: { state: 'none', data: '?', left: '?', right: '?', addr: '0x300', hasRoot: false },
};

function resetTree() {
  treeState.n1 = { state: 'none', data: '?', left: '?', right: '?', addr: '0x100', hasRoot: false };
  treeState.n2 = { state: 'none', data: '?', left: '?', right: '?', addr: '0x200', hasRoot: false };
  treeState.n3 = { state: 'none', data: '?', left: '?', right: '?', addr: '0x300', hasRoot: false };

  const panel = document.querySelector('.viz-tree-panel');
  if (!panel) return;
  const canvas = panel.querySelector('.tree-canvas');
  if (canvas) canvas.remove();
  const ph = panel.querySelector('.viz-tree-placeholder');
  if (ph) ph.style.display = 'none';

  (function reInitTree() {
    let c = document.createElement('div');
    c.className = 'tree-canvas';
    c.style.cssText = 'display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:0 0 12px 0;';
    panel.appendChild(c);
    const ml = document.createElement('div'); ml.className = 'tree-section-label-mem'; ml.innerHTML = '🧠 Memory Representation'; c.appendChild(ml);
    const mn = document.createElement('div'); mn.className = 'tree-mem-nodes'; mn.style.cssText = 'position:relative;width:100%;flex-shrink:0;flex:1;min-height:0;'; c.appendChild(mn);
    const dv = document.createElement('hr'); dv.className = 'tree-section-divider'; c.appendChild(dv);
    const tl = document.createElement('div'); tl.className = 'tree-section-label-tree'; tl.innerHTML = '🌳 Tree Structure'; c.appendChild(tl);
    const treeWrap = document.createElement('div');
    treeWrap.className = 'tree-struct-wrap';
    treeWrap.style.cssText = 'flex:1;min-height:0;display:flex;align-items:flex-start;justify-content:center;padding-top:16px;';
    c.appendChild(treeWrap);
    buildCircleTree(treeWrap);
  })();
}

function renderTree(step) {
  if (!step.treeAction) return;
  const { type, node, value } = step.treeAction;
  const ns = treeState[node];

  if (type === 'malloc') {
    ns.state = 'malloc';
    ns.data = '?'; ns.left = '?'; ns.right = '?';
  } else if (type === 'setData') {
    ns.state = 'data';
    ns.data = value;
  } else if (type === 'setLeft') {
    ns.left = value;
  } else if (type === 'setRight') {
    ns.right = value;
  } else if (type === 'setRoot') {
    ns.hasRoot = true;
  }

  const panel = document.querySelector('.viz-tree-panel');
  if (!panel) return;

  const ph = panel.querySelector('.viz-tree-placeholder');
  if (ph) ph.style.display = 'none';

  let canvas = panel.querySelector('.tree-canvas');
  if (!canvas) {
    canvas = document.createElement('div');
    canvas.className = 'tree-canvas';
    canvas.style.cssText = 'display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:0 0 12px 0;';
    panel.appendChild(canvas);
  }

  if (!canvas.querySelector('.tree-section-label-mem')) {
    const memLabel = document.createElement('div');
    memLabel.className = 'tree-section-label-mem';
    memLabel.innerHTML = '🧠 Memory Representation';
    canvas.insertBefore(memLabel, canvas.firstChild);
  }

  let memNodes = canvas.querySelector('.tree-mem-nodes');
  if (!memNodes) {
    memNodes = document.createElement('div');
    memNodes.className = 'tree-mem-nodes';
    memNodes.style.cssText = 'position:relative;width:100%;flex-shrink:0;';
    canvas.appendChild(memNodes);
  }
  memNodes.style.flex = '0 0 auto';

  /* Layout: n1 centered top, n2 below-left, n3 below-right (staggered) */
  const PANEL_W = panel.offsetWidth || 260;
  const NODE_W  = 140;
  const centerX = Math.max(0, (PANEL_W - NODE_W) / 2 - 6);
  const N1_X = centerX;
  const N1_Y = 10;
  const N2_X = Math.max(4, centerX - 110);
  const N2_Y = 155;
  const N3_X = Math.min(centerX + 110, PANEL_W - NODE_W - 4);
  const N3_Y = 190; /* slightly lower than n2 to avoid overlap, per sketch */

  /* Ensure SVG edge layer */
  let svg = memNodes.querySelector('.tree-edge-svg');
  if (!svg) {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'tree-edge-svg');
    svg.innerHTML = `<defs>
      <marker id="tree-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <polygon points="0 0,7 3,0 6" fill="#3b6cff"/>
      </marker>
      <marker id="null-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <polygon points="0 0,6 3,0 6" fill="#cbd5e1"/>
      </marker>
    </defs>`;
    memNodes.insertBefore(svg, memNodes.firstChild);
  }

  const memH = N3_Y + 120; /* use N3_Y (larger) so container fits staggered layout */
  memNodes.style.height = memH + 'px';

  /* Render nodes */
  const nodes = [
    { key: 'n1', x: N1_X, y: N1_Y },
    { key: 'n2', x: N2_X, y: N2_Y },
    { key: 'n3', x: N3_X, y: N3_Y },
  ];

  nodes.forEach(({ key, x, y }) => {
    const ns2 = treeState[key];
    if (ns2.state === 'none') return;

    let el = memNodes.querySelector(`.tree-node[data-node="${key}"]`);
    const isNew = !el;

    if (isNew) {
      el = document.createElement('div');
      el.className = 'tree-node tree-node-appear';
      el.dataset.node = key;
      el.style.left = x + 'px';
      el.style.top  = y + 'px';
      memNodes.appendChild(el);
    }

    el.classList.remove('tree-node-malloc', 'tree-node-data');
    el.classList.add(ns2.state === 'malloc' ? 'tree-node-malloc' : 'tree-node-data');

    let rootLabel = el.querySelector('.tree-root-label');
    if (ns2.hasRoot && !rootLabel) {
      rootLabel = document.createElement('div');
      rootLabel.className = 'tree-root-label';
      rootLabel.innerHTML = '<span class="tree-root-pill">root</span><span class="tree-root-arrow">↓</span>';
      el.insertBefore(rootLabel, el.firstChild);
    }

    let box = el.querySelector('.tree-node-box');
    if (!box) {
      box = document.createElement('div');
      box.className = 'tree-node-box';
      box.innerHTML =
        '<div class="tree-cell tree-cell-left"><div class="tree-cell-label">LEFT</div><div class="tree-cell-val" data-cell="left">?</div></div>' +
        '<div class="tree-cell tree-cell-data"><div class="tree-cell-label">DATA</div><div class="tree-cell-val" data-cell="data">?</div></div>' +
        '<div class="tree-cell tree-cell-right tree-cell-last"><div class="tree-cell-label">RIGHT</div><div class="tree-cell-val" data-cell="right">?</div></div>';
      el.appendChild(box);
    }

    box.querySelector('[data-cell="left"]').textContent  = ns2.left;
    box.querySelector('[data-cell="data"]').textContent  = ns2.data;
    box.querySelector('[data-cell="right"]').textContent = ns2.right;

    let addrEl = el.querySelector('.tree-addr');
    if (!addrEl) {
      addrEl = document.createElement('div');
      addrEl.className = 'tree-addr';
      el.appendChild(addrEl);
    }
    addrEl.textContent = ns2.addr;
    addrEl.style.display = ns2.hasRoot ? 'none' : '';

    let bottomLabel = el.querySelector('.tree-bottom-label');
    if (ns2.hasRoot && !bottomLabel) {
      bottomLabel = document.createElement('div');
      bottomLabel.className = 'tree-bottom-label';
      el.appendChild(bottomLabel);
    }

    if (isNew) setTimeout(() => el.classList.remove('tree-node-appear'), 350);
  });

  /* Draw edges + NULL boxes */
  drawTreeEdge(memNodes, svg, N1_X, N1_Y, N2_X, N2_Y, N3_X, N3_Y);

  /* Ensure circle SVG exists */
  if (!canvas.querySelector('.tree-struct-wrap')) {
    const treeWrap = document.createElement('div');
    treeWrap.className = 'tree-struct-wrap';
    treeWrap.style.cssText = 'display:flex;align-items:center;justify-content:center;padding:8px 0;';
    canvas.appendChild(treeWrap);
    buildCircleTree(treeWrap);
  }

  updateCircleTree(canvas);
}

function drawTreeEdge(memNodes, svg, n1x, n1y, n2x, n2y, n3x, n3y) {
  svg.querySelectorAll('.tree-edge,.tree-null-line').forEach(e => e.remove());
  memNodes.querySelectorAll('.tree-null-box').forEach(e => e.remove());

  const ns1 = treeState.n1;
  const ns2 = treeState.n2;
  const ns3 = treeState.n3;

  if (ns1.state === 'none') return;

  const rootOff  = ns1.hasRoot ? 44 : 0;
  const nodeBoxH = 60;
  const cellW    = 47; /* ~140/3, matches NODE_W=140 */

  /* LEFT cell center-bottom of n1 */
  const lx1 = n1x + cellW / 2;
  const ly1 = n1y + rootOff + nodeBoxH;

  /* RIGHT cell center-bottom of n1 */
  const rx1 = n1x + cellW * 2 + cellW / 2;
  const ry1 = n1y + rootOff + nodeBoxH;

  /* ── n1 left pointer → n2 or NULL ── */
  if (ns1.left === '0x200' && ns2.state !== 'none') {
    const x2 = n2x + 90;
    const y2 = n2y + (ns2.hasRoot ? 44 : 0);
    const alreadyDrawn = svg.dataset.edge12 === '1';
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'tree-edge');
    line.setAttribute('x1', lx1); line.setAttribute('y1', ly1);
    line.setAttribute('x2', x2);  line.setAttribute('y2', y2);
    svg.appendChild(line);
    if (!alreadyDrawn) {
      const totalLen = Math.hypot(x2 - lx1, y2 - ly1);
      line.setAttribute('stroke-dasharray', totalLen);
      line.setAttribute('stroke-dashoffset', totalLen);
      requestAnimationFrame(() => {
        line.style.transition = 'stroke-dashoffset 0.4s ease';
        line.setAttribute('stroke-dashoffset', '0');
      });
      svg.dataset.edge12 = '1';
    }
  } else if (ns1.left === 'NULL') {
    /* handled via n2 NULL boxes below for n1 left cell */
    const nullBox = document.createElement('div');
    nullBox.className = 'tree-null-box';
    nullBox.textContent = 'NULL';
    const nbx = Math.max(0, lx1 - 50);
    const nby = ly1 + 16;
    nullBox.style.left = nbx + 'px'; nullBox.style.top = nby + 'px';
    memNodes.appendChild(nullBox);
    const nullLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    nullLine.setAttribute('class', 'tree-null-line');
    nullLine.setAttribute('x1', lx1); nullLine.setAttribute('y1', ly1);
    nullLine.setAttribute('x2', nbx + 25); nullLine.setAttribute('y2', nby);
    svg.appendChild(nullLine);
  }

  /* ── n1 right pointer → n3 or NULL ── */
  if (ns1.right === '0x300' && ns3.state !== 'none') {
    const x2 = n3x + 90;
    const y2 = n3y + (ns3.hasRoot ? 44 : 0);
    const alreadyDrawn = svg.dataset.edge13 === '1';
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'tree-edge');
    line.setAttribute('x1', rx1); line.setAttribute('y1', ry1);
    line.setAttribute('x2', x2);  line.setAttribute('y2', y2);
    svg.appendChild(line);
    if (!alreadyDrawn) {
      const totalLen = Math.hypot(x2 - rx1, y2 - ry1);
      line.setAttribute('stroke-dasharray', totalLen);
      line.setAttribute('stroke-dashoffset', totalLen);
      requestAnimationFrame(() => {
        line.style.transition = 'stroke-dashoffset 0.4s ease';
        line.setAttribute('stroke-dashoffset', '0');
      });
      svg.dataset.edge13 = '1';
    }
  } else if (ns1.right === 'NULL') {
    const nullBox = document.createElement('div');
    nullBox.className = 'tree-null-box';
    nullBox.textContent = 'NULL';
    const nbx = rx1 + 8;
    const nby = ry1 + 16;
    nullBox.style.left = nbx + 'px'; nullBox.style.top = nby + 'px';
    memNodes.appendChild(nullBox);
    const nullLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    nullLine.setAttribute('class', 'tree-null-line');
    nullLine.setAttribute('x1', rx1); nullLine.setAttribute('y1', ry1);
    nullLine.setAttribute('x2', nbx); nullLine.setAttribute('y2', nby);
    svg.appendChild(nullLine);
  }

  /* ── n2 children (left/right NULL) ── */
  if (ns2.state !== 'none') {
    const n2rootOff = ns2.hasRoot ? 44 : 0;
    const n2BottomY = n2y + n2rootOff + nodeBoxH;
    const n2lx1 = n2x + cellW / 2;
    const n2rx1 = n2x + cellW * 2 + cellW / 2;

    if (ns2.left === 'NULL') {
      const nullBox = document.createElement('div');
      nullBox.className = 'tree-null-box'; nullBox.textContent = 'NULL';
      const nbx = Math.max(0, n2lx1 - 50); const nby = n2BottomY + 16;
      nullBox.style.left = nbx + 'px'; nullBox.style.top = nby + 'px';
      memNodes.appendChild(nullBox);
      const nullLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      nullLine.setAttribute('class', 'tree-null-line');
      nullLine.setAttribute('x1', n2lx1); nullLine.setAttribute('y1', n2BottomY);
      nullLine.setAttribute('x2', nbx + 25); nullLine.setAttribute('y2', nby);
      svg.appendChild(nullLine);
    }
    if (ns2.right === 'NULL') {
      const nullBox = document.createElement('div');
      nullBox.className = 'tree-null-box'; nullBox.textContent = 'NULL';
      const nbx = n2rx1 + 8; const nby = n2BottomY + 16;
      nullBox.style.left = nbx + 'px'; nullBox.style.top = nby + 'px';
      memNodes.appendChild(nullBox);
      const nullLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      nullLine.setAttribute('class', 'tree-null-line');
      nullLine.setAttribute('x1', n2rx1); nullLine.setAttribute('y1', n2BottomY);
      nullLine.setAttribute('x2', nbx); nullLine.setAttribute('y2', nby);
      svg.appendChild(nullLine);
    }
  }

  /* ── n3 children (left/right NULL) ── */
  if (ns3.state !== 'none') {
    const n3rootOff = ns3.hasRoot ? 44 : 0;
    const n3BottomY = n3y + n3rootOff + nodeBoxH;
    const n3lx1 = n3x + cellW / 2;
    const n3rx1 = n3x + cellW * 2 + cellW / 2;

    if (ns3.left === 'NULL') {
      const nullBox = document.createElement('div');
      nullBox.className = 'tree-null-box'; nullBox.textContent = 'NULL';
      const nbx = Math.max(0, n3lx1 - 50); const nby = n3BottomY + 16;
      nullBox.style.left = nbx + 'px'; nullBox.style.top = nby + 'px';
      memNodes.appendChild(nullBox);
      const nullLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      nullLine.setAttribute('class', 'tree-null-line');
      nullLine.setAttribute('x1', n3lx1); nullLine.setAttribute('y1', n3BottomY);
      nullLine.setAttribute('x2', nbx + 25); nullLine.setAttribute('y2', nby);
      svg.appendChild(nullLine);
    }
    if (ns3.right === 'NULL') {
      const nullBox = document.createElement('div');
      nullBox.className = 'tree-null-box'; nullBox.textContent = 'NULL';
      const nbx = n3rx1 + 8; const nby = n3BottomY + 16;
      nullBox.style.left = nbx + 'px'; nullBox.style.top = nby + 'px';
      memNodes.appendChild(nullBox);
      const nullLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      nullLine.setAttribute('class', 'tree-null-line');
      nullLine.setAttribute('x1', n3rx1); nullLine.setAttribute('y1', n3BottomY);
      nullLine.setAttribute('x2', nbx); nullLine.setAttribute('y2', nby);
      svg.appendChild(nullLine);
    }
  }
}

/* Build SVG circle tree — 3 nodes: n1 top, n2 bottom-left, n3 bottom-right */
function buildCircleTree(canvas) {
  if (canvas.querySelector('.tree-struct-svg')) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'tree-struct-svg');
  svg.setAttribute('width', '220');
  svg.setAttribute('height', '170');
  svg.setAttribute('viewBox', '0 0 220 170');

  svg.innerHTML = `
    <defs>
      <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stop-color="#3b6cff"/>
        <stop offset="100%" stop-color="#6b9fff"/>
      </linearGradient>
      <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(59,108,255,0.35)"/>
      </filter>
      <style>
        @keyframes ctPop {
          0%   { opacity:0; transform:scale(0); }
          70%  { opacity:1; transform:scale(1.12); }
          100% { opacity:1; transform:scale(1); }
        }
        .ct-node-1 { opacity:0; transform-origin:110px 28px; transform-box:fill-box; }
        .ct-node-2 { opacity:0; transform-origin:50px 120px; transform-box:fill-box; }
        .ct-node-3 { opacity:0; transform-origin:170px 120px; transform-box:fill-box; }
        .ct-node-1.ct-visible { animation: ctPop 0.25s ease-out forwards; }
        .ct-node-2.ct-visible { animation: ctPop 0.25s ease-out forwards; }
        .ct-node-3.ct-visible { animation: ctPop 0.25s ease-out forwards; }
      </style>
      <marker id="ct-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <polygon points="0 0,8 3,0 6" fill="#3b6cff"/>
      </marker>
    </defs>
    <!-- line n1→n2: hidden until step 18 setLeft n1=0x200 -->
    <line class="ct-line ct-line-12"
      x1="96" y1="52" x2="63" y2="94"
      stroke="#3b6cff" stroke-width="2.5"
      marker-end="url(#ct-arrow)"
      style="display:none"/>
    <!-- line n1→n3: hidden until step 29 setRight n1=0x300 -->
    <line class="ct-line ct-line-13"
      x1="124" y1="52" x2="157" y2="94"
      stroke="#3b6cff" stroke-width="2.5"
      marker-end="url(#ct-arrow)"
      style="display:none"/>
    <!-- Node 1: hidden until step 7 (setData n1) -->
    <g class="tree-circle-node ct-node-1">
      <circle cx="110" cy="28" r="26" fill="url(#nodeGrad)" filter="url(#nodeShadow)"/>
      <text x="110" y="34" text-anchor="middle"
        fill="#ffffff" font-size="15" font-weight="800"
        font-family="DM Sans,sans-serif"
        stroke="#3b6cff" stroke-width="3" paint-order="stroke">1</text>
    </g>
    <!-- Node 2: hidden until step 11 (setData n2) -->
    <g class="tree-circle-node ct-node-2">
      <circle cx="50" cy="120" r="26" fill="url(#nodeGrad)" filter="url(#nodeShadow)"/>
      <text x="50" y="126" text-anchor="middle"
        fill="#ffffff" font-size="15" font-weight="800"
        font-family="DM Sans,sans-serif"
        stroke="#3b6cff" stroke-width="3" paint-order="stroke">2</text>
    </g>
    <!-- Node 3: hidden until step 22 (setData n3) -->
    <g class="tree-circle-node ct-node-3">
      <circle cx="170" cy="120" r="26" fill="url(#nodeGrad)" filter="url(#nodeShadow)"/>
      <text x="170" y="126" text-anchor="middle"
        fill="#ffffff" font-size="15" font-weight="800"
        font-family="DM Sans,sans-serif"
        stroke="#3b6cff" stroke-width="3" paint-order="stroke">3</text>
    </g>
  `;
  canvas.appendChild(svg);
}

function updateCircleTree(canvas) {
  const wrap = canvas.querySelector('.tree-struct-wrap') || canvas;
  const svg = wrap.querySelector('.tree-struct-svg');
  if (!svg) return;

  /* Node 1: pop in when setData n1 (step 7) */
  if (treeState.n1.state === 'data') {
    const n1g = svg.querySelector('.ct-node-1');
    if (n1g && !n1g.classList.contains('ct-visible')) n1g.classList.add('ct-visible');
  }

  /* Node 2: pop in when setData n2 (step 11) */
  if (treeState.n2.state === 'data') {
    const n2g = svg.querySelector('.ct-node-2');
    if (n2g && !n2g.classList.contains('ct-visible')) n2g.classList.add('ct-visible');
  }

  /* Node 3: pop in when setData n3 (step 22) */
  if (treeState.n3.state === 'data') {
    const n3g = svg.querySelector('.ct-node-3');
    if (n3g && !n3g.classList.contains('ct-visible')) n3g.classList.add('ct-visible');
  }

  /* Line n1→n2: draw at step 18 (setLeft n1 = 0x200) */
  if (treeState.n1.left === '0x200') {
    const line = svg.querySelector('.ct-line-12');
    if (line && line.style.display === 'none') {
      const len = 80;
      line.setAttribute('stroke-dasharray', len);
      line.setAttribute('stroke-dashoffset', len);
      line.style.display = '';
      requestAnimationFrame(() => {
        line.style.transition = 'stroke-dashoffset 0.4s ease';
        line.setAttribute('stroke-dashoffset', '0');
        setTimeout(() => {
          line.removeAttribute('stroke-dasharray');
          line.removeAttribute('stroke-dashoffset');
          line.style.transition = '';
        }, 450);
      });
    }
  }

  /* Line n1→n3: draw at step 29 (setRight n1 = 0x300) */
  if (treeState.n1.right === '0x300') {
    const line = svg.querySelector('.ct-line-13');
    if (line && line.style.display === 'none') {
      const len = 80;
      line.setAttribute('stroke-dasharray', len);
      line.setAttribute('stroke-dashoffset', len);
      line.style.display = '';
      requestAnimationFrame(() => {
        line.style.transition = 'stroke-dashoffset 0.4s ease';
        line.setAttribute('stroke-dashoffset', '0');
        setTimeout(() => {
          line.removeAttribute('stroke-dasharray');
          line.removeAttribute('stroke-dashoffset');
          line.style.transition = '';
        }, 450);
      });
    }
  }
}

/* ── Init ── */
buildCodePanel();
buildProgressDots();
buildAllBoxes();

(function initTreePanel() {
  const panel = document.querySelector('.viz-tree-panel');
  if (!panel) return;

  const ph = panel.querySelector('.viz-tree-placeholder');
  if (ph) ph.style.display = 'none';

  let canvas = panel.querySelector('.tree-canvas');
  if (!canvas) {
    canvas = document.createElement('div');
    canvas.className = 'tree-canvas';
    canvas.style.cssText = 'display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:0 0 12px 0;';
    panel.appendChild(canvas);
  }

  if (!canvas.querySelector('.tree-section-label-mem')) {
    const memLabel = document.createElement('div');
    memLabel.className = 'tree-section-label-mem';
    memLabel.innerHTML = '🧠 Memory Representation';
    canvas.appendChild(memLabel);
  }

  if (!canvas.querySelector('.tree-mem-nodes')) {
    const memNodes = document.createElement('div');
    memNodes.className = 'tree-mem-nodes';
    memNodes.style.cssText = 'position:relative;width:100%;flex:1;min-height:0;';
    canvas.appendChild(memNodes);
  }

  if (!canvas.querySelector('.tree-section-divider')) {
    const divider = document.createElement('hr');
    divider.className = 'tree-section-divider';
    canvas.appendChild(divider);
  }

  if (!canvas.querySelector('.tree-section-label-tree')) {
    const treeLabel = document.createElement('div');
    treeLabel.className = 'tree-section-label-tree';
    treeLabel.innerHTML = '🌳 Tree Structure';
    canvas.appendChild(treeLabel);
  }

  if (!canvas.querySelector('.tree-struct-wrap')) {
    const treeWrap = document.createElement('div');
    treeWrap.className = 'tree-struct-wrap';
    treeWrap.style.cssText = 'flex:1;min-height:0;display:flex;align-items:flex-start;justify-content:center;padding-top:16px;';
    canvas.appendChild(treeWrap);
    buildCircleTree(treeWrap);
  }
})();

renderStep(0);