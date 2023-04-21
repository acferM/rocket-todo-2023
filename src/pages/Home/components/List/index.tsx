import { Task } from '../..'
import { ListItem } from '../ListItem'

import clipboardImg from "../../../../assets/clipboard.svg"

import styles from './List.module.css'

interface ListProps {
  tasks: Task[] 
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function List({ tasks, onToggleTask, onDeleteTask }: ListProps) {
   if (!tasks.length) {
    return (
      <div className={styles.empty_container}>
        <img src={clipboardImg} />

        <div className={styles.empty_texts}>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>

      </div>
    )
  }

  return (
    <ul className={styles.list_container}>
      {tasks.map(task => {
        return (
          <ListItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
        )
      })}
   </ul>
  )
}
