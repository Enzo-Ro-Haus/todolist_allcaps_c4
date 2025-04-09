import { FC } from "react"
import { ITarea } from "../../../types/ITarea"
import styles from "./CardListTarea.module.css"

type ICardListTarea = {
    tarea: ITarea;
    handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardListTarea: FC<ICardListTarea> = ({tarea, handleOpenModalEdit}) => {
  const eliminarTarea = () => {
    console.log("Eliminar: ", tarea);
  }

  const editarTarea = () => {
    handleOpenModalEdit(tarea);
  }
  
  return (
    <div className={styles.containerCardListTareas}>
      <div>
      <h3>
        <p>ID: {tarea.id}</p>
        <p>Título: {tarea.titulo}</p>
      </h3>
      <p>Descripción: {tarea.descripcion}</p>
      <p><b>Fecha límite: {tarea.fechaLimite!.toString()}</b></p>
      </div>
      <div className={styles.actionCards}>
        <button onClick={editarTarea}>Editar</button>
        <button onClick={eliminarTarea}>Eliminar</button>
      </div>
    </div>
  )
}
