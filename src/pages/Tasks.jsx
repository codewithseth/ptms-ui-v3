import { useState, useMemo } from "react";
import { tasks } from "../data/mockData";
import Card from "../components/Card";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 5;

const statusConfig = {
  todo: { label: "Todo", className: "bg-gray-100 text-gray-600" },
  in_progress: {
    label: "In Progress",
    className: "bg-yellow-100 text-yellow-700",
  },
  done: { label: "Done", className: "bg-green-100 text-green-700" },
};

const columns = [
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
  { key: "created_at", label: "Created At" },
];

const Tasks = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tasks.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        String(t.project_id).includes(q);
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <p className="text-sm text-gray-500">{filtered.length} records found</p>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search tasks..."
          />
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
          data={paginated}
          emptyMessage="No tasks match your search."
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
