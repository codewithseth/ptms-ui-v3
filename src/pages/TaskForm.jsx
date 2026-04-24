import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, createTask, updateTask } from "../api/task";
import { getProjects } from "../api/project";
import FormField from "../components/FormField";
import FormPageShell from "../components/FormPageShell";

const STATUS_OPTIONS = [
  { value: "todo", label: "Todo" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const inputClass =
  "w-full px-4 py-2.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400";

const validate = (form) => {
  const errors = {};
  if (!form.project_id) errors.project_id = "Project is required.";
  if (!form.title.trim()) errors.title = "Title is required.";
  if (!form.status) errors.status = "Status is required.";
  return errors;
};

const LoadingState = ({ message }) => (
  <div className="flex items-center gap-2 text-sm text-gray-400 p-2">
    <svg
      className="animate-spin w-4 h-4 text-indigo-400"
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
    {message}
  </div>
);

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    project_id: "",
    title: "",
    description: "",
    status: "todo",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // Load projects for dropdown (fetch up to 100, no pagination needed here)
        const projRes = await getProjects({ page: 1, limit: 100 });
        setProjectOptions(projRes.data ?? []);

        if (isEdit) {
          const res = await getTaskById(id);
          const task = res?.data ?? res;
          setForm({
            project_id: String(task.project_id),
            title: task.title,
            description: task.description ?? "",
            status: task.status,
          });
        }
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setFetchLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        project_id: Number(form.project_id),
        title: form.title,
        description: form.description,
        status: form.status,
      };
      if (isEdit) {
        await updateTask(id, payload);
      } else {
        await createTask(payload);
      }
      navigate("/tasks");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <LoadingState message="Loading..." />;

  if (fetchError)
    return (
      <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3 max-w-2xl">
        {fetchError}
      </p>
    );

  return (
    <FormPageShell
      title={isEdit ? "Edit Task" : "New Task"}
      subtitle={isEdit ? `Editing task #${id}` : "Create a new task"}
      backTo="/tasks"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {errors.submit}
        </p>
      )}

      <FormField label="Project" required error={errors.project_id}>
        <select
          name="project_id"
          value={form.project_id}
          onChange={handleChange}
          className={`${inputClass} ${errors.project_id ? "border-red-300" : "border-gray-200"}`}
        >
          <option value="">Select a project...</option>
          {projectOptions.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.title}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Title" required error={errors.title}>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Design login page"
          className={`${inputClass} ${errors.title ? "border-red-300" : "border-gray-200"}`}
        />
      </FormField>

      <FormField label="Description" error={errors.description}>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Task details..."
          className={`${inputClass} resize-none border-gray-200`}
        />
      </FormField>

      <FormField label="Status" required error={errors.status}>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className={`${inputClass} ${errors.status ? "border-red-300" : "border-gray-200"}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </FormField>
    </FormPageShell>
  );
};

export default TaskForm;
