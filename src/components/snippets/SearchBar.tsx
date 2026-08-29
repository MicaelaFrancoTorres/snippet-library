'use client'

import { useSnippetStore } from '@/lib/store'

export default function SearchBar() {
  const searchQuery = useSnippetStore((state) => state.searchQuery)
  const setSearchQuery = useSnippetStore((state) => state.setSearchQuery)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="search" className="sr-only">
        Buscar snippets
      </label>
      <input
        id="search"
        type="text"
        placeholder="Buscar por título, descripción o código..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none"
      />
    </div>
  )
}