import { FC } from "react";
import { useBacklogStore } from "../../../../../store/backlogStore";
import styles from "./DeleteTarea.module.css";
import { deleteTareaBacklogController } from "../../../../../data/backlogController";

interface IDeleteTareaProps {
    onClose: () => void;
}

export const DeleteTarea: FC<IDeleteTareaProps> = ({onClose}) => {
    const handleDeleteTarea = () => {
        const tarea = useBacklogStore.getState().activeTarea;
        if (tarea) {
            useBacklogStore.getState().removeTarea(tarea.id);
            deleteTareaBacklogController(tarea.id);
            useBacklogStore.getState().clearActiveTarea();
        }
        onClose();
    };

    return (
        <div className="overlay">
            <div className={styles.delete_form}>
                <h3 className={styles.delete_tittle}>{`Deseas eliminar esta tarea:`}</h3>
                <h4 className={styles.delete_tittleTarea}>{useBacklogStore.getState().activeTarea?.titulo}</h4>
                <div className={styles.delete_containerButtons}>
                    <button className={styles.delete__button} onClick={() => onClose()}>Cerrar</button>
                    <button className={styles.delete__button} onClick={() => handleDeleteTarea()}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};