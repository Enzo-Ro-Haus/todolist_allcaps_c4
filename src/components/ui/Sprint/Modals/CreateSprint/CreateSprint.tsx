import { FC, useState } from "react";
import styles from "./CreateSprint.module.css";
import { ICreateSprint } from "../../../../../types/Sprint/ICreateSprint";
import { addSprintController } from "../../../../../data/sprintController";
import { useSprintStore } from "../../../../../store/sprintStore";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface CreateSprintProps {
    onClose: () => void;
}

export const CreateSprint: FC<CreateSprintProps> = ({ onClose }) => {
    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevoSprint: ICreateSprint = {
            nombre,
            fechaInicio,
            fechaCierre,
            tareas: [],
        };

        try {
            const sprintCreada = await addSprintController(nuevoSprint);

            if (sprintCreada) {
                useSprintStore.getState().createSprint(sprintCreada);
                onClose();
            } else {
                console.warn("El sprint no fue creado correctamente")
            }
            
        } catch (err) {
            console.error("Error creando sprint:", err);
        }
    };

    return (
        <div className="overlay">
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.title}>Crear Sprint</h3>
                <input className={styles.createSprint_input} type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input className={styles.createSprint_input} type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                <input className={styles.createSprint_input} type="date" value={fechaCierre} onChange={(e) => setFechaCierre(e.target.value)} required />
                <Stack direction="row" spacing={20} className={styles.createSprint_containerButtons}>
                    <Button type="button" variant="contained" color="error"
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px" }}
                    onClick={onClose}>
                        Cerrar
                    </Button>
                    <Button type="submit" variant="contained" color="success"
                    sx={{ width: "10rem", height: "2rem", borderRadius: "5px" }}>
                        Crear
                    </Button>
                </Stack>
            </form>
        </div>
    );
};
