import {FC} from 'react';
import { ISprint } from '../../../types/Sprint/ISprint';
import styles from './SprintSider.module.css';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useSprintStore } from '../../../store/sprintStore';

interface ISprintSiderProps {
    sprint: ISprint;
    updateSprint: () => void;
    deleteSprint: () => void;
    viewSprint: () => void;
}

export const SprintSider: FC<ISprintSiderProps> = ({
    sprint,
    updateSprint,
    deleteSprint,
    viewSprint,
}) => {

    const handleEditSprint = () => {
        useSprintStore.getState().setActiveSprint(sprint);
        updateSprint();
    };

    const handleDeleteSprint = () => {
        useSprintStore.getState().setActiveSprint(sprint);
        deleteSprint();
    };

    

    return (
        <div className={styles.sprint_container}>
            <h3 style={{fontSize: '1rem'}}>{sprint.nombre}</h3>
            <div>
                <p style={{fontSize:'1rem', marginLeft: '0.5rem'}}><b>Inicio:</b> {sprint.fechaInicio}</p> 
                <p style={{fontSize:'1rem', marginLeft: '0.5rem'}}><b>Cierre:</b> {sprint.fechaCierre}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '.2rem'}}>
                <button className={styles.sprint_buttonAction} onClick={viewSprint}><FaEye /></button> 
                <button className={styles.sprint_buttonAction} onClick={() => handleEditSprint()}><FaEdit /></button> 
                <button className={styles.sprint_buttonAction} onClick={() => handleDeleteSprint()}><FaTrash /></button>
            </div>
        </div>
    )
}