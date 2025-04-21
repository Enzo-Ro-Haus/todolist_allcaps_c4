import { FC } from "react";
import { useSprintStore } from "../../../../../store/sprintStore";
import styles from "./ViewTareaSprint.module.css";

interface Props {
    onClose: () => void;
}

export const ViewTareaSprint: FC<Props> = ({ onClose }) => {
    const tarea = useSprintStore.getState().activeTarea;

    if (!tarea) return null;

    return (
        <div className="overlay">
            <div className={styles.viewTarea_form}>
                <h3 className={styles.viewTarea_tittle}>{tarea.titulo}</h3>
                <p className={styles.viewTarea_text}><strong>Descripción:</strong> {tarea.descripcion}</p>
                <p className={styles.viewTarea_text}><strong>Estado:</strong> {tarea.estado}</p>
                <p className={styles.viewTarea_text}><strong>Fecha límite:</strong> {tarea.fechaLimite}</p>
                <div className={styles.viewTarea_containerButtons}>
                    <button className={styles.viewTarea_button} onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};
