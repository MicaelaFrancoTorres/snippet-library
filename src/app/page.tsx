import SnippetForm from '@/components/snippets/SnippetForm'
import SearchBar from '@/components/snippets/SearchBar'
import SnippetList from '@/components/snippets/SnippetList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">📚 Snippet Library</h1>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <SnippetForm />
        <SearchBar />
        <SnippetList />
      </div>
    </main>
  )
}