import { FC, useState, useEffect } from "react";
import styles from "./UpdateSprint.module.css";
import { useSprintStore } from "../../../../../store/sprintStore";
import { updateSprintController } from "../../../../../data/sprintController";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface Props {
    onClose: () => void;
}

export const UpdateSprint: FC<Props> = ({ onClose }) => {
    const { activeSprint, updateSprint, clearActiveSprint } = useSprintStore.getState();

    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");

    useEffect(() => {

        if (activeSprint) {
            setNombre(activeSprint.nombre);
            setFechaInicio(activeSprint.fechaInicio);
            setFechaCierre(activeSprint.fechaCierre);
        }
        
    }, [activeSprint]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeSprint) return;

        const actualizado = await updateSprintController({
            ...activeSprint,
            nombre,
            fechaInicio,
            fechaCierre,
        });

        updateSprint(actualizado);
        clearActiveSprint();
        onClose();
    };

    return (
        <div className="overlay">
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.title}>Editar Sprint</h3>
                <input className={styles.input} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input className={styles.input} type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                <input className={styles.input} type="date" value={fechaCierre} onChange={(e) => setFechaCierre(e.target.value)} required />
            <Stack direction={"row"} spacing={20} className={styles.containerButtons}>
                <Button type="button" variant="contained" color="error" 
                sx={{ width: "10rem", height: "2rem", borderRadius: "5px"}}
                onClick={onClose}>
                    Cerrar
                </Button>
                <Button type="submit" variant="contained" color="success"
                sx={{ width: "10rem", height: "2rem", borderRadius: "5px"}}>
                    Aceptar
                </Button>
            </Stack>
            </form>
        </div>
    );
};
