import http from "./http";
import { AddWard, Ward } from "../types/ward";

export const wardService = {
  async getWards(): Promise<Ward[]> {
    const res = await http.get("/wards/all/full_details");
    return res.data;
  },
  async getWard(ward_id: number): Promise<Ward> {
    const res = await http.get(`/wards/${ward_id}/full_details`);
    return res.data;
  },
  async addWard(addWard: AddWard): Promise<Ward> {
    const res = await http.post(`/wards`,addWard);
    return res.data;
  },
};
