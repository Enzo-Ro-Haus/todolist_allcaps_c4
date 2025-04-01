import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import "./BacklogScreen.css";
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BacklogScreen = () => {
    const { backlog, fetchData, sprints } = useStore();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="backlog-container">
            <aside className="sprint-list">
                <h2>Lista de Sprints</h2>
                {sprints.map((sprint) => (
                    <div className="sprint-card" key={sprint.id}>
                        <h3>{sprint.nombre}</h3>
                        <p><b>Inicio:</b> {sprint.fechaInicio}</p>
                        <p><b>Cierre:</b> {sprint.fechaCierre}</p>
                        <div className="sprint-actions">
                            <button className="btn-view"><Link to={`/sprint/${sprint.id}`}><FaEye /> </Link></button>
                            <button className="btn-edit"><FaEdit /></button>
                            <button className="btn-delete"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </aside>

            <main className="backlog-main">
                <h1>Backlog</h1>
                <button className="btn-add-task"><FaPlus /> Crear tarea</button>
                <div className="task-list">
                    {backlog.map((tarea) => (
                        <div className="task-card" key={tarea.id}>
                            <p><b>{tarea.titulo}</b>: {tarea.descripcion}</p>
                            <div className="task-actions">
                                <button className="btn-move"><FaArrowRight /> Enviar a</button>
                                <select className="sprint-select">
                                    <option>Seleccione una sprint</option>
                                    {sprints.map(sprint => (
                                        <option key={sprint.id} value={sprint.id}>{sprint.nombre}</option>
                                    ))}
                                </select>
                                <button className="btn-view"><FaEye /></button>
                                <button className="btn-edit"><FaEdit /></button>
                                <button className="btn-delete"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BacklogScreen;

