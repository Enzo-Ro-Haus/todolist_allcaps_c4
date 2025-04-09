import axios from "axios";
import { ITarea } from "../types/ITarea";

const API_URL_TAREAS = "http://localhost:3000/tareas";

export const getAllTareas = async () => {
    try{
        const response = await axios.get<ITarea[]>(API_URL_TAREAS);
        return response.data;
    }catch(err){
        console.log(err)
    }
}

export const postNuevaTarea = async (tareaActualizada: ITarea) => {
    try{
        const response = await axios.post<ITarea>(API_URL_TAREAS, {
            tareaActualizada, 
        });
        return response.data;
    }catch(err){
        console.log(err)
    }
}

export const editarTarea = async (tareaActualizada : ITarea) => {
    try{
        const response = await axios.put<ITarea>(`${API_URL_TAREAS}/${tareaActualizada.id!}`, {
            tareaActualizada, 
        });
        return response.data;
    }catch(err){
        console.log(err)
    }
}

export const eliminarTareaPorId = async (idTarea: number) => {
    try{
        const response = await axios.delete<ITarea>(`${API_URL_TAREAS}/${idTarea}`);
        return response.data;
    }catch(err){
        console.log(err)
    }
}