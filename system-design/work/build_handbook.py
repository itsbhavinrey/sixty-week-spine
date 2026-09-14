from pathlib import Path
import re, html, json

ROOT = Path(__file__).resolve().parent.parent
raw = (ROOT/'work/handbook.md').read_text()
parts = re.split(r'^# (.+)$', raw, flags=re.M)
chapters=[]
def inline(s):
    s=html.escape(s)
    s=re.sub(r'\[([^\]]+)\]\((https://[^)]+)\)', r'<a href="\2" target="_blank" rel="noopener noreferrer">\1 ↗</a>', s)
    s=re.sub(r'`([^`]+)`',r'<code>\1</code>',s)
    s=re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',s)
    return s
def render(body, cid):
    lines=body.strip().splitlines(); result=[]; i=0; subs=[]
    while i<len(lines):
        line=lines[i]
        if not line.strip(): i+=1; continue
        if line.startswith('## '):
            title=line[3:]; sid=cid+'-'+re.sub(r'[^a-z0-9]+','-',title.lower()).strip('-')
            subs.append((sid,title))
            if len(subs)>1: result.append('</section>')
            result.append(f'<section class="concept" id="{sid}"><div class="concept-heading"><h2>{inline(title)}</h2><button class="ask" type="button" aria-label="Ask a tutor about {html.escape(title,quote=True)}">Ask a tutor ↗</button></div>')
            i+=1; continue
        if line.startswith('```'):
            kind=line[3:]; code=[]; i+=1
            while i<len(lines) and not lines[i].startswith('```'): code.append(lines[i]); i+=1
            result.append('<pre class="'+('diagram' if kind=='diagram' else '')+'"><code>'+html.escape('\n'.join(code))+'</code></pre>'); i+=1; continue
        if line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].startswith('|'):
                row=[x.strip() for x in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r'[-: ]+',x) for x in row): rows.append(row)
                i+=1
            result.append('<div class="table-wrap"><table><thead><tr>'+''.join('<th scope="col">'+inline(x)+'</th>' for x in rows[0])+'</tr></thead><tbody>')
            for row in rows[1:]: result.append('<tr>'+''.join('<td>'+inline(x)+'</td>' for x in row)+'</tr>')
            result.append('</tbody></table></div>'); continue
        if re.match(r'^(\d+\. |\- )',line):
            ordered=bool(re.match(r'^\d+\.',line)); tag='ol' if ordered else 'ul'; result.append('<'+tag+'>')
            while i<len(lines) and re.match(r'^(\d+\. |\- )',lines[i]):
                result.append('<li>'+inline(re.sub(r'^(\d+\. |\- )','',lines[i]))+'</li>'); i+=1
            result.append('</'+tag+'>'); continue
        p=[line]; i+=1
        while i<len(lines) and lines[i].strip() and not re.match(r'^(## |```|\||\d+\. |\- )',lines[i]): p.append(lines[i]); i+=1
        result.append('<p>'+inline(' '.join(p))+'</p>')
    if subs: result.append('</section>')
    return '\n'.join(result),subs
for i in range(1,len(parts),2):
    cid,title,subtitle=map(str.strip,parts[i].split('|'))
    body,subs=render(parts[i+1],cid)
    chapters.append(dict(id=cid,title=title,subtitle=subtitle,body=body,subs=subs,words=len(parts[i+1].split())))
nav=''.join(f'<a class="chapter-link" href="#{c["id"]}" data-chapter="{c["id"]}"><span>{html.escape(c["title"])}</span><span class="nav-state" aria-hidden="true">○</span></a>' for c in chapters)
articles=[]
for index,c in enumerate(chapters):
    jump=''.join(f'<a href="#{sid}">{html.escape(title)}</a>' for sid,title in c['subs'])
    prev=chapters[index-1] if index else None; nxt=chapters[index+1] if index+1<len(chapters) else None
    pager=('<a href="#'+prev['id']+'">← '+html.escape(prev['title'])+'</a>' if prev else '<span></span>')+('<a href="#'+nxt['id']+'">'+html.escape(nxt['title'])+' →</a>' if nxt else '<a href="#start">Back to start ↑</a>')
    articles.append(f'''<article id="{c['id']}" class="chapter" tabindex="-1">
    <header class="chapter-head"><div class="eyebrow">THE SYSTEM DESIGN HANDBOOK · {index+1:02d} / {len(chapters):02d}</div><h1>{html.escape(c['title'])}</h1><p class="subtitle">{html.escape(c['subtitle'])}</p><div class="chapter-meta"><span>{c['words']:,} words</span><span>Beginner → interview foundations</span></div></header>
    <details class="chapter-map"><summary>In this chapter · {len(c['subs'])} sections</summary><div>{jump}</div></details>
    {c['body']}
    <aside class="learning"><h2>Your reading checkpoint</h2><p>Track exposure separately from understanding. Nothing is marked automatically.</p><label for="status-{c['id']}">Chapter status</label><select class="status" id="status-{c['id']}" data-id="{c['id']}"><option value="new">Not started</option><option value="reading">Reading</option><option value="read">Read</option><option value="explain">Can explain</option></select><label for="notes-{c['id']}">Questions, examples, or things to revisit</label><textarea class="notes" id="notes-{c['id']}" data-id="{c['id']}" rows="5" placeholder="What is unclear? What could you explain without looking?"></textarea><button class="checkpoint" data-id="{c['id']}" type="button">Copy chapter checkpoint</button></aside>
    <nav class="pager" aria-label="Adjacent chapters">{pager}</nav></article>''')
template=(ROOT/'work/shell.html').read_text()
book=template.replace('%%NAV%%',nav).replace('%%ARTICLES%%','\n'.join(articles)).replace('%%WORDS%%',f'{sum(c["words"] for c in chapters):,}').replace('%%COUNT%%',str(len(chapters)))
(ROOT/'outputs/system-design-handbook.html').write_text(book)
print(json.dumps({'chapters':len(chapters),'sections':sum(len(c['subs']) for c in chapters),'words':sum(c['words'] for c in chapters),'bytes':len(book.encode())}))
