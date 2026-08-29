'use client'

interface FilterBarProps {
  filterFav: boolean
  setFilterFav: (v: boolean) => void
  filterTag: string
  setFilterTag: (v: string) => void
  filterLang: string
  setFilterLang: (v: string) => void
  uniqueLangs: string[]
}

export function FilterBar({
  filterFav,
  setFilterFav,
  filterTag,
  setFilterTag,
  filterLang,
  setFilterLang,
  uniqueLangs,
}: FilterBarProps) {
  return (
    <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex flex-wrap gap-4 items-center">
      <span className="font-semibold text-gray-400 text-sm">Filtrar:</span>

      <button
        onClick={() => setFilterFav(!filterFav)}
        aria-pressed={filterFav}
        aria-label={filterFav ? 'Mostrando solo favoritos' : 'Mostrando todos los snippets'}
        className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${
          filterFav
            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
        }`}
      >
        {filterFav ? '★ Favoritos' : '☆ Todos'}
      </button>

      <label htmlFor="filterTag" className="sr-only">
        Filtrar por etiqueta
      </label>
      <input
        id="filterTag"
        type="text"
        placeholder="Buscar #etiqueta..."
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-500"
      />

      <label htmlFor="filterLang" className="sr-only">
        Filtrar por lenguaje
      </label>
      <select
        id="filterLang"
        value={filterLang}
        onChange={(e) => setFilterLang(e.target.value)}
        className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-500"
      >
        <option value="">Todos los lenguajes</option>
        {uniqueLangs.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  )
}