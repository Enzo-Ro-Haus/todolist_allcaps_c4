import { FC, useState } from "react";
import styles from "./CreateSprint.module.css";
import { ICreateSprint } from "../../../../../types/Sprint/ICreateSprint";
import { addSprintController } from "../../../../../data/sprintController";
import { useSprintStore } from "../../../../../store/sprintStore";

interface CreateSprintProps {
    onClose: () => void;
}

export const CreateSprint: FC<CreateSprintProps> = ({ onClose }) => {
    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevoSprint: ICreateSprint = {
            nombre,
            fechaInicio,
            fechaCierre,
            tareas: [],
        };

        try {
            const sprintCreada = await addSprintController(nuevoSprint);

            if (sprintCreada) {
                useSprintStore.getState().createSprint(sprintCreada);
                onClose();
            } else {
                console.warn("El sprint no fue creado correctamente")
            }
            
        } catch (err) {
            console.error("Error creando sprint:", err);
        }
    };

    return (
        <div className="overlay">
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.title}>Crear Sprint</h3>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                <input type="date" value={fechaCierre} onChange={(e) => setFechaCierre(e.target.value)} required />
                <div className={styles.buttons}>
                    <button type="button" onClick={onClose}>Cerrar</button>
                    <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    );
};
