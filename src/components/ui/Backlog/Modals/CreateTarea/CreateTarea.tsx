import { FC, useState } from "react";
import { ICreateTarea } from "../../../../../types/Tarea/ICreateTarea";
import { useBacklogStore } from "../../../../../store/backlogStore";
import { addTareaBacklogController } from "../../../../../data/backlogController";
import styles from "./CreateTarea.module.css";

interface CreateTareaProps {
    onClose: () => void;
}

export const CreateTarea: FC<CreateTareaProps> = ({ onClose }) => {
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
            const tareaCreada = await addTareaBacklogController(nuevaTarea);

            if (tareaCreada) {
                useBacklogStore.getState().createTarea(tareaCreada);
                onClose();
            } else {
                console.warn("La tarea no fue creada correctamente.");
            }
        } catch (err) {
            console.error("Error creando tarea:", err);
        }
    };

    return (
        <div className="overlay">
            <form className={styles.createTarea_form} onSubmit={handleSubmit}>
                <h3 className={styles.createTarea_tittle}>Crear tarea</h3>
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
                    <button type="button" className={styles.createTarea_button} onClick={onClose}>
                        Cerrar
                    </button>
                    <button type="submit" className={styles.createTarea_button}>
                        Crear
                    </button>
                </div>
            </form>
        </div>
    );
};
