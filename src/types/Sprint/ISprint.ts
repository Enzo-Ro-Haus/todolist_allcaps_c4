import { ITarea } from "./Tarea/ITarea";

export interface ISprint {
    id: string;
    nombre: string;
    fechaInicio: string;
    fechaCierre: string;
    tareas: ITarea[];
}