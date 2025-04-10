import axios from "axios";
import { ITarea } from "../types/Tarea/ITarea";
import { API_URL } from "../utils/constantes";

// 🔹 Obtener todas las tareas del backlog
export const getBacklogList = async (): Promise<{tareas: ITarea[]}> => {
    const response = await axios.get<{tareas: ITarea[]}>(`${API_URL}/backlog`);
    return response.data;
};

// 🔹 Reemplazar toda la lista del backlog
export const putBacklogList = async (tareas: ITarea[]) => {
    await axios.put(`${API_URL}/backlog`, {tareas});
};
