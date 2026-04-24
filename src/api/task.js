import api from "../lib/axios";

export const getTasks = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const res = await api.get("/tasks", { params: { page, limit } });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch tasks");
  }
};

export const getTaskById = async (id) => {
  try {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch task");
  }
};

export const createTask = async (data) => {
  try {
    const res = await api.post("/tasks", data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create task");
  }
};

export const updateTask = async (id, data) => {
  try {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update task");
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete task");
  }
};
