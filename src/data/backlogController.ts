import axios from "axios";
import { ITarea } from "../types/Tarea/ITarea";
import { ICreateTarea } from "../types/Tarea/ICreateTarea";
import { API_URL } from "../utils/constantes";
import { putBacklogList } from "../http/backlogList";

// 🔹 Obtener todas las tareas del backlog
export const getBacklogController = async (): Promise<ITarea[]> => {
    try {
        const response = await axios.get<{ tareas: ITarea[] }>(`${API_URL}/backlog`);
        return response.data.tareas;
    } catch (error) {
        console.error("Error en getBacklogController", error);
        throw error;
    }
};

// 🔹 Crear una nueva tarea en el backlog
export const addTareaBacklogController = async (nuevaTarea: ICreateTarea) => {
    try {
        const tareasBd = await getBacklogController();

        const nuevaConId: ITarea = {
        ...nuevaTarea,
        id: Date.now().toString(), // Genera un ID
        };

        if (tareasBd) {
            await putBacklogList([...tareasBd, nuevaConId]);
        } else {
            await putBacklogList([nuevaConId]);
        }

        return nuevaConId;
    } catch (error) {
        console.error("Error en addTareaBacklogController", error);
    }
};

// 🔹 Actualizar una tarea existente
export const updateTareaBacklogController = async (tareaActualizada: ITarea) => {
    try {
        const tareasBd = await getBacklogController();

        if (tareasBd) {
        const result = tareasBd.map((tar) =>
            tar.id === tareaActualizada.id ? { ...tar, ...tareaActualizada } : tar
        );

        await putBacklogList(result);
        }

        return tareaActualizada;
    } catch (error) {
        console.error("Error en updateTareaBacklogController", error);
        throw error;
    }
};

// 🔹 Eliminar una tarea por ID
export const deleteTareaBacklogController = async (idTarea: string) => {
    try {
        const tareasBd = await getBacklogController();

        if (tareasBd) {
        const result = tareasBd.filter((tar) => tar.id !== idTarea);
        await putBacklogList(result);
        }
    } catch (error) {
        console.error("Error en deleteTareaBacklogController", error);
    }
};