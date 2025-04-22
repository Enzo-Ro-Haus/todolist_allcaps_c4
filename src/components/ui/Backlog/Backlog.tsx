import { useEffect, useState } from 'react'
import { useBacklogStore } from '../../../store/backlogStore';
import { getBacklogController } from '../../../data/backlogController';
import { FaPlus } from 'react-icons/fa';
import { TareasBacklog } from './TareasBacklog';
import { UpdateTarea } from './Modals/UpdateTarea/UpdateTarea';
import { DeleteTarea } from './Modals/DeleteTarea/DeleteTarea';
import { ViewTarea } from './Modals/ViewTarea/ViewTarea';
import { CreateTarea } from './Modals/CreateTarea/CreateTarea';
import styles from './Backlog.module.css'

export const Backlog = () => {

        const tareas = useBacklogStore((state) => state.tareas);
        const [showCreateTarea, setShowCreateTarea] = useState(false);
        const [showUpdateTarea, setShowUpdateTarea] = useState(false);
        const [showDeleteTarea, setShowDeleteTarea] = useState(false);
        const [showViewTarea, setShowViewTarea] = useState(false);

        useEffect(() => {
            const fetchDataBacklog = async () => {
                try {
                    const response = await getBacklogController();
                    useBacklogStore.setState({ tareas: response });
                } catch (error) {
                    console.error("Error cargando las tareas: ", error);
                }
            };
            fetchDataBacklog();
        }, []);
        
    return (
        <>
        <div>
            <h1 style={{ fontSize: "2rem" }}>Backlog</h1>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h3 style={{ display: "flex", gap: "2rem", alignItems: "center" }}>Tareas en el Backlog</h3>
            <button className={styles.backlog_tareaButtonAdd} onClick={() => setShowCreateTarea(true)}>
                Crear Tarea <FaPlus />
            </button>
        </div>
        {tareas && tareas.length > 0 ? (
            tareas.map((tra) => (
                <TareasBacklog
                    key={tra.id}
                    tarea={tra}
                    updateTarea={() => setShowUpdateTarea(true)}
                    deleteTarea={() => setShowDeleteTarea(true)}
                    viewTarea={() => setShowViewTarea(true)}
                />
            ))

        ) : (

            <p className={styles.backlog_tareaNoTareas}>No hay tareas en el backlog</p>

        )}

        {showUpdateTarea && <UpdateTarea onClose={() => setShowUpdateTarea(false)} />}
        {showDeleteTarea && <DeleteTarea onClose={() => setShowDeleteTarea(false)} />}
        {showViewTarea && <ViewTarea onClose={() => setShowViewTarea(false)} />}
        {showCreateTarea && <CreateTarea onClose={() => setShowCreateTarea(false)} />}
        </>
    )
}
