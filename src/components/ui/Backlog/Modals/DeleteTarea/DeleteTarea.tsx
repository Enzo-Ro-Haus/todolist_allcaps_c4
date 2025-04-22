import { FC } from "react";
import { useBacklogStore } from "../../../../../store/backlogStore";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
                <p className={styles.delete_tittleTarea}>{useBacklogStore.getState().activeTarea?.titulo}</p>
                <Stack direction="row" spacing={20} className={styles.delete_containerButtons}>
                    <Button type="button" variant="contained" color="error" 
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px"}}
                    className={styles.delete__button} onClick={() => onClose()}>Cerrar</Button>
                    <Button type="submit" variant="contained" color="success"
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px"}}
                    className={styles.delete__button} onClick={() => handleDeleteTarea()}>Eliminar</Button>
                </Stack>
            </div>
        </div>
    );
};