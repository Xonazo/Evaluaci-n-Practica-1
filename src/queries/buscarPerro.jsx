import { useQuery } from "react-query";
import axios from "axios";
import Chance from 'chance';


export function useBuscarInfoQuery(params) {
    return useQuery(["buscarInfoQuery", params], buscarInfoQuery, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true,
    });

}


export const buscarInfoQuery = async (params) => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    return {
        imagen: data.message,
        nombre: chance.first(),
        apellido: chance.last(),
        edad: chance.age({ type: "child" }),
        pais: chance.country({ full: true }),
        ciudad: chance.city(),
        descripcion: chance.paragraph({ sentences: 1 })
    }
}