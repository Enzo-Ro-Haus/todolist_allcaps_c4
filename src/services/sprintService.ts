import axios from "axios";
import { API_URL } from "../utils/constantes";
import { ISprint } from "../types/Sprint/ISprint";
import { ITarea } from "../types/Tarea/ITarea";

// Obtener la lista de sprints
export const getSprints = async (): Promise<ISprint[]> => {
    const response = await axios.get<{ sprints: ISprint[] }>(`${API_URL}/sprintList`);
    return response.data.sprints;
};

// Agregar una tarea a un sprint
export const addTaskToSprint = async (sprintId: string, tarea: ITarea) => {
    const sprints = await getSprints();
    const updatedSprints = sprints.map(sprint => 
        sprint.id === sprintId ? { ...sprint, tareas: [...sprint.tareas, tarea] } : sprint
    );
    await axios.put(`${API_URL}/sprintList`, { sprints: updatedSprints });
};
