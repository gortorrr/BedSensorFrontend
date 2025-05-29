// services/authService.ts
import http from "./http";

export const authService = {
  async login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const response = await http.post("login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data; // { access_token, token_type, user_id }
  },
};
