import re

with open("binary-search-tree.html", "r") as f:
    content = f.read()

# We need to split the file by sections
# The sections are wrapped in <!-- ── SECTION XX: Name ── --> ... </section>

sections = []
pattern = re.compile(r'(<!-- ── SECTION \d+: .*? ── -->\s*<section class="lesson-section">.*?</section>)', re.DOTALL)
parts = pattern.split(content)

# parts will have non-matching text (pre/post) interleaved with matching text
# We want to find the ones that match section 08 through 13

section_map = {}
for i in range(1, len(parts), 2):
    sec_content = parts[i]
    if "SECTION 08: Time Complexity" in sec_content:
        section_map["time"] = sec_content
    elif "SECTION 09: BST vs Binary Tree" in sec_content:
        section_map["vs"] = sec_content
    elif "SECTION 10: Advantages" in sec_content:
        section_map["adv"] = sec_content
    elif "SECTION 11: Limitations" in sec_content:
        section_map["lim"] = sec_content
    elif "SECTION 12: Applications" in sec_content:
        section_map["app"] = sec_content
    elif "SECTION 13: Implementation" in sec_content:
        section_map["impl"] = sec_content

# We need to change the section numbers inside these blocks
def change_num(text, old_comment_num, new_num_str):
    # Change comment
    text = re.sub(r'SECTION \d+:', f'SECTION {new_num_str}:', text)
    # Change span
    text = re.sub(r'<span class="section-number">\d+</span>', f'<span class="section-number">{new_num_str}</span>', text)
    return text

# Order should be:
# 08: impl
# 09: time
# 10: vs
# 11: adv
# 12: lim
# 13: app

impl = change_num(section_map["impl"], 13, "08")
time = change_num(section_map["time"], 8, "09")
time = time.replace("Time Complexity", "Time Complexity Analysis", 1) # Wait, user asked to change "Time Complexity" to "Time Complexity Analysis"? Let's just change the title.
time = re.sub(r'<h2 class="section-title">Time Complexity</h2>', '<h2 class="section-title">Time Complexity Analysis</h2>', time)

vs = change_num(section_map["vs"], 9, "10")
adv = change_num(section_map["adv"], 10, "11")
lim = change_num(section_map["lim"], 11, "12")
app = change_num(section_map["app"], 12, "13")

# Now reassemble
new_content = ""
for i in range(len(parts)):
    if i % 2 == 1:
        sec_content = parts[i]
        if "SECTION 08: Time Complexity" in sec_content:
            new_content += impl
        elif "SECTION 09: BST vs Binary Tree" in sec_content:
            new_content += time
        elif "SECTION 10: Advantages" in sec_content:
            new_content += vs
        elif "SECTION 11: Limitations" in sec_content:
            new_content += adv
        elif "SECTION 12: Applications" in sec_content:
            new_content += lim
        elif "SECTION 13: Implementation" in sec_content:
            new_content += app
        else:
            new_content += sec_content
    else:
        new_content += parts[i]

with open("binary-search-tree.html", "w") as f:
    f.write(new_content)

print("BST Reordered successfully")
