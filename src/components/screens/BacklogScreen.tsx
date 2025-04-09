
import { Header } from "../ui/Header/Header";
import { ListaSprints } from "../ui/ListaSprints/ListaSprints";
import { ListaTareas } from "../ui/ListaTareas/ListaTareas";
import styles from "./EstiloGeneral.module.css";

export const BacklogScreen = () => {
  return (
    <div className={styles.containerGeneral}>
      <Header/>
      <div className={styles.containerBody}>
        <ListaSprints/>
        <ListaTareas/>
      </div>
    </div>
  )
}
