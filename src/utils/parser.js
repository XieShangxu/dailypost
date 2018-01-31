const supportTags = [
  'a', 'abbr', 'b', 'blockquote', 'br', 'code', 'col', 'colgroup', 'dd', 'del', 'div', 'dl', 'dt', 'em', 'fieldset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'ins', 'label', 'legend', 'li', 'ol', 'p', 'q', 'span', 'strong', 'sub', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'
]

const styleList = {
  div: 'font-size:15px;line-height:1.6;',
  p: 'font-size:15px;line-height:1.6;margin-bottom:1rem;',
  li: 'font-size:15px;line-height:1.6;margin-bottom:0.8rem;',
  h1: 'font-size:20px;line-height:1.6;margin:0.4rem 0;',
  h2: 'font-size:18px;line-height:1.6;margin:0.4rem 0;',
  h3: 'font-size:16px;line-height:1.6;margin:0.4rem 0;',
  h4: 'font-size:15px;line-height:1.6;margin:0.3rem 0;',
  pre: 'white-space:pre;background-color:#f8f8f8;line-height:1.6;padding:0.4rem;margin:0.4rem 0;overflow-x:auto;-webkit-overflow-scrolling: touch;',
  code: 'font-family:Menlo,Monaco,Consolas,Courier New,monospace;font-size:12px;padding:.26rem .53em;color:#4e5980;background-color:#f8f8f8;border-radius:2px;line-height:1.6;',
  blockquote: 'margin:1em 0;border-left:4px solid #ddd;padding:0.4rem 0.6rem;color:#666;background-color:#f8f8f8;',
  img: 'display:block;width:100%;margin:1rem 0;',
  hr: 'margin:2rem 0;height:0;border-bottom:1px solid #999;'
}

export function parser(html) {
  const reg = new RegExp('<(/?([a-zA-Z1-9]+)) ?([^>]*)>', 'ig')
  const parsedHtml = html.replace(reg, ($0, $1, $2, $3) => {
    const tag = $1.replace(/\//ig, '')
    if (supportTags.indexOf(tag) >= 0) {
      if (tag === 'img') {
        const src = $0.match(/ src="([^"]+)"/ig)
        if ($1.indexOf('/') >= 0) {
          return `<${$1}>`
        } else {
          return `<${$1}${src} style="${styleList[tag] || ''}">`
        }
      }
      if ($1.indexOf('/') >= 0) {
        return `<${$1}>`
      } else {
        $3 = $3.replace(/style="[^"]*"/ig, '')
        return `<${$1} ${$3} style="${styleList[tag] || ''}">`
      }
    } else if ($1.indexOf('/') >= 0) {
      return `<${$1.replace(/[a-zA-Z]+/ig, 'div')}>`
    } else {
      return `<${$1.replace(/[a-zA-Z]+/ig, 'div')} style="${styleList[tag] || ''}">`
    }
  })
  return parsedHtml
}
