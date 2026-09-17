import os, sys, glob
from jinja2 import Environment, FileSystemLoader
sys.path.insert(0, os.path.dirname(__file__))
import content as C

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
env = Environment(loader=FileSystemLoader(os.path.join(here, "templates")), autoescape=False)
ctx = {k: getattr(C, k) for k in dir(C) if k.isupper()}

os.makedirs(os.path.join(root, "styles"), exist_ok=True)
pages = []
for tpl in sorted(glob.glob(os.path.join(here, "templates", "*.html"))):
    name = os.path.basename(tpl)
    if name.startswith("_"):
        continue
    html = env.get_template(name).render(**ctx)
    out = os.path.join(root, "styles", name)
    with open(out, "w") as f:
        f.write(html)
    title = html.split("<title>")[1].split("</title>")[0] if "<title>" in html else name
    pages.append((name, title))
    print("built", name, len(html)//1024, "KB")

# gallery index
index = env.get_template("_index.html").render(pages=pages, **ctx)
with open(os.path.join(root, "styles", "index.html"), "w") as f:
    f.write(index)
print("index with", len(pages), "pages")
