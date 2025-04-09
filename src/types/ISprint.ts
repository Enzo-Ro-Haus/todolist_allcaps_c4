import { ITarea } from "./ITarea";

export interface ISprint{
    id?: number,
    nombre: string,
    fechaInicio: Date | null,
    fechaCierre: Date | null,
}