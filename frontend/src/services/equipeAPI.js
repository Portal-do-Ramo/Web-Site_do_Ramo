import api from "./api";

export default class EquipeAPI{

    static async getAll(){
        return (await api.get("/crews")).data;
    }

    static async getAllActive(){
        return (await api.get("/crews?active=true")).data;
    }

    static async add(data) {
        return (await api.post("/crews", data)).data;
    }

    static async update(id, data) {
        return (await api.put("/crews/"+id, data));
    }

    static async delete(id) {
        return (await api.delete("/crews/"+id));
    }
}