import { FC, useState, useEffect } from "react";
import styles from "./UpdateSprint.module.css";
import { useSprintStore } from "../../../../../store/sprintStore";
import { updateSprintController } from "../../../../../data/sprintController";

interface Props {
    onClose: () => void;
}

export const UpdateSprint: FC<Props> = ({ onClose }) => {
    const { activeSprint, updateSprint, clearActiveSprint } = useSprintStore.getState();

    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");

    useEffect(() => {

        if (activeSprint) {
            setNombre(activeSprint.nombre);
            setFechaInicio(activeSprint.fechaInicio);
            setFechaCierre(activeSprint.fechaCierre);
        }
        
    }, [activeSprint]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeSprint) return;

        const actualizado = await updateSprintController({
            ...activeSprint,
            nombre,
            fechaInicio,
            fechaCierre,
        });

        updateSprint(actualizado);
        clearActiveSprint();
        onClose();
    };

    return (
        <div className="overlay">
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.title}>Editar Sprint</h3>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                <input type="date" value={fechaCierre} onChange={(e) => setFechaCierre(e.target.value)} required />
                <div className={styles.buttons}>
                    <button type="button" onClick={onClose}>Cerrar</button>
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </div>
    );
};
