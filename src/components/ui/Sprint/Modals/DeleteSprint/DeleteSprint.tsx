import { FC } from "react";
import styles from "./DeleteSprint.module.css";
import { useSprintStore } from "../../../../../store/sprintStore";
import { deleteSprintController } from "../../../../../data/sprintController";

interface IDeleteSprintProps {
    onClose: () => void;
}

export const DeleteSprint: FC<IDeleteSprintProps> = ({ onClose }) => {
    const handleDeleteSprint = () => {
        const sprint = useSprintStore.getState().activeSprint;
        if (sprint) {
            useSprintStore.getState().removeSprint(sprint.id);
            deleteSprintController(sprint.id);
            useSprintStore.getState().clearActiveSprint();
        }
        onClose();
    };

    return (
        <div className="overlay">
            <div className={styles.form}>
                <h3 className={styles.title}>{`Deseas eliminar este sprint:`}</h3>
                <h4 className={styles.sprintName}>{useSprintStore.getState().activeSprint?.nombre}</h4>
                <div className={styles.buttons}>
                    <button onClick={() => onClose()}>Cancelar</button>
                    <button onClick={() => handleDeleteSprint()}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};
