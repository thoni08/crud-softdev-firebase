import { useState } from "react";
import { CheckIcon, MailIcon, PhoneIcon, UserIcon, PencilIcon, TrashIcon } from "./icons";
import type { User } from "../App";
import { Delete, Update } from "../crud";

type Props = {
  user?: User,
  isAdding?: boolean,
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  setSubmitClicked?: (value: boolean) => void
}

export default function UserInfo({ ...props }: Props) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)

    const formData = new FormData(e.currentTarget)
    const entries = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>

    const data = {
      id: String(props.user?.id),
      name: String(entries.name ?? ""),
      username: String(entries.username ?? ""),
      email: String(entries.email ?? ""),
      phone: String(entries.phone ?? "")
    }

    await Update(data)
    setIsUpdating(false)
  }

  return (
    <form className={"user-info" + (isUpdating ? ' updating' : '')} onSubmit={props.isAdding ? props.handleSubmit : handleUpdate}>
      <div className="user-content">
        <div className="user-header">
          { props.isAdding || isUpdating ? (
            <input type="text" name="name" placeholder="Insert Full Name" defaultValue={props.user?.name} required />
          ) : (
            <h2 className="user-name">{props.user?.name}</h2>
          )}
        </div>
        <div className="user-contact">
          <div className="user-username">
            <UserIcon width={20} height={20} />
            { props.isAdding || isUpdating ? (
              <input type="text" name="username" placeholder="Insert Username" defaultValue={props.user?.username} required />
            ) : (
              <span>@{props.user?.username}</span>
            )}
          </div>
          <div className="user-email">
            <MailIcon width={20} height={20} />
            {props.isAdding || isUpdating ? (
              <input type="text" name="email" placeholder="Insert Email" defaultValue={props.user?.email} required />
            ) : (
              <span>{props.user?.email}</span>
            )}
          </div>
          <div className="user-phone">
            <PhoneIcon width={20} height={20} />
            {props.isAdding || isUpdating ? (
              <input type="text" name="phone" placeholder="Insert Phone" defaultValue={props.user?.phone} required />
            ) : (
              <span>{props.user?.phone}</span>
            )}
          </div>
        </div>
      </div>
      { props.isAdding || isUpdating ? (
        <div className="submit-user-btn">
          <button type="submit" onClick={() => {
            if (props.isAdding) props.setSubmitClicked?.(true)
          }}><CheckIcon width={30} height={30} /></button>
        </div>
      ) : (
        <div className="user-btn">
          <button type="button" onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsUpdating(true)
          }}><PencilIcon width={30} height={30} /></button>
          <button type="button" onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (!props.user?.id) return
            Delete({ id: props.user.id })
          }}><TrashIcon width={30} height={30} /></button>
        </div>
      )}
    </form>
  )
}