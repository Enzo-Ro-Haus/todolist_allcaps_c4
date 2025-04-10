import { FaPlus } from 'react-icons/fa';
import styles from './Home.module.css';
import { useBacklogStore } from '../../store/backlogStore';
import { useSprintStore } from '../../store/sprintStore';
import { SprintSider } from '../ui/Sprint/SprintSider';
import { TareasBacklog } from '../ui/Backlog/TareasBacklog';
import { UpdateTarea } from '../ui/Backlog/Modals/UpdateTarea/UpdateTarea';
import { DeleteTarea } from '../ui/Backlog/Modals/DeleteTarea/DeleteTarea';
import { ViewTarea } from '../ui/Backlog/Modals/ViewTarea/ViewTarea';
import { useEffect, useState } from 'react';
import { getBacklogController } from '../../data/backlogController';
import { getSprints } from '../../services/sprintService';
import { CreateTarea } from '../ui/Backlog/Modals/CreateTarea/CreateTarea';

export const Home = () => {
    const tareas = useBacklogStore((state) => state.tareas);
    const sprints = useSprintStore((state) => state.sprints);

    const [showCreateTarea, setShowCreateTarea] = useState(false);
    const [showUpdateTarea, setShowUpdateTarea] = useState(false);
    const [showDeleteTarea, setShowDeleteTarea] = useState<boolean>(false);
    const [showViewTarea, setShowViewTarea] = useState<boolean>(false);

    useEffect(() => {
    
        // Cargamos las Tareas del backlog
        const fetchDataBacklog = async () => {
            try {
                const response = await getBacklogController();
        
                useBacklogStore.setState({
                tareas: response,
                });
            } catch (error) {
                console.error("Error cargando las tareas: ", error);
            }
            };
        
            // Cargamos los Sprints
            const fetchDataSprints = async () => {
            try {
                const response = await getSprints();
        
                useSprintStore.setState({
                sprints: response,
                });
            } catch (error) {
                console.error("Error cargando los sprints: ", error);
            }
            };
        
            // Ejecutamos las funciones de carga
            fetchDataBacklog();
            fetchDataSprints();
        }, []);
    


    return (
        <div className={styles.home_container}>
            <div className={styles.home_header}>
                <h1 className={styles.home_headerTittle}>Administración de Tareas</h1>
            </div>

            <div className={styles.home_content}>
                <div className={styles.home_contentSider}>
                    <button className={styles.home_siderButton}>Backlog</button>
                    <div className={styles.home_siderTareasContainer}>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                            <h3 style={{fontSize: "1.5rem"}}>Lista Sprints</h3>
                            <button className={styles.home_siderButtonAdd}><FaPlus /></button>
                        </div>
                        <div>
                            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                {sprints.length > 0 ? (
                                    sprints.map((spr) => {
                                        console.log(spr.nombre);
                                        
                                        return <SprintSider key={spr.id} sprint={spr} />;
                                    })
                                ) : (
                                    <p className={styles.home_siderNoSprints}>No hay sprints</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.home_contentTareas}>
                    <div>
                        <h1 style={{fontSize: "2rem"}}>Backlog</h1>
                    </div>
                    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                        <h3 style={{ fontSize: "2rem", fontWeight: "normal" }}>Tareas en el Backlog</h3>
                        <button className={styles.home_tareaButtonAdd} onClick={() => {console.log(showCreateTarea); setShowCreateTarea(true);}}><FaPlus /> Crear Tarea</button>
                    </div>
                    {tareas && tareas.length > 0 ? ( // Primero verificar que no sea undefined o null
                        tareas.map((tra) => (
                            <TareasBacklog
                                key={tra.id}
                                tarea={tra}
                                updateTarea={() => setShowUpdateTarea(true)}
                                deleteTarea={() => setShowDeleteTarea(true)}
                                viewTarea={() => setShowViewTarea(true)}
                            />
                        ))
                    )
                    : (
                        <p className={styles.home_tareaNoTareas}>No hay tareas en el backlog</p>
                    )}
                </div>
            </div>
            
            {showUpdateTarea && (
                <UpdateTarea onClose={() => setShowUpdateTarea(false)} />
            )}
            {showDeleteTarea && (
                <DeleteTarea onClose={() => setShowDeleteTarea(false)} />
            )}
            {showViewTarea && (
                <ViewTarea onClose={() => setShowViewTarea(false)} />
            )}
            {showCreateTarea && (
                <CreateTarea onClose={() => setShowCreateTarea(false)} />
            )}

        </div>
    );
}