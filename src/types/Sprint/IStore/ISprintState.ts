import { ITarea } from "../../Tarea/ITarea";
import { ISprint } from "../ISprint";


export interface ISprintState {
    sprints: ISprint[];
    activeSprint: ISprint | null;

    setActiveSprint: (sprint: ISprint) => void;
    clearActiveSprint: () => void;

    addSprint: (sprint: ISprint) => void;
    removeSprint: (sprintID: string) => void;
    updateSprint: (sprint: ISprint) => void;
    addTareaASprint: (tarea: ITarea, sprintID: string) => void;
}
