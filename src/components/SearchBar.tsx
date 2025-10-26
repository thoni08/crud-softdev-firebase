export default function SearchBar({setSearchQuery}: ({setSearchQuery: (query: string) => void})) {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search users..." onChange={(e) => setSearchQuery(e.target.value)} />
    </div>
  )
}