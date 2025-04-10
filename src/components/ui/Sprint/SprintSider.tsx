import {FC} from 'react';
import { ISprint } from '../../../types/Sprint/ISprint';
import styles from './SprintSider.module.css';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

interface ISprintSiderProps {
    sprint: ISprint
}

export const SprintSider: FC<ISprintSiderProps> = ({sprint}) => {
    return (
        <div className={styles.sprint_container}>
            <h3 style={{fontSize: '1rem'}}>{sprint.nombre}</h3>
            <div>
                <p style={{fontSize:'1rem', marginLeft: '0.5rem'}}><b>Inicio:</b> {sprint.fechaInicio}</p> 
                <p style={{fontSize:'1rem', marginLeft: '0.5rem'}}><b>Cierre:</b> {sprint.fechaCierre}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '.2rem'}}>
                <button className={styles.sprint_buttonAction}><FaEye /></button> 
                <button className={styles.sprint_buttonAction}><FaEdit /></button> 
                <button className={styles.sprint_buttonAction}><FaTrash /></button>
            </div>
        </div>
    )
}