import apiClient from "./apiClient";

export const login = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", { username, password });

  console.log(response)
  return response.data;
};