import re

with open("/Users/suyesh/Desktop/Family Doc's/idsnext/frontend/topics/doubly-linked-list/doubly-visualize.js", "r") as f:
    content = f.read()

# 1. Update CODE_TEMPLATES['insert-middle']
new_template = """  'insert-middle': [
    { line: 0, html: '<span class="c-kw">#include</span> &lt;stdio.h&gt;' },
    { line: 0, html: '<span class="c-kw">#include</span> &lt;stdlib.h&gt;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-kw">struct</span> node {' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-type">int</span> data;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* prev;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* next;' },
    { line: 0, html: '};' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-kw">struct</span> node* head = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '<span class="c-kw">struct</span> node* tail = <span class="c-kw">NULL</span>;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '<span class="c-type">void</span> <span class="c-fn">insertAtMiddle</span>(<span class="c-type">int</span> data, <span class="c-type">int</span> pos) {' },
    { line: 1, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* newnode = (<span class="c-kw">struct</span> node*)<span class="c-fn">malloc</span>(<span class="c-kw">sizeof</span>(<span class="c-kw">struct</span> node));' },
    { line: 2, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;data = data;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">if</span> (pos == 1) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;prev = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;next = head;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-kw">if</span> (head != <span class="c-kw">NULL</span>)' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;head-&gt;prev = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-kw">else</span>' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tail = newnode;' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;head = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-kw">return</span>;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 3, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">struct</span> node* temp = head;' },
    { line: 4, cls: 'viz-highlightable', html: '&nbsp;&nbsp;<span class="c-kw">for</span> (<span class="c-type">int</span> i = 1; i &lt; pos - 1 &amp;&amp; temp != <span class="c-kw">NULL</span>; i++) {' },
    { line: 5, cls: 'viz-highlightable', html: '&nbsp;&nbsp;&nbsp;&nbsp;temp = temp-&gt;next;' },
    { line: 6, cls: 'viz-highlightable', html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">if</span> (temp == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">printf</span>(<span class="c-str">"Invalid position\\n"</span>);' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-fn">free</span>(newnode);' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-kw">return</span>;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 0, html: '&nbsp;&nbsp;<span class="c-kw">if</span> (temp-&gt;next == <span class="c-kw">NULL</span>) {' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;next = <span class="c-kw">NULL</span>;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;newnode-&gt;prev = temp;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;temp-&gt;next = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;tail = newnode;' },
    { line: 0, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-kw">return</span>;' },
    { line: 0, html: '&nbsp;&nbsp;}' },
    { line: 0, cls: 'viz-code-spacer', html: '&nbsp;' },
    { line: 7, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;next = temp-&gt;next;' },
    { line: 8, cls: 'viz-highlightable', html: '&nbsp;&nbsp;newnode-&gt;prev = temp;' },
    { line: 9, cls: 'viz-highlightable', html: '&nbsp;&nbsp;temp-&gt;next-&gt;prev = newnode;' },
    { line: 10, cls: 'viz-highlightable', html: '&nbsp;&nbsp;temp-&gt;next = newnode;' },
    { line: 0, html: '}' }
  ]"""
content = re.sub(r"  'insert-middle': \[\s*\{ line: 0, html: '<span class=\"c-kw\">struct</span> node \{'.*?  \]", new_template, content, flags=re.DOTALL)

# 2. Fix showTempPointerOnNode
new_show = """function showTempPointerOnNode(nodeIndex) {
  var tp = VIZ.el.tempPointer;
  if (!tp) return;
  tp.style.display = 'flex';
  tp.style.transition = 'left 0.3s ease, top 0.3s ease, opacity 0.25s ease';

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
      var topY = nr.top - cr.top - 20; // 20px above node
      
      tp.style.left      = cx + 'px';
      tp.style.top       = topY + 'px';
      tp.style.bottom    = 'auto';
      tp.style.transform = 'translate(-50%, -100%)';
      tp.style.opacity   = '1';
      
      if (VIZ.el.tempAddr && PTR.nodeList[nodeIndex]) {
        VIZ.el.tempAddr.textContent = PTR.nodeList[nodeIndex].address;
      }
    });
  });
}"""

# Replace showTempPointerOnNode
content = re.sub(r"function showTempPointerOnNode\(nodeIndex\) \{.*?\}(?=\n\nfunction hideTempPointer)", new_show, content, flags=re.DOTALL)

# 3. Remove hideTempPointer from animMid_initTemp
content = re.sub(r"function animMid_initTemp\(\) \{\s*buildList\(VIZ\.initialList, false, 0\);\s*hideCurve\(\);\s*hideLoopBox\(\);\s*hideTempPointer\(\);", 
                 "function animMid_initTemp() {\n  buildList(VIZ.initialList, false, 0);\n  hideCurve();\n  hideLoopBox();", content)

# 4. In animMid_link1 to link4, remove hideLoopBox calls if any (actually user said keep loop box but sync temp). We'll leave link animations as they are since they follow the end of traversal.
# But let's remove any stray hideTempPointer calls in the anim functions.
content = content.replace("hideTempPointer();", "")

# We still want to hideTempPointer() during reset! Let's make sure vizReset() hides it.
if "function vizReset() {" in content:
    content = content.replace("function vizReset() {\n", "function vizReset() {\n  if (VIZ.el.tempPointer) {\n    VIZ.el.tempPointer.style.display = 'none';\n    VIZ.el.tempPointer.style.opacity = '0';\n  }\n")

with open("/Users/suyesh/Desktop/Family Doc's/idsnext/frontend/topics/doubly-linked-list/doubly-visualize.js", "w") as f:
    f.write(content)
