'use client'
import { useState } from 'react'
import { useSnippetStore } from '@/lib/store'

export default function SnippetForm() {
  const addSnippet = useSnippetStore((state) => state.addSnippet)
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('JavaScript')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [tags, setTags] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim() || !code.trim()) {
      setError('Completá título y código antes de guardar.')
      return
    }

    setError('')
    addSnippet({
      title,
      language,
      description,
      code,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      favorite: false,
    })

    setTitle('')
    setLanguage('JavaScript')
    setDescription('')
    setCode('')
    setTags('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Nuevo snippet</h2>

      {/* Mensaje de error accesible: aria-live avisa a lectores de pantalla
          apenas cambia el contenido, sin que el usuario tenga que buscarlo */}
      {error && (
        <p role="alert" aria-live="assertive" className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <label htmlFor="title" className="sr-only">Título</label>
      <input
        id="title"
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-required="true"
        aria-describedby={error ? 'form-error' : undefined}
        className="bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none"
      />

      <label htmlFor="language" className="sr-only">Lenguaje</label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-gray-800 rounded-lg p-3 text-white outline-none"
      >
        <option>JavaScript</option>
        <option>TypeScript</option>
        <option>React</option>
        <option>CSS</option>
        <option>HTML</option>
        <option>Python</option>
        <option>Otro</option>
      </select>

      <label htmlFor="description" className="sr-only">Descripción</label>
      <input
        id="description"
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none"
      />

      <label htmlFor="code" className="sr-only">Código</label>
      <textarea
        id="code"
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={5}
        aria-required="true"
        aria-describedby={error ? 'form-error' : undefined}
        className="bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none font-mono"
      />

      <label htmlFor="tags" className="sr-only">Etiquetas</label>
      <input
        id="tags"
        type="text"
        placeholder="Etiquetas (separadas por coma)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 outline-none"
      />

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 rounded-lg p-3 font-semibold transition-colors"
      >
        Guardar snippet
      </button>
    </form>
  )
}