import { FC, useState, useEffect } from "react";
import { updateTareaBacklogController } from "../../../../../data/backlogController";
import { useBacklogStore } from "../../../../../store/backlogStore";
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
            <textarea
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
            <div className={styles.updateTarea_containerButtons}>
            <button type="button" className={styles.updateTarea_button} onClick={onClose}>
                Cerrar
            </button>
            <button type="submit" className={styles.updateTarea_button}>
                Aceptar
            </button>
            </div>
        </form>
        </div>
    );
};
