import { db } from './firebase'
import { addDoc, collection, onSnapshot, orderBy, query, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import type { User } from './App'

export async function Create(data: { name: string; username: string; email: string; phone: string }) {
  try {
    await addDoc(collection(db, 'users'), {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      timestamp: new Date()
    })
  } catch (error) {
    console.error("Error adding user:", error)
  }
}

export function Read(callback: (users: User[]) => void) {
  const q = query(collection(db, 'users'), orderBy('timestamp', 'desc'))
  try {
    return onSnapshot(q, (snapshot) => {
      const usersArray: User[] = []
      snapshot.forEach((doc) => {
        usersArray.push({ id: doc.id, ...(doc.data() as Omit<User,'id'>) })
      })
      callback(usersArray)
    }, (error) => {
      console.error("Error reading users:", error)
    })
  } catch (error) {
    console.error("Error setting up snapshot listener:", error)
    return () => {}
  }
}

export async function Update({...data}: User) {
  try {
    const userRef = doc(db, 'users', data.id)
    await updateDoc(userRef, {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      timestamp: new Date()
    })
  } catch (error) {
    console.error("Error updating user: ", error)
  }
}

export async function Delete({id}: {id: string}) {
  try {
    const userRef = doc(db, 'users', id)
    await deleteDoc(userRef)
  } catch (error) {
    console.error("Error deleting user: ", error)
  }
}