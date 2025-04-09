const API_URL_SPRINTS = "http://localhost:3000/sprints";
import axios from "axios";
import { ISprint } from "../types/ISprint";


export const getAllSprints = async () => {
    try{
        const response = await axios.get<ISprint[]>(API_URL_SPRINTS);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const postNuevoSprint = async (sprintActualizado: ISprint) => {
    try{
        const response = await axios.post<ISprint>(API_URL_SPRINTS, {
            sprintActualizado, 
        });
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const editarSprint = async (sprintActualizado : ISprint) => {
    try{
        const response = await axios.put<ISprint>(`${API_URL_SPRINTS}/${sprintActualizado.id!}`, {
            sprintActualizado, 
        });
        return response.data;
    }catch(err){
        console.log(err)
    }
}

export const eliminarSprintPorId = async (idSprint: number) => {
    try{
        const response = await axios.delete<ISprint>(`${API_URL_SPRINTS}/${idSprint}`);
        return response.data;
    }catch(err){
        console.log(err)
    }
}