import http from "./http";
import { Ward } from "../types/ward";

export const wardService = {
  async getWards(): Promise<Ward[]> {
    const res = await http.get("/wards/all/full_details");
    return res.data;
  },
  async getWard(ward_id: number): Promise<Ward> {
    const res = await http.get(`/wards/${ward_id}/full_details`);
    return res.data;
  },
};
