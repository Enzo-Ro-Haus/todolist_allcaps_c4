import styles from './StateListTareas.module.css'
import { getAllTareas } from "../../../http/tarea";
import { CardListTarea } from "../CardListTareas/CardListTarea";
import { ModalTareas } from"../ModalTareas/ModalTareas";
import { ITarea } from "../../../types/ITarea";
import { useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";

export const StateListTareas = () => {
    const tareas = tareaStore((state) => state.tareas);
    const setArrayTareas = tareaStore((state) => state.setArrayDeTareas);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  
  
    const getTareas = async () => {
      const data = await getAllTareas();
      if(data) setArrayTareas(data);
    }
  
    useEffect(()=>{
      getTareas();
  
    },[])
  
    const [openModalTarea, setOpenModalTarea] = useState(false);
  
    const handleOpenModalEdit = (tarea: ITarea) => {
      setTareaActiva(tarea);
      setOpenModalTarea(true);
    };
    
    const handleCloseModal = () => {
      setOpenModalTarea(false);
      setTareaActiva(null);
    }

  return (
    <>
    <div className={styles.containerPrincipalListTareas}>
      <div className={styles.containerTitleAndButton}>
        <h2>Tareas:</h2>
        <button onClick={()=>{setOpenModalTarea(true)}}>Agregar tarea</button>
      </div>
      <div className={styles.containerList}>
        {tareas.length > 0 ? (
          tareas.map((el) => <CardListTarea
          handleOpenModalEdit={handleOpenModalEdit}
          tarea={el}/>)
        ) : (
          <div>
            <h3>No hay tareas</h3>
          </div>
        )}
      </div>
    </div>
    { openModalTarea && <ModalTareas handleCloseModal={handleCloseModal}/> }
    </>
  )
}
