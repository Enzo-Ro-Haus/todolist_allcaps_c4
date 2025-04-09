import { create } from "zustand";
import { ITarea } from "../types/ITarea";

interface ITareaStore {
    tareas : ITarea[],
    tareaActiva: ITarea | null,
    setTareaActiva: (tareaActiva: ITarea | null) => void;
    setArrayDeTareas: (tareas: ITarea[]) => void; 
    agreagarNuevaTarea: (nuevaTarea: ITarea) => void;
    editarUnaTarea: (tareaActualizada: ITarea) => void;
    eliminarUnaTarea: (idTarea: number) => void;
}


export const tareaStore = create<ITareaStore>((set) => ({
    tareas : [],
    tareaActiva: null,

    // Modificar array
    // Agregar array de tareas
    setArrayDeTareas: (arrayDeTareas) => set(()=> ({tareas: arrayDeTareas})),

    // Agregar tarea al array
    agreagarNuevaTarea: (nuevoTarea) => set((state)=> ({tareas:  [... state.tareas, nuevoTarea]})),

    // Editar un tarea del array

    editarUnaTarea: (tareaEditada) => set((state)=>{
        const arregloTareas = state.tareas.map((tarea) => tarea.id === tareaEditada.id ? {... tarea, tareaEditada}: tarea);
        return {tareas: arregloTareas}
    }),

    // Eliminar un tarea del array
    eliminarUnaTarea: (idTarea) => set((state)=>{
        const arregloTareas = state.tareas.filter((tarea) => tarea.id !== idTarea);
        return {tareas: arregloTareas}
    }),

    // Setear tarea activo
    setTareaActiva: (tareaActivanIn) => set(() => ({tareaActiva: tareaActivanIn})),

}))