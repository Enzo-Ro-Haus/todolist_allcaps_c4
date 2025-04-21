import { FC, useState } from "react";
import { ICreateTarea } from "../../../../../types/Tarea/ICreateTarea";
import { useSprintStore } from "../../../../../store/sprintStore";
import { addTareaToSprintController } from "../../../../../data/sprintController";
import styles from "./CreateTareaSprint.module.css";

interface Props {
    onClose: () => void;
    sprintId: string;
}

export const CreateTareaSprint: FC<Props> = ({ onClose, sprintId }) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevaTarea: ICreateTarea = {
            titulo,
            descripcion,
            estado: "pendiente",
            fechaLimite,
        };

        try {
            const tareaSprintCreada = await addTareaToSprintController(sprintId, nuevaTarea)

            if (tareaSprintCreada) {
                useSprintStore.getState().createTareaSprint(tareaSprintCreada, sprintId);
                onClose();
            } else {
                console.warn("La tarea del sprint no fue creada correctamente")
            }
        } catch (err) {
            console.error("Error creando tarea en sprint:", err);
        }
    };

    return (
        <div className="overlay">
            <form className={styles.createTarea_form} onSubmit={handleSubmit}>
                <h3 className={styles.createTarea_tittle}>Crear tarea en sprint</h3>
                <input
                    className={styles.createTarea_input}
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <textarea
                    className={styles.createTarea_input}
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <input
                    className={styles.createTarea_input}
                    type="date"
                    value={fechaLimite}
                    onChange={(e) => setFechaLimite(e.target.value)}
                    required
                />
                <div className={styles.createTarea_containerButtons}>
                    <button type="button" className={styles.createTarea_button} onClick={onClose}>Cerrar</button>
                    <button type="submit" className={styles.createTarea_button}>Crear</button>
                </div>
            </form>
        </div>
    );
};
