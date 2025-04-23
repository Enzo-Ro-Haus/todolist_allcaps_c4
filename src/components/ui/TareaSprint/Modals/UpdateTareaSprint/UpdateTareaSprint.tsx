import { FC, useEffect, useState } from "react";
import { useSprintStore } from "../../../../../store/sprintStore";
import { updateTareaInSprintController } from "../../../../../data/sprintController";
import styles from "./UpdateTareaSprint.module.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface Props {
    onClose: () => void;
    sprintId: string;
}

export const UpdateTareaSprint: FC<Props> = ({ onClose, sprintId }) => {
    const { activeTarea, updateTareaSprint, clearActiveTarea } = useSprintStore.getState();

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");

    useEffect(() => {
        if (activeTarea) {
            setTitulo(activeTarea.titulo);
            setDescripcion(activeTarea.descripcion);
            setFechaLimite(activeTarea.fechaLimite);
        }
    }, [activeTarea]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeTarea) return;

        try {
            const actualizada = {
                ...activeTarea,
                titulo,
                descripcion,
                fechaLimite,
            };

            await updateTareaInSprintController(sprintId, actualizada);
            updateTareaSprint(sprintId, actualizada);
            clearActiveTarea();
            onClose();
        } catch (err) {
            console.error("Error actualizando tarea:", err);
        }
    };

    return (
        <div className="overlay">
            <form className={styles.updateTarea_form} onSubmit={handleSubmit}>
                <h3 className={styles.updateTarea_tittle}>Editar tarea</h3>
                <input
                    className={styles.updateTarea_input}
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <input
                    className={styles.updateTarea_input}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <input
                    className={styles.updateTarea_input}
                    type="date"
                    value={fechaLimite}
                    onChange={(e) => setFechaLimite(e.target.value)}
                    required
                />
                <Stack direction={"row"} spacing={20} className={styles.createTarea_containerButtons}>
                    <Button type="button" variant="contained" color="error"
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px" }} onClick={onClose}>Cerrar</Button>
                    <Button type="submit" variant="contained" color="success"
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px" }}>Crear</Button>
                </Stack>
            </form>
        </div>
    );
};
