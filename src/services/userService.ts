
import http from "./http";

export const userService = {
  
  async deleteUser(user_id: number) {
    const res = await http.delete(`users/${user_id}`);
    return res.data;
  },

};
