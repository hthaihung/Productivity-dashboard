import DOMPurify from "isomorphic-dompurify"

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "u", "p", "br", "ul", "ol", "li", "a", "code", "pre"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
  })
}

export function sanitizeText(text: string): string {
  return text.replace(/[<>]/g, "")
}
