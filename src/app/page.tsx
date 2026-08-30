import SnippetForm from '@/components/snippets/SnippetForm'
import SearchBar from '@/components/snippets/SearchBar'
import SnippetList from '@/components/snippets/SnippetList'

export default function Home() {
  return (
      <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">📚 Snippet Library</h1>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">Formulario para agregar un nuevo snippet</h2>
          <SnippetForm />
        </section>
        <section aria-labelledby="search-heading">
          <h2 id="search-heading" className="sr-only">Buscar snippets guardados</h2>
          <SearchBar />
        </section>
        <section aria-labelledby="list-heading">
          <h2 id="list-heading" className="sr-only">Lista de snippets guardados</h2>
          <SnippetList />
        </section>
      </div>
    </main>
  )
}