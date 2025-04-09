import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
    sprints : ISprint[],
    sprintActivo: ISprint | null,
    setSprintActivo: (sprintActivo: ISprint | null) => void;
    setArrayDeSprints: (sprints: ISprint[]) => void; 
    agreagarNuevoSprint: (nuevoSprint: ISprint) => void;
    editarUnSprint: (sprintActualizado: ISprint) => void;
    eliminarUnSprint: (idSprint: number) => void;
}


export const sprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    sprintActivo: null,

    // Modificar array
    // Agregar array de sprints
    setArrayDeSprints: (arrayDeSprints) => set(()=> ({sprints: arrayDeSprints})),

    // Agregar sprint al array
    agreagarNuevoSprint: (nuevoSprint) => set((state)=> ({sprints:  [... state.sprints, nuevoSprint]})),

    // Editar un sprint del array

    editarUnSprint: (sprintEditado) => set((state)=>{
        const arregloSprints = state.sprints.map((sprint) => sprint.id === sprintEditado.id ? {... sprint, sprintEditado}: sprint);
        return {sprints: arregloSprints}
    }),

    // Eliminar un sprint del array
    eliminarUnSprint: (idSprint) => set((state)=>{
        const arregloSprints = state.sprints.filter((sprint) => sprint.id !== idSprint);
        return {sprints: arregloSprints}
    }),

    // Setear sprint activo
    setSprintActivo: (sprintActivoIn) => set(() => ({sprintActivo: sprintActivoIn})),

}))