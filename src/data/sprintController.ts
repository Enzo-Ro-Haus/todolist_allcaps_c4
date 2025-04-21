import { ISprint } from "../types/Sprint/ISprint";
import { ITarea } from "../types/Tarea/ITarea";
import { getSprintList, putSprintList } from "../http/sprintList";
import { ICreateSprint } from "../types/Sprint/ICreateSprint";
import { ICreateTarea } from "../types/Tarea/ICreateTarea";

// 🔹 Obtener todos los sprints
export const getSprintListController = async (): Promise<ISprint[]> => {
    try {
        const response = await getSprintList();
        return response.sprints;
    } catch (error) {
        console.error("Error en getSprintListController", error);
        throw error;
    }
};

// 🔹 Agregar un nuevo sprint
export const addSprintController = async (nuevoSprint: ICreateSprint) => {
    try {
        const sprints = await getSprintListController();

        const nuevoConId = {
            ...nuevoSprint,
            id: Date.now().toString(),
            tareas: nuevoSprint.tareas || []
        };
        if (sprints) {
            await putSprintList([...sprints, nuevoConId]);
        } else {
            await putSprintList([nuevoConId]);
        }

        return nuevoConId;
    } catch (error) {
        console.error("Error en addSprintController", error);
    }
};

// 🔹 Actualizar un sprint completo
export const updateSprintController = async (sprintActualizado: ISprint) => {
    try {
        const sprints = await getSprintListController();

        const result = sprints.map((sprint) =>
            sprint.id === sprintActualizado.id ? { ...sprint, ...sprintActualizado } : sprint
        );

        await putSprintList(result);
        return sprintActualizado;
    } catch (error) {
        console.error("Error en updateSprintController", error);
        throw error;
    }
};

// 🔹 Eliminar un sprint por ID
export const deleteSprintController = async (idSprint: string) => {
    try {
        const sprints = await getSprintListController();
        
        if (sprints) {
            const result = sprints.filter((sprint) => sprint.id !== idSprint);
            await putSprintList(result);
        }
    } catch (error) {
        console.error("Error en deleteSprintController", error);
    }
};

// 🔹 Agregar tarea a un sprint
export const addTareaToSprintController = async (idSprint: string, tarea: ICreateTarea) => {
    try {
        const sprints = await getSprintListController();
        const tareaConId = { ...tarea, id: Date.now().toString() };

        const updated = sprints.map((sprint) =>
            sprint.id === idSprint
                ? { ...sprint, tareas: [...sprint.tareas, tareaConId] }
                : sprint
        );

        await putSprintList(updated);
        return tareaConId;
    } catch (error) {
        console.error("Error en addTareaToSprintController", error);
    }
};


// 🔹 Actualizar una tarea dentro de un sprint
export const updateTareaInSprintController = async (idSprint: string, tareaActualizada: ITarea) => {
    try {
        const sprints = await getSprintListController();

        const updated = sprints.map((sprint) =>
            sprint.id === idSprint
                ? {
                    ...sprint,
                    tareas: sprint.tareas.map((t) =>
                        t.id === tareaActualizada.id ? { ...t, ...tareaActualizada } : t
                    )
                }
                : sprint
        );

        await putSprintList(updated);
    } catch (error) {
        console.error("Error en updateTareaInSprintController", error);
    }
};

// 🔹 Eliminar tarea de un sprint
export const deleteTareaFromSprintController = async (idSprint: string, idTarea: string) => {
    try {
        const sprints = await getSprintListController();

        const updated = sprints.map((sprint) =>
            sprint.id === idSprint
                ? { ...sprint, tareas: sprint.tareas.filter((t) => t.id !== idTarea) }
                : sprint
        );

        await putSprintList(updated);
    } catch (error) {
        console.error("Error en deleteTareaFromSprintController", error);
    }
};

