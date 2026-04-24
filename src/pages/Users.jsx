import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/user";
import { formatDateTime } from "../lib/formatDateTime";
import Card from "../components/Card";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 5;

const roleColors = {
  Admin: "bg-red-100 text-red-700",
  Manager: "bg-blue-100 text-blue-700",
  Developer: "bg-indigo-100 text-indigo-700",
  Tester: "bg-yellow-100 text-yellow-700",
  Designer: "bg-purple-100 text-purple-700",
};

const buildColumns = (navigate) => [
  { key: "id", label: "#" },
  { key: "username", label: "Username" },
  {
    key: "roles",
    label: "Role",
    render: (val) => (
      <span
        className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${roleColors[val] || "bg-gray-100 text-gray-600"}`}
      >
        {val}
      </span>
    ),
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
        onClick={() => navigate(`/users/${row.id}/edit`)}
        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition"
      >
        Edit
      </button>
    ),
  },
];

const Users = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const columns = buildColumns(navigate);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getUsers({ page, limit: PAGE_SIZE });
      setUsers(res.data);
      setTotalPages(res.pagination.totalPages);
      setTotalItems(res.pagination.totalItems);
    } catch (err) {
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const filtered = search
    ? users.filter(
        (u) =>
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          u.roles.toLowerCase().includes(search.toLowerCase()),
      )
    : users;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500">{totalItems} records found</p>
        </div>
        <button
          onClick={() => navigate("/users/new")}
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
          New User
        </button>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by username or role..."
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No users match your search."
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

export default Users;
