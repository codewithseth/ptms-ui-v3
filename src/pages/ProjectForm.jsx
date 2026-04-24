import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, createProject, updateProject } from "../api/project";
import FormField from "../components/FormField";
import FormPageShell from "../components/FormPageShell";

const inputClass =
  "w-full px-4 py-2.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400";

const validate = (form) => {
  const errors = {};
  if (!form.title.trim()) errors.title = "Title is required.";
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

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const res = await getProjectById(id);
        const project = res?.data ?? res;
        setForm({
          title: project.title,
          description: project.description ?? "",
        });
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
      if (isEdit) {
        await updateProject(id, form);
      } else {
        await createProject(form);
      }
      navigate("/projects");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <LoadingState message="Loading project..." />;

  if (fetchError)
    return (
      <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3 max-w-2xl">
        {fetchError}
      </p>
    );

  return (
    <FormPageShell
      title={isEdit ? "Edit Project" : "New Project"}
      subtitle={isEdit ? `Editing project #${id}` : "Create a new project"}
      backTo="/projects"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {errors.submit}
        </p>
      )}

      <FormField label="Title" required error={errors.title}>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. E-Commerce Portal"
          className={`${inputClass} ${errors.title ? "border-red-300" : "border-gray-200"}`}
        />
      </FormField>

      <FormField label="Description" error={errors.description}>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Brief description of the project..."
          className={`${inputClass} resize-none border-gray-200`}
        />
      </FormField>
    </FormPageShell>
  );
};

export default ProjectForm;
