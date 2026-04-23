import { useState, useMemo } from "react";
import { projects } from "../data/mockData";
import Card from "../components/Card";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 5;

const columns = [
  { key: "id", label: "#" },
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
  { key: "created_at", label: "Created At" },
];

const Projects = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
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
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
        <p className="text-sm text-gray-500">{filtered.length} records found</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by title or description..."
          />
        </div>
        <Table
          columns={columns}
          data={paginated}
          emptyMessage="No projects match your search."
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

export default Projects;
