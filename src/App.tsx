import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import SearchBar from './components/SearchBar'
import UserInfo from './components/UserInfo'
import AddUser from './components/AddUser'
import { Read } from './crud'

export type User = {
  id: string,
  name: string,
  username: string,
  email: string,
  phone: string
}

function App() {
  const [ userData, setUserData ] = useState<User[]>([])
  const [ searchQuery, setSearchQuery ] = useState<string>("")

  useEffect(() => {
    const unsubscribe = Read((users) => {
      setUserData(users)
    })
    return () => unsubscribe()
  }, [])

  const queriedUsers = userData.filter((user: any) => {
    const q = searchQuery.toLowerCase()
    return user.name.toLowerCase().includes(q) || user.username.toLowerCase().includes(q)
  })

  return (
    <div className="App">
      <Board>
        <h1>User List</h1>
        <SearchBar setSearchQuery={setSearchQuery} />
        <AddUser />
        <div className="user-list-area">
          { queriedUsers.length === 0 ? (
            <h2>Tidak ada user</h2>
          ) : (
            queriedUsers.map((user: User) => (
              <UserInfo key={user.id} user={user} />
            ))
          )}
        </div>
      </Board>
    </div>
  )
}

export default App
