import http from "./http";

export const locationService = {
  async getLocations() {
    const res = await http.get("/buildings");
    return res.data;
  },
};
