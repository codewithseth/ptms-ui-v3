import api from "../lib/axios";

export const getDashboardStats = async () => {
  try {
    const res = await api.get("/dashboard-stats");
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch dashboard stats",
    );
  }
};
