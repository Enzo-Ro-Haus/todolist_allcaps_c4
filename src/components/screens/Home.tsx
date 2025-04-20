import { FaPlus } from 'react-icons/fa';
import styles from './Home.module.css';
import { useSprintStore } from '../../store/sprintStore';
import { SprintSider } from '../ui/Sprint/SprintSider';
import { useEffect, useState, FC } from 'react';
import { getSprintListController } from '../../data/sprintController';
import { CreateSprint } from '../ui/Sprint/Modals/CreateSprint/CreateSprint';
import { UpdateSprint } from '../ui/Sprint/Modals/UpdateSprint/UpdateSprint';
import { DeleteSprint } from '../ui/Sprint/Modals/DeleteSprint/DeleteSprint';
import { TareasSprint } from '../ui/TareaSprint/TareaSprint';
import { Backlog } from '../ui/Backlog/Backlog';
import { useNavigate, useParams } from 'react-router-dom';

interface HomeProps {
    vista: "backlog" | "sprint";
}

export const Home:FC<HomeProps> = ({vista}) =>{
    const { id } = useParams();
    const navigate = useNavigate();

    
    const sprints = useSprintStore((state) => state.sprints);
    


    const [showCreateSprint, setShowCreateSprint] = useState(false);
    const [showUpdateSprint, setShowUpdateSprint] = useState(false);
    const [showDeleteSprint, setShowDeleteSprint] = useState(false);

    useEffect(() => {

        const fetchDataSprints = async () => {
            try {
                const response = await getSprintListController();
                useSprintStore.setState({ sprints: response });
            } catch (error) {
                console.error("Error cargando los sprints: ", error);
            }
        };

        fetchDataSprints();
    }, []);

    useEffect(() => {
        if (vista === "sprint" && id) {
            const sprint = sprints.find((s) => s.id === id);
            if (sprint) {
                useSprintStore.getState().setActiveSprint(sprint);
            }
        } else {
            useSprintStore.getState().clearActiveSprint();
        }
    }, [vista, id, sprints]);

    return (
        <div className={styles.home_container}>
            <div className={styles.home_header}>
                <h1 className={styles.home_headerTittle}>Administración de Tareas</h1>
            </div>

            <div className={styles.home_content}>
                <div className={styles.home_contentSider}>
                    <button className={styles.home_siderButton} onClick={() => navigate("/backlog")}>Backlog</button>
                    <div className={styles.home_siderTareasContainer}>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <h3 style={{ fontSize: "1.5rem" }}>Lista Sprints</h3>
                            <button className={styles.home_siderButtonAdd} onClick={() => setShowCreateSprint(true)}><FaPlus /></button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {sprints && sprints.length > 0 ? (
                                sprints.map((spr) => (
                                    <SprintSider
                                        key={spr.id}
                                        sprint={spr}
                                        updateSprint={() => setShowUpdateSprint(true)}
                                        deleteSprint={() => setShowDeleteSprint(true)}
                                        viewSprint={() => navigate(`/sprint/${spr.id}`)}
                                    />
                                ))
                            ) : (
                                <p className={styles.home_siderNoSprints}>No hay sprints</p>
                            )}
                        </div>
                    </div>
                </div>
              
                <div className={styles.home_contentVistas}>
                    {vista === "backlog" ? <Backlog /> : <TareasSprint />}
                </div>
            </div>

            {/* Modales de Sprint */}
            {showCreateSprint && <CreateSprint onClose={() => setShowCreateSprint(false)} />}
            {showUpdateSprint && <UpdateSprint onClose={() => setShowUpdateSprint(false)} />}
            {showDeleteSprint && <DeleteSprint onClose={() => setShowDeleteSprint(false)} />}
        </div>
    );
};
