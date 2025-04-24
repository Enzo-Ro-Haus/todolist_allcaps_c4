import { Header } from '../ui/Header/Header';
import { StateListTareas } from '../ui/StateListTareas/StateListTareas';
import styles from './EstiloGeneral.module.css';

export const SprintScreen = () => {
  return (
    <div className={styles.containerGeneral}>
      <Header/>
      <div className={styles.containerBody}>
        <StateListTareas/>
        <StateListTareas/>
        <StateListTareas/>
      </div>
    </div>
  )
}
