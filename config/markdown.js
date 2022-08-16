const hljs = require('highlight.js')
const clipboard = require('clipboard')

hljs.configure({
  classPrefix: 'highlight__'
})
hljs.registerLanguage('vue', () => hljs.getLanguage('html'))

const getCopyBtnHTML = (html) => {
  const copyIcon = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="copy-icon">
  <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
  </svg>`

  return`<div class="copy-icon-wrapper m-2"><button class="copy-btn" data-clipboard-text="hello world" title="Copy">${copyIcon}</button></div>`
}

const markdown = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  breaks: true,
  typographer: true,
  highlight(str, lang) {
    let copyBtnHTML = ""
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="highlight" data-language="${lang}">${copyBtnHTML}<code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`
      } finally {
        // No syntax highlighting
      }
    }

    return `<pre class="highlight">${copyBtnHTML}<code>${markdown.utils.escapeHtml(str)}</code></pre>`
  }
})
  .use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkSymbol: '&nbsp;#',
    permalinkSpace: false
  })
  .use(require('markdown-it-external-links'), {
    externalClassName: null,
    externalRel: 'noopener noreferrer',
    externalTarget: '_blank'
  })
  .use(require('markdown-it-task-lists'), {
    label: true
  })
  .use(require('markdown-it-container'), 'aside', {
    render(tokens, index) {
      return tokens[index].nesting === 1 ? '<post-aside>' : '</post-aside>'
    }
  })
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-ins'))
  .use(function(md) {
    // Plugin to switch images for custom component
    md.renderer.rules.image = function(tokens, index) {
      const token = tokens[index]
      const src = token.attrs[token.attrIndex('src')][1]
      const alt = token.attrs[token.attrIndex('alt')][1]

      // Render lazy image component
      if (token.attrIndex('title') !== -1) {
        // Use the title as the image width
        const title = token.attrs[token.attrIndex('title')][1]
        return `<figure class="align-items-center d-flex flex-column"><image src="${src}" alt="${alt}" loading="lazy"/><figcaption class="mt-2 small text-black-50">${title}</figcaption></figure>`
      } else {
        return `<figure class="align-items-center d-flex flex-column"><image src="${src}" alt="${alt}" loading="lazy"/></figure>`
      }
    }
  })

// Remove wrapper paragraph, from markdown-it inline image
const replaceInlineImages = html => {
  return html.replace(/<p>(<lazy-image[^>]*>)<\/p>/g, '$1')
}

export default function(body) {
  return replaceInlineImages(markdown.render(body))
}
