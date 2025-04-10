import {FC} from "react";
import styles from "./TareasBacklog.module.css";
import { ITarea } from "../../../types/Tarea/ITarea";
import { useBacklogStore } from "../../../store/backlogStore";
import { FaArrowRight, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useSprintStore } from "../../../store/sprintStore";

interface ITareasBackLogProps {
    tarea: ITarea;
    updateTarea: () => void;
    deleteTarea: () => void;
    viewTarea: () => void;
}

export const TareasBacklog: FC<ITareasBackLogProps> = ({
    tarea,
    updateTarea,
    deleteTarea,
    viewTarea
}) => {

    const handleEditTarea = () => {
        useBacklogStore.getState().setActiveTarea(tarea);
        updateTarea();
    };
    const handleDeleteTarea = () => {
        useBacklogStore.getState().setActiveTarea(tarea);
        deleteTarea();
    };
    const handleViewTarea = () => {
        useBacklogStore.getState().setActiveTarea(tarea);
        viewTarea();
    };

    return (
        <div className={styles.tareasBacklog_container}>
            <p><b>{tarea.titulo}:</b> {tarea.descripcion}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: ".2rem" }}>
                <button className={styles.tareasBacklog_input}><FaArrowRight /> Enviar a</button>
                <select id="options" onChange={(e) => e.preventDefault} className={styles.tareasBacklog_input}>
                    <option>Seleccione una sprint</option>
                    {useSprintStore.getState().sprints.map((spr) => (
                        <option key={spr.id} value={spr.nombre}>{spr.nombre}</option>
                    ))}
                </select>
                <button className={styles.tareasBacklog_buttonAction} onClick={() => handleViewTarea()}><FaEye /></button>
                <button className={styles.tareasBacklog_buttonAction} onClick={() => handleEditTarea()}><FaEdit /></button>
                <button className={styles.tareasBacklog_buttonAction} onClick={() => handleDeleteTarea()}><FaTrash /></button>
            </div>
        </div>
    )
}