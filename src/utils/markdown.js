import DOMPurify from 'dompurify'
import { marked } from 'marked'

marked.setOptions({
  gfm: true,
  breaks: true,
})

export function renderAssistantMessage(content) {
  const markdown = typeof content === 'string' ? content : ''
  const html = marked.parse(markdown)

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  })
}
