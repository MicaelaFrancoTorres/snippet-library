'use client'

import { useState } from 'react'
import { useSnippetStore } from '@/lib/store'
import { Trash2, Star, Copy, Check } from 'lucide-react'
import { CodeHighlight } from './CodeHighlight'
import { FilterBar } from './FilterBar'

export default function SnippetList() {
  const snippets = useSnippetStore((state) => state.snippets)
  const searchQuery = useSnippetStore((state) => state.searchQuery)
  const deleteSnippet = useSnippetStore((state) => state.deleteSnippet)
  const toggleFavorite = useSnippetStore((state) => state.toggleFavorite)

  const [filterLang, setFilterLang] = useState('')
  const [filterFav, setFilterFav] = useState(false)
  const [filterTag, setFilterTag] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const uniqueLangs = Array.from(new Set(snippets.map((s) => s.language)))

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Error al copiar:', error)
    }
  }

  const filteredSnippets = snippets.filter((snippet) => {
    const matchLang = filterLang ? snippet.language === filterLang : true
    const matchFav = filterFav ? snippet.favorite === true : true
    const matchTag = filterTag
      ? snippet.tags.some((tag) => tag.toLowerCase().includes(filterTag.toLowerCase()))
      : true
    const q = searchQuery.toLowerCase()
    const matchSearch =
      snippet.title.toLowerCase().includes(q) ||
      snippet.description.toLowerCase().includes(q) ||
      snippet.code.toLowerCase().includes(q)
    return matchLang && matchFav && matchTag && matchSearch
  })

  const filterBarProps = {
    filterFav,
    setFilterFav,
    filterTag,
    setFilterTag,
    filterLang,
    setFilterLang,
    uniqueLangs,
  }

  if (filteredSnippets.length === 0) {
    return (
      <>
        <FilterBar {...filterBarProps} />
        <p role="status" aria-live="polite" className="text-center text-gray-500">
          {searchQuery ? 'No se encontraron resultados.' : 'No hay snippets todavía. ¡Agregá el primero!'}
        </p>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <FilterBar {...filterBarProps} />

      <p role="status" aria-live="polite" className="sr-only">
        Mostrando {filteredSnippets.length} de {snippets.length} snippets
      </p>

      <ul role="list" className="grid grid-cols-1 gap-4 list-none p-0 m-0">
        {filteredSnippets.map((snippet) => (
          <li
            key={snippet.id}
            role="listitem"
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-neutral-700 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">{snippet.title}</h3>
                <span className="text-xs bg-indigo-700 text-white px-2 py-1 rounded-full mt-1 inline-block">
                  {snippet.language}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(snippet.id)}
                  aria-label={snippet.favorite ? `Quitar ${snippet.title} de favoritos` : `Marcar ${snippet.title} como favorito`}
                  aria-pressed={snippet.favorite}
                  className={snippet.favorite ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}
                >
                  <Star size={18} fill={snippet.favorite ? 'currentColor' : 'none'} aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleCopy(snippet.id, snippet.code)}
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                    copiedId === snippet.id ? 'text-green-400' : 'text-gray-400 hover:text-white'
                  }`}
                  aria-label={`Copiar código de ${snippet.title}`}
                >
                  {copiedId === snippet.id ? (
                    <>
                      <Check size={16} aria-hidden="true" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <Copy size={16} aria-hidden="true" />
                  )}
                </button>
                <button
                  onClick={() => deleteSnippet(snippet.id)}
                  aria-label={`Eliminar snippet ${snippet.title}`}
                  className="text-gray-600 hover:text-red-500"
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            {snippet.description && <p className="text-gray-400 text-sm">{snippet.description}</p>}

            <CodeHighlight code={snippet.code} language={snippet.language} />

            {snippet.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full border border-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}