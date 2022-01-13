import api from "./api";

export default class NoticiasAPI{
  static async getAll(){
      return (await api.get("/news")).data;
  }
}