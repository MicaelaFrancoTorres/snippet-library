'use client'
import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/vs2015.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)

function normalizeLanguage(language: string): string | null {
  const map: Record<string, string> = {
    javascript: 'javascript',
    typescript: 'typescript',
    react: 'typescript',
    css: 'css',
    html: 'xml',
    python: 'python',
  }
  const key = language.trim().toLowerCase()
  return map[key] ?? null
}

interface CodeHighlightProps {
  code: string
  language: string
}

export function CodeHighlight({ code, language }: CodeHighlightProps) {
  const codeRef = useRef<HTMLElement>(null)
  const normalized = normalizeLanguage(language)

  useEffect(() => {
    if (codeRef.current && normalized) {
      codeRef.current.removeAttribute('data-highlighted')
      hljs.highlightElement(codeRef.current)
    }
  }, [code, normalized])

  return (
    <pre className="rounded-lg overflow-x-auto text-sm bg-[#1e1e1e] p-4">
      <code ref={codeRef} className={normalized ? `language-${normalized}` : ''}>
        {code}
      </code>
    </pre>
  )
}