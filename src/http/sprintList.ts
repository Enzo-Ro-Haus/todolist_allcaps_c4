import axios from "axios";
import { ISprint } from "../types/Sprint/ISprint";
import { API_URL } from "../utils/constantes";

// 🔹 Obtener todos los sprints
export const getSprintList = async (): Promise<{ sprints: ISprint[] }> => {
    const response = await axios.get<{ sprints: ISprint[] }>(`${API_URL}/sprintList`);
    return response.data;
};

// 🔹 Reemplazar todos los sprints
export const putSprintList = async (sprints: ISprint[]) => {
    await axios.put(`${API_URL}/sprintList`, { sprints });
};
