import styles from './Header.module.css'

import logoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoImg} alt='blue rocket with "todo" written to the right of it' />
    </header>
  )
}