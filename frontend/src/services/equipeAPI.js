import api from "./api";

export default class EquipeAPI{

    static async getAll(){
        return (await api.get("/equipes")).data;
    }

    static async getAllActive(){
        return (await api.get("/equipes?active=true")).data;
    }

    static async add(data) {
        return (await api.post("/equipes", data)).data;
    }

    static async update(id, data) {
        return (await api.put("/equipes/"+id, data));
    }

    static async delete(id) {
        return (await api.delete("/equipes/"+id));
    }
}