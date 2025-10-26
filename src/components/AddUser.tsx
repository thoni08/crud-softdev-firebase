import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import { Create } from "../crud";

export default function AddUser() {
  const [isAdding, setIsAdding] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const entries = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>

    const data = {
      name: String(entries.name ?? ""),
      username: String(entries.username ?? ""),
      email: String(entries.email ?? ""),
      phone: String(entries.phone ?? "")
    }

    await Create(data)
  }

  useEffect(() => {
    if (isAdding) setIsAdding(false)
  }, [submitClicked])

  return (
    <div className="add-user">
      <button onClick={() => setIsAdding(prev => !prev)}>
        <span>Add User</span>
      </button>
      {isAdding && <UserInfo isAdding={isAdding} handleSubmit={handleSubmit} setSubmitClicked={setSubmitClicked} />}
    </div>
  )
}