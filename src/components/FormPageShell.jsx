import { useNavigate } from "react-router-dom";

const FormPageShell = ({
  title,
  subtitle,
  backTo,
  onSubmit,
  loading = false,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl space-y-5">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
          title="Go back"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      {/* Form card */}
      <form
        onSubmit={onSubmit}
        noValidate
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5"
      >
        {children}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm
              font-semibold rounded-lg shadow hover:bg-indigo-700 active:scale-95 transition
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && (
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200
              rounded-lg hover:bg-gray-50 hover:text-gray-800 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPageShell;
