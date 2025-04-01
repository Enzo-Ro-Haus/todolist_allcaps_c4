import { create } from "zustand";

interface Tarea {
    id: string;
    titulo: string;
    descripcion: string;
    estado: string;
    fechaLimite: string;
}

interface Sprint {
    id: string;
    nombre: string;
    fechaInicio: string;
    fechaCierre: string;
    tareas: Tarea[];
}

interface StoreState {
    backlog: Tarea[];
    sprints: Sprint[];
    fetchData: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
    backlog: [],
    sprints: [],
    fetchData: async () => {
        const backlogRes = await fetch("http://localhost:3000/backlog");
        const sprintRes = await fetch("http://localhost:3000/sprintList");
        const backlogData = await backlogRes.json();
        const sprintData = await sprintRes.json();
        set({ backlog: backlogData.tareas, sprints: sprintData.sprints });
    },
}));
