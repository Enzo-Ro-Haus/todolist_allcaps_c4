import { FC } from "react";
import { useSprintStore } from "../../../../../store/sprintStore";
import { deleteTareaFromSprintController } from "../../../../../data/sprintController";
import styles from "./DeleteTareaSprint.module.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
                <h3 className={styles.delete_title}>¿Deseas eliminar esta tarea?</h3>
                <h4 className={styles.delete_titleTarea}>{useSprintStore.getState().activeTarea?.titulo}</h4>
                <Stack direction={"row"} spacing={20} className={styles.createTarea_containerButtons}>
                    <Button type="button" variant="contained" color="error"
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px" }} onClick={onClose}>Cerrar</Button>
                    <Button type="submit" variant="contained" color="success"
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px" }} onClick={() => handleDeleteTarea()}>Eliminar</Button>
                </Stack>
            </div>
        </div>
    );
};
