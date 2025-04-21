import { FC } from "react";
import { useSprintStore } from "../../../../../store/sprintStore";
import { deleteTareaFromSprintController } from "../../../../../data/sprintController";
import styles from "./DeleteTareaSprint.module.css";

interface Props {
    onClose: () => void;
    sprintId: string;
}

export const DeleteTareaSprint: FC<Props> = ({ onClose, sprintId }) => {
    const handleDeleteTarea = async () => {
        const tarea = useSprintStore.getState().activeTarea;
        if (tarea) {
            useSprintStore.getState().removeTareaSprint(sprintId, tarea.id);
            await deleteTareaFromSprintController(sprintId, tarea.id);
            useSprintStore.getState().clearActiveTarea();
        }
        onClose();
    };

    return (
        <div className="overlay">
            <div className={styles.delete_form}>
                <h3 className={styles.delete_tittle}>¿Deseas eliminar esta tarea?</h3>
                <h4 className={styles.delete_tittleTarea}>{useSprintStore.getState().activeTarea?.titulo}</h4>
                <div className={styles.delete_containerButtons}>
                    <button className={styles.delete__button} onClick={onClose}>Cerrar</button>
                    <button className={styles.delete__button} onClick={handleDeleteTarea}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};
