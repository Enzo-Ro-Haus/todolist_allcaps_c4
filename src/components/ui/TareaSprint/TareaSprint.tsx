import { useSprintStore } from '../../../store/sprintStore';
import { FaEye, FaEdit, FaTrash, FaArrowRight, FaPlus } from "react-icons/fa";
import { useState } from 'react';
import { CreateTareaSprint } from './Modals/CreateTareaSprint/CreateTareaSprint';
import { DeleteTareaSprint } from './Modals/DeleteTareaSprint/DeleteTareaSprint';
import { UpdateTareaSprint } from './Modals/UpdateTareaSprint/UpdateTareaSprint';
import { ViewTareaSprint } from './Modals/ViewTareaSprint/ViewTareaSprint';
import { useBacklogStore } from '../../../store/backlogStore';
import { API_URL } from '../../../utils/constantes';
import styles from './TareaSprint.module.css'

export const TareasSprint = () => {
    const sprint = useSprintStore(state => state.activeSprint);
    
    const [showCreateTareaSprint, setShowCreateTareaSprint] = useState(false);
    const [showUpdateTareaSprint, setShowUpdateTareaSprint] = useState(false);
    const [showDeleteTareaSprint, setShowDeleteTareaSprint] = useState(false);
    const [showViewTareaSprint, setShowViewTareaSprint] = useState(false);

    const estados = [
        { key: 'pendiente', label: 'Pendiente' },
        { key: 'en_progreso', label: 'En Progreso' },
        { key: 'completado', label: 'Completado' }
    ];

    if (!sprint) return <p>No hay sprint activo</p>;

    const handleMoverEstado = (tarea: any) => {
        const estados = ['pendiente', 'en_progreso', 'completado'];
        const estadoActualIndex = estados.indexOf(tarea.estado);
        const siguienteEstado = estados[(estadoActualIndex + 1) % estados.length];
    
        const sprintId = useSprintStore.getState().activeSprint?.id;
        if (!sprintId) return;
    
        useSprintStore.getState().updateTareaSprint(sprintId, {
            ...tarea,
            estado: siguienteEstado
        });

    };

    const handleEnviarAlBacklog = async (tarea: any, sprintId: string) => {
        try {
            const backlogRes = await fetch(`${API_URL}/backlog`);
            const backlogData = await backlogRes.json();
        
            const nuevasTareasBacklog = [...(backlogData.tareas || []), tarea];
        
            await fetch(`${API_URL}/backlog`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tareas: nuevasTareasBacklog }),
            });
        
            const sprintRes = await fetch(`${API_URL}/sprintList`);
            const sprintData = await sprintRes.json();
        
            const nuevosSprints = sprintData.sprints.map((spr: any) => {
                if (spr.id === sprintId) {
                return {
                    ...spr,
                    tareas: spr.tareas.filter((t: any) => t.id !== tarea.id),
                };
                }
                return spr;
            });
        
            await fetch(`${API_URL}/sprintList`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sprints: nuevosSprints }),
            });
        
            useBacklogStore.getState().createTarea(tarea);
            useSprintStore.getState().removeTareaSprint(sprintId, tarea.id);
            
            } catch (error) {
            console.error("Error al mover la tarea al backlog:", error);
            }
    };

    return (
        <div className={styles.tareaSprint_container}>
            <h2 className={styles.tareaSprint_title}>
                Nombre de la sprint: <strong>{sprint.nombre}</strong>
            </h2>
            <div className={styles.tareaSprint_header}>
                <h3 className={styles.tareaSprint_subtitle}>Tareas en la sprint</h3>
                <button className={styles.tareaSprint_buttonAdd} onClick={() => setShowCreateTareaSprint(true)}>
                    Crear tarea <FaPlus />
                </button>
            </div>
            <div className={styles.tareaSprint_sections}>
                {estados.map(({ key, label }) => (
                    <div key={key} className={styles.tareaSprint_column}>
                        <h3 style={{ fontSize: "2rem" }}>{label}</h3>
                        {sprint.tareas
                            .filter(t => t.estado === key)
                            .map(tarea => (
                                <div key={tarea.id} className={styles.tareaSprint_card}>
                                    <p><strong>Título:</strong> {tarea.titulo}</p>
                                    <p><strong>Descripción:</strong> {tarea.descripcion}</p>
                                    <p><strong>Fecha límite:</strong> {tarea.fechaLimite}</p>

                                    <div className={styles.tareaSprint_Actions}>
                                        <button className={styles.tareaSprint_buttonEnviar} onClick={() => handleEnviarAlBacklog(tarea, sprint.id)}>
                                            Enviar al Backlog <FaPlus />
                                        </button>
                                        <button className={styles.tareaSprint_buttonEstado} onClick={() => handleMoverEstado(tarea)}>
                                            {tarea.estado} <FaArrowRight />
                                        </button>
                                        <button className={styles.tareaSprint_buttonAction} onClick={() =>{useSprintStore.getState().setActiveTarea(tarea); setShowViewTareaSprint(true)}}><FaEye /></button>
                                        <button className={styles.tareaSprint_buttonAction} onClick={() => { useSprintStore.getState().setActiveTarea(tarea); setShowUpdateTareaSprint(true)}}><FaEdit /></button>
                                        <button className={styles.tareaSprint_buttonAction} onClick={() => { useSprintStore.getState().setActiveTarea(tarea); setShowDeleteTareaSprint(true)}}><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
            {showCreateTareaSprint && <CreateTareaSprint sprintId = {sprint.id} onClose={() => setShowCreateTareaSprint(false)}/>}
            {showUpdateTareaSprint && <UpdateTareaSprint sprintId = {sprint.id} onClose={() => setShowUpdateTareaSprint(false)}/>}
            {showDeleteTareaSprint && <DeleteTareaSprint  sprintId = {sprint.id} onClose={() => setShowDeleteTareaSprint(false)}/>}
            {showViewTareaSprint && <ViewTareaSprint onClose={() => setShowViewTareaSprint(false)}/>}
        </div>
    );
};