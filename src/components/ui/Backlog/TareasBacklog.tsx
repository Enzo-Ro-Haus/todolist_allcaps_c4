import { FC, useState } from "react";
import { FaArrowRight, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useBacklogStore } from "../../../store/backlogStore";
import { useSprintStore } from "../../../store/sprintStore";
import Swal from "sweetalert2";
import { API_URL } from "../../../utils/constantes";
import styles from "./TareasBacklog.module.css";
import { ITarea } from "../../../types/Tarea/ITarea";
import { deleteTareaBacklogController } from "../../../data/backlogController";

interface ITareasBackLogProps {
    tarea: ITarea;
    updateTarea: () => void;
    deleteTarea: () => void;
    viewTarea: () => void;
}

export const TareasBacklog: FC<ITareasBackLogProps> = ({
    tarea,
    updateTarea,
    viewTarea
}) => {
    const [selectedSprintId, setSelectedSprintId] = useState("");

    const handleEditTarea = () => {
        useBacklogStore.getState().setActiveTarea(tarea);
        updateTarea();
    };

    const handleDeleteTarea = () => {
        useBacklogStore.getState().setActiveTarea(tarea);
        
        Swal.fire({
            title: "¿Estás seguro?",
            text: `Esta tarea será eliminada: "${tarea.titulo}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const tareaId = tarea.id;
                    useBacklogStore.getState().removeTarea(tareaId);
                    await deleteTareaBacklogController(tareaId); 
                    useBacklogStore.getState().clearActiveTarea(); 
                    Swal.fire("Eliminada", "La tarea fue eliminada correctamente", "success");
                } catch (error) {
                    console.error("Error al eliminar tarea:", error);
                    Swal.fire("Error", "No se pudo eliminar la tarea", "error");
                }
            }
        });
    };
    
    const handleViewTarea = () => {
        useBacklogStore.getState().setActiveTarea(tarea);
        viewTarea();
    };

    const handleMoverAlSprint = async () => {
        if (!selectedSprintId) return alert("Selecciona un sprint");

        try {

            const resBacklog = await fetch(`${API_URL}/backlog`);
            const dataBacklog = await resBacklog.json();
            const nuevasTareasBacklog = dataBacklog.tareas.filter((t: ITarea) => t.id !== tarea.id);

            await fetch(`${API_URL}/backlog`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tareas: nuevasTareasBacklog }),
            });

            const resSprints = await fetch(`${API_URL}/sprintList`);
            const dataSprints = await resSprints.json();
            const nuevosSprints = dataSprints.sprints.map((spr: any) =>
                spr.id === selectedSprintId ? { ...spr, tareas: [...spr.tareas, tarea] } : spr
            );

            await fetch(`${API_URL}/sprintList`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sprints: nuevosSprints }),
            });

            useBacklogStore.getState().removeTarea(tarea.id);
            useSprintStore.getState().createTareaSprint(tarea, selectedSprintId);
            setSelectedSprintId("");

        } catch (error) {
            console.error("Error al mover tarea al sprint:", error);
        }
    };

    return (
        <div className={styles.tareasBacklog_container}>
            <p><b>{tarea.titulo}:</b> {tarea.descripcion}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: ".2rem" }}>
                <button
                    className={styles.tareasBacklog_input}
                    onClick={handleMoverAlSprint}
                    disabled={!selectedSprintId}
                >
                    Enviar a <FaArrowRight />
                </button>
                <select
                    value={selectedSprintId}
                    onChange={(e) => setSelectedSprintId(e.target.value)}
                    className={styles.tareasBacklog_input}
                >
                    <option value="">Seleccione un sprint</option>
                    {useSprintStore.getState().sprints.map((spr) => (
                        <option key={spr.id} value={spr.id}>{spr.nombre}</option>
                    ))}
                </select>
                <button className={styles.tareasBacklog_buttonAction} onClick={handleViewTarea}><FaEye /></button>
                <button className={styles.tareasBacklog_buttonAction} onClick={handleEditTarea}><FaEdit /></button>
                <button className={styles.tareasBacklog_buttonAction} onClick={handleDeleteTarea}><FaTrash /></button>
            </div>
        </div>
    );
};


