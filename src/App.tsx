import { useState, useEffect } from 'react'
import { db } from './firebase'
import { addDoc, collection, onSnapshot, orderBy, query, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import './App.css'

type Todo = {
  id: string
  text: string
  completed: boolean
  timestamp: any
}

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([])
  const [ input, setInput ] = useState('')

  // create todo
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input === '') {
      alert('Todo tidak boleh kosong!');
      return;
    }

    try {
      await addDoc(collection(db, 'todos'), {
        text: input,
        completed: false,
        timestamp: new Date()
      })
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  // read todos
  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let todosArray: Todo[] = []
      snapshot.forEach((doc) => {
        todosArray.push({ id: doc.id, ...(doc.data() as Omit<Todo, 'id'>) })
      })
      setTodos(todosArray)
    })
    return () => unsubscribe()
  }, [])

  // update todo
  const handleToggleComplete = async (id: string) => {
    try {
      const todoRef = doc(db, 'todos', id)
      await updateDoc(todoRef, {
        completed: !todos.find(todo => todo.id === id)?.completed
      })
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }

  // delete todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const todoRef = doc(db, 'todos', id)
      await deleteDoc(todoRef)
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span onClick={() => handleToggleComplete(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
