import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, createUser, updateUser } from "../api/user";
import FormField from "../components/FormField";
import FormPageShell from "../components/FormPageShell";

const ROLES = ["Admin", "Manager", "Developer", "Tester", "Designer"];

const inputClass =
  "w-full px-4 py-2.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400";

const validate = (form, isEdit) => {
  const errors = {};
  if (!form.username.trim()) errors.username = "Username is required.";
  if (!isEdit && !form.password.trim())
    errors.password = "Password is required.";
  if (!form.roles) errors.roles = "Role is required.";
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

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ username: "", password: "", roles: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const res = await getUserById(id);
        const user = res?.data ?? res;
        setForm({ username: user.username, password: "", roles: user.roles });
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
    const errs = validate(form, isEdit);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        const payload = { username: form.username, roles: form.roles };
        if (form.password.trim()) payload.password = form.password;
        await updateUser(id, payload);
      } else {
        await createUser({
          username: form.username,
          password: form.password,
          roles: form.roles,
        });
      }
      navigate("/users");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <LoadingState message="Loading user..." />;

  if (fetchError)
    return (
      <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3 max-w-2xl">
        {fetchError}
      </p>
    );

  return (
    <FormPageShell
      title={isEdit ? "Edit User" : "New User"}
      subtitle={isEdit ? `Editing user #${id}` : "Add a new user to the system"}
      backTo="/users"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {errors.submit}
        </p>
      )}

      <FormField label="Username" required error={errors.username}>
        <input
          name="username"
          type="text"
          autoComplete="off"
          value={form.username}
          onChange={handleChange}
          placeholder="e.g. john_doe"
          className={`${inputClass} ${errors.username ? "border-red-300" : "border-gray-200"}`}
        />
      </FormField>

      <FormField
        label={isEdit ? "New Password" : "Password"}
        required={!isEdit}
        error={errors.password}
      >
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          placeholder={
            isEdit ? "Leave blank to keep current password" : "Enter password"
          }
          className={`${inputClass} ${errors.password ? "border-red-300" : "border-gray-200"}`}
        />
      </FormField>

      <FormField label="Role" required error={errors.roles}>
        <select
          name="roles"
          value={form.roles}
          onChange={handleChange}
          className={`${inputClass} ${errors.roles ? "border-red-300" : "border-gray-200"}`}
        >
          <option value="">Select a role...</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </FormField>
    </FormPageShell>
  );
};

export default UserForm;
