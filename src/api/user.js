import api from "../lib/axios";

export const getUsers = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const res = await api.get("/users", { params: { page, limit } });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch users");
  }
};

export const getUserById = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch user");
  }
};

export const createUser = async (data) => {
  try {
    const res = await api.post("/users", data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create user");
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update user");
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete user");
  }
};
