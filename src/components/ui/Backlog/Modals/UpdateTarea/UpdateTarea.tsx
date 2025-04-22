import { FC, useState, useEffect } from "react";
import { updateTareaBacklogController } from "../../../../../data/backlogController";
import { useBacklogStore } from "../../../../../store/backlogStore";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from "./UpdateTarea.module.css";

interface UpdateTareaProps {
    onClose: () => void;
}

export const UpdateTarea: FC<UpdateTareaProps> = ({ onClose }) => {
    const { activeTarea, updateTarea, clearActiveTarea } = useBacklogStore.getState();

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
        const tareaActualizada = await updateTareaBacklogController({
            id: activeTarea.id,
            titulo,
            descripcion,
            estado: activeTarea.estado,
            fechaLimite,
        });

        updateTarea(tareaActualizada);
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
            <Stack direction={"row"} spacing={20} className={styles.updateTarea_containerButtons}>
            <Button type="button" variant="contained" color="error" 
            sx={{ width: "10rem", height: "2rem", borderRadius: "5px"}}
            onClick={onClose}>
                Cerrar
            </Button>
            <Button type="submit" variant="contained" color="success"
            sx={{ width: "10rem", height: "2rem", borderRadius: "5px"}}>
                Aceptar
            </Button>
            </Stack>
        </form>
        </div>
    );
};
