from pathlib import Path

import frontmatter

workspath = Path(__file__).parent / "works"
print(workspath)

post_infos = []
for file in workspath.glob("*.md"):
    print(file.stat())

    with file.open('r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    post_infos.append([post, file.stat().st_birthtime])

    # post['display-order'] = 1000

    # print(frontmatter.dumps(post))

    # with file.open('w', encoding='utf-8') as f:
    #     f.write(frontmatter.dumps(post))


post_infos.sort(key=lambda x: x[1])

for i, post_info in zip(range(len(post_infos)), post_infos):
    print(i * 50)
    print(post_info)