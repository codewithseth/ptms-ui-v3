import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../api/task";
import { formatDateTime } from "../lib/formatDateTime";
import Card from "../components/Card";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 10;

const statusConfig = {
  todo: { label: "Todo", className: "bg-gray-100 text-gray-600" },
  in_progress: {
    label: "In Progress",
    className: "bg-yellow-100 text-yellow-700",
  },
  done: { label: "Done", className: "bg-green-100 text-green-700" },
};

const buildColumns = (navigate) => [
  { key: "id", label: "#" },
  { key: "project_id", label: "Project ID" },
  { key: "title", label: "Title" },
  {
    key: "description",
    label: "Description",
    render: (val) => (
      <span className="max-w-xs truncate block text-gray-500" title={val}>
        {val}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (val) => {
      const cfg = statusConfig[val] || {
        label: val,
        className: "bg-gray-100 text-gray-600",
      };
      return (
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${cfg.className}`}
        >
          {cfg.label}
        </span>
      );
    },
  },
  {
    key: "created_at",
    label: "Created At",
    render: (val) => formatDateTime(val),
  },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => (
      <button
        onClick={() => navigate(`/tasks/${row.id}/edit`)}
        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition"
      >
        Edit
      </button>
    ),
  },
];

const Tasks = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const columns = buildColumns(navigate);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getTasks({ page, limit: PAGE_SIZE });
      setTasks(res.data);
      setTotalPages(res.pagination.totalPages);
      setTotalItems(res.pagination.totalItems);
    } catch (err) {
      setError(err.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const filtered = tasks.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch =
      t.title.toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q) ||
      String(t.project_id).includes(q);
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
          <p className="text-sm text-gray-500">{totalItems} records found</p>
        </div>
        <button
          onClick={() => navigate("/tasks/new")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm
            font-semibold rounded-lg shadow hover:bg-indigo-700 active:scale-95 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Task
        </button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search tasks..."
          />

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700"
          >
            <option value="all">All Statuses</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No tasks match your search."
          loading={loading}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card>
    </div>
  );
};

export default Tasks;
