import { useId, useRef } from "react" 
import { Trash } from "phosphor-react"
import { Task } from "../.."

import styles from './ListItem.module.css'

interface ListItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function ListItem({ task, onToggle, onDelete }: ListItemProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const id = useId()

  const { done, id: taskId, label } = task

  const isChecked = done ? styles.checked : ''

  const toggleCheckbox = () => {
    onToggle(taskId)
  }

  const handleClickSpan = () => {
    if (!inputRef.current) return

    inputRef.current.click()
  }

  const handleDelete = () => {
    onDelete(taskId)
  }

  return (
    <li className={styles.container}>
      <input type="checkbox" id={id} checked={done} onChange={toggleCheckbox} ref={inputRef} />
      <span className={isChecked} onClick={handleClickSpan} />

      <label className={isChecked} htmlFor={id}>{label}</label>

      <button type="button" onClick={handleDelete}>
        <Trash size={16} />
      </button>
    </li>
  )
}
