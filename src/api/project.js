import api from "../lib/axios";

export const getProjects = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const res = await api.get("/projects", { params: { page, limit } });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch projects");
  }
};

export const getProjectById = async (id) => {
  try {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch project");
  }
};

export const createProject = async (data) => {
  try {
    const res = await api.post("/projects", data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create project");
  }
};

export const updateProject = async (id, data) => {
  try {
    const res = await api.put(`/projects/${id}`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update project");
  }
};

export const deleteProject = async (id) => {
  try {
    await api.delete(`/projects/${id}`);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete project");
  }
};
