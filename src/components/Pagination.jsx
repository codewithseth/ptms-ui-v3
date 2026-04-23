const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">
        Page <span className="font-medium text-gray-700">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-700">{totalPages}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-600
            hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40
            disabled:cursor-not-allowed transition"
        >
          ‹
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition
              ${
                page === currentPage
                  ? "bg-indigo-600 border-indigo-600 text-white font-semibold shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
              }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-600
            hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40
            disabled:cursor-not-allowed transition"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
