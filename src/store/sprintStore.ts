import { create } from "zustand";
import { ISprintState } from "../types/Sprint/IStore/ISprintState";

export const useSprintStore = create<ISprintState>((set) => ({
    sprints: [],
    activeSprint: null,

    setActiveSprint: (sprint) => set({ activeSprint: sprint }),
    clearActiveSprint: () => set({ activeSprint: null }),

    addSprint: (sprint) => {
        set((state) => ({
        sprints: [...state.sprints, sprint],
        }));
    },
    removeSprint: (sprintID) => {
        set((state) => ({
        sprints: state.sprints.filter((spr) => {
            spr.id === sprintID;
        }),
        }));
    },
    updateSprint: (sprint) => {
        set((state) => ({
        sprints: state.sprints.map((spr) =>
            spr.id === sprint.id ? sprint : spr
        ),
        }));
    },
    addTareaASprint: (tarea, sprintID) => {
        set((state) => ({
        sprints: state.sprints.map((spr) =>
            spr.id === sprintID ? { ...spr, tareas: [...spr.tareas, tarea] } : spr
        ),
        }));
    },
}));