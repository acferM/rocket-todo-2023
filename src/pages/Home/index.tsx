import { FormEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { v4 as uuid } from 'uuid'

import { Header } from '../../components/Header'
import { List } from './components/List'

import styles from './Home.module.css'

export type Task = {
  id: string
  label: string
  done: boolean
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    const taskName = formData.get('task-name') as string

    if (!taskName) return

    const newTask: Task = {
      id: uuid(),
      label: taskName,
      done: false
    }

    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done
        }
      }

      return task
    }))
  }

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  const doneTasksAmount = tasks.reduce((total, task) => task.done ? total + 1 : total, 0)

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.content}>
        <form className={styles.create_task_form} onSubmit={addTask}>
          <input name="task-name" type="text" placeholder='Adicione uma nova tarefa' />
          
          <button type="submit">
            Criar 
            <PlusCircle size={16} />
          </button>
        </form>

        <header className={styles.amounts_header}>
          <div>
            <strong className={styles.text_blue}>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>

          <div>
            <strong className={styles.text_purple}>Concluídas</strong>
            <span>{doneTasksAmount} de {tasks.length}</span>
          </div>
        </header>

        <List tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
      </section>
    </div>
  )
}
