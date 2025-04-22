import { FC } from "react";
import styles from "./DeleteSprint.module.css";
import { useSprintStore } from "../../../../../store/sprintStore";
import { deleteSprintController } from "../../../../../data/sprintController";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
                <Stack direction="row" spacing={20} className={styles.delete_containerButtons}>
                    <Button type="button" variant="contained" color="error" 
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px"}}
                    className={styles.delete__button} onClick={() => onClose()}>Cerrar</Button>
                    <Button type="submit" variant="contained" color="success"
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px"}}
                    className={styles.delete__button} onClick={() => handleDeleteSprint()}>Eliminar</Button>
                </Stack>
            </div>
        </div>
    );
};
