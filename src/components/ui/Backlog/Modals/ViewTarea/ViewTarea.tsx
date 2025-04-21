import { FC } from "react";
import styles from "./ViewTarea.module.css";
import { useBacklogStore } from "../../../../../store/backlogStore";


interface IViewTareaProps {
    onClose: () => void;
}

export const ViewTarea: FC<IViewTareaProps> = ({onClose}) => {
    const tarea = useBacklogStore.getState().activeTarea;

    return (
        <div className="overlay">
            <div className={styles.view_container}>
                <h3 className={styles.view_tittle}>{tarea?.titulo}</h3>
                <div>
                    <p style={{color: 'var(--palet-color-1)'}}>{`Descripción:`}</p>
                    <p>{tarea?.descripcion}</p>
                </div>
                <div>
                    <p style={{color: 'var(--palet-color-1)'}}></p>
                    <p>{tarea?.fechaLimite}</p>
                </div>
                <div className={styles.view_containButtons}>
                    <button className={styles.view_button} onClick={() => onClose()}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}