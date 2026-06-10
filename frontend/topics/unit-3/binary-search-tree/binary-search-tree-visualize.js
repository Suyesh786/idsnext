/* Binary Search Tree visualizer framework only. Operation logic is intentionally absent. */

var BST_CODE_LINES = [
  { cls: 'viz-code-comment', html: '<span class="c-comment">// Binary Search Tree node structure</span>' },
  { html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>' },
  { html: '<span class="c-pp">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>' },
  { cls: 'viz-code-spacer', html: '&nbsp;' },
  { html: '<span class="c-kw">struct</span> node {' },
  { html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
  { html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* left;' },
  { html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* right;' },
  { html: '};' },
  { cls: 'viz-code-spacer', html: '&nbsp;' },
  { html: '<span class="c-kw">struct</span> node* root = <span class="c-kw">NULL</span>;' },
  { cls: 'viz-code-spacer', html: '&nbsp;' },
  { cls: 'viz-code-comment', html: '<span class="c-comment">// Operation visualizations will be connected here.</span>' },
  { html: '<span class="c-kw">struct</span> node* <span class="c-fn">insert</span>(<span class="c-kw">struct</span> node* root, <span class="c-type">int</span> value);' },
  { html: '<span class="c-kw">struct</span> node* <span class="c-fn">search</span>(<span class="c-kw">struct</span> node* root, <span class="c-type">int</span> key);' },
  { html: '<span class="c-kw">struct</span> node* <span class="c-fn">deleteNode</span>(<span class="c-kw">struct</span> node* root, <span class="c-type">int</span> key);' },
  { html: '<span class="c-type">void</span> <span class="c-fn">inorder</span>(<span class="c-kw">struct</span> node* root);' }
];

function renderCodePanel() {
  var container = document.getElementById('codeLines');
  if (!container) return;

  var html = '';
  for (var i = 0; i < BST_CODE_LINES.length; i++) {
    var row = BST_CODE_LINES[i];
    var extraClass = row.cls ? ' ' + row.cls : '';
    html += '<div class="viz-code-line' + extraClass + '">';
    html += '<span class="lnum">' + (i + 1) + '</span>';
    html += '<span class="lcode">' + row.html + '</span>';
    html += '</div>';
  }
  container.innerHTML = html;
}

function renderProgressDots() {
  var dots = document.getElementById('progressDots');
  if (!dots) return;

  dots.innerHTML = '<div class="viz-dot viz-dot-active"></div>';
}

function lockPlaceholderControls() {
  var controls = document.querySelectorAll('button[data-mode], .viz-ctrl-btn');
  for (var i = 0; i < controls.length; i++) {
    controls[i].disabled = true;
    controls[i].setAttribute('aria-disabled', 'true');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderCodePanel();
  renderProgressDots();
  lockPlaceholderControls();
});
