import { useParams } from "react-router-dom";
import { useStore } from "../../store/useStore";
import "./SprintScreen.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const SprintScreen = () => {
    const { id } = useParams();
    const { sprints } = useStore();
    const sprint = sprints.find((s) => s.id === id);


    if (!sprint) return <p className="error">Sprint no encontrado</p>;

    return (
        <div className="sprint-container">
            <h1>{sprint.nombre}</h1>
            <div className="task-sections">
                <div className="task-column">
                    <h2>Pendiente</h2>
                    {sprint.tareas.filter(t => t.estado === "pendiente").map((tarea) => (
                        <div key={tarea.id} className="task-card">
                            <p>{tarea.titulo}: {tarea.descripcion}</p>
                            <div className="task-actions">
                                <button className="view-btn"><FaEye /></button>
                                <button className="edit-btn"><FaEdit /></button>
                                <button className="delete-btn"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="task-column">
                    <h2>En Progreso</h2>
                    {sprint.tareas.filter(t => t.estado === "en_progreso").map((tarea) => (
                        <div key={tarea.id} className="task-card">
                            <p>{tarea.titulo}: {tarea.descripcion}</p>
                            <div className="task-actions">
                                <button className="view-btn"><FaEye /></button>
                                <button className="edit-btn"><FaEdit /></button>
                                <button className="delete-btn"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="task-column">
                    <h2>Completado</h2>
                    {sprint.tareas.filter(t => t.estado === "completado").map((tarea) => (
                        <div key={tarea.id} className="task-card">
                            <p>{tarea.titulo}: {tarea.descripcion}</p>
                            <div className="task-actions">
                                <button className="view-btn"><FaEye /></button>
                                <button className="edit-btn"><FaEdit /></button>
                                <button className="delete-btn"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SprintScreen;
