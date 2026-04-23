import { useState, useMemo } from "react";
import { users } from "../data/mockData";
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

const columns = [
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
  { key: "created_at", label: "Created At" },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.roles.toLowerCase().includes(q),
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500">
            {filtered.length} records found
          </p>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by username or role..."
          />
        </div>
        <Table
          columns={columns}
          data={paginated}
          emptyMessage="No users match your search."
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
