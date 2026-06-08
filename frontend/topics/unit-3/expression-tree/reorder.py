import re

with open("expression-tree.html", "r") as f:
    content = f.read()

# We split the content into sections
sections = []
pattern = re.compile(r'(<!-- ── SECTION \d+: .*? ── -->\s*<section class="lesson-section">.*?</section>)', re.DOTALL)
parts = pattern.split(content)

section_map = {}
for i in range(1, len(parts), 2):
    sec_content = parts[i]
    if "SECTION 09: Expression Tree vs Binary Tree" in sec_content:
        section_map["vs"] = sec_content
    elif "SECTION 10: Advantages" in sec_content:
        section_map["adv"] = sec_content
    elif "SECTION 11: Limitations" in sec_content:
        section_map["lim"] = sec_content
    elif "SECTION 12: Applications" in sec_content:
        section_map["app"] = sec_content
    elif "SECTION 13: Implementation in C" in sec_content:
        section_map["impl"] = sec_content

def change_num(text, old_num, new_num_str):
    # Change comment: e.g., <!-- ── SECTION 13: Implementation in C ── --> -> <!-- ── SECTION 09: ...
    text = re.sub(r'SECTION \d+:', f'SECTION {new_num_str}:', text)
    # Change span
    text = re.sub(r'<span class="section-number">\d+</span>', f'<span class="section-number">{new_num_str}</span>', text)
    return text

impl = change_num(section_map["impl"], 13, "09")
vs = change_num(section_map["vs"], 9, "10")
adv = change_num(section_map["adv"], 10, "11")
lim = change_num(section_map["lim"], 11, "12")
app = change_num(section_map["app"], 12, "13")

new_content = ""
for i in range(len(parts)):
    if i % 2 == 1:
        sec_content = parts[i]
        if "SECTION 09: Expression Tree vs Binary Tree" in sec_content:
            new_content += impl
        elif "SECTION 10: Advantages" in sec_content:
            new_content += vs
        elif "SECTION 11: Limitations" in sec_content:
            new_content += adv
        elif "SECTION 12: Applications" in sec_content:
            new_content += lim
        elif "SECTION 13: Implementation in C" in sec_content:
            new_content += app
        else:
            new_content += sec_content
    else:
        new_content += parts[i]

with open("expression-tree.html", "w") as f:
    f.write(new_content)

print("Expression Tree Reordered successfully")
